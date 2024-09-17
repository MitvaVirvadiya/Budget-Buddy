export const getMonthName = (monthNumber) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthNames[monthNumber - 1]; // Adjust for zero-indexed array
};
