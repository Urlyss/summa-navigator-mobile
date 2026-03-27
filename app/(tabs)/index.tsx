import React from "react";
import { router } from "expo-router";
import { RefreshControl, Text, View } from "react-native";
import { HeroBanner } from "@/components/hero-banner";
import { LinkRow } from "@/components/link-row";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { useParts } from "@/hooks/use-content";
import { useLibrary } from "@/providers/library-provider";

export default function HomeScreen() {
  const partsQuery = useParts();
  const { recents, bookmarks } = useLibrary();

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
        primaryLabel="Explore Parts"
        secondaryLabel="Open Search"
        onPrimaryPress={() => router.push("/reader/PtFP")}
        onSecondaryPress={() => router.push("/search")}
      />

      <SectionCard
        eyebrow="Discover"
        title="Parts of the Summa Theologica"
      >
        {partsQuery.isLoading ? (
          <Text>Loading the canon...</Text>
        ) : partsQuery.error ? (
          <StatePanel
            tone="error"
            title="Content is unavailable"
            body="The mobile app could not reach the local content proxy for the top-level parts."
            actionLabel="Try again"
            onAction={() => partsQuery.refetch()}
          />
        ) : (
          <View style={{ gap: 12 }}>
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

      <SectionCard eyebrow="Reader Tools" title="Continue where you left off">
        {recents.length ? (
          <View style={{ gap: 12 }}>
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
            title="No recent reading yet"
            body="Open a part, question, or article and it will appear here for quick return visits."
          />
        )}
      </SectionCard>

      <SectionCard eyebrow="Saved" title="Bookmarks">
        {bookmarks.length ? (
          <View style={{ gap: 12 }}>
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
            title="Your library is waiting"
            body="Bookmark questions and articles you want to revisit. Saved entries stay on-device for now."
          />
        )}
      </SectionCard>
    </PageShell>
  );
}
