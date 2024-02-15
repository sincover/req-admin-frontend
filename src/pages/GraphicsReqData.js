import React, { useState, useEffect, useCallback } from "react";
import YearMonthFilter from "../components/YearMonthFilter";
import "../styles/styles.css";
import {
  fetchTotalDivisionServices,
  fetchServiceReqs,
  fetchProjectOptions,
  fetchEventOptions,
  fetchSpecificServices,
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

const GraphicsReqData = () => {
  const [dataForSelectedServicesChart, setdataForSelectedServicesChart] =
    useState({
      labels: [],
      datasets: [],
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

  const service = "Graphics";
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [serviceReqData, setServiceReqData] = useState([]);
  const [divisionServicesData, setDivisionServicesData] = useState([]);
  const [projectOptionsData, setProjectOptionsData] = useState([]);
  const [eventOptionsData, setEventOptionsData] = useState([]);
  const [specificServicesData, setSpecificServicesData] = useState([]);
  const handleSetSelectedYear = useCallback((year) => {
    setSelectedYear(year);
  }, []);
  const handleSetSelectedMonth = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  // Manage selected year and month, fetch corresponding data from API
  useEffect(() => {
    if (selectedYear) {
      if (!selectedMonth) {
        fetchTotalDivisionServices(
          service.toLowerCase(),
          selectedYear.value
        ).then((data) => {
          const divisionServicesData = Array.isArray(data) ? data : [data];
          console.log(
            "Setting yearly divisionServicesData",
            divisionServicesData
          );
          setDivisionServicesData(divisionServicesData);
        });
        fetchServiceReqs(service, selectedYear.value).then((data) => {
          const serviceReqData = Array.isArray(data) ? data : [data];
          console.log("Setting yearly serviceReqsData", serviceReqData);
          setServiceReqData(serviceReqData);
        });
        fetchProjectOptions(service, selectedYear.value).then((data) => {
          const projectOptionsData = Array.isArray(data) ? data : [data];
          console.log("Setting yearly projectOptionsData", projectOptionsData);
          setProjectOptionsData(projectOptionsData);
        });
        fetchEventOptions(service, selectedYear.value).then((data) => {
          const eventOptionsData = Array.isArray(data) ? data : [data];
          console.log("Setting yearly eventOptionsData", eventOptionsData);
          setEventOptionsData(eventOptionsData);
        });
        fetchSpecificServices(service, selectedYear.value).then((data) => {
          const specificServicesData = Array.isArray(data) ? data : [data];
          console.log(
            "Setting yearly specificServicesData",
            specificServicesData
          );
          setSpecificServicesData(specificServicesData);
        });
      } else {
        fetchTotalDivisionServices(
          service.toLowerCase(),
          selectedYear.value,
          selectedMonth.value
        ).then((data) => {
          const formattedDivisionServicesData = Array.isArray(data)
            ? data
            : [data];
          console.log(
            "Setting monthly divisionServicesData",
            formattedDivisionServicesData
          );
          setDivisionServicesData(formattedDivisionServicesData);
        });
        fetchServiceReqs(service, selectedYear.value, selectedMonth.value).then(
          (data) => {
            const formattedServiceReqsData = Array.isArray(data)
              ? data
              : [data];
            console.log(
              "Setting monthly serviceReqsData",
              formattedServiceReqsData
            );
            setServiceReqData(formattedServiceReqsData);
          }
        );
        fetchProjectOptions(
          service,
          selectedYear.value,
          selectedMonth.value
        ).then((data) => {
          const formattedProjectOptionsData = Array.isArray(data)
            ? data
            : [data];
          console.log(
            "Setting monthly projectOptionsData",
            formattedProjectOptionsData
          );
          setProjectOptionsData(formattedProjectOptionsData);
        });
        fetchEventOptions(
          service,
          selectedYear.value,
          selectedMonth.value
        ).then((data) => {
          const formattedEventOptionsData = Array.isArray(data) ? data : [data];
          console.log(
            "Setting monthly eventOptionsData",
            formattedEventOptionsData
          );
          setEventOptionsData(formattedEventOptionsData);
        });
        fetchSpecificServices(
          service,
          selectedYear.value,
          selectedMonth.value
        ).then((data) => {
          const formattedSpecificServicesData = Array.isArray(data)
            ? data
            : [data];
          console.log(
            "Setting monthly SpecificServicesData",
            formattedSpecificServicesData
          );
          setSpecificServicesData(formattedSpecificServicesData);
        });
      }
    }
  }, [service, selectedYear, selectedMonth]);

  return (
    <div>
      <h4></h4>
      <YearMonthFilter
        selectedYear={selectedYear}
        setSelectedYear={handleSetSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={handleSetSelectedMonth}
      />
      <div>
        {" "}
        <span className="overview-label">Overview</span>
      </div>
      {/* Display data or charts here */}
      <div className="overview-section">
        {divisionServicesData.length > 0 &&
        serviceReqData.length > 0 &&
        projectOptionsData.length > 0 &&
        eventOptionsData.length > 0 ? (
          <>
            <div className="overview-item">
              <span className="overview-title">Reqs</span>
              <span className="overview-value">
                {serviceReqData[0]?.sumReqs || "Loading..."}
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-title">Services</span>
              <span className="overview-value">
                {divisionServicesData[0]?.sumServices || "Loading..."}
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-title">Projects</span>
              <span className="overview-value">
                {projectOptionsData[0]?.totalProjectOptions || "Loading..."}
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-title">Events</span>
              <span className="overview-value">
                {eventOptionsData[0]?.totalEventOptions || "Loading..."}
              </span>
            </div>
          </>
        ) : (
          <p>Loading services data...</p> // Or any other placeholder you prefer
        )}
      </div>
    </div>
  );
};

export default GraphicsReqData;
