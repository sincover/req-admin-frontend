export const countByService = async (service) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/countByService?service=${service}`
  );
  const data = await response.json();
  return data;
};

export const fetchAvailableYears = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/available-years`
  );
  const years = await response.json();
  return years;
};

export const fetchAvailableMonthsForYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/available-months?year=${year}`
  );
  const monthsData = await response.json();
  return monthsData.find((entry) => entry.year === year)?.months || [];
};

export const fetchTotalProjects = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/totalProjects?year=${year}&month=${month}`
  );
  const projects = await response.json();
  return projects;
};

export const fetchTotalReqs = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/totalReqs?year=${year}&month=${month}`
  );
  const reqs = await response.json();
  return reqs;
};

export const fetchTotalBudgetEstimates = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/totalBudgetEstimates?year=${year}&month=${month}`
  );
  const budget = await response.json();
  return budget;
};

export const fetchTotalProjectsByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/totalProjectsByYear?year=${year}`
  );
  const projects = await response.json();
  return projects;
};

export const fetchTotalReqsByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/totalReqsByYear?year=${year}`
  );
  const reqs = await response.json();
  return reqs;
};

export const fetchTopAgencies = async (year, month) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/topAgencies?year=${year}&month=${month}`
  );
  const agencies = await response.json();
  return agencies;
};

export const fetchTopAgenciesByYear = async (year) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/topAgencies?year=${year}`
  );
  const agencies = await response.json();
  return agencies;
};

export const fetchTotalDivisionServices = async (service, year, month) => {
  let url = `${process.env.REACT_APP_LOCALIP}/submissions/totalDivisionServicesByYear?service=${service}&year=${year}&month=${month}`;
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }
  const response = await fetch(url);
  const services = await response.json();
  return services;
};

export const fetchServiceReqs = async (service, year, month) => {
  let url = `${process.env.REACT_APP_LOCALIP}/submissions/totalServiceReqsByYear?service=${service}&year=${year}&month=${month}`;
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }
  const response = await fetch(url);
  const reqs = await response.json();
  return reqs;
};

export const fetchProjectOptions = async (serviceType, year, month) => {
  let url = `${process.env.REACT_APP_LOCALIP}/submissions/projectOptions?serviceType=${serviceType}&year=${year}&month=${month}`;
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }
  const response = await fetch(url);
  const projects = await response.json();
  return projects;
};

export const fetchEventOptions = async (serviceType, year, month) => {
  let url = `${process.env.REACT_APP_LOCALIP}/submissions/eventOptions?serviceType=${serviceType}&year=${year}&month=${month}`;
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }
  const response = await fetch(url);
  const events = await response.json();
  return events;
};

export const fetchSpecificServices = async (service, year, month) => {
  let url = `${process.env.REACT_APP_LOCALIP}/submissions/specificServicesByYearAndMonth?service=${service}&year=${year}`;
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }

  const response = await fetch(url);
  const services = await response.json();
  return services;
};

export const fetchServicesOverYear = async (service, year) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCALIP}/submissions/servicesOverYear?serviceType=${service}&year=${year}`
  );
  const services = await response.json();
  return services;
};
