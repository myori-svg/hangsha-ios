export function getMonthRange(year: number, month: number) {
  // month is 0-indexed, as in JS Date (0 = Jan ... 11 = Dec)

  // first/last day of the actual month
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  // grid start: back up to the preceding Sunday
  const startOfGrid = new Date(startOfMonth);
  startOfGrid.setDate(startOfMonth.getDate() - startOfMonth.getDay());

  // grid end: push forward to the following Saturday
  const endOfGrid = new Date(endOfMonth);
  const daysNeeded = 6 - endOfMonth.getDay();
  endOfGrid.setDate(endOfMonth.getDate() + daysNeeded);

  return { from: startOfGrid, to: endOfGrid };
}
