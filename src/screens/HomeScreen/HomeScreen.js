import { useMemo, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import DateSelector from '../../components/DateSelector';
import { COLORS } from '../../constants/theme';
import StatusFilterTabs from '../../features/fixtures/components/StatusFilterTabs';
import SearchFilterBar from '../../features/fixtures/components/SearchFilterBar';
import FixturesList from '../../features/fixtures/components/FixturesList';
import { SEARCH_MODES } from '../../features/fixtures/constants/filters';
import { useFixtures } from '../../features/fixtures/hooks/useFixtures';
import { filterFixtures, getEmptyFixturesMessage } from '../../features/fixtures/utils/fixtureFilters';
import styles from './styles';

// Tela principal: orquestra estado, filtros e renderizacao da lista.
export default function HomeScreen() {
  // Estado de data e filtros controlado no nivel da tela.
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchMode, setSearchMode] = useState(SEARCH_MODES.TEAM);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Ciclo de carregamento de dados vem do hook de fixtures.
  const {
    fixtures,
    loading,
    refreshing,
    error,
    refresh,
  } = useFixtures(selectedDate);

  // Calcula os jogos visiveis com base no status e na busca.
  const filteredFixtures = useMemo(() => {
    return filterFixtures(fixtures, {
      statusFilter,
      searchTerm,
      searchMode,
    });
  }, [fixtures, statusFilter, searchTerm, searchMode]);

  // Escolhe a mensagem de lista vazia conforme o contexto.
  const emptyMessage = useMemo(() => {
    return getEmptyFixturesMessage({
      statusFilter,
      searchTerm,
      searchMode,
    });
  }, [statusFilter, searchTerm, searchMode]);

  const listEmptyMessage = error || emptyMessage;

  // Fecha o dropdown ao trocar o modo para reduzir passos na UI.
  const handleSearchModeChange = (mode) => {
    setSearchMode(mode);
    setSearchMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>
          Football <Text style={styles.titleAccent}>Live</Text>
        </Text>
      </View>

      <DateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <StatusFilterTabs
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <SearchFilterBar
        searchTerm={searchTerm}
        searchMode={searchMode}
        searchMenuOpen={searchMenuOpen}
        onSearchTermChange={setSearchTerm}
        onToggleSearchMenu={() => setSearchMenuOpen((current) => !current)}
        onSearchModeChange={handleSearchModeChange}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.accent} />
        </View>
      ) : (
        <FixturesList
          fixtures={filteredFixtures}
          refreshing={refreshing}
          onRefresh={refresh}
          emptyMessage={listEmptyMessage}
        />
      )}
    </SafeAreaView>
  );
}
