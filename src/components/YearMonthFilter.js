import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchAvailableYears } from '../services/api';

const YearMonthFilter = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  const [yearsOptions, setYearsOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cachedYears = localStorage.getItem('availableYears');
    if (cachedYears) {
      setYearsOptions(JSON.parse(cachedYears));
    } else {
      setLoading(true);
      fetchAvailableYears().then(years => {
        const options = years.map(year => ({ value: year, label: `${year}` }));
        setYearsOptions(options);
        localStorage.setItem('availableYears', JSON.stringify(options));
        setLoading(false);
      }).catch(() => setLoading(false)); // Ensure loading is set to false even if the request fails
    }
  }, []);

  const monthsOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
    // Add all months
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="year-month-filter">
      <Select
        options={yearsOptions}
        onChange={setSelectedYear}
        value={selectedYear}
        placeholder="Select Year"
        isClearable={false}
      />
      <Select
        options={monthsOptions}
        onChange={setSelectedMonth}
        value={selectedMonth}
        placeholder="Select Month"
        isClearable
      />
    </div>
  );
};

export default YearMonthFilter;