import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { authHeadersConfig } from 'utils/headers';

const reportContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const ReportProvider = ({ children }) => {
  const [monthlyExpensesData, setMonthlyExpensesData] = useState([]);
  const [isMonthlyExpensesLoading, setIsMonthlyExpensesLoading] = useState(false);

  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [isMonthlyIncomeLoading, setIsMonthlyIncomeLoading] = useState(false);

  const [dailyExpensesData, setDailyExpensesData] = useState([]);
  const [dailyIncomeData, setDailyIncomeData] = useState([]);
  const [isDailyExpensesLoading, setDailyExpensesLoading] = useState(false);
  const [isDailyIncomeLoading, setDailyIncomeLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const fetchMonthlyExpenses = async () => {
    setIsMonthlyExpensesLoading(true);
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/report/expenses/monthly`, authHeadersConfig);
      if (response.data.success) {
        setMonthlyExpensesData(response.data.data);
      }
    } catch (error) {
      console.error('Fetching Monthly Expenses data failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setIsMonthlyExpensesLoading(false);
    }
  };

  const fetchMonthlyIncome = async () => {
    setIsMonthlyIncomeLoading(true);
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/report/income/monthly`, authHeadersConfig);
      if (response.data.success) {
        setMonthlyIncomeData(response.data.data);
      }
    } catch (error) {
      console.error('Fetching Monthly Income data failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setIsMonthlyIncomeLoading(false);
    }
  };

  const fetchDailyExpensesData = async (month) => {
    setDailyExpensesLoading(true);
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/report/expenses/daily`, {
        ...authHeadersConfig,
        params: { month }
      });
      if (response.data.success) {
        setDailyExpensesData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching daily expenses data:', error.response?.data?.message || error.message);
    } finally {
      setDailyExpensesLoading(false);
    }
  };

  const fetchDailyIncomeData = async (month) => {
    setDailyIncomeLoading(true);
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/report/income/daily`, {
        ...authHeadersConfig,
        params: { month }
      });
      if (response.data.success) {
        setDailyIncomeData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching daily income data:', error.response?.data?.message || error.message);
    } finally {
      setDailyIncomeLoading(false);
    }
  };

  const updateMonth = (month) => {
    setSelectedMonth(month);
    fetchDailyExpensesData(month);
    fetchDailyIncomeData(month);
  };

  return (
    <reportContext.Provider
      value={{
        monthlyExpensesData,
        isMonthlyExpensesLoading,
        fetchMonthlyExpenses,

        monthlyIncomeData,
        isMonthlyIncomeLoading,
        fetchMonthlyIncome,

        dailyExpensesData,
        dailyIncomeData,
        isDailyExpensesLoading,
        isDailyIncomeLoading,
        updateMonth,
        selectedMonth,

        fetchDailyExpensesData,
        fetchDailyIncomeData,

      }}
    >
      {children}
    </reportContext.Provider>
  );
};

export const useReports = () => useContext(reportContext);
