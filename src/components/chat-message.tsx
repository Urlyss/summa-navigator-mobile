import React, { Fragment } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { UIMessage } from "ai";
import Markdown from 'react-native-markdown-display';
import { ChatActions } from "./chat-actions";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';



export function ChatMessageView( {message,msgInd,totalMsgLength,regenerate} : {message:UIMessage,msgInd:number,totalMsgLength:number,regenerate:()=>void}) {
  interface ITextNode {
    key: string;
    content: string;
}
  
interface IStylesNode {
    text: object;
    textgroup: object;
}
  const { colors } = useAppTheme();
  const [showReasoning, setShowReasoning] = React.useState(false);
  const [copyLabel, setCopyLabel] = React.useState("Copy");
  const isAssistant = message.role === "assistant";
  const markdownStyle = React.useMemo(
    () => ({
      body: {
        color: isAssistant ? colors.ink : "#FFFFFF",
        fontSize: 15,
        lineHeight: 24,
      },
      paragraph: {
        color: isAssistant ? colors.ink : "#FFFFFF",
        fontSize: 15,
        lineHeight: 24,
        marginTop: 0,
        marginBottom: spacing.sm,
      },
      heading1: {
        color: isAssistant ? colors.ink : "#FFFFFF",
        fontFamily: "serif",
        fontSize: 20,
        lineHeight: 28,
        marginTop: 0,
        marginBottom: spacing.sm,
      },
      heading2: {
        color: isAssistant ? colors.ink : "#FFFFFF",
        fontFamily: "serif",
        fontSize: 18,
        lineHeight: 24,
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
      },
      bullet_list: {
        marginTop: 0,
        marginBottom: spacing.sm,
      },
      ordered_list: {
        marginTop: 0,
        marginBottom: spacing.sm,
      },
      list_item: {
        color: isAssistant ? colors.ink : "#FFFFFF",
      },
      strong: {
        color: isAssistant ? colors.teal : "#FFFFFF",
        fontWeight: "700",
      },
      em: {
        color: isAssistant ? colors.inkSoft : "rgba(255,255,255,0.8)",
      },
      blockquote: {
        borderLeftColor: isAssistant ? colors.gold : "rgba(255,255,255,0.4)",
        borderLeftWidth: 2,
        color: isAssistant ? colors.inkSoft : "rgba(255,255,255,0.8)",
        marginLeft: 0,
        paddingLeft: spacing.sm,
      },
      code_inline: {
        backgroundColor: isAssistant ? colors.secondarySurface : "rgba(255,255,255,0.15)",
        borderRadius: 4,
        color: isAssistant ? colors.teal : "#FFFFFF",
        paddingHorizontal: 4,
        paddingVertical: 1,
      },
    }),
    [colors, isAssistant]
  );

  const rules = {
    textgroup: (
      node: ITextNode,
      children: any,
      parent: unknown,
      styles: IStylesNode,) => {
      return (
        <Text key={node.key} selectable={true} style={styles.textgroup}>
          {children}
        </Text>
      );
    },
  };

  return (
    <View style={[styles.wrapper, !isAssistant && styles.userWrapper]}>
      <View
        style={[
          styles.bubble,
          {
            alignSelf: isAssistant ? "flex-start" : "flex-end",
            backgroundColor: isAssistant ? colors.cardMuted : colors.teal,
            borderColor: isAssistant ? colors.border : colors.teal,
          },
        ]}
      >
        <View style={styles.metaRow}>
          <Text style={[styles.role, { color: isAssistant ? colors.inkFaint : "rgba(255,255,255,0.7)" }]}>
            {isAssistant ? "Thomas AI" : "You"}
          </Text>
        </View>
        {message.parts.map((part, i) => {
          switch (part.type) {
            case 'text':
              return (
              <Fragment key={`${message.id}-${i}`}>
                <Markdown rules={rules} style={markdownStyle as any}>
                  {part.text}
                </Markdown>
                {isAssistant && totalMsgLength>1 && msgInd > 0 && part.state=="done" &&(
                            <ChatActions onRetry={()=>{
                              regenerate()
                            }} onCopy={async () => {
                              await Clipboard.setStringAsync(part.text);
                              Toast.show({
                                type: "success",
                                text1: "Copied to clipboard",
                                position: "top",
                              });
                              setCopyLabel("Copied");
                              setTimeout(() => setCopyLabel("Copy"), 1000);
                            }} 
                            copyLabel={copyLabel}
                            />
                          )}
              </Fragment>)
            case 'reasoning':
              return (
                <Pressable
                key={`${message.id}-${i}`}
          onPress={() => setShowReasoning((current) => !current)}
          style={({ pressed }) => [
            styles.reasoningCard,
            {
              backgroundColor: isAssistant ? colors.secondarySurface : "rgba(255,255,255,0.1)",
              borderColor: isAssistant ? colors.border : "rgba(255,255,255,0.2)",
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.reasoningTrigger, { color: isAssistant ? colors.inkSoft : "#FFFFFF" }]}>
            {showReasoning ? "Hide reasoning" : "Show reasoning"}
          </Text>
          {showReasoning ? (
            <Markdown rules={rules} style={markdownStyle as any}>
              {part.text}
            </Markdown>
          ) : null}
        </Pressable>
              ) 
          }
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  userWrapper: {
    alignItems: "flex-end",
  },
  bubble: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    maxWidth: "88%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
  },
  role: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  reasoningCard: {
    borderRadius: 6,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  reasoningTrigger: {
    fontSize: 12,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.7,
  },
});
