import { useState, useEffect, useCallback } from 'react';
import { getFixturesByDate, getLiveFixtures } from '../services/footballApi';
import dayjs from 'dayjs';

export function useFixtures(selectedDate) {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const isToday = selectedDate.isSame(dayjs(), 'day');

  const fetch = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);

    try {
      const date = selectedDate.format('YYYY-MM-DD');
      const [all, live] = await Promise.all([
        getFixturesByDate(date),
        isToday ? getLiveFixtures() : Promise.resolve([]),
      ]);

      // substitui jogos do dia pelos dados ao vivo (mais frescos)
      const liveIds = new Set(live.map((f) => f.fixture.id));
      const merged = all.map((f) =>
        liveIds.has(f.fixture.id)
          ? live.find((l) => l.fixture.id === f.fixture.id)
          : f
      );

      setFixtures(merged);
    } catch (e) {
      setError('Erro ao carregar jogos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDate]);

  useEffect(() => { fetch(); }, [fetch]);

  // auto-refresh a cada 30s se for hoje
  useEffect(() => {
    if (!isToday) return;
    const interval = setInterval(() => fetch(true), 30000);
    return () => clearInterval(interval);
  }, [isToday, fetch]);

  return {
    fixtures,
    loading,
    refreshing,
    error,
    refresh: () => fetch(true),
  };
}