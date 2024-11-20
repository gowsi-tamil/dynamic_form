export const validatePercentages = (percentages) => {
    const sum = percentages.reduce((acc, val) => acc + parseInt(val, 10), 0);
    if (sum !== 100) {
      return 'Total percentage must equal 100!';
    }
    return '';
  };
  