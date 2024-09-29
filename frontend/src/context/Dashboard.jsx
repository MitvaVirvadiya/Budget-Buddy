import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { authHeadersConfig } from 'utils/headers';

const dashBoardContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const DashBoardProvider = ({ children }) => {
  const [expenseData, setExpenseData] = useState({});
  const [isExpenseLoading, setExpenseLoading] = useState(false);

  const [incomeData, setIncomeData] = useState({});
  const [isIncomeLoading, setIncomeLoading] = useState(false);

  const fetchExpenseData = async () => {
    setExpenseLoading(true);
    setExpenseData({});
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/dashboard/expenses`, authHeadersConfig);
      if (response.data.success) {
        setExpenseData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error('Fetching Expense data failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setExpenseLoading(false);
    }
  };

  const fetchIncomeData = async () => {
    setIncomeLoading(true);
    setIncomeData({});
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/dashboard/incomes`, authHeadersConfig);
      if (response.data.success) {
        setIncomeData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error('Fetching Income data failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setIncomeLoading(false);
    }
  };

  return (
    <dashBoardContext.Provider value={{ expenseData, isExpenseLoading, fetchExpenseData, incomeData, isIncomeLoading, fetchIncomeData }}>
      {children}
    </dashBoardContext.Provider>
  );
};

export const useDashBoard = () => useContext(dashBoardContext);
