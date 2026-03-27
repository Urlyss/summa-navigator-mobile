import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { ChatMode } from "@/lib/ai/chatbot";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ChatModeSelectorProps = {
  modes: ChatMode[];
  value: string;
  onChange: (value: string) => void;
};

export function ChatModeSelector({ modes, value, onChange }: ChatModeSelectorProps) {
  const { colors } = useAppTheme();
  const [open, setOpen] = React.useState(false);
  const currentMode = modes.find((mode) => mode.value === value) ?? modes[0];

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          {
            backgroundColor: colors.secondarySurface,
            borderColor: colors.borderSoft,
          },
          pressed && styles.pressed,
        ]}
      >
        <Text selectable style={[styles.kicker, { color: colors.inkFaint }]}>
          Mode
        </Text>
        <Text style={[styles.triggerText, { color: colors.accentStrong }]}>{currentMode.label}</Text>
        <FontAwesome color={colors.accentStrong} name="caret-down" size={12} />
      </Pressable>

      <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}>
        <View style={styles.overlay}>
          <Pressable onPress={() => setOpen(false)} style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.overlay }]} />
          <View style={[styles.modalCard, { backgroundColor: colors.sheetSurface, borderColor: colors.border }]}>
            <Text selectable style={[styles.title, { color: colors.ink }]}>
              Choose a mode
            </Text>
            {modes.map((mode) => {
              const active = mode.value === value;

              return (
                <Pressable
                  key={mode.value}
                  onPress={() => {
                    onChange(mode.value);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: active ? colors.accentStrong : colors.secondarySurface,
                      borderColor: active ? colors.accentStrong : colors.secondaryBorder,
                    },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.optionText, { color: active ? "#FFF8ED" : colors.accentStrong }]}>
                    {mode.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 38,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  triggerText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform:"capitalize"
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  option: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform:"capitalize"
  },
  pressed: {
    opacity: 0.82,
  },
});
