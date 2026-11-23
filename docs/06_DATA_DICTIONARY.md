# 06. DATA DICTIONARY (Phase 6)

Gồm **53 thực thể** và **555 trường**. Mọi cấu trúc dữ liệu ở mức đặc tả đều là `[ĐỀ XUẤT]` trừ khi ghi chú khác; phần tham số ghi `[CẦN XÁC NHẬN]` cần chốt trước khi triển khai. Quy ước nguồn: Người dùng nhập / Hệ thống sinh / Hệ thống bên ngoài. Trường `Sensitive = Y` là dữ liệu nhạy cảm, mã hóa khi lưu và không hiển thị cho Quản trị viên (BR_005). Trường có hậu tố `_input`, `_plain`, `upload_file`, `voice_audio`, `sync_passphrase` là dữ liệu nhập, không lưu nguyên dạng.

## Danh sách thực thể

| Mã | Thực thể | Mô tả | Số trường | Phạm vi |
|---|---|---|---|---|
| ENT_001 | Tài khoản người dùng (`USER`) | Tài khoản đăng nhập của Người lao động, Cán bộ hỗ trợ và Quản trị viên | 16 | OWN |
| ENT_002 | Hồ sơ người lao động (`USER_PROFILE`) | Thông tin nơi làm việc dùng để chọn quy tắc luật | 11 | OWN |
| ENT_003 | Thiết lập riêng tư (`PRIVACY_SETTING`) | Khóa ứng dụng, chế độ kín đáo, xóa nhanh | 12 | OWN |
| ENT_004 | Đồng ý theo mục đích (`CONSENT`) | Ghi nhận đồng ý riêng cho từng mục đích sử dụng dữ liệu | 7 | OWN |
| ENT_005 | Phiên thiết bị (`DEVICE_SESSION`) | Phiên đăng nhập trên từng thiết bị | 9 | OWN |
| ENT_006 | Tài liệu (`DOCUMENT`) | Hợp đồng, phiếu lương, sao kê, bảng ca và tài liệu khác của người lao động | 15 | OWN |
| ENT_007 | Trường trích xuất (`EXTRACTED_FIELD`) | Giá trị trích từ tài liệu bằng OCR kép, kèm độ tin cậy | 12 | OWN |
| ENT_008 | Điều khoản hợp đồng (`CONTRACT_CLAUSE`) | Điều khoản đã phân rã, có bản dịch và nhãn luật | 11 | OWN |
| ENT_009 | Điểm cần hỏi (`CONTRACT_QUESTION`) | Câu hỏi gợi ý người lao động hỏi lại chủ hoặc đơn vị hỗ trợ | 7 | OWN |
| ENT_010 | Nhật ký giờ làm (`WORK_LOG`) | Mỗi dòng là một ca làm trong ngày | 18 | OWN |
| ENT_011 | Kỳ đối chiếu (`PAY_PERIOD`) | Một kỳ lương cần đối chiếu bốn nguồn | 16 | OWN |
| ENT_012 | Dòng đối chiếu (`RECON_LINE`) | Kết quả đối chiếu cho từng khoản mục của một kỳ | 20 | OWN |
| ENT_013 | Kịch bản mô phỏng (`SCENARIO`) | Kịch bản Salary Twin do người dùng tạo | 16 | OWN |
| ENT_014 | Lời đề nghị việc làm (`JOB_OFFER`) | Dữ liệu so sánh lời đề nghị | 17 | OWN |
| ENT_015 | Mục bằng chứng (`EVIDENCE_ITEM`) | Phần tử trong kho bằng chứng | 12 | OWN |
| ENT_016 | Lịch sử sửa bằng chứng (`EVIDENCE_HISTORY`) | Nhật ký thay đổi của mục bằng chứng | 6 | OWN |
| ENT_017 | Hồ sơ gửi hỗ trợ (Case Pack) (`CASE_PACK`) | Hồ sơ song ngữ người dùng soạn để nhờ hỗ trợ | 13 | OWN |
| ENT_018 | Mục trong Case Pack (`CASE_PACK_ITEM`) | Bằng chứng được đưa vào Case Pack | 5 | OWN |
| ENT_019 | Lượt chia sẻ Case Pack (`CASE_SHARE`) | Chia sẻ Case Pack cho một tổ chức hỗ trợ | 8 | OWN |
| ENT_020 | Nhật ký truy cập Case Pack (`ACCESS_LOG`) | Mọi lượt cán bộ xem hoặc thao tác trên Case Pack được chia sẻ | 7 | OWN |
| ENT_021 | Nguồn luật (`LAW_SOURCE`) | Danh mục nguồn chính thức dùng cho quy tắc | 12 | ADM |
| ENT_022 | Hành lang lao động (`CORRIDOR`) | Cặp nước gửi và nước làm việc | 5 | ADM |
| ENT_023 | Quy tắc luật (`LAW_RULE`) | Một quy tắc có nguồn, ngày hiệu lực và trạng thái duyệt | 20 | ADM |
| ENT_024 | Ca kiểm thử quy tắc (`LAW_RULE_TEST`) | Ca kiểm thử đầu vào và kết quả mong đợi của một quy tắc | 8 | ADM |
| ENT_025 | Phiên bản Law Pack (`LAW_PACK_VERSION`) | Một lần phát hành bộ quy tắc của một hành lang | 10 | ADM |
| ENT_026 | Đề xuất cập nhật luật (`LAW_UPDATE_PROPOSAL`) | Thay đổi do agent Canh luật phát hiện, chờ con người xử lý | 10 | ADM |
| ENT_027 | Tổ chức hỗ trợ (`SUPPORT_ORG`) | Tổ chức độc lập tiếp nhận Case Pack, đồng thời là mục trong danh bạ hỗ trợ | 15 | ORG |
| ENT_028 | Cán bộ của tổ chức (`ORG_MEMBER`) | Liên kết giữa tài khoản cán bộ và tổ chức | 10 | ORG |
| ENT_029 | Case của tổ chức (`DESK_CASE`) | Hồ sơ xử lý tại Case Pack Desk, tạo khi người lao động chia sẻ Case Pack | 9 | ORG |
| ENT_030 | Ghi chú xử lý case (`CASE_NOTE`) | Ghi chú nội bộ của cán bộ, người lao động không thấy | 5 | ORG |
| ENT_031 | Đề nghị bổ sung thông tin (`INFO_REQUEST`) | Cán bộ đề nghị người lao động bổ sung | 10 | OWN |
| ENT_032 | Hỏi đáp luật (`LAW_QA`) | Câu hỏi và câu trả lời có trích dẫn trong Legal Compass | 10 | OWN |
| ENT_033 | Bản nháp thư (`LETTER_DRAFT`) | Thư song ngữ do hệ thống soạn, người dùng tự gửi bên ngoài | 12 | OWN |
| ENT_034 | Nhiệm vụ của agent (`AGENT_TASK`) | Một nhiệm vụ do người dùng giao hoặc agent chủ động đề xuất | 11 | OWN |
| ENT_035 | Hành động của agent (`AGENT_ACTION`) | Từng hành động của agent, kèm mức tự chủ và trạng thái phê duyệt | 14 | OWN |
| ENT_036 | Thiết lập agent (`AGENT_SETTING`) | Quyền và các loại giám sát chủ động của agent | 7 | OWN |
| ENT_037 | Khoản chi phí đi làm (`COST_ITEM`) | Các khoản người lao động đã trả khi chuẩn bị đi làm | 14 | OWN |
| ENT_038 | Khoản nợ (`DEBT`) | Khoản nợ của người lao động | 14 | OWN |
| ENT_039 | Khoản đã trả nợ (`DEBT_PAYMENT`) | Mỗi lần trả nợ | 6 | OWN |
| ENT_040 | Kế hoạch trả nợ (`DEBT_PLAN`) | Kết quả mô phỏng trả nợ theo thu nhập | 8 | OWN |
| ENT_041 | Liên kết xem cho người thân (`FAMILY_LINK`) | Liên kết chỉ-đọc có thời hạn | 13 | OWN |
| ENT_042 | Thông báo (`NOTIFICATION`) | Thông báo và nhắc việc gửi đến người dùng | 11 | OWN |
| ENT_043 | Thiết lập nhắc việc (`REMINDER_SETTING`) | Cấu hình nhắc việc của người dùng | 11 | OWN |
| ENT_044 | Nhật ký kiểm toán (`AUDIT_LOG`) | Ghi mọi thao tác quản trị và thao tác nhạy cảm; không sửa, không xóa | 10 | ADM |
| ENT_045 | Cấu hình nhà cung cấp (`PROVIDER_CONFIG`) | Nhà cung cấp LLM, OCR, thông báo, thanh toán và phương án dự phòng | 10 | ADM |
| ENT_046 | Tham số hệ thống (`SYSTEM_CONFIG`) | Tham số cấu hình hệ thống | 7 | ADM |
| ENT_047 | Chính sách lưu trữ (`RETENTION_POLICY`) | Thời gian lưu và cách xử lý khi hết hạn | 6 | ADM |
| ENT_048 | Gói dịch vụ (`PLAN`) | Gói Free và Pro [CẦN XÁC NHẬN thông số] | 6 | ADM |
| ENT_049 | Đăng ký gói (`SUBSCRIPTION`) | Đăng ký gói của người dùng | 8 | OWN |
| ENT_050 | Bộ đếm sử dụng (`USAGE_COUNTER`) | Đếm lượt dùng LLM và OCR theo tháng | 5 | OWN |
| ENT_051 | Dữ liệu đóng góp ẩn danh (`ANON_CONTRIBUTION`) | Bản ghi đã loại định danh, không truy ngược được về người dùng | 5 | SYS |
| ENT_052 | Thống kê tổng hợp ẩn danh (`AGG_STAT`) | Chỉ số tổng hợp đạt ngưỡng tối thiểu | 7 | ADM |
| ENT_053 | Bản sao lưu đồng bộ (`SYNC_BACKUP`) | Bản sao lưu mã hóa phía người dùng, máy chủ không giải mã được | 8 | OWN |

## ENT_001 – Tài khoản người dùng (`USER`)

Tài khoản đăng nhập của Người lao động, Cán bộ hỗ trợ và Quản trị viên. Quan hệ: 1-1 USER_PROFILE; 1-N DEVICE_SESSION; 1-N DOCUMENT; N-1 SUPPORT_ORG (với SUP). Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0001 | Mã người dùng | user_id | UUID | 36 | Y | — | Y | N | N | Sinh tự động | Định danh duy nhất | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0002 | Định danh đăng nhập | login_identifier | VARCHAR | 120 | Y | — | Y | N | Y | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] | Dùng để đăng nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0003 | Mã băm mật khẩu | password_hash | CHAR | 255 | Y | — | N | N | Y | Băm bằng thuật toán băm mật khẩu chuẩn | Không lưu mật khẩu gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0004 | Mật khẩu (nhập) | password_plain | VARCHAR | 64 | Y | — | N | Y | Y | 8-64 ký tự, có chữ và số | Chỉ là dữ liệu nhập, không lưu | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0005 | Mã băm khóa khôi phục | recovery_key_hash | CHAR | 255 | N | — | N | N | Y | Sinh khi đăng ký [CẦN XÁC NHẬN cơ chế khôi phục] | Khôi phục khi không có email | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0006 | Mã vai trò | role_code | ENUM | 10 | Y | WRK | N | N | N | ∈{WRK,SUP,ADM} | Vai trò của tài khoản | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0007 | Trạng thái tài khoản | account_status | ENUM | 12 | Y | ACTIVE | N | N | N | ∈{ACTIVE,LOCKED,PENDING,DELETED} | Trạng thái hoạt động | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0008 | Tên hiển thị | display_name | VARCHAR | 60 | N | — | N | Y | N | 1-60 ký tự, không chứa ký tự điều khiển | Tên xưng hô trong ứng dụng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0009 | Ngôn ngữ giao diện | preferred_language | ENUM | 5 | Y | vi | N | Y | N | ∈{vi,ja,en} | Ngôn ngữ hiển thị | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0010 | Số lần đăng nhập sai | failed_login_count | INTEGER | — | Y | 0 | N | N | N | ≥0 | Đếm liên tiếp | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0011 | Khóa đến thời điểm | locked_until | TIMESTAMP | — | N | — | N | N | N | — | Hết khóa tạm do đăng nhập sai | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0012 | Lần đăng nhập gần nhất | last_login_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0013 | Mã gói dịch vụ | plan_code | VARCHAR | 10 | Y | FREE | N | N | N | FK hợp lệ | Gói hiện tại | Hệ thống sinh | FK→PLAN.plan_code | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0014 | Mã tổ chức hỗ trợ | org_id | UUID | 36 | N | — | N | N | N | Bắt buộc khi role=SUP | Tổ chức của cán bộ | Hệ thống sinh | FK→SUPPORT_ORG.org_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0015 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0016 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_001, FUN_002, FUN_004, FUN_005, FUN_009, FUN_012, FUN_013, FUN_014, FUN_096, FUN_127, FUN_138, FUN_147.

