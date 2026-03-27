import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type StatePanelProps = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: "default" | "error";
};

export function StatePanel({
  title,
  body,
  actionLabel,
  onAction,
  tone = "default",
}: StatePanelProps) {
  const { colors, isDark } = useAppTheme();
  const isError = tone === "error";

  return (
    <View
      style={[
        styles.panel,
        {
          backgroundColor: isError ? (isDark ? "#2C1917" : "#FFF5F2") : colors.cardMuted,
          borderColor: isError ? (isDark ? "#8B5749" : "#D7A59A") : colors.borderSoft,
          boxShadow: `0 8px 24px ${colors.shadow}`,
        },
      ]}
    >
      <Text selectable style={[styles.title, { color: isError ? colors.error : colors.ink }]}>
        {title}
      </Text>
      <Text selectable style={[styles.body, { color: colors.inkSoft }]}>
        {body}
      </Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accentStrong },
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 26,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl,
  },
  title: {
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: "#FFF8EE",
    fontSize: 13,
    fontWeight: "700",
  },
});
