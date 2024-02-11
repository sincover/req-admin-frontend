import React, { useState, useEffect } from 'react';
import YearMonthFilter from '../components/YearMonthFilter';
import { fetchTotalProjects, fetchTotalReqs, fetchTotalBudgetEstimates, fetchAvailableYears, fetchAvailableMonthsForYear } from '../services/api';
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
  const [projectData, setProjectData] = useState([]);
  const [reqData, setReqData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchTotalProjects(selectedYear.value, selectedMonth.value).then(data => {
        const formattedData = Array.isArray(data) ? data : [data];
        console.log("Setting projectData", formattedData);
        setProjectData(formattedData);
      });      
      fetchTotalReqs(selectedYear.value, selectedMonth.value).then(data => {
        // console.log("Total Reqs:", data);
        setReqData(data);
      });      
      fetchTotalBudgetEstimates(selectedYear.value, selectedMonth.value).then(data => {
        // console.log("Total Budget:", data);
        setBudgetData(data);
      });
      
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchAvailableYears().then(years => {
      // Assuming `years` is an array of year numbers [2018, 2019, 2020, ...]
      const lastAvailableYear = years[years.length - 1]; // Get the last year as the default
  
      // Convert the year to the expected format for YearMonthFilter
      const defaultYear = { value: lastAvailableYear.toString(), label: lastAvailableYear.toString() };
  
      setSelectedYear(defaultYear);
      // After setting the default year, fetch available months for that year
      fetchAvailableMonthsForYear(lastAvailableYear).then(months => {
        if (months.length > 0) {
          const lastAvailableMonth = months[months.length - 1]; // Assuming `months` is sorted
          const monthName = new Date(lastAvailableYear, lastAvailableMonth - 1).toLocaleString('default', { month: 'long' });
          const defaultMonth = { value: lastAvailableMonth.toString(), label: monthName };
          setSelectedMonth(defaultMonth);
        }
      });
    });
  }, []);

  useEffect(() => {
    // Ensure projectData is an array and contains data
    if (Array.isArray(projectData) && projectData.length > 0) {
      let aggregatedData;
  
      if (!selectedMonth) {
        // Aggregate data for the entire year
        aggregatedData = projectData.reduce((acc, curr) => {
          acc.totalGraphicsProjects += curr.totalGraphicsProjects;
          acc.totalPhotoProjects += curr.totalPhotoProjects;
          acc.totalVideoProjects += curr.totalVideoProjects;
          acc.totalProjects += curr.totalProjects;
          return acc;
        }, { totalGraphicsProjects: 0, totalPhotoProjects: 0, totalVideoProjects: 0, totalProjects: 0 });
      } else {
        // Find data for the selected month
const monthData = projectData.find(data => data.month === selectedMonth.value.toString().padStart(2, '0'));
        aggregatedData = monthData ? { 
          totalGraphicsProjects: monthData.totalGraphicsProjects,
          totalPhotoProjects: monthData.totalPhotoProjects,
          totalVideoProjects: monthData.totalVideoProjects,
          totalProjects: monthData.totalProjects,
        } : { totalGraphicsProjects: 0, totalPhotoProjects: 0, totalVideoProjects: 0, totalProjects: 0 }; // Default to 0 if month-specific data is not found
      }
  
      const dataForChart = {
        labels: ['Graphics', 'Photo', 'Video', 'Total'],
        datasets: [{
          label: selectedMonth ? `Total Projects for ${selectedMonth.label}/${selectedYear.label}` : `Total Projects for ${selectedYear.label}`,
          data: [
            aggregatedData.totalGraphicsProjects,
            aggregatedData.totalPhotoProjects,
            aggregatedData.totalVideoProjects,
            aggregatedData.totalProjects,
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
          borderWidth: 1,
        }],
      };
  
      setDataForChart(dataForChart);
    }
  }, [projectData, selectedYear, selectedMonth]);
  

console.log("Final Data for Chart:", dataForChart);
  return (
    <div>
      <h2></h2>
      <YearMonthFilter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {/* Render charts here */}
      <div>
        <h3></h3>
        
        {dataForChart.labels.length > 0 && <Bar 
        data={dataForChart}
        style={{
          alignContent: 'center',
          width: '100%',
          maxWidth: '1500px',
          height: '300px',
          maxHeight: '1200px',
          margin: '0 auto',
          
        }} 
        />}
      </div>
      {/* Similar setups for reqData and budgetData */}
    </div>
  );
};

export default GeneralCSReqData;
