import React, { useState, useEffect } from 'react';
import YearMonthFilter from '../components/YearMonthFilter';
import '../styles/GeneralCSReqData.css';
import { fetchTotalProjects, fetchTotalReqs, fetchTotalBudgetEstimates, fetchAvailableYears, fetchAvailableMonthsForYear, fetchTotalProjectsByYear } from '../services/api';
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
      }
  );
  
  const options = {
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
  };

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [reqData, setReqData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    if (selectedYear) {
      // If no month is selected, fetch yearly aggregated data
      if (!selectedMonth) {
          fetchTotalProjectsByYear(selectedYear.value).then(data => {
              // console.log("Setting yearly projectData", data);
              setProjectData(data);
          });
      } else {
          // If a month is selected, fetch data for that specific month
          fetchTotalProjects(selectedYear.value, selectedMonth.value).then(data => {
              const formattedData = Array.isArray(data) ? data : [data];
              // console.log("Setting monthly projectData", formattedData);
              setProjectData(formattedData);
          });
      }
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
          const defaultMonth = { value: lastAvailableMonth.toString().padStart(2, '0'),
            label: monthName };
          setSelectedMonth(defaultMonth);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(projectData) && projectData.length > 0) {
        const data = projectData[0]; // Assuming the API returns an array with a single object for yearly data

        const dataForChart = {
            labels: ['Graphics', 'Photo', 'Video', 'Total'],
            datasets: [{
                label: selectedMonth ? `Total Projects for ${selectedMonth.label}/${selectedYear.label}` : `Total Projects for ${selectedYear.label}`,
                data: [
                    data.totalGraphicsProjects,
                    data.totalPhotoProjects,
                    data.totalVideoProjects,
                    data.totalProjects,
                ],
                backgroundColor: [
                    'rgba(8, 140, 255, 0.5)',
                    'rgba(8, 140, 255, 0.5)',
                    'rgba(8, 140, 255, 0.5)',
                    'rgba(8, 140, 255, 1)',
                ],
                borderColor: [
                    'rgba(8, 140, 255, 0.5)',
                    'rgba(8, 140, 255, 0.2)',
                    'rgba(8, 140, 255, 0.2)',
                    'rgba(8, 140, 255, 1)',
                ],
                borderWidth: 1,
            }],
        };

        setDataForChart(dataForChart);
    }
}, [projectData, selectedYear, selectedMonth]);
  

// console.log("data for overview:", projectData[0].totalGraphicsProjects, projectData[0].totalPhotoProjects, projectData[0].totalVideoProjects, projectData[0].totalProjects);
  return (
    <div>
      <h2></h2>
      <YearMonthFilter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {/* Overview Section */}
      <div className="overview-section">
  {projectData.length > 0 ? ( // Ensure projectData is not empty
    <>
      <div className="overview-item">
        <span className="overview-title">Graphics Projects</span>
        <span className="overview-value">{projectData[0]?.totalGraphicsProjects || 'Loading...'}</span>
      </div>
      <div className="overview-item">
        <span className="overview-title">Photo Projects</span>
        <span className="overview-value">{projectData[0]?.totalPhotoProjects || 'Loading...'}</span>
      </div>
      <div className="overview-item">
        <span className="overview-title">Video Projects</span>
        <span className="overview-value">{projectData[0]?.totalVideoProjects || 'Loading...'}</span>
      </div>
      <div className="overview-item">
        <span className="overview-title">Total Projects</span>
        <span className="overview-value">{projectData[0]?.totalProjects || 'Loading...'}</span>
      </div>
    </>
  ) : (
    <p>Loading project data...</p> // Or any other placeholder you prefer
  )}
</div>
  {/* Chart Section */}
      {/* Render charts here */}
      <div>
        <h3></h3>
        
        {dataForChart.labels.length > 0 && <Bar 
        data={dataForChart}
        options={options}
        style={{
          alignContent: 'center',
          width: '100%',
          maxWidth: '1500px',
          height: '300px',
          maxHeight: '1200px',
          margin: '0 auto',
          
        }} 
        />
        }
      </div>
      {/* Similar setups for reqData and budgetData */}
    </div>
  );
};

export default GeneralCSReqData;
