export const convertToKValue = (value: number): string => {
  if (value > -1000 && value < 1000) return value.toString();
  else if (value >= 1000 && value < 1000000) {
    const divided = (value / 1000.0).toFixed(1);
    return divided.toString() + 'k';
  } else {
    const divided = (value / 1000000.0).toFixed(1);
    return divided.toString() + 'M';
  }
};
