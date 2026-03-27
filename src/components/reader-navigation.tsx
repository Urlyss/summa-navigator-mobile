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
          { backgroundColor: previousId ? colors.teal : colors.border },
          pressed && previousId && styles.pressed,
        ]}
      >
        <Text style={styles.label}>Previous</Text>
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
          { backgroundColor: nextId ? colors.teal : colors.border },
          pressed && nextId && styles.pressed,
        ]}
      >
        <Text style={styles.label}>Next</Text>
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
    borderRadius: 999,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    color: "#F8FBF9",
    fontSize: 14,
    fontWeight: "700",
  },
});
