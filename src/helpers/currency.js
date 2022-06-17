export const currencyFormat = (value) => {
  const parsed = parseFloat(value).toFixed(2)

  return `R$ ${parsed}`;
};
