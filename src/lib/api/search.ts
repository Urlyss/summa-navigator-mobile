import { liteClient as algoliasearch } from "algoliasearch/lite";
import { appConfig } from "@/lib/config";

export const isSearchConfigured = Boolean(
  appConfig.algoliaAppId && appConfig.algoliaSearchKey && appConfig.algoliaIndexName
);

export const searchIndexName = appConfig.algoliaIndexName;

export const searchClient = isSearchConfigured
  ? algoliasearch(appConfig.algoliaAppId, appConfig.algoliaSearchKey)
  : null;
