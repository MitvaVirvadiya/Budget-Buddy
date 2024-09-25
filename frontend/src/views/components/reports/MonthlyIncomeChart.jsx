import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Skeleton } from '@mui/material'; // MUI Skeleton for loading
import { useReports } from 'context/Reports';
import { getMonthName } from 'utils/dates';

// Utility function to format currency (₹12,348)
const formatCurrency = (value) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

const MonthlyIncomeChart = () => {
  const { monthlyIncomeData, isMonthlyIncomeLoading, fetchMonthlyIncome } = useReports();

  useEffect(() => {
    fetchMonthlyIncome(); // Fetch income data on component mount
  }, []);

  // Sort the data by month to ensure consistent order
  const sortedMonthlyIncomeData = monthlyIncomeData.sort((a, b) => a.month - b.month);

  const chartOptions = {
    chart: {
      id: 'monthly-income',
      type: 'bar',
      toolbar: {
        show: true
      },
      background: '#fff', // White background
      foreColor: '#333' // Text color
    },
    plotOptions: {
      bar: {
        borderRadius: 8, // Rounded corners
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: sortedMonthlyIncomeData.map((item) => getMonthName(item.month)), // Month names
      labels: {
        style: {
          fontSize: '14px',
          colors: ['#333'] // x-axis label color
        }
      }
    },
    title: {
      text: 'Monthly Income',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          colors: ['#333'] // y-axis label color
        },
        formatter: (val) => formatCurrency(val) // Format y-axis labels with currency
      }
    },
    grid: {
      show: true,
      borderColor: '#e0e0e0' // Light grid border color
    },
    tooltip: {
      theme: 'light', // Light tooltip style
      y: {
        formatter: (val) => formatCurrency(val) // Format tooltip values with currency
      }
    },
    dataLabels: {
      enabled: false // Disable data labels on the bars
    }
  };

  const chartSeries = [
    {
      name: 'Income',
      data: sortedMonthlyIncomeData.map((item) => item.total) // Data for income
    }
  ];

  const chartContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    minHeight: '380px'
  };

  return (
    <div style={chartContainerStyle}>
      {/* Show the chart skeleton while loading */}
      {isMonthlyIncomeLoading ? (
        <Skeleton variant="rectangular" height={350} width="100%" />
      ) : (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      )}
    </div>
  );
};

export default MonthlyIncomeChart;