## ENT_002 – Hồ sơ người lao động (`USER_PROFILE`)

Thông tin nơi làm việc dùng để chọn quy tắc luật. Quan hệ: 1-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0017 | Mã người dùng | user_id | UUID | 36 | Y | — | Y | N | N | — | Khóa chính đồng thời khóa ngoại | Hệ thống sinh | PK,FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0018 | Nước làm việc | work_country_code | ENUM | 2 | Y | JP | N | Y | N | ∈{JP} (mở rộng theo hành lang) | Chọn Law Pack nước làm việc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0019 | Nước gửi | origin_country_code | ENUM | 2 | Y | VN | N | Y | N | ∈{VN} | Chọn Law Pack nước gửi | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0020 | Tỉnh nơi làm việc | work_prefecture_code | VARCHAR | 2 | Y | — | N | Y | N | Mã tỉnh Nhật 01-47 | Chọn mức lương tối thiểu theo tỉnh | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0021 | Tên chủ sử dụng lao động | employer_name | VARCHAR | 120 | N | — | N | Y | Y | 0-120 ký tự | Hiển thị trong Case Pack | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0022 | Ngành nghề | job_category | VARCHAR | 60 | N | — | N | Y | N | 0-60 ký tự | Mô tả công việc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0023 | Ngày bắt đầu làm việc | employment_start_date | DATE | — | N | — | N | Y | N | Không sau hôm nay | Dùng cho Passport | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0024 | Ngày trả lương hằng tháng | wage_pay_day | INTEGER | — | N | — | N | Y | N | 1-31 | Dùng nhắc việc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0025 | Tiền tệ về nước | home_currency_code | ENUM | 3 | Y | VND | N | Y | N | ∈{VND} | Hiển thị quy đổi | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0026 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0027 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_006, FUN_063, FUN_069.

## ENT_003 – Thiết lập riêng tư (`PRIVACY_SETTING`)

Khóa ứng dụng, chế độ kín đáo, xóa nhanh. Quan hệ: 1-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0028 | Mã người dùng | user_id | UUID | 36 | Y | — | Y | N | N | — | PK và FK | Hệ thống sinh | PK,FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0029 | Kiểu khóa ứng dụng | app_lock_type | ENUM | 10 | Y | NONE | N | Y | N | ∈{NONE,PIN,BIOMETRIC} | Cách mở ứng dụng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0030 | Mã PIN (nhập) | pin_input | VARCHAR | 8 | N | — | N | Y | Y | 4-8 chữ số; bắt buộc khi kiểu=PIN | Chỉ là dữ liệu nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0031 | Mã băm PIN | pin_hash | CHAR | 255 | N | — | N | N | Y | — | Lưu trên thiết bị | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0032 | Tự khóa sau (giây) | auto_lock_seconds | INTEGER | — | Y | 60 | N | Y | N | ∈{0,30,60,300} | Thời gian không hoạt động | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0033 | Bật chế độ kín đáo | stealth_enabled | BOOLEAN | — | Y | false | N | Y | N | — | Đổi tên và biểu tượng trung tính | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0034 | Tên ứng dụng hiển thị | stealth_app_name | VARCHAR | 30 | N | — | N | Y | N | Chọn từ danh sách tên trung tính | Tên hiển thị ngoài màn hình chính | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0035 | Biểu tượng hiển thị | stealth_icon_code | VARCHAR | 20 | N | — | N | Y | N | Chọn từ danh sách biểu tượng trung tính | Biểu tượng ứng dụng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0036 | Ẩn nội dung thông báo | hide_notification_content | BOOLEAN | — | Y | true | N | Y | N | — | Thông báo không nêu chi tiết | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0037 | Bật xóa nhanh | panic_wipe_enabled | BOOLEAN | — | Y | false | N | Y | N | — | Cho phép thao tác xóa nhanh | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0038 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0039 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_007, FUN_008, FUN_009, FUN_015.

## ENT_004 – Đồng ý theo mục đích (`CONSENT`)

Ghi nhận đồng ý riêng cho từng mục đích sử dụng dữ liệu. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0040 | Mã đồng ý | consent_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0041 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0042 | Mục đích | purpose_code | ENUM | 20 | Y | — | N | N | N | ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} | Mục đích đồng ý | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0043 | Đã đồng ý | granted | BOOLEAN | — | Y | false | N | Y | N | — | Trạng thái hiện tại | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0044 | Phiên bản nội dung đồng ý | consent_version | VARCHAR | 10 | Y | — | N | N | N | — | Nội dung đồng ý người dùng đã thấy | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0045 | Thời điểm đồng ý | granted_at | TIMESTAMP | — | N | — | N | N | N | — | Lần đồng ý gần nhất | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0046 | Thời điểm rút đồng ý | withdrawn_at | TIMESTAMP | — | N | — | N | N | N | — | Lần rút gần nhất | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_010, FUN_140, FUN_141, FUN_143.

## ENT_005 – Phiên thiết bị (`DEVICE_SESSION`)

Phiên đăng nhập trên từng thiết bị. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0047 | Mã phiên | session_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0048 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0049 | Tên thiết bị | device_label | VARCHAR | 60 | N | — | N | N | N | — | Ví dụ model điện thoại | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0050 | Nền tảng | platform_code | ENUM | 8 | Y | — | N | N | N | ∈{IOS,ANDROID,WEB} | Loại thiết bị | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0051 | Mã băm token làm mới | refresh_token_hash | CHAR | 255 | Y | — | Y | N | Y | — | Không lưu token gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0052 | Trạng thái phiên | session_status | ENUM | 8 | Y | ACTIVE | N | N | N | ∈{ACTIVE,REVOKED,EXPIRED} | Trạng thái phiên | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0053 | Hoạt động gần nhất | last_active_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0054 | Hết hạn lúc | expires_at | TIMESTAMP | — | Y | — | N | N | N | — | Hết hạn phiên | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0055 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Thời điểm đăng nhập | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_002, FUN_003, FUN_011.

## ENT_006 – Tài liệu (`DOCUMENT`)

Hợp đồng, phiếu lương, sao kê, bảng ca và tài liệu khác của người lao động. Quan hệ: N-1 USER; 1-N EXTRACTED_FIELD; 1-N CONTRACT_CLAUSE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | document_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0057 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0058 | Loại tài liệu | document_type | ENUM | 16 | Y | — | N | Y | N | ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} | Phân loại | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0059 | Tệp tải lên | upload_file | FILE | — | Y | — | N | N | Y | JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc | Dữ liệu nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0060 | Khóa lưu tệp mã hóa | file_ref | VARCHAR | 255 | Y | — | Y | N | Y | — | Tham chiếu kho lưu trữ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0061 | Mã băm nội dung | file_hash | CHAR | 64 | Y | — | N | N | N | — | Dùng chống sửa đổi | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0062 | Dung lượng (byte) | file_size_bytes | INTEGER | — | Y | — | N | N | N | >0 | Kích thước tệp | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0063 | Loại tệp | mime_type | VARCHAR | 50 | Y | — | N | N | N | — | Kiểm tra theo nội dung thật | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0064 | Số trang | page_count | INTEGER | — | N | — | N | N | N | ≥1 | Số trang tài liệu | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0065 | Tên tệp gốc | original_filename | VARCHAR | 255 | N | — | N | N | N | — | Tên khi tải lên | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0066 | Kỳ lương (YYYY-MM) | period_month | VARCHAR | 7 | N | — | N | Y | N | Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP | Gắn tài liệu với kỳ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0067 | Số phiên bản | version_no | INTEGER | — | Y | 1 | N | N | N | ≥1 | Phiên bản tài liệu | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0068 | Tài liệu phiên bản trước | parent_document_id | UUID | 36 | N | — | N | N | N | — | Chuỗi phiên bản | Hệ thống sinh | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0069 | Trạng thái đọc OCR | ocr_status | ENUM | 10 | Y | PENDING | N | N | N | ∈{PENDING,DONE,UNREADABLE,MANUAL} | Kết quả đọc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0070 | Tải lên lúc | uploaded_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_013, FUN_016, FUN_017, FUN_018, FUN_020, FUN_021, FUN_022, FUN_023, FUN_024, FUN_025, FUN_026, FUN_029, FUN_036, FUN_063.

## ENT_007 – Trường trích xuất (`EXTRACTED_FIELD`)

Giá trị trích từ tài liệu bằng OCR kép, kèm độ tin cậy. Quan hệ: N-1 DOCUMENT. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0071 | Mã trường trích xuất | extracted_field_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0072 | Mã tài liệu | document_id | UUID | 36 | Y | — | N | N | N | — | Tài liệu nguồn | Hệ thống sinh | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0073 | Khóa trường | field_key | ENUM | 24 | Y | — | N | N | N | ∈{HOURLY_WAGE,MONTHLY_BASE_PAY,OT_RATE,WORK_HOURS_PER_DAY,PAY_PERIOD,GROSS_PAY,NET_PAY,OT_PAY,NIGHT_PAY,HOLIDAY_PAY,TAX,SOCIAL_INSURANCE,HOUSING_DEDUCTION,OTHER_DEDUCTION,CONTRACT_TERM,OTHER} | Loại trường | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0074 | Giá trị đọc được | field_value | VARCHAR | 255 | Y | — | N | N | Y | — | Giá trị OCR chính | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0075 | Độ tin cậy OCR chính | confidence_primary | DECIMAL | 3,2 | Y | — | N | N | N | 0.00-1.00 | Độ tin cậy | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0076 | Độ tin cậy OCR phụ | confidence_secondary | DECIMAL | 3,2 | N | — | N | N | N | 0.00-1.00 | Độ tin cậy lần đọc thứ hai | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0077 | Hai lần đọc khớp | ocr_agreement | BOOLEAN | — | Y | — | N | N | N | — | Kết quả OCR kép | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0078 | Trang nguồn | source_page | INTEGER | — | N | — | N | N | N | ≥1 | Trang chứa giá trị | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0079 | Vùng nguồn | source_bbox | JSONB | — | N | — | N | N | N | — | Tọa độ vùng trong trang | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0080 | Trạng thái xác nhận | confirm_status | ENUM | 12 | Y | UNCONFIRMED | N | N | N | ∈{UNCONFIRMED,CONFIRMED,EDITED,REJECTED} | Xác nhận của người dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0081 | Giá trị đã xác nhận | confirmed_value | VARCHAR | 255 | N | — | N | Y | Y | Đúng kiểu theo field_key | Giá trị dùng để tính | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0082 | Xác nhận lúc | confirmed_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_017, FUN_018, FUN_019, FUN_020.

## ENT_008 – Điều khoản hợp đồng (`CONTRACT_CLAUSE`)

Điều khoản đã phân rã, có bản dịch và nhãn luật. Quan hệ: N-1 DOCUMENT; N-1 LAW_RULE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0083 | Mã điều khoản | clause_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0084 | Mã tài liệu | document_id | UUID | 36 | Y | — | N | N | N | — | Hợp đồng nguồn | Hệ thống sinh | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0085 | Số thứ tự điều khoản | clause_no | INTEGER | — | Y | — | N | N | N | ≥1 | Thứ tự trong hợp đồng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0086 | Chủ đề điều khoản | clause_topic | ENUM | 20 | Y | OTHER | N | N | N | ∈{WAGE,WORKING_HOURS,OVERTIME,DEDUCTION,HOUSING,TERM,TERMINATION,PENALTY,PASSPORT_HOLD,SAVINGS,OTHER} | Phân loại | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0087 | Nội dung gốc | original_text | TEXT | — | Y | — | N | N | Y | — | Văn bản gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0088 | Nội dung dịch | translated_text | TEXT | — | N | — | N | N | Y | — | Bản dịch sang ngôn ngữ người dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0089 | Ngôn ngữ dịch | translation_lang | ENUM | 5 | N | — | N | N | N | ∈{vi,en} | Ngôn ngữ bản dịch | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0090 | Trang nguồn | source_page | INTEGER | — | N | — | N | N | N | ≥1 | Trang chứa điều khoản | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0091 | Nhãn luật | law_label | ENUM | 10 | Y | NO_RULE | N | N | N | ∈{COMPLIANT,ASK_AGAIN,NO_RULE} | Kết quả so với Law Pack | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0092 | Quy tắc áp dụng | clause_rule_id | UUID | 36 | N | — | N | N | N | — | Quy tắc dùng để so | Hệ thống sinh | FK→LAW_RULE.rule_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0093 | Ghi chú luật | law_note | TEXT | — | N | — | N | N | N | — | Giải thích ngắn có điều luật | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_025, FUN_026, FUN_027, FUN_028.

## ENT_009 – Điểm cần hỏi (`CONTRACT_QUESTION`)

