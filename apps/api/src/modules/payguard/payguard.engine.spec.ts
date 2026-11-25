import { describe, expect, it } from 'vitest';
import { LegalLabel, MatchStatus } from '@waypoint/shared';
import { calculatePayGuard } from './payguard.engine';

describe('PayGuard Deterministic Engine (BR_007, BR_008, BR_009)', () => {
  it('returns MATCH and COMPLIANT when actualGross is within rounding tolerance', () => {
    const result = calculatePayGuard({
      baseSalary: 180000,
      hourlyRate: 1100,
      overtimeHours: 10,
      nightHours: 0,
      holidayHours: 0,
      actualGross: 193750, // 180000 + 10 * 1100 * 1.25 = 193750
    });

    expect(result.expectedGross).toBe(193750);
    expect(result.difference).toBe(0);
    expect(result.matchStatus).toBe(MatchStatus.MATCH);
    expect(result.legalLabel).toBe(LegalLabel.COMPLIANT);
  });

  it('returns MISMATCH and NEEDS_CLARIFICATION when actualGross is underpaid beyond tolerance', () => {
    const result = calculatePayGuard({
      baseSalary: 180000,
      hourlyRate: 1100,
      overtimeHours: 20,
      nightHours: 4,
      holidayHours: 8,
      actualGross: 190000,
    });

    expect(result.expectedGross).toBe(180000 + 27500 + 1100 + 11880);
    expect(result.difference).toBeLessThan(-100);
    expect(result.matchStatus).toBe(MatchStatus.MISMATCH);
    expect(result.legalLabel).toBe(LegalLabel.NEEDS_CLARIFICATION);
  });
});
