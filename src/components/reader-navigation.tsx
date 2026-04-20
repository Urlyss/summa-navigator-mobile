import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type ReaderNavigationProps = {
  previousId?: string | null;
  nextId?: string | null;
};

export function ReaderNavigation({ previousId, nextId }: ReaderNavigationProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.navigation}>
      <Pressable
        disabled={!previousId}
        onPress={() => {
          if (previousId) {
            router.push(`/reader/${previousId}`);
          }
        }}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: previousId ? colors.card : colors.cardMuted,
            borderColor: colors.border,
          },
          pressed && previousId && styles.pressed,
        ]}
      >
        <Text style={[styles.kicker, { color: previousId ? colors.inkFaint : "rgba(0,0,0,0.1)" }]}>Previous</Text>
        <Text style={[styles.label, { color: previousId ? colors.ink : "rgba(0,0,0,0.1)" }]}>Back</Text>
      </Pressable>
      <Pressable
        disabled={!nextId}
        onPress={() => {
          if (nextId) {
            router.push(`/reader/${nextId}`);
          }
        }}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: nextId ? colors.teal : colors.cardMuted,
            borderColor: nextId ? colors.teal : colors.border,
          },
          pressed && nextId && styles.pressed,
        ]}
      >
        <Text style={[styles.kicker, { color: nextId ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.1)" }]}>Continue</Text>
        <Text style={[styles.label, { color: nextId ? "#FFFFFF" : "rgba(0,0,0,0.1)" }]}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  kicker: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
});