Câu hỏi gợi ý người lao động hỏi lại chủ hoặc đơn vị hỗ trợ. Quan hệ: N-1 CONTRACT_CLAUSE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0094 | Mã điểm cần hỏi | question_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0095 | Mã tài liệu | document_id | UUID | 36 | Y | — | N | N | N | — | Hợp đồng nguồn | Hệ thống sinh | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0096 | Mã điều khoản | clause_id | UUID | 36 | Y | — | N | N | N | — | Điều khoản liên quan | Hệ thống sinh | FK→CONTRACT_CLAUSE.clause_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0097 | Nội dung câu hỏi | question_text | TEXT | — | Y | — | N | N | N | — | Câu hỏi gợi ý | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0098 | Trạng thái | question_status | ENUM | 10 | Y | OPEN | N | Y | N | ∈{OPEN,ASKED,CLARIFIED,DISMISSED} | Tiến độ làm rõ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0099 | Ghi chú của người dùng | user_note | TEXT | — | N | — | N | Y | Y | ≤ 1000 ký tự | Ghi chú làm rõ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0100 | Đổi trạng thái lúc | status_changed_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_028, FUN_029, FUN_030.

## ENT_010 – Nhật ký giờ làm (`WORK_LOG`)

Mỗi dòng là một ca làm trong ngày. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0101 | Mã mục giờ | log_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0102 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0103 | Ngày làm việc | work_date | DATE | — | Y | — | N | Y | N | Không sau hôm nay | Ngày của ca | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0104 | Giờ bắt đầu | start_time | TIME | — | Y | — | N | Y | N | HH:mm | Giờ vào ca | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0105 | Giờ kết thúc | end_time | TIME | — | Y | — | N | Y | N | HH:mm; ca qua đêm được phép | Giờ ra ca | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0106 | Phút nghỉ | break_minutes | INTEGER | — | Y | 0 | N | Y | N | 0-480 | Tổng thời gian nghỉ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0107 | Loại ngày | day_type | ENUM | 18 | Y | NORMAL | N | Y | N | ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} | Ảnh hưởng mức phụ trội | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0108 | Cách nhập | input_method | ENUM | 8 | Y | QUICK | N | N | N | ∈{QUICK,VOICE,MANUAL} | Nguồn nhập | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0109 | Ghi âm giọng nói | voice_audio | FILE | — | N | — | N | N | Y | ≤ 30 giây | Dữ liệu nhập, xử lý cục bộ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0110 | Nội dung nhận dạng | voice_transcript | TEXT | — | N | — | N | Y | Y | ≤ 500 ký tự | Văn bản từ giọng nói, người dùng xác nhận | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0111 | Ghi chú | work_note | VARCHAR | 500 | N | — | N | Y | Y | ≤ 500 ký tự | Ví dụ lý do làm thêm | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0112 | Tổng phút làm | total_minutes | INTEGER | — | Y | — | N | N | N | ≥0 | Tính từ giờ vào, ra, nghỉ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0113 | Phút làm đêm | night_minutes | INTEGER | — | Y | 0 | N | N | N | ≥0 | Phần nằm trong 22:00-05:00 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0114 | Trạng thái khóa | lock_status | ENUM | 8 | Y | OPEN | N | N | N | ∈{OPEN,LOCKED} | Khóa theo kỳ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0115 | Khóa lúc | locked_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0116 | Kỳ lương (YYYY-MM) | period_month | VARCHAR | 7 | Y | — | N | N | N | YYYY-MM | Kỳ chứa ngày làm | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0117 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0118 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_031, FUN_032, FUN_033, FUN_034, FUN_035, FUN_036, FUN_146.

## ENT_011 – Kỳ đối chiếu (`PAY_PERIOD`)

Một kỳ lương cần đối chiếu bốn nguồn. Quan hệ: N-1 USER; 1-N RECON_LINE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | period_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0120 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0121 | Kỳ lương (YYYY-MM) | period_month | VARCHAR | 7 | Y | — | N | N | N | YYYY-MM; mỗi người một kỳ một tháng | Tháng cần đối chiếu | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0122 | Hợp đồng dùng | contract_document_id | UUID | 36 | Y | — | N | Y | N | Loại=CONTRACT, cùng chủ | Hợp đồng áp dụng cho kỳ | Người dùng nhập | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0123 | Phiếu lương dùng | payslip_document_id | UUID | 36 | N | — | N | Y | N | Loại=PAYSLIP, cùng chủ | Phiếu lương của kỳ | Người dùng nhập | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0124 | Số tiền thực nhận | received_amount | DECIMAL | 14,2 | N | — | N | Y | Y | ≥0 | Tiền thực sự vào tài khoản | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0125 | Ngày nhận tiền | received_date | DATE | — | N | — | N | Y | N | Không sau hôm nay | Ngày tiền về | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0126 | Tiền tệ thực nhận | received_currency_code | ENUM | 3 | Y | JPY | N | Y | N | ∈{JPY} | Đơn vị tiền | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0127 | Tên gợi nhớ tài khoản nhận | received_account_label | VARCHAR | 40 | N | — | N | Y | Y | ≤ 40 ký tự; không lưu số tài khoản | Nhận diện tài khoản | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0128 | Trạng thái kỳ | period_status | ENUM | 12 | Y | DRAFT | N | N | N | ∈{DRAFT,READY,RECONCILED} | Tiến độ xử lý | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0129 | Kết quả tổng hợp | result_summary | ENUM | 12 | N | — | N | N | N | ∈{MATCH,MISMATCH,INSUFFICIENT} | Theo BR_050 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0130 | Chạy đối chiếu lúc | run_at | TIMESTAMP | — | N | — | N | N | N | — | Lần chạy gần nhất | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0131 | Phiên bản Law Pack đã dùng | pack_version_id | UUID | 36 | N | — | N | N | N | — | Phiên bản dùng khi chạy | Hệ thống sinh | FK→LAW_PACK_VERSION.pack_version_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0132 | Phiên bản máy tính | calc_engine_version | VARCHAR | 20 | N | — | N | N | N | — | Phiên bản bộ tính toán | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0133 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0134 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_037, FUN_038, FUN_039, FUN_040, FUN_045, FUN_046, FUN_063, FUN_146.

## ENT_012 – Dòng đối chiếu (`RECON_LINE`)

Kết quả đối chiếu cho từng khoản mục của một kỳ. Quan hệ: N-1 PAY_PERIOD; N-1 LAW_RULE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0135 | Mã dòng đối chiếu | line_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0136 | Mã kỳ đối chiếu | period_id | UUID | 36 | Y | — | N | N | N | — | Kỳ chứa dòng | Hệ thống sinh | FK→PAY_PERIOD.period_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0137 | Khoản mục | item_code | ENUM | 20 | Y | — | N | N | N | ∈{BASE_PAY,OVERTIME,NIGHT,HOLIDAY,ALLOWANCE,TAX,SOCIAL_INSURANCE,HOUSING,OTHER_DEDUCTION,NET_PAY,RECEIVED} | Khoản mục đối chiếu | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0138 | Số tiền theo hợp đồng | contract_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Nguồn 1 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0139 | Số tiền theo nhật ký giờ | log_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Nguồn 2, tính từ giờ x đơn giá | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0140 | Số tiền theo phiếu lương | payslip_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Nguồn 3 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0141 | Số tiền thực nhận | received_line_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Nguồn 4 (chỉ áp cho dòng NET_PAY, RECEIVED) | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0142 | Mức tối thiểu theo luật | law_min_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Tính từ Law Pack | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0143 | Chênh lệch | difference_amount | DECIMAL | 14,2 | N | — | N | N | Y | — | Giữa các nguồn liên quan | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0144 | Trạng thái dòng | line_status | ENUM | 12 | Y | — | N | N | N | ∈{MATCH,MISMATCH,INSUFFICIENT} | Theo BR_008 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0145 | Nhãn luật | law_label | ENUM | 10 | Y | NO_RULE | N | N | N | ∈{COMPLIANT,ASK_AGAIN,NO_RULE} | Theo BR_009 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0146 | Quy tắc áp dụng | line_rule_id | UUID | 36 | N | — | N | N | N | — | Quy tắc dùng | Hệ thống sinh | FK→LAW_RULE.rule_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0147 | Công thức hiển thị | formula_text | TEXT | — | N | — | N | N | N | — | Công thức và số liệu thay vào | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0148 | Nguồn dữ liệu | source_refs | JSONB | — | N | — | N | N | N | — | Tham chiếu tài liệu, trang, mục giờ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0149 | Giải thích nguyên nhân lệch | explanation_text | TEXT | — | N | — | N | N | N | — | Câu giải thích cho người dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0150 | Cách sinh giải thích | explanation_mode | ENUM | 10 | N | — | N | N | N | ∈{LLM,TEMPLATE} | Theo BR_038, BR_039 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0151 | Tình trạng xử lý | resolution_status | ENUM | 10 | Y | NONE | N | Y | N | ∈{NONE,ASKING,CLARIFIED,IGNORED} | Tiến độ xử lý dòng lệch | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0152 | Ghi chú xử lý | resolution_note | TEXT | — | N | — | N | Y | Y | ≤ 1000 ký tự | Ghi chú của người dùng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0153 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0154 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_039, FUN_040, FUN_041, FUN_042, FUN_043, FUN_044.

## ENT_013 – Kịch bản mô phỏng (`SCENARIO`)

Kịch bản Salary Twin do người dùng tạo. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | scenario_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0156 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0157 | Tên kịch bản | scenario_name | VARCHAR | 60 | Y | — | N | Y | N | 1-60 ký tự | Tên gợi nhớ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0158 | Lương giờ | hourly_wage | DECIMAL | 10,2 | Y | — | N | Y | Y | >0 | Đơn giá theo giờ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0159 | Giờ chuẩn mỗi tháng | base_hours_per_month | DECIMAL | 5,1 | Y | — | N | Y | N | 0-300 | Giờ làm trong giới hạn luật định | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0160 | Giờ làm thêm | overtime_hours | DECIMAL | 5,1 | Y | 0 | N | Y | N | 0-200 | Giờ làm thêm trong tháng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0161 | Giờ làm đêm | night_hours | DECIMAL | 5,1 | Y | 0 | N | Y | N | 0-200 | Giờ trong 22:00-05:00 | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0162 | Giờ làm ngày nghỉ luật định | holiday_hours | DECIMAL | 5,1 | Y | 0 | N | Y | N | 0-200 | Giờ làm ngày nghỉ luật định | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0163 | Phụ cấp cố định | fixed_allowance | DECIMAL | 12,2 | N | 0 | N | Y | Y | ≥0 | Phụ cấp hằng tháng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0164 | Khoản khấu trừ cố định | fixed_deduction | DECIMAL | 12,2 | N | 0 | N | Y | Y | ≥0 | Khấu trừ hằng tháng (nhà ở, ...) | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0165 | Tỉnh áp dụng | prefecture_code | VARCHAR | 2 | Y | — | N | Y | N | 01-47 | Chọn mức lương tối thiểu | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0166 | Phiên bản Law Pack | pack_version_id | UUID | 36 | N | — | N | N | N | — | Phiên bản dùng khi tính | Hệ thống sinh | FK→LAW_PACK_VERSION.pack_version_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0167 | Kết quả mô phỏng | result_json | JSONB | — | Y | — | N | N | N | — | Thu nhập tối thiểu theo luật, theo hợp đồng, chi tiết từng khoản | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0168 | Độ nhạy | sensitivity_json | JSONB | — | N | — | N | N | N | — | Thay đổi khi tăng giảm giờ làm thêm | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0169 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0170 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_047, FUN_048, FUN_049, FUN_050, FUN_051.

## ENT_014 – Lời đề nghị việc làm (`JOB_OFFER`)

Dữ liệu so sánh lời đề nghị. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0171 | Mã lời đề nghị | offer_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0172 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0173 | Mã nhóm so sánh | comparison_group_id | UUID | 36 | Y | — | N | N | N | — | Các lời đề nghị so cùng nhau | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0174 | Tên lời đề nghị | offer_name | VARCHAR | 60 | Y | — | N | Y | N | 1-60 ký tự | Tên gợi nhớ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0175 | Tên chủ sử dụng | employer_name | VARCHAR | 120 | N | — | N | Y | N | — | Tên nơi làm việc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0176 | Tỉnh làm việc | prefecture_code | VARCHAR | 2 | Y | — | N | Y | N | 01-47 | Nơi làm việc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0177 | Lương giờ | hourly_wage | DECIMAL | 10,2 | Y | — | N | Y | Y | >0 | Đơn giá | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0178 | Giờ chuẩn mỗi tháng | monthly_base_hours | DECIMAL | 5,1 | Y | — | N | Y | N | 0-300 | Giờ theo hợp đồng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0179 | Giờ làm thêm dự kiến | expected_overtime_hours | DECIMAL | 5,1 | Y | 0 | N | Y | N | 0-200 | Dự kiến mỗi tháng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0180 | Phụ cấp | allowance_amount | DECIMAL | 12,2 | N | 0 | N | Y | Y | ≥0 | Phụ cấp hằng tháng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0181 | Khấu trừ nhà ở | housing_deduction | DECIMAL | 12,2 | N | 0 | N | Y | Y | ≥0 | Tiền nhà trừ vào lương | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0182 | Khấu trừ khác | other_deduction | DECIMAL | 12,2 | N | 0 | N | Y | Y | ≥0 | Các khoản khác | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0183 | Thời hạn hợp đồng (tháng) | contract_term_months | INTEGER | — | N | — | N | Y | N | 1-120 | Thời hạn | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0184 | Ghi chú | offer_note | TEXT | — | N | — | N | Y | Y | ≤ 1000 ký tự | Ghi chú tự do | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0185 | Thu nhập tháng ước tính | estimated_monthly_net | DECIMAL | 12,2 | Y | — | N | N | Y | — | Tính bằng máy tính cố định | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0186 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0187 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_052, FUN_053.

