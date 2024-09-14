import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useIncome } from 'context/Income';
import { CustomCheckboxField } from 'views/components/CustomCheckboxField';

const validationSchema = Yup.object({
  source: Yup.string().required('Source is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string(),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  receivedDate: Yup.date().nullable().required('Date is required'),
  recurring: Yup.boolean()
});

const categories = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Business', label: 'Business' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Rental', label: 'Rental' },
  { value: 'Investments', label: 'Investments' },
  { value: 'Others', label: 'Others' }
];

const IncomeFormDialog = ({ open, handleClose, currentIncome, isEdit }) => {
  const { addIncome, updateIncome } = useIncome();

  const initialData = {
    source: currentIncome?.source || '',
    category: currentIncome?.category || '',
    amount: currentIncome?.amount || '',
    description: currentIncome?.description || '',
    receivedDate: currentIncome?.receivedDate || new Date(),
    recurring: currentIncome?.recurring || false
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await updateIncome(currentIncome._id, values);
    } else {
      await addIncome(values);
    }
    resetForm();
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>{isEdit ? 'Edit Income' : 'Add Income'}</DialogTitle>
      <Formik initialValues={initialData} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  as={TextField}
                  label="Source"
                  name="source"
                  fullWidth
                  required
                  error={touched.source && !!errors.source}
                  helperText={touched.source && errors.source}
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
                <Field
                  as={TextField}
                  label="Date Received"
                  name="dateReceived"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={touched.dateReceived && !!errors.dateReceived}
                  helperText={touched.dateReceived && errors.dateReceived}
                />
                <CustomCheckboxField name="recurring" label="Recurring" />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEdit ? 'Update Income' : 'Add Income'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default IncomeFormDialog;
