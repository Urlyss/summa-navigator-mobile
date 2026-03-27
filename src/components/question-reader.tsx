import React from "react";
import { StyleSheet, View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { ReaderSectionBlock } from "@/components/reader-section-block";
import { spacing } from "@/styles/theme";
import type { Question } from "@/types/content";
import { buildArticleId } from "@/utils/route-id";

type QuestionReaderProps = {
  question: Question;
  onOpenArticle: (id: string) => void;
};

export function QuestionReader({ question, onOpenArticle }: QuestionReaderProps) {
  const partId = question.part?.original_id;
  const treatiseId = question.treatise?.original_id;
  const description = Array.isArray(question.description)
    ? question.description
    : [question.description];

  return (
    <View style={styles.stack}>
      <ReaderSectionBlock title="Question overview" paragraphs={description} />
      <View style={styles.stack}>
        {question.articles?.map((article) => {
          const nextId =
            partId && treatiseId
              ? buildArticleId(partId, treatiseId, question.original_id, article.original_id)
              : "";

          return (
            <LinkRow
              key={article.original_id}
              id={nextId || `Ar${article.original_id}`}
              title={article.title}
              subtitle={`Article ${article.original_id}`}
              trailingLabel="Read"
              onPress={() => {
                if (nextId) {
                  onOpenArticle(nextId);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
});
