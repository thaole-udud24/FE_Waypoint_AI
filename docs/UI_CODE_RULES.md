# WAYPOINT – QUY TẮC CODE GIAO DIỆN WEB (UI CODE RULES)

Phong cách: **"Pastel Orbit – 軌道"** – giao diện sáng tông pastel xanh dương phối hồng và vàng bơ, chủ đề vũ trụ vui mắt: hành tinh, quỹ đạo, vệ tinh, ngôi sao bốn cánh. Pha chút Nhật Bản (khoảng trắng "ma", bố cục lệch có chủ ý, con dấu hanko, họa tiết sóng seigaiha, nhãn dọc kiểu tategaki) và bố cục "bento" phá cách (thẻ khác kích thước, lệch nhịp, chồng nhẹ lên nhau). Mục tiêu: nhìn 10 giây phải thấy ấn tượng, dễ thương, hiện đại nhưng vẫn đọc rõ số tiền và trạng thái pháp lý.

Nhãn: `[ĐỀ XUẤT]` là đề xuất thiết kế; `[BẮT BUỘC]` là ràng buộc từ đặc tả nghiệp vụ (BR_ trong `WAYPOINT_BRD_SRS`).

## Mục lục

1. Nguyên tắc thiết kế
2. Công nghệ và cấu trúc thư mục
3. Design tokens (màu, chữ, khoảng cách, bo góc, bóng, chuyển động)
4. Nền, quỹ đạo và hiệu ứng
5. Bố cục khung (App Shell)
6. Thư viện component
7. Biểu đồ và hiển thị dữ liệu
8. Quy tắc dữ liệu, tiền tệ, ngôn ngữ
9. Quy tắc nghiệp vụ bắt buộc ở giao diện
10. Trạng thái giao diện (loading, rỗng, lỗi)
11. Responsive
12. Khả năng tiếp cận (a11y)
13. Hiệu năng
14. Quy ước đặt tên và code style
15. Điều cấm
16. Danh mục kiểm tra trước khi merge

---

## 1. Nguyên tắc thiết kế `[ĐỀ XUẤT]`

1. **Một "hệ mặt trời" cho mỗi kỳ lương:** hình ảnh nhận diện là hành tinh trung tâm (kỳ lương/thực nhận) với bốn vệ tinh quay quanh quỹ đạo (Hợp đồng, Giờ làm, Phiếu lương, Tiền nhận). Màu vệ tinh cho biết Khớp/Lệch/Chưa đủ.
2. **Bento phá cách có kỷ luật:** thẻ nhiều cỡ, lệch nhịp, có thẻ nhô ra khỏi lưới hoặc cắt góc bằng hành tinh lớn; nhưng vẫn bám lưới 12 cột và thứ tự đọc từ trên xuống, trái sang phải.
3. **Ma (間) – chừa khoảng trống có chủ đích:** mỗi thẻ có khoảng thở 20–24 px; trang không nhồi chữ. Mật độ thông tin đến từ số lượng khối, không phải từ chữ nhỏ.
4. **Kết luận trước, chi tiết sau:** trạng thái Khớp/Lệch/Chưa đủ và số tiền chênh luôn ở khối lớn nhất; công thức và nguồn nằm trong drawer.
5. **Mỗi con số có nguồn:** số tiền do máy chủ tính; bấm vào xem công thức, trang tài liệu, điều luật, phiên bản Law Pack.
6. **Pastel nhưng đọc được:** nền pastel chỉ đi với chữ mực đậm (`--ink`). Màu bão hòa chỉ dùng cho nút, đường biểu đồ và điểm nhấn nhỏ.
7. **Một màu một nghĩa:** xanh dương = hành động chính và dữ liệu, hồng sakura = Lệch/cảnh báo, vàng bơ = Chưa đủ/Nên hỏi lại, xanh bạc hà = Khớp.
8. **Dễ thương nhưng không trẻ con:** linh vật chỉ xuất hiện ở trợ lý AI, trạng thái rỗng và chúc mừng; không xuất hiện trong khu vực số liệu pháp lý.
9. **Người lao động có thể ở nơi không an toàn:** mọi màn hình hỗ trợ chế độ kín đáo (nhãn trung tính) và khóa nhanh.

## 2. Công nghệ và cấu trúc thư mục `[ĐỀ XUẤT]`

| Hạng mục | Lựa chọn |
|---|---|
| Framework | Next.js (App Router) + TypeScript strict |
| Style | Tailwind CSS + CSS variables (tokens ở mục 3) |
| Component nền | Radix UI primitives (a11y sẵn) + class-variance-authority |
| Icon | Lucide (nét 1.75 px), bộ icon riêng cho Law Pack |
| Biểu đồ | Recharts hoặc visx; hiệu ứng nền bằng Canvas/SVG |
| Trạng thái | TanStack Query (dữ liệu máy chủ), Zustand (UI) |
| Form | React Hook Form + Zod (schema khớp Data Dictionary) |
| i18n | next-intl: `vi` (mặc định), `ja`, `en` |
| Kiểm thử | Vitest, Playwright, axe-core |

