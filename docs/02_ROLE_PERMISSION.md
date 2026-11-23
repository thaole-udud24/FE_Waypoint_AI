# 02. VAI TRÒ VÀ PHÂN QUYỀN

## 1. Vai trò (3 vai trò đăng nhập) `[ĐÃ XÁC NHẬN]`

| Mã | Vai trò | Mô tả | Phạm vi dữ liệu |
|---|---|---|---|
| ROLE_WRK | Người lao động | Dùng toàn bộ chức năng cá nhân: tài liệu, giờ làm, đối chiếu, bằng chứng, hỏi đáp, agent, chi phí, nợ, Case Pack | Chỉ dữ liệu của chính mình |
| ROLE_SUP | Cán bộ hỗ trợ | Tiếp nhận và xử lý Case Pack do người lao động chia sẻ cho tổ chức của mình | Case Pack được chia sẻ cho tổ chức, còn hạn, đúng phần được chia sẻ |
| ROLE_ADM | Quản trị viên | Soạn, duyệt, phát hành Law Pack; quản lý tổ chức, Quản trị viên, nhà cung cấp, tham số, nhật ký | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng |

Trạng thái truy cập không phải vai trò: `ACC_GUEST` (chưa đăng nhập: đăng ký, đăng nhập, khôi phục) và `ACC_FAMLINK` (người thân mở liên kết chỉ-đọc có thời hạn, BR_032).

Tác nhân hệ thống: `SYS_OCR` (đọc tài liệu), `SYS_AGENT` (sáu agent chuyên biệt cùng Orchestrator và Kiểm chứng), `SYS_SCHED` (lập lịch, đồng bộ, tổng hợp). Không có vai trò Moderator; gói Free/Pro là thuộc tính tài khoản (USER.plan_code), không phải vai trò.

## 2. Quy tắc bù trừ khi gộp các vai trò quản trị vào ROLE_ADM `[ĐỀ XUẤT]`

Gộp Quản trị viên hệ thống, quản trị tổ chức, biên tập luật và duyệt luật vào một vai trò làm tăng rủi ro tập trung quyền. Các quy tắc sau giữ nguyên cam kết rà soát độc lập đối với quy tắc luật:

| Mã | Quy tắc |
|---|---|
| BR_001 | Tách ba vai trò khi phát hành luật: Người soạn, người duyệt và người phát hành một quy tắc hoặc một phiên bản Law Pack phải là ba tài khoản Quản trị viên khác nhau. |
| BR_002 | Tối thiểu hai Quản trị viên: Hệ thống luôn có ít nhất 2 Quản trị viên đang hoạt động; không được thu hồi hoặc khóa Quản trị viên cuối cùng. |
| BR_003 | Không tự cấp, tự thu hồi quyền: Quản trị viên không được tự tạo hoặc tự thu hồi quyền của chính mình. |
| BR_004 | Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký. |
| BR_005 | Quản trị viên không đọc nội dung người dùng: Quản trị viên không được đọc tài liệu, kết quả đối chiếu, bằng chứng hoặc Case Pack của người dùng; chỉ thấy siêu dữ liệu và số liệu tổng hợp. |

## 3. Danh mục quyền (Permission)

