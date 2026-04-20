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
          backgroundColor: isError ? (isDark ? "#2D1B19" : "#FFF5F2") : colors.cardMuted,
          borderColor: isError ? (isDark ? "#8B443B" : "#FEE2E2") : colors.border,
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
            { backgroundColor: isError ? colors.error : colors.teal },
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
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    marginTop: spacing.xs,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
