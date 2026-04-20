import React from "react";
import { router } from "expo-router";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { HeroBanner } from "@/components/hero-banner";
import { LinkRow } from "@/components/link-row";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { useParts } from "@/hooks/use-content";
import { useLibrary } from "@/providers/library-provider";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

export default function HomeScreen() {
  const partsQuery = useParts();
  const { recents, bookmarks } = useLibrary();
  const { colors } = useAppTheme();

  return (
    <PageShell
      style={{ paddingBottom: 120 }}
      refreshControl={
        <RefreshControl refreshing={partsQuery.isRefetching} onRefresh={partsQuery.refetch} />
      }
    >
      <HeroBanner
        title="Carry the Summa in your pocket."
        body="Browse the structure of Aquinas' masterpiece with a reader-first Android experience, quick search, and a personal library for what you revisit most."
        primaryLabel="Explore"
        secondaryLabel="Search"
        onPrimaryPress={() => router.push("/reader/PtFP")}
        onSecondaryPress={() => router.push("/search")}
      />

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text selectable style={[styles.metricValue, { color: colors.teal }]}>{partsQuery.data?.length ?? "--"}</Text>
          <Text selectable style={[styles.metricLabel, { color: colors.inkSoft }]}>Parts</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text selectable style={[styles.metricValue, { color: colors.teal }]}>{bookmarks.length}</Text>
          <Text selectable style={[styles.metricLabel, { color: colors.inkSoft }]}>Saved</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text selectable style={[styles.metricValue, { color: colors.teal }]}>{recents.length ? "1" : "0"}</Text>
          <Text selectable style={[styles.metricLabel, { color: colors.inkSoft }]}>Recent</Text>
        </View>
      </View>

      <SectionCard eyebrow="Discover" title="Parts of the Summa">
        {partsQuery.isLoading ? (
          <Text selectable style={[styles.loadingText, { color: colors.inkSoft }]}>Loading the canon...</Text>
        ) : partsQuery.error ? (
          <StatePanel
            tone="error"
            title="Content is unavailable"
            body="The mobile app could not reach the content proxy."
            actionLabel="Try again"
            onAction={() => partsQuery.refetch()}
          />
        ) : (
          <View style={styles.stack}>
            {partsQuery.data?.map((part) => (
              <LinkRow
                key={part.original_id}
                id={`Pt${part.original_id}`}
                title={part.title}
                subtitle={`Part ${part.original_id}`}
                onPress={() => router.push(`/reader/Pt${part.original_id}`)}
              />
            ))}
          </View>
        )}
      </SectionCard>

      <SectionCard eyebrow="History" title="Continue reading">
        {recents.length ? (
          <View style={styles.stack}>
            {recents.slice(0, 3).map((entry) => (
              <LinkRow
                key={entry.id}
                id={entry.id}
                title={entry.title}
                subtitle={entry.subtitle}
                trailingLabel="Resume"
                onPress={() => router.push(`/reader/${entry.id}`)}
              />
            ))}
          </View>
        ) : (
          <StatePanel
            title="No recent reading"
            body="Open an article and it will appear here."
          />
        )}
      </SectionCard>

      <SectionCard eyebrow="Library" title="Bookmarks">
        {bookmarks.length ? (
          <View style={styles.stack}>
            {bookmarks.slice(0, 3).map((entry) => (
              <LinkRow
                key={entry.id}
                id={entry.id}
                title={entry.title}
                subtitle={entry.subtitle}
                trailingLabel="Read"
                onPress={() => router.push(`/reader/${entry.id}`)}
              />
            ))}
          </View>
        ) : (
          <StatePanel
            title="Library is empty"
            body="Bookmark articles to save them here."
          />
        )}
      </SectionCard>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  metricsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  metricCard: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    padding: spacing.md,
  },
  metricValue: {
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: "700",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  stack: {
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
