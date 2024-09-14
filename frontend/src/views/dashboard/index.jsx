import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';

import { gridSpacing } from 'store/constant';

// assets

import { useDashBoard } from 'context/Dashboard';
import { useExpense } from 'context/Expense';
import { useIncome } from 'context/Income';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { expenses } = useExpense();
  const { incomes } = useIncome();
  const { expenseData, isExpenseLoading, fetchExpenseData, incomeData, isIncomeLoading, fetchIncomeData } = useDashBoard();

  useEffect(() => {
    fetchExpenseData();
  }, [expenses]);

  useEffect(() => {
    fetchIncomeData();
  }, [incomes]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isExpenseLoading} data={expenseData} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isExpenseLoading} data={expenseData} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isIncomeLoading} data={incomeData} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isIncomeLoading} data={incomeData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
