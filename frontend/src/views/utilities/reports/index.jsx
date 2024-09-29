import { Grid, Paper, Tabs, Tab, Box } from '@mui/material';
import React, { useState } from 'react';
import DailyExpenseChart from 'views/components/reports/DailyExpenseChart';
import DailyIncomeChart from 'views/components/reports/DailyIncomeChart';
import MonthSelector from './MonthSelector';
import CategoryPieChart from 'views/components/reports/CategoryPieChart';
import { useReports } from 'context/Reports';
import RecurringVsNonRecurringBarChart from 'views/components/reports/RecurringVsNonRecurringBarChart';
import IncomeExpenseTreemap from 'views/components/reports/IncomeExpenseTreemap';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports = () => {
  const [tabValue, setTabValue] = useState(0);
  const { selectedMonth } = useReports(); // For monthly pie charts

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box sx={{ borderRadius: 3, backgroundColor: '#d9d2e9', display: 'flex', justifyContent: 'center' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="report-tabs">
              <Tab label="Daily Expenses & Income" />
              <Tab label="Category-wise Expenses & Income" />
              <Tab label="Recurring vs Non-Recurring" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <MonthSelector />
        </Grid>
      </Grid>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* Daily Expenses & Income */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DailyExpenseChart />
          </Grid>
          <Grid item xs={12}>
            <DailyIncomeChart />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Category-wise Expenses & Income */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <CategoryPieChart apiEndpoint={`/expenses/category-wise/monthly?month=${selectedMonth}`} title="Monthly Expenses by Category" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryPieChart apiEndpoint={`/income/category-wise/monthly?month=${selectedMonth}`} title="Monthly Income by Category" />
          </Grid>
          <Grid item xs={12} md={6}>
            <IncomeExpenseTreemap apiEndpoint={`/expenses/category-wise`} title="Expenses Category Wise" />
          </Grid>
          <Grid item xs={12} md={6}>
            <IncomeExpenseTreemap apiEndpoint={`/income/category-wise`} title="Income Category Wise" />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Recurring vs Non-Recurring */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <RecurringVsNonRecurringBarChart apiEndpoint={`/income/frequency`} title="Recurring vs Non-Recurring" />
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default Reports;