```
src/
  app/
    (auth)/dang-nhap, dang-ky, khoi-phuc, mo-khoa
    (worker)/trang-chu, tai-lieu, hop-dong, gio-lam, doi-chieu-luong,
             mo-phong, chi-phi, no-gia-dinh, kho-bang-chung, hoi-dap,
             ho-so-ho-tro, tro-ly-ai, tra-cuu-luat, thong-bao,
             goi-dich-vu, tai-khoan
    (desk)/desk              # ROLE_SUP
    (admin)/quan-tri         # ROLE_ADM
    (public)/nguoi-than/[token]   # ACC_FAMLINK
  components/
    ui/          # nguyên tử: Button, Input, Badge, Card, Tabs...
    shell/       # Sidebar, Topbar, CommandPalette, AgentDock
    domain/      # StatusPill, MoneyCell, SourceChip, LawLabel, EvidenceCard...
    charts/
    fx/          # CosmosBackground, OrbitTrack, Satellite, Planet, Sparkle, HankoStamp, Seigaiha, OrbitSweep
  features/<module>/   # api, hooks, schemas, components riêng module
  lib/  (money.ts, date.ts, i18n.ts, mask.ts, a11y.ts)
  styles/ (tokens.css, fx.css, globals.css)
```

---

## 3. Design tokens

### 3.1 Màu (CSS variables) `[ĐỀ XUẤT]`

```css
:root {
  /* Nền vũ trụ pastel (gradient phía sau tờ giấy ứng dụng) */
  --sky-100:#E6EEFF; --sky-200:#D3E1FF; --sky-300:#B9CCFF; --sky-400:#9DB4FF;
  --peri-300:#B7B8FF; --lav-200:#E4D9FF; --lav-300:#D2C2FF;
  --bg-cosmos: linear-gradient(160deg,#DCE8FF 0%,#C7D2FF 45%,#E3D3FF 100%);

  /* Tờ giấy ứng dụng và thẻ */
  --paper:      #FFFFFF;
  --paper-soft: #F7F8FF;
  --card-sky:   #E8F0FF;   /* thẻ xanh */
  --card-sakura:#FFE6F0;   /* thẻ hồng */
  --card-butter:#FFF4C9;   /* thẻ vàng bơ */
  --card-mint:  #DDF7EC;   /* thẻ bạc hà */
  --card-lav:   #EEE6FF;   /* thẻ tím nhạt */
  --card-peach: #FFE8D6;

  /* Mực (chữ và khối tối) */
  --ink:        #1B1740;   /* chữ chính, thanh điều hướng dọc */
  --ink-md:     #4A4678;   /* chữ phụ */
  --ink-lo:     #7C79A6;   /* nhãn, placeholder */
  --ink-dis:    #B3B1D1;
  --stroke:     rgba(27,23,64,.10);
  --stroke-orbit: rgba(124,140,255,.45);   /* quỹ đạo */

  /* Nhấn bão hòa (dùng ít) */
  --blue-500:#5B7CFF; --blue-600:#3F5FE6;
  --pink-500:#FF7FB0; --pink-400:#FF9DC4;
  --yellow-500:#FFC93C; --yellow-400:#FFDD72;

  /* Trạng thái nghiệp vụ (nền pastel + chữ mực + chấm bão hòa) */
  --ok-bg:#DDF7EC;   --ok-dot:#2FBF8A;
  --warn-bg:#FFF1BD; --warn-dot:#F2B100;
  --bad-bg:#FFE0EC;  --bad-dot:#F0457F;
  --info-bg:#E1EAFF; --info-dot:#5B7CFF;

  /* Gradient */
  --grad-planet: radial-gradient(circle at 30% 25%,#FFFFFF 0%,#BFD0FF 35%,#8FA6FF 70%,#B58CFF 100%);
  --grad-sun:    radial-gradient(circle at 35% 30%,#FFF6C9 0%,#FFD66B 55%,#FFB84D 100%);
  --grad-cta:    linear-gradient(135deg,#5B7CFF 0%,#8F7CFF 100%);
  --grad-alert:  linear-gradient(135deg,#FFE0EC 0%,#FFF1F6 60%,#FFF4C9 100%);

  /* Bóng mềm, không viền neon */
  --shadow-sheet:0 40px 80px rgba(70,70,160,.25);
  --shadow-card: 0 10px 30px rgba(91,124,255,.12);
  --shadow-float:0 14px 36px rgba(27,23,64,.18);
}
```

