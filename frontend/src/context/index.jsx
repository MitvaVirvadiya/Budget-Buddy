import React from 'react';
import { AuthProvider } from './Auth';
import { ExpenseProvider } from './Expense';

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
