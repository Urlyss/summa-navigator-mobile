export type ThemeMode = "light" | "dark";

export type AppThemeColors = {
  ink: string;
  inkSoft: string;
  inkFaint: string;
  parchment: string;
  parchmentDeep: string;
  parchmentMuted: string;
  parchmentGlass: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  teal: string;
  gold: string;
  border: string;
  borderSoft: string;
  card: string;
  cardElevated: string;
  cardMuted: string;
  error: string;
  success: string;
  pageGradient: [string, string, string];
  heroGradient: [string, string, string];
  rowSurface: string;
  rowBadge: string;
  rowBadgeText: string;
  secondarySurface: string;
  secondaryBorder: string;
  tabBarBackground: string;
  tabBarInactive: string;
  shadow: string;
  overlay: string;
  sheetSurface: string;
  sheetHandle: string;
  statusBar: "light" | "dark";
};

export const lightTheme: AppThemeColors = {
  ink: "#172023",
  inkSoft: "#59656A",
  inkFaint: "#7E8B91",
  parchment: "#F4F0E8",
  parchmentDeep: "#E4D8C8",
  parchmentMuted: "#FAF6EF",
  parchmentGlass: "rgba(255,250,244,0.78)",
  accent: "#745643",
  accentStrong: "#25343A",
  accentSoft: "#D9C4AA",
  teal: "#365C62",
  gold: "#B88B54",
  border: "#D6CDC1",
  borderSoft: "#E7E0D5",
  card: "#FFFDFC",
  cardElevated: "#FFFCF8",
  cardMuted: "#F7F1E8",
  error: "#A3392E",
  success: "#2E6A4C",
  pageGradient: ["#FBF8F2", "#F3EDE3", "#E7DED1"],
  heroGradient: ["#1F2E35", "#4A5D61", "#C6A06A"],
  rowSurface: "#FFFDFC",
  rowBadge: "#F2E7D7",
  rowBadgeText: "#6D5640",
  secondarySurface: "#F8F1E7",
  secondaryBorder: "#C9B092",
  tabBarBackground: "#FFF9F2",
  tabBarInactive: "#8D7F72",
  shadow: "rgba(39, 30, 24, 0.10)",
  overlay: "rgba(15, 19, 21, 0.36)",
  sheetSurface: "#FFF9F3",
  sheetHandle: "#CCBBA8",
  statusBar: "dark",
};

export const darkTheme: AppThemeColors = {
  ink: "#F6F1E9",
  inkSoft: "#B8C2C4",
  inkFaint: "#8D999D",
  parchment: "#101719",
  parchmentDeep: "#172125",
  parchmentMuted: "#111A1E",
  parchmentGlass: "rgba(20,28,31,0.80)",
  accent: "#D3B08A",
  accentStrong: "#E9D0A4",
  accentSoft: "#4C4033",
  teal: "#6F9CA1",
  gold: "#D5A86B",
  border: "#2E3B40",
  borderSoft: "#233036",
  card: "#182125",
  cardElevated: "#1D282D",
  cardMuted: "#141D21",
  error: "#F19180",
  success: "#7FD1A5",
  pageGradient: ["#0F171B", "#111A1E", "#172428"],
  heroGradient: ["#293A3F", "#4B6570", "#B9874B"],
  rowSurface: "#182125",
  rowBadge: "#263238",
  rowBadgeText: "#E9D0A4",
  secondarySurface: "#1E2A2F",
  secondaryBorder: "#38515C",
  tabBarBackground: "#121B1F",
  tabBarInactive: "#829095",
  shadow: "rgba(0, 0, 0, 0.32)",
  overlay: "rgba(0, 0, 0, 0.62)",
  sheetSurface: "#152025",
  sheetHandle: "#53636A",
  statusBar: "light",
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};
