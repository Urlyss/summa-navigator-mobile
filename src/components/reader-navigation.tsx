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
            backgroundColor: previousId ? colors.accentStrong : colors.cardMuted,
            borderColor: previousId ? colors.accentStrong : colors.borderSoft,
          },
          pressed && previousId && styles.pressed,
        ]}
      >
        <Text style={[styles.kicker, { color: previousId ? colors.gold : colors.inkFaint }]}>Back</Text>
        <Text style={[styles.label, { color: previousId ? "#FFF8F0" : colors.inkFaint }]}>Previous</Text>
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
            borderColor: nextId ? colors.teal : colors.borderSoft,
          },
          pressed && nextId && styles.pressed,
        ]}
      >
        <Text style={[styles.kicker, { color: nextId ? colors.gold : colors.inkFaint }]}>Continue</Text>
        <Text style={[styles.label, { color: nextId ? "#F7FCFB" : colors.inkFaint }]}>Next</Text>
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
    borderRadius: 26,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.82,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
});
