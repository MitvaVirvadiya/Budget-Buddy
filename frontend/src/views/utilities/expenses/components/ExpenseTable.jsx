import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ExpenseFormDialog from './ExpenseFormDialog';
import { useExpense } from 'context/Expense';

const ExpenseTable = () => {
  const { expenses, deleteExpense } = useExpense();
  const [openForm, setOpenForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

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

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Box sx={{ flex: 1 }}/>
        <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
          Add Expense
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Category</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Amount</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(expense)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(expense._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openForm && (
        <ExpenseFormDialog
          open={openForm}
          handleClose={handleCloseForm}
          initialData={currentExpense}
          isEdit={!!currentExpense}
        />
      )}
    </>
  );
};

export default ExpenseTable;
