import { Grid, Paper } from '@mui/material';
import React from 'react';
import DailyExpenseChart from 'views/components/reports/DailyExpenseChart';
import DailyIncomeChart from 'views/components/reports/DailyIncomeChart';
import MonthSelector from './MonthSelector';
import CategoryPieChart from 'views/components/reports/CategoryPieChart';
import { useReports } from 'context/Reports';
import RecurringVsNonRecurringBarChart from 'views/components/reports/RecurringVsNonRecurringBarChart';
import IncomeExpenseTreemap from 'views/components/reports/IncomeExpenseTreemap';

const Reports = () => {
  const { selectedMonth } = useReports(); // Only for monthly pie charts

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MonthSelector />
        </Grid>

        <Grid item xs={12}>
          <DailyExpenseChart />
        </Grid>

        <Grid item xs={12}>
          <DailyIncomeChart />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <CategoryPieChart apiEndpoint={`/expenses/category-wise/monthly?month=${selectedMonth}`} title="Monthly Expenses by Category" />
        </Grid>

        <Grid item xs={12} md={6}>
          <CategoryPieChart apiEndpoint={`/income/category-wise/monthly?month=${selectedMonth}`} title="Monthly Income by Category" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RecurringVsNonRecurringBarChart apiEndpoint={`/income/frequency`} title="Recurring v/s Non-Recurring" />
        </Grid>

        <Grid item xs={12} md={6}>
          <IncomeExpenseTreemap apiEndpoint={`/expenses/category-wise`} title="Income Category wise" />
        </Grid>

        <Grid item xs={12} md={6}>
          <IncomeExpenseTreemap apiEndpoint={`/income/category-wise`} title="Expense Category wise" />
        </Grid>
      </Grid>
    </>
  );
};

export default Reports;
