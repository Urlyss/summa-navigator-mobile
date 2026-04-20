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
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.triggerText, { color: colors.inkSoft }]}>{currentMode.label}</Text>
        <FontAwesome color={colors.inkFaint} name="chevron-down" size={10} />
      </Pressable>

      <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}>
        <View style={styles.overlay}>
          <Pressable onPress={() => setOpen(false)} style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.overlay }]} />
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text selectable style={[styles.title, { color: colors.ink }]}>
              Chat Mode
            </Text>
            <View style={styles.optionsList}>
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
                        backgroundColor: active ? colors.accentSoft : "transparent",
                      },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={[styles.optionText, { color: active ? colors.accentStrong : colors.inkSoft }]}>
                      {mode.label}
                    </Text>
                    {active && <FontAwesome color={colors.accentStrong} name="check" size={14} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    paddingVertical: 4,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: "700",
    textTransform:"capitalize"
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  modalCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.lg,
    width: "100%",
    maxWidth: 320,
    gap: spacing.md,
  },
  title: {
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "700",
  },
  optionsList: {
    gap: 4,
  },
  option: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "600",
    textTransform:"capitalize"
  },
  pressed: {
    opacity: 0.7,
  },
});
