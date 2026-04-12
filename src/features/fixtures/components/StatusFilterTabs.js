import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { MATCH_STATUS_FILTERS } from '../constants/filters';

// Renderiza abas de status (Todos/ao vivo/outros) e notifica a chave selecionada.
export default function StatusFilterTabs({ statusFilter, onStatusChange }) {
  return (
    <View style={styles.container}>
      {MATCH_STATUS_FILTERS.map((filterOption) => {
        const selected = statusFilter === filterOption.key;

        return (
          <TouchableOpacity
            key={filterOption.key}
            style={[styles.button, selected && styles.buttonSelected]}
            onPress={() => onStatusChange(filterOption.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.text, selected && styles.textSelected]}>
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bgCardAlt,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.card,
  },
  buttonSelected: {
    backgroundColor: COLORS.accent,
  },
  text: {
    color: COLORS.textMuted,
    fontWeight: '700',
    fontSize: 12,
  },
  textSelected: {
    color: COLORS.bg,
  },
});
