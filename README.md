# Summa Navigator Mobile

An Expo React Native companion for browsing and reading the *Summa Theologiae* in a mobile-first interface.

This app reworks the original web experience into an Android-friendly reading flow with tabs, a dedicated reader, local library features, Algolia-powered search, and an in-reader AI assistant surface.

## Highlights

- Expo Router app with tab navigation and deep reader routes
- Reader-first experience for parts, treatises, questions, and articles
- Direct client-side integration with the Summa Navigator web API
- Algolia search with on-device search history
- Local bookmarks and "last article read" recents
- Light/dark theme toggle
- Article chatbot drawer designed for contextual AI workflows

## Stack

- Expo
- React Native
- Expo Router
- TypeScript
- TanStack Query
- AsyncStorage
- Algolia InstantSearch Core

## Project Structure

```text
app/
  (tabs)/            Tab screens: home, search, library, settings
  reader/            Reader route
src/
  components/        Shared UI and reader/chat components
  hooks/             App hooks
  lib/               API clients, AI helpers, storage helpers
  providers/         Theme and library state
  styles/            Shared design tokens
  types/             Domain types
  utils/             Route and misc helpers
```

## Requirements

- Node.js 20+
- npm
- Expo Go or an Android emulator/device

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file in the project root with these variables:

```bash
EXPO_PUBLIC_WEB_BASE_URL=https://summa-navigator.urlyss.dev
EXPO_PUBLIC_API_KEY=your_api_key
EXPO_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
EXPO_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key
EXPO_PUBLIC_ALGOLIA_INDEX_NAME=summa
```

3. Start Expo:

```bash
npm run start
```

4. Open the app in Expo Go, an emulator, or on the web:

```bash
npm run android
```

## Available Scripts

- `npm run start` starts the Expo dev server
- `npm run android` runs the app on Android
- `npm run ios` runs the app on iOS
- `npm run web` starts the web build
- `npm run lint` runs Expo lint

## Environment Variables

The app currently performs its content requests on the client.

- `EXPO_PUBLIC_WEB_BASE_URL`
  Base URL for the Summa Navigator backend
- `EXPO_PUBLIC_API_KEY`
  API key sent in the `x-api-key` header for content requests
- `EXPO_PUBLIC_ALGOLIA_APP_ID`
  Algolia application ID
- `EXPO_PUBLIC_ALGOLIA_SEARCH_KEY`
  Algolia search-only key
- `EXPO_PUBLIC_ALGOLIA_INDEX_NAME`
  Algolia index name used by the app

## Main Features

### Home

- Load the top-level parts of the *Summa*
- Resume the last article the user opened
- Quick access to saved bookmarks

### Search

- Query the Algolia index from a dedicated search screen
- Save searches only when the user explicitly launches a search
- Open results directly in the reader

### Library

- Persist bookmarks locally
- Keep only the latest article in recents

### Reader

- Render parts, treatises, questions, and articles with dedicated components
- Bookmark the current item
- Open a chatbot drawer from the article reader

### Chatbot

- Contextual to the current article
- Includes suggestions, modes, retry/copy controls, and reasoning display
- Current implementation is UI-first and article-context aware

## Architecture Notes

- Routing lives in `app/` and uses Expo Router conventions
- Visual design tokens live in `src/styles/theme.ts`
- API requests are handled in `src/lib/api/`
- Local persistence is handled through AsyncStorage-backed helpers in `src/lib/storage/`
- UI redesign work is isolated to presentation components and style tokens as much as possible

## Verification

Type-check the project with:

```bash
cmd /c npx tsc --noEmit
```

If PowerShell blocks `npx.ps1`, run the command above through `cmd` as shown.

## Status

This project is currently a prototype-quality mobile app focused on core reading, search, library, and initial AI/chat UX. Authentication, account sync, and advanced AI flows are not finalized yet.
