export enum UserRole {
  WORKER = 'ROLE_WRK',
  SUPPORTER = 'ROLE_SUP',
  ADMIN = 'ROLE_ADM',
}

export enum AccessMode {
  GUEST = 'ACC_GUEST',
  FAMLINK = 'ACC_FAMLINK',
}

/** BR_009: Hệ thống không kết luận vi phạm; chỉ có 3 nhãn luật */
export enum LegalLabel {
  COMPLIANT = 'Phù hợp',
  NEEDS_CLARIFICATION = 'Nên hỏi lại',
  NO_RULE = 'Chưa có quy tắc',
}

/** BR_008: Ba trạng thái của một dòng đối chiếu */
export enum MatchStatus {
  MATCH = 'Khớp',
  MISMATCH = 'Lệch',
  INSUFFICIENT = 'Chưa đủ',
}

/** BR_006 / BR_048: Giới hạn tự chủ của AI Agent (mức 0–2) */
export enum AgentAutonomyLevel {
  READ_ONLY = 0,
  DRAFT_ONLY = 1,
  SUGGEST_WITH_APPROVAL = 2,
}
