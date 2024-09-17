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

const IncomeExpenseTreemap = ({ apiEndpoint, title }) => {
  const [data, setData] = useState([]);
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

        // Make API call using axios
        const response = await axios.get(`${BACKEND_URL}/api/v1/report${apiEndpoint}`, authHeadersConfig);
        setData(response.data.data); // Assuming the API returns 'data'
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const treemapOptions = {
    chart: {
      type: 'treemap'
    },
    title: {
      text: title
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

  // Map the data into a format for the treemap
  const treemapSeries = [
    {
      data: data.map((item) => ({
        x: item.category, // Category name
        y: item.total // Total value
      }))
    }
  ];

  return (
    <div style={chartContainerStyle}>
      {loading ? (
      <Skeleton variant="rectangular" width="100%" height={360} />) : (
      <>
        <Typography variant="h6" gutterBottom textAlign="center" fontSize="20px" fontWeight="600">
          {title}
        </Typography>

        <ApexCharts options={treemapOptions} series={treemapSeries} type="treemap" height={360} />
      </>
      )}
    </div>
  );
};

export default IncomeExpenseTreemap;
