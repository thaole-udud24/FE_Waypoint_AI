import { create } from "zustand";
import { persist } from "zustand/middleware";

// FUN_010 / BR_037: đồng ý tách riêng theo từng mục đích, mặc định tắt, rút
// được bất cứ lúc nào. Khớp enum purpose_code ở ENT_004 (CONSENT).
export type ConsentPurpose = "CASE_SHARE" | "EXTERNAL_LLM" | "ANON_CONTRIBUTION" | "SYNC";

interface ConsentRecord {
  granted: boolean;
  grantedAt?: string;
  withdrawnAt?: string;
}

interface ConsentState {
  consents: Record<ConsentPurpose, ConsentRecord>;
  setConsent: (purpose: ConsentPurpose, granted: boolean) => void;
}

const initial: Record<ConsentPurpose, ConsentRecord> = {
  CASE_SHARE: { granted: false },
  EXTERNAL_LLM: { granted: false },
  ANON_CONTRIBUTION: { granted: false },
  SYNC: { granted: false },
};

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      consents: initial,
      setConsent: (purpose, granted) =>
        set((state) => ({
          consents: {
            ...state.consents,
            [purpose]: {
              granted,
              grantedAt: granted ? new Date().toISOString() : state.consents[purpose].grantedAt,
              withdrawnAt: !granted ? new Date().toISOString() : state.consents[purpose].withdrawnAt,
            },
          },
        })),
    }),
    { name: "waypoint-consent" }
  )
);
