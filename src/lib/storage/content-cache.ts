import { HierarchyContent } from "@/types/content";
import { readJson, writeJson } from "./json-storage";

const CONTENT_CACHE_KEY = "summa:content-cache";
const MAX_CACHE_ITEMS = 24;

type ContentCacheMap = Record<
  string,
  {
    cachedAt: string;
    value: HierarchyContent;
  }
>;

export async function getCachedContent(id: string) {
  const cache = await readJson<ContentCacheMap>(CONTENT_CACHE_KEY, {});
  return cache[id]?.value ?? null;
}

export async function storeCachedContent(id: string, value: HierarchyContent) {
  const cache = await readJson<ContentCacheMap>(CONTENT_CACHE_KEY, {});
  const next: ContentCacheMap = {
    [id]: {
      cachedAt: new Date().toISOString(),
      value,
    },
    ...cache,
  };

  const trimmedEntries = Object.entries(next).slice(0, MAX_CACHE_ITEMS);
  await writeJson(CONTENT_CACHE_KEY, Object.fromEntries(trimmedEntries));
}
