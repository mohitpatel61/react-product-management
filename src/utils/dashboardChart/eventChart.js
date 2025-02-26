import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required elements
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: ["#CB4335", "#1F618D", "#F1C40F", "#27AE60", "#884EA0", "#D35400"],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h4 className="text-center">Votes Distribution</h4>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
