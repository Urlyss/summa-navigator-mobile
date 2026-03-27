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
            {
              backgroundColor: colors.secondarySurface,
              borderColor: colors.borderSoft,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.label, { color: colors.accentStrong }]}>Retry</Text>
          <AntDesign color={colors.accentStrong} name="reload" size={13} />
        </Pressable>
        <Pressable
          onPress={onCopy}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: colors.secondarySurface,
              borderColor: colors.borderSoft,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.label, { color: colors.accentStrong }]}>{copyLabel}</Text>
          <AntDesign color={colors.accentStrong} name={copyLabel === "Copy" ? "copy" : "check"} size={13} />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  action: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.82,
  },
});
