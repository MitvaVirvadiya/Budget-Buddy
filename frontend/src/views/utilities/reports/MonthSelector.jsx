import React, { useState, useContext } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useReports } from 'context/Reports';

const monthNames = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

const MonthSelector = () => {
  const { selectedMonth, updateMonth } = useReports(); // Using context

  const handleMonthChange = (event) => {
    updateMonth(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="month-selector-label">Month</InputLabel>
      <Select
        labelId="month-selector-label"
        id="month-selector"
        value={selectedMonth}
        label="Month"
        onChange={handleMonthChange}
      >
        {monthNames.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
