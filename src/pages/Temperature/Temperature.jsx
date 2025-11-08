// src/pages/Temperature/Temperature.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useMetricData from "@/api/useMetricData";
import "./Temperature.scss";

export default function Temperature() {
  const [years, setYears] = useState(45); // default: ultimi 50 anni
  const { data, loading, error } = useMetricData("temperature");

  if (loading) return <p>Caricamento dati temperatura...</p>;
  if (error) return <p>Errore nel caricamento della temperatura 😢</p>;
  if (!data?.length) return <p>Nessun dato disponibile...</p>;

  // Filtra i dati in base al periodo scelto
  const filteredData = data.slice(-years);

  return (
    <div className="metric-container">
      <header className="metric-header">
        <h1>Andamento delle Temperature 🌡️</h1>
        <p className="metric-description">
          L’andamento della temperatura globale è un indicatore chiave del
          riscaldamento globale. Questo grafico mostra l’aumento delle
          temperature medie terrestri dal 1880 ad oggi.
        </p>
      </header>

      <div className="metric-chart">
        <div className="chart-controls">
          <label>Intervallo di tempo:</label>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          >
            <option value={5}>Ultimi 5 anni</option>
            <option value={10}>Ultimi 10 anni</option>
            <option value={20}>Ultimi 20 anni</option>
            <option value={30}>Ultimi 30 anni</option>
            <option value={40}>Ultimi 40 anni</option>
            <option value={data.length}>Tutti</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{ value: "Periodo", position: "bottom" }}
            />
            <YAxis
              label={{
                value: "Variazione della Temperatura (°C)",
                angle: -90,
                position: "left",
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metric-info">
        <h2>Spiegazione</h2>
        <p>
          Il grafico mostra l’aumento delle temperature medie terrestri rispetto
          all’epoca preindustriale, quando le emissioni di gas serra erano
          minime. Negli ultimi decenni, l’aumento si è intensificato a causa
          delle attività umane.
        </p>
      </div>
    </div>
  );
}
