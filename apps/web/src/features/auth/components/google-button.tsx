import { Button } from "@/components/ui/button";
import { appToast } from "@/components/ui/toast";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.48a5.54 5.54 0 0 1-2.4 3.64v2.99h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.96-2.91l-3.88-2.99c-1.08.72-2.46 1.15-4.08 1.15-3.13 0-5.78-2.12-6.73-4.96H1.26v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.62l4.01 3.09C6.22 6.87 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        // shortcut: no OAuth backend yet. Wire to real Google OAuth flow when available.
        appToast.info("Đăng nhập Google sẽ khả dụng khi có backend OAuth.");
      }}
    >
      <GoogleIcon />
      {label}
    </Button>
  );
}
