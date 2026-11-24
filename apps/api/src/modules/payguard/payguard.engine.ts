import { LegalLabel, MatchStatus } from '@waypoint/shared';

export interface PayGuardInput {
  baseSalary: number;
  hourlyRate: number;
  overtimeHours: number;
  nightHours: number;
  holidayHours: number;
  actualGross: number;
  overtimeMultiplier?: number; // default 1.25 (JP Labor Standards Act Art. 37)
  nightMultiplier?: number;    // default 0.25 extra
  holidayMultiplier?: number;  // default 1.35
  roundingToleranceYen?: number; // BR_051
}

export interface PayGuardResult {
  expectedGross: number;
  actualGross: number;
  difference: number;
  matchStatus: MatchStatus;
  legalLabel: LegalLabel;
  breakdown: {
    baseSalary: number;
    overtimePay: number;
    nightPay: number;
    holidayPay: number;
  };
}

/**
 * BR_007: Deterministic PayGuard calculation engine (AI không tính tiền).
 * BR_008: Khớp / Lệch / Chưa đủ.
 * BR_009: Phù hợp / Nên hỏi lại / Chưa có quy tắc.
 */
export function calculatePayGuard(input: PayGuardInput): PayGuardResult {
  const otMult = input.overtimeMultiplier ?? 1.25;
  const nightMult = input.nightMultiplier ?? 0.25;
  const holidayMult = input.holidayMultiplier ?? 1.35;
  const tolerance = input.roundingToleranceYen ?? 100;

  const overtimePay = Math.round(input.overtimeHours * input.hourlyRate * otMult);
  const nightPay = Math.round(input.nightHours * input.hourlyRate * nightMult);
  const holidayPay = Math.round(input.holidayHours * input.hourlyRate * holidayMult);

  const expectedGross = input.baseSalary + overtimePay + nightPay + holidayPay;
  const difference = input.actualGross - expectedGross;

  const isMatch = Math.abs(difference) <= tolerance;
  const matchStatus = isMatch ? MatchStatus.MATCH : MatchStatus.MISMATCH;
  const legalLabel =
    difference < -tolerance ? LegalLabel.NEEDS_CLARIFICATION : LegalLabel.COMPLIANT;

  return {
    expectedGross,
    actualGross: input.actualGross,
    difference,
    matchStatus,
    legalLabel,
    breakdown: {
      baseSalary: input.baseSalary,
      overtimePay,
      nightPay,
      holidayPay,
    },
  };
}
