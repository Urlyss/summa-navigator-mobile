import type { Article } from "@/types/content";
import { UIMessage } from "ai";

export type ChatRole = "assistant" | "user";

export type ChatMode = {
  label: string;
  value: string;
};

export const systemMessages = {
    default: `You are Thomas AI, an expert on Thomas Aquinas's Summa Theologica. Help users understand the text, explain complex theological concepts, and engage in philosophical discussions. Always maintain a scholarly yet accessible tone.`,
    teacher: `You are Thomas AI, a patient teacher specializing in Thomistic philosophy. Break down complex ideas into understandable parts, use analogies when helpful, and guide users through difficult concepts step by step.`,
    scholar: `You are Thomas AI, a medieval philosophy scholar. Provide detailed analysis of Aquinas's arguments, cite relevant passages, and connect ideas to broader philosophical traditions. Include references to primary and secondary sources when appropriate.`,
    interpreter: `You are Thomas AI, a skilled interpreter of Scholastic philosophy. Help users understand the historical context, explain medieval terminology, and clarify the structure of Aquinas's arguments.`,
    debater: `You are Thomas AI, trained in Scholastic disputation. Help users understand objections and replies, explain the dialectical method, and demonstrate how Aquinas builds and responds to arguments.`
  };

  export const chatModes = Object.entries(systemMessages).map(([value, label]) => ({
    label: value,
    value
}));

export const defaultSuggestions = [
   "Explain this article to me.",
    "What is the main idea of this article?",
    "What is the conclusion of this article?",
    "What are the key points of this article?",
];

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function firstLine(lines: string[] | undefined, fallback: string) {
  return lines?.find((line) => line.trim().length > 0) ?? fallback;
}

export function articleContextSummary(article: Article) {
  const bodyLead = firstLine(article.body, "No article body is available yet.");
  const counterLead = firstLine(article.counter, "No counter statement is available yet.");

  return [
    `You are reading ${article.title}.`,
    `Part: ${article.part.title}.`,
    `Treatise ${article.treatise.original_id}: ${article.treatise.title}.`,
    `Question ${article.question.original_id}: ${article.question.title}.`,
    `Counterpoint: ${counterLead}`,
    `Answer lead: ${bodyLead}`,
  ].join("\n");
}

export function buildInitialChatMessages(article: Article): UIMessage[] {
  return [
    {
      id: makeId("assistant"),
      role: "assistant",
      parts:[{
        type: "text",
        text: `
Welcome! I am Thomas AI, your guide to understanding the Summa Theologica.
I can help you:
+ Understand complex theological concepts
+ Explain the structure of arguments
+ Provide historical context
+ Connect ideas across different parts of the Summa
+ Answer questions about specific articles
How can I assist you with this article?`
      }],
    },
    ]
}

