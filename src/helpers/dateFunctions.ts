export const customDateFormat = (date: Date) => {
  return (
    date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear()
  );
};
