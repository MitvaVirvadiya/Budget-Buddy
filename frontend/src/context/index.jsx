import React from 'react';
import { AuthProvider } from './Auth';
import { ExpenseProvider } from './Expense';
import { DashBoardProvider } from './Dashboard';
import { IncomeProvider } from './Income';
import { ReportProvider } from './Reports';

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <IncomeProvider>
          <DashBoardProvider>
            <ReportProvider>{children}</ReportProvider>
          </DashBoardProvider>
        </IncomeProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
