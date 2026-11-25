# Waypoint AI

Nền tảng đồng hành cho người lao động Việt Nam làm việc tại Nhật Bản: đối chiếu lương, hồ sơ, bằng chứng và tra cứu luật — hỗ trợ bởi trợ lý AI gồm 6 agent chuyên trách.

Đây là bản **FE mockup** (dữ liệu mẫu, chưa nối backend thật) theo đặc tả trong [`docs/`](./docs).

## Cấu trúc monorepo (pnpm workspace)

```
waypoint/
├── apps/
│   └── web/              # Ứng dụng web (React + Vite + TypeScript)
├── packages/
│   └── design-tokens/    # Design token dùng chung (màu, spacing, typography...) cho web & mobile
└── docs/                 # Đặc tả BRD/SRS, quy tắc & màn hình giao diện (UI_CODE_RULES.md, UI_SCREEN_SPEC.md...)
```

## Bắt đầu

Yêu cầu: Node ≥ 20, [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev:web      # chạy FE web tại http://localhost:5173
pnpm build:web    # build production
pnpm lint:web     # oxlint
pnpm test:web     # vitest
```

## Cổng ứng dụng (3 vai trò)

| Vai trò | Vào bằng email | Cổng |
|---|---|---|
| Người lao động (WRK) | bất kỳ, không bắt đầu bằng `admin`/`desk` | `/home` |
| Cán bộ hỗ trợ (SUP) | bắt đầu bằng `desk` | `/desk` |
| Quản trị viên (ADM) | bắt đầu bằng `admin` | `/admin` |

Đăng nhập là **mock** (chưa có backend auth thật) — mật khẩu chỉ cần ≥ 6 ký tự.

## Giao diện

- Phong cách **Pastel Orbit** — xem chi tiết tại [`docs/UI_CODE_RULES.md`](./docs/UI_CODE_RULES.md) và [`docs/UI_SCREEN_SPEC.md`](./docs/UI_SCREEN_SPEC.md).
- Hỗ trợ 3 ngôn ngữ: Tiếng Việt / English / 日本語 (chọn ở header).
- Chế độ sáng/tối và chế độ kín đáo (ẩn thương hiệu khi dùng ở nơi không an toàn).

## Trạng thái

Toàn bộ dữ liệu trong `apps/web/src/features/**/data/*.ts` là **dữ liệu mẫu** (đánh dấu `shortcut:` trong code), chưa nối API thật — xem [`apps/web/README.md`](./apps/web/README.md) để biết chi tiết kỹ thuật của riêng FE web.

## Đóng góp

Quy ước đặt tên nhánh và commit (feat/fix/chore...) xem tại [`CONTRIBUTING.md`](./CONTRIBUTING.md).
