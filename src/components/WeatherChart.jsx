import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ weather }) => {
  // Prepare labels (city names) and data (temperatures) for the chart
  const labels = weather.map((entry) => entry.city);
  const temperatures = weather.map((entry) => entry.temperature);

  const data = {
    labels, // Cities on the X-axis
    datasets: [
      {
        label: 'Temperature (°C)', // Legend Label
        data: temperatures, // Temperature values on the Y-axis
        borderColor: 'rgba(75,192,192,1)', // Line color
        backgroundColor: 'rgba(75,192,192,0.2)', // Fill under the line
        borderWidth: 2,
        tension: 0.4, // Curvature of the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trends by City',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '90%', margin: 'auto', marginTop: '30px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
