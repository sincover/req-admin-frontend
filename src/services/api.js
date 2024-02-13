export const countByService = async (service) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/countByService?service=${service}`
  );
  const data = await response.json();
  return data;
};

export const fetchAvailableYears = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/available-years`
  );
  const years = await response.json();
  return years;
};

export const fetchAvailableMonthsForYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/available-months?year=${year}`
  );
  const monthsData = await response.json();
  return monthsData.find((entry) => entry.year === year)?.months || [];
};

export const fetchTotalProjects = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/totalProjects?year=${year}&month=${month}`
  );
  const projects = await response.json();
  return projects;
};

export const fetchTotalReqs = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/totalReqs?year=${year}&month=${month}`
  );
  const reqs = await response.json();
  return reqs;
};

export const fetchTotalBudgetEstimates = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/totalBudgetEstimates?year=${year}&month=${month}`
  );
  const budget = await response.json();
  return budget;
};

export const fetchTotalProjectsByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/totalProjectsByYear?year=${year}`
  );
  const projects = await response.json();
  return projects;
};

export const fetchTotalReqsByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/totalReqsByYear?year=${year}`
  );
  const reqs = await response.json();
  return reqs;
};

export const fetchTopAgencies = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/topAgencies?year=${year}&month=${month}`
  );
  const agencies = await response.json();
  return agencies;
};

export const fetchTopAgenciesByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/topAgencies?year=${year}`
  );
  const agencies = await response.json();
  return agencies;
};
