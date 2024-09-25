import React, { useEffect, useState, useContext } from 'react';
import ApexCharts from 'react-apexcharts';
import { Skeleton, Typography } from '@mui/material';
import { useReports } from 'context/Reports';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const chartContainerStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  minHeight: '380px'
};

const CategoryPieChart = ({ apiEndpoint, title }) => {
  const { selectedMonth } = useReports(); // Only for monthly pie charts
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
          },
          params: { selectedMonth } // Add your month parameter here
        };

        // Make API call using axios
        const response = await axios.get(`${BACKEND_URL}/api/v1/report${apiEndpoint}`, authHeadersConfig);
        setData(response.data.data); // Assuming the API returns 'data' as the category totals
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, selectedMonth]); // Refetch when selectedMonth changes

  const chartOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true, // Enable toolbar
        tools: {
          download: true, // Allow chart export (PNG, SVG)
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
        export: {
          csv: {
            filename: `${title}-category-wise-data`,
            columnDelimiter: ',',
            headerCategory: 'Category',
            headerValue: 'Total'
          },
          svg: {
            filename: `${title}-category-wise-chart`
          },
          png: {
            filename: `${title}-category-wise-chart`
          }
        },
        autoSelected: 'zoom' // Optional: sets the default selected tool
      }
    },
    labels: data.map((item) => item.category),
    tooltip: {
      y: {
        formatter: (value) => `₹${value.toLocaleString()}`
      }
    },
    legend: {
      position: 'bottom'
    }
  };

  const chartSeries = data.map((item) => item.total);

  return (
    <div style={chartContainerStyle}>
      {loading ? (
      <Skeleton variant="rectangular" width="100%" height={360} />) : (
      <>
        <Typography variant="h6" gutterBottom textAlign="center" fontSize="20px" fontWeight="600">
          {title}
        </Typography>

        <ApexCharts options={chartOptions} series={chartSeries} type="pie" height={360} />
      </>
      )}
    </div>
  );
};

export default CategoryPieChart;
