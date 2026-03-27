import React from "react";
import { SavedEntry } from "@/types/content";
import { readJson, writeJson } from "@/lib/storage/json-storage";

type SearchRecord = {
  query: string;
  savedAt: string;
};

type LibraryContextValue = {
  bookmarks: SavedEntry[];
  recents: SavedEntry[];
  searchHistory: SearchRecord[];
  isReady: boolean;
  toggleBookmark: (entry: Omit<SavedEntry, "kind" | "savedAt">) => Promise<void>;
  addRecent: (entry: Omit<SavedEntry, "kind" | "savedAt">) => Promise<void>;
  addSearch: (query: string) => Promise<void>;
  clearAll: () => Promise<void>;
  isBookmarked: (id: string) => boolean;
};

const BOOKMARKS_KEY = "summa:bookmarks";
const RECENTS_KEY = "summa:recents";
const SEARCH_HISTORY_KEY = "summa:search-history";
const BOOKMARK_LIMIT = 20;
const SEARCH_LIMIT = 20;

const LibraryContext = React.createContext<LibraryContextValue | null>(null);

function dedupe(entries: SavedEntry[]) {
  return entries.filter(
    (entry, index, list) => list.findIndex((item) => item.id === entry.id) === index
  );
}

export function LibraryProvider({ children }: React.PropsWithChildren) {
  const [bookmarks, setBookmarks] = React.useState<SavedEntry[]>([]);
  const [recents, setRecents] = React.useState<SavedEntry[]>([]);
  const [searchHistory, setSearchHistory] = React.useState<SearchRecord[]>([]);
  const [isReady, setIsReady] = React.useState(false);
  const bookmarksRef = React.useRef<SavedEntry[]>([]);
  const recentsRef = React.useRef<SavedEntry[]>([]);
  const searchHistoryRef = React.useRef<SearchRecord[]>([]);

  React.useEffect(() => {
    async function load() {
      const [savedBookmarks, savedRecents, savedSearchHistory] = await Promise.all([
        readJson<SavedEntry[]>(BOOKMARKS_KEY, []),
        readJson<SavedEntry[]>(RECENTS_KEY, []),
        readJson<SearchRecord[]>(SEARCH_HISTORY_KEY, []),
      ]);

      setBookmarks(savedBookmarks);
      setRecents(savedRecents);
      setSearchHistory(savedSearchHistory);
      bookmarksRef.current = savedBookmarks;
      recentsRef.current = savedRecents;
      searchHistoryRef.current = savedSearchHistory;
      setIsReady(true);
    }

    load();
  }, []);

  const persistBookmarks = React.useCallback(async (next: SavedEntry[]) => {
    bookmarksRef.current = next;
    setBookmarks(next);
    await writeJson(BOOKMARKS_KEY, next);
  }, []);

  const persistRecents = React.useCallback(async (next: SavedEntry[]) => {
    recentsRef.current = next;
    setRecents(next);
    await writeJson(RECENTS_KEY, next);
  }, []);

  const persistSearchHistory = React.useCallback(async (next: SearchRecord[]) => {
    searchHistoryRef.current = next;
    setSearchHistory(next);
    await writeJson(SEARCH_HISTORY_KEY, next);
  }, []);

  const toggleBookmark = React.useCallback(
    async (entry: Omit<SavedEntry, "kind" | "savedAt">) => {
      const currentBookmarks = bookmarksRef.current;
      const existing = currentBookmarks.some((bookmark) => bookmark.id === entry.id);
      const next: SavedEntry[] = existing
        ? currentBookmarks.filter((bookmark) => bookmark.id !== entry.id)
        : [
            { ...entry, kind: "bookmark", savedAt: new Date().toISOString() },
            ...currentBookmarks,
          ];

      await persistBookmarks(dedupe(next).slice(0, BOOKMARK_LIMIT));
    },
    [persistBookmarks]
  );

  const addRecent = React.useCallback(
    async (entry: Omit<SavedEntry, "kind" | "savedAt">) => {
      const next: SavedEntry[] = [
        { ...entry, kind: "recent", savedAt: new Date().toISOString() },
      ];

      await persistRecents(next);
    },
    [persistRecents]
  );

  const addSearch = React.useCallback(
    async (query: string) => {
      const normalized = query.trim();
      if (!normalized) {
        return;
      }

      const next: SearchRecord[] = [
        { query: normalized, savedAt: new Date().toISOString() },
        ...searchHistoryRef.current.filter((entry) => entry.query !== normalized),
      ].slice(0, SEARCH_LIMIT);

      await persistSearchHistory(next);
    },
    [persistSearchHistory]
  );

  const clearAll = React.useCallback(async () => {
    await Promise.all([
      persistBookmarks([]),
      persistRecents([]),
      persistSearchHistory([]),
    ]);
  }, [persistBookmarks, persistRecents, persistSearchHistory]);

  const value = React.useMemo<LibraryContextValue>(
    () => ({
      bookmarks,
      recents,
      searchHistory,
      isReady,
      toggleBookmark,
      addRecent,
      addSearch,
      clearAll,
      isBookmarked: (id) => bookmarks.some((bookmark) => bookmark.id === id),
    }),
    [addRecent, addSearch, bookmarks, clearAll, isReady, recents, searchHistory, toggleBookmark]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = React.useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used inside LibraryProvider");
  }

  return context;
}
