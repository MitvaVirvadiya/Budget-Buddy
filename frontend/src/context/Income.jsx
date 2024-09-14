import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const incomeContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchIncome = async () => {
    setLoading(true);

    const authHeadersConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/incomes`, authHeadersConfig);
      if (response.data.success) {
        setIncomes(response.data.data);
      }
    } catch (error) {
      console.error('Fetching Income failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/incomes`, values, authHeadersConfig);
      if (response.data.success) {
        toast.success('Income added successfully');
        setIncomes((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Adding income failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const updateIncome = async (id, values) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.put(`${BACKEND_URL}/api/v1/incomes/${id}`, values, authHeadersConfig);
      if (response.data.success) {
        toast.success('Income updated successfully');
        setIncomes((prev) => prev.map((income) => (income._id === id ? response.data.data : income)));
      }
    } catch (error) {
      console.error('Updating income failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const deleteIncome = async (id) => {
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.delete(`${BACKEND_URL}/api/v1/incomes/${id}`, authHeadersConfig);
      if (response.data.success) {
        toast.success('Income deleted successfully');
        setIncomes((prev) => prev.filter((income) => income._id !== id));
      }
    } catch (error) {
      console.error('Deleting income failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return (
    <incomeContext.Provider value={{ incomes, fetchIncome, addIncome, updateIncome, deleteIncome, isLoading }}>
      {children}
    </incomeContext.Provider>
  );
};

export const useIncome = () => useContext(incomeContext);
