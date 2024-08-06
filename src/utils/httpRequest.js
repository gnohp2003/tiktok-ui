import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// custom get method
const get = async (path, options = {}) => {
  try {
    const response = await httpRequest.get(path, options);
    return response.data.data;
  } catch (error) {}
};

export default httpRequest;
export { get };
