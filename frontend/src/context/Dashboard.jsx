import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { authHeadersConfig } from 'utils/headers';

const dashBoardContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const DashBoardProvider = ({ children }) => {
 
  const [dashBoardData, setDashBoardData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchDashBoardData = async () => {
    setLoading(true);
    setDashBoardData({})
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/dashboard`, authHeadersConfig);
      if (response.data.success) {
        setDashBoardData(response.data.data);
      }
    } catch (error) {
      console.error('Fetching dashboard data failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return <dashBoardContext.Provider value={{ dashBoardData, isLoading, fetchDashBoardData }}>{children}</dashBoardContext.Provider>;
};

export const useDashBoard = () => useContext(dashBoardContext);
