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
    <View style={[styles.block, { borderColor: colors.borderSoft }]}>
      <View style={styles.headingRow}>
        <View style={[styles.rule, { backgroundColor: colors.gold }]} />
        <Text selectable style={[styles.title, { color: colors.accentStrong }]}>
          {title}
        </Text>
      </View>
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
    borderLeftWidth: 1,
    gap: spacing.md,
    paddingLeft: spacing.lg,
  },
  headingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  rule: {
    borderRadius: 999,
    height: 3,
    width: 28,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 31,
  },
});
