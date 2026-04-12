import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import styles from './styles';

// Rotulos usados pela interface do seletor horizontal de datas.
const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Monta uma janela de 7 dias centrada em hoje: [hoje-3, ..., hoje+3].
function generateDates() {
  const dates = [];
  for (let i = -3; i <= 3; i += 1) {
    dates.push(dayjs().add(i, 'day'));
  }
  return dates;
}

// Seletor horizontal que controla a data usada para buscar os jogos.
export default function DateSelector({ selectedDate, onDateChange }) {
  const scrollRef = useRef(null);
  const dates = generateDates();

  useEffect(() => {
    // Faz scroll inicial para manter "hoje" visivel perto do centro.
    const timeoutId = setTimeout(() => {
      scrollRef.current?.scrollTo({ x: 3 * 64, animated: false });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {dates.map((date) => {
          const isSelected = date.isSame(selectedDate, 'day');
          const isToday = date.isSame(dayjs(), 'day');

          return (
            <TouchableOpacity
              key={date.format('YYYY-MM-DD')}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => onDateChange(date)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayName,
                  isSelected && styles.textSelected,
                  isToday && !isSelected && styles.todayText,
                ]}
              >
                {isToday ? 'Hoje' : DAYS_PT[date.day()]}
              </Text>
              <Text style={[styles.dayNumber, isSelected && styles.textSelected]}>
                {date.date()}
              </Text>
              <Text style={[styles.monthName, isSelected && styles.monthSelected]}>
                {MONTHS_PT[date.month()]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
