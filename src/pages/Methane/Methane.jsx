import React, { useState } from 'react';
import useMetricData from "@/api/useMetricData";
import ChartCard from "@/components/ChartCard/ChartCard";

const Methane = () => {
  const [years, setYears] = useState(5);
  const { data, loading, error } = useMetricData('methane');

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data 😢</p>;
  if (!data || data.length === 0) {
    return <p>No data available 😕</p>;
  }

  return (
    <div data-page="methane">
      <ChartCard
      title="Methane Monitoring 🔥"
      data={data}
      unit = "ppb"
      description="Analysis of methane concentrations in the atmosphere, a powerful greenhouse gas with a strong impact on climate."
      yAxisLabel="Methane Concentration (ppb)"
      impactSections={[
        {
          title: "Greenhouse Potency",
          points: [
            "Methane is 25x more potent than CO₂ at trapping heat over 100 years",
            "Accounts for roughly 30% of human-caused warming",
            "Atmospheric concentration has more than doubled since pre-industrial times",
            "Warming rates in the Arctic are accelerating methane releases"
          ]
        },
        {
          title: "Climate & Environmental Effects",
          points: [
            "Accelerates global warming more rapidly than CO₂",
            "Creates dangerous feedback loops from melting permafrost",
            "Contributes to formation of ground-level ozone affecting air quality",
            "Threatens Arctic ecosystems and indigenous communities dependent on sea ice"
          ]
        }
      ]}
      actionSections={[
        {
          title: "Agricultural Solutions",
          points: [
            "Improve livestock management and reduce cattle farming emissions",
            "Install methane digesters on farms for energy generation",
            "Promote plant-based protein alternatives and sustainable agriculture",
            "Reduce rice paddy emissions through better water management"
          ]
        },
        {
          title: "Energy & Infrastructure",
          points: [
            "Transition away from coal and natural gas extraction",
            "Improve methane capture in mining and energy operations",
            "Upgrade wastewater treatment and landfill management systems",
            "Develop renewable energy to replace fossil fuel dependence"
          ]
        },
        {
          title: "Personal Actions",
          points: [
            "Reduce meat and dairy consumption, especially beef",
            "Support sustainable agriculture and local farming practices",
            "Reduce food waste which creates methane in landfills",
            "Advocate for methane regulations and permafrost protection",
            "Support organizations working on climate solutions"
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

export default Methane;
