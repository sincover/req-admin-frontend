import { Bar } from 'react-chartjs-2';

const ProjectCountChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.service),
    datasets: [{
      label: 'Project Count',
      data: data.map(d => d.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };

  return <Bar data={chartData} />;
};
