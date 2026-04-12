import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

// Tokens visuais do seletor horizontal de datas.
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.bgCardAlt,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  scroll: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  item: {
    width: 56,
    height: 68,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  itemSelected: {
    backgroundColor: COLORS.accent,
  },
  dayName: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 24,
  },
  monthName: {
    fontSize: 10,
    color: COLORS.textDim,
  },
  textSelected: {
    color: COLORS.bg,
  },
  todayText: {
    color: COLORS.accent,
  },
  monthSelected: {
    color: `${COLORS.bg}CC`,
  },
});

export default styles;
