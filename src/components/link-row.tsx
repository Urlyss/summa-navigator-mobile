import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import { routeLabel } from "@/utils/route-id";

type LinkRowProps = {
  id: string;
  title: string;
  onPress: () => void;
  subtitle?: string;
  trailingLabel?: string;
};

export function LinkRow({
  id,
  title,
  onPress,
  subtitle,
  trailingLabel,
}: LinkRowProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
            <Text style={[styles.badgeText, { color: colors.accentStrong }]}>
              {routeLabel(id)}
            </Text>
          </View>
          <Text selectable style={[styles.title, { color: colors.ink }]}>
            {title}
          </Text>
        </View>
        {subtitle ? (
          <Text selectable style={[styles.subtitle, { color: colors.inkSoft }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.trailing}>
        <Text style={[styles.trailingLabel, { color: colors.teal }]}>{trailingLabel ?? "Open"}</Text>
        <Text style={[styles.arrow, { color: colors.accentStrong }]}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  trailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  trailingLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  arrow: {
    fontSize: 18,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
