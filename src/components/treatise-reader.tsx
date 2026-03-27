import React from "react";
import { StyleSheet, View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { spacing } from "@/styles/theme";
import type { Treatise } from "@/types/content";
import { buildQuestionId } from "@/utils/route-id";

type TreatiseReaderProps = {
  treatise: Treatise;
  onOpenQuestion: (id: string) => void;
};

export function TreatiseReader({ treatise, onOpenQuestion }: TreatiseReaderProps) {
  const partId = treatise.part?.original_id;

  return (
    <View style={styles.stack}>
      {treatise.questions?.map((question) => {
        const nextId = partId ? buildQuestionId(partId, treatise.original_id, question.original_id) : "";

        return (
          <LinkRow
            key={question.original_id}
            id={nextId || `Qu${question.original_id}`}
            title={question.title}
            subtitle={`Question ${question.original_id}`}
            trailingLabel="Read"
            onPress={() => {
              if (nextId) {
                onOpenQuestion(nextId);
              }
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
});
