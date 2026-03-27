import React, { Fragment } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type {ChatRequestOptions, UIMessage} from "ai";
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

  const rules = {
    // Override the 'textgroup' rule to wrap text in a selectable Text component
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
            backgroundColor: isAssistant ? colors.card : colors.teal,
            borderColor: isAssistant ? colors.border : colors.teal,
          },
        ]}
      >
        <Text style={[styles.role, { color: isAssistant ? colors.accentStrong : "#F8FBF9" }]}>
          {isAssistant ? "Thomas AI" : "You"}
        </Text>
        {message.parts.map((part, i) => {
          switch (part.type) {
            case 'text':
              return (
              <Fragment key={`${message.id}-${i}`}>
                <Markdown rules={rules} mergeStyle>{part.text}</Markdown>
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
          style={({ pressed }) => [styles.reasoningCard, { borderColor: colors.border }, pressed && styles.pressed]}
        >
          <Text style={[styles.reasoningTrigger, { color: colors.accentStrong }]}>
            {showReasoning ? "Hide reasoning" : "Show reasoning"}
          </Text>
          {showReasoning ? (
            <Markdown rules={rules} >
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
  },
  userWrapper: {
    alignItems: "flex-end",
  },
  bubble: {
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.xs,
    maxWidth: "92%",
    padding: spacing.md,
  },
  role: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
  },
  reasoningCard: {
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.xs,
    maxWidth: "92%",
    padding: spacing.sm,
  },
  reasoningTrigger: {
    fontSize: 13,
    fontWeight: "700",
  },
  reasoningBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.82,
  },
});

const textStyles = StyleSheet.flatten([styles.body, {
  color: "#F8FBF9",
}]);

const reasoningStyles = StyleSheet.flatten([styles.reasoningBody, {
  color: "#F8FBF9",
}]);
