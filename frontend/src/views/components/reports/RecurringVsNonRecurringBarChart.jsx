import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Skeleton, Typography } from '@mui/material';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const chartContainerStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  minHeight: '380px'
};

const RecurringVsNonRecurringBarChart = ({ apiEndpoint, title }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authHeadersConfig = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        };

        // API call using axios
        const response = await axios.get(`${BACKEND_URL}/api/v1/report${apiEndpoint}`, authHeadersConfig);
        setData(response.data.data); // Assuming the API returns the response as 'data'
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const barChartOptions = {
    chart: {
      type: 'bar',
      stacked: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%'
      }
    },
    xaxis: {
      categories: ['Total Income', 'Monthly Income']
    },
    legend: {
      position: 'bottom'
    },
    tooltip: {
      y: {
        formatter: (value) => `₹${value.toLocaleString()}`
      }
    }
  };

  const barChartSeries = [
    {
      name: 'Recurring',
      data: data ? [data.totalIncome[0].recurring, data.monthlyIncome[0].recurring] : []
    },
    {
      name: 'Non-Recurring',
      data: data ? [data.totalIncome[0].nonRecurring, data.monthlyIncome[0].nonRecurring] : []
    }
  ];

  return (
    <div style={chartContainerStyle}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={360} />
      ) : (
        <>
          <Typography variant="h6" gutterBottom textAlign="center" fontSize="20px" fontWeight="600">
            {title}
          </Typography>

          <ApexCharts options={barChartOptions} series={barChartSeries} type="bar" height={360} />
        </>
      )}
    </div>
  );
};

export default RecurringVsNonRecurringBarChart;
