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
          backgroundColor: isError ? (isDark ? "#37211A" : "#FFF4F1") : colors.card,
          borderColor: isError ? (isDark ? "#8B5749" : "#D7A59A") : colors.border,
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
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: "700",
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
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
