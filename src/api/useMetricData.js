import { useState, useEffect } from "react";
import apiClient from "./apiClient";

const parse = (v) => {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

const decimalYearToYearMonth = (time) => {
  const t = Number(time);
  if (!Number.isFinite(t)) return null;

  const year = Math.floor(t);
  const decimal = t - year;

  const month = Math.round(decimal * 12) + 1;

  return `${year}-${String(month).padStart(2, "0")}`;
};

const normalize = (metric, items) => {
  if (!items || !Array.isArray(items)) return [];

  switch (metric) {
    case "temperature":
      return items
        .map((d) => {
          const date = decimalYearToYearMonth(d.time);

          return {
            time: date,
            value: parse(d.station),
          };
        })
        .filter((x) => x.time != null && x.value != null);

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

const extractArctic = (raw) => {
  if (!raw || !raw.arcticData || !raw.arcticData.data) return [];

  return Object.entries(raw.arcticData.data).map(([ym, obj]) => ({
    time: `${ym.slice(0, 4)}-${ym.slice(4)}`,
    value: parse(obj.value),
    anom: parse(obj.anom),
  }));
};

export default function useMetricData(metric) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        let raw;

        switch (metric) {
          case "temperature":
            raw = await apiClient.getTemperatureData();
            setData(normalize("temperature", raw.result));
            break;

          case "co2":
            raw = await apiClient.getCo2Data();
            setData(normalize("co2", raw.co2));
            break;

          case "methane":
            raw = await apiClient.getMethaneData();
            setData(normalize("methane", raw.methane));
            break;

          case "no2":
            raw = await apiClient.getNo2Data();
            setData(normalize("no2", raw.nitrous));
            break;

          case "arctic":
            raw = await apiClient.getArcticData();
            setData(extractArctic(raw));
            break;

          default:
            throw new Error(`Metrica non valida: ${metric}`);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [metric]);

  return { data, loading, error };
}
