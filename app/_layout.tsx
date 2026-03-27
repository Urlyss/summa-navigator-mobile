import React from "react";
import { Stack } from "expo-router";
import { AppProviders } from "@/providers/app-providers";
import { useAppTheme } from "@/providers/theme-provider";

function RootStack() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.parchmentMuted,
        },
        headerTintColor: colors.ink,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.parchmentMuted,
        },
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="reader/[id]" options={{ title: "Reader" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootStack />
    </AppProviders>
  );
}
