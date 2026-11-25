import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ThemeProvider, useTheme } from "@/app/providers/theme-provider";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { HankoStamp } from "@/components/fx/hanko-stamp";
import { LawLabel } from "@/components/domain/law-label";
import { SalaryTrendChart } from "@/features/home/components/salary-trend-chart";

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>toggle</button>
    </div>
  );
}

function LangSwitcher() {
  const { setLang } = useLanguage();
  return (
    <div>
      <button onClick={() => setLang("en")}>en</button>
      <button onClick={() => setLang("ja")}>ja</button>
    </div>
  );
}

describe("UI Theme, i18n & Chart Table", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      writable: true,
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
        removeItem: (k: string) => void store.delete(k),
        clear: () => store.clear(),
      },
    });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("dark"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it("defaults ThemeProvider to system and resolves dark when OS prefers dark, toggling to light on first click", () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("renders HankoStamp and LawLabel in the selected language", () => {
    render(
      <LanguageProvider>
        <LangSwitcher />
        <HankoStamp label={{ vi: "Cần xác nhận", en: "Needs review", ja: "要確認" }} />
        <LawLabel value="ask_again" />
      </LanguageProvider>
    );

    expect(screen.getByText("Cần xác nhận")).toBeInTheDocument();
    expect(screen.getByText("Nên hỏi lại")).toBeInTheDocument();

    fireEvent.click(screen.getByText("en"));
    expect(screen.getByText("Needs review")).toBeInTheDocument();
    expect(screen.getByText("Worth asking")).toBeInTheDocument();

    fireEvent.click(screen.getByText("ja"));
    expect(screen.getAllByText("要確認")).toHaveLength(2);
  });

  it("toggles SalaryTrendChart to table view", () => {
    render(
      <LanguageProvider>
        <SalaryTrendChart />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("Xem dạng bảng"));
    expect(screen.getByText("¥214,600")).toBeInTheDocument();
  });
});
