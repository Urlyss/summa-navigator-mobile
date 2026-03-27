import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Chatbot } from "@/components/chatbot"
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { Article } from "@/types/content";
import Toast from "react-native-toast-message";

type ChatbotDrawerProps = {
  article: Article;
  visible: boolean;
  onClose: () => void;
};

export function ChatbotDrawer({ article, visible, onClose }: ChatbotDrawerProps) {
  const { colors } = useAppTheme();

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.overlay }]} />
        <View style={[styles.sheet, { backgroundColor: colors.sheetSurface }]}>
          <View style={[styles.handle, { backgroundColor: colors.sheetHandle }]} />
          <View style={styles.header}>
            <Text selectable style={[styles.title, { color: colors.ink }]}>
              Ask Thomas AI
            </Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, { backgroundColor: colors.secondarySurface }, pressed && styles.pressed]}
            >
              <Text style={[styles.closeText, { color: colors.accentStrong }]}>Close</Text>
            </Pressable>
          </View>
          <Chatbot article={article} />
        </View>
      </View>
      <Toast />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.xs,
  },
  sheet: {
    height: "90%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "column",
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  handle: {
    alignSelf: "center",
    borderRadius: 999,
    height: 5,
    width: 52,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: "700",
  },
  closeButton: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  closeText: {
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
