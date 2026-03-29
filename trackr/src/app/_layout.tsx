import { useState } from 'react';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { ThemeProvider, useTheme } from '@/src/components/ui/gluestack-ui-provider/ThemeProvider/ThemeProvider';
import "@/global.css";

function AppContent() {
  const { theme } = useTheme();
  return (
    <GluestackUIProvider mode={theme}>
      <Stack />
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}