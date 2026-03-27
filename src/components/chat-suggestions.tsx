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
              backgroundColor: colors.cardMuted,
              borderColor: colors.borderSoft,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text selectable style={[styles.text, { color: colors.accentStrong }]}>
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
    borderRadius: 20,
    borderWidth: 1,
    minWidth: "47%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.82,
  },
});
