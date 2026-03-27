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
          borderColor: colors.border,
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
      <Text style={[styles.trailing, { color: colors.teal }]}>{trailingLabel ?? "Open"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.84,
  },
  copy: {
    flex: 1,
    gap: 6,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  trailing: {
    fontSize: 13,
    fontWeight: "700",
  },
});
