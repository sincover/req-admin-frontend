export const countByService = async (service) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/countByService?service=${service}`);
    const data = await response.json();
    return data;
  };
  