**Chế độ "Đêm vũ trụ" (tùy chọn, `[ĐỀ XUẤT]`):** nền `#14123A → #2A2468`, tờ giấy `#1E1A4F`, chữ `#F4F2FF`, giữ nguyên các màu pastel làm điểm nhấn với độ trong suốt 18–24%; quỹ đạo phát sáng nhẹ. Mặc định là chế độ sáng.

**Chủ đề theo vai trò:** ROLE_WRK = xanh dương + hồng (mặc định); ROLE_SUP = xanh bạc hà + xanh dương; ROLE_ADM = tím lavender + mực đậm.

### 3.2 Chữ

| Vai trò | Font | Cỡ / Đậm |
|---|---|---|
| Tiêu đề, số lớn | `Be Vietnam Pro` (hình học, đủ dấu tiếng Việt) | 28–64 px / 600–800 |
| Nội dung | `Be Vietnam Pro` | 14–16 px / 400–500 |
| Nhãn Nhật, điểm nhấn kanji | `Zen Maru Gothic` / `Noto Sans JP` | 12–20 px |
| Số liệu, mã (FLD, FUN, hash) | `JetBrains Mono` | 12–14 px |

- Số tiền: `font-variant-numeric: tabular-nums`; số lớn 40–64 px, đậm 700–800.
- Nhãn nhóm menu cỡ 11 px, giãn chữ 0.08em; không ép in hoa nội dung tiếng Việt.
- **Nhãn kanji nhỏ cạnh tiêu đề** (trang trí, không thay thế chữ Việt), ví dụ `照合` cạnh "Đối chiếu lương", `証拠` cạnh "Kho bằng chứng". Chỉ dùng cho tiêu đề trang và thẻ hero; luôn kèm `lang="ja"`.
- **Nhãn dọc (tategaki):** `writing-mode: vertical-rl` cho nhãn trang trí cạnh thẻ hero (tối đa 1 nhãn mỗi trang).
- `line-height ≥ 1.45` cho nội dung, `≥ 1.15` cho số lớn để không cắt dấu tiếng Việt.

### 3.3 Khoảng cách, bo góc, viền

- Thang 4 px: 4, 8, 12, 16, 20, 24, 32, 48, 64.
- Bo góc: **tờ giấy ứng dụng 40 px**, thẻ 28 px, thẻ nhỏ 20 px, nút/chip 999 px (viên thuốc), ô nhập 16 px, drawer 32 px.
- Khoảng cách trong lưới bento: 16 px (máy tính), 12 px (di động).
- Viền: 1 px `--stroke`; thẻ nổi bật không dùng viền mà dùng nền pastel + bóng mềm.
- Nền thẻ pastel xen kẽ (xanh, hồng, vàng, bạc hà, tím) theo ý nghĩa, không ngẫu nhiên: Lệch = hồng, Chưa đủ = vàng, Khớp = bạc hà, thông tin chung = xanh/tím.

### 3.4 Chuyển động

| Loại | Thời lượng | Easing |
|---|---|---|
| Hover, nhấn | 140 ms | ease-out; thẻ nâng 4 px |
| Mở drawer, modal | 280 ms | cubic-bezier(.2,.9,.25,1.1) (nảy nhẹ) |
| Đếm số (count-up) | 800 ms | ease-out, chỉ lần tải đầu |
| Vệ tinh quay quỹ đạo | 30–60 s/vòng | linear, liên tục |
| Sao lấp lánh | 3–5 s | ease-in-out |

Tôn trọng `prefers-reduced-motion`: tắt quỹ đạo quay, lấp lánh, count-up; giữ vị trí tĩnh.

---

## 4. Nền, quỹ đạo và hiệu ứng `[ĐỀ XUẤT]`

