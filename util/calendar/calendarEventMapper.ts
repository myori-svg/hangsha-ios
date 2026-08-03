import type { Event, EventDetail } from '@/types/event';

// hangsha-web's CalendarEvent also carries `allDay`/`resource`/`title` for react-big-calendar's
// renderer. RN has no equivalent view, so this only keeps the resolved date range plus the
// source event; `allDay`-style view branching can be reintroduced once a week view exists.
export interface CalendarEventRange {
  start: Date;
  end: Date;
  event: Event | EventDetail;
  isPeriodEvent: boolean;
}

type DateRange = Pick<CalendarEventRange, 'start' | 'end'>;

function normalizeRange(start: Date | null, end: Date | null): DateRange | null {
  const fallback = start ?? end;

  if (!fallback) return null;

  return {
    start: start ?? fallback,
    end: end ?? fallback,
  };
}

export function calendarEventMapper(event: Event | EventDetail): CalendarEventRange | null {
  const { isPeriodEvent } = event;
  const eventRange = normalizeRange(event.eventStart, event.eventEnd);
  const applyRange = normalizeRange(event.applyStart, event.applyEnd);
  const range = isPeriodEvent ? (applyRange ?? eventRange) : (eventRange ?? applyRange);

  if (!range) return null;

  return { ...range, event, isPeriodEvent };
}
