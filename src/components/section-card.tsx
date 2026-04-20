import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type SectionCardProps = ViewProps & {
  title?: string;
  eyebrow?: string;
};

export function SectionCard({
  title,
  eyebrow,
  style,
  children,
  ...props
}: React.PropsWithChildren<SectionCardProps>) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    >
      {eyebrow ? (
        <View style={styles.header}>
          <View style={[styles.rule, { backgroundColor: colors.gold }]} />
          <Text selectable style={[styles.eyebrow, { color: colors.accent }]}>{eyebrow}</Text>
        </View>
      ) : null}
      {title ? (
        <Text selectable style={[styles.title, { color: colors.ink }]}>
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rule: {
    borderRadius: 2,
    height: 2,
    width: 24,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "serif",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },
});
