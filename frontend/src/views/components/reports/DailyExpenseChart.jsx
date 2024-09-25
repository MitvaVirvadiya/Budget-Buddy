import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Skeleton } from '@mui/material'; // MUI Skeleton for loading
import { useReports } from 'context/Reports';
import { getMonthName } from 'utils/dates';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

const DailyExpenseChart = () => {
  const { dailyExpensesData, isDailyExpensesLoading, selectedMonth, fetchDailyExpensesData } = useReports();

  useEffect(() => {
    // Fetch daily expenses data for the current month
    fetchDailyExpensesData(selectedMonth);
  }, [selectedMonth]);

  const sortedDailyExpensesData = dailyExpensesData.sort((a, b) => a.day - b.day);

  const chartOptions = {
    chart: {
      id: 'daily-expenses',
      type: 'bar',
      toolbar: { show: true },
      background: '#fff', // White background
      foreColor: '#333', // Text color
    },
    plotOptions: {
      bar: {
        borderRadius: 8, // Rounded corners
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: { enabled: false }, // Disable data labels on bars
    xaxis: {
      categories: sortedDailyExpensesData.map(item => `${item.day} ${getMonthName(selectedMonth)}`), // Day numbers
      labels: { style: { fontSize: '14px', colors: ['#333'] } },
    },
    title: {
      text: `Daily Expenses for ${getMonthName(selectedMonth)}`,
      align: 'center',
      style: { fontSize: '20px', fontWeight: 'bold', color: '#333' },
    },
    yaxis: {
      labels: { style: { fontSize: '14px', colors: ['#333'] }, formatter: (val) => formatCurrency(val) },
    },
    grid: { show: true, borderColor: '#e0e0e0' }, // Light grid border color
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => formatCurrency(val) },
    },
  };

  const chartSeries = [{ name: 'Expenses', data: sortedDailyExpensesData.map(item => item.total) }];

  const chartContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  };

  return (
    <div style={chartContainerStyle}>
      {isDailyExpensesLoading ? (
        <Skeleton variant="rectangular" height={350} width="100%" />
      ) : (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      )}
    </div>
  );
};

export default DailyExpenseChart;