## ENT_015 – Mục bằng chứng (`EVIDENCE_ITEM`)

Phần tử trong kho bằng chứng. Quan hệ: N-1 USER; 1-N EVIDENCE_HISTORY. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | evidence_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0189 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0190 | Loại bằng chứng | evidence_type | ENUM | 16 | Y | — | N | N | N | ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} | Loại nội dung | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0191 | Đối tượng gốc | ref_entity_code | ENUM | 16 | N | — | N | N | N | ∈{DOCUMENT,PAY_PERIOD,WORK_LOG,LETTER_DRAFT} | Đối tượng tham chiếu | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0192 | Mã đối tượng gốc | ref_id | UUID | 36 | N | — | N | N | N | — | Khóa của đối tượng gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0193 | Tiêu đề | evidence_title | VARCHAR | 120 | Y | — | N | Y | N | 1-120 ký tự | Tiêu đề hiển thị | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0194 | Thẻ | evidence_tags | VARCHAR | 200 | N | — | N | Y | N | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự | Phân loại | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0195 | Ghi chú | evidence_note | TEXT | — | N | — | N | Y | Y | ≤ 2000 ký tự | Ghi chú của người dùng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0196 | Mã băm nội dung | content_hash | CHAR | 64 | Y | — | N | N | N | — | Chống sửa đổi | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0197 | Ngày xảy ra sự việc | event_date | DATE | — | N | — | N | Y | N | — | Dùng sắp xếp dòng thời gian | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0198 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0199 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_054, FUN_055, FUN_056, FUN_057, FUN_058, FUN_059, FUN_060, FUN_061, FUN_062.

## ENT_016 – Lịch sử sửa bằng chứng (`EVIDENCE_HISTORY`)

Nhật ký thay đổi của mục bằng chứng. Quan hệ: N-1 EVIDENCE_ITEM. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0200 | Mã lịch sử | history_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0201 | Mã bằng chứng | evidence_id | UUID | 36 | Y | — | N | N | N | — | Mục bị sửa | Hệ thống sinh | FK→EVIDENCE_ITEM.evidence_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0202 | Loại thay đổi | change_type | ENUM | 10 | Y | — | N | N | N | ∈{CREATE,UPDATE,TAG,NOTE} | Loại thay đổi | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0203 | Mã băm trước thay đổi | previous_hash | CHAR | 64 | N | — | N | N | N | — | Giá trị trước | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0204 | Mã băm sau thay đổi | new_hash | CHAR | 64 | Y | — | N | N | N | — | Giá trị sau | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0205 | Thay đổi lúc | changed_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_057, FUN_059.

## ENT_017 – Hồ sơ gửi hỗ trợ (Case Pack) (`CASE_PACK`)

Hồ sơ song ngữ người dùng soạn để nhờ hỗ trợ. Quan hệ: N-1 USER; 1-N CASE_PACK_ITEM; 1-N CASE_SHARE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0206 | Mã Case Pack | case_pack_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0207 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0208 | Tiêu đề | case_title | VARCHAR | 120 | Y | — | N | Y | N | 1-120 ký tự | Tên Case Pack | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0209 | Loại vấn đề | issue_type | ENUM | 16 | Y | — | N | Y | N | ∈{WAGE_SHORTFALL,CONTRACT_TERM,DEDUCTION,PASSPORT_HOLD,OTHER} | Phân loại vấn đề | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0210 | Từ kỳ | period_from | VARCHAR | 7 | N | — | N | Y | N | YYYY-MM | Kỳ bắt đầu liên quan | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0211 | Đến kỳ | period_to | VARCHAR | 7 | N | — | N | Y | N | YYYY-MM; không trước period_from | Kỳ kết thúc liên quan | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0212 | Tóm tắt tiếng Việt | summary_vi | TEXT | — | Y | — | N | Y | Y | 20-3000 ký tự | Mô tả vấn đề | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0213 | Tóm tắt tiếng Nhật | summary_ja | TEXT | — | N | — | N | Y | Y | ≤ 3000 ký tự | Bản dịch do hệ thống soạn, người dùng duyệt | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0214 | Trạng thái | case_status | ENUM | 8 | Y | DRAFT | N | N | N | ∈{DRAFT,READY,SHARED,CLOSED} | Tiến độ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0215 | Khóa tệp PDF | pdf_file_ref | VARCHAR | 255 | N | — | N | N | Y | — | Tệp đã xuất | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0216 | Mã băm PDF | pdf_hash | CHAR | 64 | N | — | N | N | N | — | Chống sửa đổi | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0217 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0218 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_062, FUN_111, FUN_113, FUN_114, FUN_115, FUN_120, FUN_123.

## ENT_018 – Mục trong Case Pack (`CASE_PACK_ITEM`)

Bằng chứng được đưa vào Case Pack. Quan hệ: N-1 CASE_PACK; N-1 EVIDENCE_ITEM. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0219 | Mã mục | item_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0220 | Mã Case Pack | case_pack_id | UUID | 36 | Y | — | N | N | N | — | Case Pack chứa mục | Hệ thống sinh | FK→CASE_PACK.case_pack_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0221 | Mã bằng chứng | evidence_id | UUID | 36 | Y | — | N | N | N | — | Bằng chứng được chọn | Hệ thống sinh | FK→EVIDENCE_ITEM.evidence_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0222 | Kèm tài liệu gốc | include_original | BOOLEAN | — | Y | false | N | Y | N | — | Có gửi bản gốc hay chỉ phần tóm tắt | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0223 | Thứ tự | sort_order | INTEGER | — | Y | 1 | N | Y | N | ≥1 | Thứ tự hiển thị | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_112, FUN_114, FUN_120.

## ENT_019 – Lượt chia sẻ Case Pack (`CASE_SHARE`)

Chia sẻ Case Pack cho một tổ chức hỗ trợ. Quan hệ: N-1 CASE_PACK; N-1 SUPPORT_ORG. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0224 | Mã chia sẻ | share_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0225 | Mã Case Pack | case_pack_id | UUID | 36 | Y | — | N | N | N | — | Case Pack được chia sẻ | Hệ thống sinh | FK→CASE_PACK.case_pack_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0226 | Mã tổ chức nhận | org_id | UUID | 36 | Y | — | N | N | N | Tổ chức đang hoạt động, nhận Case Pack | Tổ chức nhận | Người dùng nhập | FK→SUPPORT_ORG.org_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0227 | Các phần chia sẻ | shared_sections | JSONB | — | Y | — | N | N | N | Chỉ gồm các mục đã chọn | Phạm vi dữ liệu SUP được xem | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0228 | Hết hạn chia sẻ lúc | expires_at | TIMESTAMP | — | Y | — | N | N | N | Sau hiện tại và ≤ thời hạn tối đa [CẦN XÁC NHẬN 30 ngày] | Hết hạn tự đóng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0229 | Trạng thái chia sẻ | share_status | ENUM | 8 | Y | ACTIVE | N | N | N | ∈{ACTIVE,REVOKED,EXPIRED} | Trạng thái | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0230 | Chia sẻ lúc | shared_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0231 | Thu hồi lúc | revoked_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_116, FUN_117, FUN_119, FUN_148.

## ENT_020 – Nhật ký truy cập Case Pack (`ACCESS_LOG`)

Mọi lượt cán bộ xem hoặc thao tác trên Case Pack được chia sẻ. Quan hệ: N-1 CASE_SHARE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0232 | Mã lượt truy cập | access_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0233 | Mã chia sẻ | share_id | UUID | 36 | Y | — | N | N | N | — | Lượt chia sẻ | Hệ thống sinh | FK→CASE_SHARE.share_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0234 | Cán bộ thao tác | actor_user_id | UUID | 36 | Y | — | N | N | N | — | Tài khoản cán bộ | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0235 | Hành động | access_action | ENUM | 10 | Y | — | N | N | N | ∈{VIEW,NOTE,REQUEST,STATUS,CLOSE,CLAIM} | Loại truy cập | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0236 | Phần đã xem | section_viewed | VARCHAR | 60 | N | — | N | N | N | — | Phần của Case Pack | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0237 | Mã băm địa chỉ mạng | client_ip_hash | CHAR | 64 | N | — | N | N | Y | — | Không lưu IP gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0238 | Truy cập lúc | accessed_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_118, FUN_120, FUN_121, FUN_148.

## ENT_021 – Nguồn luật (`LAW_SOURCE`)

Danh mục nguồn chính thức dùng cho quy tắc. Quan hệ: 1-N LAW_RULE. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0239 | Mã nguồn | source_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0240 | Tên nguồn | source_name | VARCHAR | 200 | Y | — | N | Y | N | 1-200 ký tự | Tên văn bản hoặc trang | Người dùng nhập | — | Quản trị viên |
| FLD_0241 | Đơn vị công bố | publisher | VARCHAR | 120 | Y | — | N | Y | N | — | Cơ quan ban hành | Người dùng nhập | — | Quản trị viên |
| FLD_0242 | Quốc gia | source_country_code | ENUM | 2 | Y | — | N | Y | N | ∈{JP,VN} | Nước ban hành | Người dùng nhập | — | Quản trị viên |
| FLD_0243 | Đường dẫn | source_url | VARCHAR | 500 | Y | — | N | Y | N | URL hợp lệ | Liên kết nguồn | Người dùng nhập | — | Quản trị viên |
| FLD_0244 | Hạng nguồn | source_grade | ENUM | 1 | Y | — | N | Y | N | ∈{A,B,C} | Độ tin cậy | Người dùng nhập | — | Quản trị viên |
| FLD_0245 | Ngôn ngữ nguồn | source_language | ENUM | 5 | Y | — | N | Y | N | ∈{ja,vi,en} | Ngôn ngữ văn bản | Người dùng nhập | — | Quản trị viên |
| FLD_0246 | Ngày công bố | published_date | DATE | — | N | — | N | Y | N | — | Ngày ban hành | Người dùng nhập | — | Quản trị viên |
| FLD_0247 | Ngày truy cập | accessed_date | DATE | — | Y | — | N | Y | N | — | Ngày kiểm tra nguồn | Người dùng nhập | — | Quản trị viên |
| FLD_0248 | Trạng thái | source_status | ENUM | 8 | Y | ACTIVE | N | Y | N | ∈{ACTIVE,INACTIVE} | Còn dùng hay không | Người dùng nhập | — | Quản trị viên |
| FLD_0249 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0250 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_065, FUN_098, FUN_110.

## ENT_022 – Hành lang lao động (`CORRIDOR`)

Cặp nước gửi và nước làm việc. Quan hệ: 1-N LAW_RULE; 1-N LAW_PACK_VERSION. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0251 | Mã hành lang | corridor_code | VARCHAR | 8 | Y | — | Y | N | N | Dạng XX-YY (nước gửi - nước làm việc) | Ví dụ VN-JP | Người dùng nhập | PK | Quản trị viên |
| FLD_0252 | Nước gửi | origin_country_code | ENUM | 2 | Y | — | N | N | N | ∈{VN} | Nước gửi lao động | Người dùng nhập | — | Quản trị viên |
| FLD_0253 | Nước làm việc | destination_country_code | ENUM | 2 | Y | — | N | N | N | ∈{JP} | Nước làm việc | Người dùng nhập | — | Quản trị viên |
| FLD_0254 | Trạng thái | corridor_status | ENUM | 8 | Y | PLANNED | N | Y | N | ∈{ACTIVE,PLANNED} | Đã phát hành hay đang chuẩn bị | Người dùng nhập | — | Quản trị viên |
| FLD_0255 | Phiên bản Law Pack đang dùng | active_pack_version_id | UUID | 36 | N | — | N | N | N | — | Phiên bản được phát hành mới nhất | Hệ thống sinh | FK→LAW_PACK_VERSION.pack_version_id | Quản trị viên |

Chức năng sử dụng: FUN_070, FUN_071, FUN_097, FUN_106, FUN_150.

## ENT_023 – Quy tắc luật (`LAW_RULE`)

