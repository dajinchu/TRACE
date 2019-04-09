export const round = (num, n) => {
  return parseFloat(num).toFixed(n);
};

export const capitalize = (word) => 
  word.replace(/\b\w/g, l => l.toUpperCase());
