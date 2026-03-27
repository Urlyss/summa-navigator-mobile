import React from "react";
import { router } from "expo-router";
import { Configure, InstantSearch, useInfiniteHits, useInstantSearch, useSearchBox } from "react-instantsearch-core";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { searchClient, searchIndexName, isSearchConfigured } from "@/lib/api/search";
import { useLibrary } from "@/providers/library-provider";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { SearchHit } from "@/types/content";

type SearchExperienceProps = {
  draftQuery: string;
  hasSearched: boolean;
  searchHistory: { query: string; savedAt: string }[];
  onDraftQueryChange: (value: string) => void;
  onLaunchSearch: (value: string) => Promise<void>;
};

function SearchExperience({
  draftQuery,
  hasSearched,
  searchHistory,
  onDraftQueryChange,
  onLaunchSearch,
}: SearchExperienceProps) {
  const { colors } = useAppTheme();
  const { refine } = useSearchBox();
  const { items } = useInfiniteHits<SearchHit>();
  const { status, error, refresh } = useInstantSearch({ catchError: true });

  const isSearching = status === "loading" || status === "stalled";

  const handleSearch = React.useCallback(async () => {
    const normalized = draftQuery.trim();

    refine(normalized);

    if (normalized.length < 2) {
      return;
    }

    await onLaunchSearch(normalized);
  }, [draftQuery, onLaunchSearch, refine]);

  return (
    <>
      <SectionCard eyebrow="Search" title="Find a question, article, or part">
        <View style={styles.searchBox}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onDraftQueryChange}
            placeholder="Search the Summa..."
            placeholderTextColor={colors.inkSoft}
            style={[
              styles.input,
              {
                backgroundColor: colors.rowSurface,
                borderColor: colors.border,
                color: colors.ink,
              },
            ]}
            value={draftQuery}
          />
          <Pressable
            disabled={draftQuery.trim().length < 2 || isSearching}
            onPress={() => {
              void handleSearch();
            }}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.teal },
              (pressed || isSearching) && styles.pressed,
              draftQuery.trim().length < 2 && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>{isSearching ? "Searching..." : "Search"}</Text>
          </Pressable>
        </View>

        {!hasSearched ? (
          <StatePanel
            title="Search when you are ready"
            body="Enter at least two characters, then tap Search to query the Algolia index."
          />
        ) : error ? (
          <StatePanel
            tone="error"
            title="Search failed"
            body="The app could not reach the hosted Algolia index. Check the client credentials and try again."
            actionLabel="Retry"
            onAction={() => {
              refresh();
            }}
          />
        ) : isSearching ? (
          <Text selectable style={[styles.statusText, { color: colors.inkSoft }]}>
            Searching the Summa...
          </Text>
        ) : items.length ? (
          <View style={styles.list}>
            {items.map((result) => (
              <LinkRow
                key={result.objectID}
                id={result.id}
                title={result.title}
                trailingLabel="Read"
                onPress={() => {
                  router.push(`/reader/${result.id}`);
                }}
              />
            ))}
          </View>
        ) : (
          <StatePanel
            title="No results"
            body="That query did not match the current hosted index. Try a broader theological term."
          />
        )}
      </SectionCard>

      <SectionCard eyebrow="Recent" title="Search history">
        {searchHistory.length ? (
          <View style={styles.list}>
            {searchHistory.map((entry) => (
              <Pressable
                key={`${entry.query}-${entry.savedAt}`}
                onPress={() => onDraftQueryChange(entry.query)}
                style={({ pressed }) => [
                  styles.historyPill,
                  {
                    backgroundColor: colors.rowBadge,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.historyText, { color: colors.accentStrong }]}>{entry.query}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <StatePanel
            title="No searches yet"
            body="Searches are saved on-device only when you tap the Search button."
          />
        )}
      </SectionCard>
    </>
  );
}

export default function SearchScreen() {
  const [draftQuery, setDraftQuery] = React.useState("");
  const [hasSearched, setHasSearched] = React.useState(false);
  const { addSearch, searchHistory } = useLibrary();

  const handleLaunchSearch = React.useCallback(
    async (query: string) => {
      await addSearch(query);
      setHasSearched(true);
    },
    [addSearch]
  );

  if (!isSearchConfigured || !searchClient) {
    return (
      <PageShell>
        <SectionCard eyebrow="Search" title="Find a question, article, or part">
          <StatePanel
            tone="error"
            title="Search is not configured"
            body="Add the Algolia app ID, search key, and index name to the Expo public environment variables."
          />
        </SectionCard>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <InstantSearch indexName={searchIndexName} searchClient={searchClient}>
        <Configure hitsPerPage={12} />
        <SearchExperience
          draftQuery={draftQuery}
          hasSearched={hasSearched}
          searchHistory={searchHistory}
          onDraftQueryChange={setDraftQuery}
          onLaunchSearch={handleLaunchSearch}
        />
      </InstantSearch>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    gap: spacing.sm,
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: "#F7FCFA",
    fontWeight: "700",
  },
  statusText: {
    fontSize: 15,
  },
  list: {
    gap: 12,
  },
  historyPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  historyText: {
    fontWeight: "700",
  },
});
