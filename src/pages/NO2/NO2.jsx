import React, { useState } from 'react';
import useMetricData from "@/api/useMetricData";
import ChartCard from "@/components/ChartCard/ChartCard";

const NO2 = () => {
  const [years, setYears] = useState(5);
  const { data, loading, error } = useMetricData('no2');

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data 😢</p>;
  if (!data || data.length === 0) {
    return <p>No data available 😕</p>;
  }

  return (
    <div data-page="no2">
      <ChartCard
      title="NO₂ Monitoring 💨"
      data={data}
      unit = "ppb"
      description="Analysis of nitrogen dioxide concentrations in the atmosphere, an important indicator of air pollution."
      yAxisLabel="NO₂ Concentration (ppb)"
      impactSections={[
        {
          title: "Health Consequences",
          points: [
            "Damages respiratory system causing asthma and respiratory diseases",
            "Reduces lung function and increases cardiovascular problems",
            "Children and elderly face disproportionate health risks",
            "Contributes to premature deaths in polluted urban areas"
          ]
        },
        {
          title: "Environmental Damage",
          points: [
            "Forms photochemical smog reducing visibility and quality of life",
            "Contributes to acid rain damaging forests, water bodies, and buildings",
            "Harms plants and ecosystems leading to biodiversity loss",
            "Particularly concentrated in urban areas with heavy traffic"
          ]
        }
      ]}
      actionSections={[
        {
          title: "Transportation",
          points: [
            "Transition to electric vehicles and phase out combustion engines",
            "Expand and improve public transportation networks",
            "Promote cycling infrastructure and pedestrian-friendly cities",
            "Implement congestion charges and low-emission zones"
          ]
        },
        {
          title: "Industrial & Energy",
          points: [
            "Strengthen industrial emission controls and monitoring",
            "Transition to renewable energy from power plants",
            "Modernize combustion processes in manufacturing",
            "Enforce strict air quality standards nationwide"
          ]
        },
        {
          title: "Personal Actions",
          points: [
            "Use public transportation instead of driving when possible",
            "Support electric vehicle adoption in your community",
            "Avoid idling and maintain vehicle emissions systems properly",
            "Support air quality monitoring initiatives",
            "Use air purifiers in high-pollution areas and ventilate homes",
            "Advocate for stricter emissions regulations and clean air policies"
          ]
        }
      ]}
      years={years}
      onYearsChange={setYears}
      maxYears={Math.floor(data.length / 12)} 
    />
    </div>
  );
};

export default NO2;
