import React, { useState, useEffect, useCallback } from "react";
import YearMonthFilter from "../components/YearMonthFilter";
import "../styles/styles.css";
import {
  fetchTotalProjects,
  fetchTotalReqs,
  fetchTopAgencies,
  fetchTopAgenciesByYear,
  fetchAvailableYears,
  fetchAvailableMonthsForYear,
  fetchTotalProjectsByYear,
  fetchTotalReqsByYear,
} from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralCSReqData = () => {
  const [dataForAllProjectsChart, setdataForAllProjectsChart] = useState({
    labels: [],
    datasets: [],
  });

  const [dataForAllReqsChart, setdataForAllReqsChart] = useState({
    labels: [],
    datasets: [],
  });

  const [dataForTopAgenciesChart, setdataForTopAgenciesChart] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
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
    maintainAspectRatio: false,
  };

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [reqData, setReqData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const handleSetSelectedYear = useCallback((year) => {
    setSelectedYear(year);
  }, []);

  const handleSetSelectedMonth = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedYear) {
      // If no month is selected, fetch yearly aggregated data
      if (!selectedMonth) {
        fetchTotalProjectsByYear(selectedYear.value).then((projectData) => {
          // console.log("Setting yearly projectData", projectData);
          setProjectData(projectData);
        });
        fetchTotalReqsByYear(selectedYear.value).then((reqData) => {
          //console.log("Setting yearly reqData", reqData);
          setReqData(reqData);
        });
        fetchTopAgenciesByYear(selectedYear.value).then((agencyData) => {
          // console.log("Setting yearly agencyData", agencyData);
          setAgencyData(agencyData);
        });
      } else {
        // If a month is selected, fetch data for that specific month
        fetchTotalProjects(selectedYear.value, selectedMonth.value).then(
          (data) => {
            const formattedProjectData = Array.isArray(data) ? data : [data];
            // console.log("Setting monthly projectData", formattedProjectData);
            setProjectData(formattedProjectData);
          }
        );
        fetchTotalReqs(selectedYear.value, selectedMonth.value).then((data) => {
          const formattedReqData = Array.isArray(data) ? data : [data];
          // console.log("Setting monthly reqData", formattedReqData);
          setReqData(formattedReqData);
        });
        fetchTopAgencies(selectedYear.value, selectedMonth.value).then(
          (data) => {
            const formattedAgencyData = Array.isArray(data) ? data : [data];
            // console.log("Setting monthly agencyData", formattedAgencyData);
            setAgencyData(formattedAgencyData);
          }
        );
      }
    }
  }, [selectedYear, selectedMonth]);

  //!! Optional: Default to the latest available months for the selected year
  // useEffect(() => {
  //   // This effect depends on selectedYear, so it runs after selectedYear is set
  //   if (selectedYear && selectedYear.value) {
  //     fetchAvailableMonthsForYear(selectedYear.value).then(months => {
  //       if (months.length > 0) {
  //         const lastAvailableMonth = months[months.length - 1];
  //         const monthName = new Date(selectedYear.value, lastAvailableMonth - 1).toLocaleString('default', { month: 'long' });
  //         const defaultMonth = { value: lastAvailableMonth.toString().padStart(2, '0'), label: monthName };
  //         setSelectedMonth(defaultMonth); // Then set the month
  //       }
  //     });
  //   }
  // }, [selectedYear]);

  useEffect(() => {
    if (Array.isArray(projectData) && projectData.length > 0) {
      const data = projectData[0]; // Assuming the API returns an array with a single object for yearly data

      const dataForAllProjectsChart = {
        labels: ["Graphics", "Photo", "Video", "Total"],
        datasets: [
          {
            label: selectedMonth
              ? `Total Projects for ${selectedMonth.label}/${selectedYear.label}`
              : `Total Projects for ${selectedYear.label}`,
            data: [
              data.totalGraphicsProjects,
              data.totalPhotoProjects,
              data.totalVideoProjects,
              data.totalProjects,
            ],
            backgroundColor: [
              "rgba(8, 140, 255, 0.5)",
              "rgba(8, 140, 255, 0.5)",
              "rgba(8, 140, 255, 0.5)",
              "rgba(8, 140, 255, 1)",
            ],
            borderColor: [
              "rgba(8, 140, 255, 0.5)",
              "rgba(8, 140, 255, 0.2)",
              "rgba(8, 140, 255, 0.2)",
              "rgba(8, 140, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      setdataForAllProjectsChart(dataForAllProjectsChart);
    }
  }, [projectData, selectedYear, selectedMonth]);

  useEffect(() => {
    if (Array.isArray(reqData) && reqData.length > 0) {
      const data = reqData[0]; // Assuming the API returns an array with a single object for yearly data

      const dataForAllReqsChart = {
        labels: ["Reqs"],
        datasets: [
          {
            label: selectedMonth
              ? `Total Reqs for ${selectedMonth.label}/${selectedYear.label}`
              : `Total Reqs for ${selectedYear.label}`,
            data: [data.reqs],
            backgroundColor: ["rgba(8, 140, 255, 0.5)"],
            borderColor: ["rgba(8, 140, 255, 0.5)"],
            borderWidth: 1,
          },
        ],
      };

      setdataForAllReqsChart(dataForAllReqsChart);
    }
  }, [reqData, selectedYear, selectedMonth]);

  useEffect(() => {
    if (Array.isArray(agencyData) && agencyData.length > 0) {
      const dynamicLabels = Object.keys(agencyData[0])
        .filter((key) => key !== "year" && key !== "month")
        .map((label) => label.toUpperCase());

      const dynamicData = dynamicLabels.map((label) => {
        const originalKey = label.toLowerCase(); // Convert back to original key
        return agencyData[0][originalKey];
      });

      const dataForTopAgenciesChart = {
        labels: dynamicLabels,
        datasets: [
          {
            label: selectedMonth
              ? `Agency Data for ${selectedMonth.label}/${selectedYear.label}`
              : `Agency Data for ${selectedYear.label}`,
            data: dynamicData,
            backgroundColor: "rgba(8, 140, 255, 0.5)",
            borderColor: "rgba(8, 140, 255, 0.5)",
            borderWidth: 1,
          },
        ],
      };

      setdataForTopAgenciesChart(dataForTopAgenciesChart);
    }
  }, [agencyData, selectedYear, selectedMonth]);
  // console.log("overview data:", dataForTopAgenciesChart);
  // console.log("Agency data:", agencyData);
  // console.log("data for overview:", projectData[0].totalGraphicsProjects, projectData[0].totalPhotoProjects, projectData[0].totalVideoProjects, projectData[0].totalProjects);

  // Preprocess data to exclude labels and data points with values <= 0 or null
  const preprocessChartData = (chartData) => {
    // Check if datasets array exists and has at least one dataset
    if (!chartData.datasets || chartData.datasets.length === 0) {
      // Return chartData as is or handle this case as needed
      return chartData;
    }

    // Proceed assuming the first dataset exists
    const dataset = chartData.datasets[0];

    // Ensure dataset.data is defined
    if (!dataset.data) {
      // Return chartData as is or handle this case as needed
      return chartData;
    }

    const filteredLabels = [];
    const filteredData = [];

    dataset.data.forEach((value, index) => {
      if (value > 0) {
        // Check if the value is greater than 0
        filteredData.push(value);
        filteredLabels.push(chartData.labels[index]); // Keep the label for this value
      }
    });

    // Create a new dataset with the filtered data
    const newDataset = {
      ...dataset,
      data: filteredData,
    };

    // Return new chart data with filtered labels and dataset
    return {
      ...chartData,
      labels: filteredLabels,
      datasets: [newDataset],
    };
  };

  // Usage within your component:
  const filteredChartData = preprocessChartData(dataForAllProjectsChart);

  return (
    <div>
      <h2></h2>
      <YearMonthFilter
        selectedYear={selectedYear}
        setSelectedYear={handleSetSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={handleSetSelectedMonth}
      />
      {/* Overview Section */}
      <div className="overview-section">
        {projectData.length > 0 ? (
          Object.entries({
            "Graphics Projects": projectData[0]?.totalGraphicsProjects,
            "Photo Projects": projectData[0]?.totalPhotoProjects,
            "Video Projects": projectData[0]?.totalVideoProjects,
            "Total Projects": projectData[0]?.totalProjects,
          })
            .filter(([_, value]) => value > 0)
            .map(([title, value]) => (
              <div key={title} className="overview-item">
                <span className="overview-title">{title}</span>
                <span className="overview-value">{value}</span>
              </div>
            ))
        ) : (
          <p>Loading project data...</p> // Placeholder for empty or loading data
        )}
      </div>
      {/* Chart Section */}
      {/* Render charts here */}
      <div>
        <h3></h3>

        {filteredChartData.labels.length > 0 && (
          <Bar
            data={filteredChartData}
            options={chartOptions}
            style={{
              alignContent: "center",
              width: "100%",
              maxWidth: "1500px",
              height: "100%",
              maxHeight: "1200px",
              margin: "0 auto",
            }}
          />
        )}
      </div>
      {/* Similar setups for reqData and budgetData */}
      <div className="overview-section">
        {reqData.length > 0 ? (
          <>
            <div className="overview-item">
              <span className="overview-title">Total Reqs Submitted</span>
              <span className="overview-value">
                {reqData[0]?.reqs || "Loading..."}
              </span>
            </div>
          </>
        ) : (
          <p>Loading req data...</p> // Or any other placeholder you prefer
        )}
      </div>
      <div>
        {" "}
        <span className="overview-label">
          Top {dataForTopAgenciesChart.labels.length} agencies by reqs submitted
        </span>
      </div>
      <div className="overview-section">
        {dataForTopAgenciesChart.datasets.length > 0 &&
        dataForTopAgenciesChart.datasets[0].data.length > 0 &&
        agencyData.length > 0 ? (
          dataForTopAgenciesChart.labels.map((label, index) => (
            <div key={label} className="overview-item">
              <span className="overview-title">{label}</span>
              <span className="overview-value">
                {dataForTopAgenciesChart.datasets[0].data[index] || ""}
              </span>
            </div>
          ))
        ) : (
          <p>Loading agency data...</p> // Or any other placeholder you prefer
        )}
      </div>
    </div>
  );
};

export default GeneralCSReqData;
