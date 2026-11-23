export type OrgStatus = "active" | "suspended";

export interface Organization {
  id: string;
  name: string;
  type: string;
  country: string;
  receivesCasePack: boolean;
  status: OrgStatus;
  staffCount: number;
}

// shortcut: dữ liệu mẫu, thay bằng gọi API tổ chức (FUN_125/126) khi backend sẵn sàng.
export const mockOrganizations: Organization[] = [
  { id: "o1", name: "Nghiệp đoàn hỗ trợ ABC", type: "Nghiệp đoàn", country: "Nhật Bản", receivesCasePack: true, status: "active", staffCount: 6 },
  { id: "o2", name: "Văn phòng luật sư Sakura", type: "Luật sư", country: "Nhật Bản", receivesCasePack: true, status: "active", staffCount: 3 },
  { id: "o3", name: "Trung tâm hỗ trợ XKLD Hà Nội", type: "NGO", country: "Việt Nam", receivesCasePack: false, status: "suspended", staffCount: 2 },
];
