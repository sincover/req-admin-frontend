import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ProjectCountChart = ({ data, serviceName }) => {
  console.log('ProjectCountChart data:', data); // Log the data prop
  console.log('ProjectCountChart serviceName:', serviceName); // Log the serviceName prop

  const total = data.length > 0 ? data[0].total : 0; // Safely access the first item's total
  console.log('Total projects count:', total); // Log the total projects count

  const chartData = {
    labels: [serviceName], // Assuming serviceName is correctly passed as a prop
    datasets: [{
      label: 'Project Count',
      data: [total], // Use the total directly
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    }],
  };

  return <Bar data={chartData} />;
};

export { ProjectCountChart };