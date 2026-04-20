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
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
      ]}
    >
      <TextInput
        editable={!isLoading}
        multiline
        onChangeText={onChangeInput}
        placeholder="Ask a question..."
        placeholderTextColor={colors.inkFaint}
        style={[
          styles.input,
          {
            color: colors.ink,
          },
        ]}
        value={input}
      />
      <View style={styles.toolbar}>
        <View style={styles.leftActions}>
          <ChatModeSelector
            modes={modes}
            onChange={onChangeMode}
            value={mode}
          />
          <Pressable
            onPress={onReset}
            style={({ pressed }) => [
              styles.secondaryAction,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[styles.secondaryText, { color: colors.inkSoft }]}
            >
              Clear
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
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <AntDesign color="#FFFFFF" name="arrowup" size={18} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    maxHeight: 120,
    minHeight: 44,
    paddingVertical: 8,
    textAlignVertical: "top",
  },
  toolbar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  secondaryAction: {
    paddingVertical: 4,
  },
  secondaryText: {
    fontSize: 13,
    fontWeight: "700",
  },
  submit: {
    borderRadius: 8,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.7,
  },
});
