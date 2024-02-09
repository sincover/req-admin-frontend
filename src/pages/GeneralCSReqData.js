import React, { useState, useEffect } from 'react';
import YearMonthFilter from '../components/YearMonthFilter';
import { fetchTotalProjects, fetchTotalReqs, fetchTotalBudgetEstimates } from '../services/api';
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

const GeneralCSReqData = () => {

  const [dataForChart, setDataForChart] = useState({
    labels: [],
    datasets: []
  });  
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [projectData, setProjectData] = useState({});
  const [reqData, setReqData] = useState({});
  const [budgetData, setBudgetData] = useState({});

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchTotalProjects(selectedYear.value, selectedMonth.value).then(data => {
        console.log("Total Projects:", data);
        setProjectData(data[0]);
      });      
      fetchTotalReqs(selectedYear.value, selectedMonth.value).then(data => {
        console.log("Total Reqs:", data);
        setReqData(data);
      });      
      fetchTotalBudgetEstimates(selectedYear.value, selectedMonth.value).then(data => {
        console.log("Total Budget:", data);
        setBudgetData(data);
      });
      
    }
  }, [selectedYear, selectedMonth]);

  // Example of preparing data for a Bar chart
  useEffect(() => {
    if (projectData && Object.keys(projectData).length > 0) { // Ensure projectData is not empty
      const updatedDataForChart = {
        labels: ['Graphics', 'Photo', 'Video', 'Total'],
        datasets: [{
          label: `Total Projects for ${projectData.month}/${projectData.year}`,
          data: [
            projectData.totalGraphicsProjects,
            projectData.totalPhotoProjects,
            projectData.totalVideoProjects,
            projectData.totalProjects,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      };
  
      setDataForChart(updatedDataForChart); // Update state
    }
  }, [projectData]); // Depend on projectData
  
  return (
    <div>
      <h2>General CS Req Data</h2>
      <YearMonthFilter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {/* Render charts here */}
      <div>
        <h3>Total Projects by Service</h3>
        
        {dataForChart.labels.length > 0 && <Bar data={dataForChart} />}
      </div>
      {/* Similar setups for reqData and budgetData */}
    </div>
  );
};

export default GeneralCSReqData;