Một quy tắc có nguồn, ngày hiệu lực và trạng thái duyệt. Quan hệ: N-1 CORRIDOR; N-1 LAW_SOURCE; 1-N LAW_RULE_TEST. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | rule_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0257 | Mã quy tắc nghiệp vụ | rule_code | VARCHAR | 30 | Y | — | Y | N | N | Dạng JP_OT_25; chữ hoa, số, gạch dưới | Ví dụ mức phụ trội làm thêm | Người dùng nhập | — | Quản trị viên |
| FLD_0258 | Hành lang | corridor_code | VARCHAR | 8 | Y | — | N | N | N | — | Hành lang áp dụng | Người dùng nhập | FK→CORRIDOR.corridor_code | Quản trị viên |
| FLD_0259 | Chủ đề | rule_topic | ENUM | 20 | Y | — | N | Y | N | ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} | Phân loại | Người dùng nhập | — | Quản trị viên |
| FLD_0260 | Tiêu đề quy tắc | rule_title | VARCHAR | 200 | Y | — | N | Y | N | 1-200 ký tự | Tên quy tắc | Người dùng nhập | — | Quản trị viên |
| FLD_0261 | Điều khoản gốc | article_ref | VARCHAR | 120 | Y | — | N | Y | N | — | Điều, khoản của văn bản gốc | Người dùng nhập | — | Quản trị viên |
| FLD_0262 | Nguồn | rule_source_id | UUID | 36 | Y | — | N | Y | N | FK hợp lệ | Nguồn chính thức | Người dùng nhập | FK→LAW_SOURCE.source_id | Quản trị viên |
| FLD_0263 | Kiểu quy tắc | rule_type | ENUM | 12 | Y | — | N | Y | N | ∈{CALC,CLAUSE_CHECK,CAP} | Dùng để tính, kiểm điều khoản hay kiểm trần | Người dùng nhập | — | Quản trị viên |
| FLD_0264 | Tham số | rule_parameters | JSONB | — | Y | — | N | Y | N | Đúng lược đồ theo rule_type | Ví dụ tỷ lệ, ngưỡng, mức trần | Người dùng nhập | — | Quản trị viên |
| FLD_0265 | Công thức mô tả | formula_text | TEXT | — | N | — | N | Y | N | — | Mô tả công thức cho người đọc | Người dùng nhập | — | Quản trị viên |
| FLD_0266 | Hiệu lực từ | effective_from | DATE | — | Y | — | N | Y | N | — | Ngày bắt đầu áp dụng | Người dùng nhập | — | Quản trị viên |
| FLD_0267 | Hiệu lực đến | effective_to | DATE | — | N | — | N | Y | N | Không trước effective_from | Ngày hết hiệu lực | Người dùng nhập | — | Quản trị viên |
| FLD_0268 | Nhãn rà soát | review_label | ENUM | 14 | Y | INTERNAL | N | Y | N | ∈{EXPERT_SIGNED,INTERNAL} | Ai đã rà soát | Người dùng nhập | — | Quản trị viên |
| FLD_0269 | Trạng thái | rule_status | ENUM | 10 | Y | DRAFT | N | N | N | ∈{DRAFT,SUBMITTED,APPROVED,RELEASED,RETIRED} | Theo BR_024 | Hệ thống sinh | — | Quản trị viên |
| FLD_0270 | Người soạn | author_user_id | UUID | 36 | Y | — | N | N | N | — | Quản trị viên soạn | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0271 | Người duyệt | reviewer_user_id | UUID | 36 | N | — | N | N | N | Khác người soạn (BR_001) | Quản trị viên duyệt | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0272 | Ý kiến duyệt | review_comment | TEXT | — | N | — | N | N | N | Bắt buộc khi trả lại | Lý do duyệt hoặc trả lại | Người dùng nhập | — | Quản trị viên |
| FLD_0273 | Duyệt lúc | approved_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0274 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0275 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_065, FUN_068, FUN_069, FUN_099, FUN_100, FUN_103, FUN_104, FUN_105.

## ENT_024 – Ca kiểm thử quy tắc (`LAW_RULE_TEST`)

Ca kiểm thử đầu vào và kết quả mong đợi của một quy tắc. Quan hệ: N-1 LAW_RULE. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0276 | Mã ca kiểm thử | test_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0277 | Mã quy tắc | rule_id | UUID | 36 | Y | — | N | N | N | — | Quy tắc được kiểm thử | Hệ thống sinh | FK→LAW_RULE.rule_id | Quản trị viên |
| FLD_0278 | Tên ca kiểm thử | test_name | VARCHAR | 100 | Y | — | N | Y | N | 1-100 ký tự | Mô tả ca | Người dùng nhập | — | Quản trị viên |
| FLD_0279 | Dữ liệu đầu vào | test_input | JSONB | — | Y | — | N | Y | N | — | Đầu vào của quy tắc | Người dùng nhập | — | Quản trị viên |
| FLD_0280 | Kết quả mong đợi | test_expected | JSONB | — | Y | — | N | Y | N | — | Kết quả đúng | Người dùng nhập | — | Quản trị viên |
| FLD_0281 | Kết quả lần chạy gần nhất | last_result | ENUM | 8 | Y | NOT_RUN | N | N | N | ∈{PASS,FAIL,NOT_RUN} | Kết quả | Hệ thống sinh | — | Quản trị viên |
| FLD_0282 | Đầu ra lần chạy gần nhất | last_output | JSONB | — | N | — | N | N | N | — | Kết quả thực tế | Hệ thống sinh | — | Quản trị viên |
| FLD_0283 | Chạy lúc | last_run_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_101, FUN_102.

## ENT_025 – Phiên bản Law Pack (`LAW_PACK_VERSION`)

Một lần phát hành bộ quy tắc của một hành lang. Quan hệ: N-1 CORRIDOR. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | pack_version_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0285 | Hành lang | corridor_code | VARCHAR | 8 | Y | — | N | N | N | — | Hành lang phát hành | Hệ thống sinh | FK→CORRIDOR.corridor_code | Quản trị viên |
| FLD_0286 | Nhãn phiên bản | version_label | VARCHAR | 20 | Y | — | N | N | N | Dạng YYYY.MM.NN | Nhãn hiển thị | Hệ thống sinh | — | Quản trị viên |
| FLD_0287 | Các quy tắc đã phát hành | included_rule_ids | JSONB | — | Y | — | N | N | N | Toàn bộ quy tắc APPROVED của hành lang | Danh sách quy tắc | Hệ thống sinh | — | Quản trị viên |
| FLD_0288 | Ghi chú thay đổi | change_note | TEXT | — | Y | — | N | N | N | 5-2000 ký tự | Nội dung thay đổi | Người dùng nhập | — | Quản trị viên |
| FLD_0289 | Người phát hành | released_by | UUID | 36 | Y | — | N | N | N | Khác người soạn và người duyệt (BR_001) | Quản trị viên phát hành | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0290 | Phát hành lúc | released_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0291 | Trạng thái | pack_status | ENUM | 12 | Y | RELEASED | N | N | N | ∈{RELEASED,ROLLED_BACK} | Bị thay thế hay không | Hệ thống sinh | — | Quản trị viên |
| FLD_0292 | Phiên bản trước | previous_version_id | UUID | 36 | N | — | N | N | N | — | Chuỗi phiên bản | Hệ thống sinh | FK→LAW_PACK_VERSION.pack_version_id | Quản trị viên |
| FLD_0293 | Mã kiểm tra | checksum | CHAR | 64 | Y | — | N | N | N | — | Kiểm tra toàn vẹn khi đồng bộ xuống thiết bị | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_070, FUN_071, FUN_106, FUN_107, FUN_137, FUN_150.

## ENT_026 – Đề xuất cập nhật luật (`LAW_UPDATE_PROPOSAL`)

Thay đổi do agent Canh luật phát hiện, chờ con người xử lý. Quan hệ: N-1 LAW_SOURCE. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0294 | Mã đề xuất | proposal_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0295 | Nguồn phát hiện | proposal_source_id | UUID | 36 | Y | — | N | N | N | — | Nguồn có thay đổi | Hệ thống sinh | FK→LAW_SOURCE.source_id | Quản trị viên |
| FLD_0296 | Phát hiện lúc | detected_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0297 | Tóm tắt thay đổi | change_summary | TEXT | — | Y | — | N | N | N | — | Mô tả thay đổi phát hiện | Hệ thống sinh | — | Quản trị viên |
| FLD_0298 | Đường dẫn bằng chứng | change_evidence_url | VARCHAR | 500 | N | — | N | N | N | — | Liên kết tới nội dung thay đổi | Hệ thống sinh | — | Quản trị viên |
| FLD_0299 | Quy tắc bị ảnh hưởng | affected_rule_ids | JSONB | — | N | — | N | N | N | — | Danh sách quy tắc liên quan | Hệ thống sinh | — | Quản trị viên |
| FLD_0300 | Trạng thái | proposal_status | ENUM | 10 | Y | NEW | N | N | N | ∈{NEW,ACCEPTED,REJECTED,APPLIED} | Tiến độ xử lý | Hệ thống sinh | — | Quản trị viên |
| FLD_0301 | Người xử lý | handled_by | UUID | 36 | N | — | N | N | N | — | Quản trị viên | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0302 | Xử lý lúc | handled_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0303 | Lý do từ chối | reject_reason | TEXT | — | N | — | N | N | N | Bắt buộc khi REJECTED | Lý do | Người dùng nhập | — | Quản trị viên |

Chức năng sử dụng: FUN_108, FUN_109, FUN_110.

## ENT_027 – Tổ chức hỗ trợ (`SUPPORT_ORG`)

Tổ chức độc lập tiếp nhận Case Pack, đồng thời là mục trong danh bạ hỗ trợ. Quan hệ: 1-N ORG_MEMBER; 1-N CASE_SHARE. Phạm vi truy cập mặc định: Cán bộ cùng tổ chức; ADM quản lý tổ chức.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0304 | Mã tổ chức | org_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0305 | Tên tổ chức | org_name | VARCHAR | 150 | Y | — | Y | Y | N | 1-150 ký tự | Tên chính thức | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0306 | Loại tổ chức | org_type | ENUM | 14 | Y | — | N | Y | N | ∈{NGO,UNION,GOV_COUNSEL,OTHER} [CẦN XÁC NHẬN danh sách loại] | Phân loại | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0307 | Quốc gia | org_country_code | ENUM | 2 | Y | — | N | Y | N | ∈{JP,VN} | Nơi hoạt động | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0308 | Ngôn ngữ hỗ trợ | supported_languages | VARCHAR | 60 | Y | — | N | Y | N | Danh sách mã ngôn ngữ | Ví dụ vi,ja | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0309 | Điện thoại liên hệ | contact_phone | VARCHAR | 30 | N | — | N | Y | N | Số điện thoại hợp lệ | Hiển thị trong danh bạ | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0310 | Email liên hệ | contact_email | VARCHAR | 120 | N | — | N | Y | N | Email hợp lệ | Hiển thị trong danh bạ | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0311 | Trang web | website_url | VARCHAR | 300 | N | — | N | Y | N | URL hợp lệ | Liên kết | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0312 | Địa chỉ | org_address | VARCHAR | 250 | N | — | N | Y | N | — | Địa chỉ liên hệ | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0313 | Hiện trong danh bạ | is_public_listed | BOOLEAN | — | Y | true | N | Y | N | — | Người lao động tra cứu được | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0314 | Nhận Case Pack | accepts_case_pack | BOOLEAN | — | Y | false | N | Y | N | — | Cho phép người lao động chia sẻ | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0315 | Trạng thái | org_status | ENUM | 10 | Y | ACTIVE | N | Y | N | ∈{ACTIVE,SUSPENDED} | Trạng thái hoạt động | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0316 | Người tạo | created_by | UUID | 36 | Y | — | N | N | N | — | Quản trị viên | Hệ thống sinh | FK→USER.user_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0317 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0318 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |

Chức năng sử dụng: FUN_124, FUN_125.

## ENT_028 – Cán bộ của tổ chức (`ORG_MEMBER`)

Liên kết giữa tài khoản cán bộ và tổ chức. Quan hệ: N-1 SUPPORT_ORG; 1-1 USER. Phạm vi truy cập mặc định: Cán bộ cùng tổ chức; ADM quản lý tổ chức.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0319 | Mã thành viên | member_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0320 | Mã tổ chức | org_id | UUID | 36 | Y | — | N | N | N | — | Tổ chức | Hệ thống sinh | FK→SUPPORT_ORG.org_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0321 | Mã tài khoản cán bộ | member_user_id | UUID | 36 | N | — | Y | N | N | — | Có sau khi kích hoạt | Hệ thống sinh | FK→USER.user_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0322 | Email được mời | invite_email | VARCHAR | 120 | Y | — | N | N | Y | Email hợp lệ | Nơi gửi lời mời | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0323 | Tên cán bộ | member_display_name | VARCHAR | 60 | Y | — | N | Y | N | 1-60 ký tự | Tên hiển thị | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0324 | Mã băm token mời | invite_token_hash | CHAR | 255 | N | — | Y | N | Y | — | Không lưu token gốc | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0325 | Lời mời hết hạn | invite_expires_at | TIMESTAMP | — | N | — | N | N | N | Mặc định 7 ngày [CẦN XÁC NHẬN] | Hạn kích hoạt | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0326 | Trạng thái | member_status | ENUM | 8 | Y | INVITED | N | N | N | ∈{INVITED,ACTIVE,LOCKED} | Trạng thái cán bộ | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0327 | Kích hoạt lúc | activated_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0328 | Mời lúc | invited_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |

