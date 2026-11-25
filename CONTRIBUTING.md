# Quy ước làm việc (Git)

## Tên nhánh

```
<loại>/<mô-tả-ngắn-không-dấu>
```

| Loại | Dùng khi | Ví dụ |
|---|---|---|
| `feat/` | Thêm tính năng mới | `feat/case-pack-wizard` |
| `fix/` | Sửa lỗi | `fix/sidebar-icon-align` |
| `refactor/` | Đổi cấu trúc code, không đổi hành vi | `refactor/kanban-board-generic` |
| `docs/` | Chỉ sửa tài liệu (README, docs/) | `docs/update-readme` |
| `chore/` | Việc lặt vặt: cấu hình, dependency, dọn dẹp | `chore/bump-vite` |
| `style/` | Chỉ đổi giao diện/CSS, không đổi logic | `style/pastel-orbit-tokens` |
| `test/` | Thêm/sửa test | `test/kanban-board` |

Luôn tạo nhánh từ `main` mới nhất, không commit thẳng vào `main`.

## Commit message (Conventional Commits)

```
<loại>(<phạm vi tùy chọn>): <mô tả ngắn, thì hiện tại>
```

- `feat(case-pack): thêm wizard 3 bước và bước xem trước bắt buộc`
- `fix(sidebar): sửa icon lệch tâm do bị kéo giãn full-width`
- `refactor(kanban-board): tách label i18n ra khỏi dữ liệu cột`
- `docs: viết lại README gốc và README web`
- `chore: cập nhật oxlint lên 1.90`

Quy tắc:
- Loại commit trùng với tiền tố tên nhánh đang làm.
- Mô tả bằng tiếng Việt, không dấu chấm cuối câu, dưới ~72 ký tự dòng đầu.
- Nếu cần giải thích thêm, xuống dòng trống rồi viết đoạn thân (why, không phải what).
- 1 commit = 1 thay đổi trọn vẹn, có thể revert độc lập.

## Luồng Pull Request

1. Tạo nhánh theo quy ước trên từ `main`.
2. Push nhánh, mở PR vào `main`, tiêu đề PR = commit message gộp (vd `feat(case-pack): wizard 3 bước`).
3. PR phải qua `pnpm lint:web`, `pnpm build:web`, `pnpm test:web` trước khi merge.
4. Merge bằng **Squash and merge** để lịch sử `main` gọn, mỗi PR = 1 commit.
5. Xoá nhánh sau khi merge.

## Việc không được làm

- Không `git push --force` lên `main`.
- Không commit `node_modules/`, `dist/`, `.env`, file trong `apps/web/.local` (đã có trong `.gitignore`).
- Không amend/rebase commit đã push lên nhánh người khác đang dùng chung.