| Mã quyền | Mô tả | Actor | Chức năng |
|---|---|---|---|
| PER_ACC_REGISTER | Quyền thực hiện: Đăng ký tài khoản | GUEST | FUN_001 |
| PER_ACC_LOGIN | Quyền thực hiện: Đăng nhập | GUEST | FUN_002 |
| PER_ACC_LOGOUT | Quyền thực hiện: Đăng xuất | ADM, SUP, WRK | FUN_003 |
| PER_ACC_RECOVER | Quyền thực hiện: Khôi phục tài khoản | GUEST | FUN_004 |
| PER_ACC_PWD | Quyền thực hiện: Đổi mật khẩu | ADM, SUP, WRK | FUN_005 |
| PER_ACC_PROFILE | Quyền thực hiện: Cập nhật hồ sơ nơi làm việc | WRK | FUN_006 |
| PER_PRV_LOCK | Quyền thực hiện: Đặt khóa ứng dụng | WRK | FUN_007 |
| PER_PRV_STEALTH | Quyền thực hiện: Bật chế độ kín đáo | WRK | FUN_008 |
| PER_PRV_WIPE | Quyền thực hiện: Xóa nhanh dữ liệu trên thiết bị | WRK | FUN_009 |
| PER_CON_MANAGE | Quyền thực hiện: Quản lý đồng ý theo mục đích | WRK | FUN_010 |
| PER_ACC_SESSION | Quyền thực hiện: Quản lý phiên thiết bị | ADM, SUP, WRK | FUN_011 |
| PER_ACC_DELETE | Quyền thực hiện: Xóa tài khoản | WRK | FUN_012 |
| PER_ACC_EXPORT | Quyền thực hiện: Xuất dữ liệu cá nhân | WRK | FUN_013 |
| PER_ACC_LANG | Quyền thực hiện: Chọn ngôn ngữ giao diện | ADM, SUP, WRK | FUN_014 |
| PER_PRV_UNLOCK | Quyền thực hiện: Mở khóa ứng dụng | WRK | FUN_015 |
| PER_SYNC_MANAGE | Quyền thực hiện: Bật đồng bộ mã hóa; Sao lưu mã hóa; Khôi phục từ bản sao lưu | WRK | FUN_143, FUN_144, FUN_145 |
| PER_DOC_UPLOAD | Quyền thực hiện: Chụp hoặc tải tài liệu; Tải phiên bản mới của tài liệu | WRK | FUN_016, FUN_023 |
| PER_SYS_OCR | Quyền thực hiện: Đọc OCR kép | SYS_OCR | FUN_017 |
| PER_DOC_VIEW | Quyền thực hiện: Xem trường trích xuất; Xem danh sách tài liệu; Xem chi tiết tài liệu | WRK | FUN_018, FUN_021, FUN_022 |
| PER_DOC_CONFIRM | Quyền thực hiện: Xác nhận hoặc sửa trường | WRK | FUN_019 |
| PER_DOC_MANUAL | Quyền thực hiện: Nhập tay khi không đọc được | WRK | FUN_020 |
| PER_DOC_DELETE | Quyền thực hiện: Xóa tài liệu | WRK | FUN_024 |
| PER_SYS_CONTRACT | Quyền thực hiện: Phân rã và dịch điều khoản; Gắn nhãn luật cho điều khoản; Tạo điểm cần hỏi | SYS_AGENT | FUN_025, FUN_027, FUN_028 |
| PER_CTR_VIEW | Quyền thực hiện: Xem hợp đồng song ngữ; Xem điểm cần hỏi | WRK | FUN_026, FUN_029 |
| PER_CTR_UPDATE | Quyền thực hiện: Cập nhật trạng thái làm rõ | WRK | FUN_030 |
| PER_LOG_CREATE | Quyền thực hiện: Ghi giờ làm nhanh; Ghi giờ bằng giọng nói; Nhập giờ từ bảng ca | WRK | FUN_031, FUN_032, FUN_036 |
| PER_LOG_UPDATE | Quyền thực hiện: Sửa mục giờ làm | WRK | FUN_033 |
| PER_LOG_DELETE | Quyền thực hiện: Xóa mục giờ làm | WRK | FUN_034 |
| PER_LOG_VIEW | Quyền thực hiện: Xem lịch và tổng giờ tháng | WRK | FUN_035 |
| PER_LOG_UNLOCK | Quyền thực hiện: Mở khóa kỳ giờ làm | WRK | FUN_146 |
| PER_PAY_CREATE | Quyền thực hiện: Tạo kỳ đối chiếu | WRK | FUN_037 |
| PER_PAY_UPDATE | Quyền thực hiện: Nhập số tiền thực nhận; Đánh dấu xử lý dòng lệch | WRK | FUN_038, FUN_044 |
| PER_PAY_RUN | Quyền thực hiện: Chạy đối chiếu bốn nguồn; Đối chiếu lại kỳ | WRK | FUN_039, FUN_045 |
| PER_PAY_VIEW | Quyền thực hiện: Xem kết quả tổng hợp kỳ; Xem chi tiết dòng đối chiếu; Xem công thức và nguồn dòng ... | WRK | FUN_040, FUN_041, FUN_042, FUN_046 |
| PER_SYS_PAYROLL | Quyền thực hiện: Sinh giải thích nguyên nhân lệch | SYS_AGENT | FUN_043 |
| PER_SCN_CREATE | Quyền thực hiện: Tạo kịch bản mô phỏng | WRK | FUN_047 |
| PER_SCN_RUN | Quyền thực hiện: Chạy mô phỏng thu nhập; Xem độ nhạy giờ làm thêm | WRK | FUN_048, FUN_049 |
| PER_SCN_UPDATE | Quyền thực hiện: Sửa kịch bản | WRK | FUN_050 |
| PER_SCN_DELETE | Quyền thực hiện: Xóa kịch bản | WRK | FUN_051 |
| PER_OFR_CREATE | Quyền thực hiện: Nhập lời đề nghị việc làm | WRK | FUN_052 |
| PER_OFR_VIEW | Quyền thực hiện: So sánh lời đề nghị | WRK | FUN_053 |
| PER_EVD_CREATE | Quyền thực hiện: Thêm bằng chứng vào kho | WRK | FUN_054 |
| PER_EVD_VIEW | Quyền thực hiện: Xem kho bằng chứng; Tìm kiếm và lọc bằng chứng; Xem dòng thời gian ... | WRK | FUN_055, FUN_056, FUN_058, FUN_059, FUN_060, FUN_063 |
| PER_EVD_UPDATE | Quyền thực hiện: Gắn thẻ và ghi chú | WRK | FUN_057 |
| PER_EVD_DELETE | Quyền thực hiện: Xóa bằng chứng | WRK | FUN_061 |
| PER_EVD_EXPORT | Quyền thực hiện: Xuất bằng chứng ra PDF | WRK | FUN_062 |
| PER_QA_ASK | Quyền thực hiện: Hỏi đáp luật có trích dẫn | WRK | FUN_064 |
| PER_QA_VIEW | Quyền thực hiện: Xem trích dẫn quy tắc; Xem lịch sử hỏi đáp | WRK | FUN_065, FUN_067 |
| PER_QA_FEEDBACK | Quyền thực hiện: Phản hồi câu trả lời | WRK | FUN_066 |
| PER_LAW_BROWSE | Quyền thực hiện: Tra cứu quy tắc theo chủ đề; Tra mức lương tối thiểu theo tỉnh; Xem phiên bản Law Pack đang dùng | WRK | FUN_068, FUN_069, FUN_070 |
| PER_SYS_LAWSYNC | Quyền thực hiện: Đồng bộ Law Pack về thiết bị | SYS_SCHED | FUN_071 |
| PER_AGENT_TASK | Quyền thực hiện: Giao nhiệm vụ cho agent | WRK | FUN_072 |
| PER_AGENT_VIEW | Quyền thực hiện: Xem kế hoạch điều phối; Xem tiến độ và kết quả nhiệm vụ; Xem lịch sử hành động agent | WRK | FUN_073, FUN_074, FUN_080 |
| PER_AGENT_APPROVE | Quyền thực hiện: Duyệt hành động của agent; Từ chối hành động của agent; Hoàn tác thao tác nhỏ | WRK | FUN_075, FUN_076, FUN_077 |
| PER_AGENT_SETTING | Quyền thực hiện: Thiết lập agent chủ động | WRK | FUN_078 |
| PER_SYS_AGENT | Quyền thực hiện: Agent đề xuất chủ động | SYS_AGENT | FUN_079 |
| PER_COST_CREATE | Quyền thực hiện: Thêm khoản chi phí đi làm | WRK | FUN_081 |
| PER_COST_UPDATE | Quyền thực hiện: Sửa khoản chi phí; Gắn chứng từ cho khoản chi | WRK | FUN_082, FUN_086 |
| PER_COST_DELETE | Quyền thực hiện: Xóa khoản chi phí | WRK | FUN_083 |
| PER_COST_VIEW | Quyền thực hiện: Xem danh sách và tổng chi phí | WRK | FUN_084 |
| PER_SYS_COST | Quyền thực hiện: Kiểm tra trần phí | SYS_AGENT | FUN_085 |
| PER_DEBT_CREATE | Quyền thực hiện: Thêm khoản nợ | WRK | FUN_087 |
| PER_DEBT_UPDATE | Quyền thực hiện: Sửa khoản nợ | WRK | FUN_088 |
| PER_DEBT_PAY | Quyền thực hiện: Ghi lần trả nợ | WRK | FUN_089 |
| PER_DEBT_VIEW | Quyền thực hiện: Xem tiến độ nợ | WRK | FUN_090 |
| PER_DEBT_PLAN | Quyền thực hiện: Mô phỏng kế hoạch trả nợ; Lưu kế hoạch trả nợ | WRK | FUN_091, FUN_092 |
| PER_FAM_CREATE | Quyền thực hiện: Tạo liên kết cho người thân; Xem danh sách liên kết | WRK | FUN_093, FUN_096 |
| PER_FAM_REVOKE | Quyền thực hiện: Thu hồi liên kết người thân | WRK | FUN_094 |
| PER_FAM_ACCESS | Quyền thực hiện: Xem tiến độ qua liên kết | FAM | FUN_095 |
| PER_LPK_CORRIDOR | Quyền thực hiện: Quản lý hành lang | ADM | FUN_097 |
| PER_LPK_SOURCE | Quyền thực hiện: Quản lý nguồn luật | ADM | FUN_098 |
| PER_LPK_AUTHOR | Quyền thực hiện: Soạn quy tắc luật mới; Sửa quy tắc nháp; Thêm ca kiểm thử quy tắc ... | ADM | FUN_099, FUN_100, FUN_101, FUN_102, FUN_103 |
| PER_LPK_APPROVE | Quyền thực hiện: Duyệt quy tắc; Trả lại quy tắc | ADM | FUN_104, FUN_105 |
| PER_LPK_RELEASE | Quyền thực hiện: Phát hành phiên bản Law Pack; Khôi phục phiên bản trước; Xem lịch sử phiên bản Law Pack | ADM | FUN_106, FUN_107, FUN_150 |
| PER_LPK_WATCH | Quyền thực hiện: Xem đề xuất cập nhật luật; Xử lý đề xuất cập nhật luật | ADM | FUN_108, FUN_109 |
| PER_SYS_LAWWATCH | Quyền thực hiện: Phát hiện thay đổi nguồn luật | SYS_AGENT | FUN_110 |
| PER_CASE_CREATE | Quyền thực hiện: Tạo Case Pack; Chọn bằng chứng đưa vào Case Pack; Xem trước Case Pack | WRK | FUN_111, FUN_112, FUN_114 |
| PER_SYS_SUPPORT | Quyền thực hiện: Dịch tóm tắt và soạn thư song ngữ | SYS_AGENT | FUN_113 |
| PER_CASE_EXPORT | Quyền thực hiện: Xuất Case Pack ra PDF | WRK | FUN_115 |
| PER_CASE_SHARE | Quyền thực hiện: Chia sẻ Case Pack cho tổ chức; Thu hồi chia sẻ; Xem các chia sẻ Case Pack đang hoạt động ... | WRK | FUN_116, FUN_117, FUN_148, FUN_149 |
| PER_DESK_VIEW | Quyền thực hiện: Nhận xử lý case; Xem danh sách case của tổ chức; Xem nội dung case | SUP | FUN_118, FUN_119, FUN_120 |
| PER_DESK_NOTE | Quyền thực hiện: Ghi chú nội bộ | SUP | FUN_121 |
| PER_DESK_REQUEST | Quyền thực hiện: Gửi đề nghị bổ sung thông tin | SUP | FUN_122 |
| PER_DESK_CLOSE | Quyền thực hiện: Đóng hoặc đổi trạng thái case | SUP | FUN_123 |
| PER_DESK_STAT | Quyền thực hiện: Xem thống kê Desk tổng hợp | ADM | FUN_124 |
| PER_DESK_ACTIVATE | Quyền thực hiện: Kích hoạt tài khoản cán bộ từ lời mời | SUP | FUN_147 |
| PER_ADM_ORG | Quyền thực hiện: Quản lý tổ chức hỗ trợ; Mời cán bộ hỗ trợ | ADM | FUN_125, FUN_126 |
| PER_ADM_USER | Quyền thực hiện: Quản lý Quản trị viên | ADM | FUN_127 |
| PER_ADM_AUDIT | Quyền thực hiện: Xem nhật ký kiểm toán | ADM | FUN_128 |
| PER_ADM_PROVIDER | Quyền thực hiện: Cấu hình nhà cung cấp | ADM | FUN_129 |
| PER_ADM_CONFIG | Quyền thực hiện: Cấu hình tham số hệ thống và gói dịch vụ | ADM | FUN_130 |
| PER_ADM_RETENTION | Quyền thực hiện: Cấu hình chính sách lưu trữ | ADM | FUN_131 |
| PER_ADM_MONITOR | Quyền thực hiện: Giám sát vận hành | ADM | FUN_132 |
| PER_NOT_SETTING | Quyền thực hiện: Cấu hình nhắc việc | WRK | FUN_133 |
| PER_NOT_VIEW | Quyền thực hiện: Xem thông báo; Đánh dấu đã đọc | SUP, WRK | FUN_134, FUN_135 |
| PER_SYS_NOTIFY | Quyền thực hiện: Gửi thông báo theo lịch; Báo thay đổi luật liên quan | SYS_SCHED | FUN_136, FUN_137 |
| PER_PLAN_MANAGE | Quyền thực hiện: Xem và đổi gói dịch vụ | WRK | FUN_138 |
| PER_PLAN_VIEW | Quyền thực hiện: Xem mức sử dụng | WRK | FUN_139 |
| PER_ANON_VIEW | Quyền thực hiện: Xem nội dung sẽ đóng góp ẩn danh | WRK | FUN_140 |
| PER_SYS_ANON | Quyền thực hiện: Tạo bản ghi đóng góp ẩn danh; Tổng hợp thống kê ẩn danh | SYS_AGENT, SYS_SCHED | FUN_141, FUN_142 |

