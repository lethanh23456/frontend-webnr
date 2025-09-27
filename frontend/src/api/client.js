import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api/auth';


export const api = {
  // GET method
  get: async (url, config = {}) => {
    return await axios.get(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    });
  },

  // POST method
  post: async (url, data = {}, config = {}) => {
    return await axios.post(`${API_BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    });
  },

  // PUT method
  put: async (url, data = {}, config = {}) => {
    return await axios.put(`${API_BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    });
  },

  // DELETE method
  delete: async (url, config = {}) => {
    return await axios.delete(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    });
  },

  // PATCH method
  patch: async (url, data = {}, config = {}) => {
    return await axios.patch(`${API_BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    });
  }
};

export { API_BASE_URL };