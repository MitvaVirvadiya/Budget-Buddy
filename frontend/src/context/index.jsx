import React from 'react';
import { AuthProvider } from './Auth';
import { ExpenseProvider } from './Expense';
import { DashBoardProvider } from './Dashboard';
import { IncomeProvider } from './Income';

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <IncomeProvider>
          <DashBoardProvider>{children}</DashBoardProvider>
        </IncomeProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