| Hiệu ứng | Mô tả | Quy tắc |
|---|---|---|
| `CosmosBackground` | Nền gradient `--bg-cosmos` + vài đường cong lớn mảnh màu `--stroke-orbit` (như nét lá/quỹ đạo vẽ tay) và vài vòng tròn mờ | `position:fixed`, `pointer-events:none`; không dùng ảnh lớn |
| `AppSheet` | Tờ giấy trắng bo 40 px nổi trên nền, có bóng đổ ellipse phía dưới | Chiếm toàn bộ màn hình trên di động (bỏ nền và bóng) |
| `OrbitTrack` | Elip nét mảnh `--stroke-orbit` làm đường quỹ đạo | Tối đa 3 quỹ đạo/khối; nghiêng 12–20° |
| `Satellite` | Chấm tròn 28–40 px có icon, chạy trên `OrbitTrack` | Dừng khi hover và hiện tooltip; có viền màu trạng thái |
| `Planet` | Quả cầu `--grad-planet` hoặc `--grad-sun` có vòng (ring) mảnh | Dùng làm điểm nhấn hero; có thể bị cắt góc thẻ |
| `Sparkle` | Ngôi sao bốn cánh ✦ pastel, 8–16 px | Rải rác, tối đa 8 cái/màn hình; lấp lánh chậm |
| `HankoStamp` | Con dấu tròn hồng-đỏ nhạt có chữ, xoay −6° | Dùng cho kết quả "Đã xác minh", "Đã đối chiếu", "Đã công bố"; tối đa 2 cái/trang |
| `Seigaiha` | Họa tiết sóng bán nguyệt, độ mờ 6% | Chỉ làm nền thẻ hero hoặc chân trang |
| `WashiTag` | Nhãn dính kiểu băng giấy nghiêng 2–4° | Dùng cho chip "Mới", "Law Pack" |
| `Sticker` | Huy hiệu tròn nghiêng −3° có viền trắng dày | Cho điểm số/trạng thái nổi bật (ví dụ "27/30") |
| `Grain` | Nhiễu giấy 2–3% | Tùy chọn, tắt khi hiệu năng yếu |
| `OrbitSweep` | Tia quét xoay quanh hành tinh khi OCR/đối chiếu đang chạy | Chỉ khi loading nghiệp vụ |

**Linh vật (Mochi-Nauta):** nhân vật gốc, một viên mochi tròn trắng đội mũ phi hành gia có ăng-ten, tay cầm bút. Chỉ làm minh họa của Trợ lý AI, trạng thái rỗng và chúc mừng. Không dùng hình các nhân vật có bản quyền; mọi minh họa phải là sản phẩm của đội hoặc có giấy phép.

Ghi chú: hiệu ứng không được che nội dung; nếu tụt dưới 50 fps thì tự hạ cấp (tắt quỹ đạo quay, sparkle, grain).

---

## 5. Bố cục khung (App Shell) `[ĐỀ XUẤT]`

```
 nền vũ trụ pastel (gradient + đường quỹ đạo)
 ┌──────────────────────────────────────────────────────────────────┐  ← AppSheet (bo 40 px)
 │ (logo)  Xin chào, {tên}  · 23/11 · 2 việc hôm nay   [Làm mới][Xuất][＋][⠿][avatar]
 │ ┌──┐                                                              │
 │ │██│  Tiêu đề trang (cỡ lớn)    chip lọc kiểu viên thuốc     [tìm kiếm ⌘K]
 │ │██│                                                              │
 │ │██│  ┌─ cột trái (bento) ─┐ ┌─ cột giữa ─┐ ┌─ cột phải: thẻ cao ─┐
 │ │██│  │ thẻ lớn            │ │ thẻ vừa    │ │ Trợ lý AI + mochi   │
 │ │██│  └────────────────────┘ └────────────┘ └─────────────────────┘
 │ └──┘  (thanh điều hướng dọc kiểu viên thuốc màu mực)
 └──────────────────────────────────────────────────────────────────┘
```

- **Thanh điều hướng dọc (Pill Rail):** viên thuốc dài màu `--ink`, bo hai đầu, các icon xếp dọc; mục đang chọn là **vòng tròn sáng** màu `--paper` với icon màu xanh, có "gờ nối" cong như mẩu chồi ra từ thanh. Rê chuột vào thanh thì **mở rộng thành bảng nhãn** (264 px) liệt kê 6 nhóm menu có tên và mũi tên đóng/mở. Cuối thanh: chuông thông báo (chấm hồng) và nút đăng xuất.
- **Phần đầu (Header):** logo hành tinh nhỏ + lời chào lớn + dòng phụ ("23 tháng 11 · 2 việc hôm nay"); bên phải: nút viên thuốc "Làm mới dữ liệu", "Xuất", nút tròn đen **＋** (hành động nhanh: Ghi giờ, Tải tài liệu, Tạo kỳ), nút lưới ứng dụng, avatar có vòng quỹ đạo màu cam-vàng.
- **Hàng tiêu đề trang:** tiêu đề cỡ 40–48 px bên trái; chip lọc kiểu viên thuốc (đổi theo trang) ở giữa; ô tìm kiếm `⌘K` bo tròn và nút bộ lọc ở bên phải.
- **Chip Law Pack** "VN → JP · v2026.10 · đã đồng bộ 02/11" nằm trong Header, màu bạc hà (mới nhất) hoặc vàng (chưa đồng bộ).
- **Agent Dock:** là cột phải bento (thẻ cao có linh vật), không phải thanh trượt riêng; ở màn hẹp thu thành nút nổi tròn.
- Lưới 12 cột, tối đa 1440 px; AppSheet canh giữa, lề nền 24–64 px.

## 6. Thư viện component `[ĐỀ XUẤT]`

### 6.1 Nguyên tử

