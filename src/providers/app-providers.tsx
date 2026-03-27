import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LibraryProvider } from "@/providers/library-provider";
import { ThemeProvider, useAppTheme } from "@/providers/theme-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

function ProvidersWithTheme({ children }: React.PropsWithChildren) {
  const { colors } = useAppTheme();

  return (
    <>
      <StatusBar style={colors.statusBar} backgroundColor={colors.parchmentMuted} />
      {children}
    </>
  );
}

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <LibraryProvider>
              <ProvidersWithTheme>{children}</ProvidersWithTheme>
            </LibraryProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
