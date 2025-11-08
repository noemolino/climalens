// src/api/useAllMetricsData.js
import { useState, useEffect } from "react";
import apiClient from "./apiClient";

const parse = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

/** Normalizza per endpoint */
const normalize = (metric, items) => {
  if (!items || !Array.isArray(items)) return [];

  switch (metric) {
    case "temperature":
      return items
        .map((d) => ({
          time: d.time,
          value: parse(d.station),
        }))
        .filter((x) => x.value != null);

    case "co2":
      return items
        .map((d) => ({
          time: `${d.year}-${d.month}-${d.day}`,
          value: parse(d.trend),
        }))
        .filter((x) => x.value != null);

    case "methane":
      return items
        .map((d) => ({
          time: d.date,
          value: parse(d.average),
        }))
        .filter((x) => x.value != null);

    case "no2":
      return items
        .map((d) => ({
          time: d.date,
          value: parse(d.trend),
        }))
        .filter((x) => x.value != null);

    default:
      return [];
  }
};

/** Arctic API speciale */
const extractArctic = (raw) => {
  if (!raw || !raw.arcticData || !raw.arcticData.data) return [];

  return Object.entries(raw.arcticData.data).map(([ym, obj]) => ({
    time: ym,
    value: parse(obj.value),
  }));
};

export default function useAllMetricsData() {
  const [temperature, setTemperature] = useState([]);
  const [co2, setCO2] = useState([]);
  const [methane, setMethane] = useState([]);
  const [no2, setNO2] = useState([]);
  const [arctic, setArctic] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [tempRaw, co2Raw, methaneRaw, no2Raw, arcticRaw] =
          await Promise.all([
            apiClient.getTemperatureData(),
            apiClient.getCo2Data(),
            apiClient.getMethaneData(),
            apiClient.getNo2Data(),
            apiClient.getArcticData(),
          ]);

        if (!mounted) return;

        setTemperature(normalize("temperature", tempRaw.result));
        setCO2(normalize("co2", co2Raw.co2));
        setMethane(normalize("methane", methaneRaw.methane));
        setNO2(normalize("no2", no2Raw.nitrous));
        setArctic(extractArctic(arcticRaw));
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  return { temperature, co2, methane, no2, arctic, loading, error };
}
