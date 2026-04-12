import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { getFixturesByDate, isFixtureLive } from '../services/footballApi';

// Intervalo de auto-refresh para "hoje", mantendo jogos ao vivo atualizados.
const AUTO_REFRESH_MS = 15 * 60 * 1000;

// Mapeia erros tecnicos de transporte/API para mensagens de usuario.
function getFixtureErrorMessage(error) {
  const message = String(error?.message || '').toLowerCase();

  if (message.includes('request limit')) {
    return 'Limite diário da API atingido no plano atual. Tente novamente amanhã.';
  }

  if (message.includes('network request failed') || message.includes('failed to fetch')) {
    return 'Não foi possível conectar à API no momento.';
  }

  return 'Erro ao carregar jogos.';
}

// Ordenacao prioriza jogos ao vivo e depois horario da partida.
function sortFixtures(a, b) {
  const aLive = isFixtureLive(a);
  const bLive = isFixtureLive(b);

  if (aLive !== bLive) {
    return aLive ? -1 : 1;
  }

  const aTime = dayjs(a?.fixture?.date).valueOf();
  const bTime = dayjs(b?.fixture?.date).valueOf();
  return aTime - bTime;
}

// Hook da feature que controla estado, carregamento e ciclo de refresh.
export function useFixtures(selectedDate) {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const isToday = selectedDate.isSame(dayjs(), 'day');

  // Carregador compartilhado para primeira carga e pull-to-refresh.
  const fetchFixtures = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const date = selectedDate.format('YYYY-MM-DD');
      const allFixtures = await getFixturesByDate(date);
      setFixtures(allFixtures.sort(sortFixtures));
    } catch (e) {
      setError(getFixtureErrorMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDate]);

  // Carrega dados sempre que a data selecionada muda.
  useEffect(() => {
    fetchFixtures();
  }, [fetchFixtures]);

  // Ativa refresh em segundo plano apenas ao visualizar a data de hoje.
  useEffect(() => {
    if (!isToday) return undefined;

    const intervalId = setInterval(() => {
      fetchFixtures(true);
    }, AUTO_REFRESH_MS);

    return () => clearInterval(intervalId);
  }, [isToday, fetchFixtures]);

  return {
    fixtures,
    loading,
    refreshing,
    error,
    refresh: () => fetchFixtures(true),
  };
}
