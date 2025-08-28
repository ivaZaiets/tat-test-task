export const getFormattedDate = (
  date: string | number | Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Date(date).toLocaleDateString(locale, options);
};
