# WAYPOINT – BỘ ĐẶC TẢ BRD/SRS

Hành Trang – Waypoint AI: đặc tả nghiệp vụ và hệ thống cho toàn bộ chức năng.

## Số liệu

| Hạng mục | Số lượng |
|---|---|
| Module | 17 |
| Chức năng (FUN) | 150 |
| Thực thể (ENT) | 53 |
| Trường dữ liệu (FLD) | 555 |
| Quy tắc nghiệp vụ (BR) | 52 |
| Luồng nghiệp vụ (WF) | 6 |
| Yêu cầu kiểm chứng được (REQ) | 572 |
| Vai trò đăng nhập | 3 (ROLE_WRK, ROLE_SUP, ROLE_ADM) |

## Mục lục

| Tệp | Nội dung | Trạng thái |
|---|---|---|
| 00_README.md | Tổng quan bộ tài liệu | Hoàn thành |
| 01_SYSTEM_OVERVIEW.md | Mục đích, nguyên tắc, phạm vi, điểm cần xác nhận | Hoàn thành |
| 02_ROLE_PERMISSION.md | Vai trò, quyền, ma trận chức năng × vai trò | Hoàn thành |
| 03_FUNCTIONAL_ARCHITECTURE.md | Module, thành phần logic, phụ thuộc | Hoàn thành |
| 04_FEATURE_LIST.md / .csv | Feature List 17 cột cho 150 chức năng | Hoàn thành |
| 05_SRS_FUNCTIONS.md | SRS 13 phần cho từng chức năng | Hoàn thành |
| 06_DATA_DICTIONARY.md | Từ điển dữ liệu 15 cột | Hoàn thành |
| 07_BUSINESS_RULES_WORKFLOW.md | BR, WF, sơ đồ trạng thái | Hoàn thành |
| 08 đến 14 | Kiến trúc kỹ thuật, CSDL, UI/UX, API, bảo mật, phi chức năng, kiểm thử | Chưa thực hiện |

## Quy ước

- Mã định danh: ROLE_, PER_, MOD_, FUN_, BR_, ENT_, FLD_, WF_, REQ_ (API_, SCR_, TC_ ở các giai đoạn sau).
- Nhãn: [ĐÃ XÁC NHẬN], [ĐỀ XUẤT], [GIẢ ĐỊNH], [CẦN XÁC NHẬN].
- Mô hình dữ liệu và chức năng sinh từ một nguồn duy nhất, nên mã FLD, FUN, BR khớp nhau giữa các tài liệu.
- Mọi tham số số liệu là giá trị đề xuất, chỉnh được qua SYSTEM_CONFIG.
