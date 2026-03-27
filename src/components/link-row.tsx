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
          backgroundColor: colors.rowSurface,
          borderColor: colors.borderSoft,
          boxShadow: `0 10px 28px ${colors.shadow}`,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.copy}>
        <Text
          style={[
            styles.badge,
            {
              backgroundColor: colors.rowBadge,
              color: colors.rowBadgeText,
            },
          ]}
        >
          {routeLabel(id)}
        </Text>
        <Text selectable style={[styles.title, { color: colors.ink }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text selectable style={[styles.subtitle, { color: colors.inkSoft }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.trailingGroup}>
        <Text style={[styles.trailing, { color: colors.teal }]}>{trailingLabel ?? "Open"}</Text>
        <Text style={[styles.trailingArrow, { color: colors.accentStrong }]}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.992 }],
  },
  copy: {
    flex: 1,
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  trailingGroup: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    paddingTop: 2,
  },
  trailing: {
    fontSize: 13,
    fontWeight: "700",
  },
  trailingArrow: {
    fontSize: 19,
    fontWeight: "400",
    lineHeight: 20,
  },
});
