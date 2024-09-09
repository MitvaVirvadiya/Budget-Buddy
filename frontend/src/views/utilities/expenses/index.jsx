import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ExpenseTable from './components/ExpenseTable';

const Expenses = () => {  
  return (
    <>
      <MainCard title="Expenses">
        <ExpenseTable />
      </MainCard>
    </>
  );
};

export default Expenses;
