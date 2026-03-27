import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatComposer } from "@/components/chat-composer";
import { ChatMessageView } from "@/components/chat-message";
import { ChatSuggestions } from "@/components/chat-suggestions";
import {
  articleContextSummary,
  buildInitialChatMessages,
  chatModes,
  defaultSuggestions,
} from "@/lib/ai/chatbot";
import { useAppTheme } from "@/providers/theme-provider";
import { spacing } from "@/styles/theme";
import type { Article } from "@/types/content";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { appConfig } from "@/lib/config";



export function Chatbot({ article }: {article: Article;}) {
  const { colors } = useAppTheme();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const [input, setInput] = React.useState("");
  const [mode, setMode] = React.useState(chatModes[0].value);

  const initialMessages = React.useMemo(() => buildInitialChatMessages(article), [article]);

    const { messages, error, sendMessage,regenerate,status,setMessages } = useChat({
      messages: initialMessages,  
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: `${appConfig.webBaseUrl}/api/chat`,
      headers() {
        return {"x-api-key": appConfig.apiKey};
      },
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  if (error) return <Text>{error.message}</Text>;

  const hasUserMessages = React.useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages]
  );

  React.useEffect(() => {
    setInput("");
    setMode(chatModes[0].value);
  }, [initialMessages]);

  const sendPrompt = React.useCallback(
    async (prompt: string) => {
      const trimmed = prompt.trim();
      if (!trimmed) {
        return;
      }

      sendMessage(
        { text: prompt},
        {body :{ aiMode:mode,articleContext:articleContextSummary(article)}}
        
      );
      setInput("");
      scrollRef.current?.scrollToEnd({ animated: true })
    },
    [article, mode]
  );

  return (
    <View style={styles.wrapper}>
      <View style={[styles.conversationFrame, { backgroundColor: colors.parchmentMuted, borderColor: colors.border }]}>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          style={styles.scroll}
          contentContainerStyle={[
            styles.messageStack,
            {
              paddingBottom: hasUserMessages ? 180 : 300,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m,ind) => (
            <ChatMessageView regenerate={()=>{
              regenerate({body :{ aiMode:mode,articleContext:articleContextSummary(article)}})
            }} key={m.id} message={m} totalMsgLength={messages.length} msgInd={ind}/>
          ))}
          {status === "submitted" ? (
            <View style={[styles.loaderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ActivityIndicator color={colors.teal} />
              <Text style={[styles.loaderText, { color: colors.inkSoft }]}>Thomas AI is thinking...</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View style={[styles.composerDock, { backgroundColor: colors.sheetSurface, borderColor: colors.border }]}>
        {!hasUserMessages ? (
          <ChatSuggestions
            onSelect={(value) => {
              setInput(value);
            }}
            suggestions={defaultSuggestions}
          />
        ) : null}

        <ChatComposer
          input={input}
          isLoading={status === "streaming" || status === "submitted"}
          mode={mode}
          modes={chatModes}
          onChangeInput={setInput}
          onChangeMode={setMode}
          onReset={() => {
            setMessages(initialMessages)
          }}
          onSubmit={() => {
            void sendPrompt(input);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: spacing.md,
  },
  header: {
    fontFamily: "serif",
    fontSize: 24,
    fontWeight: "700",
  },
  subheader: {
    fontSize: 14,
    lineHeight: 21,
  },
  conversationFrame: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 0,
    overflow: "hidden",
    paddingBottom: spacing.xs,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  messageStack: {
    gap: spacing.md,
    padding: spacing.md,
  },
  messageItem: {
    gap: spacing.xs,
  },
  loaderCard: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  loaderText: {
    fontSize: 13,
    fontWeight: "600",
  },
  composerDock: {
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    gap: spacing.sm,
    left: 0,
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
});
