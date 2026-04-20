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
  ink: "#1A1D1E",
  inkSoft: "#4A5559",
  inkFaint: "#869094",
  parchment: "#FFFFFF",
  parchmentDeep: "#F5F7F8",
  parchmentMuted: "#FAFBFC",
  parchmentGlass: "rgba(255,255,255,0.85)",
  accent: "#8B6E4E",
  accentStrong: "#2C3E50",
  accentSoft: "#E5E8EB",
  teal: "#2A5C66",
  gold: "#C5A059",
  border: "#E2E8F0",
  borderSoft: "#F1F5F9",
  card: "#FFFFFF",
  cardElevated: "#FFFFFF",
  cardMuted: "#F8FAFC",
  error: "#E53E3E",
  success: "#38A169",
  pageGradient: ["#FFFFFF", "#F8FAFC", "#F1F5F9"],
  heroGradient: ["#1A202C", "#2D3748", "#4A5568"],
  rowSurface: "#FFFFFF",
  rowBadge: "#EDF2F7",
  rowBadgeText: "#4A5568",
  secondarySurface: "#F7FAFC",
  secondaryBorder: "#E2E8F0",
  tabBarBackground: "#FFFFFF",
  tabBarInactive: "#A0AEC0",
  shadow: "rgba(0, 0, 0, 0.05)",
  overlay: "rgba(0, 0, 0, 0.45)",
  sheetSurface: "#FFFFFF",
  sheetHandle: "#CBD5E0",
  statusBar: "dark",
};

export const darkTheme: AppThemeColors = {
  ink: "#F7FAFC",
  inkSoft: "#A0AEC0",
  inkFaint: "#718096",
  parchment: "#0F172A",
  parchmentDeep: "#1E293B",
  parchmentMuted: "#111827",
  parchmentGlass: "rgba(15, 23, 42, 0.85)",
  accent: "#D4AF37",
  accentStrong: "#F8FAFC",
  accentSoft: "#334155",
  teal: "#4FD1C5",
  gold: "#ECC94B",
  border: "#334155",
  borderSoft: "#1E293B",
  card: "#1E293B",
  cardElevated: "#1E293B",
  cardMuted: "#0F172A",
  error: "#FC8181",
  success: "#68D391",
  pageGradient: ["#0F172A", "#111827", "#1E293B"],
  heroGradient: ["#1A202C", "#2D3748", "#4A5568"],
  rowSurface: "#1E293B",
  rowBadge: "#334155",
  rowBadgeText: "#E2E8F0",
  secondarySurface: "#111827",
  secondaryBorder: "#334155",
  tabBarBackground: "#0F172A",
  tabBarInactive: "#718096",
  shadow: "rgba(0, 0, 0, 0.3)",
  overlay: "rgba(0, 0, 0, 0.75)",
  sheetSurface: "#1E293B",
  sheetHandle: "#475569",
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
