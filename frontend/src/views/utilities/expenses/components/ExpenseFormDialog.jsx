import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useExpense } from 'context/Expense';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string(),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
});

const categories = [
  { value: 'Food', label: 'Food' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Education', label: 'Education' },
  { value: 'Medical', label: 'Medical' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Others', label: 'Others' },
];

const ExpenseFormDialog = ({ open, handleClose, initialData, isEdit }) => {
  const { addExpense, updateExpense } = useExpense();

  const handleSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await updateExpense(initialData._id, values);
    } else {
      await addExpense(values);
    }
    resetForm();
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>{isEdit ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <Formik
        initialValues={initialData || { name: '', category: '', description: '', amount: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  select
                  label="Category"
                  name="category"
                  fullWidth
                  error={touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  as={TextField}
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
                <Field
                  as={TextField}
                  label="Amount"
                  name="amount"
                  fullWidth
                  type="number"
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEdit ? 'Update Expense' : 'Add Expense'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ExpenseFormDialog;