| Component | Biến thể | Ghi chú |
|---|---|---|
| `Button` | primary (`--grad-cta` xanh–tím, chữ trắng, bóng mềm), secondary (nền `--paper-soft`, chữ mực), ghost, dark (nền `--ink`, nút tròn ＋), danger (hồng `--bad-dot`), ai (nền vàng bơ, có ngôi sao ✦) | Cao 40 px (md), 32 (sm), 48 (lg); có trạng thái loading |
| `Input`, `Select`, `Textarea` | mặc định, lỗi, khóa | Nền `--paper-soft`, viền `--stroke`, focus: viền 2 px `--blue-600` |
| `MoneyInput` | JPY, VND | Định dạng nghìn, không nhập số âm |
| `Badge`/`Chip` | ok, warn, bad, info, neutral, ai (viên thuốc, nền pastel, chữ mực, chấm trạng thái) | Chữ + icon, không chỉ màu |
| `FilterPill` | chip lọc có icon nhỏ, viền màu theo chủ đề (xanh, cam, tím) | Dùng ở hàng tiêu đề trang như "UI&UX / Marketing / Python" trong mẫu tham chiếu |
| `Tabs`, `SegmentedControl` | khay viên thuốc nền `--paper-soft`, tab chọn nền mực chữ trắng hoặc nền trắng đổ bóng | |
| `Switch`, `Checkbox`, `Radio` | | Switch bật = `--blue-500`, núm trắng bo tròn |
| `Tooltip`, `Popover` | | Trễ 300 ms |
| `Drawer` (phải, 480–640 px), `Modal` (giữa), `Sheet` (dưới, di động) | | Khóa cuộn nền, trả focus khi đóng |
| `Toast` | ok, warn, bad | Tự tắt 5 s, có nút Hoàn tác khi áp dụng |
| `Progress`, `Ring`, `Stepper` | | |
| `Skeleton` | | Dùng thay spinner cho khối lớn |

### 6.2 Domain component (bắt buộc dùng đúng, không tự chế)

| Component | Việc | Dữ liệu |
|---|---|---|
| `StatusPill` | Hiện Khớp / Lệch / Chưa đủ dữ liệu | `line_status`, `result_summary` (BR_008) |
| `LawLabel` | Phù hợp / Nên hỏi lại / Chưa có quy tắc | `law_label` (BR_009) |
| `MoneyCell` | Số tiền + đơn vị + nút xem công thức | chuỗi số từ API, không tự tính |
| `SourceChip` | Chip "Hợp đồng tr.2", "Phiếu lương", "Điều 37 LSA"... bấm mở nguồn | `source_refs`, `article_ref` |
| `PackBadge` | Phiên bản Law Pack đã dùng | `pack_version_id`, `version_label` |
| `ConfidenceBar` | Độ tin cậy OCR | `confidence_primary`, `ocr_agreement` |
| `HashStamp` | Mã băm rút gọn + nút xác minh | `content_hash`, `file_hash` |
| `EvidenceCard` | Thẻ bằng chứng có thẻ, ngày, trạng thái toàn vẹn | `EVIDENCE_ITEM` |
| `ApprovalCard` | Hành động agent chờ duyệt: Duyệt / Từ chối / Hoàn tác, đếm ngược hạn | `AGENT_ACTION` (BR_047) |
| `ConsentToggle` | Đồng ý theo mục đích, mặc định tắt, có nội dung đồng ý | `CONSENT` (BR_037) |
| `ShareScopePicker` | Chọn phần chia sẻ + hạn + xem trước | `CASE_SHARE` (BR_018, BR_046) |
| `AccessLogRow` | Ai xem gì lúc nào | `ACCESS_LOG` (BR_020) |
| `TimelineItem` | Dòng thời gian | |
| `EmptyState` | Hình minh họa + 1 câu + 1 nút hành động | |

### 6.3 Mẫu thẻ (Card)

- `Card` pastel: nền theo ngữ nghĩa (`--card-*`), bo 28 px, bóng `--shadow-card`, không viền neon. Thẻ hero có thể có hành tinh bị cắt góc và `Sparkle`.
- Đầu thẻ: ô icon tròn 36 px nền trắng bán trong suốt + tiêu đề 16 px đậm + hành động phụ (mũi tên `›`, bộ lọc) bên phải.
- Thẻ KPI: nhãn nhỏ, số lớn 36–56 px, **huy hiệu phần trăm viên thuốc**, đường sparkline mảnh bo tròn 60×24 px, chú thích 1 dòng.
- Thẻ "lệch nhịp" (staggered): hai thẻ cạnh nhau có chiều cao khác nhau và lệch trục dọc 16–24 px; thẻ nhô ra có `Sticker`.
- Thẻ hero: viền gradient mỏng chỉ khi cần nhấn, nền `--grad-alert` hoặc `--grad-cta` cùng `Seigaiha`.
- Thẻ cao bên phải (Trợ lý AI): nền gradient vàng bơ → xanh nhạt, linh vật ở giữa, hai ô số liệu nhỏ ở chân (ví dụ "Việc đang chạy", "Chờ duyệt").

