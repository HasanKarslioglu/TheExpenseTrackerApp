export function getFormattedDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function getDateMinusDays(date, days) {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days
  );
  return newDate;
}
