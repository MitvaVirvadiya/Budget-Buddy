import React, { useState } from 'react';
import DownloadFiles from './components/DownloadFiles';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

const Exports = () => {
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';


  const token = localStorage.getItem('accessToken');

  const downloadExpenses = async () => {
    setExpenseLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/dashboard/export/expenses`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expenses.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to download file.');
      }
    } catch (error) {
      console.error('Error downloading expenses:', error);
    } finally {
      setExpenseLoading(false);
    }
  };

  const downloadIncome = async () => {
    setIncomeLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/dashboard/export/income`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'income.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to download file.');
      }
    } catch (error) {
      console.error('Error downloading income:', error);
    } finally {
      setIncomeLoading(false);
    }
  };
  

  const incomeFile = {
    name: 'Income',
    excel: true,
    isLoading: incomeLoading
  };

  const expenseFile = {
    name: 'Expense',
    excel: true,
    isLoading: expenseLoading
  };

  return (
    <div>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DownloadFiles file={incomeFile} onClick={downloadIncome} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DownloadFiles file={expenseFile} onClick={downloadExpenses} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Exports;
