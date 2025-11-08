// src/pages/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAllMetricsData from "@/api/useAllMetricsData";
import "./Home.scss";

export default function Home() {
  const { temperature, co2, methane, no2, arctic, loading, error } =
    useAllMetricsData();
    
  console.log('Home component state:', {
    loading,
    error,
    dataLengths: {
      temperature: temperature?.length,
      co2: co2?.length,
      methane: methane?.length,
      no2: no2?.length,
      arctic: arctic?.length
    }
  });

  if (loading) return <p>Caricamento dati...</p>;
  if (error) return <p>Errore nel caricamento dei dati 😢</p>;
  
  // Verifica se qualche dataset non è stato ancora inizializzato
  if (!temperature || !co2 || !methane || !no2 || !arctic) {
    return <p>Inizializzazione dati in corso...</p>;
  }

  // Verifica se qualche dataset è vuoto
  if (
    temperature.length === 0 ||
    co2.length === 0 ||
    methane.length === 0 ||
    no2.length === 0 ||
    arctic.length === 0
  ) {
    return <p>Nessun dato disponibile per uno o più parametri 😕</p>;
  }

  // Helper per rendere ogni metrica in una card
  const renderCard = (title, data, color, path) => (
    <div className="chart-card" key={title}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data.slice(-20)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Link to={path} className="cta-link">
        Scopri di più →
      </Link>
    </div>
  );

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Monitoriamo il cambiamento globale 🌍</h1>
        <p>Dati reali, aggiornati e interattivi</p>
      </header>

      <div className="charts-grid">
        {renderCard(
          "Andamento delle Temperature",
          temperature,
          "#f97316",
          "/temperature"
        )}
        {renderCard("Andamento di CO₂", co2, "#16a34a", "/co2")}
        {renderCard("Andamento del Metano", methane, "#8b5cf6", "/methane")}
        {renderCard("Andamento di NO₂", no2, "#3b82f6", "/no2")}
        {renderCard(
          "Andamento del Ghiaccio Polare",
          arctic,
          "#0ea5e9",
          "/arctic"
        )}
      </div>
    </div>
  );
}
