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
      <LinearGradient
        colors={[colors.parchmentGlass, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.content, style]}
        refreshControl={refreshControl}
        style={styles.scroll}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
