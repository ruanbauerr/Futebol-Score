import dayjs from 'dayjs';

const API_KEY = 'c4366c2f35ebd247b1c54dd9420f0fb7';

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io',
};

export async function getFixturesByDate(date = dayjs().format('YYYY-MM-DD')) {
  const res = await fetch(
    `https://v3.football.api-sports.io/fixtures?date=${date}&timezone=America/Sao_Paulo`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}

export async function getLiveFixtures() {
  const res = await fetch(
    `https://v3.football.api-sports.io/fixtures?live=all`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}