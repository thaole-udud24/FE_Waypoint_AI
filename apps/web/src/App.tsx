import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { QueryProvider } from "@/app/providers/query-provider";
import { LanguageProvider } from "@/lib/i18n";
import { router } from "@/app/router";
import { Toaster } from "@/components/ui/toast";
import { AuroraBackground } from "@/components/aurora-background";
import { LockScreen } from "@/components/domain/lock-screen";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscreetStore } from "@/stores/discreet-store";

function App() {
  const locked = useAuthStore((s) => s.locked);
  const discreet = useDiscreetStore((s) => s.discreet);

  useEffect(() => {
    document.title = discreet ? "Notes" : "Waypoint";
  }, [discreet]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryProvider>
          <AuroraBackground />
          <RouterProvider router={router} />
          <Toaster />
          {locked && <LockScreen />}
        </QueryProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
