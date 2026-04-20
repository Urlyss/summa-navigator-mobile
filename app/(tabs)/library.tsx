import React from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { useLibrary } from "@/providers/library-provider";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

export default function LibraryScreen() {
  const { bookmarks, recents } = useLibrary();
  const { colors } = useAppTheme();

  return (
    <PageShell>
      <View style={[styles.headlineCard, { backgroundColor: colors.accentStrong, borderColor: colors.accentStrong }]}>
        <Text selectable style={[styles.headline, { color: "#FFFFFF" }]}>Your private study shelf</Text>
        <Text selectable style={[styles.copy, { color: "rgba(255,255,255,0.7)" }]}>
          Saved entries and the last article you opened stay ready for a calmer return into the text.
        </Text>
      </View>

      <SectionCard eyebrow="Saved" title="Bookmarks">
        {bookmarks.length ? (
          <View style={styles.stack}>
            {bookmarks.map((entry) => (
              <LinkRow
                key={entry.id}
                id={entry.id}
                title={entry.title}
                subtitle={entry.subtitle}
                trailingLabel="Open"
                onPress={() => router.push(`/reader/${entry.id}`)}
              />
            ))}
          </View>
        ) : (
          <StatePanel
            title="Nothing bookmarked"
            body="Tap the bookmark action inside the reader to build a study shelf."
          />
        )}
      </SectionCard>

      <SectionCard eyebrow="Recent" title="Last article read">
        {recents.length ? (
          <View style={styles.stack}>
            {recents.map((entry) => (
              <LinkRow
                key={entry.id}
                id={entry.id}
                title={entry.title}
                subtitle={entry.subtitle}
                trailingLabel="Return"
                onPress={() => router.push(`/reader/${entry.id}`)}
              />
            ))}
          </View>
        ) : (
          <StatePanel
            title="No article opened yet"
            body="The app keeps only the last article you fully opened so you can jump back in quickly."
          />
        )}
      </SectionCard>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  headlineCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl,
  },
  headline: {
    fontFamily: "serif",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  copy: {
    fontSize: 14,
    lineHeight: 22,
  },
  stack: {
    gap: 12,
  },
});
