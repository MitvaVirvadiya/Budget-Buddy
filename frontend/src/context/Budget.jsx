import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const budgetContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // Fetch all budgets
  const fetchBudgets = async () => {
    setLoading(true);
    setBudgets({});
    const authHeadersConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/budget`, authHeadersConfig);
      console.log('response', response);
      if (response.status === 200) {
        console.log('response.data.data', response.data.data);
        setBudgets(response.data.data); // Adjust to your data structure
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Fetching budgets failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add a new budget
  const addBudget = async (values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-based, so we add 1 to make it 1-based
      const currentYear = currentDate.getFullYear();

      const payload = {
        amount: values,
        month: currentMonth, // 1-based month
        year: currentYear // current year
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/budget`, payload, authHeadersConfig);
      if (response.data.status === 201) {
        toast.success('Budget added successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Adding budget failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Update an existing budget
  const updateBudget = async ( values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // getMonth() is 0-based, so we add 1 to make it 1-based
      const year = currentDate.getFullYear();

      const payload = {
        amount: values,
        month, // 1-based month
        year // current year
      };

      const response = await axios.put(`${BACKEND_URL}/api/v1/budget/${year}/${month}`, payload, authHeadersConfig);
      if (response.data.status === 200) {
        toast.success('Budget updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Updating budget failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Delete a budget
  const deleteBudget = async () => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // getMonth() is 0-based, so we add 1 to make it 1-based
      const year = currentDate.getFullYear();

      const response = await axios.delete(`${BACKEND_URL}/api/v1/budget/${year}/${month}`, authHeadersConfig);
      if (response.data.status === 200) {
        toast.success('Budget deleted successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error('Deleting budget failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return (
    <budgetContext.Provider value={{ budgets, fetchBudgets, addBudget, updateBudget, deleteBudget, isLoading }}>
      {children}
    </budgetContext.Provider>
  );
};

export const useBudget = () => useContext(budgetContext);
