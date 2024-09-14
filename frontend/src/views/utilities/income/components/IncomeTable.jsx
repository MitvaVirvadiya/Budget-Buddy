import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import IncomeFormDialog from './IncomeFormDialog'; 
import { useIncome } from 'context/Income'; 
import CategoryIcon from './CategoryIcon'; 

const IncomeTable = () => {
  const { incomes, deleteIncome, fetchIncome, isLoading } = useIncome(); 
  const [openForm, setOpenForm] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null); 
  const [data, setData] = useState([]);

  const handleEdit = (income) => {
    setCurrentIncome(income); 
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteIncome(id); 
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentIncome(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const columns = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      Cell: ({ cell }) => formatDate(cell.getValue())
    },
    {
      accessorKey: 'source',
      header: 'Source'
    },
    {
      accessorKey: 'recurring',
      header: 'Recurring',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value ? 'Yes' : 'No'; 
      }
    },
    {
      accessorKey: 'category',
      header: 'Category',
      Cell: ({ cell }) => (
        <Box width="100%" height="100%" display="flex" justifyContent="space-between" alignItems="center">
          <CategoryIcon category={cell.getValue()} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {cell.getValue()}
          </Typography>
        </Box>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description'
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      Cell: ({ cell }) => `₹${cell.getValue()}` 
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleEdit(row.original)}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => handleDelete(row.original._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  useEffect(() => {
    const sortedIncomes = [...incomes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    setData(sortedIncomes);
  }, [incomes]);

  useEffect(() => {
    fetchIncome(); 
  }, []);

  return (
    <>
      <Box sx={{ height: 550, width: '100%' }}>
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            pagination: {
              pageSize: 10
            }
          }}
          state={{ isLoading }}
          muiCircularProgressProps={{
            color: 'secondary',
            thickness: 5,
            size: 55,
          }}
          muiSkeletonProps={{
            animation: 'pulse',
            height: 28,
          }}
          muiTableContainerProps={{ sx: { maxHeight: '450px' } }}
          muiTableProps={{
            sx: {
              overflow: 'hidden',
              '.MuiTableCell-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            }
          }}
          renderTopToolbarCustomActions={() => (
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h3" color="#555" ml={1} mt={1}>
                Incomes
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
                Add Income
              </Button>
            </Grid>
          )}
        />
      </Box>
      {openForm && (
        <IncomeFormDialog open={openForm} handleClose={handleCloseForm} currentIncome={currentIncome} isEdit={!!currentIncome} /> 
      )}
    </>
  );
};

export default IncomeTable;
