import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { isFixtureLive } from '../services/footballApi';
import { formatKickoffTime, formatScore, getFixtureStatusLabel } from '../utils/fixtureFormatters';

// Exibe um card de partida com liga, times, placar e status.
export default function FixtureCard({ fixture }) {
  const isLive = isFixtureLive(fixture);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.leagueText} numberOfLines={1}>
          {fixture?.league?.name || 'Liga'}
        </Text>
        <Text style={[styles.statusText, isLive && styles.liveStatusText]}>
          {getFixtureStatusLabel(fixture)}
        </Text>
      </View>

      <View style={styles.teamRow}>
        <Text style={styles.teamName} numberOfLines={1}>
          {fixture?.teams?.home?.name || 'Time da casa'}
        </Text>
        <Text style={styles.score}>{formatScore(fixture?.goals?.home)}</Text>
      </View>

      <View style={styles.teamRow}>
        <Text style={styles.teamName} numberOfLines={1}>
          {fixture?.teams?.away?.name || 'Time visitante'}
        </Text>
        <Text style={styles.score}>{formatScore(fixture?.goals?.away)}</Text>
      </View>

      <Text style={styles.kickoff}>{formatKickoffTime(fixture?.fixture?.date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bg,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  teamName: {
    color: COLORS.text,
    fontSize: 14,
    flex: 1,
  },
  score: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    minWidth: 30,
    textAlign: 'right',
  },
  kickoff: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  leagueText: {
    color: COLORS.textMuted,
    fontSize: 12,
    flex: 1,
  },
  statusText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  liveStatusText: {
    color: COLORS.live,
  },
});
