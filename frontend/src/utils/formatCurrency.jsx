export const formatCurrency = (amount) => {
    if(!amount){
        return '₹ 0'
    }

  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount');
  }

  amount = Number(amount);

  if (amount >= 10000000) {
    // For values 1 crore and above
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // For values 1 lakh and above
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    // For values 1 thousand and above
    return `₹${(amount / 1000).toFixed(2)} k`;
  } else {
    // For values less than 1 thousand
    return `₹${amount.toFixed(2)}`;
  }
};
