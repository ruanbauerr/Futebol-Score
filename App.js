// App.js
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  bg: '#0A0E1A',
  text: '#F1F5F9',
  accent: '#00E5A0',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#0A0E1A" />
        <View style={styles.center}>
          <Text style={styles.title}>Futebol <Text style={styles.accent}>Ao VIvo</Text></Text>
          <Text style={styles.sub}>Etapa 1 — base funcionando </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  accent: { color: COLORS.accent },
  sub: { fontSize: 14, color: '#8896A8' },
});