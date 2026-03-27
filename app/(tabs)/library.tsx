import React from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { useLibrary } from "@/providers/library-provider";

export default function LibraryScreen() {
  const { bookmarks, recents } = useLibrary();

  return (
    <PageShell>
      <SectionCard eyebrow="Saved" title="Bookmarks">
        {bookmarks.length ? (
          <View style={{ gap: 12 }}>
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
          <View style={{ gap: 12 }}>
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
