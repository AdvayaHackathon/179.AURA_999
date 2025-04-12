import { Slot, usePathname } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FloatingChat from '../../components/FloatingChat'; // ✅ Adjust path if needed

export default function AppLayout() {
  const pathname = usePathname();
  const showChatbot = !pathname.includes('/login') && !pathname.includes('/signup');

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Slot />
        {showChatbot && <FloatingChat />}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
