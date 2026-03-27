import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ChatModeSelector } from "@/components/chat-mode-selector";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { ChatMode } from "@/lib/ai/chatbot";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

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
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <TextInput
      editable={!isLoading}
        multiline
        onChangeText={onChangeInput}
        placeholder="Ask about this article..."
        placeholderTextColor={colors.inkSoft}
        style={[styles.input, { color: colors.ink }]}
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
                borderColor: colors.secondaryBorder,
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
          {isLoading ? <ActivityIndicator color={colors.accent} /> : <AntDesign name="send" size={16} />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xs,
  },
  input: {
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 84,
    minHeight: 52,
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
  },
  secondaryAction: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  submit: {
    borderRadius: 999,
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
