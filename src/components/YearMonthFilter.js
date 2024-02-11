import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchAvailableYears, fetchAvailableMonthsForYear } from '../services/api';

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

const YearMonthFilter = React.memo(({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  const [yearsOptions, setYearsOptions] = useState([]);
  const [monthsOptions, setMonthsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // console.log("Initial selected year:", selectedYear);
  
  useEffect(() => {
    fetchAvailableYears().then(years => {
      const options = years.map(year => ({ value: year, label: `${year}` }));
      setYearsOptions(options);
      // console.log("Updated yearsOptions", options);
      // Automatically select the latest year if no year is selected
      if (!selectedYear || !selectedYear.value) {
        const latestYear = options[options.length - 1]; // Assumes the latest year is the last one in the array
        setSelectedYear(latestYear);
        fetchMonthsForYear(latestYear.value); // Fetch months for the latest year
      } else {
        setLoading(false);
      }
    }).catch(error => {
      // console.error("Failed to fetch years:", error);
      setLoading(false);
    });
  }, [setSelectedYear]);

  const fetchMonthsForYear = (year) => {
    fetchAvailableMonthsForYear(year).then(months => {
      // console.log("Months for ${year}:", months);
      const options = months.map(month => {
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
        return { value: month, label: monthName };
      });
      setMonthsOptions(options);
      // console.log("Updated monthsOptions", options);
      setLoading(false);
    }).catch(error => {
      // console.error("Failed to fetch months:", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    // console.log("Selected year changed:", selectedYear);
    if (selectedYear && selectedYear.value) {
      fetchMonthsForYear(selectedYear.value);
    }
  }, [selectedYear]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="year-month-filter">
      <Select
        styles={customStyles}
        theme={customTheme}
        options={yearsOptions}
        onChange={(year) => {
          setSelectedYear(year);
          // Optionally clear selectedMonth when changing years
          setSelectedMonth(null);
        }}
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
        isDisabled={!selectedYear}
      />
    </div>
  );
});

export default YearMonthFilter;