## 4. Ma trận chức năng × vai trò

Ký hiệu: X = được thực hiện; SYS = hệ thống thực hiện.

| Function ID | Tên chức năng | ACC_GUEST | ROLE_WRK | ROLE_SUP | ROLE_ADM | ACC_FAMLINK | SYS |
|---|---|---|---|---|---|---|---|
| FUN_001 | Đăng ký tài khoản | X |  |  |  |  |  |
| FUN_002 | Đăng nhập | X |  |  |  |  |  |
| FUN_003 | Đăng xuất |  | X | X | X |  |  |
| FUN_004 | Khôi phục tài khoản | X |  |  |  |  |  |
| FUN_005 | Đổi mật khẩu |  | X | X | X |  |  |
| FUN_006 | Cập nhật hồ sơ nơi làm việc |  | X |  |  |  |  |
| FUN_007 | Đặt khóa ứng dụng |  | X |  |  |  |  |
| FUN_008 | Bật chế độ kín đáo |  | X |  |  |  |  |
| FUN_009 | Xóa nhanh dữ liệu trên thiết bị |  | X |  |  |  |  |
| FUN_010 | Quản lý đồng ý theo mục đích |  | X |  |  |  |  |
| FUN_011 | Quản lý phiên thiết bị |  | X | X | X |  |  |
| FUN_012 | Xóa tài khoản |  | X |  |  |  |  |
| FUN_013 | Xuất dữ liệu cá nhân |  | X |  |  |  |  |
| FUN_014 | Chọn ngôn ngữ giao diện |  | X | X | X |  |  |
| FUN_015 | Mở khóa ứng dụng |  | X |  |  |  |  |
| FUN_143 | Bật đồng bộ mã hóa |  | X |  |  |  |  |
| FUN_144 | Sao lưu mã hóa |  | X |  |  |  |  |
| FUN_145 | Khôi phục từ bản sao lưu |  | X |  |  |  |  |
| FUN_016 | Chụp hoặc tải tài liệu |  | X |  |  |  |  |
| FUN_017 | Đọc OCR kép |  |  |  |  |  | SYS_OCR |
| FUN_018 | Xem trường trích xuất |  | X |  |  |  |  |
| FUN_019 | Xác nhận hoặc sửa trường |  | X |  |  |  |  |
| FUN_020 | Nhập tay khi không đọc được |  | X |  |  |  |  |
| FUN_021 | Xem danh sách tài liệu |  | X |  |  |  |  |
| FUN_022 | Xem chi tiết tài liệu |  | X |  |  |  |  |
| FUN_023 | Tải phiên bản mới của tài liệu |  | X |  |  |  |  |
| FUN_024 | Xóa tài liệu |  | X |  |  |  |  |
| FUN_025 | Phân rã và dịch điều khoản |  |  |  |  |  | SYS_AGENT |
| FUN_026 | Xem hợp đồng song ngữ |  | X |  |  |  |  |
| FUN_027 | Gắn nhãn luật cho điều khoản |  |  |  |  |  | SYS_AGENT |
| FUN_028 | Tạo điểm cần hỏi |  |  |  |  |  | SYS_AGENT |
| FUN_029 | Xem điểm cần hỏi |  | X |  |  |  |  |
| FUN_030 | Cập nhật trạng thái làm rõ |  | X |  |  |  |  |
| FUN_031 | Ghi giờ làm nhanh |  | X |  |  |  |  |
| FUN_032 | Ghi giờ bằng giọng nói |  | X |  |  |  |  |
| FUN_033 | Sửa mục giờ làm |  | X |  |  |  |  |
| FUN_034 | Xóa mục giờ làm |  | X |  |  |  |  |
| FUN_035 | Xem lịch và tổng giờ tháng |  | X |  |  |  |  |
| FUN_036 | Nhập giờ từ bảng ca |  | X |  |  |  |  |
| FUN_146 | Mở khóa kỳ giờ làm |  | X |  |  |  |  |
| FUN_037 | Tạo kỳ đối chiếu |  | X |  |  |  |  |
| FUN_038 | Nhập số tiền thực nhận |  | X |  |  |  |  |
| FUN_039 | Chạy đối chiếu bốn nguồn |  | X |  |  |  |  |
| FUN_040 | Xem kết quả tổng hợp kỳ |  | X |  |  |  |  |
| FUN_041 | Xem chi tiết dòng đối chiếu |  | X |  |  |  |  |
| FUN_042 | Xem công thức và nguồn dòng |  | X |  |  |  |  |
| FUN_043 | Sinh giải thích nguyên nhân lệch |  |  |  |  |  | SYS_AGENT |
| FUN_044 | Đánh dấu xử lý dòng lệch |  | X |  |  |  |  |
| FUN_045 | Đối chiếu lại kỳ |  | X |  |  |  |  |
| FUN_046 | Xem lịch sử các kỳ |  | X |  |  |  |  |
| FUN_047 | Tạo kịch bản mô phỏng |  | X |  |  |  |  |
| FUN_048 | Chạy mô phỏng thu nhập |  | X |  |  |  |  |
| FUN_049 | Xem độ nhạy giờ làm thêm |  | X |  |  |  |  |
| FUN_050 | Sửa kịch bản |  | X |  |  |  |  |
| FUN_051 | Xóa kịch bản |  | X |  |  |  |  |
| FUN_052 | Nhập lời đề nghị việc làm |  | X |  |  |  |  |
| FUN_053 | So sánh lời đề nghị |  | X |  |  |  |  |
| FUN_054 | Thêm bằng chứng vào kho |  | X |  |  |  |  |
| FUN_055 | Xem kho bằng chứng |  | X |  |  |  |  |
| FUN_056 | Tìm kiếm và lọc bằng chứng |  | X |  |  |  |  |
| FUN_057 | Gắn thẻ và ghi chú |  | X |  |  |  |  |
| FUN_058 | Xem dòng thời gian |  | X |  |  |  |  |
| FUN_059 | Xem lịch sử sửa bằng chứng |  | X |  |  |  |  |
| FUN_060 | Xác minh toàn vẹn bằng chứng |  | X |  |  |  |  |
| FUN_061 | Xóa bằng chứng |  | X |  |  |  |  |
| FUN_062 | Xuất bằng chứng ra PDF |  | X |  |  |  |  |
| FUN_063 | Xem Passport làm việc |  | X |  |  |  |  |
| FUN_064 | Hỏi đáp luật có trích dẫn |  | X |  |  |  |  |
| FUN_065 | Xem trích dẫn quy tắc |  | X |  |  |  |  |
| FUN_066 | Phản hồi câu trả lời |  | X |  |  |  |  |
| FUN_067 | Xem lịch sử hỏi đáp |  | X |  |  |  |  |
| FUN_068 | Tra cứu quy tắc theo chủ đề |  | X |  |  |  |  |
| FUN_069 | Tra mức lương tối thiểu theo tỉnh |  | X |  |  |  |  |
| FUN_070 | Xem phiên bản Law Pack đang dùng |  | X |  |  |  |  |
| FUN_071 | Đồng bộ Law Pack về thiết bị |  |  |  |  |  | SYS_SCHED |
| FUN_072 | Giao nhiệm vụ cho agent |  | X |  |  |  |  |
| FUN_073 | Xem kế hoạch điều phối |  | X |  |  |  |  |
| FUN_074 | Xem tiến độ và kết quả nhiệm vụ |  | X |  |  |  |  |
| FUN_075 | Duyệt hành động của agent |  | X |  |  |  |  |
| FUN_076 | Từ chối hành động của agent |  | X |  |  |  |  |
| FUN_077 | Hoàn tác thao tác nhỏ |  | X |  |  |  |  |
| FUN_078 | Thiết lập agent chủ động |  | X |  |  |  |  |
| FUN_079 | Agent đề xuất chủ động |  |  |  |  |  | SYS_AGENT |
| FUN_080 | Xem lịch sử hành động agent |  | X |  |  |  |  |
| FUN_081 | Thêm khoản chi phí đi làm |  | X |  |  |  |  |
| FUN_082 | Sửa khoản chi phí |  | X |  |  |  |  |
| FUN_083 | Xóa khoản chi phí |  | X |  |  |  |  |
| FUN_084 | Xem danh sách và tổng chi phí |  | X |  |  |  |  |
| FUN_085 | Kiểm tra trần phí |  |  |  |  |  | SYS_AGENT |
| FUN_086 | Gắn chứng từ cho khoản chi |  | X |  |  |  |  |
| FUN_087 | Thêm khoản nợ |  | X |  |  |  |  |
| FUN_088 | Sửa khoản nợ |  | X |  |  |  |  |
| FUN_089 | Ghi lần trả nợ |  | X |  |  |  |  |
| FUN_090 | Xem tiến độ nợ |  | X |  |  |  |  |
| FUN_091 | Mô phỏng kế hoạch trả nợ |  | X |  |  |  |  |
| FUN_092 | Lưu kế hoạch trả nợ |  | X |  |  |  |  |
| FUN_093 | Tạo liên kết cho người thân |  | X |  |  |  |  |
| FUN_094 | Thu hồi liên kết người thân |  | X |  |  |  |  |
| FUN_095 | Xem tiến độ qua liên kết |  |  |  |  | X |  |
| FUN_096 | Xem danh sách liên kết |  | X |  |  |  |  |
| FUN_097 | Quản lý hành lang |  |  |  | X |  |  |
| FUN_098 | Quản lý nguồn luật |  |  |  | X |  |  |
| FUN_099 | Soạn quy tắc luật mới |  |  |  | X |  |  |
| FUN_100 | Sửa quy tắc nháp |  |  |  | X |  |  |
| FUN_101 | Thêm ca kiểm thử quy tắc |  |  |  | X |  |  |
| FUN_102 | Chạy kiểm thử quy tắc |  |  |  | X |  |  |
| FUN_103 | Nộp quy tắc để duyệt |  |  |  | X |  |  |
| FUN_104 | Duyệt quy tắc |  |  |  | X |  |  |
| FUN_105 | Trả lại quy tắc |  |  |  | X |  |  |
| FUN_106 | Phát hành phiên bản Law Pack |  |  |  | X |  |  |
| FUN_107 | Khôi phục phiên bản trước |  |  |  | X |  |  |
| FUN_108 | Xem đề xuất cập nhật luật |  |  |  | X |  |  |
| FUN_109 | Xử lý đề xuất cập nhật luật |  |  |  | X |  |  |
| FUN_110 | Phát hiện thay đổi nguồn luật |  |  |  |  |  | SYS_AGENT |
| FUN_150 | Xem lịch sử phiên bản Law Pack |  |  |  | X |  |  |
| FUN_111 | Tạo Case Pack |  | X |  |  |  |  |
| FUN_112 | Chọn bằng chứng đưa vào Case Pack |  | X |  |  |  |  |
| FUN_113 | Dịch tóm tắt và soạn thư song ngữ |  |  |  |  |  | SYS_AGENT |
| FUN_114 | Xem trước Case Pack |  | X |  |  |  |  |
| FUN_115 | Xuất Case Pack ra PDF |  | X |  |  |  |  |
| FUN_116 | Chia sẻ Case Pack cho tổ chức |  | X |  |  |  |  |
| FUN_117 | Thu hồi chia sẻ |  | X |  |  |  |  |
| FUN_118 | Nhận xử lý case |  |  | X |  |  |  |
| FUN_119 | Xem danh sách case của tổ chức |  |  | X |  |  |  |
| FUN_120 | Xem nội dung case |  |  | X |  |  |  |
| FUN_121 | Ghi chú nội bộ |  |  | X |  |  |  |
| FUN_122 | Gửi đề nghị bổ sung thông tin |  |  | X |  |  |  |
| FUN_123 | Đóng hoặc đổi trạng thái case |  |  | X |  |  |  |
| FUN_124 | Xem thống kê Desk tổng hợp |  |  |  | X |  |  |
| FUN_147 | Kích hoạt tài khoản cán bộ từ lời mời |  |  | X |  |  |  |
| FUN_148 | Xem các chia sẻ Case Pack đang hoạt động |  | X |  |  |  |  |
| FUN_149 | Xem và trả lời đề nghị bổ sung |  | X |  |  |  |  |
| FUN_125 | Quản lý tổ chức hỗ trợ |  |  |  | X |  |  |
| FUN_126 | Mời cán bộ hỗ trợ |  |  |  | X |  |  |
| FUN_127 | Quản lý Quản trị viên |  |  |  | X |  |  |
| FUN_128 | Xem nhật ký kiểm toán |  |  |  | X |  |  |
| FUN_129 | Cấu hình nhà cung cấp |  |  |  | X |  |  |
| FUN_130 | Cấu hình tham số hệ thống và gói dịch vụ |  |  |  | X |  |  |
| FUN_131 | Cấu hình chính sách lưu trữ |  |  |  | X |  |  |
| FUN_132 | Giám sát vận hành |  |  |  | X |  |  |
| FUN_133 | Cấu hình nhắc việc |  | X |  |  |  |  |
| FUN_134 | Xem thông báo |  | X | X |  |  |  |
| FUN_135 | Đánh dấu đã đọc |  | X | X |  |  |  |
| FUN_136 | Gửi thông báo theo lịch |  |  |  |  |  | SYS_SCHED |
| FUN_137 | Báo thay đổi luật liên quan |  |  |  |  |  | SYS_SCHED |
| FUN_138 | Xem và đổi gói dịch vụ |  | X |  |  |  |  |
| FUN_139 | Xem mức sử dụng |  | X |  |  |  |  |
| FUN_140 | Xem nội dung sẽ đóng góp ẩn danh |  | X |  |  |  |  |
| FUN_141 | Tạo bản ghi đóng góp ẩn danh |  |  |  |  |  | SYS_AGENT |
| FUN_142 | Tổng hợp thống kê ẩn danh |  |  |  |  |  | SYS_SCHED |

## 5. Quy tắc phạm vi dữ liệu

| Đối tượng | WRK | SUP | ADM |
|---|---|---|---|
| Tài liệu, giờ làm, kết quả đối chiếu, bằng chứng, chi phí, nợ | Toàn quyền trên dữ liệu của mình | Không, trừ phần trong Case Pack được chia sẻ | Không (BR_005) |
| Case Pack | Tạo, chia sẻ, thu hồi | Xem phần được chia sẻ, còn hạn | Chỉ số liệu tổng hợp |
| Nhật ký truy cập Case Pack | Xem toàn bộ nhật ký của Case Pack mình | Ghi nhận khi thao tác | Không |
| Law Pack, nguồn luật, hành lang | Đọc bản đã phát hành | Đọc bản đã phát hành | Soạn, duyệt, phát hành theo BR_001 |
| Tổ chức, cán bộ, nhà cung cấp, tham số | Không | Chỉ thông tin tổ chức của mình | Quản lý |
| Nhật ký kiểm toán | Không | Không | Chỉ đọc |
