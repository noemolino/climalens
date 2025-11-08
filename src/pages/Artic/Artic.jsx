import React, { useState } from 'react';
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
import "./Artic.scss";

const Arctic = () => {
  const [years, setYears] = useState(45); // default: ultimi 45 anni
  const { data, loading, error } = useMetricData('arctic');

  if (loading) return <p>Caricamento dati...</p>;
  if (error) return <p>Errore nel caricamento dei dati 😢</p>;
  if (!data || data.length === 0) {
    return <p>Nessun dato disponibile 😕</p>;
  }

  // Filtra i dati in base al periodo scelto
  const filteredData = data.slice(-years);

  return (
    <div className="metric-container">
      <header className="metric-header">
        <h1>Monitoraggio Ghiaccio Artico 🧊</h1>
        <p className="metric-description">
          Analisi delle variazioni della calotta polare artica nel tempo,
          un indicatore cruciale del cambiamento climatico globale.
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
              label={{ value: 'Periodo', position: 'bottom' }}
            />
            <YAxis
              label={{
                value: 'Estensione del Ghiaccio Artico (Milioni di Km²)',
                angle: -90,
                position: 'left',
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0ea5e9"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metric-info">
        <h2>Impatto del Cambiamento</h2>
        <p>
          La riduzione del ghiaccio artico è uno degli indicatori più visibili
          del riscaldamento globale. Il suo scioglimento non solo minaccia
          gli ecosistemi polari ma contribuisce anche all'innalzamento del
          livello del mare.
        </p>
      </div>
    </div>
  );
};

export default Arctic;
