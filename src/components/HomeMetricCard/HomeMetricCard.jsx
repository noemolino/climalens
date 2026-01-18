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

const HomeMetricCard = ({ title, data, color, path, yAxisLabel, status }) => {
  const axisColor = "#D1D9E0";

  return (
    <Link to={path} className="chart-card" style={{ textDecoration: 'none' }}>
      <h3>{title}</h3>
      
      {status && (
        <span
          className="status-badge"
          style={{
            backgroundColor: `${status.color}20`,
            color: status.color,
            border: `1px solid ${status.color}`,
          }}
        >
          ● {status.label}
        </span>
      )}

      {status && (
        <p className="status-insight">
          Current:{" "}
          <strong>
            {status.current} {status.unit}
          </strong>
          <span style={{ margin: "0 8px" }}>•</span>
          Threshold: {status.limit} {status.unit}
          <span style={{ margin: "0 8px" }}>•</span>
          <em>{status.reason}</em>
        </p>
      )}

      <div className="chart-container">
        <div className="y-axis-label">{yAxisLabel}</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={axisColor}
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="time"
              tick={{ fill: axisColor }}
              stroke={axisColor}
              strokeOpacity={0.5}
              tickMargin={10}
            />
            <YAxis
              tick={{ fill: axisColor }}
              stroke={axisColor}
              strokeOpacity={0.5}
              tickMargin={10}
              domain={["auto", "auto"]}
            />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="x-axis-label">Period</div>

      <div className="cta-link">
        Discover more →
      </div>
    </Link>
  );
};

export default HomeMetricCard;