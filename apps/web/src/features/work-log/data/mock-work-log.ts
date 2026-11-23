export interface WorkLogEntry {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  overtimeHours: number;
  note?: string;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_004 API khi backend sẵn sàng.
export const mockWorkLog: WorkLogEntry[] = [
  { id: "wl-1", date: "22/11/2026", checkIn: "08:00", checkOut: "17:30", hours: 8, overtimeHours: 1.5 },
  { id: "wl-2", date: "21/11/2026", checkIn: "08:00", checkOut: "17:00", hours: 8, overtimeHours: 0 },
  {
    id: "wl-3",
    date: "20/11/2026",
    checkIn: "08:00",
    checkOut: "20:00",
    hours: 8,
    overtimeHours: 3,
    note: "Làm thêm ca đêm theo yêu cầu quản lý",
  },
  { id: "wl-4", date: "19/11/2026", checkIn: "08:00", checkOut: "17:00", hours: 8, overtimeHours: 0 },
];
