import { SEARCH_MODES } from '../constants/filters';
import { isFixtureLive } from '../services/footballApi';

// Aplica filtro por status antes da busca textual.
function applyStatusFilter(fixtures, statusFilter) {
  if (statusFilter === 'live') {
    return fixtures.filter((fixture) => isFixtureLive(fixture));
  }

  if (statusFilter === 'other') {
    return fixtures.filter((fixture) => !isFixtureLive(fixture));
  }

  return fixtures;
}

// Verifica se uma partida combina com o modo de busca ativo (time ou liga).
function matchesSearchMode(fixture, searchTerm, searchMode) {
  if (!searchTerm) return true;

  if (searchMode === SEARCH_MODES.LEAGUE) {
    const league = String(fixture?.league?.name || '').toLowerCase();
    return league.includes(searchTerm);
  }

  const home = String(fixture?.teams?.home?.name || '').toLowerCase();
  const away = String(fixture?.teams?.away?.name || '').toLowerCase();
  return home.includes(searchTerm) || away.includes(searchTerm);
}

// Funcao publica usada pela HomeScreen para gerar a lista visivel.
export function filterFixtures(fixtures, { statusFilter, searchTerm, searchMode }) {
  const normalizedTerm = String(searchTerm || '').trim().toLowerCase();
  const byStatus = applyStatusFilter(fixtures, statusFilter);
  return byStatus.filter((fixture) => matchesSearchMode(fixture, normalizedTerm, searchMode));
}

// Retorna mensagem de estado vazio conforme os filtros atuais.
export function getEmptyFixturesMessage({ statusFilter, searchTerm, searchMode }) {
  if (String(searchTerm || '').trim()) {
    return searchMode === SEARCH_MODES.LEAGUE
      ? 'Nenhum jogo encontrado para essa liga.'
      : 'Nenhum jogo encontrado para esse time.';
  }

  if (statusFilter === 'live') return 'Nenhum jogo ao vivo agora.';
  if (statusFilter === 'other') return 'Nenhum jogo nesta categoria.';
  return 'Nenhum jogo neste dia.';
}
