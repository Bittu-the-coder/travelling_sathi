// Color.ts

export const Colors = {
  // Primary Colors
  primary: "#007AFF",
  primaryDark: "#005BBB",
  primaryLight: "#4DA8FF",

  // Secondary Colors
  secondary: "#5856D6",
  secondaryDark: "#3F3DAA",
  secondaryLight: "#8B89F5",

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  grayLight: "#C7C7CC",
  grayDark: "#636366",

  // Status Colors
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#5AC8FA",

  // Background Colors
  background: "#F2F2F7",
  backgroundDark: "#1C2526",
  backgroundLight: "#FAFAFA",

  // Text Colors
  textPrimary: "#1C2526",
  textSecondary: "#636366",
  textDisabled: "#AEAEB2",

  // Transparent Variations
  transparent: "transparent",
  semiTransparent: "rgba(0, 0, 0, 0.5)",

  // Gradients (can be used with libraries like react-native-linear-gradient)
  gradient: {
    primaryStart: "#007AFF",
    primaryEnd: "#4DA8FF",
    darkStart: "#1C2526",
    darkEnd: "#636366",
    textGradient:
      "linear-gradient(to right,rgb(184, 15, 240),rgb(108, 8, 249))",
  },
} as const;

// Type for TypeScript autocompletion
export type ColorType = typeof Colors;
export type ColorKey = keyof ColorType;
