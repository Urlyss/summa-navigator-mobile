import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ChatModeSelector } from "@/components/chat-mode-selector";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { ChatMode } from "@/lib/ai/chatbot";
import AntDesign from "@expo/vector-icons/AntDesign";

type ChatComposerProps = {
  input: string;
  isLoading: boolean;
  mode: string;
  modes: ChatMode[];
  onChangeInput: (value: string) => void;
  onChangeMode: (value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
};

export function ChatComposer({
  input,
  isLoading,
  mode,
  modes,
  onChangeInput,
  onChangeMode,
  onReset,
  onSubmit,
}: ChatComposerProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.cardElevated,
          borderColor: colors.borderSoft,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Text selectable style={[styles.kicker, { color: colors.inkFaint }]}>
        Compose a response
      </Text>
      <TextInput
        editable={!isLoading}
        multiline
        onChangeText={onChangeInput}
        placeholder="Ask about this article..."
        placeholderTextColor={colors.inkSoft}
        style={[
          styles.input,
          {
            backgroundColor: colors.parchmentMuted,
            borderColor: colors.borderSoft,
            color: colors.ink,
          },
        ]}
        value={input}
      />
      <View style={styles.toolbar}>
        <View style={styles.actionsList}>
          <View>
            <ChatModeSelector
              modes={modes}
              onChange={onChangeMode}
              value={mode}
            />
          </View>
          <Pressable
            onPress={onReset}
            style={({ pressed }) => [
              styles.secondaryAction,
              {
                backgroundColor: colors.secondarySurface,
                borderColor: colors.borderSoft,
              },
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[styles.secondaryText, { color: colors.accentStrong }]}
            >
              Reset
            </Text>
          </Pressable>
        </View>
        <Pressable
          disabled={!input.trim() || isLoading}
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.submit,
            { backgroundColor: colors.teal },
            (!input.trim() || isLoading) && styles.disabled,
            pressed && styles.pressed,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.accent} />
          ) : (
            <>
              <Text style={styles.submitText}>Send</Text>
              <AntDesign color="#F8FBF9" name="arrow-right" size={14} />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 26,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
  },
  kicker: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 84,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    textAlignVertical: "top",
  },
  toolbar: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "space-between",
  },
  actionsList:{
    flexDirection: "row",
    gap: spacing.xs,
    flexShrink: 1,
  },
  secondaryAction: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 38,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  submit: {
    borderRadius: 999,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  submitText: {
    color: "#F8FBF9",
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.82,
  },
});
