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
          backgroundColor: colors.cardElevated,
          borderColor: colors.borderSoft,
          boxShadow: `0 18px 48px ${colors.shadow}`,
        },
        style,
      ]}
      {...props}
    >
      {eyebrow ? <View style={[styles.rule, { backgroundColor: colors.gold }]} /> : null}
      {eyebrow ? <Text selectable style={[styles.eyebrow, { color: colors.accent }]}>{eyebrow}</Text> : null}
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
    borderRadius: 30,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl,
  },
  rule: {
    borderRadius: 999,
    height: 4,
    width: 44,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "serif",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
});
