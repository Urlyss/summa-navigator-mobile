import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type ChatSuggestionsProps = {
  suggestions: string[];
  onSelect: (value: string) => void;
};

export function ChatSuggestions({ suggestions, onSelect }: ChatSuggestionsProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.grid}>
      {suggestions.map((suggestion) => (
        <Pressable
          key={suggestion}
          onPress={() => onSelect(suggestion)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text selectable style={[styles.text, { color: colors.teal }]}>
            {suggestion}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  card: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.7,
  },
});
