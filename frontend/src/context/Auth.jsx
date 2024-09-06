import axios from 'axios';

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authHeadersConfig, headersConfig } from 'utils/headers';

const authContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const loginUser = async (values) => {
    setUser(null);

    const body = {
      username: values.username,
      password: values.password
    };

    console.log('body', body);

    try {
      const headersConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`, body, headersConfig);

      if (response.data.success) {
        toast.success(response.data.message);
        const { user: loggedInUser, accessToken, refreshToken } = response.data.data;

        setUser(loggedInUser);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  const registerUser = async (values) => {
    const body = {
      email: values.email,
      username: values.username,
      password: values.password,
      role: values.role
    };

    try {
      const headersConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/users/register`, body, headersConfig);

      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error('Register failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const getUser = async (values) => {
    setUser(null);
    setLoading(true);
    try {
      const authHeadersConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      const response = await axios.get(`${BACKEND_URL}/api/v1/users/current-user`, authHeadersConfig);

      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Get User failed:', error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return <authContext.Provider value={{ user, isLoading, loginUser, registerUser, getUser }}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
