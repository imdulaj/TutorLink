import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const lineData = {
    labels,
    datasets: [
      {
        label: 'User Activity',
        data: [65, 59, 80, 81, 56, 70],
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Quiz Attempts',
        data: [30, 45, 60, 50, 40, 55],
        backgroundColor: '#2196F3',
        borderRadius: 5,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>User Activity</h3>
        <Line data={lineData} />
      </div>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Quiz Attempts</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default ChartComponent;
