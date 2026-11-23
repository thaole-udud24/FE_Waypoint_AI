import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(root, "..", "tokens");
const outWeb = join(root, "..", "generated", "web");
const outFlutter = join(root, "..", "generated", "flutter");

const load = (name) => JSON.parse(readFileSync(join(tokensDir, `${name}.json`), "utf-8"));

const colors = load("colors");
const spacing = load("spacing");
const radius = load("radius");
const shadows = load("shadows");
const typography = load("typography");
const motion = load("motion");

mkdirSync(outWeb, { recursive: true });
mkdirSync(outFlutter, { recursive: true });

// ---- Web: CSS variables (light + dark) ----
const cssLines = [
  ":root {",
  `  --color-primary: ${colors.brand.primary};`,
  `  --color-primary-dark: ${colors.brand.primaryDark};`,
  `  --color-primary-light: ${colors.brand.primaryLight};`,
  `  --color-secondary: ${colors.brand.secondary};`,
  `  --color-background: ${colors.surface.background};`,
  `  --color-surface: ${colors.surface.surface};`,
  `  --color-surface-tint: ${colors.surface.surfaceTint};`,
  `  --color-surface-secondary: ${colors.surface.surfaceSecondary};`,
  `  --color-text-primary: ${colors.text.primary};`,
  `  --color-text-secondary: ${colors.text.secondary};`,
  `  --color-text-disabled: ${colors.text.disabled};`,
  `  --color-border: ${colors.border.default};`,
  `  --color-success: ${colors.semantic.success};`,
  `  --color-warning: ${colors.semantic.warning};`,
  `  --color-error: ${colors.semantic.error};`,
  `  --color-info: ${colors.semantic.info};`,
  `  --color-attention: ${colors.accent.attention};`,
  `  --color-attention-light: ${colors.accent.attentionLight};`,
  `  --color-attention-text: ${colors.accent.attentionText};`,
  `  --color-teal: ${colors.accent.teal};`,
  `  --color-teal-light: ${colors.accent.tealLight};`,
  `  --color-gold: ${colors.accent.gold};`,
  `  --color-gold-light: ${colors.accent.goldLight};`,
  `  --color-chart-1: ${colors.chart.series1};`,
  `  --color-chart-2: ${colors.chart.series2};`,
  `  --color-chart-3: ${colors.chart.series3};`,
  ...Object.entries(spacing).map(([k, v]) => `  --spacing-${k}: ${v};`),
  ...Object.entries(radius).map(([k, v]) => `  --radius-${k}: ${v};`),
  ...Object.entries(shadows).map(([k, v]) => `  --shadow-${k}: ${v};`),
  ...Object.entries(typography.fontSize).map(([k, v]) => `  --font-size-${k}: ${v};`),
  ...Object.entries(typography.fontWeight).map(([k, v]) => `  --font-weight-${k}: ${v};`),
  ...Object.entries(typography.lineHeight).map(([k, v]) => `  --line-height-${k}: ${v};`),
  ...Object.entries(typography.letterSpacing).map(([k, v]) => `  --letter-spacing-${k}: ${v};`),
  `  --font-sans: ${typography.fontFamily.sans};`,
  `  --font-numeric: ${typography.fontFamily.numeric};`,
  ...Object.entries(motion).map(([k, v]) => `  --motion-${k}: ${v};`),
  "}",
  "",
  '[data-theme="dark"] {',
  `  --color-primary: ${colors.dark.primary};`,
  `  --color-primary-dark: ${colors.dark.primaryDark};`,
  `  --color-primary-light: ${colors.dark.primaryLight};`,
  `  --color-background: ${colors.dark.background};`,
  `  --color-surface: ${colors.dark.surface};`,
  `  --color-surface-tint: ${colors.dark.surfaceTint};`,
  `  --color-surface-secondary: ${colors.dark.surfaceSecondary};`,
  `  --color-text-primary: ${colors.dark.textPrimary};`,
  `  --color-text-secondary: ${colors.dark.textSecondary};`,
  `  --color-text-disabled: ${colors.dark.textDisabled};`,
  `  --color-border: ${colors.dark.border};`,
  `  --color-attention: ${colors.dark.attention};`,
  `  --color-attention-light: ${colors.dark.attentionLight};`,
  `  --color-attention-text: ${colors.dark.attentionText};`,
  `  --color-teal: ${colors.dark.teal};`,
  `  --color-teal-light: ${colors.dark.tealLight};`,
  `  --color-gold: ${colors.dark.gold};`,
  `  --color-gold-light: ${colors.dark.goldLight};`,
  `  --color-chart-1: ${colors.dark.chartSeries1};`,
  `  --color-chart-2: ${colors.dark.chartSeries2};`,
  `  --color-chart-3: ${colors.dark.chartSeries3};`,
  "}",
  "",
];
writeFileSync(join(outWeb, "tokens.css"), cssLines.join("\n"));

// ---- Flutter: Dart constants ----
const dartColor = (hex) => `Color(0xFF${hex.replace("#", "").toUpperCase()})`;
const dartLines = [
  "// GENERATED FILE - do not edit by hand. Run packages/design-tokens/scripts/generate.mjs",
  "import 'package:flutter/material.dart';",
  "",
  "class AppColors {",
  `  static const primary = ${dartColor(colors.brand.primary)};`,
  `  static const primaryDark = ${dartColor(colors.brand.primaryDark)};`,
  `  static const primaryLight = ${dartColor(colors.brand.primaryLight)};`,
  `  static const secondary = ${dartColor(colors.brand.secondary)};`,
  `  static const background = ${dartColor(colors.surface.background)};`,
  `  static const surface = ${dartColor(colors.surface.surface)};`,
  `  static const surfaceSecondary = ${dartColor(colors.surface.surfaceSecondary)};`,
  `  static const textPrimary = ${dartColor(colors.text.primary)};`,
  `  static const textSecondary = ${dartColor(colors.text.secondary)};`,
  `  static const textDisabled = ${dartColor(colors.text.disabled)};`,
  `  static const border = ${dartColor(colors.border.default)};`,
  `  static const success = ${dartColor(colors.semantic.success)};`,
  `  static const warning = ${dartColor(colors.semantic.warning)};`,
  `  static const error = ${dartColor(colors.semantic.error)};`,
  `  static const info = ${dartColor(colors.semantic.info)};`,
  "",
  `  static const darkBackground = ${dartColor(colors.dark.background)};`,
  `  static const darkSurface = ${dartColor(colors.dark.surface)};`,
  `  static const darkSurfaceSecondary = ${dartColor(colors.dark.surfaceSecondary)};`,
  `  static const darkTextPrimary = ${dartColor(colors.dark.textPrimary)};`,
  `  static const darkTextSecondary = ${dartColor(colors.dark.textSecondary)};`,
  `  static const darkBorder = ${dartColor(colors.dark.border)};`,
  `  static const darkPrimary = ${dartColor(colors.dark.primary)};`,
  "}",
  "",
  "class AppSpacing {",
  ...Object.entries(spacing).map(([k, v]) => `  static const double s${k} = ${parseFloat(v)};`),
  "}",
  "",
  "class AppRadius {",
  ...Object.entries(radius).map(([k, v]) =>
    `  static const double ${k} = ${v === "9999px" ? "9999.0" : parseFloat(v)};`
  ),
  "}",
];
writeFileSync(join(outFlutter, "app_theme_tokens.dart"), dartLines.join("\n") + "\n");

console.log("Design tokens generated: web (CSS vars) + flutter (Dart constants)");
