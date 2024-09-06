import React from 'react';
import { AuthProvider } from './Auth';
import { ExpenseProvider } from './Expense';
import { DashBoardProvider } from './Dashboard';

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <DashBoardProvider>{children}</DashBoardProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
