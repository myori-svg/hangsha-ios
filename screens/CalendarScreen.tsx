import { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { CalendarDayCell } from '@/components/calendar/CalendarDayCell';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { CalendarEventRange } from '@/util/calendar/calendarEventMapper';
import { formatDateToYYYYMMDD } from '@/util/calendar/dateFormatter';
import { getMonthRange } from '@/util/calendar/getMonthRange';
import { Spacing } from '@/util/theme';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export interface CalendarScreenProps {
  // Keyed by formatDateToYYYYMMDD(date). Pre-grouped and pre-sorted by the caller
  // (e.g. via sortMonthCalendarEvents) — this screen only reads counts from it.
  eventsByDate?: Record<string, CalendarEventRange[]>;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

function buildVisibleWeeks(year: number, month: number) {
  const { from, to } = getMonthRange(year, month);

  const dates: Date[] = [];
  const cursor = new Date(from);
  while (cursor <= to) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }
  return weeks;
}

export function CalendarScreen({ eventsByDate = {} }: CalendarScreenProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weeks = useMemo(
    () => buildVisibleWeeks(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth],
  );

  function goToPreviousMonth() {
    setCurrentMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="이전 달"
          hitSlop={{ top: Spacing.two, bottom: Spacing.two, left: Spacing.two, right: Spacing.two }}
          onPress={goToPreviousMonth}>
          <ThemedText style={styles.navArrow}>‹</ThemedText>
        </Pressable>

        <ThemedText type="smallBold">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="다음 달"
          hitSlop={{ top: Spacing.two, bottom: Spacing.two, left: Spacing.two, right: Spacing.two }}
          onPress={goToNextMonth}>
          <ThemedText style={styles.navArrow}>›</ThemedText>
        </Pressable>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label) => (
          <ThemedText key={label} type="small" themeColor="textSecondary" style={styles.weekdayLabel}>
            {label}
          </ThemedText>
        ))}
      </View>

      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((date) => {
            const key = formatDateToYYYYMMDD(date);
            return (
              <CalendarDayCell
                key={key}
                date={date}
                isCurrentMonth={date.getMonth() === currentMonth.getMonth()}
                isToday={isSameDay(date, today)}
                isSelected={selectedDate !== null && isSameDay(date, selectedDate)}
                eventCount={eventsByDate[key]?.length ?? 0}
                onPress={setSelectedDate}
              />
            );
          })}
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    // The web tab bar floats over the top of the screen (see app-tabs.web.tsx); its hit area is
    // taller than its visible pill, so clear it with margin rather than the pill's apparent height.
    paddingTop: Platform.select({ web: Spacing.six + Spacing.three, default: Spacing.four }),
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navArrow: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: Spacing.two,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
  },
});
