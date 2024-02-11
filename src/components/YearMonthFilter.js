import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchAvailableYears } from '../services/api';

const customTheme = (theme) => ({
  ...theme,
  borderRadius: 5,
  colors: {
    ...theme.colors,
    primary25: '#088cff',
    primary: '#088cff',
  },
  spacing: {
    ...theme.spacing,
    // Adjust spacing if needed
  },
});

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: 20,
    color: 'green', // Font color for the text inside the control
    backgroundColor: '#171819',
    border: 'none',
    boxShadow: 'none', // Remove boxShadow if any
    '&:hover': {
      border: 0,
    }, 
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 20,
    color: state.isSelected ? 'white' : '#A2A3A3',
    backgroundColor: state.isSelected ? '#A2A3A3' : '#171819',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white', // Font color for the selected item
  }),
  // Add more customization as needed for other parts
};

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
        styles={customStyles}
        theme={customTheme}
        options={yearsOptions}
        onChange={setSelectedYear}
        value={selectedYear}
        placeholder="Select Year"
        isClearable={false}
      />
      <Select
        styles={customStyles}
        theme={customTheme}
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