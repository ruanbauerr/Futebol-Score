import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import FixtureCard from './FixtureCard';

// Wrapper de FlatList para renderizar jogos, refresh e estado vazio.
export default function FixturesList({
  fixtures,
  refreshing,
  onRefresh,
  emptyMessage,
}) {
  return (
    <FlatList
      data={fixtures}
      keyExtractor={(item) => String(item.fixture.id)}
      contentContainerStyle={styles.listContent}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.accent}
        />
      )}
      ListEmptyComponent={(
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <FixtureCard fixture={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
