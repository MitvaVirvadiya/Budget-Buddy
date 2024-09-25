import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Skeleton } from '@mui/material'; // Import MUI Skeleton
import { useReports } from 'context/Reports';
import { getMonthName } from 'utils/dates';

// Utility function to format currency (₹12,348)
const formatCurrency = (value) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

const MonthlyExpensesChart = () => {
  const { monthlyExpensesData, isMonthlyExpensesLoading, fetchMonthlyExpenses } = useReports();

  useEffect(() => {
    fetchMonthlyExpenses();
  }, []);

  const sortedMonthlyExpensesData = monthlyExpensesData.sort((a, b) => a.month - b.month);

  const chartOptions = {
    chart: {
      id: 'monthly-expenses',
      type: 'bar',
      toolbar: {
        show: true
      },
      background: '#fff', // White background
      foreColor: '#333' // Text color
    },
    plotOptions: {
      bar: {
        borderRadius: 8, // Rounded corners on bars
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: sortedMonthlyExpensesData.map((item) => getMonthName(item.month)), // Use the utility function
      labels: {
        style: {
          fontSize: '14px',
          colors: ['#333'] // x-axis label color
        }
      }
    },
    title: {
      text: 'Monthly Expenses',
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
    dataLabels: {
      enabled: false // Disable data labels on the bars
    },
    grid: {
      show: true,
      borderColor: '#e0e0e0' // Light border for the grid
    },
    tooltip: {
      theme: 'light', // Light tooltip style
      y: {
        formatter: (val) => formatCurrency(val) // Format tooltip values with currency
      }
    }
  };

  const chartSeries = [
    {
      name: 'Expenses',
      data: sortedMonthlyExpensesData.map((item) => item.total) // Data for expenses
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
      {isMonthlyExpensesLoading ? (
        <Skeleton variant="rectangular" height={350} width="100%" />
      ) : (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      )}
    </div>
  );
};

export default MonthlyExpensesChart;
