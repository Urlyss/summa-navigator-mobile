import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type HeroBannerProps = {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
};

export function HeroBanner({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
}: HeroBannerProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.accentStrong }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.rule, { backgroundColor: colors.gold }]} />
          <Text selectable style={styles.eyebrow}>
            Summa Navigator
          </Text>
        </View>
        <Text selectable style={styles.title}>
          {title}
        </Text>
        <Text selectable style={styles.body}>
          {body}
        </Text>
        <View style={styles.actions}>
          <Pressable
            onPress={onPrimaryPress}
            style={({ pressed }) => [
              styles.primary,
              { backgroundColor: colors.gold },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.primaryText, { color: colors.accentStrong }]}>{primaryLabel}</Text>
          </Pressable>
          <Pressable
            onPress={onSecondaryPress}
            style={({ pressed }) => [
              styles.secondary,
              {
                borderColor: "rgba(255,255,255,0.3)",
              },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.secondaryText, { color: "#FFFFFF" }]}>{secondaryLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    padding: spacing.xl,
  },
  content: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rule: {
    borderRadius: 1,
    height: 2,
    width: 20,
  },
  eyebrow: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "serif",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
  },
  body: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  primary: {
    borderRadius: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  secondary: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.8,
  },
});