### 6.4 Bảng dữ liệu

- Hàng cao 48 px, tiêu đề cột dính (sticky), hover nền `--bg-elevated`, chọn nhiều bằng checkbox.
- Có thanh công cụ: tìm, lọc (chip), sắp xếp, xuất, chọn cột.
- Phân trang kiểu cuộn vô hạn cho danh sách dài; trang cố định cho bảng quản trị.
- Cột số căn phải, cột trạng thái căn giữa.

---

## 7. Biểu đồ và hiển thị dữ liệu `[ĐỀ XUẤT]`

| Loại | Dùng cho | Quy tắc |
|---|---|---|
| Đường + vùng (area) | Xu hướng thực nhận so với hợp đồng | Đường thực nhận = xanh dương `--blue-500` dày 3 px bo tròn; hợp đồng = hồng `--pink-500` nét đứt; vùng tô pastel 25%; điểm dữ liệu là chấm tròn viền trắng |
| Cột xếp chồng | Giờ làm: thường / thêm / đêm / ngày nghỉ | 4 màu pastel (xanh, hồng, vàng, bạc hà) có viền mực 1 px, thêm họa tiết khi in |
| Vòng (ring/donut) | Tiến độ nợ, hạn mức LLM, độ khớp kỳ | Số ở giữa; đầu vòng bo tròn |
| **Hệ quỹ đạo (Orbit)** | Bốn nguồn của một kỳ quay quanh "Thực nhận" | Hành tinh giữa = kỳ lương; vệ tinh = nguồn; màu viền vệ tinh theo trạng thái; bấm vệ tinh mở nguồn |
| Gauge cung | Độ khớp toàn kỳ "27/30 dòng" | Vạch chia nhỏ, nét bo tròn, kim là một ngôi sao nhỏ |
| Waterfall (thác) | Từ lương hợp đồng → phụ trội → khấu trừ → thực nhận | Mỗi bước bấm xem công thức |
| Heatmap lịch | Mật độ giờ làm theo ngày | 5 mức độ, có chú giải |
| Radar nhỏ | So sánh lời đề nghị việc làm | Tối đa 3 phương án |

Quy tắc:
- Trục tiền tệ có đơn vị; không cắt trục Y làm sai lệch (bắt đầu từ 0 với cột).
- Tooltip hiện giá trị chính xác + nguồn; bàn phím truy cập được (mũi tên).
- Mọi biểu đồ có bảng dữ liệu thay thế (nút "Xem dạng bảng").
- Màu không là kênh duy nhất: kèm nhãn, họa tiết hoặc icon.

---

## 8. Quy tắc dữ liệu, tiền tệ, ngôn ngữ

1. **Tiền:** nhận từ API dưới dạng chuỗi số thập phân; hiển thị bằng `Intl.NumberFormat`. JPY không có số lẻ (`¥214,600`); VND dùng dấu chấm nghìn (`12.500.000 ₫`).
2. **Ngày giờ:** lưu UTC, hiển thị theo múi giờ nơi làm việc của người dùng (`Asia/Tokyo` mặc định cho JP); định dạng `DD/MM/YYYY`, `HH:mm`.
3. **Kỳ lương:** `YYYY-MM`, hiển thị "Kỳ 11/2026".
4. **Ngôn ngữ:** mọi chuỗi qua i18n, không viết cứng. Tiếng Nhật dài hơn: không đặt chiều rộng cố định cho nhãn.
5. **Che dữ liệu nhạy cảm:** số tiền thực nhận, tên chủ sử dụng, nội dung ghi chú có nút "ẩn/hiện" (mắt); khi khóa ứng dụng thì làm mờ toàn bộ. Hàm `mask()` dùng chung.
6. **Mã kỹ thuật** (FLD_, FUN_, hash) chỉ hiện ở khu vực "Chi tiết kỹ thuật" thu gọn, font mono.

---

## 9. Quy tắc nghiệp vụ bắt buộc ở giao diện `[BẮT BUỘC]`

