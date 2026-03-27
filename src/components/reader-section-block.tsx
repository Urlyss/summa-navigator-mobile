import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

type ReaderSectionBlockProps = {
  title: string;
  paragraphs: string[];
};

export function ReaderSectionBlock({ title, paragraphs }: ReaderSectionBlockProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.block}>
      <Text selectable style={[styles.title, { color: colors.accentStrong }]}>
        {title}
      </Text>
      {paragraphs.map((paragraph, index) => (
        <Text key={`${title}-${index}`} selectable style={[styles.paragraph, { color: colors.ink }]}>
          {paragraph}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 27,
  },
});
