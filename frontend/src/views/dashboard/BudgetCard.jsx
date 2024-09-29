import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';

import React from 'react';

const BudgetCard = ({ budgets, isLoading }) => {
  return (
    <Grid container>
      {isLoading ? (
        <Skeleton width="100%" height="150px" />
      ) : (
        budgets?.budgetExists && (
          <Grid item xs={12}>
            <Card elevation={1}>
              <CardContent>
                <ApexCharts
                  options={{
                    chart: {
                      type: 'bar',
                      stacked: true // Enable stacking
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true
                      }
                    },
                    xaxis: {
                      categories: ['Budget & Expenses'] // Single category for both
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `$${val}`
                      }
                    },
                    fill: {
                      colors: ['#00E396', '#FF4560'] // Custom colors for budget and expenses
                    },
                    legend: {
                      show: true,
                      position: 'top'
                    }
                  }}
                  series={[
                    {
                      name: 'Budget',
                      data: [budgets.budget.amount]
                    },
                    {
                      name: 'Expenses',
                      data: [budgets.totalExpenses]
                    }
                  ]}
                  type="bar"
                  height={100}
                />
              </CardContent>
            </Card>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default BudgetCard;