Chức năng sử dụng: FUN_126, FUN_147.

## ENT_029 – Case của tổ chức (`DESK_CASE`)

Hồ sơ xử lý tại Case Pack Desk, tạo khi người lao động chia sẻ Case Pack. Quan hệ: N-1 CASE_SHARE; N-1 SUPPORT_ORG. Phạm vi truy cập mặc định: Cán bộ cùng tổ chức; ADM quản lý tổ chức.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0329 | Mã case | desk_case_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0330 | Mã chia sẻ | case_share_id | UUID | 36 | Y | — | Y | N | N | — | Lượt chia sẻ tạo ra case | Hệ thống sinh | FK→CASE_SHARE.share_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0331 | Mã tổ chức | desk_org_id | UUID | 36 | Y | — | N | N | N | — | Tổ chức xử lý | Hệ thống sinh | FK→SUPPORT_ORG.org_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0332 | Cán bộ phụ trách | assignee_user_id | UUID | 36 | N | — | N | N | N | Cán bộ cùng tổ chức | Người nhận xử lý | Hệ thống sinh | FK→USER.user_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0333 | Trạng thái case | desk_case_status | ENUM | 16 | Y | NEW | N | N | N | ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} | Tiến độ | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0334 | Lý do đóng | closing_reason | ENUM | 12 | N | — | N | N | N | ∈{RESOLVED,REFERRED,WITHDRAWN,NO_RESPONSE}; bắt buộc khi đóng | Kết quả | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0335 | Ghi chú đóng case | closing_note | TEXT | — | N | — | N | N | N | ≤ 2000 ký tự | Tóm tắt kết quả | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0336 | Nhận lúc | received_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0337 | Đóng lúc | closed_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |

Chức năng sử dụng: FUN_116, FUN_118, FUN_119, FUN_120, FUN_123, FUN_124.

## ENT_030 – Ghi chú xử lý case (`CASE_NOTE`)

Ghi chú nội bộ của cán bộ, người lao động không thấy. Quan hệ: N-1 DESK_CASE. Phạm vi truy cập mặc định: Cán bộ cùng tổ chức; ADM quản lý tổ chức.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0338 | Mã ghi chú | note_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0339 | Mã case | note_case_id | UUID | 36 | Y | — | N | N | N | — | Case | Hệ thống sinh | FK→DESK_CASE.desk_case_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0340 | Người ghi | author_user_id | UUID | 36 | Y | — | N | N | N | — | Cán bộ | Hệ thống sinh | FK→USER.user_id | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0341 | Nội dung ghi chú | note_text | TEXT | — | Y | — | N | N | Y | 1-5000 ký tự | Ghi chú nội bộ | Người dùng nhập | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |
| FLD_0342 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Cán bộ cùng tổ chức; ADM quản lý tổ chức |

Chức năng sử dụng: FUN_121.

## ENT_031 – Đề nghị bổ sung thông tin (`INFO_REQUEST`)

Cán bộ đề nghị người lao động bổ sung. Quan hệ: N-1 DESK_CASE. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0343 | Mã đề nghị | request_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0344 | Mã case | request_case_id | UUID | 36 | Y | — | N | N | N | — | Case | Hệ thống sinh | FK→DESK_CASE.desk_case_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0345 | Cán bộ gửi | requested_by | UUID | 36 | Y | — | N | N | N | — | Cán bộ | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0346 | Nội dung đề nghị | request_message | TEXT | — | Y | — | N | N | Y | 10-2000 ký tự | Điều cần bổ sung | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0347 | Mục cần bổ sung | requested_items | VARCHAR | 300 | N | — | N | N | N | Danh sách loại tài liệu hoặc thông tin | Gợi ý các mục | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0348 | Trạng thái | request_status | ENUM | 10 | Y | OPEN | N | N | N | ∈{OPEN,ANSWERED,DECLINED,EXPIRED} | Tiến độ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0349 | Nội dung trả lời | response_text | TEXT | — | N | — | N | Y | Y | ≤ 2000 ký tự | Trả lời của người lao động | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0350 | Trả lời lúc | responded_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0351 | Đề nghị hết hạn | request_expires_at | TIMESTAMP | — | Y | — | N | N | N | Mặc định 14 ngày [CẦN XÁC NHẬN] | Hạn trả lời | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0352 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_122, FUN_149.

## ENT_032 – Hỏi đáp luật (`LAW_QA`)

Câu hỏi và câu trả lời có trích dẫn trong Legal Compass. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0353 | Mã hỏi đáp | qa_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0354 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0355 | Câu hỏi | question_text | TEXT | — | Y | — | N | N | Y | 5-1000 ký tự | Câu hỏi của người dùng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0356 | Câu trả lời | answer_text | TEXT | — | N | — | N | N | N | — | Câu trả lời có trích dẫn | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0357 | Kiểu trả lời | answer_mode | ENUM | 8 | Y | — | N | N | N | ∈{CITED,REFUSED} | CITED nếu có quy tắc phù hợp | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0358 | Trích dẫn | citations | JSONB | — | N | — | N | N | N | — | Danh sách rule_code, điều khoản, nguồn, ngày hiệu lực | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0359 | Phiên bản Law Pack | qa_pack_version_id | UUID | 36 | N | — | N | N | N | — | Phiên bản dùng | Hệ thống sinh | FK→LAW_PACK_VERSION.pack_version_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0360 | Đánh giá | feedback_value | ENUM | 8 | Y | NONE | N | Y | N | ∈{NONE,HELPFUL,WRONG} | Phản hồi của người dùng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0361 | Ghi chú phản hồi | feedback_note | TEXT | — | N | — | N | Y | N | ≤ 1000 ký tự | Lý do | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0362 | Hỏi lúc | asked_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_064, FUN_065, FUN_066, FUN_067.

## ENT_033 – Bản nháp thư (`LETTER_DRAFT`)

Thư song ngữ do hệ thống soạn, người dùng tự gửi bên ngoài. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0363 | Mã thư | letter_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0364 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0365 | Người nhận | recipient_type | ENUM | 12 | Y | — | N | Y | N | ∈{EMPLOYER,SUPPORT_ORG,AGENCY,OTHER} | Gửi cho ai | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0366 | Mục đích thư | letter_purpose | ENUM | 20 | Y | — | N | Y | N | ∈{ASK_CLARIFICATION,REQUEST_PAYSLIP,REPORT_ISSUE,OTHER} | Loại thư | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0367 | Kỳ liên quan | related_period_id | UUID | 36 | N | — | N | Y | N | — | Kỳ đối chiếu làm căn cứ | Người dùng nhập | FK→PAY_PERIOD.period_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0368 | Tiêu đề tiếng Việt | subject_vi | VARCHAR | 150 | Y | — | N | Y | N | 1-150 ký tự | Tiêu đề | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0369 | Nội dung tiếng Việt | body_vi | TEXT | — | Y | — | N | Y | Y | 10-5000 ký tự | Nội dung bản nháp | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0370 | Tiêu đề tiếng Nhật | subject_ja | VARCHAR | 150 | N | — | N | Y | N | — | Bản dịch | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0371 | Nội dung tiếng Nhật | body_ja | TEXT | — | N | — | N | Y | Y | ≤ 5000 ký tự | Bản dịch | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0372 | Trạng thái | letter_status | ENUM | 10 | Y | DRAFT | N | N | N | ∈{DRAFT,EXPORTED} | Hệ thống không gửi thư | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0373 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0374 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_113.

## ENT_034 – Nhiệm vụ của agent (`AGENT_TASK`)

Một nhiệm vụ do người dùng giao hoặc agent chủ động đề xuất. Quan hệ: N-1 USER; 1-N AGENT_ACTION. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0375 | Mã nhiệm vụ | task_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0376 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0377 | Yêu cầu của người dùng | request_text | TEXT | — | N | — | N | N | Y | ≤ 2000 ký tự | Bắt buộc khi trigger=USER | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0378 | Nguồn khởi tạo | trigger_type | ENUM | 10 | Y | — | N | N | N | ∈{USER,PROACTIVE} | Người dùng giao hay agent chủ động | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0379 | Kế hoạch điều phối | orchestrator_plan | JSONB | — | N | — | N | N | N | — | Các bước và agent được giao | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0380 | Trạng thái nhiệm vụ | task_status | ENUM | 18 | Y | RUNNING | N | N | N | ∈{RUNNING,WAITING_APPROVAL,DONE,FAILED,CANCELLED} | Tiến độ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0381 | Kết quả kiểm chứng | verifier_status | ENUM | 8 | Y | PENDING | N | N | N | ∈{PENDING,PASSED,FAILED,SKIPPED} | Kết quả của agent kiểm chứng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0382 | Tóm tắt kết quả | result_summary | TEXT | — | N | — | N | N | N | — | Kết quả trả người dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0383 | Lý do thất bại | failure_reason | VARCHAR | 300 | N | — | N | N | N | — | Khi FAILED | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0384 | Bắt đầu lúc | started_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0385 | Kết thúc lúc | finished_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_072, FUN_073, FUN_074, FUN_079.

## ENT_035 – Hành động của agent (`AGENT_ACTION`)

Từng hành động của agent, kèm mức tự chủ và trạng thái phê duyệt. Quan hệ: N-1 AGENT_TASK. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0386 | Mã hành động | action_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0387 | Mã nhiệm vụ | action_task_id | UUID | 36 | Y | — | N | N | N | — | Nhiệm vụ | Hệ thống sinh | FK→AGENT_TASK.task_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0388 | Agent thực hiện | agent_code | ENUM | 10 | Y | — | N | N | N | ∈{CONTRACT,COST,PAYROLL,EVIDENCE,LAWWATCH,SUPPORT,VERIFIER,ORCH} | Agent chuyên biệt | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0389 | Loại hành động | action_type | ENUM | 18 | Y | — | N | N | N | ∈{READ,SUGGEST,DRAFT,MINOR_REVERSIBLE} | Theo mức tự chủ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0390 | Mức tự chủ | autonomy_level | INTEGER | — | Y | — | N | N | N | 0-2; mức 3 không tồn tại (BR_006) | Mức tự chủ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0391 | Mô tả hành động | action_description | VARCHAR | 300 | Y | — | N | N | N | — | Hành động agent đề xuất hoặc thực hiện | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0392 | Nội dung hành động | action_payload | JSONB | — | N | — | N | N | Y | — | Dữ liệu chi tiết của hành động | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0393 | Trạng thái phê duyệt | approval_status | ENUM | 12 | Y | — | N | N | N | ∈{NOT_REQUIRED,PENDING,APPROVED,REJECTED,EXPIRED} | Phê duyệt của người dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0394 | Quyết định của người dùng | decision_input | ENUM | 8 | N | — | N | Y | N | ∈{APPROVE,REJECT} | Dữ liệu nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0395 | Quyết định lúc | decided_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0396 | Hết hạn phê duyệt | approval_expires_at | TIMESTAMP | — | N | — | N | N | N | Mặc định 48 giờ [CẦN XÁC NHẬN] | Hạn quyết định | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0397 | Có thể hoàn tác đến | undo_until | TIMESTAMP | — | N | — | N | N | N | Mặc định 24 giờ [CẦN XÁC NHẬN] | Hạn hoàn tác | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0398 | Hoàn tác lúc | undone_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0399 | Thực hiện lúc | executed_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_075, FUN_076, FUN_077, FUN_079, FUN_080.

## ENT_036 – Thiết lập agent (`AGENT_SETTING`)

Quyền và các loại giám sát chủ động của agent. Quan hệ: 1-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0400 | Mã người dùng | user_id | UUID | 36 | Y | — | Y | N | N | — | PK và FK | Hệ thống sinh | PK,FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0401 | Báo khi luật liên quan thay đổi | proactive_law_alert | BOOLEAN | — | Y | true | N | Y | N | — | Giám sát luật | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0402 | Nhắc hạn quan trọng | proactive_deadline_remind | BOOLEAN | — | Y | true | N | Y | N | — | Giám sát hạn chia sẻ, đề nghị bổ sung | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0403 | Nhắc dữ liệu còn thiếu | proactive_missing_data | BOOLEAN | — | Y | true | N | Y | N | — | Giám sát dữ liệu kỳ đối chiếu | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0404 | Số hành động tối đa mỗi ngày | max_actions_per_day | INTEGER | — | Y | 20 | N | Y | N | 1-100 | Giới hạn chống lạm dụng | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0405 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0406 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_078, FUN_079.

