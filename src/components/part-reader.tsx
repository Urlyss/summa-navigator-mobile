import React from "react";
import { StyleSheet, View } from "react-native";
import { LinkRow } from "@/components/link-row";
import { StatePanel } from "@/components/state-panel";
import { spacing } from "@/styles/theme";
import type { Part } from "@/types/content";
import { buildTreatiseId } from "@/utils/route-id";

type PartReaderProps = {
  part: Part;
  onOpenTreatise: (id: string) => void;
};

export function PartReader({ part, onOpenTreatise }: PartReaderProps) {
  return (
    <View style={styles.stack}>
      {part.treatises?.map((treatise) => {
        const nextId = buildTreatiseId(part.original_id, treatise.original_id);

        return (
          <LinkRow
            key={treatise.original_id}
            id={nextId}
            title={treatise.title || part.title}
            subtitle={`Treatise ${treatise.original_id}`}
            trailingLabel="Read"
            onPress={() => onOpenTreatise(nextId)}
          />
        );
      })}
      {!part.treatises?.length ? (
        <StatePanel
          title="No treatises found"
          body="This part does not currently expose any treatises in the mobile content payload."
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
});
