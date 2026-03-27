import type { BaseHit } from "instantsearch.js";

export type TitleAndOriginalId = {
  title: string;
  original_id: number | string;
};

export type Part = {
  _id?: string;
  original_id: string;
  title: string;
  order?: number;
  treatises?: Treatise[];
};

export type Treatise = {
  _id?: string;
  original_id: number;
  title: string;
  part?: Part;
  questions?: Question[];
};

export type Question = {
  _id?: string;
  original_id: number;
  title: string;
  description: string[] | string;
  part?: Part;
  treatise?: Treatise;
  articles?: ArticleSummary[];
};

export type ObjectionOrReply = {
  id: number;
  text: string[];
};

export type ArticleSummary = {
  _id?: string;
  original_id: number;
  title: string;
};

export type Article = ArticleSummary & {
  body: string[];
  counter: string[];
  objections: ObjectionOrReply[];
  replies: ObjectionOrReply[];
  question: Question;
  treatise: Treatise;
  part: Part;
};

export type HierarchyContent =
  | { part: Part; treatise?: never; question?: never; article?: never }
  | { part?: never; treatise: Treatise; question?: never; article?: never }
  | { part?: never; treatise?: never; question: Question; article?: never }
  | { part?: never; treatise?: never; question?: never; article: Article };

export type SearchHit = BaseHit & {
  objectID: string;
  id: string;
  title: string;
};

export type SavedEntry = {
  id: string;
  title: string;
  subtitle: string;
  kind: "bookmark" | "recent";
  savedAt: string;
};
