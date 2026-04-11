import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import dayjs from 'dayjs';
import { COLORS, SPACING } from './src/constants/theme';
import DateSelector from './src/components/DateSelector';
import { useFixtures } from './src/hooks/useFixtures';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { fixtures, loading, refreshing, error, refresh } = useFixtures(selectedDate);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>
            Football <Text style={styles.accent}>Live</Text>
          </Text>
        </View>

        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator color={COLORS.accent} />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={fixtures}
            keyExtractor={(item) => String(item.fixture.id)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={COLORS.accent} />
            }
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={styles.mutedText}>Nenhum jogo neste dia.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.rowText}>
                  {item.teams.home.name} x {item.teams.away.name}
                </Text>
              </View>
            )}
          />
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  accent: { color: COLORS.accent },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: COLORS.live, fontSize: 14 },
          mutedText: { color: COLORS.textMuted, fontSize: 14 },
  row: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowText: { color: COLORS.text, fontSize: 14 },
});