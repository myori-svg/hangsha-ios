import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/util/theme';

export interface CalendarDayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  eventCount: number;
  onPress: (date: Date) => void;
}

export function CalendarDayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  eventCount,
  onPress,
}: CalendarDayCellProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${date.getMonth() + 1}월 ${date.getDate()}일${
        eventCount > 0 ? `, 행사 ${eventCount}건` : ''
      }`}
      onPress={() => onPress(date)}
      style={styles.cell}>
      <View
        style={[
          styles.dateBadge,
          isSelected && { backgroundColor: theme.backgroundSelected },
          isToday && !isSelected && { borderColor: theme.text, borderWidth: 1 },
        ]}>
        <ThemedText
          type={isToday ? 'smallBold' : 'small'}
          themeColor={isCurrentMonth ? 'text' : 'textSecondary'}
          style={!isCurrentMonth && styles.dimmed}>
          {date.getDate()}
        </ThemedText>
      </View>

      {eventCount > 0 && (
        <View style={[styles.eventBadge, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText style={styles.eventBadgeText}>{eventCount}</ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    paddingTop: Spacing.one,
    gap: Spacing.half,
  },
  dateBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimmed: {
    opacity: 0.4,
  },
  eventBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: Spacing.half,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventBadgeText: {
    fontSize: 11,
    lineHeight: 14,
  },
});
