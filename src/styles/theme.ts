export type ThemeMode = "light" | "dark";

export type AppThemeColors = {
  ink: string;
  inkSoft: string;
  parchment: string;
  parchmentDeep: string;
  parchmentMuted: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  teal: string;
  border: string;
  card: string;
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
  overlay: string;
  sheetSurface: string;
  sheetHandle: string;
  statusBar: "light" | "dark";
};

export const lightTheme: AppThemeColors = {
  ink: "#1E1B16",
  inkSoft: "#544A3D",
  parchment: "#F6F0E1",
  parchmentDeep: "#E8D8B6",
  parchmentMuted: "#F9F4EA",
  accent: "#8A5A24",
  accentStrong: "#6E4318",
  accentSoft: "#D9B27C",
  teal: "#2E6761",
  border: "#D2C2A0",
  card: "#FFFDF8",
  error: "#A3392E",
  success: "#2E6A4C",
  pageGradient: ["#F9F4EA", "#F6F0E1", "#F3E5C7"],
  heroGradient: ["#FFF8E8", "#ECD8B6", "#D3B289"],
  rowSurface: "#FFF9EF",
  rowBadge: "#F0E0C5",
  rowBadgeText: "#6E4318",
  secondarySurface: "#FFF7E8",
  secondaryBorder: "#B78A53",
  tabBarBackground: "#FFF7EA",
  tabBarInactive: "#826E57",
  overlay: "rgba(20, 15, 10, 0.42)",
  sheetSurface: "#FFF8EE",
  sheetHandle: "#D7C5A8",
  statusBar: "dark",
};

export const darkTheme: AppThemeColors = {
  ink: "#F6EFE2",
  inkSoft: "#D6C8B5",
  parchment: "#15110D",
  parchmentDeep: "#231A13",
  parchmentMuted: "#1B1510",
  accent: "#E2B576",
  accentStrong: "#F0C98F",
  accentSoft: "#5B3E22",
  teal: "#7FD1C3",
  border: "#4A3A2C",
  card: "#221912",
  error: "#F19180",
  success: "#7FD1A5",
  pageGradient: ["#16110D", "#1B1510", "#241B13"],
  heroGradient: ["#332316", "#583D25", "#7A5531"],
  rowSurface: "#2A1E16",
  rowBadge: "#3C2A1C",
  rowBadgeText: "#F0C98F",
  secondarySurface: "#2C2118",
  secondaryBorder: "#7A5531",
  tabBarBackground: "#1E1712",
  tabBarInactive: "#BBAA95",
  overlay: "rgba(0, 0, 0, 0.58)",
  sheetSurface: "#251B14",
  sheetHandle: "#6B5540",
  statusBar: "light",
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};
