import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import dayjs from 'dayjs';
import { COLORS, SPACING } from './src/constants/theme';
import DateSelector from './src/components/DateSelector';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#0A0E1A" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Football <Text style={styles.accent}>Live</Text>
          </Text>
        </View>

        {/* Seletor de data */}
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Placeholder do conteúdo */}
        <View style={styles.center}>
          <Text style={styles.dateText}>
            📅 {selectedDate.format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.sub}>header + data </Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  accent: {
    color: COLORS.accent,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  sub: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
});