import React, { useState } from 'react';
import useMetricData from "@/api/useMetricData";
import ChartCard from "@/components/ChartCard/ChartCard";

const Arctic = () => {
  const [years, setYears] = useState(5);
  const { data, loading, error } = useMetricData('arctic');

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data 😢</p>;
  if (!data || data.length === 0) {
    return <p>No data available 😕</p>;
  }

  return (
    <div data-page="artic">
      <ChartCard
      title="Arctic Ice Monitoring 🧊"
      data={data}
      unit = "mln km²"
      description="Analysis of variations in the Arctic polar ice cap over time, a crucial indicator of global climate change."
      yAxisLabel="Arctic Ice Extent (Million Km²)"
      impactSections={[
        {
          title: "Ecosystem Threat",
          points: [
            "Endangers polar bears, seals, walruses and other marine mammals",
            "Disrupts food chains that indigenous communities depend upon",
            "Threatens breeding grounds and migration routes of arctic species",
            "Accelerates species extinction in polar regions"
          ]
        },
        {
          title: "Global Climate Effects",
          points: [
            "Loss of reflective ice (albedo effect) accelerates warming",
            "Contributes significantly to rising sea levels threatening coastal cities",
            "Disrupts jet stream causing extreme weather events globally",
            "Arctic warming 2-3x faster than global average (Arctic amplification)"
          ]
        }
      ]}
      actionSections={[
        {
          title: "Emission Reduction",
          points: [
            "Aggressively reduce greenhouse gas emissions (all sources)",
            "Transition to renewable energy as fast as possible",
            "Limit warming to 1.5°C as specified in Paris Agreement",
            "Support carbon pricing and emissions trading systems"
          ]
        },
        {
          title: "Conservation & Protection",
          points: [
            "Protect forests and natural carbon sinks from deforestation",
            "Support permafrost preservation to prevent methane release",
            "Create marine protected areas in the Arctic",
            "Respect indigenous rights and knowledge in Arctic conservation"
          ]
        },
        {
          title: "Personal & Systemic Actions",
          points: [
            "Reduce your carbon footprint through energy and consumption choices",
            "Support Arctic conservation organizations and initiatives",
            "Advocate for strong climate policies at all government levels",
            "Help protect vulnerable communities affected by climate change",
            "Promote international Arctic cooperation and climate agreements",
            "Educate others about Arctic importance to global climate stability"
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

export default Arctic;
