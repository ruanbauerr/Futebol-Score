import dayjs from 'dayjs';

// Configuracao da API e mapa de status ao vivo usados na feature.
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY || 'c4366c2f35ebd247b1c54dd9420f0fb7';
const API_BASE_URL = 'https://v3.football.api-sports.io/fixtures';
const TIMEZONE = 'America/Sao_Paulo';
const LIVE_STATUS_SHORT = new Set(['1H', 'HT', '2H', 'ET', 'P', 'BT', 'INT', 'LIVE']);

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io',
};

// Requisicao generica de fixtures com tratamento de erro HTTP e da API.
async function requestFixtures(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}?${query}`, { headers });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const errors = data?.errors && typeof data.errors === 'object'
    ? Object.values(data.errors).filter(Boolean)
    : [];

  if (errors.length > 0) {
    throw new Error(`API returned error: ${errors.join(' | ')}`);
  }

  return data;
}

// A API pode paginar fixtures; este helper concatena todas as paginas.
async function fetchAllFixturePages(baseParams) {
  const firstPage = await requestFixtures(baseParams);
  const firstFixtures = Array.isArray(firstPage?.response) ? firstPage.response : [];
  const totalPages = Number(firstPage?.paging?.total) || 1;

  if (totalPages <= 1) {
    return firstFixtures;
  }

  const fixtures = [...firstFixtures];
  for (let page = 2; page <= totalPages; page += 1) {
    const data = await requestFixtures({ ...baseParams, page: String(page) });
    const pageFixtures = Array.isArray(data?.response) ? data.response : [];
    fixtures.push(...pageFixtures);
  }

  return fixtures;
}

// Fonte de verdade para decidir se a partida esta ao vivo na UI e regras.
export function isFixtureLive(fixture) {
  const shortStatus = fixture?.fixture?.status?.short;
  const longStatus = String(fixture?.fixture?.status?.long || '').toLowerCase();

  return LIVE_STATUS_SHORT.has(shortStatus) || longStatus.includes('live');
}

// Busca todas as partidas de um dia especifico.
export async function getFixturesByDate(date = dayjs().format('YYYY-MM-DD')) {
  return fetchAllFixturePages({
    date,
    timezone: TIMEZONE,
  });
}

// Busca partidas que estao ao vivo, independentemente da data.
export async function getLiveFixtures() {
  return fetchAllFixturePages({
    live: 'all',
    timezone: TIMEZONE,
  });
}
