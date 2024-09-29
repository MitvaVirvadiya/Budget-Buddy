import React from 'react';
import { AuthProvider } from './Auth';
import { ExpenseProvider } from './Expense';
import { DashBoardProvider } from './Dashboard';
import { IncomeProvider } from './Income';
import { ReportProvider } from './Reports';
import { BudgetProvider } from './Budget';

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <IncomeProvider>
          <DashBoardProvider>
            <ReportProvider>
              <BudgetProvider>
                <>{children}</>
              </BudgetProvider>
            </ReportProvider>
          </DashBoardProvider>
        </IncomeProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
