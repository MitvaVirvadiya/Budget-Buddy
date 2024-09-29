import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useBudget } from 'context/Budget';
import { gridSpacing } from 'store/constant';
import ApexCharts from 'react-apexcharts';

const Dashboard = () => {
  const { budgets, fetchBudgets, addBudget, updateBudget, deleteBudget, isLoading } = useBudget();
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAddBudget = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    addBudget(amount, month, year);
    window.location.reload();  // Refresh the page after adding budget
  };

  const handleUpdateBudget = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    updateBudget(amount, month, year);
    fetchBudgets();
  };

  const handleDeleteBudget = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    deleteBudget(month, year);
    window.location.reload();  // Refresh the page after adding budget
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Card elevation={1}>
            <CardContent>
              {budgets?.budgetExists ? (
                <>
                  <Typography variant="h2" gutterBottom>
                    Budget for this Month
                  </Typography>
                  <Typography variant="h4" fontWeight='500' color="textSecondary">
                    Budget:           ₹{budgets.budget.amount}
                  </Typography>
                  <Typography variant="h4" fontWeight='500' color="textSecondary">
                    Total Expenses:   ₹{budgets.totalExpenses}
                  </Typography>
                  <Typography variant="h4" fontWeight='500' color="textSecondary">
                    Remaining Budget: ₹{budgets.remainingBudget}
                  </Typography>
                  <Box mt={3} display="flex" gap={2}>
                    <TextField
                      label="New Budget Amount"
                      variant="outlined"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateBudget}>
                      Update 
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteBudget}>
                      Delete 
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {budgets?.message || 'No budget set for this month.'}
                  </Typography>
                  <Box mt={2} display="flex" gap={2}>
                    <TextField
                      label="Budget Amount"
                      variant="outlined"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAddBudget}>
                      Set Budget
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Progress Bar */}
      {budgets?.budgetExists && (
        <Grid item xs={12} mt={4}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget vs Expenses
              </Typography>
              <ApexCharts
                options={{
                  chart: { type: 'bar' },
                  plotOptions: { bar: { horizontal: true } },
                  xaxis: { categories: ['Total Budget', 'Total Expenses'] },
                }}
                series={[
                  {
                    name: 'Amount',
                    data: [budgets.budget.amount, budgets.totalExpenses],
                  },
                ]}
                type="bar"
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
