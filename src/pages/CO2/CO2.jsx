import React, { useState } from "react";
import useMetricData from "@/api/useMetricData";
import ChartCard from "@/components/ChartCard/ChartCard";

const CO2 = () => {
  const [years, setYears] = useState(5);
  const { data, loading, error } = useMetricData("co2");

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data 😢</p>;
  if (!data || data.length === 0) {
    return <p>No data available 😕</p>;
  }

  return (
    <div data-page="co2">
      <ChartCard
      title="CO₂ Monitoring 🏭"
      data={data}
      unit = "ppm"
      description="Analysis of carbon dioxide concentrations in the atmosphere, one of the main greenhouse gases responsible for global warming."
      yAxisLabel="CO₂ Concentration (ppm)"
      impactSections={[
        {
          title: "Greenhouse Effect & Climate",
          points: [
            "CO₂ traps heat in the atmosphere, intensifying the greenhouse effect",
            "Higher concentrations correlate directly with global temperature rise",
            "Has increased from 280 ppm (pre-industrial) to over 420 ppm today",
            "At current rates, CO₂ levels continue accelerating without action"
          ]
        },
        {
          title: "Environmental Consequences",
          points: [
            "Ocean acidification damages marine ecosystems and shellfish industries",
            "Severe weather events increase in frequency and intensity",
            "Crop failures and agricultural yield reduction threaten food security",
            "Disruption of ocean currents affecting global weather patterns"
          ]
        }
      ]}
      actionSections={[
        {
          title: "Energy & Industry",
          points: [
            "Transition from fossil fuels to renewable energy sources",
            "Improve energy efficiency across buildings and transportation",
            "Support carbon capture technologies and storage solutions",
            "Enforce stricter industrial emission controls"
          ]
        },
        {
          title: "Natural Solutions",
          points: [
            "Protect and restore forests that absorb CO₂",
            "Implement reforestation and afforestation programs",
            "Support wetland and peatland conservation",
            "Promote sustainable land use practices"
          ]
        },
        {
          title: "Personal Actions",
          points: [
            "Use renewable energy at home (solar panels, green energy plans)",
            "Reduce energy consumption and waste",
            "Use public transportation or electric vehicles instead of driving",
            "Eat less meat and support sustainable food systems",
            "Support climate-friendly companies and policies"
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

export default CO2;
