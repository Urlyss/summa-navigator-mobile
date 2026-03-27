import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArticleReader } from "@/components/article-reader";
import { PartReader } from "@/components/part-reader";
import { PageShell } from "@/components/page-shell";
import { QuestionReader } from "@/components/question-reader";
import { SectionCard } from "@/components/section-card";
import { StatePanel } from "@/components/state-panel";
import { TreatiseReader } from "@/components/treatise-reader";
import { useContent } from "@/hooks/use-content";
import { useLibrary } from "@/providers/library-provider";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import { routeLabel } from "@/utils/route-id";

function normalizeId(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function titleFromContent(data: ReturnType<typeof useContent>["data"], id: string) {
  if (!data) {
    return id;
  }

  if ("article" in data && data.article) {
    return data.article.title;
  }

  if ("question" in data && data.question) {
    return data.question.title;
  }

  if ("treatise" in data && data.treatise) {
    return data.treatise.title;
  }

  return data.part.title;
}

export default function ReaderScreen() {
  const { colors } = useAppTheme();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = React.useMemo(() => normalizeId(params.id), [params.id]);
  const contentQuery = useContent(id);
  const { addRecent, isBookmarked, toggleBookmark } = useLibrary();
  const lastRecentKeyRef = React.useRef<string | null>(null);

  const data = contentQuery.data;
  const title = React.useMemo(() => titleFromContent(data, id), [data, id]);
  const subtitle = React.useMemo(() => routeLabel(id), [id]);

  const article = data && "article" in data ? data.article : undefined;
  const question = data && "question" in data ? data.question : undefined;
  const treatise = data && "treatise" in data ? data.treatise : undefined;
  const part = data?.part;

  const recentEntry = React.useMemo(
    () => ({
      id,
      title,
      subtitle,
    }),
    [id, subtitle, title]
  );

  React.useEffect(() => {
    if (!article || !id) {
      return;
    }

    const recentKey = `${recentEntry.id}:${recentEntry.title}:${recentEntry.subtitle}`;
    if (lastRecentKeyRef.current === recentKey) {
      return;
    }

    lastRecentKeyRef.current = recentKey;
    void addRecent(recentEntry);
  }, [addRecent, article, id, recentEntry]);

  const bookmarked = isBookmarked(id);

  const handleBookmark = React.useCallback(async () => {
    if (!data || !id) {
      return;
    }

    await toggleBookmark(recentEntry);
    await Haptics.selectionAsync();
  }, [data, id, recentEntry, toggleBookmark]);

  if (!id) {
    return (
      <>
        <Stack.Screen options={{ title: "Reader" }} />
        <PageShell>
          <StatePanel
            tone="error"
            title="Missing route"
            body="This reader route is missing its content identifier."
          />
        </PageShell>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title }} />
      <PageShell>
        <SectionCard eyebrow={subtitle} title={title}>
          <View style={styles.actions}>
            <Pressable
              onPress={handleBookmark}
              style={({ pressed }) => [
                styles.action,
                { backgroundColor: colors.accentStrong },
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.actionText}>{bookmarked ? "Remove Bookmark" : "Bookmark"}</Text>
              <FontAwesome color={colors.border} name={bookmarked ? "bookmark" : "bookmark-o"} size={16} />
            </Pressable>
          </View>
        </SectionCard>

        {contentQuery.isLoading ? (
          <StatePanel title="Loading content" body="Pulling this section from the hosted content API..." />
        ) : contentQuery.error || !data ? (
          <StatePanel
            tone="error"
            title="Content unavailable"
            body="This route could not be resolved from the current content response."
            actionLabel="Try again"
            onAction={() => {
              void contentQuery.refetch();
            }}
          />
        ) : article ? (
          <SectionCard eyebrow="Article" title="Structured reader">
            <ArticleReader article={article} />
          </SectionCard>
        ) : question ? (
          <SectionCard eyebrow="Question" title={question.title}>
            <QuestionReader
              onOpenArticle={(nextId) => {
                router.push(`/reader/${nextId}`);
              }}
              question={question}
            />
          </SectionCard>
        ) : treatise ? (
          <SectionCard eyebrow="Treatise" title={treatise.title}>
            <TreatiseReader
              onOpenQuestion={(nextId) => {
                router.push(`/reader/${nextId}`);
              }}
              treatise={treatise}
            />
          </SectionCard>
        ) : part ? (
          <SectionCard eyebrow="Part" title={part.title}>
            <PartReader
              onOpenTreatise={(nextId) => {
                router.push(`/reader/${nextId}`);
              }}
              part={part}
            />
          </SectionCard>
        ) : null}
      </PageShell>
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  action: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.82,
  },
  actionText: {
    color: "#FFF7EC",
    fontWeight: "700",
  },
});
