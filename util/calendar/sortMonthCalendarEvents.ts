import type { CalendarEventRange } from '@/util/calendar/calendarEventMapper';

function isSingleDay(event: CalendarEventRange) {
  return event.start.toDateString() === event.end.toDateString();
}

export function compareMonthCalendarEvents(a: CalendarEventRange, b: CalendarEventRange) {
  const durationOrder = Number(!isSingleDay(a)) - Number(!isSingleDay(b));
  if (durationOrder !== 0) return durationOrder;

  const startOrder = a.start.getTime() - b.start.getTime();
  if (startOrder !== 0) return startOrder;

  const endOrder = a.end.getTime() - b.end.getTime();
  if (endOrder !== 0) return endOrder;

  return a.event.id - b.event.id;
}

export function sortMonthCalendarEvents<T extends CalendarEventRange>(events: readonly T[]) {
  return [...events].sort(compareMonthCalendarEvents);
}
