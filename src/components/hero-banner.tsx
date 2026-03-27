import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient colors={colors.heroGradient} style={styles.card}>
      <Text selectable style={[styles.title, { color: colors.ink }]}>
        {title}
      </Text>
      <Text selectable style={[styles.body, { color: colors.inkSoft }]}>
        {body}
      </Text>
      <View style={styles.actions}>
        <Pressable
          onPress={onPrimaryPress}
          style={({ pressed }) => [
            styles.primary,
            { backgroundColor: colors.accentStrong },
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryText}>{primaryLabel}</Text>
        </Pressable>
        <Pressable
          onPress={onSecondaryPress}
          style={({ pressed }) => [
            styles.secondary,
            {
              backgroundColor: colors.secondarySurface,
              borderColor: colors.secondaryBorder,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.secondaryText, { color: colors.accentStrong }]}>{secondaryLabel}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    gap: spacing.md,
    padding: spacing.xl,
  },
  title: {
    fontFamily: "serif",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 42,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  primary: {
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  secondary: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.84,
  },
  primaryText: {
    color: "#FFF7E8",
    fontWeight: "700",
  },
  secondaryText: {
    fontWeight: "700",
  },
});
