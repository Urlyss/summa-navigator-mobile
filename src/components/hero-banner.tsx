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
    <LinearGradient colors={colors.heroGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View style={styles.eyebrowRow}>
        <View style={[styles.eyebrowRule, { backgroundColor: colors.gold }]} />
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
    borderRadius: 36,
    gap: spacing.lg,
    overflow: "hidden",
    padding: spacing.xxl,
  },
  eyebrowRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  eyebrowRule: {
    borderRadius: 999,
    height: 3,
    width: 42,
  },
  eyebrow: {
    color: "#F6E9D6",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFF9F2",
    fontFamily: "serif",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 46,
  },
  body: {
    color: "#F1E7D7",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: "88%",
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
