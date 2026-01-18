import React from "react";
import useAllMetricsData from "@/api/useAllMetricsData";
import HomeMetricCard from "@/components/HomeMetricCard/HomeMetricCard";
import "./Home.scss";

export default function Home() {
  const { temperature, co2, methane, no2, arctic, loading, error } =
    useAllMetricsData();

  console.log("Home component state:", {
    loading,
    error,
    dataLengths: {
      temperature: temperature?.length,
      co2: co2?.length,
      methane: methane?.length,
      no2: no2?.length,
      arctic: arctic?.length,
    },
  });

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data 😢</p>;

  // Check if any dataset hasn't been initialized yet
  if (!temperature || !co2 || !methane || !no2 || !arctic) {
    return <p>Initializing data...</p>;
  }

  // Check if any dataset is empty
  if (
    temperature.length === 0 ||
    co2.length === 0 ||
    methane.length === 0 ||
    no2.length === 0 ||
    arctic.length === 0
  ) {
    return <p>No data available for one or more parameters 😕</p>;
  }

  // Helper to parse dates in YYYY-MM format
  const parseDate = (timeStr) => {
    const str = String(timeStr).trim();

    // Try YYYY-MM format (Temperature and Arctic data: "2024-01", etc.)
    const yyyyMmMatch = str.match(/^(\d{4})-(\d{2})$/);
    if (yyyyMmMatch) {
      const year = parseInt(yyyyMmMatch[1]);
      const month = parseInt(yyyyMmMatch[2]);
      return new Date(year, month - 1, 15); // Use middle of month
    }

    // Try direct parsing for other formats
    let date = new Date(str);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }

    return null; // Can't parse
  };

  // Helper to filter data from last 2 years
  const getLastTwoYearsData = (data) => {
    if (!data || data.length === 0) return [];

    const latestData = data[data.length - 1];
    const latestDate = parseDate(latestData.time);
    if (!latestDate) return data;

    const twoYearsAgo = new Date(latestDate);
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    return data.filter((d) => {
      const date = parseDate(d.time);
      if (!date) return false;
      return date >= twoYearsAgo;
    });
  };

  const getStatus = (title, data) => {
    // if (!data || data.length === 0) return null;

    const lastItem = data[data.length - 1];

    // Funzione helper per formattare i numeri
    const fmt = (val) => Number.parseFloat(val).toFixed(2);

    // Soglie e Unità di misura
    if (title.includes("Temperature")) {
      const val = fmt(lastItem.value);
      const limit = 1.2;
      const unit = "°C";
      if (val > limit)
        return {
          label: "Critical",
          color: "#ef4444",
          current: val,
          limit,
          unit,
          reason: "Above safe warming levels",
        };
      if (val > 0.7)
        return {
          label: "Warning",
          color: "#facc15",
          current: val,
          limit: 0.7,
          unit,
          reason: "Approaching threshold",
        };
      return {
        label: "Normal",
        color: "#10b981",
        current: val,
        limit: 0.7,
        unit,
        reason: "Stable",
      };
    }

    if (title.includes("CO₂")) {
      const val = fmt(lastItem.value);
      const limit = 415.0;
      const unit = "ppm";
      if (val > limit)
        return {
          label: "Critical",
          color: "#ef4444",
          current: val,
          limit,
          unit,
          reason: "High concentration",
        };
      if (val > 400.0)
        return {
          label: "Warning",
          color: "#facc15",
          current: val,
          limit: 400.0,
          unit,
          reason: "Exceeding safety levels",
        };
      return {
        label: "Normal",
        color: "#10b981",
        current: val,
        limit: 400.0,
        unit,
        reason: "Stable",
      };
    }

    if (title.includes("Methane")) {
      const val = fmt(lastItem.value);
      const limit = 1900.0;
      const unit = "ppb";
      if (val > limit)
        return {
          label: "Critical",
          color: "#ef4444",
          current: val,
          limit,
          unit,
          reason: "Record greenhouse levels",
        };
      if (val > 1850.0)
        return {
          label: "Warning",
          color: "#facc15",
          current: val,
          limit: 1850.0,
          unit,
          reason: "Significant upward trend",
        };
      return {
        label: "Normal",
        color: "#10b981",
        current: val,
        limit: 1850.0,
        unit,
        reason: "Standard levels",
      };
    }

    if (title.includes("NO₂")) {
      const val = fmt(lastItem.value);
      const limit = 335.0;
      const unit = "ppb";
      if (val > limit)
        return {
          label: "Critical",
          color: "#ef4444",
          current: val,
          limit,
          unit,
          reason: "High pollution detected",
        };
      if (val > 310.0)
        return {
          label: "Warning",
          color: "#facc15",
          current: val,
          limit: 310.0,
          unit,
          reason: "Increasing contamination",
        };
      return {
        label: "Normal",
        color: "#10b981",
        current: val,
        limit: 310.0,
        unit,
        reason: "Stable air quality",
      };
    }

    if (title.includes("Polar Ice")) {
      // Usiamo l'anomalia per rendere il dato comprensibile
      const anom = fmt(lastItem.anom);
      const totalArea = fmt(lastItem.value);
      const limit = -2.0;
      const unit = "mln km²";

      // Mostriamo l'anomalia come valore corrente
      if (anom < limit)
        return {
          label: "Critical",
          color: "#ef4444",
          current: anom,
          limit,
          unit,
          reason: `Massive loss (Total: ${totalArea})`,
        };
      if (anom < -1.0)
        return {
          label: "Warning",
          color: "#facc15",
          current: anom,
          limit: -1.0,
          unit,
          reason: `Melting trend (Total: ${totalArea})`,
        };
      return {
        label: "Normal",
        color: "#10b981",
        current: anom,
        limit: -1.0,
        unit,
        reason: `Stable (Total: ${totalArea})`,
      };
    }

    return null;
  };

  // Helper to render each metric in a card
  const renderCard = (title, data, color, path, yAxisLabel) => (
    <HomeMetricCard
      key={title}
      title={title}
      data={getLastTwoYearsData(data)}
      color={color}
      path={path}
      yAxisLabel={yAxisLabel}
      status={getStatus(title, data)}
    />
  );

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>A clearer view of our changing world 🔭</h1>
        <p>
          ClimaLens brings global climate data into focus. Explore 140 years of
          environmental shifts through a precise, data-driven lens.
        </p>
      </header>

      <div className="charts-grid">
        {renderCard(
          "Temperature Trend 🌡️",
          temperature,
          "#f97316",
          "/temperature",
          "Temperature Variation (°C)",
        )}
        {renderCard("CO₂ Trend 🏭", co2, "#16a34a", "/co2", "CO₂ (ppm)")}
        {renderCard(
          "Methane Trend 🔥",
          methane,
          "#8b5cf6",
          "/methane",
          "Methane (ppb)",
        )}
        {renderCard("NO₂ Trend 💨", no2, "#3b82f6", "/no2", "NO₂ (ppb)")}
        {renderCard(
          "Polar Ice Trend 🧊",
          arctic,
          "#0ea5e9",
          "/artic",
          "Ice Anomaly (km²)",
        )}
      </div>
    </div>
  );
}
