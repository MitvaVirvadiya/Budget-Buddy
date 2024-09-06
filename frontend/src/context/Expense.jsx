import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const expenseContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);

    const authHeadersConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/expenses`, authHeadersConfig);
      if (response.data.success) {
        setExpenses(response.data.data);
      }
    } catch (error) {
      console.error('Fetching expenses failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/expenses`, values, authHeadersConfig);
      if (response.data.success) {
        toast.success('Expense added successfully');
        setExpenses((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Adding expense failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const updateExpense = async (id, values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.put(`${BACKEND_URL}/api/v1/expenses/${id}`, values, authHeadersConfig);
      if (response.data.success) {
        toast.success('Expense updated successfully');
        setExpenses((prev) => prev.map((expense) => (expense._id === id ? response.data.data : expense)));
      }
    } catch (error) {
      console.error('Updating expense failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };
      
      const response = await axios.delete(`${BACKEND_URL}/api/v1/expenses/${id}`, authHeadersConfig);
      if (response.data.success) {
        toast.success('Expense deleted successfully');
        setExpenses((prev) => prev.filter((expense) => expense._id !== id));
      }
    } catch (error) {
      console.error('Deleting expense failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return (
    <expenseContext.Provider value={{ expenses, fetchExpenses,  addExpense, updateExpense, deleteExpense, isLoading }}>
      {children}
    </expenseContext.Provider>
  );
};

export const useExpense = () => useContext(expenseContext);
