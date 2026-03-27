import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChatbotDrawer } from "@/components/chatbot-drawer";
import { ReaderNavigation } from "@/components/reader-navigation";
import { ReaderSectionBlock } from "@/components/reader-section-block";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import { Article } from "@/types/content";
import { buildArticleId, buildArticleShortContextId } from "@/utils/route-id";

const tabs = [
  { key: "objections", label: "Objections" },
  { key: "answer", label: "Answer" },
  { key: "replies", label: "Replies" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ArticleReader({ article }: { article: Article }) {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = React.useState<TabKey>("objections");
  const [isChatOpen, setIsChatOpen] = React.useState(false);


  const currentShortContextId = buildArticleShortContextId(
    article.part.original_id,
    article.treatise.original_id,
    article.question.original_id,
    article.original_id
  ).replace(`${article.part.original_id}`, article.part.title);

  const previousId =
    article.original_id > 1
      ? buildArticleId(
          article.part.original_id,
          article.treatise.original_id,
          article.question.original_id,
          article.original_id - 1
        )
      : null;
  const nextId = buildArticleId(
    article.part.original_id,
    article.treatise.original_id,
    article.question.original_id,
    article.original_id + 1
  );

  const sections = React.useMemo(() => {
    if (activeTab === "objections") {
      return article.objections.map((entry) => ({
        title: `Objection ${entry.id}`,
        paragraphs: entry.text,
      }));
    }

    if (activeTab === "replies") {
      return article.replies.map((entry) => ({
        title: `Reply to Objection ${entry.id}`,
        paragraphs: entry.text,
      }));
    }

    return [
      {
        title: "On the contrary",
        paragraphs: article.counter,
      },
      {
        title: "I answer that",
        paragraphs: article.body,
      },
    ];
  }, [activeTab, article.body, article.counter, article.objections, article.replies]);

  return (
    <View style={styles.wrapper}>
      <Text selectable style={[styles.title, { color: colors.ink }]}>
        {article.title}
      </Text>

      <View style={styles.tabList}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor: activeTab === tab.key ? colors.accentStrong : colors.cardMuted,
                borderColor: activeTab === tab.key ? colors.accentStrong : colors.borderSoft,
              },
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.key ? "#FFF7EB" : colors.accentStrong,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.stack}>
        {sections.map((section) => (
          <ReaderSectionBlock key={section.title} title={section.title} paragraphs={section.paragraphs} />
        ))}
      </View>

      <ReaderNavigation previousId={previousId} nextId={nextId} />

      <View
        style={[
          styles.contextCard,
          {
            backgroundColor: colors.cardMuted,
            borderColor: colors.borderSoft,
          },
        ]}
      >
        <Text selectable style={[styles.contextLabel, { color: colors.accentStrong }]}>
          Article context
        </Text>
        <Text selectable style={[styles.contextValue, { color: colors.inkSoft }]}>
          {currentShortContextId}
        </Text>
      </View>

      <Pressable
        onPress={() => setIsChatOpen(true)}
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: colors.teal,
            boxShadow: `0 16px 40px ${colors.shadow}`,
          },
          pressed && styles.pressed,
        ]}
      >
        <FontAwesome color="#F8FBF9" name="commenting" size={22} />
        <Text style={styles.fabText}>Ask Thomas AI</Text>
      </Pressable>

      <ChatbotDrawer article={article} onClose={() => setIsChatOpen(false)} visible={isChatOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.lg,
  },
  title: {
    fontFamily: "serif",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 42,
  },
  tabList: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  tab: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.82,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  stack: {
    gap: spacing.xl,
  },
  contextCard: {
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  contextLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  contextValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 999,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  fabText: {
    color: "#F8FBF9",
    fontSize: 14,
    fontWeight: "700",
  },
});
