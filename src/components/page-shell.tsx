import React from "react";
import { RefreshControlProps, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type PageShellProps = React.PropsWithChildren<{
  style?: ViewStyle;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}>;

export function PageShell({ children, style, refreshControl }: PageShellProps) {
  const { colors } = useAppTheme();

  return (
    <LinearGradient colors={colors.pageGradient} style={styles.gradient}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.content, style]}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
