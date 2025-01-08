import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register necessary components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  // Sample data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales in 2025",
        data: [28, 31, 51, 90, 76, 84],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Adds a smooth curve to the line
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales (in units)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-center">
        {/* Container for the chart with a fixed size */}
        <div className="w-full md:w-104 h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
