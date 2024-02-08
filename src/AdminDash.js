import React, { useState, useEffect } from 'react';
import { countByService } from './services/api';
import { ProjectCountChart } from './components/ProjectCountChart';
import { ServiceFilterDropdown } from './components/ServiceFilterDropdown';

const Dashboard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedService) return;
      const data = await countByService(selectedService.value);
      setChartData([{ service: selectedService.label, count: data.total }]);
    };

    fetchData();
  }, [selectedService]);

  const handleServiceChange = selectedOption => {
    setSelectedService(selectedOption);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ServiceFilterDropdown onChange={handleServiceChange} />
      {selectedService && <ProjectCountChart data={chartData} />}
    </div>
  );
};

export default Dashboard;
