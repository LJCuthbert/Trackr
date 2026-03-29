import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  return (
    <GluestackUIProvider mode={colorMode}>
      <SafeAreaView className="flex-1 bg-background-0">
        <Button
          onPress={() => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}
        >
          <ButtonText>Toggle color mode</ButtonText>
        </Button>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}