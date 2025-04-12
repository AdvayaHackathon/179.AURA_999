// app/_layout.tsx
import { Slot, usePathname } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FloatingChat from '../components/FloatingChat';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function AppLayout() {
  const pathname = usePathname();
  const showChatbot = !pathname.includes('/login') && !pathname.includes('/signup');

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <LinearGradient
          colors={['#e0c3fc', '#8ec5fc']} // You can change these colors to whatever vibe you want
          style={styles.background}
        >
          <Slot />
          {showChatbot && <FloatingChat />}
        </LinearGradient>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