| Quy tắc | Cách thể hiện ở giao diện |
|---|---|
| BR_007 AI không tính tiền | Mọi số tiền lấy từ API; không có công thức tiền nào trong code giao diện. Chú giải "Tính bằng bộ tính cố định" trên mọi kết quả |
| BR_008 Ba trạng thái | Chỉ dùng `StatusPill` với 3 giá trị; không tự thêm "Có thể lệch" |
| BR_009 Ba nhãn luật | Chỉ dùng `LawLabel`; không dùng từ "vi phạm", "bất hợp pháp" ở bất kỳ chuỗi nào |
| BR_013 Xác nhận trường | Nút "Chạy đối chiếu" bị khóa tới khi mọi trường tiền/giờ có trạng thái Đã xác nhận/Đã sửa |
| BR_014 Không đọc được | Hiện khung nhập tay; không điền sẵn giá trị đoán |
| BR_015 Khóa kỳ | Mục giờ đã khóa hiện icon ổ khóa, nút Sửa chuyển thành "Mở khóa kỳ" |
| BR_018, BR_046 Chia sẻ | Luôn có bước Xem trước trước nút Xác nhận chia sẻ; hạn bắt buộc |
| BR_019 Thu hồi | Nút "Thu hồi ngay" luôn hiện cạnh chia sẻ đang hoạt động |
| BR_028 Hỏi đáp | Câu trả lời luôn kèm trích dẫn; không có trích dẫn thì hiện khung "Chưa có quy tắc phù hợp" |
| BR_030 Trần phí | Kết quả: Trong trần / Vượt trần / Bị cấm / Chưa có quy tắc / Chưa kiểm tra |
| BR_033 Kín đáo | Chế độ bật: đổi tên, logo, tiêu đề tab, nội dung thông báo sang trung tính |
| BR_037, BR_038 Đồng ý | Công tắc mặc định tắt; hiện rõ dữ liệu nào sẽ rời thiết bị khi bật |
| BR_039 Hết hạn mức LLM | Chip "Chế độ mẫu" ở vùng giải thích khi `explanation_mode=TEMPLATE` |
| BR_047/BR_048 Agent | Hành động đi ra ngoài luôn là `ApprovalCard`; không có nút "tự động gửi" |
| BR_005 ADM | Màn hình quản trị không có đường dẫn tới nội dung người dùng; chỉ số tổng hợp |
| BR_045 Đồng bộ | Cảnh báo không thể khôi phục nếu quên cụm mật khẩu, bắt buộc tick xác nhận |

Thông điệp pháp lý hiển thị cố định ở chân các màn hình kết quả: "Mọi con số dựa trên Law Pack đã công bố; đây không phải kết luận pháp lý."

---

## 10. Trạng thái giao diện

Mỗi màn hình/khối dữ liệu phải có đủ 5 trạng thái:

| Trạng thái | Cách hiển thị |
|---|---|
| Loading | Skeleton đúng hình dạng nội dung; OCR/đối chiếu dùng `OrbitSweep` + thanh bước |
| Rỗng | `EmptyState` có hành động chính (ví dụ "Tải hợp đồng đầu tiên") |
| Lỗi | Thẻ lỗi nêu nguyên nhân + nút "Thử lại"; mã yêu cầu ở dạng mono nhỏ |
| Ngoại tuyến | Dải cam đầu trang "Đang dùng Law Pack trên thiết bị"; chức năng cần mạng bị mờ |
| Không có quyền | Trang 404 trung tính (không tiết lộ tồn tại dữ liệu của người khác) |

---

## 11. Responsive

| Điểm gãy | Bố cục |
|---|---|
| ≥ 1280 px | Sidebar đầy đủ + nội dung + Agent Dock |
| 1024–1279 px | Sidebar thu gọn 72 px (chỉ icon), Agent Dock dạng drawer |
| 768–1023 px | Sidebar ẩn, mở bằng nút menu; lưới 8 cột |
| < 768 px | Thanh điều hướng dưới (5 mục: Trang chủ, Giờ làm, Đối chiếu, Kho, Thêm), thẻ xếp 1 cột, drawer thành Sheet dưới |

- Vùng chạm tối thiểu 44×44 px.
- Bảng rộng chuyển thành danh sách thẻ trên di động.

---

## 12. Khả năng tiếp cận (a11y) `[BẮT BUỘC]`

- Tương phản chữ nội dung ≥ 4.5:1, chữ lớn ≥ 3:1. **Chữ trên nền pastel luôn là `--ink` hoặc `--ink-md`; không dùng chữ trắng hoặc chữ vàng/hồng nhạt trên nền pastel.** Nút chính `--grad-cta` dùng chữ trắng (đã kiểm tra ≥ 4.5:1).
- Mọi thao tác dùng được bằng bàn phím; thứ tự Tab theo thứ tự thị giác; focus ring 3 px `--blue-600` + viền trắng 2 px + khoảng cách 2 px.
- Phần tử tương tác có `aria-label` tiếng Việt; trạng thái động dùng `aria-live="polite"`.
- Drawer/Modal: bẫy focus, `Esc` để đóng, trả focus về nút mở.
- Không truyền đạt ý nghĩa chỉ bằng màu.
- Hỗ trợ cỡ chữ 200% không vỡ bố cục.
- Chạy axe-core trong CI; lỗi nghiêm trọng làm hỏng build.

