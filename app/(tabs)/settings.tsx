import React from "react";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { useLibrary } from "@/providers/library-provider";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";

export default function SettingsScreen() {
  const { clearAll } = useLibrary();
  const { colors, isDark, toggleTheme } = useAppTheme();

  async function resetLibrary() {
    await clearAll();
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  async function handleThemeToggle() {
    await toggleTheme();
    await Haptics.selectionAsync();
  }

  return (
    <PageShell>
      <SectionCard eyebrow="Appearance" title="Theme">
        <View style={styles.row}>
          <View style={styles.copy}>
            <Text selectable style={[styles.body, { color: colors.ink }]}>
              {isDark ? "Dark mode is active." : "Light mode is active."}
            </Text>
            <Text selectable style={[styles.caption, { color: colors.inkSoft }]}>
              Switch between a bright reading surface and a darker study environment.
            </Text>
          </View>
          <Switch
            onValueChange={() => {
              void handleThemeToggle();
            }}
            thumbColor={isDark ? colors.accentStrong : "#F7F1E8"}
            trackColor={{ false: colors.border, true: colors.teal }}
            value={isDark}
          />
        </View>
      </SectionCard>

      <SectionCard eyebrow="Storage" title="Local data">
        <Text selectable style={[styles.body, { color: colors.ink }]}>
          Bookmarks, the last article read, cached article payloads, and search history stay on-device in this prototype.
        </Text>
        <Pressable
          onPress={() => {
            void resetLibrary();
          }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accentStrong },
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Clear Bookmarks & History</Text>
        </Pressable>
      </SectionCard>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: "#FFF8ED",
    fontWeight: "700",
  },
});