## ENT_037 – Khoản chi phí đi làm (`COST_ITEM`)

Các khoản người lao động đã trả khi chuẩn bị đi làm. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | cost_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0408 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0409 | Loại chi phí | cost_type | ENUM | 14 | Y | — | N | Y | N | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} | Phân loại | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0410 | Số tiền | cost_amount | DECIMAL | 15,2 | Y | — | N | Y | Y | >0 | Số tiền đã trả | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0411 | Tiền tệ | cost_currency_code | ENUM | 3 | Y | VND | N | Y | N | ∈{VND,JPY} | Đơn vị tiền | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0412 | Trả cho | paid_to_label | VARCHAR | 120 | N | — | N | Y | Y | ≤ 120 ký tự | Tên đơn vị nhận | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0413 | Ngày trả | paid_date | DATE | — | Y | — | N | Y | N | Không sau hôm nay | Ngày thanh toán | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0414 | Chứng từ | receipt_document_id | UUID | 36 | N | — | N | Y | N | Tài liệu cùng chủ | Biên lai | Người dùng nhập | FK→DOCUMENT.document_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0415 | Ghi chú | cost_note | TEXT | — | N | — | N | Y | Y | ≤ 1000 ký tự | Ghi chú | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0416 | Quy tắc trần áp dụng | cap_rule_id | UUID | 36 | N | — | N | N | N | — | Quy tắc Law Pack Việt Nam | Hệ thống sinh | FK→LAW_RULE.rule_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0417 | Mức trần theo luật | cap_amount | DECIMAL | 15,2 | N | — | N | N | N | — | Tính từ Law Pack | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0418 | Kết quả so với trần | cap_check_status | ENUM | 12 | Y | UNCHECKED | N | N | N | ∈{UNCHECKED,WITHIN_CAP,OVER_CAP,PROHIBITED,NO_RULE} | Theo BR_030 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0419 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0420 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_081, FUN_082, FUN_083, FUN_084, FUN_085, FUN_086.

## ENT_038 – Khoản nợ (`DEBT`)

Khoản nợ của người lao động. Quan hệ: N-1 USER; 1-N DEBT_PAYMENT. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0421 | Mã khoản nợ | debt_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0422 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0423 | Bên cho vay | creditor_label | VARCHAR | 120 | Y | — | N | Y | Y | 1-120 ký tự | Tên gợi nhớ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0424 | Loại bên cho vay | creditor_type | ENUM | 10 | Y | — | N | Y | N | ∈{BANK,FAMILY,AGENCY,OTHER} | Phân loại | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0425 | Số tiền gốc | principal_amount | DECIMAL | 15,2 | Y | — | N | Y | Y | >0 | Số tiền vay | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0426 | Tiền tệ | debt_currency_code | ENUM | 3 | Y | VND | N | Y | N | ∈{VND,JPY} | Đơn vị tiền | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0427 | Lãi suất năm (%) | interest_rate_percent | DECIMAL | 5,2 | Y | 0 | N | Y | N | 0-100 | Lãi suất | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0428 | Ngày vay | debt_start_date | DATE | — | Y | — | N | Y | N | Không sau hôm nay | Ngày bắt đầu | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0429 | Số tiền trả mỗi tháng | monthly_payment_amount | DECIMAL | 15,2 | N | — | N | Y | Y | ≥0 | Mức trả theo thỏa thuận | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0430 | Ngày trả hằng tháng | due_day | INTEGER | — | N | — | N | Y | N | 1-31 | Ngày đến hạn | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0431 | Trạng thái | debt_status | ENUM | 10 | Y | ACTIVE | N | N | N | ∈{ACTIVE,PAID_OFF,CANCELLED} | Tiến độ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0432 | Ghi chú | debt_note | TEXT | — | N | — | N | Y | Y | ≤ 1000 ký tự | Ghi chú | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0433 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0434 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_087, FUN_088, FUN_089, FUN_090, FUN_095.

## ENT_039 – Khoản đã trả nợ (`DEBT_PAYMENT`)

Mỗi lần trả nợ. Quan hệ: N-1 DEBT. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0435 | Mã lần trả | payment_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0436 | Mã khoản nợ | payment_debt_id | UUID | 36 | Y | — | N | N | N | — | Khoản nợ | Hệ thống sinh | FK→DEBT.debt_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0437 | Ngày trả | payment_date | DATE | — | Y | — | N | Y | N | Không sau hôm nay | Ngày trả | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0438 | Số tiền trả | payment_amount | DECIMAL | 15,2 | Y | — | N | Y | Y | >0 | Số tiền | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0439 | Ghi chú | payment_note | VARCHAR | 300 | N | — | N | Y | Y | ≤ 300 ký tự | Ghi chú | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0440 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_089, FUN_090.

## ENT_040 – Kế hoạch trả nợ (`DEBT_PLAN`)

Kết quả mô phỏng trả nợ theo thu nhập. Quan hệ: N-1 DEBT. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0441 | Mã kế hoạch | plan_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0442 | Mã khoản nợ | plan_debt_id | UUID | 36 | Y | — | N | N | N | — | Khoản nợ | Hệ thống sinh | FK→DEBT.debt_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0443 | Thu nhập mỗi tháng (giả định) | monthly_income_assumption | DECIMAL | 15,2 | Y | — | N | Y | Y | >0 | Do người dùng nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0444 | Chi tiêu mỗi tháng (giả định) | monthly_expense_assumption | DECIMAL | 15,2 | Y | — | N | Y | Y | ≥0 và nhỏ hơn thu nhập | Do người dùng nhập | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0445 | Số tiền trả mỗi tháng theo kế hoạch | planned_payment_amount | DECIMAL | 15,2 | Y | — | N | Y | Y | >0 và không vượt thu nhập trừ chi tiêu | Mức trả dự kiến | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0446 | Ngày dự kiến trả hết | projected_payoff_date | DATE | — | Y | — | N | N | N | — | Tính theo BR_031 | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0447 | Lịch trả | plan_schedule | JSONB | — | Y | — | N | N | Y | — | Từng tháng: gốc, lãi, còn lại | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0448 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_091, FUN_092.

## ENT_041 – Liên kết xem cho người thân (`FAMILY_LINK`)

Liên kết chỉ-đọc có thời hạn. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0449 | Mã liên kết | link_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0450 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0451 | Mã liên kết (hiển thị một lần) | link_token | VARCHAR | 64 | Y | — | Y | N | Y | Ngẫu nhiên ≥ 128 bit | Gắn vào đường dẫn, không lưu bản gốc | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0452 | Mã băm liên kết | token_hash | CHAR | 64 | Y | — | Y | N | Y | — | Dùng để đối chiếu khi truy cập | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0453 | Tên gợi nhớ người nhận | relative_label | VARCHAR | 40 | Y | — | N | Y | Y | 1-40 ký tự | Ví dụ "Mẹ" | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0454 | Các mục được xem | shared_items | VARCHAR | 100 | Y | — | N | N | N | Tập con của {DEBT_PROGRESS,MONTHLY_SUMMARY} | Phạm vi dữ liệu người thân thấy | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0455 | Hết hạn lúc | link_expires_at | TIMESTAMP | — | Y | — | N | N | N | Sau hiện tại và ≤ tối đa [CẦN XÁC NHẬN 90 ngày] | Hết hạn | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0456 | Trạng thái | link_status | ENUM | 8 | Y | ACTIVE | N | N | N | ∈{ACTIVE,REVOKED,EXPIRED} | Trạng thái | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0457 | Số lượt xem | view_count | INTEGER | — | Y | 0 | N | N | N | ≥0 | Thống kê | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0458 | Xem gần nhất | last_viewed_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0459 | Thu hồi lúc | revoked_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0460 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0461 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_093, FUN_094, FUN_095, FUN_096.

## ENT_042 – Thông báo (`NOTIFICATION`)

Thông báo và nhắc việc gửi đến người dùng. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0462 | Mã thông báo | notification_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0463 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Người nhận | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0464 | Loại thông báo | notification_type | ENUM | 18 | Y | — | N | N | N | ∈{REMIND_LOG,REMIND_PAYDAY,SHARE_EXPIRING,LAW_CHANGED,CASE_REQUEST,CASE_CLOSED,AGENT_APPROVAL,SYSTEM} | Phân loại | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0465 | Tiêu đề | notification_title | VARCHAR | 120 | Y | — | N | N | N | — | Tiêu đề (trung tính nếu bật kín đáo) | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0466 | Nội dung | notification_body | VARCHAR | 500 | Y | — | N | N | Y | — | Nội dung (ẩn chi tiết nếu bật kín đáo) | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0467 | Đối tượng liên quan | related_ref | VARCHAR | 80 | N | — | N | N | N | — | Mã đối tượng liên quan | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0468 | Kênh | channel_code | ENUM | 8 | Y | INAPP | N | N | N | ∈{PUSH,INAPP} | Kênh gửi | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0469 | Trạng thái gửi | delivery_status | ENUM | 10 | Y | SCHEDULED | N | N | N | ∈{SCHEDULED,SENT,READ,FAILED,CANCELLED} | Tiến độ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0470 | Hẹn gửi lúc | scheduled_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0471 | Gửi lúc | sent_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0472 | Đọc lúc | read_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_134, FUN_135, FUN_136, FUN_137.

## ENT_043 – Thiết lập nhắc việc (`REMINDER_SETTING`)

Cấu hình nhắc việc của người dùng. Quan hệ: 1-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0473 | Mã người dùng | user_id | UUID | 36 | Y | — | Y | N | N | — | PK và FK | Hệ thống sinh | PK,FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0474 | Nhắc ghi giờ | log_reminder_enabled | BOOLEAN | — | Y | true | N | Y | N | — | Bật nhắc ghi giờ | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0475 | Giờ nhắc ghi giờ | log_reminder_time | TIME | — | N | 20:00 | N | Y | N | HH:mm | Giờ nhắc mỗi ngày | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0476 | Nhắc ngày lương | payday_reminder_enabled | BOOLEAN | — | Y | true | N | Y | N | — | Nhắc đối chiếu sau ngày lương | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0477 | Nhắc sau ngày lương (ngày) | payday_offset_days | INTEGER | — | Y | 1 | N | Y | N | 0-10 | Số ngày sau ngày lương | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0478 | Nhắc chia sẻ sắp hết hạn | share_expiry_reminder_enabled | BOOLEAN | — | Y | true | N | Y | N | — | Bật nhắc | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0479 | Báo thay đổi luật liên quan | law_change_alert_enabled | BOOLEAN | — | Y | true | N | Y | N | — | Bật báo | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0480 | Giờ yên lặng từ | quiet_hours_from | TIME | — | N | 22:00 | N | Y | N | HH:mm | Không gửi thông báo | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0481 | Giờ yên lặng đến | quiet_hours_to | TIME | — | N | 07:00 | N | Y | N | HH:mm | Không gửi thông báo | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0482 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0483 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_133.

## ENT_044 – Nhật ký kiểm toán (`AUDIT_LOG`)

Ghi mọi thao tác quản trị và thao tác nhạy cảm; không sửa, không xóa. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0484 | Mã nhật ký | audit_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0485 | Người thao tác | actor_user_id | UUID | 36 | N | — | N | N | N | — | Rỗng khi tác nhân là hệ thống | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0486 | Loại tác nhân | actor_type | ENUM | 8 | Y | — | N | N | N | ∈{USER,ADMIN,SYSTEM,AGENT} | Ai thao tác | Hệ thống sinh | — | Quản trị viên |
| FLD_0487 | Mã hành động | action_code | VARCHAR | 40 | Y | — | N | N | N | — | Ví dụ LAWPACK_RELEASE | Hệ thống sinh | — | Quản trị viên |
| FLD_0488 | Đối tượng bị tác động | target_entity | VARCHAR | 30 | N | — | N | N | N | — | Tên đối tượng | Hệ thống sinh | — | Quản trị viên |
| FLD_0489 | Mã đối tượng | target_id | VARCHAR | 40 | N | — | N | N | N | — | Khóa | Hệ thống sinh | — | Quản trị viên |
| FLD_0490 | Kết quả | audit_result | ENUM | 8 | Y | — | N | N | N | ∈{SUCCESS,DENIED,FAILED} | Kết quả thao tác | Hệ thống sinh | — | Quản trị viên |
| FLD_0491 | Chi tiết | detail_json | JSONB | — | N | — | N | N | Y | — | Không chứa nội dung tài liệu người dùng | Hệ thống sinh | — | Quản trị viên |
| FLD_0492 | Mã băm địa chỉ mạng | client_ip_hash | CHAR | 64 | N | — | N | N | Y | — | Không lưu IP gốc | Hệ thống sinh | — | Quản trị viên |
| FLD_0493 | Xảy ra lúc | occurred_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_128.

