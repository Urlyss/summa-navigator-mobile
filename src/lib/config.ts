const fallbackBaseUrl = "https://summa-navigator.urlyss.dev";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const appConfig = {
  webBaseUrl: trimTrailingSlash(
    process.env.EXPO_PUBLIC_WEB_BASE_URL?.trim() || fallbackBaseUrl
  ),
  apiKey: process.env.EXPO_PUBLIC_API_KEY?.trim() || "",
  algoliaAppId:
    process.env.EXPO_PUBLIC_ALGOLIA_APP_ID?.trim() || "",
  algoliaSearchKey:
    process.env.EXPO_PUBLIC_ALGOLIA_SEARCH_KEY?.trim() || "",
  algoliaIndexName:
    process.env.EXPO_PUBLIC_ALGOLIA_INDEX_NAME?.trim() || "summa",
};
