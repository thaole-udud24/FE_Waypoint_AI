# Waypoint — Web (FE)

React + TypeScript + Vite, Tailwind CSS v4, Zustand, React Router, React Hook Form + Zod, Recharts, Radix UI.

## Chạy dự án

```bash
pnpm install        # ở thư mục gốc monorepo
pnpm --filter waypoint-web dev       # dev server: http://localhost:5173
pnpm --filter waypoint-web build     # build production (tsc -b && vite build)
pnpm --filter waypoint-web lint      # oxlint
pnpm --filter waypoint-web test      # vitest
```

## Cấu trúc thư mục

```
src/
├── app/
│   ├── config/        # navigation.ts (menu + i18n nhãn), page-header-i18n.ts
│   ├── providers/      # ThemeProvider, QueryProvider
│   └── router/         # định nghĩa route theo 3 cổng (worker/admin/desk)
├── components/
│   ├── ui/              # nguyên tử: Button, Input, Card, Table, Modal, Tabs...
│   ├── domain/           # PageHeader, KanbanBoard, GanttTimeline, LawLabel, CommandPalette,
│   │                     # AgentDock, LockScreen, ReconcileWizardModal...
│   ├── fx/               # OrbitHero, HankoStamp (hiệu ứng trang trí Pastel Orbit)
│   └── brand/            # WaypointLogo (ENSŌ PATH, 5 biến thể màu)
├── features/<module>/     # mỗi module nghiệp vụ: pages/, components/, data/ (mock)
├── layouts/                # MainLayout (worker), AdminLayout, DeskLayout, AuthLayout
├── lib/                     # i18n.tsx (vi/en/ja), utils.ts (cn)
└── stores/                  # auth-store (vai trò, khóa nhanh), discreet-store (chế độ kín đáo)
```

## Quy ước

- **Mock-first**: mọi dữ liệu trong `features/**/data/*.ts` là dữ liệu mẫu, đánh dấu bằng comment `// shortcut: ...` kèm module API thật sẽ thay thế (vd `MOD_005`). Không gọi API thật ở đâu trong code hiện tại.
- **i18n**: chuỗi hiển thị dùng `Record<"vi" | "en" | "ja", string>` + hàm `pick()` từ `@/lib/i18n`, không viết cứng text đa ngôn ngữ rải rác.
- **Token màu/spacing**: lấy từ CSS variable (`var(--color-*)`, `var(--radius-*)`...) định nghĩa ở `src/index.css`, không hard-code mã màu trong component trừ khi cần màu minh họa nhất thời.
- **3 cổng theo vai trò**: `MainLayout` (người lao động), `AdminLayout` (quản trị, tím lavender), `DeskLayout` (cán bộ hỗ trợ, xanh bạc hà) — xem `src/app/router/index.tsx`.

## Tài liệu tham khảo

Đặc tả BRD/SRS và quy tắc giao diện nằm ở [`../../docs`](../../docs) (đọc trước khi thêm trang mới): `UI_CODE_RULES.md`, `UI_SCREEN_SPEC.md`, `05_SRS_FUNCTIONS.md`.
