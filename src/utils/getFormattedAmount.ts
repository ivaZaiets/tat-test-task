export const getFormattedAmount = (
  locale: string,
  options:
    | { style: "currency"; currency: string }
    | { style: "decimal" }
    | { style: "percent" }
    | { style: "unit"; unit: Intl.NumberFormatOptions["unit"] },
  amount: number,
) => {
  return new Intl.NumberFormat(locale, options).format(amount);
};
