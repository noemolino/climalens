import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./ChartCard.scss";

const ChartCard = ({
  title,
  description,
  data,
  color,
  unit,
  yAxisLabel,
  impactSections,
  actionSections,
  years,
  onYearsChange,
  maxYears,
}) => {
  if (!data || data.length === 0) {
    return <div className="metric-container">Loading chart data...</div>;
  }

  // Metric Identification and Helpers
  const isArctic = title.includes("Polar Ice");
  const getYear = (timeStr) => Number.parseInt(String(timeStr).split("-")[0]);
  
  const getValue = (item) => {
    if (!item) return 0;
    return isArctic ? Number.parseFloat(item.anom || 0) : Number.parseFloat(item.value || 0);
  };

  // Data Filtering (Based on the actual year to avoid the first-load bug)
  const latestYear = getYear(data[data.length - 1].time);
  const filteredData = data.filter((d) => getYear(d.time) >= latestYear - years);

  // Statistics Calculation (On the full dataset for historical consistency)
  const lastItem = data[data.length - 1];
  const currentValue = getValue(lastItem).toFixed(2);
  const peakValue = Math.max(...data.map((d) => getValue(d))).toFixed(2);

  // 10-Year Change Calculation (approx. 120 months for monthly data)
  const tenYearsAgoIndex = Math.max(0, data.length - 121);
  const tenYearChange = (Number.parseFloat(currentValue) - getValue(data[tenYearsAgoIndex])).toFixed(2);
  const changeColor = Number.parseFloat(tenYearChange) > 0 ? "#ef4444" : "#10b981";

  const axisColor = "#D1D9E0";

  return (
    <div className="metric-container">
      <header className="metric-header">
        <h1>{title}</h1>
        <p className="metric-description">{description}</p>
      </header>

      <div className="hero-stats-row">
        <div className="stat-card">
          <span className="stat-label">Current Value</span>
          <span className="stat-value">{currentValue} {unit}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">All-Time Peak</span>
          <span className="stat-value">{peakValue} {unit}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">10-Year Change</span>
          <span className="stat-value" style={{ color: changeColor }}>
            {Number.parseFloat(tenYearChange) > 0 ? `+${tenYearChange}` : tenYearChange} {unit}
          </span>
        </div>
      </div>

      <div className="metric-chart">
        <div className="chart-controls">
          <label>Time Range:</label>
          <select
            value={years}
            onChange={(e) => onYearsChange(Number(e.target.value))}
          >
            <option value={5}>Last 5 years</option>
            <option value={10}>Last 10 years</option>
            <option value={20}>Last 20 years</option>
            <option value={30}>Last 30 years</option>
            <option value={50}>Last 50 years</option>
            <option value={maxYears}>All Time</option>
          </select>
        </div>

        <div className="chart-wrapper">
          <div className="chart-container">
            <div className="y-axis-label">{yAxisLabel}</div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={axisColor}
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: axisColor, fontSize: 12 }}
                  stroke={axisColor}
                  tickMargin={15}
                  minTickGap={50}
                  tickFormatter={(value) => String(value).split("-")[0]}
                />
                <YAxis
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                  tickMargin={10}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                  itemStyle={{ color: color }}
                />
                <Line
                  type="monotone"
                  dataKey={isArctic ? "anom" : "value"}
                  stroke={color}
                  strokeWidth={2}
                  dot={years <= 5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="x-axis-label">Timeline (Years)</div>
        </div>
      </div>

      <div className="info-grid">
        {impactSections && impactSections.length > 0 && (
          <div className="info-column metric-impact">
            <h2>Impact ⚠️</h2>
            {impactSections.map((section, index) => (
              <div key={index} className="info-sub-section">
                <h3>{section.title}</h3>
                <ul>
                  {section.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {actionSections && actionSections.length > 0 && (
          <div className="info-column metric-actions">
            <h2>What We Can Do 💡</h2>
            {actionSections.map((section, index) => (
              <div key={index} className="info-sub-section">
                <h3>{section.title}</h3>
                <ul>
                  {section.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;