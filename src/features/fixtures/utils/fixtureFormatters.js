import dayjs from 'dayjs';
import { isFixtureLive } from '../services/footballApi';

// Converte placares nulos/indefinidos em um placeholder amigavel.
export function formatScore(value) {
  return value === null || value === undefined ? '-' : String(value);
}

// Monta o rotulo de status usado em cada card de partida.
export function getFixtureStatusLabel(fixture) {
  const shortStatus = fixture?.fixture?.status?.short;
  const longStatus = fixture?.fixture?.status?.long;
  const elapsed = fixture?.fixture?.status?.elapsed;

  if (isFixtureLive(fixture) && elapsed !== null && elapsed !== undefined) {
    return `${shortStatus || 'LIVE'} ${elapsed}'`;
  }

  return shortStatus || longStatus || '-';
}

// Formata o horario da partida da API para HH:mm local.
export function formatKickoffTime(fixtureDate) {
  const parsedDate = dayjs(fixtureDate);
  return parsedDate.isValid() ? parsedDate.format('HH:mm') : '--:--';
}
