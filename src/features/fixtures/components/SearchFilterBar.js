import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { SEARCH_MODES } from '../constants/filters';

// Botao reutilizavel para opcao do dropdown de modo de busca.
function SearchModeOption({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.modeOption, selected && styles.modeOptionSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.modeOptionText, selected && styles.modeOptionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// Barra de busca + seletor de modo (time/liga) acima da lista de jogos.
export default function SearchFilterBar({
  searchTerm,
  searchMode,
  searchMenuOpen,
  onSearchTermChange,
  onToggleSearchMenu,
  onSearchModeChange,
}) {
  const modeLabel = searchMode === SEARCH_MODES.LEAGUE ? 'Liga' : 'Time';
  const placeholder = searchMode === SEARCH_MODES.LEAGUE ? 'Buscar liga...' : 'Buscar time...';

  return (
    <>
      <View style={[styles.searchRow, searchMenuOpen && styles.searchRowOpen]}>
        <TextInput
          value={searchTerm}
          onChangeText={onSearchTermChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          style={styles.modeButton}
          onPress={onToggleSearchMenu}
          activeOpacity={0.8}
        >
          <Text style={styles.modeButtonText}>{modeLabel}</Text>
        </TouchableOpacity>
      </View>

      {searchMenuOpen && (
        <View style={styles.menu}>
          <SearchModeOption
            label="Filtrar por time"
            selected={searchMode === SEARCH_MODES.TEAM}
            onPress={() => onSearchModeChange(SEARCH_MODES.TEAM)}
          />
          <SearchModeOption
            label="Filtrar por liga"
            selected={searchMode === SEARCH_MODES.LEAGUE}
            onPress={() => onSearchModeChange(SEARCH_MODES.LEAGUE)}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bgCardAlt,
  },
  searchRowOpen: {
    borderBottomWidth: 0,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    color: COLORS.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modeButton: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 84,
    alignItems: 'center',
  },
  modeButtonText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 13,
  },
  menu: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  modeOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  modeOptionSelected: {
    backgroundColor: COLORS.accent,
  },
  modeOptionText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  modeOptionTextSelected: {
    color: COLORS.bg,
  },
});
