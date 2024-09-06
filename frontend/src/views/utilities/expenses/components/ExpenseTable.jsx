import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ExpenseFormDialog from './ExpenseFormDialog';
import { useExpense } from 'context/Expense';
import CategoryIcon from './CategoryIcon'; // Custom category icon component

const ExpenseTable = () => {
  const { expenses, deleteExpense, fetchExpenses } = useExpense();
  const [openForm, setOpenForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [data, setData] = useState([]);

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentExpense(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(); // Formats the date to MM/DD/YYYY
  };

  // Columns definition for Material React Table
  const columns = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      Cell: ({ cell }) => formatDate(cell.getValue())
    },
    {
      accessorKey: 'name',
      header: 'Name'
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
      header: 'Description',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      Cell: ({ cell }) => `₹${cell.getValue()}` // Formatting amount as currency
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
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setData(sortedExpenses);
  }, [expenses]); 

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
          Add Expense
        </Button>
      </Grid>
      <Box sx={{ height: 480, width: '100%' }}>
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            pagination: {
              pageSize: 5
            }
          }}
          muiTableContainerProps={{ sx: { maxHeight: '350px' } }}
          muiTableProps={{
            sx: {
              overflow: 'hidden', // Hide overflow
              '.MuiTableCell-root': {
                whiteSpace: 'nowrap', // Prevent text wrapping
                overflow: 'hidden', // Hide overflowed content
                textOverflow: 'ellipsis' // Add ellipsis for overflowed text
              }
            }
          }}
        />
      </Box>
      {openForm && (
        <ExpenseFormDialog open={openForm} handleClose={handleCloseForm} initialData={currentExpense} isEdit={!!currentExpense} />
      )}
    </>
  );
};

export default ExpenseTable;
