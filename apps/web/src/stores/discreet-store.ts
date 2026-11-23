import { create } from "zustand";
import { persist } from "zustand/middleware";

// Chế độ kín đáo (BR_033): khi bật, đổi tên/logo/tiêu đề tab/nội dung thông
// báo sang trung tính để dùng an toàn ở nơi không đáng tin cậy.
interface DiscreetState {
  discreet: boolean;
  toggle: (value: boolean) => void;
}

export const useDiscreetStore = create<DiscreetState>()(
  persist((set) => ({ discreet: false, toggle: (value) => set({ discreet: value }) }), { name: "waypoint-discreet" })
);