---

## 13. Hiệu năng

- LCP < 2.5 s trên 4G; JS ban đầu < 250 KB (gzip) cho trang đầu.
- Tách mã theo route; biểu đồ và canvas nạp lười (`dynamic import`).
- Hiệu ứng nền dùng CSS/Canvas, không dùng video; `will-change` chỉ khi đang chuyển động.
- Ảnh tài liệu hiển thị bản thu nhỏ trước, tải bản đầy đủ khi mở.
- Danh sách dài ảo hóa (virtualization) khi > 100 dòng.
- Law Pack lưu cục bộ (IndexedDB) để dùng ngoại tuyến.

---

## 14. Quy ước đặt tên và code style

| Đối tượng | Quy ước | Ví dụ |
|---|---|---|
| Component | PascalCase | `ReconciliationHero.tsx` |
| Hook | `useXxx` | `useReconRun` |
| Tệp tiện ích | camelCase | `formatMoney.ts` |
| Route (URL) | kebab-case tiếng Việt không dấu | `/doi-chieu-luong/2026-11` |
| CSS variable | `--nhom-ten` | `--text-hi` |
| Test id | `data-testid="scr-052-run-button"` (mã màn hình) | |
| Sự kiện phân tích | `snake_case`, không chứa dữ liệu cá nhân | `recon_run_clicked` |

Quy tắc code:
1. TypeScript `strict`; cấm `any` (trừ lớp bọc bên thứ ba có chú thích).
2. Schema Zod mỗi form khớp Data Dictionary (`type`, `length`, `required`, `validation`); thông điệp lỗi lấy từ i18n.
3. Component ≤ 250 dòng; tách logic ra hook.
4. Không gọi API trong component hiển thị; dùng hook trong `features/<module>/api`.
5. Mọi `fetch` đi qua một client duy nhất, gắn mã yêu cầu và xử lý 401/403/429 thống nhất.
6. Không lưu dữ liệu nhạy cảm vào `localStorage`; chỉ lưu tùy chọn giao diện (sáng/tối, thu gọn menu).
7. Không `console.log` dữ liệu người dùng; lint chặn.
8. Mỗi màn hình có tệp story hoặc ảnh chụp kiểm thử cho 5 trạng thái ở mục 10.
9. Commit theo mẫu `scr-052: thêm waterfall kết quả kỳ`.

---

## 15. Điều cấm

1. Tính tiền, phụ trội, mức tối thiểu hoặc lịch trả nợ ở giao diện.
2. Dùng từ "vi phạm", "bất hợp pháp", "chắc chắn thắng" hoặc kết luận pháp lý.
3. Nút tự gửi thư, tự chia sẻ, tự thanh toán thay người dùng.
4. Lưu tài liệu hoặc số tiền vào `localStorage`/`sessionStorage`.
5. Gửi dữ liệu người dùng tới dịch vụ phân tích bên thứ ba.
6. Hiệu ứng nhấp nháy > 3 lần/giây; âm thanh tự phát; chuyển động quỹ đạo nhanh hơn 20 s/vòng.
6a. Dùng linh vật hoặc ký tự Nhật làm nội dung chính; đặt linh vật cạnh số liệu pháp lý; dùng hình nhân vật có bản quyền (anime, game, phim).
7. Dùng chữ nhỏ hơn 12 px cho nội dung cần đọc.
8. Hiển thị dữ liệu của người khác trong cùng màn hình (kể cả khi mock).
9. Hiển thị thông tin thị trường, đối thủ hoặc nội dung tài chính dự án trong sản phẩm.

---

## 16. Danh mục kiểm tra trước khi merge

- [ ] Dùng đúng token màu và font, không có mã màu cứng.
- [ ] Có đủ 5 trạng thái (loading, rỗng, lỗi, ngoại tuyến, không quyền).
- [ ] Số tiền lấy từ API, có `SourceChip` và `PackBadge` khi là kết quả pháp lý.
- [ ] Đã thử chế độ kín đáo và khóa nhanh.
- [ ] axe-core không có lỗi nghiêm trọng; thao tác được bằng bàn phím.
- [ ] Kiểm tra 3 ngôn ngữ (vi, ja, en), không vỡ bố cục.
- [ ] Kiểm tra ở 1440, 1024, 768, 390 px.
- [ ] Quỹ đạo, sao và nền tự tắt chuyển động khi `prefers-reduced-motion` và tự hạ cấp khi máy yếu.
- [ ] Chữ trên nền pastel đều là màu mực; đã kiểm tra tương phản bằng công cụ.
- [ ] Linh vật chỉ xuất hiện ở vùng cho phép; không có hình nhân vật có bản quyền.
- [ ] Test id đúng mã màn hình `SCR_`.
