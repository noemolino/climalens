import React, { useState } from "react";
import useMetricData from "@/api/useMetricData";
import ChartCard from "@/components/ChartCard/ChartCard";

export default function Temperature() {
  const [years, setYears] = useState(5);
  const { data, loading, error } = useMetricData("temperature");

  if (loading)
    return <div className="loading-state">Loading temperature data...</div>;
  if (error)
    return <div className="error-state">Error loading temperature 😢</div>;
  if (!data?.length)
    return <div className="error-state">No data available...</div>;

  return (
    <div data-page="temperature">
      <ChartCard
        title="Temperature Trend 🌡️"
        data={data}
        unit="°C"
        description="The trend of global temperature is a key indicator of global warming. This graph shows the increase in average land temperatures from 1880 to today."
        yAxisLabel="Temperature Variation (°C)"
        impactSections={[
          {
            title: "Climate Consequences",
            points: [
              "More frequent and intense heat waves causing health emergencies",
              "Disruption of weather patterns leading to extreme precipitation events",
              "Accelerated melting of glaciers and polar ice contributing to sea level rise",
              "Threat to biodiversity and wildlife habitats worldwide",
            ],
          },
          {
            title: "Human & Ecosystem Impacts",
            points: [
              "Food security challenges from crop failures and agricultural disruption",
              "Mass migration from vulnerable regions affected by climate stress",
              "Ocean acidification damaging marine ecosystems and fisheries",
              "Increased risk of climate tipping points triggering irreversible changes",
            ],
          },
        ]}
        actionSections={[
          {
            title: "Energy Transition",
            points: [
              "Shift to renewable energy sources (solar, wind, hydroelectric)",
              "Improve energy efficiency in buildings and industry",
              "Phase out fossil fuel dependence systematically",
            ],
          },
          {
            title: "Nature & Land Use",
            points: [
              "Protect and restore forests acting as carbon sinks",
              "Promote sustainable agriculture and forestry practices",
              "Preserve natural carbon sinks like forests and wetlands",
            ],
          },
          {
            title: "Personal Actions",
            points: [
              "Reduce home energy consumption through efficiency improvements",
              "Use public transportation, cycling, or electric vehicles",
              "Adopt plant-based diets and reduce food waste",
              "Support climate-conscious businesses and advocate for policies",
            ],
          },
        ]}
        years={years}
        onYearsChange={setYears}
        maxYears={Math.floor(data.length / 12)}
      />
    </div>
  );
}