## ENT_045 – Cấu hình nhà cung cấp (`PROVIDER_CONFIG`)

Nhà cung cấp LLM, OCR, thông báo, thanh toán và phương án dự phòng. Quan hệ: Tự tham chiếu (dự phòng). Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0494 | Mã nhà cung cấp | provider_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0495 | Loại dịch vụ | provider_type | ENUM | 8 | Y | — | N | N | N | ∈{LLM,OCR,PUSH,PAYMENT} | Loại dịch vụ | Người dùng nhập | — | Quản trị viên |
| FLD_0496 | Tên nhà cung cấp | provider_name | VARCHAR | 80 | Y | — | N | Y | N | 1-80 ký tự | Tên hiển thị | Người dùng nhập | — | Quản trị viên |
| FLD_0497 | Hình thức triển khai | deployment_mode | ENUM | 10 | Y | — | N | Y | N | ∈{SELF_HOST,EXTERNAL} | Tự host hay dịch vụ ngoài | Người dùng nhập | — | Quản trị viên |
| FLD_0498 | Tham chiếu điểm kết nối | endpoint_ref | VARCHAR | 200 | Y | — | N | Y | Y | Tham chiếu kho bí mật, không chứa khóa gốc | Điểm kết nối | Người dùng nhập | — | Quản trị viên |
| FLD_0499 | Thứ tự ưu tiên | priority_order | INTEGER | — | Y | 1 | N | Y | N | ≥1 | Thứ tự dùng | Người dùng nhập | — | Quản trị viên |
| FLD_0500 | Đang bật | is_enabled | BOOLEAN | — | Y | true | N | Y | N | — | Bật tắt nhà cung cấp | Người dùng nhập | — | Quản trị viên |
| FLD_0501 | Nhà cung cấp dự phòng | fallback_provider_id | UUID | 36 | N | — | N | Y | N | Cùng loại dịch vụ; không tự tham chiếu | Dự phòng khi lỗi | Người dùng nhập | FK→PROVIDER_CONFIG.provider_id | Quản trị viên |
| FLD_0502 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |
| FLD_0503 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_129, FUN_132.

## ENT_046 – Tham số hệ thống (`SYSTEM_CONFIG`)

Tham số cấu hình hệ thống. Quan hệ: Không. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0504 | Khóa tham số | config_key | VARCHAR | 60 | Y | — | Y | N | N | Chữ hoa, số, gạch dưới | Ví dụ ABSTAIN_THRESHOLD | Người dùng nhập | PK | Quản trị viên |
| FLD_0505 | Nhóm tham số | config_group | ENUM | 16 | Y | — | N | N | N | ∈{LLM_QUOTA,ABSTAIN,OCR,SHARING,SECURITY,OTHER} | Phân nhóm | Người dùng nhập | — | Quản trị viên |
| FLD_0506 | Giá trị | config_value | VARCHAR | 500 | Y | — | N | Y | N | Đúng kiểu theo value_type | Giá trị hiện tại | Người dùng nhập | — | Quản trị viên |
| FLD_0507 | Kiểu giá trị | value_type | ENUM | 8 | Y | — | N | N | N | ∈{INT,DECIMAL,STRING,BOOL} | Kiểu | Người dùng nhập | — | Quản trị viên |
| FLD_0508 | Mô tả | config_description | VARCHAR | 300 | N | — | N | Y | N | — | Ý nghĩa tham số | Người dùng nhập | — | Quản trị viên |
| FLD_0509 | Người cập nhật | updated_by | UUID | 36 | Y | — | N | N | N | — | Quản trị viên | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0510 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_130.

## ENT_047 – Chính sách lưu trữ (`RETENTION_POLICY`)

Thời gian lưu và cách xử lý khi hết hạn. Quan hệ: Không. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0511 | Mã chính sách | policy_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0512 | Nhóm dữ liệu | data_class | ENUM | 14 | Y | — | Y | N | N | ∈{AUDIT_LOG,ACCESS_LOG,SESSION,SYNC_BACKUP,NOTIFICATION,DELETED_ACCOUNT} | Nhóm dữ liệu áp dụng | Người dùng nhập | — | Quản trị viên |
| FLD_0513 | Số ngày lưu | retention_days | INTEGER | — | Y | — | N | Y | N | ≥1 [CẦN XÁC NHẬN giá trị] | Thời gian lưu | Người dùng nhập | — | Quản trị viên |
| FLD_0514 | Xử lý khi hết hạn | expiry_action | ENUM | 10 | Y | DELETE | N | Y | N | ∈{DELETE,ANONYMIZE} | Cách xử lý | Người dùng nhập | — | Quản trị viên |
| FLD_0515 | Người cập nhật | updated_by | UUID | 36 | Y | — | N | N | N | — | Quản trị viên | Hệ thống sinh | FK→USER.user_id | Quản trị viên |
| FLD_0516 | Cập nhật lúc | updated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_131.

## ENT_048 – Gói dịch vụ (`PLAN`)

Gói Free và Pro [CẦN XÁC NHẬN thông số]. Quan hệ: 1-N SUBSCRIPTION. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0517 | Mã gói | plan_code | VARCHAR | 10 | Y | — | Y | N | N | ∈{FREE,PRO} | Mã gói | Người dùng nhập | PK | Quản trị viên |
| FLD_0518 | Tên gói | plan_name | VARCHAR | 40 | Y | — | N | Y | N | — | Tên hiển thị | Người dùng nhập | — | Quản trị viên |
| FLD_0519 | Giá mỗi tháng | monthly_price_amount | DECIMAL | 10,2 | Y | 0 | N | Y | N | ≥0 | Giá gói | Người dùng nhập | — | Quản trị viên |
| FLD_0520 | Tiền tệ | price_currency_code | ENUM | 3 | Y | JPY | N | Y | N | ∈{JPY} | Đơn vị tiền | Người dùng nhập | — | Quản trị viên |
| FLD_0521 | Hạn mức LLM mỗi tháng | llm_monthly_quota | INTEGER | — | Y | — | N | Y | N | ≥0 | Số lượt gọi LLM | Người dùng nhập | — | Quản trị viên |
| FLD_0522 | Trạng thái | plan_status | ENUM | 8 | Y | ACTIVE | N | Y | N | ∈{ACTIVE,RETIRED} | Còn bán không | Người dùng nhập | — | Quản trị viên |

Chức năng sử dụng: FUN_130, FUN_139.

## ENT_049 – Đăng ký gói (`SUBSCRIPTION`)

Đăng ký gói của người dùng. Quan hệ: N-1 USER; N-1 PLAN. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0523 | Mã đăng ký | subscription_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0524 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0525 | Mã gói | sub_plan_code | VARCHAR | 10 | Y | — | N | N | N | — | Gói đăng ký | Người dùng nhập | FK→PLAN.plan_code | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0526 | Trạng thái | sub_status | ENUM | 14 | Y | — | N | N | N | ∈{ACTIVE,CANCELLED,EXPIRED,PAYMENT_FAILED} | Trạng thái | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0527 | Bắt đầu lúc | started_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0528 | Hết kỳ hiện tại | current_period_end | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0529 | Hủy lúc | cancelled_at | TIMESTAMP | — | N | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0530 | Mã tham chiếu thanh toán | payment_ref | VARCHAR | 80 | N | — | N | N | Y | — | Mã giao dịch của bên thanh toán; không lưu số thẻ | Hệ thống bên ngoài | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |

Chức năng sử dụng: FUN_138.

## ENT_050 – Bộ đếm sử dụng (`USAGE_COUNTER`)

Đếm lượt dùng LLM và OCR theo tháng. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0531 | Mã bộ đếm | usage_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0532 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0533 | Tháng sử dụng | usage_month | VARCHAR | 7 | Y | — | N | N | N | YYYY-MM | Tháng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0534 | Số lượt LLM đã dùng | llm_calls_used | INTEGER | — | Y | 0 | N | N | N | ≥0 | Đã dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0535 | Số trang OCR đã dùng | ocr_pages_used | INTEGER | — | Y | 0 | N | N | N | ≥0 | Đã dùng | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_139.

## ENT_051 – Dữ liệu đóng góp ẩn danh (`ANON_CONTRIBUTION`)

Bản ghi đã loại định danh, không truy ngược được về người dùng. Quan hệ: Không liên kết USER. Phạm vi truy cập mặc định: Hệ thống.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0536 | Mã đóng góp | contribution_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Hệ thống |
| FLD_0537 | Hành lang | corridor_code | VARCHAR | 8 | Y | — | N | N | N | — | Hành lang | Hệ thống sinh | — | Hệ thống |
| FLD_0538 | Tháng dữ liệu | contribution_month | VARCHAR | 7 | Y | — | N | N | N | YYYY-MM | Tháng | Hệ thống sinh | — | Hệ thống |
| FLD_0539 | Bản ghi ẩn danh | record_json | JSONB | — | Y | — | N | N | N | Đã loại định danh, làm tròn giá trị | Ví dụ chênh lệch theo khoản mục | Hệ thống sinh | — | Hệ thống |
| FLD_0540 | Khóa nhóm k-ẩn danh | k_group_key | VARCHAR | 60 | Y | — | N | N | N | — | Nhóm để kiểm tra ngưỡng tối thiểu | Hệ thống sinh | — | Hệ thống |

Chức năng sử dụng: FUN_140, FUN_141, FUN_142.

## ENT_052 – Thống kê tổng hợp ẩn danh (`AGG_STAT`)

Chỉ số tổng hợp đạt ngưỡng tối thiểu. Quan hệ: Không liên kết USER. Phạm vi truy cập mặc định: Quản trị viên.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0541 | Mã thống kê | stat_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Quản trị viên |
| FLD_0542 | Hành lang | corridor_code | VARCHAR | 8 | Y | — | N | N | N | — | Hành lang | Hệ thống sinh | — | Quản trị viên |
| FLD_0543 | Tháng | stat_month | VARCHAR | 7 | Y | — | N | N | N | YYYY-MM | Tháng | Hệ thống sinh | — | Quản trị viên |
| FLD_0544 | Mã chỉ số | metric_code | VARCHAR | 40 | Y | — | N | N | N | — | Ví dụ tỷ lệ kỳ lương lệch | Hệ thống sinh | — | Quản trị viên |
| FLD_0545 | Giá trị | metric_value | DECIMAL | 14,4 | Y | — | N | N | N | — | Giá trị tổng hợp | Hệ thống sinh | — | Quản trị viên |
| FLD_0546 | Cỡ mẫu | sample_size | INTEGER | — | Y | — | N | N | N | ≥ ngưỡng k (BR_043) | Số bản ghi | Hệ thống sinh | — | Quản trị viên |
| FLD_0547 | Tạo lúc | generated_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Quản trị viên |

Chức năng sử dụng: FUN_124, FUN_132, FUN_142.

## ENT_053 – Bản sao lưu đồng bộ (`SYNC_BACKUP`)

Bản sao lưu mã hóa phía người dùng, máy chủ không giải mã được. Quan hệ: N-1 USER. Phạm vi truy cập mặc định: Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có.

| Field ID | Tên VN | Field Code | Data Type | Length | Required | Default | Unique | Editable | Sensitive | Validation | Description | Source | PK/FK | Access Scope |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FLD_0548 | Mã bản sao lưu | backup_id | UUID | 36 | Y | — | Y | N | N | — | Định danh | Hệ thống sinh | PK | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0549 | Mã người dùng | user_id | UUID | 36 | Y | — | N | N | N | — | Chủ sở hữu | Hệ thống sinh | FK→USER.user_id | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0550 | Cụm mật khẩu đồng bộ | sync_passphrase | VARCHAR | 64 | Y | — | N | Y | Y | ≥ 10 ký tự; không gửi lên máy chủ | Dữ liệu nhập, sinh khóa trên thiết bị | Người dùng nhập | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0551 | Khóa lưu dữ liệu mã hóa | encrypted_blob_ref | VARCHAR | 255 | Y | — | Y | N | Y | — | Tham chiếu kho lưu trữ | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có; không hiển thị cho ADM |
| FLD_0552 | Mã băm dữ liệu | blob_hash | CHAR | 64 | Y | — | N | N | N | — | Kiểm tra toàn vẹn | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0553 | Dung lượng (byte) | size_bytes | INTEGER | — | Y | — | N | N | N | >0 | Kích thước | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0554 | Trạng thái | backup_status | ENUM | 8 | Y | ACTIVE | N | N | N | ∈{ACTIVE,DELETED} | Trạng thái | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |
| FLD_0555 | Tạo lúc | created_at | TIMESTAMP | — | Y | — | N | N | N | — | Theo giờ UTC | Hệ thống sinh | — | Chủ sở hữu (WRK); SUP chỉ phần được chia sẻ nếu có |

Chức năng sử dụng: FUN_143, FUN_144, FUN_145.

