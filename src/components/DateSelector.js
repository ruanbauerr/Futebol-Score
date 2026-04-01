import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import dayjs from 'dayjs';

const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function generateDates() {
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    dates.push(dayjs().add(i, 'day'));
  }
  return dates;
}

export default function DateSelector({ selectedDate, onDateChange }) {
  const scrollRef = useRef(null);
  const dates = generateDates();

  // Centraliza no "Hoje" ao abrir
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: 3 * 64, animated: false });
    }, 100);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {dates.map((date) => {
          const isSelected = date.isSame(selectedDate, 'day');
          const isToday = date.isSame(dayjs(), 'day');

          return (
            <TouchableOpacity
              key={date.format('YYYY-MM-DD')}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => onDateChange(date)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.textSel,
                isToday && !isSelected && styles.todayText,
              ]}>
                {isToday ? 'Hoje' : DAYS_PT[date.day()]}
              </Text>
              <Text style={[styles.dayNum, isSelected && styles.textSel]}>
                {date.date()}
              </Text>
              <Text style={[styles.month, isSelected && styles.monthSel]}>
                {MONTHS_PT[date.month()]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.bgCardAlt,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  scroll: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  item: {
    width: 56,
    height: 68,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  itemSelected: {
    backgroundColor: COLORS.accent,
  },
  dayName: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dayNum: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 24,
  },
  month: {
    fontSize: 10,
    color: COLORS.textDim,
  },
  textSel: { color: COLORS.bg },
  todayText: { color: COLORS.accent },
  monthSel: { color: COLORS.bg + 'CC' },
});