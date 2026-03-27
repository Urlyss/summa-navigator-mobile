import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import AntDesign from "@expo/vector-icons/AntDesign";

type ChatActionsProps = {
  onRetry: () => void;
  onCopy: () => void;
  copyLabel:string
};

export function ChatActions({
  onRetry,
  onCopy,
  copyLabel
}: ChatActionsProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [
            styles.action,
            { backgroundColor: colors.secondarySurface, borderColor: colors.secondaryBorder },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.label, { color: colors.accentStrong }]}>Retry</Text>
          <AntDesign color={colors.accentStrong} name="reload"  />
        </Pressable>
        <Pressable
          onPress={onCopy}
          style={({ pressed }) => [
            styles.action,
            { backgroundColor: colors.secondarySurface, borderColor: colors.secondaryBorder },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.label, { color: colors.accentStrong }]}>{copyLabel}</Text>
          <AntDesign color={colors.accentStrong} name={copyLabel === "Copy" ? "copy" : "check"}  />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.xs,
  },
  action: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
