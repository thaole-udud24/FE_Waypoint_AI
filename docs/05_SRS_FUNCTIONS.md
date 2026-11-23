# 05. SRS THEO TỪNG CHỨC NĂNG (Phase 5)

Mỗi chức năng gồm 13 phần: thông tin chung, tiền điều kiện, hậu điều kiện, bảng input, bảng output, luồng chính, luồng thay thế, luồng ngoại lệ, logic nghiệp vụ, quy tắc validation, chuyển trạng thái, phân quyền, tiêu chí chấp nhận (Given–When–Then). Mã trường FLD_ tra cứu tại `06_DATA_DICTIONARY.md`; mã BR_ tại `07_BUSINESS_RULES_WORKFLOW.md`.

## Mục lục

- [MOD_001 – Tài khoản & truy cập](#mod_001-tài-khoản-truy-cập)
- [MOD_002 – Thu nhận tài liệu](#mod_002-thu-nhận-tài-liệu)
- [MOD_003 – Contract DNA](#mod_003-contract-dna)
- [MOD_004 – Work Log](#mod_004-work-log)
- [MOD_005 – PayGuard AI](#mod_005-payguard-ai)
- [MOD_006 – Salary Twin](#mod_006-salary-twin)
- [MOD_007 – Evidence Vault](#mod_007-evidence-vault)
- [MOD_008 – Legal Compass](#mod_008-legal-compass)
- [MOD_009 – Rights Agent](#mod_009-rights-agent)
- [MOD_010 – Cost Ledger](#mod_010-cost-ledger)
- [MOD_011 – Debt & Family](#mod_011-debt-family)
- [MOD_012 – Law Pack Management](#mod_012-law-pack-management)
- [MOD_013 – Case Pack Desk](#mod_013-case-pack-desk)
- [MOD_014 – Quản trị & vận hành](#mod_014-quản-trị-vận-hành)
- [MOD_015 – Thông báo & nhắc việc](#mod_015-thông-báo-nhắc-việc)
- [MOD_016 – Gói dịch vụ](#mod_016-gói-dịch-vụ)
- [MOD_017 – Đóng góp dữ liệu ẩn danh](#mod_017-đóng-góp-dữ-liệu-ẩn-danh)

## MOD_001 – Tài khoản & truy cập

### FUN_001 – Đăng ký tài khoản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_001 |
| Module / Sub-module | MOD_001 / Đăng ký |
| Actor | ACC_GUEST (Khách chưa đăng nhập) |
| Mô tả | Người lao động tạo tài khoản mới để dùng ứng dụng |
| Permission | PER_ACC_REGISTER |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Chưa có tài khoản; đã đọc nội dung quyền riêng tư

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: user_id, account_status, recovery_key_hash
- Trạng thái: (chưa có)→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0002 | Định danh đăng nhập | USER.login_identifier | VARCHAR(120) | Y | — | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |
| FLD_0008 | Tên hiển thị | USER.display_name | VARCHAR(60) | N | — | 1-60 ký tự, không chứa ký tự điều khiển |
| FLD_0009 | Ngôn ngữ giao diện | USER.preferred_language | ENUM(5) | Y | vi | ∈{vi,ja,en} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0001 | Mã người dùng | USER.user_id | UUID(36) | Định danh duy nhất |
| FLD_0007 | Trạng thái tài khoản | USER.account_status | ENUM(12) | Trạng thái hoạt động |
| FLD_0005 | Mã băm khóa khôi phục | USER.recovery_key_hash | CHAR(255) | Khôi phục khi không có email |

**6. Luồng chính**

1. GUEST mở chức năng "Đăng ký tài khoản".
2. Người dùng cung cấp: Định danh đăng nhập, Mật khẩu (nhập), Tên hiển thị, Ngôn ngữ giao diện.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_REGISTER).
4. Kiểm tra định dạng và chưa tồn tại.
5. Băm mật khẩu.
6. Tạo USER role=WRK, plan=FREE.
7. Tạo USER_PROFILE, PRIVACY_SETTING, REMINDER_SETTING, AGENT_SETTING mặc định.
8. Sinh khóa khôi phục hiển thị một lần.
9. Hệ thống trả kết quả: Mã người dùng, Trạng thái tài khoản, Mã băm khóa khôi phục.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Định danh đã tồn tại: báo trùng
- E2: Mật khẩu yếu: yêu cầu nhập lại

**9. Logic nghiệp vụ**

- Kiểm tra định dạng và chưa tồn tại
- Băm mật khẩu
- Tạo USER role=WRK, plan=FREE
- Tạo USER_PROFILE, PRIVACY_SETTING, REMINDER_SETTING, AGENT_SETTING mặc định
- Sinh khóa khôi phục hiển thị một lần
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| login_identifier | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] | Giá trị không hợp lệ: Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| login_identifier | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| display_name | 1-60 ký tự, không chứa ký tự điều khiển | Giá trị không hợp lệ: 1-60 ký tự, không chứa ký tự điều khiển |
| preferred_language | ∈{vi,ja,en} | Giá trị không hợp lệ: ∈{vi,ja,en} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_REGISTER | ACC_GUEST (Khách chưa đăng nhập) | Không truy cập dữ liệu người dùng; chỉ dữ liệu của chính yêu cầu đăng ký/đăng nhập |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_001_01** – Given Chưa có tài khoản; đã đọc nội dung quyền riêng tư, When GUEST thực hiện "Đăng ký tài khoản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi user_id, account_status, recovery_key_hash; trạng thái chuyển (chưa có)→ACTIVE.
- **REQ_001_02** – Given tình huống "Định danh đã tồn tại", When GUEST thực hiện "Đăng ký tài khoản", Then báo trùng.
- **REQ_001_03** – Given tình huống "Mật khẩu yếu", When GUEST thực hiện "Đăng ký tài khoản", Then yêu cầu nhập lại.
- **REQ_001_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_001_05** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_002 – Đăng nhập

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_002 |
| Module / Sub-module | MOD_001 / Đăng nhập |
| Actor | ACC_GUEST (Khách chưa đăng nhập) |
| Mô tả | Xác thực để vào ứng dụng |
| Permission | PER_ACC_LOGIN |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Tài khoản ACTIVE và không bị khóa tạm

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: session_id, role_code, last_login_at
- Trạng thái: Phiên: (chưa có)→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0002 | Định danh đăng nhập | USER.login_identifier | VARCHAR(120) | Y | — | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0047 | Mã phiên | DEVICE_SESSION.session_id | UUID(36) | Định danh |
| FLD_0006 | Mã vai trò | USER.role_code | ENUM(10) | Vai trò của tài khoản |
| FLD_0012 | Lần đăng nhập gần nhất | USER.last_login_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. GUEST mở chức năng "Đăng nhập".
2. Người dùng cung cấp: Định danh đăng nhập, Mật khẩu (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_LOGIN).
4. Tìm tài khoản.
5. Kiểm tra locked_until.
6. So khớp mật khẩu.
7. Sai thì tăng failed_login_count, đủ 5 lần thì đặt locked_until.
8. Đúng thì tạo DEVICE_SESSION, đặt failed_login_count=0.
9. Hệ thống trả kết quả: Mã phiên, Mã vai trò, Lần đăng nhập gần nhất.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Sai thông tin: thông báo chung không nêu trường sai
- E2: Đang khóa tạm: báo thời điểm mở lại
- E3: Tài khoản DELETED: từ chối

**9. Logic nghiệp vụ**

- Tìm tài khoản
- Kiểm tra locked_until
- So khớp mật khẩu
- Sai thì tăng failed_login_count, đủ 5 lần thì đặt locked_until
- Đúng thì tạo DEVICE_SESSION, đặt failed_login_count=0
- BR_036 – Khóa đăng nhập sai: Sai mật khẩu 5 lần liên tiếp thì khóa tạm 15 phút.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| login_identifier | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] | Giá trị không hợp lệ: Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| login_identifier | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| Phiên: (chưa có)→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_LOGIN | ACC_GUEST (Khách chưa đăng nhập) | Không truy cập dữ liệu người dùng; chỉ dữ liệu của chính yêu cầu đăng ký/đăng nhập |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_002_01** – Given Tài khoản ACTIVE và không bị khóa tạm, When GUEST thực hiện "Đăng nhập" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi session_id, role_code, last_login_at; trạng thái chuyển Phiên: (chưa có)→ACTIVE.
- **REQ_002_02** – Given tình huống "Sai thông tin", When GUEST thực hiện "Đăng nhập", Then thông báo chung không nêu trường sai.
- **REQ_002_03** – Given tình huống "Đang khóa tạm", When GUEST thực hiện "Đăng nhập", Then báo thời điểm mở lại.
- **REQ_002_04** – Given tình huống "Tài khoản DELETED", When GUEST thực hiện "Đăng nhập", Then từ chối.
- **REQ_002_05** – Given quy tắc BR_036 (Khóa đăng nhập sai), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_003 – Đăng xuất

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_003 |
| Module / Sub-module | MOD_001 / Đăng nhập |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) |
| Mô tả | Kết thúc phiên trên thiết bị hiện tại |
| Permission | PER_ACC_LOGOUT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đang có phiên ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: session_status
- Trạng thái: ACTIVE→REVOKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0047 | Mã phiên | DEVICE_SESSION.session_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0052 | Trạng thái phiên | DEVICE_SESSION.session_status | ENUM(8) | Trạng thái phiên |

**6. Luồng chính**

1. WRK mở chức năng "Đăng xuất".
2. Người dùng cung cấp: Mã phiên.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_LOGOUT).
4. Đặt session_status=REVOKED.
5. Xóa token cục bộ.
6. Hệ thống trả kết quả: Trạng thái phiên.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Phiên đã hết hạn: coi như đã đăng xuất

**9. Logic nghiệp vụ**

- Đặt session_status=REVOKED
- Xóa token cục bộ
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→REVOKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_LOGOUT | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021); Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_003_01** – Given Đang có phiên ACTIVE, When WRK thực hiện "Đăng xuất" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi session_status; trạng thái chuyển ACTIVE→REVOKED.
- **REQ_003_02** – Given tình huống "Phiên đã hết hạn", When WRK thực hiện "Đăng xuất", Then coi như đã đăng xuất.
- **REQ_003_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_004 – Khôi phục tài khoản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_004 |
| Module / Sub-module | MOD_001 / Khôi phục |
| Actor | ACC_GUEST (Khách chưa đăng nhập) |
| Mô tả | Đặt lại mật khẩu bằng khóa khôi phục khi quên mật khẩu |
| Permission | PER_ACC_RECOVER |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Có khóa khôi phục hợp lệ [CẦN XÁC NHẬN cơ chế]

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: account_status
- Trạng thái: LOCKED/ACTIVE→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0002 | Định danh đăng nhập | USER.login_identifier | VARCHAR(120) | Y | — | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| FLD_0005 | Mã băm khóa khôi phục | USER.recovery_key_hash | CHAR(255) | N | — | Sinh khi đăng ký [CẦN XÁC NHẬN cơ chế khôi phục] |
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0007 | Trạng thái tài khoản | USER.account_status | ENUM(12) | Trạng thái hoạt động |

**6. Luồng chính**

1. GUEST mở chức năng "Khôi phục tài khoản".
2. Người dùng cung cấp: Định danh đăng nhập, Mã băm khóa khôi phục, Mật khẩu (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_RECOVER).
4. So khớp mã băm khóa khôi phục.
5. Đặt mật khẩu mới.
6. Thu hồi mọi phiên.
7. Sinh khóa khôi phục mới.
8. Hệ thống trả kết quả: Trạng thái tài khoản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Khóa sai: tính vào số lần thử
- E2: Mất khóa: không khôi phục được dữ liệu mã hóa cục bộ

**9. Logic nghiệp vụ**

- So khớp mã băm khóa khôi phục
- Đặt mật khẩu mới
- Thu hồi mọi phiên
- Sinh khóa khôi phục mới
- BR_036 – Khóa đăng nhập sai: Sai mật khẩu 5 lần liên tiếp thì khóa tạm 15 phút.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| login_identifier | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] | Giá trị không hợp lệ: Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| login_identifier | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| recovery_key_hash | Sinh khi đăng ký [CẦN XÁC NHẬN cơ chế khôi phục] | Giá trị không hợp lệ: Sinh khi đăng ký [CẦN XÁC NHẬN cơ chế khôi phục] |
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| LOCKED/ACTIVE→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_RECOVER | ACC_GUEST (Khách chưa đăng nhập) | Không truy cập dữ liệu người dùng; chỉ dữ liệu của chính yêu cầu đăng ký/đăng nhập |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_004_01** – Given Có khóa khôi phục hợp lệ [CẦN XÁC NHẬN cơ chế], When GUEST thực hiện "Khôi phục tài khoản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi account_status; trạng thái chuyển LOCKED/ACTIVE→ACTIVE.
- **REQ_004_02** – Given tình huống "Khóa sai", When GUEST thực hiện "Khôi phục tài khoản", Then tính vào số lần thử.
- **REQ_004_03** – Given tình huống "Mất khóa", When GUEST thực hiện "Khôi phục tài khoản", Then không khôi phục được dữ liệu mã hóa cục bộ.
- **REQ_004_04** – Given quy tắc BR_036 (Khóa đăng nhập sai), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_005 – Đổi mật khẩu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_005 |
| Module / Sub-module | MOD_001 / Bảo mật |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) |
| Mô tả | Đổi mật khẩu khi đang đăng nhập |
| Permission | PER_ACC_PWD |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0016 | Cập nhật lúc | USER.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Đổi mật khẩu".
2. Người dùng cung cấp: Mật khẩu (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_PWD).
4. Yêu cầu nhập lại mật khẩu cũ.
5. Băm mật khẩu mới.
6. Thu hồi các phiên khác.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mật khẩu cũ sai: tính vào số lần thử

**9. Logic nghiệp vụ**

- Yêu cầu nhập lại mật khẩu cũ
- Băm mật khẩu mới
- Thu hồi các phiên khác
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_PWD | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021); Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_005_01** – Given Đã đăng nhập, When WRK thực hiện "Đổi mật khẩu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_005_02** – Given tình huống "Mật khẩu cũ sai", When WRK thực hiện "Đổi mật khẩu", Then tính vào số lần thử.
- **REQ_005_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_006 – Cập nhật hồ sơ nơi làm việc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_006 |
| Module / Sub-module | MOD_001 / Hồ sơ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Khai báo nước, tỉnh, chủ sử dụng, ngày trả lương để chọn đúng quy tắc luật |
| Permission | PER_ACC_PROFILE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0018 | Nước làm việc | USER_PROFILE.work_country_code | ENUM(2) | Y | JP | ∈{JP} (mở rộng theo hành lang) |
| FLD_0019 | Nước gửi | USER_PROFILE.origin_country_code | ENUM(2) | Y | VN | ∈{VN} |
| FLD_0020 | Tỉnh nơi làm việc | USER_PROFILE.work_prefecture_code | VARCHAR(2) | Y | — | Mã tỉnh Nhật 01-47 |
| FLD_0021 | Tên chủ sử dụng lao động | USER_PROFILE.employer_name | VARCHAR(120) | N | — | 0-120 ký tự |
| FLD_0022 | Ngành nghề | USER_PROFILE.job_category | VARCHAR(60) | N | — | 0-60 ký tự |
| FLD_0023 | Ngày bắt đầu làm việc | USER_PROFILE.employment_start_date | DATE | N | — | Không sau hôm nay |
| FLD_0024 | Ngày trả lương hằng tháng | USER_PROFILE.wage_pay_day | INTEGER | N | — | 1-31 |
| FLD_0025 | Tiền tệ về nước | USER_PROFILE.home_currency_code | ENUM(3) | Y | VND | ∈{VND} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0027 | Cập nhật lúc | USER_PROFILE.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Cập nhật hồ sơ nơi làm việc".
2. Người dùng cung cấp: Nước làm việc, Nước gửi, Tỉnh nơi làm việc, Tên chủ sử dụng lao động, Ngành nghề, Ngày bắt đầu làm việc, Ngày trả lương hằng tháng, Tiền tệ về nước.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_PROFILE).
4. Kiểm tra mã tỉnh.
5. Lưu.
6. Nếu đổi tỉnh thì cảnh báo kỳ đã đối chiếu cần chạy lại.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tỉnh không hợp lệ: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra mã tỉnh
- Lưu
- Nếu đổi tỉnh thì cảnh báo kỳ đã đối chiếu cần chạy lại
- BR_012 – Lương tối thiểu theo tỉnh: Mức lương giờ tối thiểu lấy theo tỉnh nơi làm việc và ngày hiệu lực từ Law Pack.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| work_country_code | ∈{JP} (mở rộng theo hành lang) | Giá trị không hợp lệ: ∈{JP} (mở rộng theo hành lang) |
| origin_country_code | ∈{VN} | Giá trị không hợp lệ: ∈{VN} |
| work_prefecture_code | Mã tỉnh Nhật 01-47 | Giá trị không hợp lệ: Mã tỉnh Nhật 01-47 |
| work_prefecture_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| employer_name | 0-120 ký tự | Giá trị không hợp lệ: 0-120 ký tự |
| job_category | 0-60 ký tự | Giá trị không hợp lệ: 0-60 ký tự |
| employment_start_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| wage_pay_day | 1-31 | Giá trị không hợp lệ: 1-31 |
| home_currency_code | ∈{VND} | Giá trị không hợp lệ: ∈{VND} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_PROFILE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_006_01** – Given Đã đăng nhập, When WRK thực hiện "Cập nhật hồ sơ nơi làm việc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_006_02** – Given tình huống "Tỉnh không hợp lệ", When WRK thực hiện "Cập nhật hồ sơ nơi làm việc", Then từ chối.
- **REQ_006_03** – Given quy tắc BR_012 (Lương tối thiểu theo tỉnh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_006_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_007 – Đặt khóa ứng dụng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_007 |
| Module / Sub-module | MOD_001 / Riêng tư |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chọn khóa bằng PIN hoặc sinh trắc học và thời gian tự khóa |
| Permission | PER_PRV_LOCK |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pin_hash

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0029 | Kiểu khóa ứng dụng | PRIVACY_SETTING.app_lock_type | ENUM(10) | Y | NONE | ∈{NONE,PIN,BIOMETRIC} |
| FLD_0030 | Mã PIN (nhập) | PRIVACY_SETTING.pin_input | VARCHAR(8) | N | — | 4-8 chữ số; bắt buộc khi kiểu=PIN |
| FLD_0032 | Tự khóa sau (giây) | PRIVACY_SETTING.auto_lock_seconds | INTEGER | Y | 60 | ∈{0,30,60,300} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0031 | Mã băm PIN | PRIVACY_SETTING.pin_hash | CHAR(255) | Lưu trên thiết bị |

**6. Luồng chính**

1. WRK mở chức năng "Đặt khóa ứng dụng".
2. Người dùng cung cấp: Kiểu khóa ứng dụng, Mã PIN (nhập), Tự khóa sau (giây).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PRV_LOCK).
4. Kiểm tra PIN.
5. Băm PIN và lưu trên thiết bị.
6. Lưu kiểu khóa và thời gian tự khóa.
7. Hệ thống trả kết quả: Mã băm PIN.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: PIN không đúng định dạng: từ chối
- E2: Thiết bị không hỗ trợ sinh trắc: gợi ý PIN

**9. Logic nghiệp vụ**

- Kiểm tra PIN
- Băm PIN và lưu trên thiết bị
- Lưu kiểu khóa và thời gian tự khóa
- BR_033 – Chế độ kín đáo: Khi bật, tên và biểu tượng ứng dụng, nội dung thông báo được thay bằng nội dung trung tính.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| app_lock_type | ∈{NONE,PIN,BIOMETRIC} | Giá trị không hợp lệ: ∈{NONE,PIN,BIOMETRIC} |
| pin_input | 4-8 chữ số; bắt buộc khi kiểu=PIN | Giá trị không hợp lệ: 4-8 chữ số; bắt buộc khi kiểu=PIN |
| auto_lock_seconds | ∈{0,30,60,300} | Giá trị không hợp lệ: ∈{0,30,60,300} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PRV_LOCK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_007_01** – Given Đã đăng nhập, When WRK thực hiện "Đặt khóa ứng dụng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pin_hash.
- **REQ_007_02** – Given tình huống "PIN không đúng định dạng", When WRK thực hiện "Đặt khóa ứng dụng", Then từ chối.
- **REQ_007_03** – Given tình huống "Thiết bị không hỗ trợ sinh trắc", When WRK thực hiện "Đặt khóa ứng dụng", Then gợi ý PIN.
- **REQ_007_04** – Given quy tắc BR_033 (Chế độ kín đáo), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_008 – Bật chế độ kín đáo

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_008 |
| Module / Sub-module | MOD_001 / Riêng tư |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đổi tên, biểu tượng ứng dụng và ẩn nội dung thông báo |
| Permission | PER_PRV_STEALTH |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: stealth_enabled

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0033 | Bật chế độ kín đáo | PRIVACY_SETTING.stealth_enabled | BOOLEAN | Y | false | — |
| FLD_0034 | Tên ứng dụng hiển thị | PRIVACY_SETTING.stealth_app_name | VARCHAR(30) | N | — | Chọn từ danh sách tên trung tính |
| FLD_0035 | Biểu tượng hiển thị | PRIVACY_SETTING.stealth_icon_code | VARCHAR(20) | N | — | Chọn từ danh sách biểu tượng trung tính |
| FLD_0036 | Ẩn nội dung thông báo | PRIVACY_SETTING.hide_notification_content | BOOLEAN | Y | true | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0033 | Bật chế độ kín đáo | PRIVACY_SETTING.stealth_enabled | BOOLEAN | Đổi tên và biểu tượng trung tính |

**6. Luồng chính**

1. WRK mở chức năng "Bật chế độ kín đáo".
2. Người dùng cung cấp: Bật chế độ kín đáo, Tên ứng dụng hiển thị, Biểu tượng hiển thị, Ẩn nội dung thông báo.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PRV_STEALTH).
4. Lưu thiết lập.
5. Áp dụng tên, biểu tượng trên thiết bị.
6. Chuyển thông báo sang nội dung trung tính.
7. Hệ thống trả kết quả: Bật chế độ kín đáo.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hệ điều hành không cho đổi biểu tượng: chỉ ẩn nội dung thông báo

**9. Logic nghiệp vụ**

- Lưu thiết lập
- Áp dụng tên, biểu tượng trên thiết bị
- Chuyển thông báo sang nội dung trung tính
- BR_033 – Chế độ kín đáo: Khi bật, tên và biểu tượng ứng dụng, nội dung thông báo được thay bằng nội dung trung tính.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| stealth_app_name | Chọn từ danh sách tên trung tính | Giá trị không hợp lệ: Chọn từ danh sách tên trung tính |
| stealth_icon_code | Chọn từ danh sách biểu tượng trung tính | Giá trị không hợp lệ: Chọn từ danh sách biểu tượng trung tính |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PRV_STEALTH | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_008_01** – Given Đã đăng nhập, When WRK thực hiện "Bật chế độ kín đáo" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi stealth_enabled.
- **REQ_008_02** – Given tình huống "Hệ điều hành không cho đổi biểu tượng", When WRK thực hiện "Bật chế độ kín đáo", Then chỉ ẩn nội dung thông báo.
- **REQ_008_03** – Given quy tắc BR_033 (Chế độ kín đáo), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_009 – Xóa nhanh dữ liệu trên thiết bị

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_009 |
| Module / Sub-module | MOD_001 / Riêng tư |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa toàn bộ dữ liệu cục bộ khi gặp tình huống khẩn |
| Permission | PER_PRV_WIPE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- panic_wipe_enabled=true

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: account_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0037 | Bật xóa nhanh | PRIVACY_SETTING.panic_wipe_enabled | BOOLEAN | Y | false | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0007 | Trạng thái tài khoản | USER.account_status | ENUM(12) | Trạng thái hoạt động |

**6. Luồng chính**

1. WRK mở chức năng "Xóa nhanh dữ liệu trên thiết bị".
2. Người dùng cung cấp: Bật xóa nhanh.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PRV_WIPE).
4. Yêu cầu thao tác xác nhận kép.
5. Xóa kho cục bộ và khóa.
6. Thu hồi phiên thiết bị.
7. Bản sao máy chủ xử lý theo quy định.
8. Hệ thống trả kết quả: Trạng thái tài khoản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mất kết nối: xóa cục bộ trước, thu hồi phiên khi có mạng

**9. Logic nghiệp vụ**

- Yêu cầu thao tác xác nhận kép
- Xóa kho cục bộ và khóa
- Thu hồi phiên thiết bị
- Bản sao máy chủ xử lý theo quy định
- BR_034 – Xóa nhanh: Thao tác xóa nhanh xóa dữ liệu cục bộ trên thiết bị; xử lý bản sao trên máy chủ cần xác nhận thêm.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PRV_WIPE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_009_01** – Given panic_wipe_enabled=true, When WRK thực hiện "Xóa nhanh dữ liệu trên thiết bị" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi account_status.
- **REQ_009_02** – Given tình huống "Mất kết nối", When WRK thực hiện "Xóa nhanh dữ liệu trên thiết bị", Then xóa cục bộ trước, thu hồi phiên khi có mạng.
- **REQ_009_03** – Given quy tắc BR_034 (Xóa nhanh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_010 – Quản lý đồng ý theo mục đích

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_010 |
| Module / Sub-module | MOD_001 / Đồng ý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Bật hoặc rút đồng ý riêng cho từng mục đích |
| Permission | PER_CON_MANAGE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: consent_version, granted_at, withdrawn_at
- Trạng thái: granted: false↔true

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0042 | Mục đích | CONSENT.purpose_code | ENUM(20) | Y | — | ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} |
| FLD_0043 | Đã đồng ý | CONSENT.granted | BOOLEAN | Y | false | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0044 | Phiên bản nội dung đồng ý | CONSENT.consent_version | VARCHAR(10) | Nội dung đồng ý người dùng đã thấy |
| FLD_0045 | Thời điểm đồng ý | CONSENT.granted_at | TIMESTAMP | Lần đồng ý gần nhất |
| FLD_0046 | Thời điểm rút đồng ý | CONSENT.withdrawn_at | TIMESTAMP | Lần rút gần nhất |

**6. Luồng chính**

1. WRK mở chức năng "Quản lý đồng ý theo mục đích".
2. Người dùng cung cấp: Mục đích, Đã đồng ý.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CON_MANAGE).
4. Hiển thị nội dung đồng ý theo mục đích.
5. Ghi nhận đồng ý hoặc rút.
6. Rút đồng ý chia sẻ thì không thu hồi chia sẻ đang có (người dùng thu hồi riêng).
7. Hệ thống trả kết quả: Phiên bản nội dung đồng ý, Thời điểm đồng ý, Thời điểm rút đồng ý.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Rút đồng ý ANON_CONTRIBUTION: ngừng đóng góp mới, không xóa bản ghi đã ẩn danh

**9. Logic nghiệp vụ**

- Hiển thị nội dung đồng ý theo mục đích
- Ghi nhận đồng ý hoặc rút
- Rút đồng ý chia sẻ thì không thu hồi chia sẻ đang có (người dùng thu hồi riêng)
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| purpose_code | ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} | Giá trị không hợp lệ: ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} |
| purpose_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| granted: false↔true |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CON_MANAGE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_010_01** – Given Đã đăng nhập, When WRK thực hiện "Quản lý đồng ý theo mục đích" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi consent_version, granted_at, withdrawn_at; trạng thái chuyển granted: false↔true.
- **REQ_010_02** – Given tình huống "Rút đồng ý ANON_CONTRIBUTION", When WRK thực hiện "Quản lý đồng ý theo mục đích", Then ngừng đóng góp mới, không xóa bản ghi đã ẩn danh.
- **REQ_010_03** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_010_04** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_011 – Quản lý phiên thiết bị

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_011 |
| Module / Sub-module | MOD_001 / Phiên |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) |
| Mô tả | Xem và thu hồi các phiên đăng nhập |
| Permission | PER_ACC_SESSION |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: device_label, platform_code, last_active_at, session_status
- Trạng thái: ACTIVE→REVOKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0047 | Mã phiên | DEVICE_SESSION.session_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0049 | Tên thiết bị | DEVICE_SESSION.device_label | VARCHAR(60) | Ví dụ model điện thoại |
| FLD_0050 | Nền tảng | DEVICE_SESSION.platform_code | ENUM(8) | Loại thiết bị |
| FLD_0053 | Hoạt động gần nhất | DEVICE_SESSION.last_active_at | TIMESTAMP | Theo giờ UTC |
| FLD_0052 | Trạng thái phiên | DEVICE_SESSION.session_status | ENUM(8) | Trạng thái phiên |

**6. Luồng chính**

1. WRK mở chức năng "Quản lý phiên thiết bị".
2. Người dùng cung cấp: Mã phiên.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_SESSION).
4. Liệt kê phiên của chính tài khoản.
5. Thu hồi phiên được chọn.
6. Hệ thống trả kết quả: Tên thiết bị, Nền tảng, Hoạt động gần nhất, Trạng thái phiên.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thu hồi phiên hiện tại: tương đương đăng xuất

**9. Logic nghiệp vụ**

- Liệt kê phiên của chính tài khoản
- Thu hồi phiên được chọn
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→REVOKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_SESSION | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021); Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_011_01** – Given Đã đăng nhập, When WRK thực hiện "Quản lý phiên thiết bị" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi device_label, platform_code, last_active_at, session_status; trạng thái chuyển ACTIVE→REVOKED.
- **REQ_011_02** – Given tình huống "Thu hồi phiên hiện tại", When WRK thực hiện "Quản lý phiên thiết bị", Then tương đương đăng xuất.
- **REQ_011_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_012 – Xóa tài khoản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_012 |
| Module / Sub-module | MOD_001 / Tài khoản |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa tài khoản và dữ liệu cá nhân |
| Permission | PER_ACC_DELETE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập; xác nhận mật khẩu

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: account_status
- Trạng thái: ACTIVE→DELETED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0007 | Trạng thái tài khoản | USER.account_status | ENUM(12) | Trạng thái hoạt động |

**6. Luồng chính**

1. WRK mở chức năng "Xóa tài khoản".
2. Người dùng cung cấp: Mật khẩu (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_DELETE).
4. Xác nhận mật khẩu.
5. Thu hồi mọi chia sẻ và liên kết người thân.
6. Xóa dữ liệu theo chính sách lưu trữ.
7. Đặt DELETED.
8. Hệ thống trả kết quả: Trạng thái tài khoản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Còn Case Pack đang chia sẻ: thông báo sẽ thu hồi

**9. Logic nghiệp vụ**

- Xác nhận mật khẩu
- Thu hồi mọi chia sẻ và liên kết người thân
- Xóa dữ liệu theo chính sách lưu trữ
- Đặt DELETED
- BR_035 – Xóa tài khoản: Xóa tài khoản xóa dữ liệu người dùng và thu hồi mọi chia sẻ; nhật ký kiểm toán giữ theo chính sách lưu trữ.
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→DELETED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_012_01** – Given Đã đăng nhập; xác nhận mật khẩu, When WRK thực hiện "Xóa tài khoản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi account_status; trạng thái chuyển ACTIVE→DELETED.
- **REQ_012_02** – Given tình huống "Còn Case Pack đang chia sẻ", When WRK thực hiện "Xóa tài khoản", Then thông báo sẽ thu hồi.
- **REQ_012_03** – Given quy tắc BR_035 (Xóa tài khoản), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_012_04** – Given quy tắc BR_019 (Thu hồi chia sẻ có hiệu lực ngay), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_013 – Xuất dữ liệu cá nhân

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_013 |
| Module / Sub-module | MOD_001 / Tài khoản |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tải toàn bộ dữ liệu của chính mình |
| Permission | PER_ACC_EXPORT |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: file_ref

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0001 | Mã người dùng | USER.user_id | UUID(36) | Y | — | Sinh tự động |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0060 | Khóa lưu tệp mã hóa | DOCUMENT.file_ref | VARCHAR(255) | Tham chiếu kho lưu trữ |

**6. Luồng chính**

1. WRK mở chức năng "Xuất dữ liệu cá nhân".
2. Người dùng cung cấp: Mã người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_EXPORT).
4. Tập hợp dữ liệu chủ sở hữu=user.
5. Đóng gói tệp.
6. Trả liên kết tải có thời hạn.
7. Hệ thống trả kết quả: Khóa lưu tệp mã hóa.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Dữ liệu lớn: xử lý nền và thông báo khi xong

**9. Logic nghiệp vụ**

- Tập hợp dữ liệu chủ sở hữu=user
- Đóng gói tệp
- Trả liên kết tải có thời hạn
- BR_049 – Xuất dữ liệu cá nhân: Người dùng xuất được toàn bộ dữ liệu của mình ở định dạng đọc được; tệp xuất chỉ chứa dữ liệu của chính họ.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| user_id | Sinh tự động | Giá trị không hợp lệ: Sinh tự động |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_EXPORT | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_013_01** – Given Đã đăng nhập, When WRK thực hiện "Xuất dữ liệu cá nhân" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi file_ref.
- **REQ_013_02** – Given tình huống "Dữ liệu lớn", When WRK thực hiện "Xuất dữ liệu cá nhân", Then xử lý nền và thông báo khi xong.
- **REQ_013_03** – Given quy tắc BR_049 (Xuất dữ liệu cá nhân), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_013_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_014 – Chọn ngôn ngữ giao diện

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_014 |
| Module / Sub-module | MOD_001 / Hồ sơ |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) |
| Mô tả | Đổi ngôn ngữ hiển thị |
| Permission | PER_ACC_LANG |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0009 | Ngôn ngữ giao diện | USER.preferred_language | ENUM(5) | Y | vi | ∈{vi,ja,en} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0016 | Cập nhật lúc | USER.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Chọn ngôn ngữ giao diện".
2. Người dùng cung cấp: Ngôn ngữ giao diện.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ACC_LANG).
4. Lưu ngôn ngữ.
5. Tải gói chuỗi tương ứng.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Ngôn ngữ chưa có bản dịch: dùng tiếng Việt

**9. Logic nghiệp vụ**

- Lưu ngôn ngữ
- Tải gói chuỗi tương ứng

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| preferred_language | ∈{vi,ja,en} | Giá trị không hợp lệ: ∈{vi,ja,en} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ACC_LANG | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) / ROLE_ADM (Quản trị viên) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021); Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_014_01** – Given Đã đăng nhập, When WRK thực hiện "Chọn ngôn ngữ giao diện" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_014_02** – Given tình huống "Ngôn ngữ chưa có bản dịch", When WRK thực hiện "Chọn ngôn ngữ giao diện", Then dùng tiếng Việt.

### FUN_015 – Mở khóa ứng dụng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_015 |
| Module / Sub-module | MOD_001 / Riêng tư |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập PIN hoặc sinh trắc để mở ứng dụng |
| Permission | PER_PRV_UNLOCK |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- app_lock_type khác NONE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: app_lock_type

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0030 | Mã PIN (nhập) | PRIVACY_SETTING.pin_input | VARCHAR(8) | N | — | 4-8 chữ số; bắt buộc khi kiểu=PIN |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0029 | Kiểu khóa ứng dụng | PRIVACY_SETTING.app_lock_type | ENUM(10) | Cách mở ứng dụng |

**6. Luồng chính**

1. WRK mở chức năng "Mở khóa ứng dụng".
2. Người dùng cung cấp: Mã PIN (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PRV_UNLOCK).
4. So khớp mã băm PIN cục bộ.
5. Mở giao diện.
6. Đếm sai và tăng thời gian chờ.
7. Hệ thống trả kết quả: Kiểu khóa ứng dụng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Sai nhiều lần: tăng thời gian chờ
- E2: có thể đăng nhập lại

**9. Logic nghiệp vụ**

- So khớp mã băm PIN cục bộ
- Mở giao diện
- Đếm sai và tăng thời gian chờ
- BR_033 – Chế độ kín đáo: Khi bật, tên và biểu tượng ứng dụng, nội dung thông báo được thay bằng nội dung trung tính.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| pin_input | 4-8 chữ số; bắt buộc khi kiểu=PIN | Giá trị không hợp lệ: 4-8 chữ số; bắt buộc khi kiểu=PIN |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PRV_UNLOCK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_015_01** – Given app_lock_type khác NONE, When WRK thực hiện "Mở khóa ứng dụng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi app_lock_type.
- **REQ_015_02** – Given tình huống "Sai nhiều lần", When WRK thực hiện "Mở khóa ứng dụng", Then tăng thời gian chờ.
- **REQ_015_03** – Given tình huống "có thể đăng nhập lại", When WRK thực hiện "Mở khóa ứng dụng", Then hệ thống từ chối và nêu lý do.
- **REQ_015_04** – Given quy tắc BR_033 (Chế độ kín đáo), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_143 – Bật đồng bộ mã hóa

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_143 |
| Module / Sub-module | MOD_001 / Đồng bộ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đặt cụm mật khẩu đồng bộ trên thiết bị |
| Permission | PER_SYNC_MANAGE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đồng ý SYNC

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: granted

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0550 | Cụm mật khẩu đồng bộ | SYNC_BACKUP.sync_passphrase | VARCHAR(64) | Y | — | ≥ 10 ký tự; không gửi lên máy chủ |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0043 | Đã đồng ý | CONSENT.granted | BOOLEAN | Trạng thái hiện tại |

**6. Luồng chính**

1. WRK mở chức năng "Bật đồng bộ mã hóa".
2. Người dùng cung cấp: Cụm mật khẩu đồng bộ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYNC_MANAGE).
4. Sinh khóa từ cụm mật khẩu trên thiết bị.
5. Không gửi cụm mật khẩu lên máy chủ.
6. Cảnh báo không thể khôi phục nếu quên.
7. Hệ thống trả kết quả: Đã đồng ý.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Cụm mật khẩu yếu: từ chối

**9. Logic nghiệp vụ**

- Sinh khóa từ cụm mật khẩu trên thiết bị
- Không gửi cụm mật khẩu lên máy chủ
- Cảnh báo không thể khôi phục nếu quên
- BR_045 – Đồng bộ mã hóa đầu cuối: Dữ liệu đồng bộ mã hóa trên thiết bị; máy chủ không giữ khóa; quên cụm mật khẩu thì không khôi phục được.
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| sync_passphrase | ≥ 10 ký tự; không gửi lên máy chủ | Giá trị không hợp lệ: ≥ 10 ký tự; không gửi lên máy chủ |
| sync_passphrase | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYNC_MANAGE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_143_01** – Given Đã đồng ý SYNC, When WRK thực hiện "Bật đồng bộ mã hóa" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi granted.
- **REQ_143_02** – Given tình huống "Cụm mật khẩu yếu", When WRK thực hiện "Bật đồng bộ mã hóa", Then từ chối.
- **REQ_143_03** – Given quy tắc BR_045 (Đồng bộ mã hóa đầu cuối), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_143_04** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_144 – Sao lưu mã hóa

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_144 |
| Module / Sub-module | MOD_001 / Đồng bộ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Mã hóa và tải bản sao lưu |
| Permission | PER_SYNC_MANAGE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã bật đồng bộ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: backup_id, blob_hash, size_bytes, backup_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0550 | Cụm mật khẩu đồng bộ | SYNC_BACKUP.sync_passphrase | VARCHAR(64) | Y | — | ≥ 10 ký tự; không gửi lên máy chủ |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0548 | Mã bản sao lưu | SYNC_BACKUP.backup_id | UUID(36) | Định danh |
| FLD_0552 | Mã băm dữ liệu | SYNC_BACKUP.blob_hash | CHAR(64) | Kiểm tra toàn vẹn |
| FLD_0553 | Dung lượng (byte) | SYNC_BACKUP.size_bytes | INTEGER | Kích thước |
| FLD_0554 | Trạng thái | SYNC_BACKUP.backup_status | ENUM(8) | Trạng thái |

**6. Luồng chính**

1. WRK mở chức năng "Sao lưu mã hóa".
2. Người dùng cung cấp: Cụm mật khẩu đồng bộ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYNC_MANAGE).
4. Mã hóa dữ liệu cục bộ.
5. Tải bản mã.
6. Lưu mã băm.
7. Máy chủ không giải mã được.
8. Hệ thống trả kết quả: Mã bản sao lưu, Mã băm dữ liệu, Dung lượng (byte), Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mất mạng: thử lại khi có mạng

**9. Logic nghiệp vụ**

- Mã hóa dữ liệu cục bộ
- Tải bản mã
- Lưu mã băm
- Máy chủ không giải mã được
- BR_045 – Đồng bộ mã hóa đầu cuối: Dữ liệu đồng bộ mã hóa trên thiết bị; máy chủ không giữ khóa; quên cụm mật khẩu thì không khôi phục được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| sync_passphrase | ≥ 10 ký tự; không gửi lên máy chủ | Giá trị không hợp lệ: ≥ 10 ký tự; không gửi lên máy chủ |
| sync_passphrase | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYNC_MANAGE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_144_01** – Given Đã bật đồng bộ, When WRK thực hiện "Sao lưu mã hóa" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi backup_id, blob_hash, size_bytes, backup_status.
- **REQ_144_02** – Given tình huống "Mất mạng", When WRK thực hiện "Sao lưu mã hóa", Then thử lại khi có mạng.
- **REQ_144_03** – Given quy tắc BR_045 (Đồng bộ mã hóa đầu cuối), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_145 – Khôi phục từ bản sao lưu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_145 |
| Module / Sub-module | MOD_001 / Đồng bộ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tải bản mã và giải mã trên thiết bị mới |
| Permission | PER_SYNC_MANAGE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có bản sao lưu ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: blob_hash

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0548 | Mã bản sao lưu | SYNC_BACKUP.backup_id | UUID(36) | Y | — | — |
| FLD_0550 | Cụm mật khẩu đồng bộ | SYNC_BACKUP.sync_passphrase | VARCHAR(64) | Y | — | ≥ 10 ký tự; không gửi lên máy chủ |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0552 | Mã băm dữ liệu | SYNC_BACKUP.blob_hash | CHAR(64) | Kiểm tra toàn vẹn |

**6. Luồng chính**

1. WRK mở chức năng "Khôi phục từ bản sao lưu".
2. Người dùng cung cấp: Mã bản sao lưu, Cụm mật khẩu đồng bộ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYNC_MANAGE).
4. Tải bản mã.
5. Kiểm tra mã băm.
6. Giải mã bằng cụm mật khẩu trên thiết bị.
7. Hệ thống trả kết quả: Mã băm dữ liệu.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Cụm mật khẩu sai: không giải mã được, không có cách khôi phục từ máy chủ

**9. Logic nghiệp vụ**

- Tải bản mã
- Kiểm tra mã băm
- Giải mã bằng cụm mật khẩu trên thiết bị
- BR_045 – Đồng bộ mã hóa đầu cuối: Dữ liệu đồng bộ mã hóa trên thiết bị; máy chủ không giữ khóa; quên cụm mật khẩu thì không khôi phục được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| sync_passphrase | ≥ 10 ký tự; không gửi lên máy chủ | Giá trị không hợp lệ: ≥ 10 ký tự; không gửi lên máy chủ |
| sync_passphrase | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYNC_MANAGE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_145_01** – Given Có bản sao lưu ACTIVE, When WRK thực hiện "Khôi phục từ bản sao lưu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi blob_hash.
- **REQ_145_02** – Given tình huống "Cụm mật khẩu sai", When WRK thực hiện "Khôi phục từ bản sao lưu", Then không giải mã được, không có cách khôi phục từ máy chủ.
- **REQ_145_03** – Given quy tắc BR_045 (Đồng bộ mã hóa đầu cuối), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_002 – Thu nhận tài liệu

### FUN_016 – Chụp hoặc tải tài liệu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_016 |
| Module / Sub-module | MOD_002 / Tải tài liệu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chụp ảnh hoặc chọn tệp hợp đồng, phiếu lương, sao kê |
| Permission | PER_DOC_UPLOAD |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: document_id, file_hash, ocr_status
- Trạng thái: (chưa có)→PENDING

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0058 | Loại tài liệu | DOCUMENT.document_type | ENUM(16) | Y | — | ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} |
| FLD_0059 | Tệp tải lên | DOCUMENT.upload_file | FILE | Y | — | JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc |
| FLD_0066 | Kỳ lương (YYYY-MM) | DOCUMENT.period_month | VARCHAR(7) | N | — | Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Định danh |
| FLD_0061 | Mã băm nội dung | DOCUMENT.file_hash | CHAR(64) | Dùng chống sửa đổi |
| FLD_0069 | Trạng thái đọc OCR | DOCUMENT.ocr_status | ENUM(10) | Kết quả đọc |

**6. Luồng chính**

1. WRK mở chức năng "Chụp hoặc tải tài liệu".
2. Người dùng cung cấp: Loại tài liệu, Tệp tải lên, Kỳ lương (YYYY-MM).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_UPLOAD).
4. Kiểm tra loại và kích thước.
5. Quét mã độc.
6. Mã hóa và lưu.
7. Tính mã băm.
8. Tạo DOCUMENT.
9. Đưa vào hàng đợi đọc OCR.
10. Hệ thống trả kết quả: Mã tài liệu, Mã băm nội dung, Trạng thái đọc OCR.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tệp sai loại hoặc quá lớn: từ chối
- E2: Phát hiện mã độc: từ chối và không lưu

**9. Logic nghiệp vụ**

- Kiểm tra loại và kích thước
- Quét mã độc
- Mã hóa và lưu
- Tính mã băm
- Tạo DOCUMENT
- Đưa vào hàng đợi đọc OCR
- BR_040 – Giới hạn tải tệp: Chỉ nhận JPG, PNG, HEIC, PDF, kích thước ≤ giới hạn cấu hình (đề xuất 10 MB), kiểm tra loại theo nội dung và quét mã độc.
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| document_type | ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} | Giá trị không hợp lệ: ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} |
| document_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| upload_file | JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc | Giá trị không hợp lệ: JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc |
| upload_file | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| period_month | Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP | Giá trị không hợp lệ: Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→PENDING |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_UPLOAD | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_016_01** – Given Đã đăng nhập, When WRK thực hiện "Chụp hoặc tải tài liệu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi document_id, file_hash, ocr_status; trạng thái chuyển (chưa có)→PENDING.
- **REQ_016_02** – Given tình huống "Tệp sai loại hoặc quá lớn", When WRK thực hiện "Chụp hoặc tải tài liệu", Then từ chối.
- **REQ_016_03** – Given tình huống "Phát hiện mã độc", When WRK thực hiện "Chụp hoặc tải tài liệu", Then từ chối và không lưu.
- **REQ_016_04** – Given quy tắc BR_040 (Giới hạn tải tệp), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_016_05** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_016_06** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_017 – Đọc OCR kép

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_017 |
| Module / Sub-module | MOD_002 / Đọc tài liệu |
| Actor | SYS_OCR (Dịch vụ đọc OCR) |
| Mô tả | Đọc tài liệu bằng hai lượt OCR và so khớp |
| Permission | PER_SYS_OCR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có tài liệu PENDING

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: field_key, field_value, confidence_primary, confidence_secondary, ocr_agreement, ocr_status
- Trạng thái: PENDING→DONE/UNREADABLE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0073 | Khóa trường | EXTRACTED_FIELD.field_key | ENUM(24) | Loại trường |
| FLD_0074 | Giá trị đọc được | EXTRACTED_FIELD.field_value | VARCHAR(255) | Giá trị OCR chính |
| FLD_0075 | Độ tin cậy OCR chính | EXTRACTED_FIELD.confidence_primary | DECIMAL(3,2) | Độ tin cậy |
| FLD_0076 | Độ tin cậy OCR phụ | EXTRACTED_FIELD.confidence_secondary | DECIMAL(3,2) | Độ tin cậy lần đọc thứ hai |
| FLD_0077 | Hai lần đọc khớp | EXTRACTED_FIELD.ocr_agreement | BOOLEAN | Kết quả OCR kép |
| FLD_0069 | Trạng thái đọc OCR | DOCUMENT.ocr_status | ENUM(10) | Kết quả đọc |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_OCR).
3. Chạy OCR chính và phụ.
4. Trích trường theo loại tài liệu.
5. So khớp hai lần đọc.
6. Tạo EXTRACTED_FIELD UNCONFIRMED.
7. Độ tin cậy thấp hoặc không đọc được thì ocr_status=UNREADABLE.
8. Hệ thống trả kết quả: Khóa trường, Giá trị đọc được, Độ tin cậy OCR chính, Độ tin cậy OCR phụ, Hai lần đọc khớp, Trạng thái đọc OCR.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: OCR lỗi dịch vụ: thử nhà cung cấp dự phòng, nếu vẫn lỗi thì chuyển nhập tay

**9. Logic nghiệp vụ**

- Chạy OCR chính và phụ
- Trích trường theo loại tài liệu
- So khớp hai lần đọc
- Tạo EXTRACTED_FIELD UNCONFIRMED
- Độ tin cậy thấp hoặc không đọc được thì ocr_status=UNREADABLE
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.
- BR_014 – Tài liệu không đọc được: Khi OCR không đọc được hoặc độ tin cậy dưới ngưỡng, hệ thống chuyển sang nhập tay và không tự điền giá trị.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| PENDING→DONE/UNREADABLE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_OCR | SYS_OCR (Dịch vụ đọc OCR) | Chỉ tài liệu của nhiệm vụ đang xử lý |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_017_01** – Given Có tài liệu PENDING, When SYS_OCR thực hiện "Đọc OCR kép" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi field_key, field_value, confidence_primary, confidence_secondary, ocr_agreement, ocr_status; trạng thái chuyển PENDING→DONE/UNREADABLE.
- **REQ_017_02** – Given tình huống "OCR lỗi dịch vụ", When SYS_OCR thực hiện "Đọc OCR kép", Then thử nhà cung cấp dự phòng, nếu vẫn lỗi thì chuyển nhập tay.
- **REQ_017_03** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_017_04** – Given quy tắc BR_014 (Tài liệu không đọc được), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_018 – Xem trường trích xuất

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_018 |
| Module / Sub-module | MOD_002 / Đọc tài liệu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem giá trị đọc được cạnh ảnh gốc, kèm độ tin cậy |
| Permission | PER_DOC_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Tài liệu thuộc về người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: field_key, field_value, confidence_primary, ocr_agreement, source_page, confirm_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0073 | Khóa trường | EXTRACTED_FIELD.field_key | ENUM(24) | Loại trường |
| FLD_0074 | Giá trị đọc được | EXTRACTED_FIELD.field_value | VARCHAR(255) | Giá trị OCR chính |
| FLD_0075 | Độ tin cậy OCR chính | EXTRACTED_FIELD.confidence_primary | DECIMAL(3,2) | Độ tin cậy |
| FLD_0077 | Hai lần đọc khớp | EXTRACTED_FIELD.ocr_agreement | BOOLEAN | Kết quả OCR kép |
| FLD_0078 | Trang nguồn | EXTRACTED_FIELD.source_page | INTEGER | Trang chứa giá trị |
| FLD_0080 | Trạng thái xác nhận | EXTRACTED_FIELD.confirm_status | ENUM(12) | Xác nhận của người dùng |

**6. Luồng chính**

1. WRK mở chức năng "Xem trường trích xuất".
2. Người dùng cung cấp: Mã tài liệu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_VIEW).
4. Kiểm tra chủ sở hữu.
5. Hiển thị trường, tô nổi trường độ tin cậy thấp hoặc hai lần đọc không khớp.
6. Hệ thống trả kết quả: Khóa trường, Giá trị đọc được, Độ tin cậy OCR chính, Hai lần đọc khớp, Trang nguồn, Trạng thái xác nhận.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tài liệu của người khác: trả không tìm thấy

**9. Logic nghiệp vụ**

- Kiểm tra chủ sở hữu
- Hiển thị trường, tô nổi trường độ tin cậy thấp hoặc hai lần đọc không khớp
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_018_01** – Given Tài liệu thuộc về người dùng, When WRK thực hiện "Xem trường trích xuất" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi field_key, field_value, confidence_primary, ocr_agreement, source_page, confirm_status.
- **REQ_018_02** – Given tình huống "Tài liệu của người khác", When WRK thực hiện "Xem trường trích xuất", Then trả không tìm thấy.
- **REQ_018_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_019 – Xác nhận hoặc sửa trường

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_019 |
| Module / Sub-module | MOD_002 / Đọc tài liệu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xác nhận hoặc sửa giá trị tiền và giờ trước khi tính |
| Permission | PER_DOC_CONFIRM |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có EXTRACTED_FIELD UNCONFIRMED

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: confirmed_at
- Trạng thái: UNCONFIRMED→CONFIRMED/EDITED/REJECTED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0071 | Mã trường trích xuất | EXTRACTED_FIELD.extracted_field_id | UUID(36) | Y | — | — |
| FLD_0081 | Giá trị đã xác nhận | EXTRACTED_FIELD.confirmed_value | VARCHAR(255) | N | — | Đúng kiểu theo field_key |
| FLD_0080 | Trạng thái xác nhận | EXTRACTED_FIELD.confirm_status | ENUM(12) | Y | UNCONFIRMED | ∈{UNCONFIRMED,CONFIRMED,EDITED,REJECTED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0082 | Xác nhận lúc | EXTRACTED_FIELD.confirmed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xác nhận hoặc sửa trường".
2. Người dùng cung cấp: Mã trường trích xuất, Giá trị đã xác nhận, Trạng thái xác nhận.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_CONFIRM).
4. Kiểm tra kiểu theo field_key.
5. Lưu confirmed_value.
6. Đặt CONFIRMED hoặc EDITED.
7. Khi mọi trường bắt buộc xác nhận thì cho phép đối chiếu.
8. Hệ thống trả kết quả: Xác nhận lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giá trị sai kiểu: từ chối
- E2: Sửa sau khi kỳ đã đối chiếu: gợi ý chạy lại

**9. Logic nghiệp vụ**

- Kiểm tra kiểu theo field_key
- Lưu confirmed_value
- Đặt CONFIRMED hoặc EDITED
- Khi mọi trường bắt buộc xác nhận thì cho phép đối chiếu
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| confirmed_value | Đúng kiểu theo field_key | Giá trị không hợp lệ: Đúng kiểu theo field_key |
| confirm_status | ∈{UNCONFIRMED,CONFIRMED,EDITED,REJECTED} | Giá trị không hợp lệ: ∈{UNCONFIRMED,CONFIRMED,EDITED,REJECTED} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| UNCONFIRMED→CONFIRMED/EDITED/REJECTED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_CONFIRM | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_019_01** – Given Có EXTRACTED_FIELD UNCONFIRMED, When WRK thực hiện "Xác nhận hoặc sửa trường" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi confirmed_at; trạng thái chuyển UNCONFIRMED→CONFIRMED/EDITED/REJECTED.
- **REQ_019_02** – Given tình huống "Giá trị sai kiểu", When WRK thực hiện "Xác nhận hoặc sửa trường", Then từ chối.
- **REQ_019_03** – Given tình huống "Sửa sau khi kỳ đã đối chiếu", When WRK thực hiện "Xác nhận hoặc sửa trường", Then gợi ý chạy lại.
- **REQ_019_04** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_020 – Nhập tay khi không đọc được

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_020 |
| Module / Sub-module | MOD_002 / Đọc tài liệu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập trực tiếp các trường khi OCR không đọc được |
| Permission | PER_DOC_MANUAL |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- ocr_status=UNREADABLE hoặc người dùng chọn nhập tay

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: ocr_status
- Trạng thái: UNREADABLE→MANUAL

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0073 | Khóa trường | EXTRACTED_FIELD.field_key | ENUM(24) | Y | — | ∈{HOURLY_WAGE,MONTHLY_BASE_PAY,OT_RATE,WORK_HOURS_PER_DAY,PAY_PERIOD,GROSS_PAY,NET_PAY,OT_PAY,NIGHT_PAY,HOLIDAY_PAY,TAX,SOCIAL_INSURANCE,HOUSING_DEDUCTION,OTHER_DEDUCTION,CONTRACT_TERM,OTHER} |
| FLD_0081 | Giá trị đã xác nhận | EXTRACTED_FIELD.confirmed_value | VARCHAR(255) | N | — | Đúng kiểu theo field_key |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0069 | Trạng thái đọc OCR | DOCUMENT.ocr_status | ENUM(10) | Kết quả đọc |

**6. Luồng chính**

1. WRK mở chức năng "Nhập tay khi không đọc được".
2. Người dùng cung cấp: Khóa trường, Giá trị đã xác nhận.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_MANUAL).
4. Hiển thị biểu mẫu theo loại tài liệu.
5. Tạo EXTRACTED_FIELD EDITED.
6. Đặt ocr_status=MANUAL.
7. Hệ thống trả kết quả: Trạng thái đọc OCR.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Bỏ trống trường bắt buộc: không cho đối chiếu

**9. Logic nghiệp vụ**

- Hiển thị biểu mẫu theo loại tài liệu
- Tạo EXTRACTED_FIELD EDITED
- Đặt ocr_status=MANUAL
- BR_014 – Tài liệu không đọc được: Khi OCR không đọc được hoặc độ tin cậy dưới ngưỡng, hệ thống chuyển sang nhập tay và không tự điền giá trị.
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| field_key | ∈{HOURLY_WAGE,MONTHLY_BASE_PAY,OT_RATE,WORK_HOURS_PER_DAY,PAY_PERIOD,GROSS_PAY,NET_PAY,OT_PAY,NIGHT_PAY,HOLIDAY_PAY,TAX,SOCIAL_INSURANCE,HOUSING_DEDUCTION,OTHER_DEDUCTION,CONTRACT_TERM,OTHER} | Giá trị không hợp lệ: ∈{HOURLY_WAGE,MONTHLY_BASE_PAY,OT_RATE,WORK_HOURS_PER_DAY,PAY_PERIOD,GROSS_PAY,NET_PAY,OT_PAY,NIGHT_PAY,HOLIDAY_PAY,TAX,SOCIAL_INSURANCE,HOUSING_DEDUCTION,OTHER_DEDUCTION,CONTRACT_TERM,OTHER} |
| confirmed_value | Đúng kiểu theo field_key | Giá trị không hợp lệ: Đúng kiểu theo field_key |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| UNREADABLE→MANUAL |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_MANUAL | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_020_01** – Given ocr_status=UNREADABLE hoặc người dùng chọn nhập tay, When WRK thực hiện "Nhập tay khi không đọc được" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi ocr_status; trạng thái chuyển UNREADABLE→MANUAL.
- **REQ_020_02** – Given tình huống "Bỏ trống trường bắt buộc", When WRK thực hiện "Nhập tay khi không đọc được", Then không cho đối chiếu.
- **REQ_020_03** – Given quy tắc BR_014 (Tài liệu không đọc được), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_020_04** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_021 – Xem danh sách tài liệu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_021 |
| Module / Sub-module | MOD_002 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Lọc tài liệu theo loại và kỳ |
| Permission | PER_DOC_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: document_id, original_filename, uploaded_at, ocr_status, version_no

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0058 | Loại tài liệu | DOCUMENT.document_type | ENUM(16) | Y | — | ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} |
| FLD_0066 | Kỳ lương (YYYY-MM) | DOCUMENT.period_month | VARCHAR(7) | N | — | Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Định danh |
| FLD_0065 | Tên tệp gốc | DOCUMENT.original_filename | VARCHAR(255) | Tên khi tải lên |
| FLD_0070 | Tải lên lúc | DOCUMENT.uploaded_at | TIMESTAMP | Theo giờ UTC |
| FLD_0069 | Trạng thái đọc OCR | DOCUMENT.ocr_status | ENUM(10) | Kết quả đọc |
| FLD_0067 | Số phiên bản | DOCUMENT.version_no | INTEGER | Phiên bản tài liệu |

**6. Luồng chính**

1. WRK mở chức năng "Xem danh sách tài liệu".
2. Người dùng cung cấp: Loại tài liệu, Kỳ lương (YYYY-MM).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_VIEW).
4. Lọc theo chủ sở hữu, loại, kỳ.
5. Sắp xếp theo thời gian.
6. Hệ thống trả kết quả: Mã tài liệu, Tên tệp gốc, Tải lên lúc, Trạng thái đọc OCR, Số phiên bản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có tài liệu: hiển thị trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ sở hữu, loại, kỳ
- Sắp xếp theo thời gian
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| document_type | ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} | Giá trị không hợp lệ: ∈{CONTRACT,PAYSLIP,BANK_STATEMENT,SHIFT_SCHEDULE,RECEIPT,OTHER} |
| document_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| period_month | Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP | Giá trị không hợp lệ: Định dạng YYYY-MM; bắt buộc khi loại=PAYSLIP |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_021_01** – Given Đã đăng nhập, When WRK thực hiện "Xem danh sách tài liệu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi document_id, original_filename, uploaded_at, ocr_status, version_no.
- **REQ_021_02** – Given tình huống "Không có tài liệu", When WRK thực hiện "Xem danh sách tài liệu", Then hiển thị trạng thái rỗng.
- **REQ_021_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_022 – Xem chi tiết tài liệu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_022 |
| Module / Sub-module | MOD_002 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem ảnh tài liệu, phiên bản và liên kết |
| Permission | PER_DOC_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Tài liệu thuộc về người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: file_ref, page_count, version_no, file_hash, parent_document_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0060 | Khóa lưu tệp mã hóa | DOCUMENT.file_ref | VARCHAR(255) | Tham chiếu kho lưu trữ |
| FLD_0064 | Số trang | DOCUMENT.page_count | INTEGER | Số trang tài liệu |
| FLD_0067 | Số phiên bản | DOCUMENT.version_no | INTEGER | Phiên bản tài liệu |
| FLD_0061 | Mã băm nội dung | DOCUMENT.file_hash | CHAR(64) | Dùng chống sửa đổi |
| FLD_0068 | Tài liệu phiên bản trước | DOCUMENT.parent_document_id | UUID(36) | Chuỗi phiên bản |

**6. Luồng chính**

1. WRK mở chức năng "Xem chi tiết tài liệu".
2. Người dùng cung cấp: Mã tài liệu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_VIEW).
4. Kiểm tra chủ sở hữu.
5. Giải mã và trả ảnh.
6. Liệt kê chuỗi phiên bản.
7. Hệ thống trả kết quả: Khóa lưu tệp mã hóa, Số trang, Số phiên bản, Mã băm nội dung, Tài liệu phiên bản trước.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tệp bị hỏng: báo lỗi và gợi ý tải lại

**9. Logic nghiệp vụ**

- Kiểm tra chủ sở hữu
- Giải mã và trả ảnh
- Liệt kê chuỗi phiên bản
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_022_01** – Given Tài liệu thuộc về người dùng, When WRK thực hiện "Xem chi tiết tài liệu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi file_ref, page_count, version_no, file_hash, parent_document_id.
- **REQ_022_02** – Given tình huống "Tệp bị hỏng", When WRK thực hiện "Xem chi tiết tài liệu", Then báo lỗi và gợi ý tải lại.
- **REQ_022_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_022_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_023 – Tải phiên bản mới của tài liệu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_023 |
| Module / Sub-module | MOD_002 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Thay tài liệu bằng bản mới nhưng giữ bản cũ |
| Permission | PER_DOC_UPLOAD |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có tài liệu gốc

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: document_id, version_no

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0068 | Tài liệu phiên bản trước | DOCUMENT.parent_document_id | UUID(36) | N | — | — |
| FLD_0059 | Tệp tải lên | DOCUMENT.upload_file | FILE | Y | — | JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Định danh |
| FLD_0067 | Số phiên bản | DOCUMENT.version_no | INTEGER | Phiên bản tài liệu |

**6. Luồng chính**

1. WRK mở chức năng "Tải phiên bản mới của tài liệu".
2. Người dùng cung cấp: Tài liệu phiên bản trước, Tệp tải lên.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_UPLOAD).
4. Tạo DOCUMENT mới version_no+1, parent=bản cũ.
5. Đọc OCR lại.
6. Đánh dấu kỳ liên quan cần đối chiếu lại.
7. Hệ thống trả kết quả: Mã tài liệu, Số phiên bản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Như FUN_016

**9. Logic nghiệp vụ**

- Tạo DOCUMENT mới version_no+1, parent=bản cũ
- Đọc OCR lại
- Đánh dấu kỳ liên quan cần đối chiếu lại
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_040 – Giới hạn tải tệp: Chỉ nhận JPG, PNG, HEIC, PDF, kích thước ≤ giới hạn cấu hình (đề xuất 10 MB), kiểm tra loại theo nội dung và quét mã độc.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| upload_file | JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc | Giá trị không hợp lệ: JPG,PNG,HEIC,PDF; ≤ kích thước tối đa [CẦN XÁC NHẬN 10 MB]; quét mã độc |
| upload_file | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_UPLOAD | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_023_01** – Given Có tài liệu gốc, When WRK thực hiện "Tải phiên bản mới của tài liệu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi document_id, version_no.
- **REQ_023_02** – Given tình huống "Như FUN_016", When WRK thực hiện "Tải phiên bản mới của tài liệu", Then hệ thống từ chối và nêu lý do.
- **REQ_023_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_023_04** – Given quy tắc BR_040 (Giới hạn tải tệp), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_024 – Xóa tài liệu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_024 |
| Module / Sub-module | MOD_002 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa tài liệu khỏi kho |
| Permission | PER_DOC_DELETE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Tài liệu thuộc về người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: ocr_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0069 | Trạng thái đọc OCR | DOCUMENT.ocr_status | ENUM(10) | Kết quả đọc |

**6. Luồng chính**

1. WRK mở chức năng "Xóa tài liệu".
2. Người dùng cung cấp: Mã tài liệu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DOC_DELETE).
4. Kiểm tra tài liệu có đang dùng trong kỳ, Case Pack đang chia sẻ.
5. Cảnh báo.
6. Xóa tệp và trường trích xuất.
7. Hệ thống trả kết quả: Trạng thái đọc OCR.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Đang trong Case Pack đang chia sẻ: yêu cầu thu hồi chia sẻ trước

**9. Logic nghiệp vụ**

- Kiểm tra tài liệu có đang dùng trong kỳ, Case Pack đang chia sẻ
- Cảnh báo
- Xóa tệp và trường trích xuất
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DOC_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_024_01** – Given Tài liệu thuộc về người dùng, When WRK thực hiện "Xóa tài liệu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi ocr_status.
- **REQ_024_02** – Given tình huống "Đang trong Case Pack đang chia sẻ", When WRK thực hiện "Xóa tài liệu", Then yêu cầu thu hồi chia sẻ trước.
- **REQ_024_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_024_04** – Given quy tắc BR_019 (Thu hồi chia sẻ có hiệu lực ngay), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_003 – Contract DNA

### FUN_025 – Phân rã và dịch điều khoản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_025 |
| Module / Sub-module | MOD_003 / Phân tích |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Tách hợp đồng thành điều khoản và dịch |
| Permission | PER_SYS_CONTRACT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Hợp đồng đã đọc xong

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: clause_id, clause_no, clause_topic, original_text, translated_text, translation_lang

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0083 | Mã điều khoản | CONTRACT_CLAUSE.clause_id | UUID(36) | Định danh |
| FLD_0085 | Số thứ tự điều khoản | CONTRACT_CLAUSE.clause_no | INTEGER | Thứ tự trong hợp đồng |
| FLD_0086 | Chủ đề điều khoản | CONTRACT_CLAUSE.clause_topic | ENUM(20) | Phân loại |
| FLD_0087 | Nội dung gốc | CONTRACT_CLAUSE.original_text | TEXT | Văn bản gốc |
| FLD_0088 | Nội dung dịch | CONTRACT_CLAUSE.translated_text | TEXT | Bản dịch sang ngôn ngữ người dùng |
| FLD_0089 | Ngôn ngữ dịch | CONTRACT_CLAUSE.translation_lang | ENUM(5) | Ngôn ngữ bản dịch |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_CONTRACT).
3. Tách điều khoản theo cấu trúc.
4. Phân loại chủ đề.
5. Dịch sang ngôn ngữ người dùng bằng mô hình cho phép.
6. Ghi bản gốc cạnh bản dịch.
7. Hệ thống trả kết quả: Mã điều khoản, Số thứ tự điều khoản, Chủ đề điều khoản, Nội dung gốc, Nội dung dịch, Ngôn ngữ dịch.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Dịch lỗi: hiển thị bản gốc kèm cảnh báo
- E2: Hết hạn mức LLM: bản dịch theo mẫu thuật ngữ

**9. Logic nghiệp vụ**

- Tách điều khoản theo cấu trúc
- Phân loại chủ đề
- Dịch sang ngôn ngữ người dùng bằng mô hình cho phép
- Ghi bản gốc cạnh bản dịch
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_CONTRACT | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_025_01** – Given Hợp đồng đã đọc xong, When SYS_AGENT thực hiện "Phân rã và dịch điều khoản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi clause_id, clause_no, clause_topic, original_text, translated_text, translation_lang.
- **REQ_025_02** – Given tình huống "Dịch lỗi", When SYS_AGENT thực hiện "Phân rã và dịch điều khoản", Then hiển thị bản gốc kèm cảnh báo.
- **REQ_025_03** – Given tình huống "Hết hạn mức LLM", When SYS_AGENT thực hiện "Phân rã và dịch điều khoản", Then bản dịch theo mẫu thuật ngữ.
- **REQ_025_04** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_025_05** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_026 – Xem hợp đồng song ngữ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_026 |
| Module / Sub-module | MOD_003 / Hiển thị |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem điều khoản gốc và bản dịch cạnh nhau |
| Permission | PER_CTR_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Hợp đồng đã phân rã

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: clause_no, original_text, translated_text, law_label, law_note

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0085 | Số thứ tự điều khoản | CONTRACT_CLAUSE.clause_no | INTEGER | Thứ tự trong hợp đồng |
| FLD_0087 | Nội dung gốc | CONTRACT_CLAUSE.original_text | TEXT | Văn bản gốc |
| FLD_0088 | Nội dung dịch | CONTRACT_CLAUSE.translated_text | TEXT | Bản dịch sang ngôn ngữ người dùng |
| FLD_0091 | Nhãn luật | CONTRACT_CLAUSE.law_label | ENUM(10) | Kết quả so với Law Pack |
| FLD_0093 | Ghi chú luật | CONTRACT_CLAUSE.law_note | TEXT | Giải thích ngắn có điều luật |

**6. Luồng chính**

1. WRK mở chức năng "Xem hợp đồng song ngữ".
2. Người dùng cung cấp: Mã tài liệu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CTR_VIEW).
4. Kiểm tra chủ sở hữu.
5. Trả danh sách điều khoản kèm nhãn luật và ghi chú.
6. Hệ thống trả kết quả: Số thứ tự điều khoản, Nội dung gốc, Nội dung dịch, Nhãn luật, Ghi chú luật.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa phân rã xong: hiển thị tiến độ

**9. Logic nghiệp vụ**

- Kiểm tra chủ sở hữu
- Trả danh sách điều khoản kèm nhãn luật và ghi chú
- BR_009 – Ba nhãn luật: Nhãn luật chỉ gồm: Phù hợp (COMPLIANT), Nên hỏi lại (ASK_AGAIN), Chưa có quy tắc (NO_RULE). Hệ thống không kết luận vi phạm.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CTR_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_026_01** – Given Hợp đồng đã phân rã, When WRK thực hiện "Xem hợp đồng song ngữ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi clause_no, original_text, translated_text, law_label, law_note.
- **REQ_026_02** – Given tình huống "Chưa phân rã xong", When WRK thực hiện "Xem hợp đồng song ngữ", Then hiển thị tiến độ.
- **REQ_026_03** – Given quy tắc BR_009 (Ba nhãn luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_026_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_027 – Gắn nhãn luật cho điều khoản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_027 |
| Module / Sub-module | MOD_003 / Phân tích |
| Actor | SYS_AGENT (Agent) |
| Mô tả | So từng điều khoản với quy tắc Law Pack |
| Permission | PER_SYS_CONTRACT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có điều khoản; Law Pack hành lang đã phát hành

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: law_label, clause_rule_id, law_note
- Trạng thái: NO_RULE→COMPLIANT/ASK_AGAIN

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0083 | Mã điều khoản | CONTRACT_CLAUSE.clause_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0091 | Nhãn luật | CONTRACT_CLAUSE.law_label | ENUM(10) | Kết quả so với Law Pack |
| FLD_0092 | Quy tắc áp dụng | CONTRACT_CLAUSE.clause_rule_id | UUID(36) | Quy tắc dùng để so |
| FLD_0093 | Ghi chú luật | CONTRACT_CLAUSE.law_note | TEXT | Giải thích ngắn có điều luật |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_CONTRACT).
3. Chọn quy tắc theo chủ đề và ngày hiệu lực.
4. Bộ so sánh cố định đánh giá.
5. Gán COMPLIANT, ASK_AGAIN hoặc NO_RULE.
6. Ghi điều khoản gốc làm căn cứ.
7. Hệ thống trả kết quả: Nhãn luật, Quy tắc áp dụng, Ghi chú luật.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Không có quy tắc: NO_RULE, không kết luận

**9. Logic nghiệp vụ**

- Chọn quy tắc theo chủ đề và ngày hiệu lực
- Bộ so sánh cố định đánh giá
- Gán COMPLIANT, ASK_AGAIN hoặc NO_RULE
- Ghi điều khoản gốc làm căn cứ
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_009 – Ba nhãn luật: Nhãn luật chỉ gồm: Phù hợp (COMPLIANT), Nên hỏi lại (ASK_AGAIN), Chưa có quy tắc (NO_RULE). Hệ thống không kết luận vi phạm.
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NO_RULE→COMPLIANT/ASK_AGAIN |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_CONTRACT | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_027_01** – Given Có điều khoản; Law Pack hành lang đã phát hành, When SYS_AGENT thực hiện "Gắn nhãn luật cho điều khoản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi law_label, clause_rule_id, law_note; trạng thái chuyển NO_RULE→COMPLIANT/ASK_AGAIN.
- **REQ_027_02** – Given tình huống "Không có quy tắc", When SYS_AGENT thực hiện "Gắn nhãn luật cho điều khoản", Then NO_RULE, không kết luận.
- **REQ_027_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_027_04** – Given quy tắc BR_009 (Ba nhãn luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_027_05** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_028 – Tạo điểm cần hỏi

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_028 |
| Module / Sub-module | MOD_003 / Điểm cần hỏi |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Sinh câu hỏi gợi ý cho điều khoản nên hỏi lại |
| Permission | PER_SYS_CONTRACT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có điều khoản ASK_AGAIN

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: question_id, question_text
- Trạng thái: (chưa có)→OPEN

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0083 | Mã điều khoản | CONTRACT_CLAUSE.clause_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0094 | Mã điểm cần hỏi | CONTRACT_QUESTION.question_id | UUID(36) | Định danh |
| FLD_0097 | Nội dung câu hỏi | CONTRACT_QUESTION.question_text | TEXT | Câu hỏi gợi ý |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_CONTRACT).
3. Tạo câu hỏi từ mẫu theo chủ đề và điều khoản.
4. Nếu được phép dùng LLM thì diễn đạt lại.
5. Hệ thống trả kết quả: Mã điểm cần hỏi, Nội dung câu hỏi.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Không có điều khoản nên hỏi: không tạo

**9. Logic nghiệp vụ**

- Tạo câu hỏi từ mẫu theo chủ đề và điều khoản
- Nếu được phép dùng LLM thì diễn đạt lại
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→OPEN |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_CONTRACT | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_028_01** – Given Có điều khoản ASK_AGAIN, When SYS_AGENT thực hiện "Tạo điểm cần hỏi" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi question_id, question_text; trạng thái chuyển (chưa có)→OPEN.
- **REQ_028_02** – Given tình huống "Không có điều khoản nên hỏi", When SYS_AGENT thực hiện "Tạo điểm cần hỏi", Then không tạo.
- **REQ_028_03** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_028_04** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_029 – Xem điểm cần hỏi

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_029 |
| Module / Sub-module | MOD_003 / Điểm cần hỏi |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem danh sách điểm cần hỏi của hợp đồng |
| Permission | PER_CTR_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: question_text, question_status, user_note

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0097 | Nội dung câu hỏi | CONTRACT_QUESTION.question_text | TEXT | Câu hỏi gợi ý |
| FLD_0098 | Trạng thái | CONTRACT_QUESTION.question_status | ENUM(10) | Tiến độ làm rõ |
| FLD_0099 | Ghi chú của người dùng | CONTRACT_QUESTION.user_note | TEXT | Ghi chú làm rõ |

**6. Luồng chính**

1. WRK mở chức năng "Xem điểm cần hỏi".
2. Người dùng cung cấp: Mã tài liệu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CTR_VIEW).
4. Lọc theo hợp đồng và chủ sở hữu.
5. Hệ thống trả kết quả: Nội dung câu hỏi, Trạng thái, Ghi chú của người dùng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có: hiển thị trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo hợp đồng và chủ sở hữu
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CTR_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_029_01** – Given Đã đăng nhập, When WRK thực hiện "Xem điểm cần hỏi" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi question_text, question_status, user_note.
- **REQ_029_02** – Given tình huống "Không có", When WRK thực hiện "Xem điểm cần hỏi", Then hiển thị trạng thái rỗng.
- **REQ_029_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_030 – Cập nhật trạng thái làm rõ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_030 |
| Module / Sub-module | MOD_003 / Điểm cần hỏi |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đánh dấu đã hỏi, đã làm rõ hoặc bỏ qua, ghi chú |
| Permission | PER_CTR_UPDATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có điểm cần hỏi

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: status_changed_at
- Trạng thái: OPEN→ASKED→CLARIFIED/DISMISSED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0094 | Mã điểm cần hỏi | CONTRACT_QUESTION.question_id | UUID(36) | Y | — | — |
| FLD_0098 | Trạng thái | CONTRACT_QUESTION.question_status | ENUM(10) | Y | OPEN | ∈{OPEN,ASKED,CLARIFIED,DISMISSED} |
| FLD_0099 | Ghi chú của người dùng | CONTRACT_QUESTION.user_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0100 | Đổi trạng thái lúc | CONTRACT_QUESTION.status_changed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Cập nhật trạng thái làm rõ".
2. Người dùng cung cấp: Mã điểm cần hỏi, Trạng thái, Ghi chú của người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CTR_UPDATE).
4. Lưu trạng thái và ghi chú.
5. Có thể đưa vào Evidence Vault.
6. Hệ thống trả kết quả: Đổi trạng thái lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Ghi chú quá dài: từ chối

**9. Logic nghiệp vụ**

- Lưu trạng thái và ghi chú
- Có thể đưa vào Evidence Vault
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| question_status | ∈{OPEN,ASKED,CLARIFIED,DISMISSED} | Giá trị không hợp lệ: ∈{OPEN,ASKED,CLARIFIED,DISMISSED} |
| user_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| OPEN→ASKED→CLARIFIED/DISMISSED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CTR_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_030_01** – Given Có điểm cần hỏi, When WRK thực hiện "Cập nhật trạng thái làm rõ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi status_changed_at; trạng thái chuyển OPEN→ASKED→CLARIFIED/DISMISSED.
- **REQ_030_02** – Given tình huống "Ghi chú quá dài", When WRK thực hiện "Cập nhật trạng thái làm rõ", Then từ chối.
- **REQ_030_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_004 – Work Log

### FUN_031 – Ghi giờ làm nhanh

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_031 |
| Module / Sub-module | MOD_004 / Ghi giờ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Ghi ca làm trong ngày bằng vài chạm |
| Permission | PER_LOG_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: log_id, total_minutes, night_minutes, period_month
- Trạng thái: (chưa có)→OPEN

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0103 | Ngày làm việc | WORK_LOG.work_date | DATE | Y | — | Không sau hôm nay |
| FLD_0104 | Giờ bắt đầu | WORK_LOG.start_time | TIME | Y | — | HH:mm |
| FLD_0105 | Giờ kết thúc | WORK_LOG.end_time | TIME | Y | — | HH:mm; ca qua đêm được phép |
| FLD_0106 | Phút nghỉ | WORK_LOG.break_minutes | INTEGER | Y | 0 | 0-480 |
| FLD_0107 | Loại ngày | WORK_LOG.day_type | ENUM(18) | Y | NORMAL | ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} |
| FLD_0111 | Ghi chú | WORK_LOG.work_note | VARCHAR(500) | N | — | ≤ 500 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0101 | Mã mục giờ | WORK_LOG.log_id | UUID(36) | Định danh |
| FLD_0112 | Tổng phút làm | WORK_LOG.total_minutes | INTEGER | Tính từ giờ vào, ra, nghỉ |
| FLD_0113 | Phút làm đêm | WORK_LOG.night_minutes | INTEGER | Phần nằm trong 22:00-05:00 |
| FLD_0116 | Kỳ lương (YYYY-MM) | WORK_LOG.period_month | VARCHAR(7) | Kỳ chứa ngày làm |

**6. Luồng chính**

1. WRK mở chức năng "Ghi giờ làm nhanh".
2. Người dùng cung cấp: Ngày làm việc, Giờ bắt đầu, Giờ kết thúc, Phút nghỉ, Loại ngày, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_CREATE).
4. Kiểm tra ngày không ở tương lai và kỳ chưa khóa.
5. Tính tổng phút, phút đêm 22:00-05:00.
6. Đặt input_method=QUICK.
7. Lưu.
8. Hệ thống trả kết quả: Mã mục giờ, Tổng phút làm, Phút làm đêm, Kỳ lương (YYYY-MM).

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ đã khóa: yêu cầu mở khóa (FUN_146)
- E2: Ca chồng nhau: cảnh báo, cho người dùng quyết định

**9. Logic nghiệp vụ**

- Kiểm tra ngày không ở tương lai và kỳ chưa khóa
- Tính tổng phút, phút đêm 22:00-05:00
- Đặt input_method=QUICK
- Lưu
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.
- BR_052 – Khung giờ đêm: Giờ làm đêm tính trong khoảng 22:00-05:00; giá trị lấy từ Law Pack.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| work_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| work_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| start_time | HH:mm | Giá trị không hợp lệ: HH:mm |
| start_time | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| end_time | HH:mm; ca qua đêm được phép | Giá trị không hợp lệ: HH:mm; ca qua đêm được phép |
| end_time | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| break_minutes | 0-480 | Giá trị không hợp lệ: 0-480 |
| day_type | ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} | Giá trị không hợp lệ: ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} |
| work_note | ≤ 500 ký tự | Giá trị không hợp lệ: ≤ 500 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→OPEN |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_031_01** – Given Đã đăng nhập, When WRK thực hiện "Ghi giờ làm nhanh" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi log_id, total_minutes, night_minutes, period_month; trạng thái chuyển (chưa có)→OPEN.
- **REQ_031_02** – Given tình huống "Kỳ đã khóa", When WRK thực hiện "Ghi giờ làm nhanh", Then yêu cầu mở khóa (FUN_146).
- **REQ_031_03** – Given tình huống "Ca chồng nhau", When WRK thực hiện "Ghi giờ làm nhanh", Then cảnh báo, cho người dùng quyết định.
- **REQ_031_04** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_031_05** – Given quy tắc BR_052 (Khung giờ đêm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_031_06** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_032 – Ghi giờ bằng giọng nói

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_032 |
| Module / Sub-module | MOD_004 / Ghi giờ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đọc giờ làm bằng giọng nói để hệ thống điền biểu mẫu |
| Permission | PER_LOG_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã cấp quyền micro

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: start_time, end_time, break_minutes, work_date
- Trạng thái: (chưa có)→OPEN

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0109 | Ghi âm giọng nói | WORK_LOG.voice_audio | FILE | N | — | ≤ 30 giây |
| FLD_0110 | Nội dung nhận dạng | WORK_LOG.voice_transcript | TEXT | N | — | ≤ 500 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0104 | Giờ bắt đầu | WORK_LOG.start_time | TIME | Giờ vào ca |
| FLD_0105 | Giờ kết thúc | WORK_LOG.end_time | TIME | Giờ ra ca |
| FLD_0106 | Phút nghỉ | WORK_LOG.break_minutes | INTEGER | Tổng thời gian nghỉ |
| FLD_0103 | Ngày làm việc | WORK_LOG.work_date | DATE | Ngày của ca |

**6. Luồng chính**

1. WRK mở chức năng "Ghi giờ bằng giọng nói".
2. Người dùng cung cấp: Ghi âm giọng nói, Nội dung nhận dạng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_CREATE).
4. Nhận dạng giọng nói trên thiết bị.
5. Trích giờ vào, ra, nghỉ.
6. Điền biểu mẫu để người dùng xác nhận.
7. Chỉ lưu sau khi xác nhận.
8. Không lưu âm thanh.
9. Hệ thống trả kết quả: Giờ bắt đầu, Giờ kết thúc, Phút nghỉ, Ngày làm việc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không nhận dạng được: chuyển nhập tay
- E2: Giờ không rõ: hỏi lại

**9. Logic nghiệp vụ**

- Nhận dạng giọng nói trên thiết bị
- Trích giờ vào, ra, nghỉ
- Điền biểu mẫu để người dùng xác nhận
- Chỉ lưu sau khi xác nhận
- Không lưu âm thanh
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| voice_audio | ≤ 30 giây | Giá trị không hợp lệ: ≤ 30 giây |
| voice_transcript | ≤ 500 ký tự | Giá trị không hợp lệ: ≤ 500 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→OPEN |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_032_01** – Given Đã cấp quyền micro, When WRK thực hiện "Ghi giờ bằng giọng nói" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi start_time, end_time, break_minutes, work_date; trạng thái chuyển (chưa có)→OPEN.
- **REQ_032_02** – Given tình huống "Không nhận dạng được", When WRK thực hiện "Ghi giờ bằng giọng nói", Then chuyển nhập tay.
- **REQ_032_03** – Given tình huống "Giờ không rõ", When WRK thực hiện "Ghi giờ bằng giọng nói", Then hỏi lại.
- **REQ_032_04** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_032_05** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_033 – Sửa mục giờ làm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_033 |
| Module / Sub-module | MOD_004 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Sửa giờ vào, ra, nghỉ, loại ngày |
| Permission | PER_LOG_UPDATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Mục thuộc người dùng và chưa khóa

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: total_minutes, night_minutes, updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0101 | Mã mục giờ | WORK_LOG.log_id | UUID(36) | Y | — | — |
| FLD_0104 | Giờ bắt đầu | WORK_LOG.start_time | TIME | Y | — | HH:mm |
| FLD_0105 | Giờ kết thúc | WORK_LOG.end_time | TIME | Y | — | HH:mm; ca qua đêm được phép |
| FLD_0106 | Phút nghỉ | WORK_LOG.break_minutes | INTEGER | Y | 0 | 0-480 |
| FLD_0107 | Loại ngày | WORK_LOG.day_type | ENUM(18) | Y | NORMAL | ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} |
| FLD_0111 | Ghi chú | WORK_LOG.work_note | VARCHAR(500) | N | — | ≤ 500 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0112 | Tổng phút làm | WORK_LOG.total_minutes | INTEGER | Tính từ giờ vào, ra, nghỉ |
| FLD_0113 | Phút làm đêm | WORK_LOG.night_minutes | INTEGER | Phần nằm trong 22:00-05:00 |
| FLD_0118 | Cập nhật lúc | WORK_LOG.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Sửa mục giờ làm".
2. Người dùng cung cấp: Mã mục giờ, Giờ bắt đầu, Giờ kết thúc, Phút nghỉ, Loại ngày, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_UPDATE).
4. Kiểm tra lock_status=OPEN.
5. Tính lại phút.
6. Lưu.
7. Đánh dấu kỳ cần đối chiếu lại.
8. Hệ thống trả kết quả: Tổng phút làm, Phút làm đêm, Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mục đã khóa: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra lock_status=OPEN
- Tính lại phút
- Lưu
- Đánh dấu kỳ cần đối chiếu lại
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| start_time | HH:mm | Giá trị không hợp lệ: HH:mm |
| start_time | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| end_time | HH:mm; ca qua đêm được phép | Giá trị không hợp lệ: HH:mm; ca qua đêm được phép |
| end_time | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| break_minutes | 0-480 | Giá trị không hợp lệ: 0-480 |
| day_type | ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} | Giá trị không hợp lệ: ∈{NORMAL,LEGAL_HOLIDAY,SCHEDULED_HOLIDAY} |
| work_note | ≤ 500 ký tự | Giá trị không hợp lệ: ≤ 500 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_033_01** – Given Mục thuộc người dùng và chưa khóa, When WRK thực hiện "Sửa mục giờ làm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi total_minutes, night_minutes, updated_at.
- **REQ_033_02** – Given tình huống "Mục đã khóa", When WRK thực hiện "Sửa mục giờ làm", Then từ chối.
- **REQ_033_03** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_033_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_034 – Xóa mục giờ làm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_034 |
| Module / Sub-module | MOD_004 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa một mục giờ |
| Permission | PER_LOG_DELETE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Mục thuộc người dùng và chưa khóa

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: lock_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0101 | Mã mục giờ | WORK_LOG.log_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0114 | Trạng thái khóa | WORK_LOG.lock_status | ENUM(8) | Khóa theo kỳ |

**6. Luồng chính**

1. WRK mở chức năng "Xóa mục giờ làm".
2. Người dùng cung cấp: Mã mục giờ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_DELETE).
4. Kiểm tra chưa khóa.
5. Xóa.
6. Đánh dấu kỳ cần đối chiếu lại.
7. Hệ thống trả kết quả: Trạng thái khóa.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mục đã khóa: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra chưa khóa
- Xóa
- Đánh dấu kỳ cần đối chiếu lại
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_034_01** – Given Mục thuộc người dùng và chưa khóa, When WRK thực hiện "Xóa mục giờ làm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi lock_status.
- **REQ_034_02** – Given tình huống "Mục đã khóa", When WRK thực hiện "Xóa mục giờ làm", Then từ chối.
- **REQ_034_03** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_034_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_035 – Xem lịch và tổng giờ tháng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_035 |
| Module / Sub-module | MOD_004 / Xem |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem giờ theo ngày, tổng giờ, giờ đêm, giờ ngày nghỉ |
| Permission | PER_LOG_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: work_date, total_minutes, night_minutes, day_type, lock_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0116 | Kỳ lương (YYYY-MM) | WORK_LOG.period_month | VARCHAR(7) | Y | — | YYYY-MM |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0103 | Ngày làm việc | WORK_LOG.work_date | DATE | Ngày của ca |
| FLD_0112 | Tổng phút làm | WORK_LOG.total_minutes | INTEGER | Tính từ giờ vào, ra, nghỉ |
| FLD_0113 | Phút làm đêm | WORK_LOG.night_minutes | INTEGER | Phần nằm trong 22:00-05:00 |
| FLD_0107 | Loại ngày | WORK_LOG.day_type | ENUM(18) | Ảnh hưởng mức phụ trội |
| FLD_0114 | Trạng thái khóa | WORK_LOG.lock_status | ENUM(8) | Khóa theo kỳ |

**6. Luồng chính**

1. WRK mở chức năng "Xem lịch và tổng giờ tháng".
2. Người dùng cung cấp: Kỳ lương (YYYY-MM).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_VIEW).
4. Lọc theo chủ sở hữu và kỳ.
5. Cộng dồn theo ngày và tháng.
6. Hiển thị cảnh báo ngày thiếu dữ liệu.
7. Hệ thống trả kết quả: Ngày làm việc, Tổng phút làm, Phút làm đêm, Loại ngày, Trạng thái khóa.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ không có dữ liệu: hiển thị trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ sở hữu và kỳ
- Cộng dồn theo ngày và tháng
- Hiển thị cảnh báo ngày thiếu dữ liệu
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| period_month | YYYY-MM | Giá trị không hợp lệ: YYYY-MM |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_035_01** – Given Đã đăng nhập, When WRK thực hiện "Xem lịch và tổng giờ tháng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi work_date, total_minutes, night_minutes, day_type, lock_status.
- **REQ_035_02** – Given tình huống "Kỳ không có dữ liệu", When WRK thực hiện "Xem lịch và tổng giờ tháng", Then hiển thị trạng thái rỗng.
- **REQ_035_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_036 – Nhập giờ từ bảng ca

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_036 |
| Module / Sub-module | MOD_004 / Ghi giờ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chụp bảng ca để điền giờ dự kiến, người dùng đối chiếu và xác nhận |
| Permission | PER_LOG_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã tải bảng ca

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: start_time, end_time, log_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0056 | Mã tài liệu | DOCUMENT.document_id | UUID(36) | Y | — | — |
| FLD_0103 | Ngày làm việc | WORK_LOG.work_date | DATE | Y | — | Không sau hôm nay |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0104 | Giờ bắt đầu | WORK_LOG.start_time | TIME | Giờ vào ca |
| FLD_0105 | Giờ kết thúc | WORK_LOG.end_time | TIME | Giờ ra ca |
| FLD_0101 | Mã mục giờ | WORK_LOG.log_id | UUID(36) | Định danh |

**6. Luồng chính**

1. WRK mở chức năng "Nhập giờ từ bảng ca".
2. Người dùng cung cấp: Mã tài liệu, Ngày làm việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_CREATE).
4. Đọc OCR bảng ca.
5. Đề xuất các mục giờ.
6. Người dùng chọn mục muốn lưu.
7. Lưu input_method=MANUAL.
8. Hệ thống trả kết quả: Giờ bắt đầu, Giờ kết thúc, Mã mục giờ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: OCR không đọc được: nhập tay

**9. Logic nghiệp vụ**

- Đọc OCR bảng ca
- Đề xuất các mục giờ
- Người dùng chọn mục muốn lưu
- Lưu input_method=MANUAL
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.
- BR_014 – Tài liệu không đọc được: Khi OCR không đọc được hoặc độ tin cậy dưới ngưỡng, hệ thống chuyển sang nhập tay và không tự điền giá trị.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| work_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| work_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_036_01** – Given Đã tải bảng ca, When WRK thực hiện "Nhập giờ từ bảng ca" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi start_time, end_time, log_id.
- **REQ_036_02** – Given tình huống "OCR không đọc được", When WRK thực hiện "Nhập giờ từ bảng ca", Then nhập tay.
- **REQ_036_03** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_036_04** – Given quy tắc BR_014 (Tài liệu không đọc được), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_146 – Mở khóa kỳ giờ làm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_146 |
| Module / Sub-module | MOD_004 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Mở khóa kỳ đã đối chiếu để sửa giờ |
| Permission | PER_LOG_UNLOCK |
| Ưu tiên | P1 |
| Nhãn | [ĐỀ XUẤT] |

**2. Tiền điều kiện**

- Kỳ có WORK_LOG LOCKED

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: lock_status, period_status
- Trạng thái: LOCKED→OPEN; RECONCILED→READY

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Y | — | — |
| FLD_0116 | Kỳ lương (YYYY-MM) | WORK_LOG.period_month | VARCHAR(7) | Y | — | YYYY-MM |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0114 | Trạng thái khóa | WORK_LOG.lock_status | ENUM(8) | Khóa theo kỳ |
| FLD_0128 | Trạng thái kỳ | PAY_PERIOD.period_status | ENUM(12) | Tiến độ xử lý |

**6. Luồng chính**

1. WRK mở chức năng "Mở khóa kỳ giờ làm".
2. Người dùng cung cấp: Mã kỳ đối chiếu, Kỳ lương (YYYY-MM).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LOG_UNLOCK).
4. Xác nhận hai bước.
5. Đặt lock_status=OPEN cho mục trong kỳ.
6. Đặt kỳ về READY.
7. Ghi nhật ký.
8. Hệ thống trả kết quả: Trạng thái khóa, Trạng thái kỳ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ đã nằm trong Case Pack đang chia sẻ: cảnh báo rằng bằng chứng cũ giữ nguyên

**9. Logic nghiệp vụ**

- Xác nhận hai bước
- Đặt lock_status=OPEN cho mục trong kỳ
- Đặt kỳ về READY
- Ghi nhật ký
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| period_month | YYYY-MM | Giá trị không hợp lệ: YYYY-MM |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| LOCKED→OPEN; RECONCILED→READY |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LOG_UNLOCK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_146_01** – Given Kỳ có WORK_LOG LOCKED, When WRK thực hiện "Mở khóa kỳ giờ làm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi lock_status, period_status; trạng thái chuyển LOCKED→OPEN; RECONCILED→READY.
- **REQ_146_02** – Given tình huống "Kỳ đã nằm trong Case Pack đang chia sẻ", When WRK thực hiện "Mở khóa kỳ giờ làm", Then cảnh báo rằng bằng chứng cũ giữ nguyên.
- **REQ_146_03** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_005 – PayGuard AI

### FUN_037 – Tạo kỳ đối chiếu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_037 |
| Module / Sub-module | MOD_005 / Kỳ đối chiếu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chọn tháng, hợp đồng, phiếu lương để đối chiếu |
| Permission | PER_PAY_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có hợp đồng đã xác nhận trường

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: period_id, period_status
- Trạng thái: (chưa có)→DRAFT

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0121 | Kỳ lương (YYYY-MM) | PAY_PERIOD.period_month | VARCHAR(7) | Y | — | YYYY-MM; mỗi người một kỳ một tháng |
| FLD_0122 | Hợp đồng dùng | PAY_PERIOD.contract_document_id | UUID(36) | Y | — | Loại=CONTRACT, cùng chủ |
| FLD_0123 | Phiếu lương dùng | PAY_PERIOD.payslip_document_id | UUID(36) | N | — | Loại=PAYSLIP, cùng chủ |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Định danh |
| FLD_0128 | Trạng thái kỳ | PAY_PERIOD.period_status | ENUM(12) | Tiến độ xử lý |

**6. Luồng chính**

1. WRK mở chức năng "Tạo kỳ đối chiếu".
2. Người dùng cung cấp: Kỳ lương (YYYY-MM), Hợp đồng dùng, Phiếu lương dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_CREATE).
4. Kiểm tra mỗi người một kỳ một tháng.
5. Kiểm tra tài liệu cùng chủ.
6. Tạo PAY_PERIOD DRAFT.
7. Hệ thống trả kết quả: Mã kỳ đối chiếu, Trạng thái kỳ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ đã tồn tại: mở kỳ cũ

**9. Logic nghiệp vụ**

- Kiểm tra mỗi người một kỳ một tháng
- Kiểm tra tài liệu cùng chủ
- Tạo PAY_PERIOD DRAFT
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| period_month | YYYY-MM; mỗi người một kỳ một tháng | Giá trị không hợp lệ: YYYY-MM; mỗi người một kỳ một tháng |
| period_month | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| contract_document_id | Loại=CONTRACT, cùng chủ | Giá trị không hợp lệ: Loại=CONTRACT, cùng chủ |
| contract_document_id | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| payslip_document_id | Loại=PAYSLIP, cùng chủ | Giá trị không hợp lệ: Loại=PAYSLIP, cùng chủ |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→DRAFT |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_037_01** – Given Có hợp đồng đã xác nhận trường, When WRK thực hiện "Tạo kỳ đối chiếu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi period_id, period_status; trạng thái chuyển (chưa có)→DRAFT.
- **REQ_037_02** – Given tình huống "Kỳ đã tồn tại", When WRK thực hiện "Tạo kỳ đối chiếu", Then mở kỳ cũ.
- **REQ_037_03** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_037_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_038 – Nhập số tiền thực nhận

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_038 |
| Module / Sub-module | MOD_005 / Kỳ đối chiếu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập số tiền thực sự vào tài khoản |
| Permission | PER_PAY_UPDATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Kỳ tồn tại

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: period_status
- Trạng thái: DRAFT→READY

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Y | — | — |
| FLD_0124 | Số tiền thực nhận | PAY_PERIOD.received_amount | DECIMAL(14,2) | N | — | ≥0 |
| FLD_0125 | Ngày nhận tiền | PAY_PERIOD.received_date | DATE | N | — | Không sau hôm nay |
| FLD_0126 | Tiền tệ thực nhận | PAY_PERIOD.received_currency_code | ENUM(3) | Y | JPY | ∈{JPY} |
| FLD_0127 | Tên gợi nhớ tài khoản nhận | PAY_PERIOD.received_account_label | VARCHAR(40) | N | — | ≤ 40 ký tự; không lưu số tài khoản |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0128 | Trạng thái kỳ | PAY_PERIOD.period_status | ENUM(12) | Tiến độ xử lý |

**6. Luồng chính**

1. WRK mở chức năng "Nhập số tiền thực nhận".
2. Người dùng cung cấp: Mã kỳ đối chiếu, Số tiền thực nhận, Ngày nhận tiền, Tiền tệ thực nhận, Tên gợi nhớ tài khoản nhận.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_UPDATE).
4. Kiểm tra số tiền không âm.
5. Lưu.
6. Nếu đủ nguồn thì đặt READY.
7. Hệ thống trả kết quả: Trạng thái kỳ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Số tiền âm: từ chối
- E2: Không lưu số tài khoản

**9. Logic nghiệp vụ**

- Kiểm tra số tiền không âm
- Lưu
- Nếu đủ nguồn thì đặt READY
- BR_013 – Người dùng xác nhận trường tiền và giờ: Trường trích xuất liên quan tiền hoặc giờ chỉ được dùng để tính sau khi người dùng xác nhận hoặc sửa.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| received_amount | ≥0 | Giá trị không hợp lệ: ≥0 |
| received_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| received_currency_code | ∈{JPY} | Giá trị không hợp lệ: ∈{JPY} |
| received_account_label | ≤ 40 ký tự; không lưu số tài khoản | Giá trị không hợp lệ: ≤ 40 ký tự; không lưu số tài khoản |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| DRAFT→READY |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_038_01** – Given Kỳ tồn tại, When WRK thực hiện "Nhập số tiền thực nhận" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi period_status; trạng thái chuyển DRAFT→READY.
- **REQ_038_02** – Given tình huống "Số tiền âm", When WRK thực hiện "Nhập số tiền thực nhận", Then từ chối.
- **REQ_038_03** – Given tình huống "Không lưu số tài khoản", When WRK thực hiện "Nhập số tiền thực nhận", Then hệ thống từ chối và nêu lý do.
- **REQ_038_04** – Given quy tắc BR_013 (Người dùng xác nhận trường tiền và giờ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_039 – Chạy đối chiếu bốn nguồn

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_039 |
| Module / Sub-module | MOD_005 / Đối chiếu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đối chiếu hợp đồng, giờ làm, phiếu lương, tiền nhận với Law Pack |
| Permission | PER_PAY_RUN |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Kỳ READY; trường tiền và giờ đã xác nhận

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: result_summary, run_at, pack_version_id, calc_engine_version, line_status, difference_amount, law_min_amount
- Trạng thái: READY→RECONCILED; OPEN→LOCKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0129 | Kết quả tổng hợp | PAY_PERIOD.result_summary | ENUM(12) | Theo BR_050 |
| FLD_0130 | Chạy đối chiếu lúc | PAY_PERIOD.run_at | TIMESTAMP | Lần chạy gần nhất |
| FLD_0131 | Phiên bản Law Pack đã dùng | PAY_PERIOD.pack_version_id | UUID(36) | Phiên bản dùng khi chạy |
| FLD_0132 | Phiên bản máy tính | PAY_PERIOD.calc_engine_version | VARCHAR(20) | Phiên bản bộ tính toán |
| FLD_0144 | Trạng thái dòng | RECON_LINE.line_status | ENUM(12) | Theo BR_008 |
| FLD_0143 | Chênh lệch | RECON_LINE.difference_amount | DECIMAL(14,2) | Giữa các nguồn liên quan |
| FLD_0142 | Mức tối thiểu theo luật | RECON_LINE.law_min_amount | DECIMAL(14,2) | Tính từ Law Pack |

**6. Luồng chính**

1. WRK mở chức năng "Chạy đối chiếu bốn nguồn".
2. Người dùng cung cấp: Mã kỳ đối chiếu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_RUN).
4. Chọn phiên bản Law Pack và quy tắc theo ngày hiệu lực.
5. Bộ tính cố định tính từng khoản mục.
6. So sánh bốn nguồn theo dung sai.
7. Gán trạng thái dòng và nhãn luật.
8. Tổng hợp trạng thái kỳ.
9. Khóa mục giờ trong kỳ.
10. Hệ thống trả kết quả: Kết quả tổng hợp, Chạy đối chiếu lúc, Phiên bản Law Pack đã dùng, Phiên bản máy tính, Trạng thái dòng, Chênh lệch, Mức tối thiểu theo luật.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thiếu nguồn: dòng Chưa đủ dữ liệu
- E2: Không có quy tắc: law_label=NO_RULE
- E3: Law Pack chưa tải: dùng bản gần nhất trên thiết bị

**9. Logic nghiệp vụ**

- Chọn phiên bản Law Pack và quy tắc theo ngày hiệu lực
- Bộ tính cố định tính từng khoản mục
- So sánh bốn nguồn theo dung sai
- Gán trạng thái dòng và nhãn luật
- Tổng hợp trạng thái kỳ
- Khóa mục giờ trong kỳ
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_008 – Ba trạng thái đối chiếu: Mỗi dòng đối chiếu chỉ có một trong ba trạng thái: Khớp, Lệch, Chưa đủ dữ liệu.
- BR_009 – Ba nhãn luật: Nhãn luật chỉ gồm: Phù hợp (COMPLIANT), Nên hỏi lại (ASK_AGAIN), Chưa có quy tắc (NO_RULE). Hệ thống không kết luận vi phạm.
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.
- BR_011 – Mức phụ trội Nhật Bản: Làm thêm ≥ 25%; ngày nghỉ luật định ≥ 35%; làm đêm 22:00-05:00 ≥ 25%; làm thêm cộng đêm ≥ 50%; ngày nghỉ luật định cộng đêm ≥ 60%; làm thêm trên 60 giờ mỗi tháng ≥ 50%. Giá trị lấy từ Law Pack, không mã hóa cứng.
- BR_012 – Lương tối thiểu theo tỉnh: Mức lương giờ tối thiểu lấy theo tỉnh nơi làm việc và ngày hiệu lực từ Law Pack.
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.
- BR_050 – Tổng hợp trạng thái kỳ: Kỳ có bất kỳ dòng Lệch thì Lệch; nếu không và có dòng Chưa đủ thì Chưa đủ; còn lại Khớp.
- BR_051 – Dung sai làm tròn: Chênh lệch tuyệt đối không quá 1 đơn vị tiền nhỏ nhất coi là khớp.
- BR_052 – Khung giờ đêm: Giờ làm đêm tính trong khoảng 22:00-05:00; giá trị lấy từ Law Pack.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| READY→RECONCILED; OPEN→LOCKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_RUN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_039_01** – Given Kỳ READY; trường tiền và giờ đã xác nhận, When WRK thực hiện "Chạy đối chiếu bốn nguồn" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi result_summary, run_at, pack_version_id, calc_engine_version, line_status, difference_amount, law_min_amount; trạng thái chuyển READY→RECONCILED; OPEN→LOCKED.
- **REQ_039_02** – Given tình huống "Thiếu nguồn", When WRK thực hiện "Chạy đối chiếu bốn nguồn", Then dòng Chưa đủ dữ liệu.
- **REQ_039_03** – Given tình huống "Không có quy tắc", When WRK thực hiện "Chạy đối chiếu bốn nguồn", Then law_label=NO_RULE.
- **REQ_039_04** – Given tình huống "Law Pack chưa tải", When WRK thực hiện "Chạy đối chiếu bốn nguồn", Then dùng bản gần nhất trên thiết bị.
- **REQ_039_05** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_039_06** – Given quy tắc BR_008 (Ba trạng thái đối chiếu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_039_07** – Given quy tắc BR_009 (Ba nhãn luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_040 – Xem kết quả tổng hợp kỳ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_040 |
| Module / Sub-module | MOD_005 / Kết quả |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem trạng thái Khớp, Lệch, Chưa đủ và số tiền chênh |
| Permission | PER_PAY_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Kỳ đã chạy

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: result_summary, received_amount, item_code, difference_amount, line_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0129 | Kết quả tổng hợp | PAY_PERIOD.result_summary | ENUM(12) | Theo BR_050 |
| FLD_0124 | Số tiền thực nhận | PAY_PERIOD.received_amount | DECIMAL(14,2) | Tiền thực sự vào tài khoản |
| FLD_0137 | Khoản mục | RECON_LINE.item_code | ENUM(20) | Khoản mục đối chiếu |
| FLD_0143 | Chênh lệch | RECON_LINE.difference_amount | DECIMAL(14,2) | Giữa các nguồn liên quan |
| FLD_0144 | Trạng thái dòng | RECON_LINE.line_status | ENUM(12) | Theo BR_008 |

**6. Luồng chính**

1. WRK mở chức năng "Xem kết quả tổng hợp kỳ".
2. Người dùng cung cấp: Mã kỳ đối chiếu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_VIEW).
4. Kiểm tra chủ sở hữu.
5. Trả tổng hợp và danh sách dòng lệch trước.
6. Hệ thống trả kết quả: Kết quả tổng hợp, Số tiền thực nhận, Khoản mục, Chênh lệch, Trạng thái dòng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ chưa chạy: nhắc chạy đối chiếu

**9. Logic nghiệp vụ**

- Kiểm tra chủ sở hữu
- Trả tổng hợp và danh sách dòng lệch trước
- BR_008 – Ba trạng thái đối chiếu: Mỗi dòng đối chiếu chỉ có một trong ba trạng thái: Khớp, Lệch, Chưa đủ dữ liệu.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_050 – Tổng hợp trạng thái kỳ: Kỳ có bất kỳ dòng Lệch thì Lệch; nếu không và có dòng Chưa đủ thì Chưa đủ; còn lại Khớp.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_040_01** – Given Kỳ đã chạy, When WRK thực hiện "Xem kết quả tổng hợp kỳ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi result_summary, received_amount, item_code, difference_amount, line_status.
- **REQ_040_02** – Given tình huống "Kỳ chưa chạy", When WRK thực hiện "Xem kết quả tổng hợp kỳ", Then nhắc chạy đối chiếu.
- **REQ_040_03** – Given quy tắc BR_008 (Ba trạng thái đối chiếu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_040_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_040_05** – Given quy tắc BR_050 (Tổng hợp trạng thái kỳ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_041 – Xem chi tiết dòng đối chiếu

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_041 |
| Module / Sub-module | MOD_005 / Kết quả |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem bốn nguồn và mức tối thiểu của một khoản mục |
| Permission | PER_PAY_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có RECON_LINE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: contract_amount, log_amount, payslip_amount, received_line_amount, law_min_amount, law_label

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0135 | Mã dòng đối chiếu | RECON_LINE.line_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0138 | Số tiền theo hợp đồng | RECON_LINE.contract_amount | DECIMAL(14,2) | Nguồn 1 |
| FLD_0139 | Số tiền theo nhật ký giờ | RECON_LINE.log_amount | DECIMAL(14,2) | Nguồn 2, tính từ giờ x đơn giá |
| FLD_0140 | Số tiền theo phiếu lương | RECON_LINE.payslip_amount | DECIMAL(14,2) | Nguồn 3 |
| FLD_0141 | Số tiền thực nhận | RECON_LINE.received_line_amount | DECIMAL(14,2) | Nguồn 4 (chỉ áp cho dòng NET_PAY, RECEIVED) |
| FLD_0142 | Mức tối thiểu theo luật | RECON_LINE.law_min_amount | DECIMAL(14,2) | Tính từ Law Pack |
| FLD_0145 | Nhãn luật | RECON_LINE.law_label | ENUM(10) | Theo BR_009 |

**6. Luồng chính**

1. WRK mở chức năng "Xem chi tiết dòng đối chiếu".
2. Người dùng cung cấp: Mã dòng đối chiếu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_VIEW).
4. Kiểm tra chủ sở hữu.
5. Trả số liệu từng nguồn.
6. Hệ thống trả kết quả: Số tiền theo hợp đồng, Số tiền theo nhật ký giờ, Số tiền theo phiếu lương, Số tiền thực nhận, Mức tối thiểu theo luật, Nhãn luật.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Dòng thuộc kỳ của người khác: không tìm thấy

**9. Logic nghiệp vụ**

- Kiểm tra chủ sở hữu
- Trả số liệu từng nguồn
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_041_01** – Given Có RECON_LINE, When WRK thực hiện "Xem chi tiết dòng đối chiếu" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi contract_amount, log_amount, payslip_amount, received_line_amount, law_min_amount, law_label.
- **REQ_041_02** – Given tình huống "Dòng thuộc kỳ của người khác", When WRK thực hiện "Xem chi tiết dòng đối chiếu", Then không tìm thấy.
- **REQ_041_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_042 – Xem công thức và nguồn dòng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_042 |
| Module / Sub-module | MOD_005 / Kết quả |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem công thức và số liệu thay vào, kèm trang tài liệu và điều luật |
| Permission | PER_PAY_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có RECON_LINE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: formula_text, source_refs, line_rule_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0135 | Mã dòng đối chiếu | RECON_LINE.line_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0147 | Công thức hiển thị | RECON_LINE.formula_text | TEXT | Công thức và số liệu thay vào |
| FLD_0148 | Nguồn dữ liệu | RECON_LINE.source_refs | JSONB | Tham chiếu tài liệu, trang, mục giờ |
| FLD_0146 | Quy tắc áp dụng | RECON_LINE.line_rule_id | UUID(36) | Quy tắc dùng |

**6. Luồng chính**

1. WRK mở chức năng "Xem công thức và nguồn dòng".
2. Người dùng cung cấp: Mã dòng đối chiếu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_VIEW).
4. Trả công thức đã lưu, tham chiếu nguồn, quy tắc, điều khoản và ngày hiệu lực.
5. Hệ thống trả kết quả: Công thức hiển thị, Nguồn dữ liệu, Quy tắc áp dụng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có công thức (dòng Chưa đủ): nêu dữ liệu còn thiếu

**9. Logic nghiệp vụ**

- Trả công thức đã lưu, tham chiếu nguồn, quy tắc, điều khoản và ngày hiệu lực
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_028 – Hỏi đáp luật chỉ dựa trích dẫn: Câu trả lời phải dẫn quy tắc, điều khoản và nguồn trong Law Pack; không có quy tắc phù hợp thì từ chối trả lời và nói rõ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_042_01** – Given Có RECON_LINE, When WRK thực hiện "Xem công thức và nguồn dòng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi formula_text, source_refs, line_rule_id.
- **REQ_042_02** – Given tình huống "Không có công thức (dòng Chưa đủ)", When WRK thực hiện "Xem công thức và nguồn dòng", Then nêu dữ liệu còn thiếu.
- **REQ_042_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_042_04** – Given quy tắc BR_028 (Hỏi đáp luật chỉ dựa trích dẫn), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_043 – Sinh giải thích nguyên nhân lệch

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_043 |
| Module / Sub-module | MOD_005 / Giải thích |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Diễn giải nguyên nhân lệch bằng ngôn ngữ dễ hiểu |
| Permission | PER_SYS_PAYROLL |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Dòng có trạng thái Lệch

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: explanation_text, explanation_mode

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0135 | Mã dòng đối chiếu | RECON_LINE.line_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0149 | Giải thích nguyên nhân lệch | RECON_LINE.explanation_text | TEXT | Câu giải thích cho người dùng |
| FLD_0150 | Cách sinh giải thích | RECON_LINE.explanation_mode | ENUM(10) | Theo BR_038, BR_039 |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_PAYROLL).
3. Dựng câu từ mẫu theo nguyên nhân do bộ tính cố định xác định.
4. Nếu được phép dùng LLM thì diễn đạt lại nhưng không đổi số liệu.
5. Kiểm tra số trong văn bản trùng số tính.
6. Hệ thống trả kết quả: Giải thích nguyên nhân lệch, Cách sinh giải thích.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: LLM lỗi hoặc hết hạn mức: dùng mẫu (explanation_mode=TEMPLATE)

**9. Logic nghiệp vụ**

- Dựng câu từ mẫu theo nguyên nhân do bộ tính cố định xác định
- Nếu được phép dùng LLM thì diễn đạt lại nhưng không đổi số liệu
- Kiểm tra số trong văn bản trùng số tính
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_PAYROLL | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_043_01** – Given Dòng có trạng thái Lệch, When SYS_AGENT thực hiện "Sinh giải thích nguyên nhân lệch" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi explanation_text, explanation_mode.
- **REQ_043_02** – Given tình huống "LLM lỗi hoặc hết hạn mức", When SYS_AGENT thực hiện "Sinh giải thích nguyên nhân lệch", Then dùng mẫu (explanation_mode=TEMPLATE).
- **REQ_043_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_043_04** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_043_05** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_044 – Đánh dấu xử lý dòng lệch

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_044 |
| Module / Sub-module | MOD_005 / Kết quả |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Ghi nhận đang hỏi, đã làm rõ hoặc bỏ qua |
| Permission | PER_PAY_UPDATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Dòng Lệch

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at
- Trạng thái: NONE→ASKING→CLARIFIED/IGNORED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0135 | Mã dòng đối chiếu | RECON_LINE.line_id | UUID(36) | Y | — | — |
| FLD_0151 | Tình trạng xử lý | RECON_LINE.resolution_status | ENUM(10) | Y | NONE | ∈{NONE,ASKING,CLARIFIED,IGNORED} |
| FLD_0152 | Ghi chú xử lý | RECON_LINE.resolution_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0154 | Cập nhật lúc | RECON_LINE.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Đánh dấu xử lý dòng lệch".
2. Người dùng cung cấp: Mã dòng đối chiếu, Tình trạng xử lý, Ghi chú xử lý.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_UPDATE).
4. Lưu trạng thái và ghi chú.
5. Có thể đưa vào Evidence Vault.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Ghi chú quá dài: từ chối

**9. Logic nghiệp vụ**

- Lưu trạng thái và ghi chú
- Có thể đưa vào Evidence Vault
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| resolution_status | ∈{NONE,ASKING,CLARIFIED,IGNORED} | Giá trị không hợp lệ: ∈{NONE,ASKING,CLARIFIED,IGNORED} |
| resolution_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NONE→ASKING→CLARIFIED/IGNORED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_044_01** – Given Dòng Lệch, When WRK thực hiện "Đánh dấu xử lý dòng lệch" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at; trạng thái chuyển NONE→ASKING→CLARIFIED/IGNORED.
- **REQ_044_02** – Given tình huống "Ghi chú quá dài", When WRK thực hiện "Đánh dấu xử lý dòng lệch", Then từ chối.
- **REQ_044_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_045 – Đối chiếu lại kỳ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_045 |
| Module / Sub-module | MOD_005 / Đối chiếu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chạy lại sau khi sửa dữ liệu hoặc Law Pack đổi |
| Permission | PER_PAY_RUN |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Kỳ đã đối chiếu và đã mở khóa nếu sửa giờ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: result_summary, pack_version_id, run_at
- Trạng thái: RECONCILED→RECONCILED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0129 | Kết quả tổng hợp | PAY_PERIOD.result_summary | ENUM(12) | Theo BR_050 |
| FLD_0131 | Phiên bản Law Pack đã dùng | PAY_PERIOD.pack_version_id | UUID(36) | Phiên bản dùng khi chạy |
| FLD_0130 | Chạy đối chiếu lúc | PAY_PERIOD.run_at | TIMESTAMP | Lần chạy gần nhất |

**6. Luồng chính**

1. WRK mở chức năng "Đối chiếu lại kỳ".
2. Người dùng cung cấp: Mã kỳ đối chiếu.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_RUN).
4. Như FUN_039.
5. Giữ lịch sử kết quả trước trong Evidence Vault nếu đã lưu.
6. Hệ thống trả kết quả: Kết quả tổng hợp, Phiên bản Law Pack đã dùng, Chạy đối chiếu lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giờ chưa mở khóa: yêu cầu FUN_146

**9. Logic nghiệp vụ**

- Như FUN_039
- Giữ lịch sử kết quả trước trong Evidence Vault nếu đã lưu
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.
- BR_015 – Khóa kỳ giờ làm: Mục giờ làm của kỳ đã đối chiếu bị khóa; chỉ sửa được sau khi mở khóa (FUN_146), có ghi nhật ký và đối chiếu lại.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| RECONCILED→RECONCILED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_RUN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_045_01** – Given Kỳ đã đối chiếu và đã mở khóa nếu sửa giờ, When WRK thực hiện "Đối chiếu lại kỳ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi result_summary, pack_version_id, run_at; trạng thái chuyển RECONCILED→RECONCILED.
- **REQ_045_02** – Given tình huống "Giờ chưa mở khóa", When WRK thực hiện "Đối chiếu lại kỳ", Then yêu cầu FUN_146.
- **REQ_045_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_045_04** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_045_05** – Given quy tắc BR_015 (Khóa kỳ giờ làm), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_046 – Xem lịch sử các kỳ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_046 |
| Module / Sub-module | MOD_005 / Kết quả |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem danh sách các kỳ và xu hướng chênh |
| Permission | PER_PAY_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: period_id, result_summary, received_amount, run_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0121 | Kỳ lương (YYYY-MM) | PAY_PERIOD.period_month | VARCHAR(7) | Y | — | YYYY-MM; mỗi người một kỳ một tháng |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0119 | Mã kỳ đối chiếu | PAY_PERIOD.period_id | UUID(36) | Định danh |
| FLD_0129 | Kết quả tổng hợp | PAY_PERIOD.result_summary | ENUM(12) | Theo BR_050 |
| FLD_0124 | Số tiền thực nhận | PAY_PERIOD.received_amount | DECIMAL(14,2) | Tiền thực sự vào tài khoản |
| FLD_0130 | Chạy đối chiếu lúc | PAY_PERIOD.run_at | TIMESTAMP | Lần chạy gần nhất |

**6. Luồng chính**

1. WRK mở chức năng "Xem lịch sử các kỳ".
2. Người dùng cung cấp: Kỳ lương (YYYY-MM).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PAY_VIEW).
4. Lọc theo chủ sở hữu.
5. Sắp xếp theo kỳ.
6. Hệ thống trả kết quả: Mã kỳ đối chiếu, Kết quả tổng hợp, Số tiền thực nhận, Chạy đối chiếu lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có kỳ: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ sở hữu
- Sắp xếp theo kỳ
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| period_month | YYYY-MM; mỗi người một kỳ một tháng | Giá trị không hợp lệ: YYYY-MM; mỗi người một kỳ một tháng |
| period_month | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PAY_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_046_01** – Given Đã đăng nhập, When WRK thực hiện "Xem lịch sử các kỳ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi period_id, result_summary, received_amount, run_at.
- **REQ_046_02** – Given tình huống "Chưa có kỳ", When WRK thực hiện "Xem lịch sử các kỳ", Then trạng thái rỗng.
- **REQ_046_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_006 – Salary Twin

### FUN_047 – Tạo kịch bản mô phỏng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_047 |
| Module / Sub-module | MOD_006 / Mô phỏng |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập giờ và đơn giá để xem thu nhập tối thiểu theo luật |
| Permission | PER_SCN_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: scenario_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0157 | Tên kịch bản | SCENARIO.scenario_name | VARCHAR(60) | Y | — | 1-60 ký tự |
| FLD_0158 | Lương giờ | SCENARIO.hourly_wage | DECIMAL(10,2) | Y | — | >0 |
| FLD_0159 | Giờ chuẩn mỗi tháng | SCENARIO.base_hours_per_month | DECIMAL(5,1) | Y | — | 0-300 |
| FLD_0160 | Giờ làm thêm | SCENARIO.overtime_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0161 | Giờ làm đêm | SCENARIO.night_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0162 | Giờ làm ngày nghỉ luật định | SCENARIO.holiday_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0163 | Phụ cấp cố định | SCENARIO.fixed_allowance | DECIMAL(12,2) | N | 0 | ≥0 |
| FLD_0164 | Khoản khấu trừ cố định | SCENARIO.fixed_deduction | DECIMAL(12,2) | N | 0 | ≥0 |
| FLD_0165 | Tỉnh áp dụng | SCENARIO.prefecture_code | VARCHAR(2) | Y | — | 01-47 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | SCENARIO.scenario_id | UUID(36) | Định danh |

**6. Luồng chính**

1. WRK mở chức năng "Tạo kịch bản mô phỏng".
2. Người dùng cung cấp: Tên kịch bản, Lương giờ, Giờ chuẩn mỗi tháng, Giờ làm thêm, Giờ làm đêm, Giờ làm ngày nghỉ luật định, Phụ cấp cố định, Khoản khấu trừ cố định, Tỉnh áp dụng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SCN_CREATE).
4. Kiểm tra giá trị.
5. Lưu kịch bản.
6. Hệ thống trả kết quả: Mã kịch bản.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giờ ngoài khoảng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra giá trị
- Lưu kịch bản
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| scenario_name | 1-60 ký tự | Giá trị không hợp lệ: 1-60 ký tự |
| scenario_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| hourly_wage | >0 | Giá trị không hợp lệ: >0 |
| hourly_wage | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| base_hours_per_month | 0-300 | Giá trị không hợp lệ: 0-300 |
| base_hours_per_month | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| overtime_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| night_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| holiday_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| fixed_allowance | ≥0 | Giá trị không hợp lệ: ≥0 |
| fixed_deduction | ≥0 | Giá trị không hợp lệ: ≥0 |
| prefecture_code | 01-47 | Giá trị không hợp lệ: 01-47 |
| prefecture_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SCN_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_047_01** – Given Đã đăng nhập, When WRK thực hiện "Tạo kịch bản mô phỏng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi scenario_id.
- **REQ_047_02** – Given tình huống "Giờ ngoài khoảng", When WRK thực hiện "Tạo kịch bản mô phỏng", Then từ chối.
- **REQ_047_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_048 – Chạy mô phỏng thu nhập

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_048 |
| Module / Sub-module | MOD_006 / Mô phỏng |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tính thu nhập tối thiểu theo luật và theo hợp đồng |
| Permission | PER_SCN_RUN |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có kịch bản

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: result_json, pack_version_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | SCENARIO.scenario_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0167 | Kết quả mô phỏng | SCENARIO.result_json | JSONB | Thu nhập tối thiểu theo luật, theo hợp đồng, chi tiết từng khoản |
| FLD_0166 | Phiên bản Law Pack | SCENARIO.pack_version_id | UUID(36) | Phiên bản dùng khi tính |

**6. Luồng chính**

1. WRK mở chức năng "Chạy mô phỏng thu nhập".
2. Người dùng cung cấp: Mã kịch bản.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SCN_RUN).
4. Chọn Law Pack theo tỉnh.
5. Bộ tính cố định tính lương giờ tối thiểu, phụ trội và tổng.
6. So với mức hợp đồng nhập.
7. Hệ thống trả kết quả: Kết quả mô phỏng, Phiên bản Law Pack.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hợp đồng thấp hơn lương tối thiểu tỉnh: nêu rõ chênh lệch và điều khoản

**9. Logic nghiệp vụ**

- Chọn Law Pack theo tỉnh
- Bộ tính cố định tính lương giờ tối thiểu, phụ trội và tổng
- So với mức hợp đồng nhập
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.
- BR_011 – Mức phụ trội Nhật Bản: Làm thêm ≥ 25%; ngày nghỉ luật định ≥ 35%; làm đêm 22:00-05:00 ≥ 25%; làm thêm cộng đêm ≥ 50%; ngày nghỉ luật định cộng đêm ≥ 60%; làm thêm trên 60 giờ mỗi tháng ≥ 50%. Giá trị lấy từ Law Pack, không mã hóa cứng.
- BR_012 – Lương tối thiểu theo tỉnh: Mức lương giờ tối thiểu lấy theo tỉnh nơi làm việc và ngày hiệu lực từ Law Pack.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SCN_RUN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_048_01** – Given Có kịch bản, When WRK thực hiện "Chạy mô phỏng thu nhập" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi result_json, pack_version_id.
- **REQ_048_02** – Given tình huống "Hợp đồng thấp hơn lương tối thiểu tỉnh", When WRK thực hiện "Chạy mô phỏng thu nhập", Then nêu rõ chênh lệch và điều khoản.
- **REQ_048_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_048_04** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_048_05** – Given quy tắc BR_011 (Mức phụ trội Nhật Bản), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_049 – Xem độ nhạy giờ làm thêm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_049 |
| Module / Sub-module | MOD_006 / Mô phỏng |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem thu nhập thay đổi khi tăng hoặc giảm giờ làm thêm |
| Permission | PER_SCN_RUN |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã chạy mô phỏng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: sensitivity_json

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | SCENARIO.scenario_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0168 | Độ nhạy | SCENARIO.sensitivity_json | JSONB | Thay đổi khi tăng giảm giờ làm thêm |

**6. Luồng chính**

1. WRK mở chức năng "Xem độ nhạy giờ làm thêm".
2. Người dùng cung cấp: Mã kịch bản.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SCN_RUN).
4. Tính lại theo từng bước giờ làm thêm.
5. Trả biểu đồ.
6. Hệ thống trả kết quả: Độ nhạy.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giờ vượt 60 mỗi tháng: áp dụng mức phụ trội cao hơn

**9. Logic nghiệp vụ**

- Tính lại theo từng bước giờ làm thêm
- Trả biểu đồ
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_011 – Mức phụ trội Nhật Bản: Làm thêm ≥ 25%; ngày nghỉ luật định ≥ 35%; làm đêm 22:00-05:00 ≥ 25%; làm thêm cộng đêm ≥ 50%; ngày nghỉ luật định cộng đêm ≥ 60%; làm thêm trên 60 giờ mỗi tháng ≥ 50%. Giá trị lấy từ Law Pack, không mã hóa cứng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SCN_RUN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_049_01** – Given Đã chạy mô phỏng, When WRK thực hiện "Xem độ nhạy giờ làm thêm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi sensitivity_json.
- **REQ_049_02** – Given tình huống "Giờ vượt 60 mỗi tháng", When WRK thực hiện "Xem độ nhạy giờ làm thêm", Then áp dụng mức phụ trội cao hơn.
- **REQ_049_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_049_04** – Given quy tắc BR_011 (Mức phụ trội Nhật Bản), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_050 – Sửa kịch bản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_050 |
| Module / Sub-module | MOD_006 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Sửa tham số kịch bản đã lưu |
| Permission | PER_SCN_UPDATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Kịch bản thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | SCENARIO.scenario_id | UUID(36) | Y | — | — |
| FLD_0158 | Lương giờ | SCENARIO.hourly_wage | DECIMAL(10,2) | Y | — | >0 |
| FLD_0160 | Giờ làm thêm | SCENARIO.overtime_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0161 | Giờ làm đêm | SCENARIO.night_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0162 | Giờ làm ngày nghỉ luật định | SCENARIO.holiday_hours | DECIMAL(5,1) | Y | 0 | 0-200 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0170 | Cập nhật lúc | SCENARIO.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Sửa kịch bản".
2. Người dùng cung cấp: Mã kịch bản, Lương giờ, Giờ làm thêm, Giờ làm đêm, Giờ làm ngày nghỉ luật định.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SCN_UPDATE).
4. Kiểm tra.
5. Lưu.
6. Yêu cầu chạy lại.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Như FUN_047

**9. Logic nghiệp vụ**

- Kiểm tra
- Lưu
- Yêu cầu chạy lại
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| hourly_wage | >0 | Giá trị không hợp lệ: >0 |
| hourly_wage | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| overtime_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| night_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| holiday_hours | 0-200 | Giá trị không hợp lệ: 0-200 |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SCN_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_050_01** – Given Kịch bản thuộc người dùng, When WRK thực hiện "Sửa kịch bản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_050_02** – Given tình huống "Như FUN_047", When WRK thực hiện "Sửa kịch bản", Then hệ thống từ chối và nêu lý do.
- **REQ_050_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_051 – Xóa kịch bản

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_051 |
| Module / Sub-module | MOD_006 / Quản lý |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa kịch bản |
| Permission | PER_SCN_DELETE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Kịch bản thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0155 | Mã kịch bản | SCENARIO.scenario_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0170 | Cập nhật lúc | SCENARIO.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xóa kịch bản".
2. Người dùng cung cấp: Mã kịch bản.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SCN_DELETE).
4. Kiểm tra chủ.
5. Xóa.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kịch bản không tồn tại: báo đã xóa

**9. Logic nghiệp vụ**

- Kiểm tra chủ
- Xóa
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SCN_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_051_01** – Given Kịch bản thuộc người dùng, When WRK thực hiện "Xóa kịch bản" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_051_02** – Given tình huống "Kịch bản không tồn tại", When WRK thực hiện "Xóa kịch bản", Then báo đã xóa.
- **REQ_051_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_052 – Nhập lời đề nghị việc làm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_052 |
| Module / Sub-module | MOD_006 / So sánh |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập các lời đề nghị để so sánh |
| Permission | PER_OFR_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: offer_id, estimated_monthly_net

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0174 | Tên lời đề nghị | JOB_OFFER.offer_name | VARCHAR(60) | Y | — | 1-60 ký tự |
| FLD_0175 | Tên chủ sử dụng | JOB_OFFER.employer_name | VARCHAR(120) | N | — | — |
| FLD_0176 | Tỉnh làm việc | JOB_OFFER.prefecture_code | VARCHAR(2) | Y | — | 01-47 |
| FLD_0177 | Lương giờ | JOB_OFFER.hourly_wage | DECIMAL(10,2) | Y | — | >0 |
| FLD_0178 | Giờ chuẩn mỗi tháng | JOB_OFFER.monthly_base_hours | DECIMAL(5,1) | Y | — | 0-300 |
| FLD_0179 | Giờ làm thêm dự kiến | JOB_OFFER.expected_overtime_hours | DECIMAL(5,1) | Y | 0 | 0-200 |
| FLD_0180 | Phụ cấp | JOB_OFFER.allowance_amount | DECIMAL(12,2) | N | 0 | ≥0 |
| FLD_0181 | Khấu trừ nhà ở | JOB_OFFER.housing_deduction | DECIMAL(12,2) | N | 0 | ≥0 |
| FLD_0182 | Khấu trừ khác | JOB_OFFER.other_deduction | DECIMAL(12,2) | N | 0 | ≥0 |
| FLD_0183 | Thời hạn hợp đồng (tháng) | JOB_OFFER.contract_term_months | INTEGER | N | — | 1-120 |
| FLD_0184 | Ghi chú | JOB_OFFER.offer_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0171 | Mã lời đề nghị | JOB_OFFER.offer_id | UUID(36) | Định danh |
| FLD_0185 | Thu nhập tháng ước tính | JOB_OFFER.estimated_monthly_net | DECIMAL(12,2) | Tính bằng máy tính cố định |

**6. Luồng chính**

1. WRK mở chức năng "Nhập lời đề nghị việc làm".
2. Người dùng cung cấp: Tên lời đề nghị, Tên chủ sử dụng, Tỉnh làm việc, Lương giờ, Giờ chuẩn mỗi tháng, Giờ làm thêm dự kiến, Phụ cấp, Khấu trừ nhà ở, Khấu trừ khác, Thời hạn hợp đồng (tháng), Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_OFR_CREATE).
4. Kiểm tra.
5. Bộ tính cố định tính thu nhập tháng ước tính.
6. Lưu cùng nhóm so sánh.
7. Hệ thống trả kết quả: Mã lời đề nghị, Thu nhập tháng ước tính.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Lương giờ dưới mức tối thiểu tỉnh: gắn cảnh báo

**9. Logic nghiệp vụ**

- Kiểm tra
- Bộ tính cố định tính thu nhập tháng ước tính
- Lưu cùng nhóm so sánh
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_012 – Lương tối thiểu theo tỉnh: Mức lương giờ tối thiểu lấy theo tỉnh nơi làm việc và ngày hiệu lực từ Law Pack.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| offer_name | 1-60 ký tự | Giá trị không hợp lệ: 1-60 ký tự |
| offer_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| prefecture_code | 01-47 | Giá trị không hợp lệ: 01-47 |
| prefecture_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| hourly_wage | >0 | Giá trị không hợp lệ: >0 |
| hourly_wage | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| monthly_base_hours | 0-300 | Giá trị không hợp lệ: 0-300 |
| monthly_base_hours | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| expected_overtime_hours | 0-200 | Giá trị không hợp lệ: 0-200 |
| allowance_amount | ≥0 | Giá trị không hợp lệ: ≥0 |
| housing_deduction | ≥0 | Giá trị không hợp lệ: ≥0 |
| other_deduction | ≥0 | Giá trị không hợp lệ: ≥0 |
| contract_term_months | 1-120 | Giá trị không hợp lệ: 1-120 |
| offer_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_OFR_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_052_01** – Given Đã đăng nhập, When WRK thực hiện "Nhập lời đề nghị việc làm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi offer_id, estimated_monthly_net.
- **REQ_052_02** – Given tình huống "Lương giờ dưới mức tối thiểu tỉnh", When WRK thực hiện "Nhập lời đề nghị việc làm", Then gắn cảnh báo.
- **REQ_052_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_052_04** – Given quy tắc BR_012 (Lương tối thiểu theo tỉnh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_052_05** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_053 – So sánh lời đề nghị

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_053 |
| Module / Sub-module | MOD_006 / So sánh |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem bảng so sánh các lời đề nghị cùng nhóm |
| Permission | PER_OFR_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có từ 2 lời đề nghị

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: offer_name, estimated_monthly_net, contract_term_months, housing_deduction

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0173 | Mã nhóm so sánh | JOB_OFFER.comparison_group_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0174 | Tên lời đề nghị | JOB_OFFER.offer_name | VARCHAR(60) | Tên gợi nhớ |
| FLD_0185 | Thu nhập tháng ước tính | JOB_OFFER.estimated_monthly_net | DECIMAL(12,2) | Tính bằng máy tính cố định |
| FLD_0183 | Thời hạn hợp đồng (tháng) | JOB_OFFER.contract_term_months | INTEGER | Thời hạn |
| FLD_0181 | Khấu trừ nhà ở | JOB_OFFER.housing_deduction | DECIMAL(12,2) | Tiền nhà trừ vào lương |

**6. Luồng chính**

1. WRK mở chức năng "So sánh lời đề nghị".
2. Người dùng cung cấp: Mã nhóm so sánh.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_OFR_VIEW).
4. Lấy các lời đề nghị cùng nhóm.
5. Sắp xếp theo thu nhập ước tính.
6. Hiển thị khác biệt.
7. Hệ thống trả kết quả: Tên lời đề nghị, Thu nhập tháng ước tính, Thời hạn hợp đồng (tháng), Khấu trừ nhà ở.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa đủ 2 lời đề nghị: nhắc thêm

**9. Logic nghiệp vụ**

- Lấy các lời đề nghị cùng nhóm
- Sắp xếp theo thu nhập ước tính
- Hiển thị khác biệt
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_OFR_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_053_01** – Given Có từ 2 lời đề nghị, When WRK thực hiện "So sánh lời đề nghị" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi offer_name, estimated_monthly_net, contract_term_months, housing_deduction.
- **REQ_053_02** – Given tình huống "Chưa đủ 2 lời đề nghị", When WRK thực hiện "So sánh lời đề nghị", Then nhắc thêm.
- **REQ_053_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_053_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_007 – Evidence Vault

### FUN_054 – Thêm bằng chứng vào kho

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_054 |
| Module / Sub-module | MOD_007 / Thêm |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Lưu tài liệu, kết quả đối chiếu hoặc khoảng giờ vào kho bằng chứng |
| Permission | PER_EVD_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: evidence_id, content_hash
- Trạng thái: (chưa có)→lưu

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0190 | Loại bằng chứng | EVIDENCE_ITEM.evidence_type | ENUM(16) | Y | — | ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} |
| FLD_0191 | Đối tượng gốc | EVIDENCE_ITEM.ref_entity_code | ENUM(16) | N | — | ∈{DOCUMENT,PAY_PERIOD,WORK_LOG,LETTER_DRAFT} |
| FLD_0192 | Mã đối tượng gốc | EVIDENCE_ITEM.ref_id | UUID(36) | N | — | — |
| FLD_0193 | Tiêu đề | EVIDENCE_ITEM.evidence_title | VARCHAR(120) | Y | — | 1-120 ký tự |
| FLD_0194 | Thẻ | EVIDENCE_ITEM.evidence_tags | VARCHAR(200) | N | — | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | N | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Định danh |
| FLD_0196 | Mã băm nội dung | EVIDENCE_ITEM.content_hash | CHAR(64) | Chống sửa đổi |

**6. Luồng chính**

1. WRK mở chức năng "Thêm bằng chứng vào kho".
2. Người dùng cung cấp: Loại bằng chứng, Đối tượng gốc, Mã đối tượng gốc, Tiêu đề, Thẻ, Ngày xảy ra sự việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_CREATE).
4. Kiểm tra đối tượng gốc thuộc người dùng.
5. Chụp nội dung và tính mã băm.
6. Tạo mục và dòng lịch sử CREATE.
7. Hệ thống trả kết quả: Mã bằng chứng, Mã băm nội dung.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Đối tượng gốc không thuộc người dùng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra đối tượng gốc thuộc người dùng
- Chụp nội dung và tính mã băm
- Tạo mục và dòng lịch sử CREATE
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| evidence_type | ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} | Giá trị không hợp lệ: ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} |
| ref_entity_code | ∈{DOCUMENT,PAY_PERIOD,WORK_LOG,LETTER_DRAFT} | Giá trị không hợp lệ: ∈{DOCUMENT,PAY_PERIOD,WORK_LOG,LETTER_DRAFT} |
| evidence_title | 1-120 ký tự | Giá trị không hợp lệ: 1-120 ký tự |
| evidence_title | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| evidence_tags | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự | Giá trị không hợp lệ: Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→lưu |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_054_01** – Given Đã đăng nhập, When WRK thực hiện "Thêm bằng chứng vào kho" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi evidence_id, content_hash; trạng thái chuyển (chưa có)→lưu.
- **REQ_054_02** – Given tình huống "Đối tượng gốc không thuộc người dùng", When WRK thực hiện "Thêm bằng chứng vào kho", Then từ chối.
- **REQ_054_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_054_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_055 – Xem kho bằng chứng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_055 |
| Module / Sub-module | MOD_007 / Xem |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem danh sách bằng chứng |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: evidence_id, evidence_title, evidence_tags, event_date

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0190 | Loại bằng chứng | EVIDENCE_ITEM.evidence_type | ENUM(16) | Y | — | ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Định danh |
| FLD_0193 | Tiêu đề | EVIDENCE_ITEM.evidence_title | VARCHAR(120) | Tiêu đề hiển thị |
| FLD_0194 | Thẻ | EVIDENCE_ITEM.evidence_tags | VARCHAR(200) | Phân loại |
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | Dùng sắp xếp dòng thời gian |

**6. Luồng chính**

1. WRK mở chức năng "Xem kho bằng chứng".
2. Người dùng cung cấp: Loại bằng chứng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Lọc theo chủ sở hữu.
5. Sắp xếp theo thời gian.
6. Hệ thống trả kết quả: Mã bằng chứng, Tiêu đề, Thẻ, Ngày xảy ra sự việc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kho rỗng: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ sở hữu
- Sắp xếp theo thời gian
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| evidence_type | ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} | Giá trị không hợp lệ: ∈{DOCUMENT,RECON_RESULT,WORK_LOG_RANGE,NOTE,LETTER} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_055_01** – Given Đã đăng nhập, When WRK thực hiện "Xem kho bằng chứng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi evidence_id, evidence_title, evidence_tags, event_date.
- **REQ_055_02** – Given tình huống "Kho rỗng", When WRK thực hiện "Xem kho bằng chứng", Then trạng thái rỗng.
- **REQ_055_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_056 – Tìm kiếm và lọc bằng chứng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_056 |
| Module / Sub-module | MOD_007 / Xem |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tìm theo từ khóa, thẻ, loại, khoảng ngày |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: evidence_id, evidence_title

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0193 | Tiêu đề | EVIDENCE_ITEM.evidence_title | VARCHAR(120) | Y | — | 1-120 ký tự |
| FLD_0194 | Thẻ | EVIDENCE_ITEM.evidence_tags | VARCHAR(200) | N | — | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | N | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Định danh |
| FLD_0193 | Tiêu đề | EVIDENCE_ITEM.evidence_title | VARCHAR(120) | Tiêu đề hiển thị |

**6. Luồng chính**

1. WRK mở chức năng "Tìm kiếm và lọc bằng chứng".
2. Người dùng cung cấp: Tiêu đề, Thẻ, Ngày xảy ra sự việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Tìm trong dữ liệu của chính người dùng.
5. Hệ thống trả kết quả: Mã bằng chứng, Tiêu đề.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có kết quả: gợi ý bỏ bớt bộ lọc

**9. Logic nghiệp vụ**

- Tìm trong dữ liệu của chính người dùng
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| evidence_title | 1-120 ký tự | Giá trị không hợp lệ: 1-120 ký tự |
| evidence_title | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| evidence_tags | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự | Giá trị không hợp lệ: Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_056_01** – Given Đã đăng nhập, When WRK thực hiện "Tìm kiếm và lọc bằng chứng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi evidence_id, evidence_title.
- **REQ_056_02** – Given tình huống "Không có kết quả", When WRK thực hiện "Tìm kiếm và lọc bằng chứng", Then gợi ý bỏ bớt bộ lọc.
- **REQ_056_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_057 – Gắn thẻ và ghi chú

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_057 |
| Module / Sub-module | MOD_007 / Sửa |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Thêm thẻ và ghi chú cho bằng chứng |
| Permission | PER_EVD_UPDATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Bằng chứng thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at, history_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Y | — | — |
| FLD_0194 | Thẻ | EVIDENCE_ITEM.evidence_tags | VARCHAR(200) | N | — | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |
| FLD_0195 | Ghi chú | EVIDENCE_ITEM.evidence_note | TEXT | N | — | ≤ 2000 ký tự |
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | N | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0199 | Cập nhật lúc | EVIDENCE_ITEM.updated_at | TIMESTAMP | Theo giờ UTC |
| FLD_0200 | Mã lịch sử | EVIDENCE_HISTORY.history_id | UUID(36) | Định danh |

**6. Luồng chính**

1. WRK mở chức năng "Gắn thẻ và ghi chú".
2. Người dùng cung cấp: Mã bằng chứng, Thẻ, Ghi chú, Ngày xảy ra sự việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_UPDATE).
4. Cập nhật.
5. Tính mã băm mới.
6. Ghi EVIDENCE_HISTORY TAG hoặc NOTE.
7. Hệ thống trả kết quả: Cập nhật lúc, Mã lịch sử.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Quá 10 thẻ: từ chối

**9. Logic nghiệp vụ**

- Cập nhật
- Tính mã băm mới
- Ghi EVIDENCE_HISTORY TAG hoặc NOTE
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| evidence_tags | Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự | Giá trị không hợp lệ: Tối đa 10 thẻ, mỗi thẻ ≤ 20 ký tự |
| evidence_note | ≤ 2000 ký tự | Giá trị không hợp lệ: ≤ 2000 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_057_01** – Given Bằng chứng thuộc người dùng, When WRK thực hiện "Gắn thẻ và ghi chú" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at, history_id.
- **REQ_057_02** – Given tình huống "Quá 10 thẻ", When WRK thực hiện "Gắn thẻ và ghi chú", Then từ chối.
- **REQ_057_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_057_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_058 – Xem dòng thời gian

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_058 |
| Module / Sub-module | MOD_007 / Xem |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem bằng chứng theo trục thời gian |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: evidence_title, evidence_type, event_date

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | N | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0193 | Tiêu đề | EVIDENCE_ITEM.evidence_title | VARCHAR(120) | Tiêu đề hiển thị |
| FLD_0190 | Loại bằng chứng | EVIDENCE_ITEM.evidence_type | ENUM(16) | Loại nội dung |
| FLD_0197 | Ngày xảy ra sự việc | EVIDENCE_ITEM.event_date | DATE | Dùng sắp xếp dòng thời gian |

**6. Luồng chính**

1. WRK mở chức năng "Xem dòng thời gian".
2. Người dùng cung cấp: Ngày xảy ra sự việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Sắp xếp theo event_date.
5. Nhóm theo tháng.
6. Hệ thống trả kết quả: Tiêu đề, Loại bằng chứng, Ngày xảy ra sự việc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có ngày sự việc: xếp theo ngày tạo

**9. Logic nghiệp vụ**

- Sắp xếp theo event_date
- Nhóm theo tháng
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_058_01** – Given Đã đăng nhập, When WRK thực hiện "Xem dòng thời gian" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi evidence_title, evidence_type, event_date.
- **REQ_058_02** – Given tình huống "Không có ngày sự việc", When WRK thực hiện "Xem dòng thời gian", Then xếp theo ngày tạo.
- **REQ_058_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_059 – Xem lịch sử sửa bằng chứng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_059 |
| Module / Sub-module | MOD_007 / Xem |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem mọi thay đổi của một bằng chứng |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Bằng chứng thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: change_type, previous_hash, new_hash, changed_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0202 | Loại thay đổi | EVIDENCE_HISTORY.change_type | ENUM(10) | Loại thay đổi |
| FLD_0203 | Mã băm trước thay đổi | EVIDENCE_HISTORY.previous_hash | CHAR(64) | Giá trị trước |
| FLD_0204 | Mã băm sau thay đổi | EVIDENCE_HISTORY.new_hash | CHAR(64) | Giá trị sau |
| FLD_0205 | Thay đổi lúc | EVIDENCE_HISTORY.changed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem lịch sử sửa bằng chứng".
2. Người dùng cung cấp: Mã bằng chứng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Liệt kê lịch sử theo thời gian.
5. Hệ thống trả kết quả: Loại thay đổi, Mã băm trước thay đổi, Mã băm sau thay đổi, Thay đổi lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có thay đổi: chỉ có dòng CREATE

**9. Logic nghiệp vụ**

- Liệt kê lịch sử theo thời gian
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_059_01** – Given Bằng chứng thuộc người dùng, When WRK thực hiện "Xem lịch sử sửa bằng chứng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi change_type, previous_hash, new_hash, changed_at.
- **REQ_059_02** – Given tình huống "Chưa có thay đổi", When WRK thực hiện "Xem lịch sử sửa bằng chứng", Then chỉ có dòng CREATE.
- **REQ_059_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_059_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_060 – Xác minh toàn vẹn bằng chứng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_060 |
| Module / Sub-module | MOD_007 / Toàn vẹn |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Kiểm tra nội dung chưa bị sửa so với mã băm |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Bằng chứng thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: content_hash

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0196 | Mã băm nội dung | EVIDENCE_ITEM.content_hash | CHAR(64) | Chống sửa đổi |

**6. Luồng chính**

1. WRK mở chức năng "Xác minh toàn vẹn bằng chứng".
2. Người dùng cung cấp: Mã bằng chứng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Tính lại mã băm nội dung và so với giá trị lưu.
5. Thông báo khớp hay không.
6. Hệ thống trả kết quả: Mã băm nội dung.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không khớp: cảnh báo và đề nghị khôi phục từ phiên bản trước

**9. Logic nghiệp vụ**

- Tính lại mã băm nội dung và so với giá trị lưu
- Thông báo khớp hay không
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_060_01** – Given Bằng chứng thuộc người dùng, When WRK thực hiện "Xác minh toàn vẹn bằng chứng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi content_hash.
- **REQ_060_02** – Given tình huống "Không khớp", When WRK thực hiện "Xác minh toàn vẹn bằng chứng", Then cảnh báo và đề nghị khôi phục từ phiên bản trước.
- **REQ_060_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_061 – Xóa bằng chứng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_061 |
| Module / Sub-module | MOD_007 / Xóa |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa bằng chứng khỏi kho |
| Permission | PER_EVD_DELETE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Bằng chứng thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0199 | Cập nhật lúc | EVIDENCE_ITEM.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xóa bằng chứng".
2. Người dùng cung cấp: Mã bằng chứng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_DELETE).
4. Kiểm tra bằng chứng có trong Case Pack đang chia sẻ.
5. Yêu cầu thu hồi trước.
6. Xóa.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Đang chia sẻ: không cho xóa

**9. Logic nghiệp vụ**

- Kiểm tra bằng chứng có trong Case Pack đang chia sẻ
- Yêu cầu thu hồi trước
- Xóa
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_061_01** – Given Bằng chứng thuộc người dùng, When WRK thực hiện "Xóa bằng chứng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_061_02** – Given tình huống "Đang chia sẻ", When WRK thực hiện "Xóa bằng chứng", Then không cho xóa.
- **REQ_061_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_061_04** – Given quy tắc BR_019 (Thu hồi chia sẻ có hiệu lực ngay), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_062 – Xuất bằng chứng ra PDF

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_062 |
| Module / Sub-module | MOD_007 / Xuất |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xuất các bằng chứng chọn thành một tệp PDF có mã băm |
| Permission | PER_EVD_EXPORT |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã chọn bằng chứng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pdf_file_ref, pdf_hash

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0188 | Mã bằng chứng | EVIDENCE_ITEM.evidence_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0215 | Khóa tệp PDF | CASE_PACK.pdf_file_ref | VARCHAR(255) | Tệp đã xuất |
| FLD_0216 | Mã băm PDF | CASE_PACK.pdf_hash | CHAR(64) | Chống sửa đổi |

**6. Luồng chính**

1. WRK mở chức năng "Xuất bằng chứng ra PDF".
2. Người dùng cung cấp: Mã bằng chứng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_EXPORT).
4. Ghép bằng chứng theo thứ tự thời gian.
5. Thêm trang tóm tắt và mã băm.
6. Lưu tệp.
7. Hệ thống trả kết quả: Khóa tệp PDF, Mã băm PDF.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.
- A2: Người dùng quay lại chỉnh nội dung sau khi xem trước.

**8. Luồng ngoại lệ**

- E1: Tệp quá lớn: chia nhiều phần

**9. Logic nghiệp vụ**

- Ghép bằng chứng theo thứ tự thời gian
- Thêm trang tóm tắt và mã băm
- Lưu tệp
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.
- BR_046 – Xem trước trước khi chia sẻ: Người dùng xem trước đúng nội dung sẽ được chia sẻ rồi mới xác nhận.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_EXPORT | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_062_01** – Given Đã chọn bằng chứng, When WRK thực hiện "Xuất bằng chứng ra PDF" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pdf_file_ref, pdf_hash.
- **REQ_062_02** – Given tình huống "Tệp quá lớn", When WRK thực hiện "Xuất bằng chứng ra PDF", Then chia nhiều phần.
- **REQ_062_03** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_062_04** – Given quy tắc BR_046 (Xem trước trước khi chia sẻ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_063 – Xem Passport làm việc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_063 |
| Module / Sub-module | MOD_007 / Passport |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem tổng hợp hồ sơ làm việc: nơi làm, thời gian, hợp đồng, kỳ đối chiếu |
| Permission | PER_EVD_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: employment_start_date, result_summary, document_type

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0021 | Tên chủ sử dụng lao động | USER_PROFILE.employer_name | VARCHAR(120) | N | — | 0-120 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0023 | Ngày bắt đầu làm việc | USER_PROFILE.employment_start_date | DATE | Dùng cho Passport |
| FLD_0129 | Kết quả tổng hợp | PAY_PERIOD.result_summary | ENUM(12) | Theo BR_050 |
| FLD_0058 | Loại tài liệu | DOCUMENT.document_type | ENUM(16) | Phân loại |

**6. Luồng chính**

1. WRK mở chức năng "Xem Passport làm việc".
2. Người dùng cung cấp: Tên chủ sử dụng lao động.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_EVD_VIEW).
4. Tổng hợp từ hồ sơ, hợp đồng, kết quả kỳ.
5. Chỉ đọc.
6. Hệ thống trả kết quả: Ngày bắt đầu làm việc, Kết quả tổng hợp, Loại tài liệu.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa khai báo hồ sơ: nhắc nhập

**9. Logic nghiệp vụ**

- Tổng hợp từ hồ sơ, hợp đồng, kết quả kỳ
- Chỉ đọc
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| employer_name | 0-120 ký tự | Giá trị không hợp lệ: 0-120 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_EVD_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_063_01** – Given Đã đăng nhập, When WRK thực hiện "Xem Passport làm việc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi employment_start_date, result_summary, document_type.
- **REQ_063_02** – Given tình huống "Chưa khai báo hồ sơ", When WRK thực hiện "Xem Passport làm việc", Then nhắc nhập.
- **REQ_063_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_008 – Legal Compass

### FUN_064 – Hỏi đáp luật có trích dẫn

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_064 |
| Module / Sub-module | MOD_008 / Hỏi đáp |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Hỏi câu hỏi về quyền lợi và nhận câu trả lời dẫn quy tắc |
| Permission | PER_QA_ASK |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập; Law Pack đã tải

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: qa_id, answer_text, answer_mode, citations, qa_pack_version_id
- Trạng thái: (chưa có)→CITED/REFUSED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0355 | Câu hỏi | LAW_QA.question_text | TEXT | Y | — | 5-1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0353 | Mã hỏi đáp | LAW_QA.qa_id | UUID(36) | Định danh |
| FLD_0356 | Câu trả lời | LAW_QA.answer_text | TEXT | Câu trả lời có trích dẫn |
| FLD_0357 | Kiểu trả lời | LAW_QA.answer_mode | ENUM(8) | CITED nếu có quy tắc phù hợp |
| FLD_0358 | Trích dẫn | LAW_QA.citations | JSONB | Danh sách rule_code, điều khoản, nguồn, ngày hiệu lực |
| FLD_0359 | Phiên bản Law Pack | LAW_QA.qa_pack_version_id | UUID(36) | Phiên bản dùng |

**6. Luồng chính**

1. WRK mở chức năng "Hỏi đáp luật có trích dẫn".
2. Người dùng cung cấp: Câu hỏi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_QA_ASK).
4. Tìm quy tắc liên quan trong Law Pack.
5. Nếu có thì sinh câu trả lời chỉ từ nội dung quy tắc, kèm trích dẫn.
6. Nếu không có hoặc độ tin cậy dưới ngưỡng thì từ chối.
7. Kiểm tra mọi con số trong câu trả lời có trong quy tắc.
8. Hệ thống trả kết quả: Mã hỏi đáp, Câu trả lời, Kiểu trả lời, Trích dẫn, Phiên bản Law Pack.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có quy tắc: từ chối và nêu rõ
- E2: Hết hạn mức LLM: trả đoạn quy tắc nguyên văn

**9. Logic nghiệp vụ**

- Tìm quy tắc liên quan trong Law Pack
- Nếu có thì sinh câu trả lời chỉ từ nội dung quy tắc, kèm trích dẫn
- Nếu không có hoặc độ tin cậy dưới ngưỡng thì từ chối
- Kiểm tra mọi con số trong câu trả lời có trong quy tắc
- BR_028 – Hỏi đáp luật chỉ dựa trích dẫn: Câu trả lời phải dẫn quy tắc, điều khoản và nguồn trong Law Pack; không có quy tắc phù hợp thì từ chối trả lời và nói rõ.
- BR_029 – Ngưỡng từ chối: Khi độ tin cậy thấp hơn ngưỡng cấu hình, hệ thống nêu rõ không chắc chắn thay vì trả lời.
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| question_text | 5-1000 ký tự | Giá trị không hợp lệ: 5-1000 ký tự |
| question_text | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→CITED/REFUSED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_QA_ASK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_064_01** – Given Đã đăng nhập; Law Pack đã tải, When WRK thực hiện "Hỏi đáp luật có trích dẫn" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi qa_id, answer_text, answer_mode, citations, qa_pack_version_id; trạng thái chuyển (chưa có)→CITED/REFUSED.
- **REQ_064_02** – Given tình huống "Không có quy tắc", When WRK thực hiện "Hỏi đáp luật có trích dẫn", Then từ chối và nêu rõ.
- **REQ_064_03** – Given tình huống "Hết hạn mức LLM", When WRK thực hiện "Hỏi đáp luật có trích dẫn", Then trả đoạn quy tắc nguyên văn.
- **REQ_064_04** – Given quy tắc BR_028 (Hỏi đáp luật chỉ dựa trích dẫn), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_064_05** – Given quy tắc BR_029 (Ngưỡng từ chối), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_064_06** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_065 – Xem trích dẫn quy tắc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_065 |
| Module / Sub-module | MOD_008 / Hỏi đáp |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem điều khoản, nguồn, ngày hiệu lực của quy tắc được dẫn |
| Permission | PER_QA_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có câu trả lời CITED

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: citations, article_ref, effective_from, source_url

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0353 | Mã hỏi đáp | LAW_QA.qa_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0358 | Trích dẫn | LAW_QA.citations | JSONB | Danh sách rule_code, điều khoản, nguồn, ngày hiệu lực |
| FLD_0261 | Điều khoản gốc | LAW_RULE.article_ref | VARCHAR(120) | Điều, khoản của văn bản gốc |
| FLD_0266 | Hiệu lực từ | LAW_RULE.effective_from | DATE | Ngày bắt đầu áp dụng |
| FLD_0243 | Đường dẫn | LAW_SOURCE.source_url | VARCHAR(500) | Liên kết nguồn |

**6. Luồng chính**

1. WRK mở chức năng "Xem trích dẫn quy tắc".
2. Người dùng cung cấp: Mã hỏi đáp.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_QA_VIEW).
4. Trả quy tắc và nguồn từ phiên bản Law Pack đã dùng.
5. Hệ thống trả kết quả: Trích dẫn, Điều khoản gốc, Hiệu lực từ, Đường dẫn.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Phiên bản quy tắc đã bị thay: hiển thị phiên bản cũ kèm ghi chú

**9. Logic nghiệp vụ**

- Trả quy tắc và nguồn từ phiên bản Law Pack đã dùng
- BR_028 – Hỏi đáp luật chỉ dựa trích dẫn: Câu trả lời phải dẫn quy tắc, điều khoản và nguồn trong Law Pack; không có quy tắc phù hợp thì từ chối trả lời và nói rõ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_QA_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_065_01** – Given Có câu trả lời CITED, When WRK thực hiện "Xem trích dẫn quy tắc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi citations, article_ref, effective_from, source_url.
- **REQ_065_02** – Given tình huống "Phiên bản quy tắc đã bị thay", When WRK thực hiện "Xem trích dẫn quy tắc", Then hiển thị phiên bản cũ kèm ghi chú.
- **REQ_065_03** – Given quy tắc BR_028 (Hỏi đáp luật chỉ dựa trích dẫn), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_066 – Phản hồi câu trả lời

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_066 |
| Module / Sub-module | MOD_008 / Hỏi đáp |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đánh giá hữu ích hoặc sai |
| Permission | PER_QA_FEEDBACK |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có câu trả lời

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: feedback_value
- Trạng thái: NONE→HELPFUL/WRONG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0353 | Mã hỏi đáp | LAW_QA.qa_id | UUID(36) | Y | — | — |
| FLD_0360 | Đánh giá | LAW_QA.feedback_value | ENUM(8) | Y | NONE | ∈{NONE,HELPFUL,WRONG} |
| FLD_0361 | Ghi chú phản hồi | LAW_QA.feedback_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0360 | Đánh giá | LAW_QA.feedback_value | ENUM(8) | Phản hồi của người dùng |

**6. Luồng chính**

1. WRK mở chức năng "Phản hồi câu trả lời".
2. Người dùng cung cấp: Mã hỏi đáp, Đánh giá, Ghi chú phản hồi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_QA_FEEDBACK).
4. Lưu phản hồi.
5. Phản hồi sai được đưa vào hàng chờ rà soát của Quản trị viên (không kèm nội dung cá nhân).
6. Hệ thống trả kết quả: Đánh giá.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Ghi chú quá dài: từ chối

**9. Logic nghiệp vụ**

- Lưu phản hồi
- Phản hồi sai được đưa vào hàng chờ rà soát của Quản trị viên (không kèm nội dung cá nhân)
- BR_005 – Quản trị viên không đọc nội dung người dùng: Quản trị viên không được đọc tài liệu, kết quả đối chiếu, bằng chứng hoặc Case Pack của người dùng; chỉ thấy siêu dữ liệu và số liệu tổng hợp.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| feedback_value | ∈{NONE,HELPFUL,WRONG} | Giá trị không hợp lệ: ∈{NONE,HELPFUL,WRONG} |
| feedback_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NONE→HELPFUL/WRONG |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_QA_FEEDBACK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_066_01** – Given Có câu trả lời, When WRK thực hiện "Phản hồi câu trả lời" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi feedback_value; trạng thái chuyển NONE→HELPFUL/WRONG.
- **REQ_066_02** – Given tình huống "Ghi chú quá dài", When WRK thực hiện "Phản hồi câu trả lời", Then từ chối.
- **REQ_066_03** – Given quy tắc BR_005 (Quản trị viên không đọc nội dung người dùng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_067 – Xem lịch sử hỏi đáp

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_067 |
| Module / Sub-module | MOD_008 / Hỏi đáp |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem các câu hỏi đã hỏi |
| Permission | PER_QA_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: question_text, answer_mode, asked_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0362 | Hỏi lúc | LAW_QA.asked_at | TIMESTAMP | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0355 | Câu hỏi | LAW_QA.question_text | TEXT | Câu hỏi của người dùng |
| FLD_0357 | Kiểu trả lời | LAW_QA.answer_mode | ENUM(8) | CITED nếu có quy tắc phù hợp |
| FLD_0362 | Hỏi lúc | LAW_QA.asked_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem lịch sử hỏi đáp".
2. Người dùng cung cấp: Hỏi lúc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_QA_VIEW).
4. Lọc theo chủ sở hữu.
5. Hệ thống trả kết quả: Câu hỏi, Kiểu trả lời, Hỏi lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ sở hữu
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_QA_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_067_01** – Given Đã đăng nhập, When WRK thực hiện "Xem lịch sử hỏi đáp" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi question_text, answer_mode, asked_at.
- **REQ_067_02** – Given tình huống "Chưa có", When WRK thực hiện "Xem lịch sử hỏi đáp", Then trạng thái rỗng.
- **REQ_067_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_068 – Tra cứu quy tắc theo chủ đề

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_068 |
| Module / Sub-module | MOD_008 / Tra cứu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Duyệt quy tắc luật theo chủ đề |
| Permission | PER_LAW_BROWSE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Law Pack đã tải

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_title, article_ref, effective_from, review_label

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0259 | Chủ đề | LAW_RULE.rule_topic | ENUM(20) | Y | — | ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0260 | Tiêu đề quy tắc | LAW_RULE.rule_title | VARCHAR(200) | Tên quy tắc |
| FLD_0261 | Điều khoản gốc | LAW_RULE.article_ref | VARCHAR(120) | Điều, khoản của văn bản gốc |
| FLD_0266 | Hiệu lực từ | LAW_RULE.effective_from | DATE | Ngày bắt đầu áp dụng |
| FLD_0268 | Nhãn rà soát | LAW_RULE.review_label | ENUM(14) | Ai đã rà soát |

**6. Luồng chính**

1. WRK mở chức năng "Tra cứu quy tắc theo chủ đề".
2. Người dùng cung cấp: Chủ đề.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LAW_BROWSE).
4. Lọc quy tắc RELEASED theo hành lang và chủ đề.
5. Chọn quy tắc hiệu lực theo ngày hiện tại.
6. Hệ thống trả kết quả: Tiêu đề quy tắc, Điều khoản gốc, Hiệu lực từ, Nhãn rà soát.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chủ đề không có quy tắc: nêu rõ chưa có

**9. Logic nghiệp vụ**

- Lọc quy tắc RELEASED theo hành lang và chủ đề
- Chọn quy tắc hiệu lực theo ngày hiện tại
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| rule_topic | ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} | Giá trị không hợp lệ: ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} |
| rule_topic | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LAW_BROWSE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_068_01** – Given Law Pack đã tải, When WRK thực hiện "Tra cứu quy tắc theo chủ đề" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_title, article_ref, effective_from, review_label.
- **REQ_068_02** – Given tình huống "Chủ đề không có quy tắc", When WRK thực hiện "Tra cứu quy tắc theo chủ đề", Then nêu rõ chưa có.
- **REQ_068_03** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_069 – Tra mức lương tối thiểu theo tỉnh

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_069 |
| Module / Sub-module | MOD_008 / Tra cứu |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem mức lương giờ tối thiểu theo tỉnh |
| Permission | PER_LAW_BROWSE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Law Pack đã tải

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_parameters, effective_from

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0020 | Tỉnh nơi làm việc | USER_PROFILE.work_prefecture_code | VARCHAR(2) | Y | — | Mã tỉnh Nhật 01-47 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0264 | Tham số | LAW_RULE.rule_parameters | JSONB | Ví dụ tỷ lệ, ngưỡng, mức trần |
| FLD_0266 | Hiệu lực từ | LAW_RULE.effective_from | DATE | Ngày bắt đầu áp dụng |

**6. Luồng chính**

1. WRK mở chức năng "Tra mức lương tối thiểu theo tỉnh".
2. Người dùng cung cấp: Tỉnh nơi làm việc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LAW_BROWSE).
4. Chọn quy tắc MIN_WAGE theo tỉnh và ngày.
5. Hệ thống trả kết quả: Tham số, Hiệu lực từ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có quy tắc cho tỉnh: NO_RULE

**9. Logic nghiệp vụ**

- Chọn quy tắc MIN_WAGE theo tỉnh và ngày
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.
- BR_012 – Lương tối thiểu theo tỉnh: Mức lương giờ tối thiểu lấy theo tỉnh nơi làm việc và ngày hiệu lực từ Law Pack.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| work_prefecture_code | Mã tỉnh Nhật 01-47 | Giá trị không hợp lệ: Mã tỉnh Nhật 01-47 |
| work_prefecture_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LAW_BROWSE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_069_01** – Given Law Pack đã tải, When WRK thực hiện "Tra mức lương tối thiểu theo tỉnh" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_parameters, effective_from.
- **REQ_069_02** – Given tình huống "Chưa có quy tắc cho tỉnh", When WRK thực hiện "Tra mức lương tối thiểu theo tỉnh", Then NO_RULE.
- **REQ_069_03** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_069_04** – Given quy tắc BR_012 (Lương tối thiểu theo tỉnh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_070 – Xem phiên bản Law Pack đang dùng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_070 |
| Module / Sub-module | MOD_008 / Law Pack |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem nhãn phiên bản và ngày phát hành |
| Permission | PER_LAW_BROWSE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: version_label, released_at, change_note

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0251 | Mã hành lang | CORRIDOR.corridor_code | VARCHAR(8) | Y | — | Dạng XX-YY (nước gửi - nước làm việc) |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0286 | Nhãn phiên bản | LAW_PACK_VERSION.version_label | VARCHAR(20) | Nhãn hiển thị |
| FLD_0290 | Phát hành lúc | LAW_PACK_VERSION.released_at | TIMESTAMP | Theo giờ UTC |
| FLD_0288 | Ghi chú thay đổi | LAW_PACK_VERSION.change_note | TEXT | Nội dung thay đổi |

**6. Luồng chính**

1. WRK mở chức năng "Xem phiên bản Law Pack đang dùng".
2. Người dùng cung cấp: Mã hành lang.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LAW_BROWSE).
4. Trả phiên bản đang hoạt động của hành lang.
5. Hệ thống trả kết quả: Nhãn phiên bản, Phát hành lúc, Ghi chú thay đổi.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có phiên bản: thông báo

**9. Logic nghiệp vụ**

- Trả phiên bản đang hoạt động của hành lang
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| corridor_code | Dạng XX-YY (nước gửi - nước làm việc) | Giá trị không hợp lệ: Dạng XX-YY (nước gửi - nước làm việc) |
| corridor_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LAW_BROWSE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_070_01** – Given Đã đăng nhập, When WRK thực hiện "Xem phiên bản Law Pack đang dùng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi version_label, released_at, change_note.
- **REQ_070_02** – Given tình huống "Chưa có phiên bản", When WRK thực hiện "Xem phiên bản Law Pack đang dùng", Then thông báo.
- **REQ_070_03** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_071 – Đồng bộ Law Pack về thiết bị

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_071 |
| Module / Sub-module | MOD_008 / Law Pack |
| Actor | SYS_SCHED (Bộ lập lịch) |
| Mô tả | Tải phiên bản Law Pack mới về thiết bị để dùng ngoại tuyến |
| Permission | PER_SYS_LAWSYNC |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có phiên bản mới

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pack_version_id, checksum

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0251 | Mã hành lang | CORRIDOR.corridor_code | VARCHAR(8) | Y | — | Dạng XX-YY (nước gửi - nước làm việc) |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | LAW_PACK_VERSION.pack_version_id | UUID(36) | Định danh |
| FLD_0293 | Mã kiểm tra | LAW_PACK_VERSION.checksum | CHAR(64) | Kiểm tra toàn vẹn khi đồng bộ xuống thiết bị |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_LAWSYNC).
3. So sánh phiên bản.
4. Tải gói.
5. Kiểm tra mã kiểm tra.
6. Thay gói cũ.
7. Hệ thống trả kết quả: Mã phiên bản, Mã kiểm tra.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Mã kiểm tra sai: giữ gói cũ và thử lại

**9. Logic nghiệp vụ**

- So sánh phiên bản
- Tải gói
- Kiểm tra mã kiểm tra
- Thay gói cũ
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.
- BR_010 – Chọn quy tắc theo ngày hiệu lực: Khi tính, chọn quy tắc có effective_from ≤ ngày áp dụng và (effective_to rỗng hoặc ≥ ngày áp dụng), thuộc phiên bản Law Pack đã phát hành mới nhất.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| corridor_code | Dạng XX-YY (nước gửi - nước làm việc) | Giá trị không hợp lệ: Dạng XX-YY (nước gửi - nước làm việc) |
| corridor_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_LAWSYNC | SYS_SCHED (Bộ lập lịch) | Chỉ siêu dữ liệu cần để lập lịch; không đọc nội dung tài liệu |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_071_01** – Given Có phiên bản mới, When SYS_SCHED thực hiện "Đồng bộ Law Pack về thiết bị" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pack_version_id, checksum.
- **REQ_071_02** – Given tình huống "Mã kiểm tra sai", When SYS_SCHED thực hiện "Đồng bộ Law Pack về thiết bị", Then giữ gói cũ và thử lại.
- **REQ_071_03** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_071_04** – Given quy tắc BR_010 (Chọn quy tắc theo ngày hiệu lực), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_009 – Rights Agent

### FUN_072 – Giao nhiệm vụ cho agent

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_072 |
| Module / Sub-module | MOD_009 / Nhiệm vụ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Giao yêu cầu bằng ngôn ngữ tự nhiên |
| Permission | PER_AGENT_TASK |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: task_id, task_status
- Trạng thái: (chưa có)→RUNNING

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0377 | Yêu cầu của người dùng | AGENT_TASK.request_text | TEXT | N | — | ≤ 2000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0375 | Mã nhiệm vụ | AGENT_TASK.task_id | UUID(36) | Định danh |
| FLD_0380 | Trạng thái nhiệm vụ | AGENT_TASK.task_status | ENUM(18) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Giao nhiệm vụ cho agent".
2. Người dùng cung cấp: Yêu cầu của người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_TASK).
4. Orchestrator phân tích yêu cầu.
5. Lập kế hoạch.
6. Giao cho agent chuyên biệt.
7. Từ chối yêu cầu ngoài phạm vi.
8. Hệ thống trả kết quả: Mã nhiệm vụ, Trạng thái nhiệm vụ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Yêu cầu ngoài phạm vi: nêu rõ và gợi ý chức năng phù hợp

**9. Logic nghiệp vụ**

- Orchestrator phân tích yêu cầu
- Lập kế hoạch
- Giao cho agent chuyên biệt
- Từ chối yêu cầu ngoài phạm vi
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_048 – Không có mức tự chủ 3: Agent không được tự thực hiện hành động đi ra ngoài (gửi thư, chia sẻ, thanh toán).

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| request_text | ≤ 2000 ký tự | Giá trị không hợp lệ: ≤ 2000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→RUNNING |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_TASK | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_072_01** – Given Đã đăng nhập, When WRK thực hiện "Giao nhiệm vụ cho agent" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi task_id, task_status; trạng thái chuyển (chưa có)→RUNNING.
- **REQ_072_02** – Given tình huống "Yêu cầu ngoài phạm vi", When WRK thực hiện "Giao nhiệm vụ cho agent", Then nêu rõ và gợi ý chức năng phù hợp.
- **REQ_072_03** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_072_04** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_072_05** – Given quy tắc BR_048 (Không có mức tự chủ 3), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_073 – Xem kế hoạch điều phối

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_073 |
| Module / Sub-module | MOD_009 / Nhiệm vụ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem các bước và agent được giao |
| Permission | PER_AGENT_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có nhiệm vụ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: orchestrator_plan

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0375 | Mã nhiệm vụ | AGENT_TASK.task_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0379 | Kế hoạch điều phối | AGENT_TASK.orchestrator_plan | JSONB | Các bước và agent được giao |

**6. Luồng chính**

1. WRK mở chức năng "Xem kế hoạch điều phối".
2. Người dùng cung cấp: Mã nhiệm vụ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_VIEW).
4. Kiểm tra chủ.
5. Trả kế hoạch.
6. Hệ thống trả kết quả: Kế hoạch điều phối.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Nhiệm vụ không tồn tại: không tìm thấy

**9. Logic nghiệp vụ**

- Kiểm tra chủ
- Trả kế hoạch
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_073_01** – Given Có nhiệm vụ, When WRK thực hiện "Xem kế hoạch điều phối" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi orchestrator_plan.
- **REQ_073_02** – Given tình huống "Nhiệm vụ không tồn tại", When WRK thực hiện "Xem kế hoạch điều phối", Then không tìm thấy.
- **REQ_073_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_074 – Xem tiến độ và kết quả nhiệm vụ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_074 |
| Module / Sub-module | MOD_009 / Nhiệm vụ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem trạng thái, kết quả, lý do thất bại |
| Permission | PER_AGENT_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có nhiệm vụ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: task_status, verifier_status, result_summary, failure_reason
- Trạng thái: RUNNING→DONE/FAILED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0375 | Mã nhiệm vụ | AGENT_TASK.task_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0380 | Trạng thái nhiệm vụ | AGENT_TASK.task_status | ENUM(18) | Tiến độ |
| FLD_0381 | Kết quả kiểm chứng | AGENT_TASK.verifier_status | ENUM(8) | Kết quả của agent kiểm chứng |
| FLD_0382 | Tóm tắt kết quả | AGENT_TASK.result_summary | TEXT | Kết quả trả người dùng |
| FLD_0383 | Lý do thất bại | AGENT_TASK.failure_reason | VARCHAR(300) | Khi FAILED |

**6. Luồng chính**

1. WRK mở chức năng "Xem tiến độ và kết quả nhiệm vụ".
2. Người dùng cung cấp: Mã nhiệm vụ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_VIEW).
4. Trả trạng thái.
5. Kết quả chỉ hiển thị khi agent Kiểm chứng PASSED.
6. Hệ thống trả kết quả: Trạng thái nhiệm vụ, Kết quả kiểm chứng, Tóm tắt kết quả, Lý do thất bại.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kiểm chứng FAILED: hiển thị cảnh báo kết quả chưa đáng tin

**9. Logic nghiệp vụ**

- Trả trạng thái
- Kết quả chỉ hiển thị khi agent Kiểm chứng PASSED
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| RUNNING→DONE/FAILED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_074_01** – Given Có nhiệm vụ, When WRK thực hiện "Xem tiến độ và kết quả nhiệm vụ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi task_status, verifier_status, result_summary, failure_reason; trạng thái chuyển RUNNING→DONE/FAILED.
- **REQ_074_02** – Given tình huống "Kiểm chứng FAILED", When WRK thực hiện "Xem tiến độ và kết quả nhiệm vụ", Then hiển thị cảnh báo kết quả chưa đáng tin.
- **REQ_074_03** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_075 – Duyệt hành động của agent

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_075 |
| Module / Sub-module | MOD_009 / Phê duyệt |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Duyệt hành động đang chờ |
| Permission | PER_AGENT_APPROVE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Có AGENT_ACTION PENDING

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: approval_status, decided_at, executed_at
- Trạng thái: PENDING→APPROVED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0386 | Mã hành động | AGENT_ACTION.action_id | UUID(36) | Y | — | — |
| FLD_0394 | Quyết định của người dùng | AGENT_ACTION.decision_input | ENUM(8) | N | — | ∈{APPROVE,REJECT} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0393 | Trạng thái phê duyệt | AGENT_ACTION.approval_status | ENUM(12) | Phê duyệt của người dùng |
| FLD_0395 | Quyết định lúc | AGENT_ACTION.decided_at | TIMESTAMP | Theo giờ UTC |
| FLD_0399 | Thực hiện lúc | AGENT_ACTION.executed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Duyệt hành động của agent".
2. Người dùng cung cấp: Mã hành động, Quyết định của người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_APPROVE).
4. Hiển thị nội dung đầy đủ.
5. Người dùng chọn APPROVE.
6. Thực hiện.
7. Ghi nhật ký.
8. Đặt undo_until.
9. Hệ thống trả kết quả: Trạng thái phê duyệt, Quyết định lúc, Thực hiện lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Quá hạn: EXPIRED, không thực hiện

**9. Logic nghiệp vụ**

- Hiển thị nội dung đầy đủ
- Người dùng chọn APPROVE
- Thực hiện
- Ghi nhật ký
- Đặt undo_until
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.
- BR_047 – Hạn phê duyệt và hoàn tác: Đề xuất của agent hết hạn nếu không duyệt trong 48 giờ; thao tác nhỏ hoàn tác được trong 24 giờ.
- BR_048 – Không có mức tự chủ 3: Agent không được tự thực hiện hành động đi ra ngoài (gửi thư, chia sẻ, thanh toán).

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| decision_input | ∈{APPROVE,REJECT} | Giá trị không hợp lệ: ∈{APPROVE,REJECT} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| PENDING→APPROVED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_APPROVE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_075_01** – Given Có AGENT_ACTION PENDING, When WRK thực hiện "Duyệt hành động của agent" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi approval_status, decided_at, executed_at; trạng thái chuyển PENDING→APPROVED.
- **REQ_075_02** – Given tình huống "Quá hạn", When WRK thực hiện "Duyệt hành động của agent", Then EXPIRED, không thực hiện.
- **REQ_075_03** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_075_04** – Given quy tắc BR_047 (Hạn phê duyệt và hoàn tác), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_075_05** – Given quy tắc BR_048 (Không có mức tự chủ 3), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_076 – Từ chối hành động của agent

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_076 |
| Module / Sub-module | MOD_009 / Phê duyệt |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Từ chối hành động đang chờ |
| Permission | PER_AGENT_APPROVE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có AGENT_ACTION PENDING

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: approval_status, decided_at
- Trạng thái: PENDING→REJECTED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0386 | Mã hành động | AGENT_ACTION.action_id | UUID(36) | Y | — | — |
| FLD_0394 | Quyết định của người dùng | AGENT_ACTION.decision_input | ENUM(8) | N | — | ∈{APPROVE,REJECT} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0393 | Trạng thái phê duyệt | AGENT_ACTION.approval_status | ENUM(12) | Phê duyệt của người dùng |
| FLD_0395 | Quyết định lúc | AGENT_ACTION.decided_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Từ chối hành động của agent".
2. Người dùng cung cấp: Mã hành động, Quyết định của người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_APPROVE).
4. Đặt REJECTED.
5. Agent không tự thử lại hành động này.
6. Hệ thống trả kết quả: Trạng thái phê duyệt, Quyết định lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hành động đã hết hạn: không áp dụng

**9. Logic nghiệp vụ**

- Đặt REJECTED
- Agent không tự thử lại hành động này
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| decision_input | ∈{APPROVE,REJECT} | Giá trị không hợp lệ: ∈{APPROVE,REJECT} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| PENDING→REJECTED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_APPROVE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_076_01** – Given Có AGENT_ACTION PENDING, When WRK thực hiện "Từ chối hành động của agent" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi approval_status, decided_at; trạng thái chuyển PENDING→REJECTED.
- **REQ_076_02** – Given tình huống "Hành động đã hết hạn", When WRK thực hiện "Từ chối hành động của agent", Then không áp dụng.
- **REQ_076_03** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_077 – Hoàn tác thao tác nhỏ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_077 |
| Module / Sub-module | MOD_009 / Phê duyệt |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Hoàn tác thao tác nhỏ của agent trong thời hạn |
| Permission | PER_AGENT_APPROVE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Còn trong undo_until

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: undone_at
- Trạng thái: APPROVED→UNDONE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0386 | Mã hành động | AGENT_ACTION.action_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0398 | Hoàn tác lúc | AGENT_ACTION.undone_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Hoàn tác thao tác nhỏ".
2. Người dùng cung cấp: Mã hành động.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_APPROVE).
4. Đảo thay đổi.
5. Đặt undone_at.
6. Hệ thống trả kết quả: Hoàn tác lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Quá hạn hoàn tác: không cho

**9. Logic nghiệp vụ**

- Đảo thay đổi
- Đặt undone_at
- BR_047 – Hạn phê duyệt và hoàn tác: Đề xuất của agent hết hạn nếu không duyệt trong 48 giờ; thao tác nhỏ hoàn tác được trong 24 giờ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| APPROVED→UNDONE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_APPROVE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_077_01** – Given Còn trong undo_until, When WRK thực hiện "Hoàn tác thao tác nhỏ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi undone_at; trạng thái chuyển APPROVED→UNDONE.
- **REQ_077_02** – Given tình huống "Quá hạn hoàn tác", When WRK thực hiện "Hoàn tác thao tác nhỏ", Then không cho.
- **REQ_077_03** – Given quy tắc BR_047 (Hạn phê duyệt và hoàn tác), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_078 – Thiết lập agent chủ động

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_078 |
| Module / Sub-module | MOD_009 / Thiết lập |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Bật tắt giám sát chủ động và giới hạn |
| Permission | PER_AGENT_SETTING |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0401 | Báo khi luật liên quan thay đổi | AGENT_SETTING.proactive_law_alert | BOOLEAN | Y | true | — |
| FLD_0402 | Nhắc hạn quan trọng | AGENT_SETTING.proactive_deadline_remind | BOOLEAN | Y | true | — |
| FLD_0403 | Nhắc dữ liệu còn thiếu | AGENT_SETTING.proactive_missing_data | BOOLEAN | Y | true | — |
| FLD_0404 | Số hành động tối đa mỗi ngày | AGENT_SETTING.max_actions_per_day | INTEGER | Y | 20 | 1-100 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0406 | Cập nhật lúc | AGENT_SETTING.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Thiết lập agent chủ động".
2. Người dùng cung cấp: Báo khi luật liên quan thay đổi, Nhắc hạn quan trọng, Nhắc dữ liệu còn thiếu, Số hành động tối đa mỗi ngày.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_SETTING).
4. Lưu thiết lập.
5. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giá trị ngoài khoảng: từ chối

**9. Logic nghiệp vụ**

- Lưu thiết lập
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| max_actions_per_day | 1-100 | Giá trị không hợp lệ: 1-100 |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_SETTING | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_078_01** – Given Đã đăng nhập, When WRK thực hiện "Thiết lập agent chủ động" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_078_02** – Given tình huống "Giá trị ngoài khoảng", When WRK thực hiện "Thiết lập agent chủ động", Then từ chối.
- **REQ_078_03** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_079 – Agent đề xuất chủ động

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_079 |
| Module / Sub-module | MOD_009 / Chủ động |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Agent phát hiện việc cần làm và đề xuất |
| Permission | PER_SYS_AGENT |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Thiết lập chủ động bật

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: task_id, action_id, approval_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0404 | Số hành động tối đa mỗi ngày | AGENT_SETTING.max_actions_per_day | INTEGER | Y | 20 | 1-100 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0375 | Mã nhiệm vụ | AGENT_TASK.task_id | UUID(36) | Định danh |
| FLD_0386 | Mã hành động | AGENT_ACTION.action_id | UUID(36) | Định danh |
| FLD_0393 | Trạng thái phê duyệt | AGENT_ACTION.approval_status | ENUM(12) | Phê duyệt của người dùng |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_AGENT).
3. Quét điều kiện theo thiết lập.
4. Tạo nhiệm vụ trigger=PROACTIVE.
5. Hành động đi ra ngoài đặt PENDING.
6. Hệ thống trả kết quả: Mã nhiệm vụ, Mã hành động, Trạng thái phê duyệt.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Vượt max_actions_per_day: dừng

**9. Logic nghiệp vụ**

- Quét điều kiện theo thiết lập
- Tạo nhiệm vụ trigger=PROACTIVE
- Hành động đi ra ngoài đặt PENDING
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.
- BR_048 – Không có mức tự chủ 3: Agent không được tự thực hiện hành động đi ra ngoài (gửi thư, chia sẻ, thanh toán).
- BR_042 – Chỉ báo thay đổi luật liên quan: Chỉ báo cho người dùng khi thay đổi luật ảnh hưởng quy tắc áp dụng cho hành lang, tỉnh hoặc dữ liệu của họ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| max_actions_per_day | 1-100 | Giá trị không hợp lệ: 1-100 |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_AGENT | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_079_01** – Given Thiết lập chủ động bật, When SYS_AGENT thực hiện "Agent đề xuất chủ động" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi task_id, action_id, approval_status.
- **REQ_079_02** – Given tình huống "Vượt max_actions_per_day", When SYS_AGENT thực hiện "Agent đề xuất chủ động", Then dừng.
- **REQ_079_03** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_079_04** – Given quy tắc BR_048 (Không có mức tự chủ 3), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_079_05** – Given quy tắc BR_042 (Chỉ báo thay đổi luật liên quan), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_080 – Xem lịch sử hành động agent

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_080 |
| Module / Sub-module | MOD_009 / Nhiệm vụ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem các hành động đã thực hiện |
| Permission | PER_AGENT_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: agent_code, action_type, action_description, approval_status, executed_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0387 | Mã nhiệm vụ | AGENT_ACTION.action_task_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0388 | Agent thực hiện | AGENT_ACTION.agent_code | ENUM(10) | Agent chuyên biệt |
| FLD_0389 | Loại hành động | AGENT_ACTION.action_type | ENUM(18) | Theo mức tự chủ |
| FLD_0391 | Mô tả hành động | AGENT_ACTION.action_description | VARCHAR(300) | Hành động agent đề xuất hoặc thực hiện |
| FLD_0393 | Trạng thái phê duyệt | AGENT_ACTION.approval_status | ENUM(12) | Phê duyệt của người dùng |
| FLD_0399 | Thực hiện lúc | AGENT_ACTION.executed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem lịch sử hành động agent".
2. Người dùng cung cấp: Mã nhiệm vụ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_AGENT_VIEW).
4. Lọc theo chủ nhiệm vụ.
5. Hệ thống trả kết quả: Agent thực hiện, Loại hành động, Mô tả hành động, Trạng thái phê duyệt, Thực hiện lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ nhiệm vụ
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_AGENT_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_080_01** – Given Đã đăng nhập, When WRK thực hiện "Xem lịch sử hành động agent" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi agent_code, action_type, action_description, approval_status, executed_at.
- **REQ_080_02** – Given tình huống "Chưa có", When WRK thực hiện "Xem lịch sử hành động agent", Then trạng thái rỗng.
- **REQ_080_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_010 – Cost Ledger

### FUN_081 – Thêm khoản chi phí đi làm

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_081 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Ghi khoản đã trả khi chuẩn bị đi làm |
| Permission | PER_COST_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: cost_id, cap_check_status
- Trạng thái: (chưa có)→UNCHECKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0409 | Loại chi phí | COST_ITEM.cost_type | ENUM(14) | Y | — | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |
| FLD_0410 | Số tiền | COST_ITEM.cost_amount | DECIMAL(15,2) | Y | — | >0 |
| FLD_0411 | Tiền tệ | COST_ITEM.cost_currency_code | ENUM(3) | Y | VND | ∈{VND,JPY} |
| FLD_0412 | Trả cho | COST_ITEM.paid_to_label | VARCHAR(120) | N | — | ≤ 120 ký tự |
| FLD_0413 | Ngày trả | COST_ITEM.paid_date | DATE | Y | — | Không sau hôm nay |
| FLD_0414 | Chứng từ | COST_ITEM.receipt_document_id | UUID(36) | N | — | Tài liệu cùng chủ |
| FLD_0415 | Ghi chú | COST_ITEM.cost_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | COST_ITEM.cost_id | UUID(36) | Định danh |
| FLD_0418 | Kết quả so với trần | COST_ITEM.cap_check_status | ENUM(12) | Theo BR_030 |

**6. Luồng chính**

1. WRK mở chức năng "Thêm khoản chi phí đi làm".
2. Người dùng cung cấp: Loại chi phí, Số tiền, Tiền tệ, Trả cho, Ngày trả, Chứng từ, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_COST_CREATE).
4. Kiểm tra số tiền và ngày.
5. Lưu.
6. Gọi kiểm tra trần phí.
7. Hệ thống trả kết quả: Mã khoản chi, Kết quả so với trần.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chứng từ không thuộc người dùng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra số tiền và ngày
- Lưu
- Gọi kiểm tra trần phí
- BR_030 – Trần phí tại Việt Nam: Phí dịch vụ không vượt 1 tháng lương theo hợp đồng cho mỗi 12 tháng và tổng không vượt 3 tháng lương; không thu phí môi giới từ người lao động (Luật 69/2020/QH14). Kết quả: UNCHECKED, WITHIN_CAP, OVER_CAP, PROHIBITED, NO_RULE. Văn bản hợp nhất cần kiểm chứng trước khi phát hành.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| cost_type | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} | Giá trị không hợp lệ: ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |
| cost_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| cost_amount | >0 | Giá trị không hợp lệ: >0 |
| cost_amount | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| cost_currency_code | ∈{VND,JPY} | Giá trị không hợp lệ: ∈{VND,JPY} |
| paid_to_label | ≤ 120 ký tự | Giá trị không hợp lệ: ≤ 120 ký tự |
| paid_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| paid_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| receipt_document_id | Tài liệu cùng chủ | Giá trị không hợp lệ: Tài liệu cùng chủ |
| cost_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→UNCHECKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_COST_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_081_01** – Given Đã đăng nhập, When WRK thực hiện "Thêm khoản chi phí đi làm" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi cost_id, cap_check_status; trạng thái chuyển (chưa có)→UNCHECKED.
- **REQ_081_02** – Given tình huống "Chứng từ không thuộc người dùng", When WRK thực hiện "Thêm khoản chi phí đi làm", Then từ chối.
- **REQ_081_03** – Given quy tắc BR_030 (Trần phí tại Việt Nam), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_081_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_082 – Sửa khoản chi phí

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_082 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Sửa khoản đã nhập |
| Permission | PER_COST_UPDATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Khoản thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: cap_check_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | COST_ITEM.cost_id | UUID(36) | Y | — | — |
| FLD_0410 | Số tiền | COST_ITEM.cost_amount | DECIMAL(15,2) | Y | — | >0 |
| FLD_0409 | Loại chi phí | COST_ITEM.cost_type | ENUM(14) | Y | — | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |
| FLD_0413 | Ngày trả | COST_ITEM.paid_date | DATE | Y | — | Không sau hôm nay |
| FLD_0415 | Ghi chú | COST_ITEM.cost_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0418 | Kết quả so với trần | COST_ITEM.cap_check_status | ENUM(12) | Theo BR_030 |

**6. Luồng chính**

1. WRK mở chức năng "Sửa khoản chi phí".
2. Người dùng cung cấp: Mã khoản chi, Số tiền, Loại chi phí, Ngày trả, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_COST_UPDATE).
4. Lưu.
5. Kiểm tra lại trần.
6. Hệ thống trả kết quả: Kết quả so với trần.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Như FUN_081

**9. Logic nghiệp vụ**

- Lưu
- Kiểm tra lại trần
- BR_030 – Trần phí tại Việt Nam: Phí dịch vụ không vượt 1 tháng lương theo hợp đồng cho mỗi 12 tháng và tổng không vượt 3 tháng lương; không thu phí môi giới từ người lao động (Luật 69/2020/QH14). Kết quả: UNCHECKED, WITHIN_CAP, OVER_CAP, PROHIBITED, NO_RULE. Văn bản hợp nhất cần kiểm chứng trước khi phát hành.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| cost_amount | >0 | Giá trị không hợp lệ: >0 |
| cost_amount | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| cost_type | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} | Giá trị không hợp lệ: ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |
| cost_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| paid_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| paid_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| cost_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_COST_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_082_01** – Given Khoản thuộc người dùng, When WRK thực hiện "Sửa khoản chi phí" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi cap_check_status.
- **REQ_082_02** – Given tình huống "Như FUN_081", When WRK thực hiện "Sửa khoản chi phí", Then hệ thống từ chối và nêu lý do.
- **REQ_082_03** – Given quy tắc BR_030 (Trần phí tại Việt Nam), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_082_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_083 – Xóa khoản chi phí

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_083 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xóa khoản đã nhập |
| Permission | PER_COST_DELETE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Khoản thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | COST_ITEM.cost_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0420 | Cập nhật lúc | COST_ITEM.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xóa khoản chi phí".
2. Người dùng cung cấp: Mã khoản chi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_COST_DELETE).
4. Kiểm tra chủ.
5. Xóa.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Khoản không tồn tại: báo đã xóa

**9. Logic nghiệp vụ**

- Kiểm tra chủ
- Xóa
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_COST_DELETE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_083_01** – Given Khoản thuộc người dùng, When WRK thực hiện "Xóa khoản chi phí" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_083_02** – Given tình huống "Khoản không tồn tại", When WRK thực hiện "Xóa khoản chi phí", Then báo đã xóa.
- **REQ_083_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_084 – Xem danh sách và tổng chi phí

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_084 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem các khoản và tổng theo loại |
| Permission | PER_COST_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: cost_amount, paid_date, cap_check_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0409 | Loại chi phí | COST_ITEM.cost_type | ENUM(14) | Y | — | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0410 | Số tiền | COST_ITEM.cost_amount | DECIMAL(15,2) | Số tiền đã trả |
| FLD_0413 | Ngày trả | COST_ITEM.paid_date | DATE | Ngày thanh toán |
| FLD_0418 | Kết quả so với trần | COST_ITEM.cap_check_status | ENUM(12) | Theo BR_030 |

**6. Luồng chính**

1. WRK mở chức năng "Xem danh sách và tổng chi phí".
2. Người dùng cung cấp: Loại chi phí.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_COST_VIEW).
4. Cộng theo loại và tiền tệ.
5. Hiển thị trạng thái so trần.
6. Hệ thống trả kết quả: Số tiền, Ngày trả, Kết quả so với trần.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có: trạng thái rỗng

**9. Logic nghiệp vụ**

- Cộng theo loại và tiền tệ
- Hiển thị trạng thái so trần
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| cost_type | ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} | Giá trị không hợp lệ: ∈{BROKER_FEE,SERVICE_FEE,TRAINING_FEE,VISA_FEE,TRAVEL,DEPOSIT,OTHER} |
| cost_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_COST_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_084_01** – Given Đã đăng nhập, When WRK thực hiện "Xem danh sách và tổng chi phí" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi cost_amount, paid_date, cap_check_status.
- **REQ_084_02** – Given tình huống "Chưa có", When WRK thực hiện "Xem danh sách và tổng chi phí", Then trạng thái rỗng.
- **REQ_084_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_085 – Kiểm tra trần phí

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_085 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | SYS_AGENT (Agent) |
| Mô tả | So khoản phí với quy tắc trần của Việt Nam |
| Permission | PER_SYS_COST |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Có khoản BROKER_FEE hoặc SERVICE_FEE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: cap_rule_id, cap_amount, cap_check_status
- Trạng thái: UNCHECKED→kết quả

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | COST_ITEM.cost_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0416 | Quy tắc trần áp dụng | COST_ITEM.cap_rule_id | UUID(36) | Quy tắc Law Pack Việt Nam |
| FLD_0417 | Mức trần theo luật | COST_ITEM.cap_amount | DECIMAL(15,2) | Tính từ Law Pack |
| FLD_0418 | Kết quả so với trần | COST_ITEM.cap_check_status | ENUM(12) | Theo BR_030 |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_COST).
3. Chọn quy tắc FEE_CAP theo ngày.
4. Bộ tính cố định tính trần theo lương hợp đồng.
5. Gán WITHIN_CAP, OVER_CAP, PROHIBITED hoặc NO_RULE.
6. Hệ thống trả kết quả: Quy tắc trần áp dụng, Mức trần theo luật, Kết quả so với trần.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Không có hợp đồng để tính trần: NO_RULE, nêu thiếu dữ liệu

**9. Logic nghiệp vụ**

- Chọn quy tắc FEE_CAP theo ngày
- Bộ tính cố định tính trần theo lương hợp đồng
- Gán WITHIN_CAP, OVER_CAP, PROHIBITED hoặc NO_RULE
- BR_030 – Trần phí tại Việt Nam: Phí dịch vụ không vượt 1 tháng lương theo hợp đồng cho mỗi 12 tháng và tổng không vượt 3 tháng lương; không thu phí môi giới từ người lao động (Luật 69/2020/QH14). Kết quả: UNCHECKED, WITHIN_CAP, OVER_CAP, PROHIBITED, NO_RULE. Văn bản hợp nhất cần kiểm chứng trước khi phát hành.
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.
- BR_009 – Ba nhãn luật: Nhãn luật chỉ gồm: Phù hợp (COMPLIANT), Nên hỏi lại (ASK_AGAIN), Chưa có quy tắc (NO_RULE). Hệ thống không kết luận vi phạm.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| UNCHECKED→kết quả |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_COST | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_085_01** – Given Có khoản BROKER_FEE hoặc SERVICE_FEE, When SYS_AGENT thực hiện "Kiểm tra trần phí" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi cap_rule_id, cap_amount, cap_check_status; trạng thái chuyển UNCHECKED→kết quả.
- **REQ_085_02** – Given tình huống "Không có hợp đồng để tính trần", When SYS_AGENT thực hiện "Kiểm tra trần phí", Then NO_RULE, nêu thiếu dữ liệu.
- **REQ_085_03** – Given quy tắc BR_030 (Trần phí tại Việt Nam), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_085_04** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_085_05** – Given quy tắc BR_009 (Ba nhãn luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_086 – Gắn chứng từ cho khoản chi

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_086 |
| Module / Sub-module | MOD_010 / Chi phí |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Đính kèm biên lai từ kho tài liệu |
| Permission | PER_COST_UPDATE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Khoản và tài liệu cùng chủ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0407 | Mã khoản chi | COST_ITEM.cost_id | UUID(36) | Y | — | — |
| FLD_0414 | Chứng từ | COST_ITEM.receipt_document_id | UUID(36) | N | — | Tài liệu cùng chủ |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0420 | Cập nhật lúc | COST_ITEM.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Gắn chứng từ cho khoản chi".
2. Người dùng cung cấp: Mã khoản chi, Chứng từ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_COST_UPDATE).
4. Kiểm tra cùng chủ.
5. Lưu tham chiếu.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tài liệu không tồn tại: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra cùng chủ
- Lưu tham chiếu
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| receipt_document_id | Tài liệu cùng chủ | Giá trị không hợp lệ: Tài liệu cùng chủ |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_COST_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_086_01** – Given Khoản và tài liệu cùng chủ, When WRK thực hiện "Gắn chứng từ cho khoản chi" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_086_02** – Given tình huống "Tài liệu không tồn tại", When WRK thực hiện "Gắn chứng từ cho khoản chi", Then từ chối.
- **REQ_086_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_011 – Debt & Family

### FUN_087 – Thêm khoản nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_087 |
| Module / Sub-module | MOD_011 / Nợ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Ghi khoản nợ |
| Permission | PER_DEBT_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: debt_id, debt_status
- Trạng thái: (chưa có)→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0423 | Bên cho vay | DEBT.creditor_label | VARCHAR(120) | Y | — | 1-120 ký tự |
| FLD_0424 | Loại bên cho vay | DEBT.creditor_type | ENUM(10) | Y | — | ∈{BANK,FAMILY,AGENCY,OTHER} |
| FLD_0425 | Số tiền gốc | DEBT.principal_amount | DECIMAL(15,2) | Y | — | >0 |
| FLD_0426 | Tiền tệ | DEBT.debt_currency_code | ENUM(3) | Y | VND | ∈{VND,JPY} |
| FLD_0427 | Lãi suất năm (%) | DEBT.interest_rate_percent | DECIMAL(5,2) | Y | 0 | 0-100 |
| FLD_0428 | Ngày vay | DEBT.debt_start_date | DATE | Y | — | Không sau hôm nay |
| FLD_0429 | Số tiền trả mỗi tháng | DEBT.monthly_payment_amount | DECIMAL(15,2) | N | — | ≥0 |
| FLD_0430 | Ngày trả hằng tháng | DEBT.due_day | INTEGER | N | — | 1-31 |
| FLD_0432 | Ghi chú | DEBT.debt_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0421 | Mã khoản nợ | DEBT.debt_id | UUID(36) | Định danh |
| FLD_0431 | Trạng thái | DEBT.debt_status | ENUM(10) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Thêm khoản nợ".
2. Người dùng cung cấp: Bên cho vay, Loại bên cho vay, Số tiền gốc, Tiền tệ, Lãi suất năm (%), Ngày vay, Số tiền trả mỗi tháng, Ngày trả hằng tháng, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_CREATE).
4. Kiểm tra.
5. Lưu ACTIVE.
6. Hệ thống trả kết quả: Mã khoản nợ, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Số tiền gốc không dương: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra
- Lưu ACTIVE
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| creditor_label | 1-120 ký tự | Giá trị không hợp lệ: 1-120 ký tự |
| creditor_label | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| creditor_type | ∈{BANK,FAMILY,AGENCY,OTHER} | Giá trị không hợp lệ: ∈{BANK,FAMILY,AGENCY,OTHER} |
| creditor_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| principal_amount | >0 | Giá trị không hợp lệ: >0 |
| principal_amount | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| debt_currency_code | ∈{VND,JPY} | Giá trị không hợp lệ: ∈{VND,JPY} |
| interest_rate_percent | 0-100 | Giá trị không hợp lệ: 0-100 |
| debt_start_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| debt_start_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| monthly_payment_amount | ≥0 | Giá trị không hợp lệ: ≥0 |
| due_day | 1-31 | Giá trị không hợp lệ: 1-31 |
| debt_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_087_01** – Given Đã đăng nhập, When WRK thực hiện "Thêm khoản nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi debt_id, debt_status; trạng thái chuyển (chưa có)→ACTIVE.
- **REQ_087_02** – Given tình huống "Số tiền gốc không dương", When WRK thực hiện "Thêm khoản nợ", Then từ chối.
- **REQ_087_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_088 – Sửa khoản nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_088 |
| Module / Sub-module | MOD_011 / Nợ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Sửa khoản nợ |
| Permission | PER_DEBT_UPDATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Khoản thuộc người dùng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0421 | Mã khoản nợ | DEBT.debt_id | UUID(36) | Y | — | — |
| FLD_0427 | Lãi suất năm (%) | DEBT.interest_rate_percent | DECIMAL(5,2) | Y | 0 | 0-100 |
| FLD_0429 | Số tiền trả mỗi tháng | DEBT.monthly_payment_amount | DECIMAL(15,2) | N | — | ≥0 |
| FLD_0430 | Ngày trả hằng tháng | DEBT.due_day | INTEGER | N | — | 1-31 |
| FLD_0432 | Ghi chú | DEBT.debt_note | TEXT | N | — | ≤ 1000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0434 | Cập nhật lúc | DEBT.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Sửa khoản nợ".
2. Người dùng cung cấp: Mã khoản nợ, Lãi suất năm (%), Số tiền trả mỗi tháng, Ngày trả hằng tháng, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_UPDATE).
4. Lưu.
5. Yêu cầu tính lại kế hoạch.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Như FUN_087

**9. Logic nghiệp vụ**

- Lưu
- Yêu cầu tính lại kế hoạch
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_031 – Kế hoạch trả nợ xác định: Lịch trả nợ tính bằng công thức cố định theo gốc, lãi suất và số tiền trả; không dùng mô hình ngôn ngữ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| interest_rate_percent | 0-100 | Giá trị không hợp lệ: 0-100 |
| monthly_payment_amount | ≥0 | Giá trị không hợp lệ: ≥0 |
| due_day | 1-31 | Giá trị không hợp lệ: 1-31 |
| debt_note | ≤ 1000 ký tự | Giá trị không hợp lệ: ≤ 1000 ký tự |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_UPDATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_088_01** – Given Khoản thuộc người dùng, When WRK thực hiện "Sửa khoản nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_088_02** – Given tình huống "Như FUN_087", When WRK thực hiện "Sửa khoản nợ", Then hệ thống từ chối và nêu lý do.
- **REQ_088_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_088_04** – Given quy tắc BR_031 (Kế hoạch trả nợ xác định), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_089 – Ghi lần trả nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_089 |
| Module / Sub-module | MOD_011 / Nợ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Ghi nhận khoản đã trả |
| Permission | PER_DEBT_PAY |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Khoản ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: payment_id, debt_status
- Trạng thái: ACTIVE→PAID_OFF

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0436 | Mã khoản nợ | DEBT_PAYMENT.payment_debt_id | UUID(36) | Y | — | — |
| FLD_0437 | Ngày trả | DEBT_PAYMENT.payment_date | DATE | Y | — | Không sau hôm nay |
| FLD_0438 | Số tiền trả | DEBT_PAYMENT.payment_amount | DECIMAL(15,2) | Y | — | >0 |
| FLD_0439 | Ghi chú | DEBT_PAYMENT.payment_note | VARCHAR(300) | N | — | ≤ 300 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0435 | Mã lần trả | DEBT_PAYMENT.payment_id | UUID(36) | Định danh |
| FLD_0431 | Trạng thái | DEBT.debt_status | ENUM(10) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Ghi lần trả nợ".
2. Người dùng cung cấp: Mã khoản nợ, Ngày trả, Số tiền trả, Ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_PAY).
4. Lưu lần trả.
5. Nếu dư nợ bằng 0 đặt PAID_OFF.
6. Hệ thống trả kết quả: Mã lần trả, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Trả vượt dư nợ: cảnh báo

**9. Logic nghiệp vụ**

- Lưu lần trả
- Nếu dư nợ bằng 0 đặt PAID_OFF
- BR_031 – Kế hoạch trả nợ xác định: Lịch trả nợ tính bằng công thức cố định theo gốc, lãi suất và số tiền trả; không dùng mô hình ngôn ngữ.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| payment_date | Không sau hôm nay | Giá trị không hợp lệ: Không sau hôm nay |
| payment_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| payment_amount | >0 | Giá trị không hợp lệ: >0 |
| payment_amount | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| payment_note | ≤ 300 ký tự | Giá trị không hợp lệ: ≤ 300 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→PAID_OFF |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_PAY | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_089_01** – Given Khoản ACTIVE, When WRK thực hiện "Ghi lần trả nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi payment_id, debt_status; trạng thái chuyển ACTIVE→PAID_OFF.
- **REQ_089_02** – Given tình huống "Trả vượt dư nợ", When WRK thực hiện "Ghi lần trả nợ", Then cảnh báo.
- **REQ_089_03** – Given quy tắc BR_031 (Kế hoạch trả nợ xác định), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_089_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_090 – Xem tiến độ nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_090 |
| Module / Sub-module | MOD_011 / Nợ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem dư nợ và đã trả |
| Permission | PER_DEBT_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: principal_amount, payment_amount, debt_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0421 | Mã khoản nợ | DEBT.debt_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0425 | Số tiền gốc | DEBT.principal_amount | DECIMAL(15,2) | Số tiền vay |
| FLD_0438 | Số tiền trả | DEBT_PAYMENT.payment_amount | DECIMAL(15,2) | Số tiền |
| FLD_0431 | Trạng thái | DEBT.debt_status | ENUM(10) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Xem tiến độ nợ".
2. Người dùng cung cấp: Mã khoản nợ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_VIEW).
4. Tính dư nợ bằng công thức cố định.
5. Hệ thống trả kết quả: Số tiền gốc, Số tiền trả, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có khoản nợ: trạng thái rỗng

**9. Logic nghiệp vụ**

- Tính dư nợ bằng công thức cố định
- BR_031 – Kế hoạch trả nợ xác định: Lịch trả nợ tính bằng công thức cố định theo gốc, lãi suất và số tiền trả; không dùng mô hình ngôn ngữ.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_090_01** – Given Đã đăng nhập, When WRK thực hiện "Xem tiến độ nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi principal_amount, payment_amount, debt_status.
- **REQ_090_02** – Given tình huống "Chưa có khoản nợ", When WRK thực hiện "Xem tiến độ nợ", Then trạng thái rỗng.
- **REQ_090_03** – Given quy tắc BR_031 (Kế hoạch trả nợ xác định), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_090_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_091 – Mô phỏng kế hoạch trả nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_091 |
| Module / Sub-module | MOD_011 / Kế hoạch |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Nhập thu chi để xem ngày trả hết |
| Permission | PER_DEBT_PLAN |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có khoản nợ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: projected_payoff_date, plan_schedule

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0442 | Mã khoản nợ | DEBT_PLAN.plan_debt_id | UUID(36) | Y | — | — |
| FLD_0443 | Thu nhập mỗi tháng (giả định) | DEBT_PLAN.monthly_income_assumption | DECIMAL(15,2) | Y | — | >0 |
| FLD_0444 | Chi tiêu mỗi tháng (giả định) | DEBT_PLAN.monthly_expense_assumption | DECIMAL(15,2) | Y | — | ≥0 và nhỏ hơn thu nhập |
| FLD_0445 | Số tiền trả mỗi tháng theo kế hoạch | DEBT_PLAN.planned_payment_amount | DECIMAL(15,2) | Y | — | >0 và không vượt thu nhập trừ chi tiêu |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0446 | Ngày dự kiến trả hết | DEBT_PLAN.projected_payoff_date | DATE | Tính theo BR_031 |
| FLD_0447 | Lịch trả | DEBT_PLAN.plan_schedule | JSONB | Từng tháng: gốc, lãi, còn lại |

**6. Luồng chính**

1. WRK mở chức năng "Mô phỏng kế hoạch trả nợ".
2. Người dùng cung cấp: Mã khoản nợ, Thu nhập mỗi tháng (giả định), Chi tiêu mỗi tháng (giả định), Số tiền trả mỗi tháng theo kế hoạch.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_PLAN).
4. Bộ tính cố định lập lịch gốc, lãi, còn lại theo từng tháng.
5. Hệ thống trả kết quả: Ngày dự kiến trả hết, Lịch trả.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Số trả vượt thu nhập trừ chi tiêu: từ chối

**9. Logic nghiệp vụ**

- Bộ tính cố định lập lịch gốc, lãi, còn lại theo từng tháng
- BR_031 – Kế hoạch trả nợ xác định: Lịch trả nợ tính bằng công thức cố định theo gốc, lãi suất và số tiền trả; không dùng mô hình ngôn ngữ.
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| monthly_income_assumption | >0 | Giá trị không hợp lệ: >0 |
| monthly_income_assumption | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| monthly_expense_assumption | ≥0 và nhỏ hơn thu nhập | Giá trị không hợp lệ: ≥0 và nhỏ hơn thu nhập |
| monthly_expense_assumption | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| planned_payment_amount | >0 và không vượt thu nhập trừ chi tiêu | Giá trị không hợp lệ: >0 và không vượt thu nhập trừ chi tiêu |
| planned_payment_amount | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_PLAN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_091_01** – Given Có khoản nợ, When WRK thực hiện "Mô phỏng kế hoạch trả nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi projected_payoff_date, plan_schedule.
- **REQ_091_02** – Given tình huống "Số trả vượt thu nhập trừ chi tiêu", When WRK thực hiện "Mô phỏng kế hoạch trả nợ", Then từ chối.
- **REQ_091_03** – Given quy tắc BR_031 (Kế hoạch trả nợ xác định), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_091_04** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_092 – Lưu kế hoạch trả nợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_092 |
| Module / Sub-module | MOD_011 / Kế hoạch |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Lưu kế hoạch đã mô phỏng |
| Permission | PER_DEBT_PLAN |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã mô phỏng

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: created_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0441 | Mã kế hoạch | DEBT_PLAN.plan_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0448 | Tạo lúc | DEBT_PLAN.created_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Lưu kế hoạch trả nợ".
2. Người dùng cung cấp: Mã kế hoạch.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DEBT_PLAN).
4. Lưu kế hoạch.
5. Hệ thống trả kết quả: Tạo lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kế hoạch trùng: ghi đè sau xác nhận

**9. Logic nghiệp vụ**

- Lưu kế hoạch
- BR_031 – Kế hoạch trả nợ xác định: Lịch trả nợ tính bằng công thức cố định theo gốc, lãi suất và số tiền trả; không dùng mô hình ngôn ngữ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DEBT_PLAN | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_092_01** – Given Đã mô phỏng, When WRK thực hiện "Lưu kế hoạch trả nợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi created_at.
- **REQ_092_02** – Given tình huống "Kế hoạch trùng", When WRK thực hiện "Lưu kế hoạch trả nợ", Then ghi đè sau xác nhận.
- **REQ_092_03** – Given quy tắc BR_031 (Kế hoạch trả nợ xác định), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_093 – Tạo liên kết cho người thân

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_093 |
| Module / Sub-module | MOD_011 / Gia đình |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tạo liên kết xem tiến độ có thời hạn |
| Permission | PER_FAM_CREATE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có khoản nợ hoặc tóm tắt

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: link_id, link_token
- Trạng thái: (chưa có)→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0453 | Tên gợi nhớ người nhận | FAMILY_LINK.relative_label | VARCHAR(40) | Y | — | 1-40 ký tự |
| FLD_0454 | Các mục được xem | FAMILY_LINK.shared_items | VARCHAR(100) | Y | — | Tập con của {DEBT_PROGRESS,MONTHLY_SUMMARY} |
| FLD_0455 | Hết hạn lúc | FAMILY_LINK.link_expires_at | TIMESTAMP | Y | — | Sau hiện tại và ≤ tối đa [CẦN XÁC NHẬN 90 ngày] |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0449 | Mã liên kết | FAMILY_LINK.link_id | UUID(36) | Định danh |
| FLD_0451 | Mã liên kết (hiển thị một lần) | FAMILY_LINK.link_token | VARCHAR(64) | Gắn vào đường dẫn, không lưu bản gốc |

**6. Luồng chính**

1. WRK mở chức năng "Tạo liên kết cho người thân".
2. Người dùng cung cấp: Tên gợi nhớ người nhận, Các mục được xem, Hết hạn lúc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_FAM_CREATE).
4. Sinh mã ngẫu nhiên ≥128 bit.
5. Lưu mã băm.
6. Hiển thị liên kết một lần.
7. Giới hạn mục.
8. Hệ thống trả kết quả: Mã liên kết, Mã liên kết (hiển thị một lần).

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hạn quá tối đa: từ chối

**9. Logic nghiệp vụ**

- Sinh mã ngẫu nhiên ≥128 bit
- Lưu mã băm
- Hiển thị liên kết một lần
- Giới hạn mục
- BR_032 – Liên kết người thân: Mã liên kết ngẫu nhiên ≥ 128 bit, chỉ lưu mã băm, chỉ xem, giới hạn mục, có hạn, thu hồi được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| relative_label | 1-40 ký tự | Giá trị không hợp lệ: 1-40 ký tự |
| relative_label | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| shared_items | Tập con của {DEBT_PROGRESS,MONTHLY_SUMMARY} | Giá trị không hợp lệ: Tập con của {DEBT_PROGRESS,MONTHLY_SUMMARY} |
| shared_items | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| link_expires_at | Sau hiện tại và ≤ tối đa [CẦN XÁC NHẬN 90 ngày] | Giá trị không hợp lệ: Sau hiện tại và ≤ tối đa [CẦN XÁC NHẬN 90 ngày] |
| link_expires_at | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_FAM_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_093_01** – Given Có khoản nợ hoặc tóm tắt, When WRK thực hiện "Tạo liên kết cho người thân" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi link_id, link_token; trạng thái chuyển (chưa có)→ACTIVE.
- **REQ_093_02** – Given tình huống "Hạn quá tối đa", When WRK thực hiện "Tạo liên kết cho người thân", Then từ chối.
- **REQ_093_03** – Given quy tắc BR_032 (Liên kết người thân), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_094 – Thu hồi liên kết người thân

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_094 |
| Module / Sub-module | MOD_011 / Gia đình |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Thu hồi liên kết |
| Permission | PER_FAM_REVOKE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Liên kết ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: link_status, revoked_at
- Trạng thái: ACTIVE→REVOKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0449 | Mã liên kết | FAMILY_LINK.link_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0456 | Trạng thái | FAMILY_LINK.link_status | ENUM(8) | Trạng thái |
| FLD_0459 | Thu hồi lúc | FAMILY_LINK.revoked_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Thu hồi liên kết người thân".
2. Người dùng cung cấp: Mã liên kết.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_FAM_REVOKE).
4. Đặt REVOKED.
5. Liên kết hết hiệu lực ngay.
6. Hệ thống trả kết quả: Trạng thái, Thu hồi lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Liên kết đã hết hạn: không cần thu hồi

**9. Logic nghiệp vụ**

- Đặt REVOKED
- Liên kết hết hiệu lực ngay
- BR_032 – Liên kết người thân: Mã liên kết ngẫu nhiên ≥ 128 bit, chỉ lưu mã băm, chỉ xem, giới hạn mục, có hạn, thu hồi được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→REVOKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_FAM_REVOKE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_094_01** – Given Liên kết ACTIVE, When WRK thực hiện "Thu hồi liên kết người thân" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi link_status, revoked_at; trạng thái chuyển ACTIVE→REVOKED.
- **REQ_094_02** – Given tình huống "Liên kết đã hết hạn", When WRK thực hiện "Thu hồi liên kết người thân", Then không cần thu hồi.
- **REQ_094_03** – Given quy tắc BR_032 (Liên kết người thân), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_095 – Xem tiến độ qua liên kết

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_095 |
| Module / Sub-module | MOD_011 / Gia đình |
| Actor | ACC_FAMLINK (Người thân qua liên kết) |
| Mô tả | Người thân mở liên kết để xem |
| Permission | PER_FAM_ACCESS |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Liên kết ACTIVE và còn hạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: view_count, last_viewed_at, principal_amount

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0451 | Mã liên kết (hiển thị một lần) | FAMILY_LINK.link_token | VARCHAR(64) | Y | — | Ngẫu nhiên ≥ 128 bit |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0457 | Số lượt xem | FAMILY_LINK.view_count | INTEGER | Thống kê |
| FLD_0458 | Xem gần nhất | FAMILY_LINK.last_viewed_at | TIMESTAMP | Theo giờ UTC |
| FLD_0425 | Số tiền gốc | DEBT.principal_amount | DECIMAL(15,2) | Số tiền vay |

**6. Luồng chính**

1. FAM mở chức năng "Xem tiến độ qua liên kết".
2. Người dùng cung cấp: Mã liên kết (hiển thị một lần).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_FAM_ACCESS).
4. So khớp mã băm.
5. Chỉ trả các mục trong shared_items.
6. Tăng view_count.
7. Không có ghi.
8. Hệ thống trả kết quả: Số lượt xem, Xem gần nhất, Số tiền gốc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Liên kết hết hạn hoặc thu hồi: trang thông báo không còn hiệu lực

**9. Logic nghiệp vụ**

- So khớp mã băm
- Chỉ trả các mục trong shared_items
- Tăng view_count
- Không có ghi
- BR_032 – Liên kết người thân: Mã liên kết ngẫu nhiên ≥ 128 bit, chỉ lưu mã băm, chỉ xem, giới hạn mục, có hạn, thu hồi được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| link_token | Ngẫu nhiên ≥ 128 bit | Giá trị không hợp lệ: Ngẫu nhiên ≥ 128 bit |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_FAM_ACCESS | ACC_FAMLINK (Người thân qua liên kết) | Chỉ các mục được chọn trong liên kết, chỉ đọc, còn hạn (BR_032) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_095_01** – Given Liên kết ACTIVE và còn hạn, When FAM thực hiện "Xem tiến độ qua liên kết" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi view_count, last_viewed_at, principal_amount.
- **REQ_095_02** – Given tình huống "Liên kết hết hạn hoặc thu hồi", When FAM thực hiện "Xem tiến độ qua liên kết", Then trang thông báo không còn hiệu lực.
- **REQ_095_03** – Given quy tắc BR_032 (Liên kết người thân), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_096 – Xem danh sách liên kết

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_096 |
| Module / Sub-module | MOD_011 / Gia đình |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem các liên kết đã tạo |
| Permission | PER_FAM_CREATE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: relative_label, link_status, link_expires_at, view_count

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0001 | Mã người dùng | USER.user_id | UUID(36) | Y | — | Sinh tự động |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0453 | Tên gợi nhớ người nhận | FAMILY_LINK.relative_label | VARCHAR(40) | Ví dụ "Mẹ" |
| FLD_0456 | Trạng thái | FAMILY_LINK.link_status | ENUM(8) | Trạng thái |
| FLD_0455 | Hết hạn lúc | FAMILY_LINK.link_expires_at | TIMESTAMP | Hết hạn |
| FLD_0457 | Số lượt xem | FAMILY_LINK.view_count | INTEGER | Thống kê |

**6. Luồng chính**

1. WRK mở chức năng "Xem danh sách liên kết".
2. Người dùng cung cấp: Mã người dùng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_FAM_CREATE).
4. Lọc theo chủ.
5. Hệ thống trả kết quả: Tên gợi nhớ người nhận, Trạng thái, Hết hạn lúc, Số lượt xem.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa có: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo chủ
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| user_id | Sinh tự động | Giá trị không hợp lệ: Sinh tự động |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_FAM_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_096_01** – Given Đã đăng nhập, When WRK thực hiện "Xem danh sách liên kết" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi relative_label, link_status, link_expires_at, view_count.
- **REQ_096_02** – Given tình huống "Chưa có", When WRK thực hiện "Xem danh sách liên kết", Then trạng thái rỗng.
- **REQ_096_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_012 – Law Pack Management

### FUN_097 – Quản lý hành lang

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_097 |
| Module / Sub-module | MOD_012 / Danh mục |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Tạo và sửa hành lang nước gửi - nước làm việc |
| Permission | PER_LPK_CORRIDOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: active_pack_version_id
- Trạng thái: PLANNED→ACTIVE
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0251 | Mã hành lang | CORRIDOR.corridor_code | VARCHAR(8) | Y | — | Dạng XX-YY (nước gửi - nước làm việc) |
| FLD_0252 | Nước gửi | CORRIDOR.origin_country_code | ENUM(2) | Y | — | ∈{VN} |
| FLD_0253 | Nước làm việc | CORRIDOR.destination_country_code | ENUM(2) | Y | — | ∈{JP} |
| FLD_0254 | Trạng thái | CORRIDOR.corridor_status | ENUM(8) | Y | PLANNED | ∈{ACTIVE,PLANNED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0255 | Phiên bản Law Pack đang dùng | CORRIDOR.active_pack_version_id | UUID(36) | Phiên bản được phát hành mới nhất |

**6. Luồng chính**

1. ADM mở chức năng "Quản lý hành lang".
2. Người dùng cung cấp: Mã hành lang, Nước gửi, Nước làm việc, Trạng thái.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_CORRIDOR).
4. Kiểm tra mã dạng XX-YY không trùng.
5. Lưu.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Phiên bản Law Pack đang dùng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Mã trùng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra mã dạng XX-YY không trùng
- Lưu
- Ghi nhật ký
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| corridor_code | Dạng XX-YY (nước gửi - nước làm việc) | Giá trị không hợp lệ: Dạng XX-YY (nước gửi - nước làm việc) |
| corridor_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| origin_country_code | ∈{VN} | Giá trị không hợp lệ: ∈{VN} |
| origin_country_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| destination_country_code | ∈{JP} | Giá trị không hợp lệ: ∈{JP} |
| destination_country_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| corridor_status | ∈{ACTIVE,PLANNED} | Giá trị không hợp lệ: ∈{ACTIVE,PLANNED} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| PLANNED→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_CORRIDOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_097_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Quản lý hành lang" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi active_pack_version_id; trạng thái chuyển PLANNED→ACTIVE.
- **REQ_097_02** – Given tình huống "Mã trùng", When ADM thực hiện "Quản lý hành lang", Then từ chối.
- **REQ_097_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_098 – Quản lý nguồn luật

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_098 |
| Module / Sub-module | MOD_012 / Danh mục |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Thêm, sửa nguồn chính thức kèm hạng nguồn |
| Permission | PER_LPK_SOURCE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: source_id
- Trạng thái: ACTIVE↔INACTIVE
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0240 | Tên nguồn | LAW_SOURCE.source_name | VARCHAR(200) | Y | — | 1-200 ký tự |
| FLD_0241 | Đơn vị công bố | LAW_SOURCE.publisher | VARCHAR(120) | Y | — | — |
| FLD_0242 | Quốc gia | LAW_SOURCE.source_country_code | ENUM(2) | Y | — | ∈{JP,VN} |
| FLD_0243 | Đường dẫn | LAW_SOURCE.source_url | VARCHAR(500) | Y | — | URL hợp lệ |
| FLD_0244 | Hạng nguồn | LAW_SOURCE.source_grade | ENUM(1) | Y | — | ∈{A,B,C} |
| FLD_0245 | Ngôn ngữ nguồn | LAW_SOURCE.source_language | ENUM(5) | Y | — | ∈{ja,vi,en} |
| FLD_0246 | Ngày công bố | LAW_SOURCE.published_date | DATE | N | — | — |
| FLD_0247 | Ngày truy cập | LAW_SOURCE.accessed_date | DATE | Y | — | — |
| FLD_0248 | Trạng thái | LAW_SOURCE.source_status | ENUM(8) | Y | ACTIVE | ∈{ACTIVE,INACTIVE} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0239 | Mã nguồn | LAW_SOURCE.source_id | UUID(36) | Định danh |

**6. Luồng chính**

1. ADM mở chức năng "Quản lý nguồn luật".
2. Người dùng cung cấp: Tên nguồn, Đơn vị công bố, Quốc gia, Đường dẫn, Hạng nguồn, Ngôn ngữ nguồn, Ngày công bố, Ngày truy cập, Trạng thái.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_SOURCE).
4. Kiểm tra URL.
5. Lưu.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Mã nguồn.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Nguồn đang được quy tắc dùng: không cho đặt INACTIVE khi chưa thay nguồn

**9. Logic nghiệp vụ**

- Kiểm tra URL
- Lưu
- Ghi nhật ký
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_025 – Điều kiện nộp duyệt quy tắc: Quy tắc phải có nguồn, điều khoản gốc, ngày hiệu lực và toàn bộ ca kiểm thử đạt thì mới nộp duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| source_name | 1-200 ký tự | Giá trị không hợp lệ: 1-200 ký tự |
| source_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| publisher | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| source_country_code | ∈{JP,VN} | Giá trị không hợp lệ: ∈{JP,VN} |
| source_country_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| source_url | URL hợp lệ | Giá trị không hợp lệ: URL hợp lệ |
| source_url | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| source_grade | ∈{A,B,C} | Giá trị không hợp lệ: ∈{A,B,C} |
| source_grade | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| source_language | ∈{ja,vi,en} | Giá trị không hợp lệ: ∈{ja,vi,en} |
| source_language | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| accessed_date | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| source_status | ∈{ACTIVE,INACTIVE} | Giá trị không hợp lệ: ∈{ACTIVE,INACTIVE} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE↔INACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_SOURCE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_098_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Quản lý nguồn luật" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi source_id; trạng thái chuyển ACTIVE↔INACTIVE.
- **REQ_098_02** – Given tình huống "Nguồn đang được quy tắc dùng", When ADM thực hiện "Quản lý nguồn luật", Then không cho đặt INACTIVE khi chưa thay nguồn.
- **REQ_098_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_098_04** – Given quy tắc BR_025 (Điều kiện nộp duyệt quy tắc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_099 – Soạn quy tắc luật mới

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_099 |
| Module / Sub-module | MOD_012 / Soạn quy tắc |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Soạn quy tắc có nguồn, điều khoản, tham số, hiệu lực |
| Permission | PER_LPK_AUTHOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Nguồn và hành lang đã có

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_id, rule_status, author_user_id
- Trạng thái: (chưa có)→DRAFT
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0257 | Mã quy tắc nghiệp vụ | LAW_RULE.rule_code | VARCHAR(30) | Y | — | Dạng JP_OT_25; chữ hoa, số, gạch dưới |
| FLD_0258 | Hành lang | LAW_RULE.corridor_code | VARCHAR(8) | Y | — | — |
| FLD_0259 | Chủ đề | LAW_RULE.rule_topic | ENUM(20) | Y | — | ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} |
| FLD_0260 | Tiêu đề quy tắc | LAW_RULE.rule_title | VARCHAR(200) | Y | — | 1-200 ký tự |
| FLD_0261 | Điều khoản gốc | LAW_RULE.article_ref | VARCHAR(120) | Y | — | — |
| FLD_0262 | Nguồn | LAW_RULE.rule_source_id | UUID(36) | Y | — | FK hợp lệ |
| FLD_0263 | Kiểu quy tắc | LAW_RULE.rule_type | ENUM(12) | Y | — | ∈{CALC,CLAUSE_CHECK,CAP} |
| FLD_0264 | Tham số | LAW_RULE.rule_parameters | JSONB | Y | — | Đúng lược đồ theo rule_type |
| FLD_0265 | Công thức mô tả | LAW_RULE.formula_text | TEXT | N | — | — |
| FLD_0266 | Hiệu lực từ | LAW_RULE.effective_from | DATE | Y | — | — |
| FLD_0267 | Hiệu lực đến | LAW_RULE.effective_to | DATE | N | — | Không trước effective_from |
| FLD_0268 | Nhãn rà soát | LAW_RULE.review_label | ENUM(14) | Y | INTERNAL | ∈{EXPERT_SIGNED,INTERNAL} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | LAW_RULE.rule_id | UUID(36) | Định danh |
| FLD_0269 | Trạng thái | LAW_RULE.rule_status | ENUM(10) | Theo BR_024 |
| FLD_0270 | Người soạn | LAW_RULE.author_user_id | UUID(36) | Quản trị viên soạn |

**6. Luồng chính**

1. ADM mở chức năng "Soạn quy tắc luật mới".
2. Người dùng cung cấp: Mã quy tắc nghiệp vụ, Hành lang, Chủ đề, Tiêu đề quy tắc, Điều khoản gốc, Nguồn, Kiểu quy tắc, Tham số, Công thức mô tả, Hiệu lực từ, Hiệu lực đến, Nhãn rà soát.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_AUTHOR).
4. Kiểm tra mã không trùng, tham số đúng lược đồ.
5. Đặt DRAFT, author=người đăng nhập.
6. Hệ thống trả kết quả: Mã quy tắc, Trạng thái, Người soạn.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tham số sai lược đồ: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra mã không trùng, tham số đúng lược đồ
- Đặt DRAFT, author=người đăng nhập
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_025 – Điều kiện nộp duyệt quy tắc: Quy tắc phải có nguồn, điều khoản gốc, ngày hiệu lực và toàn bộ ca kiểm thử đạt thì mới nộp duyệt.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| rule_code | Dạng JP_OT_25; chữ hoa, số, gạch dưới | Giá trị không hợp lệ: Dạng JP_OT_25; chữ hoa, số, gạch dưới |
| rule_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| corridor_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_topic | ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} | Giá trị không hợp lệ: ∈{OVERTIME,NIGHT,HOLIDAY,OVER60,MIN_WAGE,DEDUCTION,PASSPORT,FEE_CAP,CONTRACT_CLARITY,NON_DISCRIMINATION,PENALTY,FORCED_SAVINGS,OTHER} |
| rule_topic | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_title | 1-200 ký tự | Giá trị không hợp lệ: 1-200 ký tự |
| rule_title | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| article_ref | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_source_id | FK hợp lệ | Giá trị không hợp lệ: FK hợp lệ |
| rule_source_id | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_type | ∈{CALC,CLAUSE_CHECK,CAP} | Giá trị không hợp lệ: ∈{CALC,CLAUSE_CHECK,CAP} |
| rule_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_parameters | Đúng lược đồ theo rule_type | Giá trị không hợp lệ: Đúng lược đồ theo rule_type |
| rule_parameters | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| effective_from | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| effective_to | Không trước effective_from | Giá trị không hợp lệ: Không trước effective_from |
| review_label | ∈{EXPERT_SIGNED,INTERNAL} | Giá trị không hợp lệ: ∈{EXPERT_SIGNED,INTERNAL} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→DRAFT |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_AUTHOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_099_01** – Given Nguồn và hành lang đã có, When ADM thực hiện "Soạn quy tắc luật mới" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_id, rule_status, author_user_id; trạng thái chuyển (chưa có)→DRAFT.
- **REQ_099_02** – Given tình huống "Tham số sai lược đồ", When ADM thực hiện "Soạn quy tắc luật mới", Then từ chối.
- **REQ_099_03** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_099_04** – Given quy tắc BR_025 (Điều kiện nộp duyệt quy tắc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_099_05** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_100 – Sửa quy tắc nháp

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_100 |
| Module / Sub-module | MOD_012 / Soạn quy tắc |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Sửa quy tắc ở trạng thái DRAFT hoặc bị trả lại |
| Permission | PER_LPK_AUTHOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Quy tắc DRAFT; người sửa là người soạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at
- Trạng thái: DRAFT→DRAFT

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | LAW_RULE.rule_id | UUID(36) | Y | — | — |
| FLD_0260 | Tiêu đề quy tắc | LAW_RULE.rule_title | VARCHAR(200) | Y | — | 1-200 ký tự |
| FLD_0261 | Điều khoản gốc | LAW_RULE.article_ref | VARCHAR(120) | Y | — | — |
| FLD_0264 | Tham số | LAW_RULE.rule_parameters | JSONB | Y | — | Đúng lược đồ theo rule_type |
| FLD_0265 | Công thức mô tả | LAW_RULE.formula_text | TEXT | N | — | — |
| FLD_0266 | Hiệu lực từ | LAW_RULE.effective_from | DATE | Y | — | — |
| FLD_0267 | Hiệu lực đến | LAW_RULE.effective_to | DATE | N | — | Không trước effective_from |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0275 | Cập nhật lúc | LAW_RULE.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Sửa quy tắc nháp".
2. Người dùng cung cấp: Mã quy tắc, Tiêu đề quy tắc, Điều khoản gốc, Tham số, Công thức mô tả, Hiệu lực từ, Hiệu lực đến.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_AUTHOR).
4. Kiểm tra trạng thái.
5. Lưu.
6. Xóa kết quả kiểm thử cũ.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Quy tắc đã APPROVED hoặc RELEASED: không sửa, tạo quy tắc mới

**9. Logic nghiệp vụ**

- Kiểm tra trạng thái
- Lưu
- Xóa kết quả kiểm thử cũ
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| rule_title | 1-200 ký tự | Giá trị không hợp lệ: 1-200 ký tự |
| rule_title | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| article_ref | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| rule_parameters | Đúng lược đồ theo rule_type | Giá trị không hợp lệ: Đúng lược đồ theo rule_type |
| rule_parameters | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| effective_from | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| effective_to | Không trước effective_from | Giá trị không hợp lệ: Không trước effective_from |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| DRAFT→DRAFT |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_AUTHOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_100_01** – Given Quy tắc DRAFT; người sửa là người soạn, When ADM thực hiện "Sửa quy tắc nháp" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at; trạng thái chuyển DRAFT→DRAFT.
- **REQ_100_02** – Given tình huống "Quy tắc đã APPROVED hoặc RELEASED", When ADM thực hiện "Sửa quy tắc nháp", Then không sửa, tạo quy tắc mới.
- **REQ_100_03** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_100_04** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_101 – Thêm ca kiểm thử quy tắc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_101 |
| Module / Sub-module | MOD_012 / Kiểm thử |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Thêm ca kiểm thử đầu vào và kết quả mong đợi |
| Permission | PER_LPK_AUTHOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Quy tắc DRAFT

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: test_id, last_result
- Trạng thái: (chưa có)→NOT_RUN

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0277 | Mã quy tắc | LAW_RULE_TEST.rule_id | UUID(36) | Y | — | — |
| FLD_0278 | Tên ca kiểm thử | LAW_RULE_TEST.test_name | VARCHAR(100) | Y | — | 1-100 ký tự |
| FLD_0279 | Dữ liệu đầu vào | LAW_RULE_TEST.test_input | JSONB | Y | — | — |
| FLD_0280 | Kết quả mong đợi | LAW_RULE_TEST.test_expected | JSONB | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0276 | Mã ca kiểm thử | LAW_RULE_TEST.test_id | UUID(36) | Định danh |
| FLD_0281 | Kết quả lần chạy gần nhất | LAW_RULE_TEST.last_result | ENUM(8) | Kết quả |

**6. Luồng chính**

1. ADM mở chức năng "Thêm ca kiểm thử quy tắc".
2. Người dùng cung cấp: Mã quy tắc, Tên ca kiểm thử, Dữ liệu đầu vào, Kết quả mong đợi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_AUTHOR).
4. Kiểm tra JSON.
5. Lưu NOT_RUN.
6. Hệ thống trả kết quả: Mã ca kiểm thử, Kết quả lần chạy gần nhất.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: JSON sai: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra JSON
- Lưu NOT_RUN
- BR_025 – Điều kiện nộp duyệt quy tắc: Quy tắc phải có nguồn, điều khoản gốc, ngày hiệu lực và toàn bộ ca kiểm thử đạt thì mới nộp duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| test_name | 1-100 ký tự | Giá trị không hợp lệ: 1-100 ký tự |
| test_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| test_input | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| test_expected | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→NOT_RUN |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_AUTHOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_101_01** – Given Quy tắc DRAFT, When ADM thực hiện "Thêm ca kiểm thử quy tắc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi test_id, last_result; trạng thái chuyển (chưa có)→NOT_RUN.
- **REQ_101_02** – Given tình huống "JSON sai", When ADM thực hiện "Thêm ca kiểm thử quy tắc", Then từ chối.
- **REQ_101_03** – Given quy tắc BR_025 (Điều kiện nộp duyệt quy tắc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_102 – Chạy kiểm thử quy tắc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_102 |
| Module / Sub-module | MOD_012 / Kiểm thử |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Chạy mọi ca kiểm thử của quy tắc |
| Permission | PER_LPK_AUTHOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có ca kiểm thử

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: last_result, last_output, last_run_at
- Trạng thái: NOT_RUN→PASS/FAIL

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0277 | Mã quy tắc | LAW_RULE_TEST.rule_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0281 | Kết quả lần chạy gần nhất | LAW_RULE_TEST.last_result | ENUM(8) | Kết quả |
| FLD_0282 | Đầu ra lần chạy gần nhất | LAW_RULE_TEST.last_output | JSONB | Kết quả thực tế |
| FLD_0283 | Chạy lúc | LAW_RULE_TEST.last_run_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Chạy kiểm thử quy tắc".
2. Người dùng cung cấp: Mã quy tắc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_AUTHOR).
4. Chạy bộ tính cố định với test_input.
5. So sánh test_expected.
6. Ghi PASS hoặc FAIL.
7. Hệ thống trả kết quả: Kết quả lần chạy gần nhất, Đầu ra lần chạy gần nhất, Chạy lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Lỗi thực thi: ghi FAIL kèm lỗi

**9. Logic nghiệp vụ**

- Chạy bộ tính cố định với test_input
- So sánh test_expected
- Ghi PASS hoặc FAIL
- BR_025 – Điều kiện nộp duyệt quy tắc: Quy tắc phải có nguồn, điều khoản gốc, ngày hiệu lực và toàn bộ ca kiểm thử đạt thì mới nộp duyệt.
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NOT_RUN→PASS/FAIL |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_AUTHOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_102_01** – Given Có ca kiểm thử, When ADM thực hiện "Chạy kiểm thử quy tắc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi last_result, last_output, last_run_at; trạng thái chuyển NOT_RUN→PASS/FAIL.
- **REQ_102_02** – Given tình huống "Lỗi thực thi", When ADM thực hiện "Chạy kiểm thử quy tắc", Then ghi FAIL kèm lỗi.
- **REQ_102_03** – Given quy tắc BR_025 (Điều kiện nộp duyệt quy tắc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_102_04** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_103 – Nộp quy tắc để duyệt

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_103 |
| Module / Sub-module | MOD_012 / Duyệt |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Nộp quy tắc cho Quản trị viên khác duyệt |
| Permission | PER_LPK_AUTHOR |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có nguồn, điều khoản, hiệu lực và mọi ca PASS

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_status
- Trạng thái: DRAFT→SUBMITTED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | LAW_RULE.rule_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0269 | Trạng thái | LAW_RULE.rule_status | ENUM(10) | Theo BR_024 |

**6. Luồng chính**

1. ADM mở chức năng "Nộp quy tắc để duyệt".
2. Người dùng cung cấp: Mã quy tắc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_AUTHOR).
4. Kiểm tra điều kiện.
5. Đặt SUBMITTED.
6. Hệ thống trả kết quả: Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thiếu điều kiện: nêu mục còn thiếu

**9. Logic nghiệp vụ**

- Kiểm tra điều kiện
- Đặt SUBMITTED
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_025 – Điều kiện nộp duyệt quy tắc: Quy tắc phải có nguồn, điều khoản gốc, ngày hiệu lực và toàn bộ ca kiểm thử đạt thì mới nộp duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| DRAFT→SUBMITTED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_AUTHOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_103_01** – Given Có nguồn, điều khoản, hiệu lực và mọi ca PASS, When ADM thực hiện "Nộp quy tắc để duyệt" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_status; trạng thái chuyển DRAFT→SUBMITTED.
- **REQ_103_02** – Given tình huống "Thiếu điều kiện", When ADM thực hiện "Nộp quy tắc để duyệt", Then nêu mục còn thiếu.
- **REQ_103_03** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_103_04** – Given quy tắc BR_025 (Điều kiện nộp duyệt quy tắc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_104 – Duyệt quy tắc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_104 |
| Module / Sub-module | MOD_012 / Duyệt |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Quản trị viên khác người soạn duyệt quy tắc |
| Permission | PER_LPK_APPROVE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Quy tắc SUBMITTED; người duyệt khác người soạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_status, reviewer_user_id, approved_at
- Trạng thái: SUBMITTED→APPROVED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | LAW_RULE.rule_id | UUID(36) | Y | — | — |
| FLD_0272 | Ý kiến duyệt | LAW_RULE.review_comment | TEXT | N | — | Bắt buộc khi trả lại |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0269 | Trạng thái | LAW_RULE.rule_status | ENUM(10) | Theo BR_024 |
| FLD_0271 | Người duyệt | LAW_RULE.reviewer_user_id | UUID(36) | Quản trị viên duyệt |
| FLD_0273 | Duyệt lúc | LAW_RULE.approved_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Duyệt quy tắc".
2. Người dùng cung cấp: Mã quy tắc, Ý kiến duyệt.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_APPROVE).
4. Kiểm tra reviewer ≠ author.
5. Đặt APPROVED.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Trạng thái, Người duyệt, Duyệt lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Người duyệt là người soạn: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra reviewer ≠ author
- Đặt APPROVED
- Ghi nhật ký
- BR_001 – Tách ba vai trò khi phát hành luật: Người soạn, người duyệt và người phát hành một quy tắc hoặc một phiên bản Law Pack phải là ba tài khoản Quản trị viên khác nhau.
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| review_comment | Bắt buộc khi trả lại | Giá trị không hợp lệ: Bắt buộc khi trả lại |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| SUBMITTED→APPROVED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_APPROVE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_104_01** – Given Quy tắc SUBMITTED; người duyệt khác người soạn, When ADM thực hiện "Duyệt quy tắc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_status, reviewer_user_id, approved_at; trạng thái chuyển SUBMITTED→APPROVED.
- **REQ_104_02** – Given tình huống "Người duyệt là người soạn", When ADM thực hiện "Duyệt quy tắc", Then từ chối.
- **REQ_104_03** – Given quy tắc BR_001 (Tách ba vai trò khi phát hành luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_104_04** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_104_05** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_105 – Trả lại quy tắc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_105 |
| Module / Sub-module | MOD_012 / Duyệt |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Trả quy tắc về người soạn kèm ý kiến |
| Permission | PER_LPK_APPROVE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Quy tắc SUBMITTED

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: rule_status
- Trạng thái: SUBMITTED→DRAFT
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0256 | Mã quy tắc | LAW_RULE.rule_id | UUID(36) | Y | — | — |
| FLD_0272 | Ý kiến duyệt | LAW_RULE.review_comment | TEXT | N | — | Bắt buộc khi trả lại |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0269 | Trạng thái | LAW_RULE.rule_status | ENUM(10) | Theo BR_024 |

**6. Luồng chính**

1. ADM mở chức năng "Trả lại quy tắc".
2. Người dùng cung cấp: Mã quy tắc, Ý kiến duyệt.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_APPROVE).
4. Bắt buộc ý kiến.
5. Đặt DRAFT.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thiếu ý kiến: từ chối

**9. Logic nghiệp vụ**

- Bắt buộc ý kiến
- Đặt DRAFT
- Ghi nhật ký
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| review_comment | Bắt buộc khi trả lại | Giá trị không hợp lệ: Bắt buộc khi trả lại |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| SUBMITTED→DRAFT |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_APPROVE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_105_01** – Given Quy tắc SUBMITTED, When ADM thực hiện "Trả lại quy tắc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi rule_status; trạng thái chuyển SUBMITTED→DRAFT.
- **REQ_105_02** – Given tình huống "Thiếu ý kiến", When ADM thực hiện "Trả lại quy tắc", Then từ chối.
- **REQ_105_03** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_105_04** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_106 – Phát hành phiên bản Law Pack

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_106 |
| Module / Sub-module | MOD_012 / Phát hành |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Đóng gói quy tắc đã duyệt thành phiên bản mới |
| Permission | PER_LPK_RELEASE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có quy tắc APPROVED; người phát hành khác người soạn và người duyệt

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pack_version_id, version_label, checksum, released_at, active_pack_version_id
- Trạng thái: APPROVED→RELEASED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0285 | Hành lang | LAW_PACK_VERSION.corridor_code | VARCHAR(8) | Y | — | — |
| FLD_0288 | Ghi chú thay đổi | LAW_PACK_VERSION.change_note | TEXT | Y | — | 5-2000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | LAW_PACK_VERSION.pack_version_id | UUID(36) | Định danh |
| FLD_0286 | Nhãn phiên bản | LAW_PACK_VERSION.version_label | VARCHAR(20) | Nhãn hiển thị |
| FLD_0293 | Mã kiểm tra | LAW_PACK_VERSION.checksum | CHAR(64) | Kiểm tra toàn vẹn khi đồng bộ xuống thiết bị |
| FLD_0290 | Phát hành lúc | LAW_PACK_VERSION.released_at | TIMESTAMP | Theo giờ UTC |
| FLD_0255 | Phiên bản Law Pack đang dùng | CORRIDOR.active_pack_version_id | UUID(36) | Phiên bản được phát hành mới nhất |

**6. Luồng chính**

1. ADM mở chức năng "Phát hành phiên bản Law Pack".
2. Người dùng cung cấp: Hành lang, Ghi chú thay đổi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_RELEASE).
4. Kiểm tra BR_001.
5. Gom quy tắc.
6. Tính checksum.
7. Tạo phiên bản bất biến.
8. Cập nhật hành lang.
9. Đẩy cho thiết bị.
10. Kích hoạt báo thay đổi liên quan.
11. Hệ thống trả kết quả: Mã phiên bản, Nhãn phiên bản, Mã kiểm tra, Phát hành lúc, Phiên bản Law Pack đang dùng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa đủ ba Quản trị viên khác nhau: không phát hành

**9. Logic nghiệp vụ**

- Kiểm tra BR_001
- Gom quy tắc
- Tính checksum
- Tạo phiên bản bất biến
- Cập nhật hành lang
- Đẩy cho thiết bị
- Kích hoạt báo thay đổi liên quan
- BR_001 – Tách ba vai trò khi phát hành luật: Người soạn, người duyệt và người phát hành một quy tắc hoặc một phiên bản Law Pack phải là ba tài khoản Quản trị viên khác nhau.
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_042 – Chỉ báo thay đổi luật liên quan: Chỉ báo cho người dùng khi thay đổi luật ảnh hưởng quy tắc áp dụng cho hành lang, tỉnh hoặc dữ liệu của họ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| change_note | 5-2000 ký tự | Giá trị không hợp lệ: 5-2000 ký tự |
| change_note | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| APPROVED→RELEASED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_RELEASE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_106_01** – Given Có quy tắc APPROVED; người phát hành khác người soạn và người duyệt, When ADM thực hiện "Phát hành phiên bản Law Pack" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pack_version_id, version_label, checksum, released_at, active_pack_version_id; trạng thái chuyển APPROVED→RELEASED.
- **REQ_106_02** – Given tình huống "Chưa đủ ba Quản trị viên khác nhau", When ADM thực hiện "Phát hành phiên bản Law Pack", Then không phát hành.
- **REQ_106_03** – Given quy tắc BR_001 (Tách ba vai trò khi phát hành luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_106_04** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_106_05** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_107 – Khôi phục phiên bản trước

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_107 |
| Module / Sub-module | MOD_012 / Phát hành |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Khôi phục nội dung phiên bản cũ bằng phiên bản mới |
| Permission | PER_LPK_RELEASE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có phiên bản trước

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pack_version_id, pack_status
- Trạng thái: RELEASED→ROLLED_BACK
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | LAW_PACK_VERSION.pack_version_id | UUID(36) | Y | — | — |
| FLD_0288 | Ghi chú thay đổi | LAW_PACK_VERSION.change_note | TEXT | Y | — | 5-2000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | LAW_PACK_VERSION.pack_version_id | UUID(36) | Định danh |
| FLD_0291 | Trạng thái | LAW_PACK_VERSION.pack_status | ENUM(12) | Bị thay thế hay không |

**6. Luồng chính**

1. ADM mở chức năng "Khôi phục phiên bản trước".
2. Người dùng cung cấp: Mã phiên bản, Ghi chú thay đổi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_RELEASE).
4. Tạo phiên bản mới có nội dung cũ.
5. Đánh dấu phiên bản lỗi ROLLED_BACK.
6. Không sửa phiên bản đã phát hành.
7. Hệ thống trả kết quả: Mã phiên bản, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Phiên bản cũ không còn nguyên vẹn: từ chối

**9. Logic nghiệp vụ**

- Tạo phiên bản mới có nội dung cũ
- Đánh dấu phiên bản lỗi ROLLED_BACK
- Không sửa phiên bản đã phát hành
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.
- BR_001 – Tách ba vai trò khi phát hành luật: Người soạn, người duyệt và người phát hành một quy tắc hoặc một phiên bản Law Pack phải là ba tài khoản Quản trị viên khác nhau.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| change_note | 5-2000 ký tự | Giá trị không hợp lệ: 5-2000 ký tự |
| change_note | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| RELEASED→ROLLED_BACK |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_RELEASE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_107_01** – Given Có phiên bản trước, When ADM thực hiện "Khôi phục phiên bản trước" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pack_version_id, pack_status; trạng thái chuyển RELEASED→ROLLED_BACK.
- **REQ_107_02** – Given tình huống "Phiên bản cũ không còn nguyên vẹn", When ADM thực hiện "Khôi phục phiên bản trước", Then từ chối.
- **REQ_107_03** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_107_04** – Given quy tắc BR_001 (Tách ba vai trò khi phát hành luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_107_05** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_108 – Xem đề xuất cập nhật luật

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_108 |
| Module / Sub-module | MOD_012 / Canh luật |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Xem các thay đổi do agent Canh luật phát hiện |
| Permission | PER_LPK_WATCH |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: proposal_id, change_summary, detected_at, change_evidence_url, affected_rule_ids

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0300 | Trạng thái | LAW_UPDATE_PROPOSAL.proposal_status | ENUM(10) | Y | NEW | ∈{NEW,ACCEPTED,REJECTED,APPLIED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0294 | Mã đề xuất | LAW_UPDATE_PROPOSAL.proposal_id | UUID(36) | Định danh |
| FLD_0297 | Tóm tắt thay đổi | LAW_UPDATE_PROPOSAL.change_summary | TEXT | Mô tả thay đổi phát hiện |
| FLD_0296 | Phát hiện lúc | LAW_UPDATE_PROPOSAL.detected_at | TIMESTAMP | Theo giờ UTC |
| FLD_0298 | Đường dẫn bằng chứng | LAW_UPDATE_PROPOSAL.change_evidence_url | VARCHAR(500) | Liên kết tới nội dung thay đổi |
| FLD_0299 | Quy tắc bị ảnh hưởng | LAW_UPDATE_PROPOSAL.affected_rule_ids | JSONB | Danh sách quy tắc liên quan |

**6. Luồng chính**

1. ADM mở chức năng "Xem đề xuất cập nhật luật".
2. Người dùng cung cấp: Trạng thái.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_WATCH).
4. Lọc theo trạng thái.
5. Hệ thống trả kết quả: Mã đề xuất, Tóm tắt thay đổi, Phát hiện lúc, Đường dẫn bằng chứng, Quy tắc bị ảnh hưởng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có đề xuất: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo trạng thái
- BR_027 – Đề xuất từ Canh luật không tự áp dụng: Đề xuất cập nhật luật do agent phát hiện chỉ có hiệu lực sau khi Quản trị viên xử lý theo quy trình BR_024.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| proposal_status | ∈{NEW,ACCEPTED,REJECTED,APPLIED} | Giá trị không hợp lệ: ∈{NEW,ACCEPTED,REJECTED,APPLIED} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_WATCH | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_108_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Xem đề xuất cập nhật luật" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi proposal_id, change_summary, detected_at, change_evidence_url, affected_rule_ids.
- **REQ_108_02** – Given tình huống "Không có đề xuất", When ADM thực hiện "Xem đề xuất cập nhật luật", Then trạng thái rỗng.
- **REQ_108_03** – Given quy tắc BR_027 (Đề xuất từ Canh luật không tự áp dụng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_109 – Xử lý đề xuất cập nhật luật

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_109 |
| Module / Sub-module | MOD_012 / Canh luật |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Chấp nhận để soạn quy tắc hoặc từ chối |
| Permission | PER_LPK_WATCH |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đề xuất NEW

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: handled_by, handled_at
- Trạng thái: NEW→ACCEPTED/REJECTED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0294 | Mã đề xuất | LAW_UPDATE_PROPOSAL.proposal_id | UUID(36) | Y | — | — |
| FLD_0300 | Trạng thái | LAW_UPDATE_PROPOSAL.proposal_status | ENUM(10) | Y | NEW | ∈{NEW,ACCEPTED,REJECTED,APPLIED} |
| FLD_0303 | Lý do từ chối | LAW_UPDATE_PROPOSAL.reject_reason | TEXT | N | — | Bắt buộc khi REJECTED |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0301 | Người xử lý | LAW_UPDATE_PROPOSAL.handled_by | UUID(36) | Quản trị viên |
| FLD_0302 | Xử lý lúc | LAW_UPDATE_PROPOSAL.handled_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Xử lý đề xuất cập nhật luật".
2. Người dùng cung cấp: Mã đề xuất, Trạng thái, Lý do từ chối.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_WATCH).
4. Chấp nhận thì mở quy tắc nháp liên quan.
5. Từ chối bắt buộc lý do.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Người xử lý, Xử lý lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Từ chối thiếu lý do: từ chối thao tác

**9. Logic nghiệp vụ**

- Chấp nhận thì mở quy tắc nháp liên quan
- Từ chối bắt buộc lý do
- Ghi nhật ký
- BR_027 – Đề xuất từ Canh luật không tự áp dụng: Đề xuất cập nhật luật do agent phát hiện chỉ có hiệu lực sau khi Quản trị viên xử lý theo quy trình BR_024.
- BR_024 – Quy trình duyệt quy tắc luật: Quy tắc đi qua DRAFT → SUBMITTED → APPROVED → RELEASED; trả lại cần ý kiến duyệt.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| proposal_status | ∈{NEW,ACCEPTED,REJECTED,APPLIED} | Giá trị không hợp lệ: ∈{NEW,ACCEPTED,REJECTED,APPLIED} |
| reject_reason | Bắt buộc khi REJECTED | Giá trị không hợp lệ: Bắt buộc khi REJECTED |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NEW→ACCEPTED/REJECTED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_WATCH | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_109_01** – Given Đề xuất NEW, When ADM thực hiện "Xử lý đề xuất cập nhật luật" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi handled_by, handled_at; trạng thái chuyển NEW→ACCEPTED/REJECTED.
- **REQ_109_02** – Given tình huống "Từ chối thiếu lý do", When ADM thực hiện "Xử lý đề xuất cập nhật luật", Then từ chối thao tác.
- **REQ_109_03** – Given quy tắc BR_027 (Đề xuất từ Canh luật không tự áp dụng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_109_04** – Given quy tắc BR_024 (Quy trình duyệt quy tắc luật), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_109_05** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_110 – Phát hiện thay đổi nguồn luật

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_110 |
| Module / Sub-module | MOD_012 / Canh luật |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Agent Canh luật theo dõi nguồn và lập đề xuất |
| Permission | PER_SYS_LAWWATCH |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Nguồn ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: proposal_id, change_summary, affected_rule_ids

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0239 | Mã nguồn | LAW_SOURCE.source_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0294 | Mã đề xuất | LAW_UPDATE_PROPOSAL.proposal_id | UUID(36) | Định danh |
| FLD_0297 | Tóm tắt thay đổi | LAW_UPDATE_PROPOSAL.change_summary | TEXT | Mô tả thay đổi phát hiện |
| FLD_0299 | Quy tắc bị ảnh hưởng | LAW_UPDATE_PROPOSAL.affected_rule_ids | JSONB | Danh sách quy tắc liên quan |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_LAWWATCH).
3. Định kỳ so nội dung nguồn.
4. Nếu đổi thì tạo đề xuất NEW kèm bằng chứng.
5. Không sửa quy tắc.
6. Hệ thống trả kết quả: Mã đề xuất, Tóm tắt thay đổi, Quy tắc bị ảnh hưởng.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Nguồn không truy cập được: ghi nhật ký, thử lại sau

**9. Logic nghiệp vụ**

- Định kỳ so nội dung nguồn
- Nếu đổi thì tạo đề xuất NEW kèm bằng chứng
- Không sửa quy tắc
- BR_027 – Đề xuất từ Canh luật không tự áp dụng: Đề xuất cập nhật luật do agent phát hiện chỉ có hiệu lực sau khi Quản trị viên xử lý theo quy trình BR_024.
- BR_006 – Giới hạn mức tự chủ của agent: Agent hoạt động ở mức 0 đến 2 (đọc, gợi ý, soạn nháp, thao tác nhỏ hoàn tác được). Mọi hành động đi ra ngoài cần người dùng duyệt.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_LAWWATCH | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_110_01** – Given Nguồn ACTIVE, When SYS_AGENT thực hiện "Phát hiện thay đổi nguồn luật" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi proposal_id, change_summary, affected_rule_ids.
- **REQ_110_02** – Given tình huống "Nguồn không truy cập được", When SYS_AGENT thực hiện "Phát hiện thay đổi nguồn luật", Then ghi nhật ký, thử lại sau.
- **REQ_110_03** – Given quy tắc BR_027 (Đề xuất từ Canh luật không tự áp dụng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_110_04** – Given quy tắc BR_006 (Giới hạn mức tự chủ của agent), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_150 – Xem lịch sử phiên bản Law Pack

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_150 |
| Module / Sub-module | MOD_012 / Phát hành |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Xem danh sách phiên bản và thay đổi |
| Permission | PER_LPK_RELEASE |
| Ưu tiên | P2 |
| Nhãn | [ĐỀ XUẤT] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: version_label, released_at, change_note, pack_status, released_by

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0251 | Mã hành lang | CORRIDOR.corridor_code | VARCHAR(8) | Y | — | Dạng XX-YY (nước gửi - nước làm việc) |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0286 | Nhãn phiên bản | LAW_PACK_VERSION.version_label | VARCHAR(20) | Nhãn hiển thị |
| FLD_0290 | Phát hành lúc | LAW_PACK_VERSION.released_at | TIMESTAMP | Theo giờ UTC |
| FLD_0288 | Ghi chú thay đổi | LAW_PACK_VERSION.change_note | TEXT | Nội dung thay đổi |
| FLD_0291 | Trạng thái | LAW_PACK_VERSION.pack_status | ENUM(12) | Bị thay thế hay không |
| FLD_0289 | Người phát hành | LAW_PACK_VERSION.released_by | UUID(36) | Quản trị viên phát hành |

**6. Luồng chính**

1. ADM mở chức năng "Xem lịch sử phiên bản Law Pack".
2. Người dùng cung cấp: Mã hành lang.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_LPK_RELEASE).
4. Liệt kê theo thời gian.
5. Hệ thống trả kết quả: Nhãn phiên bản, Phát hành lúc, Ghi chú thay đổi, Trạng thái, Người phát hành.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hành lang chưa có phiên bản: trạng thái rỗng

**9. Logic nghiệp vụ**

- Liệt kê theo thời gian
- BR_026 – Phiên bản phát hành bất biến: Phiên bản Law Pack đã phát hành không sửa; khôi phục bằng cách phát hành phiên bản mới trỏ về nội dung cũ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| corridor_code | Dạng XX-YY (nước gửi - nước làm việc) | Giá trị không hợp lệ: Dạng XX-YY (nước gửi - nước làm việc) |
| corridor_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_LPK_RELEASE | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_150_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Xem lịch sử phiên bản Law Pack" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi version_label, released_at, change_note, pack_status, released_by.
- **REQ_150_02** – Given tình huống "Hành lang chưa có phiên bản", When ADM thực hiện "Xem lịch sử phiên bản Law Pack", Then trạng thái rỗng.
- **REQ_150_03** – Given quy tắc BR_026 (Phiên bản phát hành bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_013 – Case Pack Desk

### FUN_111 – Tạo Case Pack

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_111 |
| Module / Sub-module | MOD_013 / Soạn |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Tạo hồ sơ song ngữ để nhờ hỗ trợ |
| Permission | PER_CASE_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: case_pack_id, case_status
- Trạng thái: (chưa có)→DRAFT

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0208 | Tiêu đề | CASE_PACK.case_title | VARCHAR(120) | Y | — | 1-120 ký tự |
| FLD_0209 | Loại vấn đề | CASE_PACK.issue_type | ENUM(16) | Y | — | ∈{WAGE_SHORTFALL,CONTRACT_TERM,DEDUCTION,PASSPORT_HOLD,OTHER} |
| FLD_0210 | Từ kỳ | CASE_PACK.period_from | VARCHAR(7) | N | — | YYYY-MM |
| FLD_0211 | Đến kỳ | CASE_PACK.period_to | VARCHAR(7) | N | — | YYYY-MM; không trước period_from |
| FLD_0212 | Tóm tắt tiếng Việt | CASE_PACK.summary_vi | TEXT | Y | — | 20-3000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0206 | Mã Case Pack | CASE_PACK.case_pack_id | UUID(36) | Định danh |
| FLD_0214 | Trạng thái | CASE_PACK.case_status | ENUM(8) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Tạo Case Pack".
2. Người dùng cung cấp: Tiêu đề, Loại vấn đề, Từ kỳ, Đến kỳ, Tóm tắt tiếng Việt.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_CREATE).
4. Kiểm tra.
5. Tạo DRAFT.
6. Hệ thống trả kết quả: Mã Case Pack, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Kỳ kết thúc trước kỳ bắt đầu: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra
- Tạo DRAFT
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| case_title | 1-120 ký tự | Giá trị không hợp lệ: 1-120 ký tự |
| case_title | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| issue_type | ∈{WAGE_SHORTFALL,CONTRACT_TERM,DEDUCTION,PASSPORT_HOLD,OTHER} | Giá trị không hợp lệ: ∈{WAGE_SHORTFALL,CONTRACT_TERM,DEDUCTION,PASSPORT_HOLD,OTHER} |
| issue_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| period_from | YYYY-MM | Giá trị không hợp lệ: YYYY-MM |
| period_to | YYYY-MM; không trước period_from | Giá trị không hợp lệ: YYYY-MM; không trước period_from |
| summary_vi | 20-3000 ký tự | Giá trị không hợp lệ: 20-3000 ký tự |
| summary_vi | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→DRAFT |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_111_01** – Given Đã đăng nhập, When WRK thực hiện "Tạo Case Pack" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi case_pack_id, case_status; trạng thái chuyển (chưa có)→DRAFT.
- **REQ_111_02** – Given tình huống "Kỳ kết thúc trước kỳ bắt đầu", When WRK thực hiện "Tạo Case Pack", Then từ chối.
- **REQ_111_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_112 – Chọn bằng chứng đưa vào Case Pack

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_112 |
| Module / Sub-module | MOD_013 / Soạn |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chọn bằng chứng và có kèm bản gốc hay không |
| Permission | PER_CASE_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case Pack DRAFT

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: item_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0220 | Mã Case Pack | CASE_PACK_ITEM.case_pack_id | UUID(36) | Y | — | — |
| FLD_0221 | Mã bằng chứng | CASE_PACK_ITEM.evidence_id | UUID(36) | Y | — | — |
| FLD_0222 | Kèm tài liệu gốc | CASE_PACK_ITEM.include_original | BOOLEAN | Y | false | — |
| FLD_0223 | Thứ tự | CASE_PACK_ITEM.sort_order | INTEGER | Y | 1 | ≥1 |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0219 | Mã mục | CASE_PACK_ITEM.item_id | UUID(36) | Định danh |

**6. Luồng chính**

1. WRK mở chức năng "Chọn bằng chứng đưa vào Case Pack".
2. Người dùng cung cấp: Mã Case Pack, Mã bằng chứng, Kèm tài liệu gốc, Thứ tự.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_CREATE).
4. Kiểm tra bằng chứng cùng chủ.
5. Lưu mục.
6. Hệ thống trả kết quả: Mã mục.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Bằng chứng không thuộc người dùng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra bằng chứng cùng chủ
- Lưu mục
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.
- BR_018 – Chia sẻ Case Pack có chọn lọc: Chỉ chia sẻ các phần người dùng chọn, cho một tổ chức nhận, với thời hạn hết hạn bắt buộc.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| sort_order | ≥1 | Giá trị không hợp lệ: ≥1 |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_112_01** – Given Case Pack DRAFT, When WRK thực hiện "Chọn bằng chứng đưa vào Case Pack" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi item_id.
- **REQ_112_02** – Given tình huống "Bằng chứng không thuộc người dùng", When WRK thực hiện "Chọn bằng chứng đưa vào Case Pack", Then từ chối.
- **REQ_112_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_112_04** – Given quy tắc BR_018 (Chia sẻ Case Pack có chọn lọc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_113 – Dịch tóm tắt và soạn thư song ngữ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_113 |
| Module / Sub-module | MOD_013 / Soạn |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Dịch tóm tắt sang tiếng Nhật và soạn bản nháp thư song ngữ để người dùng tự gửi ngoài ứng dụng |
| Permission | PER_SYS_SUPPORT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có tóm tắt tiếng Việt

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: summary_ja, subject_vi, body_vi, subject_ja, body_ja, letter_status

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0206 | Mã Case Pack | CASE_PACK.case_pack_id | UUID(36) | Y | — | — |
| FLD_0212 | Tóm tắt tiếng Việt | CASE_PACK.summary_vi | TEXT | Y | — | 20-3000 ký tự |
| FLD_0365 | Người nhận | LETTER_DRAFT.recipient_type | ENUM(12) | Y | — | ∈{EMPLOYER,SUPPORT_ORG,AGENCY,OTHER} |
| FLD_0366 | Mục đích thư | LETTER_DRAFT.letter_purpose | ENUM(20) | Y | — | ∈{ASK_CLARIFICATION,REQUEST_PAYSLIP,REPORT_ISSUE,OTHER} |
| FLD_0367 | Kỳ liên quan | LETTER_DRAFT.related_period_id | UUID(36) | N | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0213 | Tóm tắt tiếng Nhật | CASE_PACK.summary_ja | TEXT | Bản dịch do hệ thống soạn, người dùng duyệt |
| FLD_0368 | Tiêu đề tiếng Việt | LETTER_DRAFT.subject_vi | VARCHAR(150) | Tiêu đề |
| FLD_0369 | Nội dung tiếng Việt | LETTER_DRAFT.body_vi | TEXT | Nội dung bản nháp |
| FLD_0370 | Tiêu đề tiếng Nhật | LETTER_DRAFT.subject_ja | VARCHAR(150) | Bản dịch |
| FLD_0371 | Nội dung tiếng Nhật | LETTER_DRAFT.body_ja | TEXT | Bản dịch |
| FLD_0372 | Trạng thái | LETTER_DRAFT.letter_status | ENUM(10) | Hệ thống không gửi thư |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_SUPPORT).
3. Dịch bằng mô hình cho phép hoặc mẫu thuật ngữ.
4. Giữ nguyên số liệu.
5. Người dùng xem và sửa.
6. Hệ thống trả kết quả: Tóm tắt tiếng Nhật, Tiêu đề tiếng Việt, Nội dung tiếng Việt, Tiêu đề tiếng Nhật, Nội dung tiếng Nhật, Trạng thái.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Dịch lỗi: để trống bản tiếng Nhật, nhắc tự bổ sung

**9. Logic nghiệp vụ**

- Dịch bằng mô hình cho phép hoặc mẫu thuật ngữ
- Giữ nguyên số liệu
- Người dùng xem và sửa
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.
- BR_007 – AI không tính tiền: Mọi con số tiền, giờ, phụ trội và mức tối thiểu do bộ tính toán cố định dựa trên Law Pack tính; mô hình ngôn ngữ chỉ diễn giải kết quả.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| summary_vi | 20-3000 ký tự | Giá trị không hợp lệ: 20-3000 ký tự |
| summary_vi | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| recipient_type | ∈{EMPLOYER,SUPPORT_ORG,AGENCY,OTHER} | Giá trị không hợp lệ: ∈{EMPLOYER,SUPPORT_ORG,AGENCY,OTHER} |
| recipient_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| letter_purpose | ∈{ASK_CLARIFICATION,REQUEST_PAYSLIP,REPORT_ISSUE,OTHER} | Giá trị không hợp lệ: ∈{ASK_CLARIFICATION,REQUEST_PAYSLIP,REPORT_ISSUE,OTHER} |
| letter_purpose | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_SUPPORT | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_113_01** – Given Có tóm tắt tiếng Việt, When SYS_AGENT thực hiện "Dịch tóm tắt và soạn thư song ngữ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi summary_ja, subject_vi, body_vi, subject_ja, body_ja, letter_status.
- **REQ_113_02** – Given tình huống "Dịch lỗi", When SYS_AGENT thực hiện "Dịch tóm tắt và soạn thư song ngữ", Then để trống bản tiếng Nhật, nhắc tự bổ sung.
- **REQ_113_03** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_113_04** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_113_05** – Given quy tắc BR_007 (AI không tính tiền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_114 – Xem trước Case Pack

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_114 |
| Module / Sub-module | MOD_013 / Soạn |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem đúng nội dung sẽ chia sẻ |
| Permission | PER_CASE_CREATE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case Pack có mục

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: summary_vi, summary_ja, evidence_id
- Trạng thái: DRAFT→READY

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0206 | Mã Case Pack | CASE_PACK.case_pack_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0212 | Tóm tắt tiếng Việt | CASE_PACK.summary_vi | TEXT | Mô tả vấn đề |
| FLD_0213 | Tóm tắt tiếng Nhật | CASE_PACK.summary_ja | TEXT | Bản dịch do hệ thống soạn, người dùng duyệt |
| FLD_0221 | Mã bằng chứng | CASE_PACK_ITEM.evidence_id | UUID(36) | Bằng chứng được chọn |

**6. Luồng chính**

1. WRK mở chức năng "Xem trước Case Pack".
2. Người dùng cung cấp: Mã Case Pack.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_CREATE).
4. Dựng bản xem trước từ các mục đã chọn.
5. Hệ thống trả kết quả: Tóm tắt tiếng Việt, Tóm tắt tiếng Nhật, Mã bằng chứng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.
- A2: Người dùng quay lại chỉnh nội dung sau khi xem trước.

**8. Luồng ngoại lệ**

- E1: Không có mục nào: không cho sẵn sàng

**9. Logic nghiệp vụ**

- Dựng bản xem trước từ các mục đã chọn
- BR_046 – Xem trước trước khi chia sẻ: Người dùng xem trước đúng nội dung sẽ được chia sẻ rồi mới xác nhận.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| DRAFT→READY |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_CREATE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_114_01** – Given Case Pack có mục, When WRK thực hiện "Xem trước Case Pack" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi summary_vi, summary_ja, evidence_id; trạng thái chuyển DRAFT→READY.
- **REQ_114_02** – Given tình huống "Không có mục nào", When WRK thực hiện "Xem trước Case Pack", Then không cho sẵn sàng.
- **REQ_114_03** – Given quy tắc BR_046 (Xem trước trước khi chia sẻ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_115 – Xuất Case Pack ra PDF

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_115 |
| Module / Sub-module | MOD_013 / Soạn |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xuất PDF để tự gửi ngoài ứng dụng |
| Permission | PER_CASE_EXPORT |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case Pack READY

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: pdf_file_ref, pdf_hash

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0206 | Mã Case Pack | CASE_PACK.case_pack_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0215 | Khóa tệp PDF | CASE_PACK.pdf_file_ref | VARCHAR(255) | Tệp đã xuất |
| FLD_0216 | Mã băm PDF | CASE_PACK.pdf_hash | CHAR(64) | Chống sửa đổi |

**6. Luồng chính**

1. WRK mở chức năng "Xuất Case Pack ra PDF".
2. Người dùng cung cấp: Mã Case Pack.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_EXPORT).
4. Dựng PDF song ngữ.
5. Tính mã băm.
6. Lưu.
7. Hệ thống trả kết quả: Khóa tệp PDF, Mã băm PDF.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.
- A2: Người dùng quay lại chỉnh nội dung sau khi xem trước.

**8. Luồng ngoại lệ**

- E1: Tệp lỗi: thử lại

**9. Logic nghiệp vụ**

- Dựng PDF song ngữ
- Tính mã băm
- Lưu
- BR_046 – Xem trước trước khi chia sẻ: Người dùng xem trước đúng nội dung sẽ được chia sẻ rồi mới xác nhận.
- BR_016 – Phiên bản và mã băm tài liệu: Sửa tài liệu tạo phiên bản mới, giữ phiên bản cũ; mỗi phiên bản có mã băm nội dung.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_EXPORT | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_115_01** – Given Case Pack READY, When WRK thực hiện "Xuất Case Pack ra PDF" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi pdf_file_ref, pdf_hash.
- **REQ_115_02** – Given tình huống "Tệp lỗi", When WRK thực hiện "Xuất Case Pack ra PDF", Then thử lại.
- **REQ_115_03** – Given quy tắc BR_046 (Xem trước trước khi chia sẻ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_115_04** – Given quy tắc BR_016 (Phiên bản và mã băm tài liệu), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_116 – Chia sẻ Case Pack cho tổ chức

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_116 |
| Module / Sub-module | MOD_013 / Chia sẻ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Chia sẻ có chọn lọc cho một tổ chức, có hạn |
| Permission | PER_CASE_SHARE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case Pack READY; đã đồng ý CASE_SHARE; tổ chức nhận Case Pack

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: share_id, share_status, desk_case_id
- Trạng thái: READY→SHARED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0225 | Mã Case Pack | CASE_SHARE.case_pack_id | UUID(36) | Y | — | — |
| FLD_0226 | Mã tổ chức nhận | CASE_SHARE.org_id | UUID(36) | Y | — | Tổ chức đang hoạt động, nhận Case Pack |
| FLD_0227 | Các phần chia sẻ | CASE_SHARE.shared_sections | JSONB | Y | — | Chỉ gồm các mục đã chọn |
| FLD_0228 | Hết hạn chia sẻ lúc | CASE_SHARE.expires_at | TIMESTAMP | Y | — | Sau hiện tại và ≤ thời hạn tối đa [CẦN XÁC NHẬN 30 ngày] |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0224 | Mã chia sẻ | CASE_SHARE.share_id | UUID(36) | Định danh |
| FLD_0229 | Trạng thái chia sẻ | CASE_SHARE.share_status | ENUM(8) | Trạng thái |
| FLD_0329 | Mã case | DESK_CASE.desk_case_id | UUID(36) | Định danh |

**6. Luồng chính**

1. WRK mở chức năng "Chia sẻ Case Pack cho tổ chức".
2. Người dùng cung cấp: Mã Case Pack, Mã tổ chức nhận, Các phần chia sẻ, Hết hạn chia sẻ lúc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_SHARE).
4. Kiểm tra đồng ý, tổ chức ACTIVE, hạn tối đa.
5. Hiển thị xem trước.
6. Xác nhận.
7. Tạo CASE_SHARE ACTIVE và DESK_CASE NEW.
8. Hệ thống trả kết quả: Mã chia sẻ, Trạng thái chia sẻ, Mã case.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.
- A2: Người dùng quay lại chỉnh nội dung sau khi xem trước.

**8. Luồng ngoại lệ**

- E1: Chưa đồng ý: dẫn tới FUN_010
- E2: Tổ chức không nhận: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra đồng ý, tổ chức ACTIVE, hạn tối đa
- Hiển thị xem trước
- Xác nhận
- Tạo CASE_SHARE ACTIVE và DESK_CASE NEW
- BR_018 – Chia sẻ Case Pack có chọn lọc: Chỉ chia sẻ các phần người dùng chọn, cho một tổ chức nhận, với thời hạn hết hạn bắt buộc.
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.
- BR_046 – Xem trước trước khi chia sẻ: Người dùng xem trước đúng nội dung sẽ được chia sẻ rồi mới xác nhận.
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| org_id | Tổ chức đang hoạt động, nhận Case Pack | Giá trị không hợp lệ: Tổ chức đang hoạt động, nhận Case Pack |
| org_id | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| shared_sections | Chỉ gồm các mục đã chọn | Giá trị không hợp lệ: Chỉ gồm các mục đã chọn |
| shared_sections | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| expires_at | Sau hiện tại và ≤ thời hạn tối đa [CẦN XÁC NHẬN 30 ngày] | Giá trị không hợp lệ: Sau hiện tại và ≤ thời hạn tối đa [CẦN XÁC NHẬN 30 ngày] |
| expires_at | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| READY→SHARED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_SHARE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_116_01** – Given Case Pack READY; đã đồng ý CASE_SHARE; tổ chức nhận Case Pack, When WRK thực hiện "Chia sẻ Case Pack cho tổ chức" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi share_id, share_status, desk_case_id; trạng thái chuyển READY→SHARED.
- **REQ_116_02** – Given tình huống "Chưa đồng ý", When WRK thực hiện "Chia sẻ Case Pack cho tổ chức", Then dẫn tới FUN_010.
- **REQ_116_03** – Given tình huống "Tổ chức không nhận", When WRK thực hiện "Chia sẻ Case Pack cho tổ chức", Then từ chối.
- **REQ_116_04** – Given quy tắc BR_018 (Chia sẻ Case Pack có chọn lọc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_116_05** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_116_06** – Given quy tắc BR_046 (Xem trước trước khi chia sẻ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_117 – Thu hồi chia sẻ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_117 |
| Module / Sub-module | MOD_013 / Chia sẻ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Thu hồi chia sẻ bất kỳ lúc nào |
| Permission | PER_CASE_SHARE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Chia sẻ ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: share_status, revoked_at
- Trạng thái: ACTIVE→REVOKED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0224 | Mã chia sẻ | CASE_SHARE.share_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0229 | Trạng thái chia sẻ | CASE_SHARE.share_status | ENUM(8) | Trạng thái |
| FLD_0231 | Thu hồi lúc | CASE_SHARE.revoked_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Thu hồi chia sẻ".
2. Người dùng cung cấp: Mã chia sẻ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_SHARE).
4. Đặt REVOKED.
5. Cán bộ mất quyền xem ngay.
6. Hệ thống trả kết quả: Trạng thái chia sẻ, Thu hồi lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Đã hết hạn: không cần thu hồi

**9. Logic nghiệp vụ**

- Đặt REVOKED
- Cán bộ mất quyền xem ngay
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→REVOKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_SHARE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_117_01** – Given Chia sẻ ACTIVE, When WRK thực hiện "Thu hồi chia sẻ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi share_status, revoked_at; trạng thái chuyển ACTIVE→REVOKED.
- **REQ_117_02** – Given tình huống "Đã hết hạn", When WRK thực hiện "Thu hồi chia sẻ", Then không cần thu hồi.
- **REQ_117_03** – Given quy tắc BR_019 (Thu hồi chia sẻ có hiệu lực ngay), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_118 – Nhận xử lý case

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_118 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Cán bộ tự nhận một case của tổ chức mình |
| Permission | PER_DESK_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case NEW, thuộc tổ chức của cán bộ

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: assignee_user_id, desk_case_status, access_id
- Trạng thái: NEW→IN_PROGRESS

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0329 | Mã case | DESK_CASE.desk_case_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0332 | Cán bộ phụ trách | DESK_CASE.assignee_user_id | UUID(36) | Người nhận xử lý |
| FLD_0333 | Trạng thái case | DESK_CASE.desk_case_status | ENUM(16) | Tiến độ |
| FLD_0232 | Mã lượt truy cập | ACCESS_LOG.access_id | UUID(36) | Định danh |

**6. Luồng chính**

1. SUP mở chức năng "Nhận xử lý case".
2. Người dùng cung cấp: Mã case.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_VIEW).
4. Kiểm tra cùng tổ chức và còn hạn.
5. Gán cán bộ.
6. Ghi ACCESS_LOG CLAIM.
7. Hệ thống trả kết quả: Cán bộ phụ trách, Trạng thái case, Mã lượt truy cập.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Đã có người nhận: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra cùng tổ chức và còn hạn
- Gán cán bộ
- Ghi ACCESS_LOG CLAIM
- BR_021 – Phạm vi dữ liệu của cán bộ: Cán bộ chỉ thấy Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng các phần được chia sẻ.
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| NEW→IN_PROGRESS |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_VIEW | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_118_01** – Given Case NEW, thuộc tổ chức của cán bộ, When SUP thực hiện "Nhận xử lý case" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi assignee_user_id, desk_case_status, access_id; trạng thái chuyển NEW→IN_PROGRESS.
- **REQ_118_02** – Given tình huống "Đã có người nhận", When SUP thực hiện "Nhận xử lý case", Then từ chối.
- **REQ_118_03** – Given quy tắc BR_021 (Phạm vi dữ liệu của cán bộ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_118_04** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_119 – Xem danh sách case của tổ chức

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_119 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Xem case chia sẻ cho tổ chức mình |
| Permission | PER_DESK_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Tài khoản SUP ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: desk_case_id, received_at, assignee_user_id, expires_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0333 | Trạng thái case | DESK_CASE.desk_case_status | ENUM(16) | Y | NEW | ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0329 | Mã case | DESK_CASE.desk_case_id | UUID(36) | Định danh |
| FLD_0336 | Nhận lúc | DESK_CASE.received_at | TIMESTAMP | Theo giờ UTC |
| FLD_0332 | Cán bộ phụ trách | DESK_CASE.assignee_user_id | UUID(36) | Người nhận xử lý |
| FLD_0228 | Hết hạn chia sẻ lúc | CASE_SHARE.expires_at | TIMESTAMP | Hết hạn tự đóng |

**6. Luồng chính**

1. SUP mở chức năng "Xem danh sách case của tổ chức".
2. Người dùng cung cấp: Trạng thái case.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_VIEW).
4. Lọc theo org_id của cán bộ.
5. Ẩn case hết hạn hoặc thu hồi.
6. Hệ thống trả kết quả: Mã case, Nhận lúc, Cán bộ phụ trách, Hết hạn chia sẻ lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có case: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo org_id của cán bộ
- Ẩn case hết hạn hoặc thu hồi
- BR_021 – Phạm vi dữ liệu của cán bộ: Cán bộ chỉ thấy Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng các phần được chia sẻ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| desk_case_status | ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} | Giá trị không hợp lệ: ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_VIEW | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_119_01** – Given Tài khoản SUP ACTIVE, When SUP thực hiện "Xem danh sách case của tổ chức" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi desk_case_id, received_at, assignee_user_id, expires_at.
- **REQ_119_02** – Given tình huống "Không có case", When SUP thực hiện "Xem danh sách case của tổ chức", Then trạng thái rỗng.
- **REQ_119_03** – Given quy tắc BR_021 (Phạm vi dữ liệu của cán bộ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_120 – Xem nội dung case

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_120 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Xem các phần Case Pack được chia sẻ |
| Permission | PER_DESK_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case thuộc tổ chức; chia sẻ còn hạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: summary_vi, summary_ja, evidence_id, access_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0329 | Mã case | DESK_CASE.desk_case_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0212 | Tóm tắt tiếng Việt | CASE_PACK.summary_vi | TEXT | Mô tả vấn đề |
| FLD_0213 | Tóm tắt tiếng Nhật | CASE_PACK.summary_ja | TEXT | Bản dịch do hệ thống soạn, người dùng duyệt |
| FLD_0221 | Mã bằng chứng | CASE_PACK_ITEM.evidence_id | UUID(36) | Bằng chứng được chọn |
| FLD_0232 | Mã lượt truy cập | ACCESS_LOG.access_id | UUID(36) | Định danh |

**6. Luồng chính**

1. SUP mở chức năng "Xem nội dung case".
2. Người dùng cung cấp: Mã case.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_VIEW).
4. Kiểm tra phạm vi shared_sections.
5. Trả đúng phần.
6. Ghi ACCESS_LOG VIEW.
7. Hệ thống trả kết quả: Tóm tắt tiếng Việt, Tóm tắt tiếng Nhật, Mã bằng chứng, Mã lượt truy cập.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chia sẻ đã thu hồi hoặc hết hạn: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra phạm vi shared_sections
- Trả đúng phần
- Ghi ACCESS_LOG VIEW
- BR_021 – Phạm vi dữ liệu của cán bộ: Cán bộ chỉ thấy Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng các phần được chia sẻ.
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.
- BR_019 – Thu hồi chia sẻ có hiệu lực ngay: Thu hồi hoặc hết hạn chia sẻ làm cán bộ mất quyền xem ngay lập tức.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_VIEW | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_120_01** – Given Case thuộc tổ chức; chia sẻ còn hạn, When SUP thực hiện "Xem nội dung case" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi summary_vi, summary_ja, evidence_id, access_id.
- **REQ_120_02** – Given tình huống "Chia sẻ đã thu hồi hoặc hết hạn", When SUP thực hiện "Xem nội dung case", Then từ chối.
- **REQ_120_03** – Given quy tắc BR_021 (Phạm vi dữ liệu của cán bộ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_120_04** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_120_05** – Given quy tắc BR_019 (Thu hồi chia sẻ có hiệu lực ngay), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_121 – Ghi chú nội bộ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_121 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Ghi chú nội bộ, người lao động không thấy |
| Permission | PER_DESK_NOTE |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case đang xử lý

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: note_id, access_id

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0339 | Mã case | CASE_NOTE.note_case_id | UUID(36) | Y | — | — |
| FLD_0341 | Nội dung ghi chú | CASE_NOTE.note_text | TEXT | Y | — | 1-5000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0338 | Mã ghi chú | CASE_NOTE.note_id | UUID(36) | Định danh |
| FLD_0232 | Mã lượt truy cập | ACCESS_LOG.access_id | UUID(36) | Định danh |

**6. Luồng chính**

1. SUP mở chức năng "Ghi chú nội bộ".
2. Người dùng cung cấp: Mã case, Nội dung ghi chú.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_NOTE).
4. Lưu ghi chú.
5. Ghi ACCESS_LOG NOTE.
6. Hệ thống trả kết quả: Mã ghi chú, Mã lượt truy cập.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Case đã đóng: từ chối

**9. Logic nghiệp vụ**

- Lưu ghi chú
- Ghi ACCESS_LOG NOTE
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.
- BR_021 – Phạm vi dữ liệu của cán bộ: Cán bộ chỉ thấy Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng các phần được chia sẻ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| note_text | 1-5000 ký tự | Giá trị không hợp lệ: 1-5000 ký tự |
| note_text | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_NOTE | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_121_01** – Given Case đang xử lý, When SUP thực hiện "Ghi chú nội bộ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi note_id, access_id.
- **REQ_121_02** – Given tình huống "Case đã đóng", When SUP thực hiện "Ghi chú nội bộ", Then từ chối.
- **REQ_121_03** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_121_04** – Given quy tắc BR_021 (Phạm vi dữ liệu của cán bộ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_122 – Gửi đề nghị bổ sung thông tin

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_122 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Đề nghị người lao động bổ sung thông tin |
| Permission | PER_DESK_REQUEST |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case đang xử lý

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: request_id, request_status, request_expires_at
- Trạng thái: IN_PROGRESS→WAITING_WORKER

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0344 | Mã case | INFO_REQUEST.request_case_id | UUID(36) | Y | — | — |
| FLD_0346 | Nội dung đề nghị | INFO_REQUEST.request_message | TEXT | Y | — | 10-2000 ký tự |
| FLD_0347 | Mục cần bổ sung | INFO_REQUEST.requested_items | VARCHAR(300) | N | — | Danh sách loại tài liệu hoặc thông tin |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0343 | Mã đề nghị | INFO_REQUEST.request_id | UUID(36) | Định danh |
| FLD_0348 | Trạng thái | INFO_REQUEST.request_status | ENUM(10) | Tiến độ |
| FLD_0351 | Đề nghị hết hạn | INFO_REQUEST.request_expires_at | TIMESTAMP | Hạn trả lời |

**6. Luồng chính**

1. SUP mở chức năng "Gửi đề nghị bổ sung thông tin".
2. Người dùng cung cấp: Mã case, Nội dung đề nghị, Mục cần bổ sung.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_REQUEST).
4. Tạo INFO_REQUEST OPEN.
5. Thông báo cho người lao động.
6. Đặt case WAITING_WORKER.
7. Ghi ACCESS_LOG REQUEST.
8. Hệ thống trả kết quả: Mã đề nghị, Trạng thái, Đề nghị hết hạn.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chia sẻ đã hết hạn: không gửi

**9. Logic nghiệp vụ**

- Tạo INFO_REQUEST OPEN
- Thông báo cho người lao động
- Đặt case WAITING_WORKER
- Ghi ACCESS_LOG REQUEST
- BR_023 – Đề nghị bổ sung thông tin: Cán bộ gửi đề nghị qua ứng dụng; người dùng toàn quyền trả lời, từ chối hoặc bỏ qua; chưa trả lời thì không có dữ liệu mới.
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| request_message | 10-2000 ký tự | Giá trị không hợp lệ: 10-2000 ký tự |
| request_message | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| requested_items | Danh sách loại tài liệu hoặc thông tin | Giá trị không hợp lệ: Danh sách loại tài liệu hoặc thông tin |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| IN_PROGRESS→WAITING_WORKER |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_REQUEST | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_122_01** – Given Case đang xử lý, When SUP thực hiện "Gửi đề nghị bổ sung thông tin" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi request_id, request_status, request_expires_at; trạng thái chuyển IN_PROGRESS→WAITING_WORKER.
- **REQ_122_02** – Given tình huống "Chia sẻ đã hết hạn", When SUP thực hiện "Gửi đề nghị bổ sung thông tin", Then không gửi.
- **REQ_122_03** – Given quy tắc BR_023 (Đề nghị bổ sung thông tin), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_122_04** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_123 – Đóng hoặc đổi trạng thái case

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_123 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Cập nhật tiến độ và đóng case có lý do |
| Permission | PER_DESK_CLOSE |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Case đang xử lý

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: closed_at, case_status
- Trạng thái: IN_PROGRESS→CLOSED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0329 | Mã case | DESK_CASE.desk_case_id | UUID(36) | Y | — | — |
| FLD_0333 | Trạng thái case | DESK_CASE.desk_case_status | ENUM(16) | Y | NEW | ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} |
| FLD_0334 | Lý do đóng | DESK_CASE.closing_reason | ENUM(12) | N | — | ∈{RESOLVED,REFERRED,WITHDRAWN,NO_RESPONSE}; bắt buộc khi đóng |
| FLD_0335 | Ghi chú đóng case | DESK_CASE.closing_note | TEXT | N | — | ≤ 2000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0337 | Đóng lúc | DESK_CASE.closed_at | TIMESTAMP | Theo giờ UTC |
| FLD_0214 | Trạng thái | CASE_PACK.case_status | ENUM(8) | Tiến độ |

**6. Luồng chính**

1. SUP mở chức năng "Đóng hoặc đổi trạng thái case".
2. Người dùng cung cấp: Mã case, Trạng thái case, Lý do đóng, Ghi chú đóng case.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_CLOSE).
4. Kiểm tra lý do khi đóng.
5. Cập nhật.
6. Thông báo người lao động.
7. Ghi ACCESS_LOG CLOSE.
8. Hệ thống trả kết quả: Đóng lúc, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thiếu lý do: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra lý do khi đóng
- Cập nhật
- Thông báo người lao động
- Ghi ACCESS_LOG CLOSE
- BR_022 – Đóng case: Đóng case cần lý do; case đã đóng không nhận thao tác mới ngoài xem.
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| desk_case_status | ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} | Giá trị không hợp lệ: ∈{NEW,IN_PROGRESS,WAITING_WORKER,CLOSED} |
| closing_reason | ∈{RESOLVED,REFERRED,WITHDRAWN,NO_RESPONSE}; bắt buộc khi đóng | Giá trị không hợp lệ: ∈{RESOLVED,REFERRED,WITHDRAWN,NO_RESPONSE}; bắt buộc khi đóng |
| closing_note | ≤ 2000 ký tự | Giá trị không hợp lệ: ≤ 2000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| IN_PROGRESS→CLOSED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_CLOSE | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_123_01** – Given Case đang xử lý, When SUP thực hiện "Đóng hoặc đổi trạng thái case" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi closed_at, case_status; trạng thái chuyển IN_PROGRESS→CLOSED.
- **REQ_123_02** – Given tình huống "Thiếu lý do", When SUP thực hiện "Đóng hoặc đổi trạng thái case", Then từ chối.
- **REQ_123_03** – Given quy tắc BR_022 (Đóng case), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_123_04** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_124 – Xem thống kê Desk tổng hợp

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_124 |
| Module / Sub-module | MOD_013 / Quản trị |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Xem số lượng case theo trạng thái, không xem nội dung |
| Permission | PER_DESK_STAT |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: desk_case_status, metric_value, sample_size

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0304 | Mã tổ chức | SUPPORT_ORG.org_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0333 | Trạng thái case | DESK_CASE.desk_case_status | ENUM(16) | Tiến độ |
| FLD_0545 | Giá trị | AGG_STAT.metric_value | DECIMAL(14,4) | Giá trị tổng hợp |
| FLD_0546 | Cỡ mẫu | AGG_STAT.sample_size | INTEGER | Số bản ghi |

**6. Luồng chính**

1. ADM mở chức năng "Xem thống kê Desk tổng hợp".
2. Người dùng cung cấp: Mã tổ chức.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_STAT).
4. Đếm theo tổ chức và trạng thái.
5. Không trả nội dung.
6. Hệ thống trả kết quả: Trạng thái case, Giá trị, Cỡ mẫu.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Cỡ mẫu dưới ngưỡng k: ẩn số

**9. Logic nghiệp vụ**

- Đếm theo tổ chức và trạng thái
- Không trả nội dung
- BR_005 – Quản trị viên không đọc nội dung người dùng: Quản trị viên không được đọc tài liệu, kết quả đối chiếu, bằng chứng hoặc Case Pack của người dùng; chỉ thấy siêu dữ liệu và số liệu tổng hợp.
- BR_043 – Ngưỡng k-ẩn danh: Chỉ công bố chỉ số tổng hợp khi cỡ mẫu ≥ k (đề xuất k = 20); dữ liệu đóng góp không có định danh.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_STAT | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_124_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Xem thống kê Desk tổng hợp" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi desk_case_status, metric_value, sample_size.
- **REQ_124_02** – Given tình huống "Cỡ mẫu dưới ngưỡng k", When ADM thực hiện "Xem thống kê Desk tổng hợp", Then ẩn số.
- **REQ_124_03** – Given quy tắc BR_005 (Quản trị viên không đọc nội dung người dùng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_124_04** – Given quy tắc BR_043 (Ngưỡng k-ẩn danh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_147 – Kích hoạt tài khoản cán bộ từ lời mời

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_147 |
| Module / Sub-module | MOD_013 / Desk |
| Actor | ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Cán bộ dùng lời mời để đặt mật khẩu và kích hoạt |
| Permission | PER_DESK_ACTIVATE |
| Ưu tiên | P1 |
| Nhãn | [ĐỀ XUẤT] |

**2. Tiền điều kiện**

- Có lời mời còn hạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: member_status, activated_at, user_id
- Trạng thái: INVITED→ACTIVE

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0322 | Email được mời | ORG_MEMBER.invite_email | VARCHAR(120) | Y | — | Email hợp lệ |
| FLD_0324 | Mã băm token mời | ORG_MEMBER.invite_token_hash | CHAR(255) | N | — | — |
| FLD_0004 | Mật khẩu (nhập) | USER.password_plain | VARCHAR(64) | Y | — | 8-64 ký tự, có chữ và số |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0326 | Trạng thái | ORG_MEMBER.member_status | ENUM(8) | Trạng thái cán bộ |
| FLD_0327 | Kích hoạt lúc | ORG_MEMBER.activated_at | TIMESTAMP | Theo giờ UTC |
| FLD_0001 | Mã người dùng | USER.user_id | UUID(36) | Định danh duy nhất |

**6. Luồng chính**

1. SUP mở chức năng "Kích hoạt tài khoản cán bộ từ lời mời".
2. Người dùng cung cấp: Email được mời, Mã băm token mời, Mật khẩu (nhập).
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_DESK_ACTIVATE).
4. So khớp mã băm lời mời.
5. Tạo USER role=SUP gắn org.
6. Đặt ACTIVE.
7. Hệ thống trả kết quả: Trạng thái, Kích hoạt lúc, Mã người dùng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Lời mời hết hạn: yêu cầu Quản trị viên mời lại

**9. Logic nghiệp vụ**

- So khớp mã băm lời mời
- Tạo USER role=SUP gắn org
- Đặt ACTIVE
- BR_021 – Phạm vi dữ liệu của cán bộ: Cán bộ chỉ thấy Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng các phần được chia sẻ.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| invite_email | Email hợp lệ | Giá trị không hợp lệ: Email hợp lệ |
| invite_email | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| password_plain | 8-64 ký tự, có chữ và số | Giá trị không hợp lệ: 8-64 ký tự, có chữ và số |
| password_plain | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| INVITED→ACTIVE |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_DESK_ACTIVATE | ROLE_SUP (Cán bộ hỗ trợ) | Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_147_01** – Given Có lời mời còn hạn, When SUP thực hiện "Kích hoạt tài khoản cán bộ từ lời mời" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi member_status, activated_at, user_id; trạng thái chuyển INVITED→ACTIVE.
- **REQ_147_02** – Given tình huống "Lời mời hết hạn", When SUP thực hiện "Kích hoạt tài khoản cán bộ từ lời mời", Then yêu cầu Quản trị viên mời lại.
- **REQ_147_03** – Given quy tắc BR_021 (Phạm vi dữ liệu của cán bộ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_147_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_148 – Xem các chia sẻ Case Pack đang hoạt động

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_148 |
| Module / Sub-module | MOD_013 / Chia sẻ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem ai đang có quyền xem, đã xem gì |
| Permission | PER_CASE_SHARE |
| Ưu tiên | P1 |
| Nhãn | [ĐỀ XUẤT] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: share_id, org_id, shared_sections, expires_at, share_status, access_action, accessed_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0225 | Mã Case Pack | CASE_SHARE.case_pack_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0224 | Mã chia sẻ | CASE_SHARE.share_id | UUID(36) | Định danh |
| FLD_0226 | Mã tổ chức nhận | CASE_SHARE.org_id | UUID(36) | Tổ chức nhận |
| FLD_0227 | Các phần chia sẻ | CASE_SHARE.shared_sections | JSONB | Phạm vi dữ liệu SUP được xem |
| FLD_0228 | Hết hạn chia sẻ lúc | CASE_SHARE.expires_at | TIMESTAMP | Hết hạn tự đóng |
| FLD_0229 | Trạng thái chia sẻ | CASE_SHARE.share_status | ENUM(8) | Trạng thái |
| FLD_0235 | Hành động | ACCESS_LOG.access_action | ENUM(10) | Loại truy cập |
| FLD_0238 | Truy cập lúc | ACCESS_LOG.accessed_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem các chia sẻ Case Pack đang hoạt động".
2. Người dùng cung cấp: Mã Case Pack.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_SHARE).
4. Liệt kê chia sẻ và nhật ký truy cập của chính người dùng.
5. Hệ thống trả kết quả: Mã chia sẻ, Mã tổ chức nhận, Các phần chia sẻ, Hết hạn chia sẻ lúc, Trạng thái chia sẻ, Hành động, Truy cập lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa chia sẻ: trạng thái rỗng

**9. Logic nghiệp vụ**

- Liệt kê chia sẻ và nhật ký truy cập của chính người dùng
- BR_020 – Ghi nhật ký truy cập: Mỗi lượt cán bộ xem hoặc thao tác trên Case Pack được ghi vào ACCESS_LOG và người dùng xem được.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_SHARE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_148_01** – Given Đã đăng nhập, When WRK thực hiện "Xem các chia sẻ Case Pack đang hoạt động" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi share_id, org_id, shared_sections, expires_at, share_status, access_action, accessed_at.
- **REQ_148_02** – Given tình huống "Chưa chia sẻ", When WRK thực hiện "Xem các chia sẻ Case Pack đang hoạt động", Then trạng thái rỗng.
- **REQ_148_03** – Given quy tắc BR_020 (Ghi nhật ký truy cập), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_148_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_149 – Xem và trả lời đề nghị bổ sung

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_149 |
| Module / Sub-module | MOD_013 / Chia sẻ |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem đề nghị của cán bộ và trả lời hoặc từ chối |
| Permission | PER_CASE_SHARE |
| Ưu tiên | P1 |
| Nhãn | [ĐỀ XUẤT] |

**2. Tiền điều kiện**

- Có INFO_REQUEST OPEN

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: responded_at
- Trạng thái: OPEN→ANSWERED/DECLINED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0343 | Mã đề nghị | INFO_REQUEST.request_id | UUID(36) | Y | — | — |
| FLD_0348 | Trạng thái | INFO_REQUEST.request_status | ENUM(10) | Y | OPEN | ∈{OPEN,ANSWERED,DECLINED,EXPIRED} |
| FLD_0349 | Nội dung trả lời | INFO_REQUEST.response_text | TEXT | N | — | ≤ 2000 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0350 | Trả lời lúc | INFO_REQUEST.responded_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem và trả lời đề nghị bổ sung".
2. Người dùng cung cấp: Mã đề nghị, Trạng thái, Nội dung trả lời.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_CASE_SHARE).
4. Người dùng toàn quyền trả lời hoặc từ chối.
5. Không tự chia sẻ thêm dữ liệu.
6. Hệ thống trả kết quả: Trả lời lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hết hạn: EXPIRED

**9. Logic nghiệp vụ**

- Người dùng toàn quyền trả lời hoặc từ chối
- Không tự chia sẻ thêm dữ liệu
- BR_023 – Đề nghị bổ sung thông tin: Cán bộ gửi đề nghị qua ứng dụng; người dùng toàn quyền trả lời, từ chối hoặc bỏ qua; chưa trả lời thì không có dữ liệu mới.
- BR_018 – Chia sẻ Case Pack có chọn lọc: Chỉ chia sẻ các phần người dùng chọn, cho một tổ chức nhận, với thời hạn hết hạn bắt buộc.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| request_status | ∈{OPEN,ANSWERED,DECLINED,EXPIRED} | Giá trị không hợp lệ: ∈{OPEN,ANSWERED,DECLINED,EXPIRED} |
| response_text | ≤ 2000 ký tự | Giá trị không hợp lệ: ≤ 2000 ký tự |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| OPEN→ANSWERED/DECLINED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_CASE_SHARE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_149_01** – Given Có INFO_REQUEST OPEN, When WRK thực hiện "Xem và trả lời đề nghị bổ sung" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi responded_at; trạng thái chuyển OPEN→ANSWERED/DECLINED.
- **REQ_149_02** – Given tình huống "Hết hạn", When WRK thực hiện "Xem và trả lời đề nghị bổ sung", Then EXPIRED.
- **REQ_149_03** – Given quy tắc BR_023 (Đề nghị bổ sung thông tin), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_149_04** – Given quy tắc BR_018 (Chia sẻ Case Pack có chọn lọc), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_014 – Quản trị & vận hành

### FUN_125 – Quản lý tổ chức hỗ trợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_125 |
| Module / Sub-module | MOD_014 / Tổ chức |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Tạo, sửa, tạm ngưng tổ chức hỗ trợ và danh bạ |
| Permission | PER_ADM_ORG |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: org_id
- Trạng thái: ACTIVE↔SUSPENDED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0305 | Tên tổ chức | SUPPORT_ORG.org_name | VARCHAR(150) | Y | — | 1-150 ký tự |
| FLD_0306 | Loại tổ chức | SUPPORT_ORG.org_type | ENUM(14) | Y | — | ∈{NGO,UNION,GOV_COUNSEL,OTHER} [CẦN XÁC NHẬN danh sách loại] |
| FLD_0307 | Quốc gia | SUPPORT_ORG.org_country_code | ENUM(2) | Y | — | ∈{JP,VN} |
| FLD_0308 | Ngôn ngữ hỗ trợ | SUPPORT_ORG.supported_languages | VARCHAR(60) | Y | — | Danh sách mã ngôn ngữ |
| FLD_0309 | Điện thoại liên hệ | SUPPORT_ORG.contact_phone | VARCHAR(30) | N | — | Số điện thoại hợp lệ |
| FLD_0310 | Email liên hệ | SUPPORT_ORG.contact_email | VARCHAR(120) | N | — | Email hợp lệ |
| FLD_0311 | Trang web | SUPPORT_ORG.website_url | VARCHAR(300) | N | — | URL hợp lệ |
| FLD_0312 | Địa chỉ | SUPPORT_ORG.org_address | VARCHAR(250) | N | — | — |
| FLD_0313 | Hiện trong danh bạ | SUPPORT_ORG.is_public_listed | BOOLEAN | Y | true | — |
| FLD_0314 | Nhận Case Pack | SUPPORT_ORG.accepts_case_pack | BOOLEAN | Y | false | — |
| FLD_0315 | Trạng thái | SUPPORT_ORG.org_status | ENUM(10) | Y | ACTIVE | ∈{ACTIVE,SUSPENDED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0304 | Mã tổ chức | SUPPORT_ORG.org_id | UUID(36) | Định danh |

**6. Luồng chính**

1. ADM mở chức năng "Quản lý tổ chức hỗ trợ".
2. Người dùng cung cấp: Tên tổ chức, Loại tổ chức, Quốc gia, Ngôn ngữ hỗ trợ, Điện thoại liên hệ, Email liên hệ, Trang web, Địa chỉ, Hiện trong danh bạ, Nhận Case Pack, Trạng thái.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_ORG).
4. Kiểm tra tên không trùng.
5. Lưu.
6. Tạm ngưng thì chia sẻ mới bị chặn, chia sẻ đang có giữ nguyên đến hết hạn.
7. Ghi nhật ký.
8. Hệ thống trả kết quả: Mã tổ chức.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tên trùng: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra tên không trùng
- Lưu
- Tạm ngưng thì chia sẻ mới bị chặn, chia sẻ đang có giữ nguyên đến hết hạn
- Ghi nhật ký
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| org_name | 1-150 ký tự | Giá trị không hợp lệ: 1-150 ký tự |
| org_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| org_type | ∈{NGO,UNION,GOV_COUNSEL,OTHER} [CẦN XÁC NHẬN danh sách loại] | Giá trị không hợp lệ: ∈{NGO,UNION,GOV_COUNSEL,OTHER} [CẦN XÁC NHẬN danh sách loại] |
| org_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| org_country_code | ∈{JP,VN} | Giá trị không hợp lệ: ∈{JP,VN} |
| org_country_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| supported_languages | Danh sách mã ngôn ngữ | Giá trị không hợp lệ: Danh sách mã ngôn ngữ |
| supported_languages | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| contact_phone | Số điện thoại hợp lệ | Giá trị không hợp lệ: Số điện thoại hợp lệ |
| contact_email | Email hợp lệ | Giá trị không hợp lệ: Email hợp lệ |
| website_url | URL hợp lệ | Giá trị không hợp lệ: URL hợp lệ |
| org_status | ∈{ACTIVE,SUSPENDED} | Giá trị không hợp lệ: ∈{ACTIVE,SUSPENDED} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE↔SUSPENDED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_ORG | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_125_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Quản lý tổ chức hỗ trợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi org_id; trạng thái chuyển ACTIVE↔SUSPENDED.
- **REQ_125_02** – Given tình huống "Tên trùng", When ADM thực hiện "Quản lý tổ chức hỗ trợ", Then từ chối.
- **REQ_125_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_126 – Mời cán bộ hỗ trợ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_126 |
| Module / Sub-module | MOD_014 / Tổ chức |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Gửi lời mời kích hoạt tài khoản cán bộ |
| Permission | PER_ADM_ORG |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Tổ chức ACTIVE

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: member_id, invite_expires_at, member_status
- Trạng thái: (chưa có)→INVITED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0320 | Mã tổ chức | ORG_MEMBER.org_id | UUID(36) | Y | — | — |
| FLD_0322 | Email được mời | ORG_MEMBER.invite_email | VARCHAR(120) | Y | — | Email hợp lệ |
| FLD_0323 | Tên cán bộ | ORG_MEMBER.member_display_name | VARCHAR(60) | Y | — | 1-60 ký tự |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0319 | Mã thành viên | ORG_MEMBER.member_id | UUID(36) | Định danh |
| FLD_0325 | Lời mời hết hạn | ORG_MEMBER.invite_expires_at | TIMESTAMP | Hạn kích hoạt |
| FLD_0326 | Trạng thái | ORG_MEMBER.member_status | ENUM(8) | Trạng thái cán bộ |

**6. Luồng chính**

1. ADM mở chức năng "Mời cán bộ hỗ trợ".
2. Người dùng cung cấp: Mã tổ chức, Email được mời, Tên cán bộ.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_ORG).
4. Sinh mã mời.
5. Lưu mã băm.
6. Gửi email.
7. Đặt INVITED.
8. Hệ thống trả kết quả: Mã thành viên, Lời mời hết hạn, Trạng thái.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Email đã được mời: gửi lại

**9. Logic nghiệp vụ**

- Sinh mã mời
- Lưu mã băm
- Gửi email
- Đặt INVITED
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| invite_email | Email hợp lệ | Giá trị không hợp lệ: Email hợp lệ |
| invite_email | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| member_display_name | 1-60 ký tự | Giá trị không hợp lệ: 1-60 ký tự |
| member_display_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| (chưa có)→INVITED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_ORG | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_126_01** – Given Tổ chức ACTIVE, When ADM thực hiện "Mời cán bộ hỗ trợ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi member_id, invite_expires_at, member_status; trạng thái chuyển (chưa có)→INVITED.
- **REQ_126_02** – Given tình huống "Email đã được mời", When ADM thực hiện "Mời cán bộ hỗ trợ", Then gửi lại.
- **REQ_126_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_127 – Quản lý Quản trị viên

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_127 |
| Module / Sub-module | MOD_014 / Quản trị viên |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Mời, khóa, thu hồi quyền Quản trị viên khác |
| Permission | PER_ADM_USER |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: user_id, role_code
- Trạng thái: ACTIVE→LOCKED
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0002 | Định danh đăng nhập | USER.login_identifier | VARCHAR(120) | Y | — | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| FLD_0007 | Trạng thái tài khoản | USER.account_status | ENUM(12) | Y | ACTIVE | ∈{ACTIVE,LOCKED,PENDING,DELETED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0001 | Mã người dùng | USER.user_id | UUID(36) | Định danh duy nhất |
| FLD_0006 | Mã vai trò | USER.role_code | ENUM(10) | Vai trò của tài khoản |

**6. Luồng chính**

1. ADM mở chức năng "Quản lý Quản trị viên".
2. Người dùng cung cấp: Định danh đăng nhập, Trạng thái tài khoản.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_USER).
4. Kiểm tra không tự thao tác trên chính mình.
5. Kiểm tra còn ít nhất 2 Quản trị viên sau thao tác.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Mã người dùng, Mã vai trò.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thao tác làm còn dưới 2 Quản trị viên: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra không tự thao tác trên chính mình
- Kiểm tra còn ít nhất 2 Quản trị viên sau thao tác
- Ghi nhật ký
- BR_002 – Tối thiểu hai Quản trị viên: Hệ thống luôn có ít nhất 2 Quản trị viên đang hoạt động; không được thu hồi hoặc khóa Quản trị viên cuối cùng.
- BR_003 – Không tự cấp, tự thu hồi quyền: Quản trị viên không được tự tạo hoặc tự thu hồi quyền của chính mình.
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| login_identifier | Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] | Giá trị không hợp lệ: Email hoặc số điện thoại hợp lệ [CẦN XÁC NHẬN loại định danh] |
| login_identifier | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| account_status | ∈{ACTIVE,LOCKED,PENDING,DELETED} | Giá trị không hợp lệ: ∈{ACTIVE,LOCKED,PENDING,DELETED} |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→LOCKED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_USER | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_127_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Quản lý Quản trị viên" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi user_id, role_code; trạng thái chuyển ACTIVE→LOCKED.
- **REQ_127_02** – Given tình huống "Thao tác làm còn dưới 2 Quản trị viên", When ADM thực hiện "Quản lý Quản trị viên", Then từ chối.
- **REQ_127_03** – Given quy tắc BR_002 (Tối thiểu hai Quản trị viên), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_127_04** – Given quy tắc BR_003 (Không tự cấp, tự thu hồi quyền), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_127_05** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_128 – Xem nhật ký kiểm toán

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_128 |
| Module / Sub-module | MOD_014 / Giám sát |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Tra cứu nhật ký thao tác quản trị |
| Permission | PER_ADM_AUDIT |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: audit_id, actor_user_id, target_entity, audit_result, detail_json
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0486 | Loại tác nhân | AUDIT_LOG.actor_type | ENUM(8) | Y | — | ∈{USER,ADMIN,SYSTEM,AGENT} |
| FLD_0487 | Mã hành động | AUDIT_LOG.action_code | VARCHAR(40) | Y | — | — |
| FLD_0493 | Xảy ra lúc | AUDIT_LOG.occurred_at | TIMESTAMP | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0484 | Mã nhật ký | AUDIT_LOG.audit_id | UUID(36) | Định danh |
| FLD_0485 | Người thao tác | AUDIT_LOG.actor_user_id | UUID(36) | Rỗng khi tác nhân là hệ thống |
| FLD_0488 | Đối tượng bị tác động | AUDIT_LOG.target_entity | VARCHAR(30) | Tên đối tượng |
| FLD_0490 | Kết quả | AUDIT_LOG.audit_result | ENUM(8) | Kết quả thao tác |
| FLD_0491 | Chi tiết | AUDIT_LOG.detail_json | JSONB | Không chứa nội dung tài liệu người dùng |

**6. Luồng chính**

1. ADM mở chức năng "Xem nhật ký kiểm toán".
2. Người dùng cung cấp: Loại tác nhân, Mã hành động, Xảy ra lúc.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_AUDIT).
4. Lọc theo điều kiện.
5. Chỉ đọc.
6. Không có thao tác sửa, xóa.
7. Hệ thống trả kết quả: Mã nhật ký, Người thao tác, Đối tượng bị tác động, Kết quả, Chi tiết.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có kết quả: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo điều kiện
- Chỉ đọc
- Không có thao tác sửa, xóa
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_005 – Quản trị viên không đọc nội dung người dùng: Quản trị viên không được đọc tài liệu, kết quả đối chiếu, bằng chứng hoặc Case Pack của người dùng; chỉ thấy siêu dữ liệu và số liệu tổng hợp.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| actor_type | ∈{USER,ADMIN,SYSTEM,AGENT} | Giá trị không hợp lệ: ∈{USER,ADMIN,SYSTEM,AGENT} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_AUDIT | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_128_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Xem nhật ký kiểm toán" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi audit_id, actor_user_id, target_entity, audit_result, detail_json.
- **REQ_128_02** – Given tình huống "Không có kết quả", When ADM thực hiện "Xem nhật ký kiểm toán", Then trạng thái rỗng.
- **REQ_128_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_128_04** – Given quy tắc BR_005 (Quản trị viên không đọc nội dung người dùng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_129 – Cấu hình nhà cung cấp

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_129 |
| Module / Sub-module | MOD_014 / Cấu hình |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Thiết lập OCR, LLM, thông báo, thanh toán và phương án dự phòng |
| Permission | PER_ADM_PROVIDER |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: provider_id
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0495 | Loại dịch vụ | PROVIDER_CONFIG.provider_type | ENUM(8) | Y | — | ∈{LLM,OCR,PUSH,PAYMENT} |
| FLD_0496 | Tên nhà cung cấp | PROVIDER_CONFIG.provider_name | VARCHAR(80) | Y | — | 1-80 ký tự |
| FLD_0497 | Hình thức triển khai | PROVIDER_CONFIG.deployment_mode | ENUM(10) | Y | — | ∈{SELF_HOST,EXTERNAL} |
| FLD_0498 | Tham chiếu điểm kết nối | PROVIDER_CONFIG.endpoint_ref | VARCHAR(200) | Y | — | Tham chiếu kho bí mật, không chứa khóa gốc |
| FLD_0499 | Thứ tự ưu tiên | PROVIDER_CONFIG.priority_order | INTEGER | Y | 1 | ≥1 |
| FLD_0500 | Đang bật | PROVIDER_CONFIG.is_enabled | BOOLEAN | Y | true | — |
| FLD_0501 | Nhà cung cấp dự phòng | PROVIDER_CONFIG.fallback_provider_id | UUID(36) | N | — | Cùng loại dịch vụ; không tự tham chiếu |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0494 | Mã nhà cung cấp | PROVIDER_CONFIG.provider_id | UUID(36) | Định danh |

**6. Luồng chính**

1. ADM mở chức năng "Cấu hình nhà cung cấp".
2. Người dùng cung cấp: Loại dịch vụ, Tên nhà cung cấp, Hình thức triển khai, Tham chiếu điểm kết nối, Thứ tự ưu tiên, Đang bật, Nhà cung cấp dự phòng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_PROVIDER).
4. Kiểm tra dự phòng cùng loại.
5. Bảo đảm luôn có một nhà cung cấp tự host cho OCR và LLM.
6. Lưu.
7. Ghi nhật ký.
8. Hệ thống trả kết quả: Mã nhà cung cấp.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Tắt nhà cung cấp cuối cùng của một loại: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra dự phòng cùng loại
- Bảo đảm luôn có một nhà cung cấp tự host cho OCR và LLM
- Lưu
- Ghi nhật ký
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_038 – LLM ngoài chỉ khi được đồng ý: Chỉ gửi dữ liệu cho dịch vụ LLM bên ngoài khi người dùng đã đồng ý EXTERNAL_LLM; nếu không dùng mẫu văn bản hoặc mô hình tự host.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| provider_type | ∈{LLM,OCR,PUSH,PAYMENT} | Giá trị không hợp lệ: ∈{LLM,OCR,PUSH,PAYMENT} |
| provider_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| provider_name | 1-80 ký tự | Giá trị không hợp lệ: 1-80 ký tự |
| provider_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| deployment_mode | ∈{SELF_HOST,EXTERNAL} | Giá trị không hợp lệ: ∈{SELF_HOST,EXTERNAL} |
| deployment_mode | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| endpoint_ref | Tham chiếu kho bí mật, không chứa khóa gốc | Giá trị không hợp lệ: Tham chiếu kho bí mật, không chứa khóa gốc |
| endpoint_ref | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| priority_order | ≥1 | Giá trị không hợp lệ: ≥1 |
| fallback_provider_id | Cùng loại dịch vụ; không tự tham chiếu | Giá trị không hợp lệ: Cùng loại dịch vụ; không tự tham chiếu |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_PROVIDER | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_129_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Cấu hình nhà cung cấp" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi provider_id.
- **REQ_129_02** – Given tình huống "Tắt nhà cung cấp cuối cùng của một loại", When ADM thực hiện "Cấu hình nhà cung cấp", Then từ chối.
- **REQ_129_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_129_04** – Given quy tắc BR_038 (LLM ngoài chỉ khi được đồng ý), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_130 – Cấu hình tham số hệ thống và gói dịch vụ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_130 |
| Module / Sub-module | MOD_014 / Cấu hình |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Chỉnh ngưỡng từ chối, hạn mức LLM, giới hạn tải tệp, thời hạn chia sẻ và thông số gói Free/Pro |
| Permission | PER_ADM_CONFIG |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_by, updated_at
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0504 | Khóa tham số | SYSTEM_CONFIG.config_key | VARCHAR(60) | Y | — | Chữ hoa, số, gạch dưới |
| FLD_0505 | Nhóm tham số | SYSTEM_CONFIG.config_group | ENUM(16) | Y | — | ∈{LLM_QUOTA,ABSTAIN,OCR,SHARING,SECURITY,OTHER} |
| FLD_0506 | Giá trị | SYSTEM_CONFIG.config_value | VARCHAR(500) | Y | — | Đúng kiểu theo value_type |
| FLD_0507 | Kiểu giá trị | SYSTEM_CONFIG.value_type | ENUM(8) | Y | — | ∈{INT,DECIMAL,STRING,BOOL} |
| FLD_0508 | Mô tả | SYSTEM_CONFIG.config_description | VARCHAR(300) | N | — | — |
| FLD_0517 | Mã gói | PLAN.plan_code | VARCHAR(10) | Y | — | ∈{FREE,PRO} |
| FLD_0518 | Tên gói | PLAN.plan_name | VARCHAR(40) | Y | — | — |
| FLD_0519 | Giá mỗi tháng | PLAN.monthly_price_amount | DECIMAL(10,2) | Y | 0 | ≥0 |
| FLD_0520 | Tiền tệ | PLAN.price_currency_code | ENUM(3) | Y | JPY | ∈{JPY} |
| FLD_0521 | Hạn mức LLM mỗi tháng | PLAN.llm_monthly_quota | INTEGER | Y | — | ≥0 |
| FLD_0522 | Trạng thái | PLAN.plan_status | ENUM(8) | Y | ACTIVE | ∈{ACTIVE,RETIRED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0509 | Người cập nhật | SYSTEM_CONFIG.updated_by | UUID(36) | Quản trị viên |
| FLD_0510 | Cập nhật lúc | SYSTEM_CONFIG.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Cấu hình tham số hệ thống và gói dịch vụ".
2. Người dùng cung cấp: Khóa tham số, Nhóm tham số, Giá trị, Kiểu giá trị, Mô tả, Mã gói, Tên gói, Giá mỗi tháng, Tiền tệ, Hạn mức LLM mỗi tháng, Trạng thái.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_CONFIG).
4. Kiểm tra kiểu giá trị và khoảng cho phép.
5. Lưu.
6. Ghi nhật ký.
7. Hệ thống trả kết quả: Người cập nhật, Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giá trị sai kiểu: từ chối

**9. Logic nghiệp vụ**

- Kiểm tra kiểu giá trị và khoảng cho phép
- Lưu
- Ghi nhật ký
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_029 – Ngưỡng từ chối: Khi độ tin cậy thấp hơn ngưỡng cấu hình, hệ thống nêu rõ không chắc chắn thay vì trả lời.
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.
- BR_040 – Giới hạn tải tệp: Chỉ nhận JPG, PNG, HEIC, PDF, kích thước ≤ giới hạn cấu hình (đề xuất 10 MB), kiểm tra loại theo nội dung và quét mã độc.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| config_key | Chữ hoa, số, gạch dưới | Giá trị không hợp lệ: Chữ hoa, số, gạch dưới |
| config_key | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| config_group | ∈{LLM_QUOTA,ABSTAIN,OCR,SHARING,SECURITY,OTHER} | Giá trị không hợp lệ: ∈{LLM_QUOTA,ABSTAIN,OCR,SHARING,SECURITY,OTHER} |
| config_group | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| config_value | Đúng kiểu theo value_type | Giá trị không hợp lệ: Đúng kiểu theo value_type |
| config_value | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| value_type | ∈{INT,DECIMAL,STRING,BOOL} | Giá trị không hợp lệ: ∈{INT,DECIMAL,STRING,BOOL} |
| value_type | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| plan_code | ∈{FREE,PRO} | Giá trị không hợp lệ: ∈{FREE,PRO} |
| plan_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| plan_name | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| monthly_price_amount | ≥0 | Giá trị không hợp lệ: ≥0 |
| price_currency_code | ∈{JPY} | Giá trị không hợp lệ: ∈{JPY} |
| llm_monthly_quota | ≥0 | Giá trị không hợp lệ: ≥0 |
| llm_monthly_quota | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| plan_status | ∈{ACTIVE,RETIRED} | Giá trị không hợp lệ: ∈{ACTIVE,RETIRED} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_CONFIG | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_130_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Cấu hình tham số hệ thống và gói dịch vụ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_by, updated_at.
- **REQ_130_02** – Given tình huống "Giá trị sai kiểu", When ADM thực hiện "Cấu hình tham số hệ thống và gói dịch vụ", Then từ chối.
- **REQ_130_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_130_04** – Given quy tắc BR_029 (Ngưỡng từ chối), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_130_05** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_131 – Cấu hình chính sách lưu trữ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_131 |
| Module / Sub-module | MOD_014 / Cấu hình |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Đặt thời gian lưu và cách xử lý khi hết hạn |
| Permission | PER_ADM_RETENTION |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at
- Thao tác được ghi vào AUDIT_LOG

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0512 | Nhóm dữ liệu | RETENTION_POLICY.data_class | ENUM(14) | Y | — | ∈{AUDIT_LOG,ACCESS_LOG,SESSION,SYNC_BACKUP,NOTIFICATION,DELETED_ACCOUNT} |
| FLD_0513 | Số ngày lưu | RETENTION_POLICY.retention_days | INTEGER | Y | — | ≥1 [CẦN XÁC NHẬN giá trị] |
| FLD_0514 | Xử lý khi hết hạn | RETENTION_POLICY.expiry_action | ENUM(10) | Y | DELETE | ∈{DELETE,ANONYMIZE} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0516 | Cập nhật lúc | RETENTION_POLICY.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. ADM mở chức năng "Cấu hình chính sách lưu trữ".
2. Người dùng cung cấp: Nhóm dữ liệu, Số ngày lưu, Xử lý khi hết hạn.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_RETENTION).
4. Lưu.
5. Tác vụ nền áp dụng.
6. Nhật ký kiểm toán không được rút ngắn dưới mức tối thiểu.
7. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Dưới mức tối thiểu: từ chối

**9. Logic nghiệp vụ**

- Lưu
- Tác vụ nền áp dụng
- Nhật ký kiểm toán không được rút ngắn dưới mức tối thiểu
- BR_004 – Nhật ký kiểm toán bất biến: Mọi thao tác quản trị được ghi vào AUDIT_LOG; Quản trị viên không có chức năng sửa hoặc xóa nhật ký.
- BR_035 – Xóa tài khoản: Xóa tài khoản xóa dữ liệu người dùng và thu hồi mọi chia sẻ; nhật ký kiểm toán giữ theo chính sách lưu trữ.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| data_class | ∈{AUDIT_LOG,ACCESS_LOG,SESSION,SYNC_BACKUP,NOTIFICATION,DELETED_ACCOUNT} | Giá trị không hợp lệ: ∈{AUDIT_LOG,ACCESS_LOG,SESSION,SYNC_BACKUP,NOTIFICATION,DELETED_ACCOUNT} |
| data_class | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| retention_days | ≥1 [CẦN XÁC NHẬN giá trị] | Giá trị không hợp lệ: ≥1 [CẦN XÁC NHẬN giá trị] |
| retention_days | bắt buộc | Giá trị không hợp lệ: bắt buộc |
| expiry_action | ∈{DELETE,ANONYMIZE} | Giá trị không hợp lệ: ∈{DELETE,ANONYMIZE} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_RETENTION | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_131_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Cấu hình chính sách lưu trữ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_131_02** – Given tình huống "Dưới mức tối thiểu", When ADM thực hiện "Cấu hình chính sách lưu trữ", Then từ chối.
- **REQ_131_03** – Given quy tắc BR_004 (Nhật ký kiểm toán bất biến), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_131_04** – Given quy tắc BR_035 (Xóa tài khoản), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_132 – Giám sát vận hành

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_132 |
| Module / Sub-module | MOD_014 / Giám sát |
| Actor | ROLE_ADM (Quản trị viên) |
| Mô tả | Xem tình trạng dịch vụ và hàng đợi, không thấy nội dung người dùng |
| Permission | PER_ADM_MONITOR |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đăng nhập Quản trị viên

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: is_enabled, metric_code, metric_value

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0494 | Mã nhà cung cấp | PROVIDER_CONFIG.provider_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0500 | Đang bật | PROVIDER_CONFIG.is_enabled | BOOLEAN | Bật tắt nhà cung cấp |
| FLD_0544 | Mã chỉ số | AGG_STAT.metric_code | VARCHAR(40) | Ví dụ tỷ lệ kỳ lương lệch |
| FLD_0545 | Giá trị | AGG_STAT.metric_value | DECIMAL(14,4) | Giá trị tổng hợp |

**6. Luồng chính**

1. ADM mở chức năng "Giám sát vận hành".
2. Người dùng cung cấp: Mã nhà cung cấp.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ADM_MONITOR).
4. Tổng hợp số liệu kỹ thuật.
5. Hệ thống trả kết quả: Đang bật, Mã chỉ số, Giá trị.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Nhà cung cấp lỗi: hiển thị cảnh báo

**9. Logic nghiệp vụ**

- Tổng hợp số liệu kỹ thuật
- BR_005 – Quản trị viên không đọc nội dung người dùng: Quản trị viên không được đọc tài liệu, kết quả đối chiếu, bằng chứng hoặc Case Pack của người dùng; chỉ thấy siêu dữ liệu và số liệu tổng hợp.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ADM_MONITOR | ROLE_ADM (Quản trị viên) | Siêu dữ liệu, tổ chức, Law Pack, cấu hình, nhật ký; không đọc nội dung người dùng (BR_005) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_132_01** – Given Đăng nhập Quản trị viên, When ADM thực hiện "Giám sát vận hành" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi is_enabled, metric_code, metric_value.
- **REQ_132_02** – Given tình huống "Nhà cung cấp lỗi", When ADM thực hiện "Giám sát vận hành", Then hiển thị cảnh báo.
- **REQ_132_03** – Given quy tắc BR_005 (Quản trị viên không đọc nội dung người dùng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_015 – Thông báo & nhắc việc

### FUN_133 – Cấu hình nhắc việc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_133 |
| Module / Sub-module | MOD_015 / Nhắc việc |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Bật, tắt và chọn giờ nhắc |
| Permission | PER_NOT_SETTING |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: updated_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0474 | Nhắc ghi giờ | REMINDER_SETTING.log_reminder_enabled | BOOLEAN | Y | true | — |
| FLD_0475 | Giờ nhắc ghi giờ | REMINDER_SETTING.log_reminder_time | TIME | N | 20:00 | HH:mm |
| FLD_0476 | Nhắc ngày lương | REMINDER_SETTING.payday_reminder_enabled | BOOLEAN | Y | true | — |
| FLD_0477 | Nhắc sau ngày lương (ngày) | REMINDER_SETTING.payday_offset_days | INTEGER | Y | 1 | 0-10 |
| FLD_0478 | Nhắc chia sẻ sắp hết hạn | REMINDER_SETTING.share_expiry_reminder_enabled | BOOLEAN | Y | true | — |
| FLD_0479 | Báo thay đổi luật liên quan | REMINDER_SETTING.law_change_alert_enabled | BOOLEAN | Y | true | — |
| FLD_0480 | Giờ yên lặng từ | REMINDER_SETTING.quiet_hours_from | TIME | N | 22:00 | HH:mm |
| FLD_0481 | Giờ yên lặng đến | REMINDER_SETTING.quiet_hours_to | TIME | N | 07:00 | HH:mm |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0483 | Cập nhật lúc | REMINDER_SETTING.updated_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Cấu hình nhắc việc".
2. Người dùng cung cấp: Nhắc ghi giờ, Giờ nhắc ghi giờ, Nhắc ngày lương, Nhắc sau ngày lương (ngày), Nhắc chia sẻ sắp hết hạn, Báo thay đổi luật liên quan, Giờ yên lặng từ, Giờ yên lặng đến.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_NOT_SETTING).
4. Lưu.
5. Lập lại lịch nhắc.
6. Hệ thống trả kết quả: Cập nhật lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Giờ không hợp lệ: từ chối

**9. Logic nghiệp vụ**

- Lưu
- Lập lại lịch nhắc
- BR_041 – Giờ yên lặng: Không gửi thông báo đẩy trong giờ yên lặng của người dùng; thông báo dời đến hết giờ yên lặng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| log_reminder_time | HH:mm | Giá trị không hợp lệ: HH:mm |
| payday_offset_days | 0-10 | Giá trị không hợp lệ: 0-10 |
| quiet_hours_from | HH:mm | Giá trị không hợp lệ: HH:mm |
| quiet_hours_to | HH:mm | Giá trị không hợp lệ: HH:mm |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_NOT_SETTING | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_133_01** – Given Đã đăng nhập, When WRK thực hiện "Cấu hình nhắc việc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi updated_at.
- **REQ_133_02** – Given tình huống "Giờ không hợp lệ", When WRK thực hiện "Cấu hình nhắc việc", Then từ chối.
- **REQ_133_03** – Given quy tắc BR_041 (Giờ yên lặng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_134 – Xem thông báo

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_134 |
| Module / Sub-module | MOD_015 / Thông báo |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Xem danh sách thông báo |
| Permission | PER_NOT_VIEW |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: notification_id, notification_type, notification_title, notification_body, sent_at

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0469 | Trạng thái gửi | NOTIFICATION.delivery_status | ENUM(10) | Y | SCHEDULED | ∈{SCHEDULED,SENT,READ,FAILED,CANCELLED} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0462 | Mã thông báo | NOTIFICATION.notification_id | UUID(36) | Định danh |
| FLD_0464 | Loại thông báo | NOTIFICATION.notification_type | ENUM(18) | Phân loại |
| FLD_0465 | Tiêu đề | NOTIFICATION.notification_title | VARCHAR(120) | Tiêu đề (trung tính nếu bật kín đáo) |
| FLD_0466 | Nội dung | NOTIFICATION.notification_body | VARCHAR(500) | Nội dung (ẩn chi tiết nếu bật kín đáo) |
| FLD_0471 | Gửi lúc | NOTIFICATION.sent_at | TIMESTAMP | Theo giờ UTC |

**6. Luồng chính**

1. WRK mở chức năng "Xem thông báo".
2. Người dùng cung cấp: Trạng thái gửi.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_NOT_VIEW).
4. Lọc theo người nhận.
5. Áp dụng chế độ kín đáo.
6. Hệ thống trả kết quả: Mã thông báo, Loại thông báo, Tiêu đề, Nội dung, Gửi lúc.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Không có thông báo: trạng thái rỗng

**9. Logic nghiệp vụ**

- Lọc theo người nhận
- Áp dụng chế độ kín đáo
- BR_033 – Chế độ kín đáo: Khi bật, tên và biểu tượng ứng dụng, nội dung thông báo được thay bằng nội dung trung tính.
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| delivery_status | ∈{SCHEDULED,SENT,READ,FAILED,CANCELLED} | Giá trị không hợp lệ: ∈{SCHEDULED,SENT,READ,FAILED,CANCELLED} |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_NOT_VIEW | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_134_01** – Given Đã đăng nhập, When WRK thực hiện "Xem thông báo" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi notification_id, notification_type, notification_title, notification_body, sent_at.
- **REQ_134_02** – Given tình huống "Không có thông báo", When WRK thực hiện "Xem thông báo", Then trạng thái rỗng.
- **REQ_134_03** – Given quy tắc BR_033 (Chế độ kín đáo), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_134_04** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_135 – Đánh dấu đã đọc

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_135 |
| Module / Sub-module | MOD_015 / Thông báo |
| Actor | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) |
| Mô tả | Đánh dấu thông báo đã đọc |
| Permission | PER_NOT_VIEW |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Thông báo thuộc người nhận

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: read_at, delivery_status
- Trạng thái: SENT→READ

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0462 | Mã thông báo | NOTIFICATION.notification_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0472 | Đọc lúc | NOTIFICATION.read_at | TIMESTAMP | Theo giờ UTC |
| FLD_0469 | Trạng thái gửi | NOTIFICATION.delivery_status | ENUM(10) | Tiến độ |

**6. Luồng chính**

1. WRK mở chức năng "Đánh dấu đã đọc".
2. Người dùng cung cấp: Mã thông báo.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_NOT_VIEW).
4. Đặt READ.
5. Hệ thống trả kết quả: Đọc lúc, Trạng thái gửi.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thông báo đã bị hủy: bỏ qua

**9. Logic nghiệp vụ**

- Đặt READ
- BR_017 – Quyền sở hữu dữ liệu ở phía máy chủ: Mọi truy vấn dữ liệu người lao động kiểm tra chủ sở hữu ở phía máy chủ, không dựa vào giao diện.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| SENT→READ |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_NOT_VIEW | ROLE_WRK (Người lao động) / ROLE_SUP (Cán bộ hỗ trợ) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017); Chỉ Case Pack được chia sẻ cho tổ chức của mình, còn hạn, đúng phần được chia sẻ (BR_021) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_135_01** – Given Thông báo thuộc người nhận, When WRK thực hiện "Đánh dấu đã đọc" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi read_at, delivery_status; trạng thái chuyển SENT→READ.
- **REQ_135_02** – Given tình huống "Thông báo đã bị hủy", When WRK thực hiện "Đánh dấu đã đọc", Then bỏ qua.
- **REQ_135_03** – Given quy tắc BR_017 (Quyền sở hữu dữ liệu ở phía máy chủ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_136 – Gửi thông báo theo lịch

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_136 |
| Module / Sub-module | MOD_015 / Gửi |
| Actor | SYS_SCHED (Bộ lập lịch) |
| Mô tả | Gửi nhắc ghi giờ, nhắc ngày lương, nhắc chia sẻ sắp hết hạn |
| Permission | PER_SYS_NOTIFY |
| Ưu tiên | P1 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có thông báo SCHEDULED đến hạn

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: sent_at, delivery_status
- Trạng thái: SCHEDULED→SENT/FAILED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0470 | Hẹn gửi lúc | NOTIFICATION.scheduled_at | TIMESTAMP | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0471 | Gửi lúc | NOTIFICATION.sent_at | TIMESTAMP | Theo giờ UTC |
| FLD_0469 | Trạng thái gửi | NOTIFICATION.delivery_status | ENUM(10) | Tiến độ |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_NOTIFY).
3. Kiểm tra giờ yên lặng, dời nếu cần.
4. Kiểm tra chế độ kín đáo.
5. Gửi qua kênh.
6. Ghi trạng thái.
7. Hệ thống trả kết quả: Gửi lúc, Trạng thái gửi.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Nhà cung cấp lỗi: thử lại rồi chuyển thông báo trong ứng dụng

**9. Logic nghiệp vụ**

- Kiểm tra giờ yên lặng, dời nếu cần
- Kiểm tra chế độ kín đáo
- Gửi qua kênh
- Ghi trạng thái
- BR_041 – Giờ yên lặng: Không gửi thông báo đẩy trong giờ yên lặng của người dùng; thông báo dời đến hết giờ yên lặng.
- BR_033 – Chế độ kín đáo: Khi bật, tên và biểu tượng ứng dụng, nội dung thông báo được thay bằng nội dung trung tính.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| SCHEDULED→SENT/FAILED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_NOTIFY | SYS_SCHED (Bộ lập lịch) | Chỉ siêu dữ liệu cần để lập lịch; không đọc nội dung tài liệu |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_136_01** – Given Có thông báo SCHEDULED đến hạn, When SYS_SCHED thực hiện "Gửi thông báo theo lịch" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi sent_at, delivery_status; trạng thái chuyển SCHEDULED→SENT/FAILED.
- **REQ_136_02** – Given tình huống "Nhà cung cấp lỗi", When SYS_SCHED thực hiện "Gửi thông báo theo lịch", Then thử lại rồi chuyển thông báo trong ứng dụng.
- **REQ_136_03** – Given quy tắc BR_041 (Giờ yên lặng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_136_04** – Given quy tắc BR_033 (Chế độ kín đáo), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_137 – Báo thay đổi luật liên quan

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_137 |
| Module / Sub-module | MOD_015 / Gửi |
| Actor | SYS_SCHED (Bộ lập lịch) |
| Mô tả | Báo người dùng khi Law Pack mới ảnh hưởng quy tắc họ dùng |
| Permission | PER_SYS_NOTIFY |
| Ưu tiên | P2 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Có phiên bản mới phát hành

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: notification_id, notification_type

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0284 | Mã phiên bản | LAW_PACK_VERSION.pack_version_id | UUID(36) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0462 | Mã thông báo | NOTIFICATION.notification_id | UUID(36) | Định danh |
| FLD_0464 | Loại thông báo | NOTIFICATION.notification_type | ENUM(18) | Phân loại |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_NOTIFY).
3. Xác định người dùng bị ảnh hưởng theo hành lang, tỉnh, kỳ.
4. Tạo thông báo LAW_CHANGED.
5. Hệ thống trả kết quả: Mã thông báo, Loại thông báo.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Không ai bị ảnh hưởng: không gửi

**9. Logic nghiệp vụ**

- Xác định người dùng bị ảnh hưởng theo hành lang, tỉnh, kỳ
- Tạo thông báo LAW_CHANGED
- BR_042 – Chỉ báo thay đổi luật liên quan: Chỉ báo cho người dùng khi thay đổi luật ảnh hưởng quy tắc áp dụng cho hành lang, tỉnh hoặc dữ liệu của họ.
- BR_041 – Giờ yên lặng: Không gửi thông báo đẩy trong giờ yên lặng của người dùng; thông báo dời đến hết giờ yên lặng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_NOTIFY | SYS_SCHED (Bộ lập lịch) | Chỉ siêu dữ liệu cần để lập lịch; không đọc nội dung tài liệu |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_137_01** – Given Có phiên bản mới phát hành, When SYS_SCHED thực hiện "Báo thay đổi luật liên quan" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi notification_id, notification_type.
- **REQ_137_02** – Given tình huống "Không ai bị ảnh hưởng", When SYS_SCHED thực hiện "Báo thay đổi luật liên quan", Then không gửi.
- **REQ_137_03** – Given quy tắc BR_042 (Chỉ báo thay đổi luật liên quan), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_137_04** – Given quy tắc BR_041 (Giờ yên lặng), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_016 – Gói dịch vụ

### FUN_138 – Xem và đổi gói dịch vụ

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_138 |
| Module / Sub-module | MOD_016 / Gói |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem gói, nâng cấp, hạ cấp hoặc hủy |
| Permission | PER_PLAN_MANAGE |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: subscription_id, sub_status, current_period_end, plan_code
- Trạng thái: ACTIVE→CANCELLED/PAYMENT_FAILED

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0525 | Mã gói | SUBSCRIPTION.sub_plan_code | VARCHAR(10) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0523 | Mã đăng ký | SUBSCRIPTION.subscription_id | UUID(36) | Định danh |
| FLD_0526 | Trạng thái | SUBSCRIPTION.sub_status | ENUM(14) | Trạng thái |
| FLD_0528 | Hết kỳ hiện tại | SUBSCRIPTION.current_period_end | TIMESTAMP | Theo giờ UTC |
| FLD_0013 | Mã gói dịch vụ | USER.plan_code | VARCHAR(10) | Gói hiện tại |

**6. Luồng chính**

1. WRK mở chức năng "Xem và đổi gói dịch vụ".
2. Người dùng cung cấp: Mã gói.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PLAN_MANAGE).
4. Nâng cấp có hiệu lực ngay sau thanh toán.
5. Hạ hoặc hủy có hiệu lực cuối kỳ.
6. Thanh toán lỗi thì hạ về FREE giữ nguyên dữ liệu.
7. Hệ thống trả kết quả: Mã đăng ký, Trạng thái, Hết kỳ hiện tại, Mã gói dịch vụ.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Thanh toán thất bại: giữ gói cũ đến hết kỳ rồi hạ

**9. Logic nghiệp vụ**

- Nâng cấp có hiệu lực ngay sau thanh toán
- Hạ hoặc hủy có hiệu lực cuối kỳ
- Thanh toán lỗi thì hạ về FREE giữ nguyên dữ liệu
- BR_044 – Đổi gói theo kỳ: Nâng gói có hiệu lực ngay; hạ hoặc hủy có hiệu lực cuối kỳ; thanh toán lỗi thì hạ về Free, không mất dữ liệu.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| sub_plan_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

| Trước → Sau |
|---|
| ACTIVE→CANCELLED/PAYMENT_FAILED |

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PLAN_MANAGE | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_138_01** – Given Đã đăng nhập, When WRK thực hiện "Xem và đổi gói dịch vụ" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi subscription_id, sub_status, current_period_end, plan_code; trạng thái chuyển ACTIVE→CANCELLED/PAYMENT_FAILED.
- **REQ_138_02** – Given tình huống "Thanh toán thất bại", When WRK thực hiện "Xem và đổi gói dịch vụ", Then giữ gói cũ đến hết kỳ rồi hạ.
- **REQ_138_03** – Given quy tắc BR_044 (Đổi gói theo kỳ), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_139 – Xem mức sử dụng

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_139 |
| Module / Sub-module | MOD_016 / Gói |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem lượt LLM và trang OCR đã dùng trong tháng |
| Permission | PER_PLAN_VIEW |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] |

**2. Tiền điều kiện**

- Đã đăng nhập

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: llm_calls_used, ocr_pages_used, llm_monthly_quota

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0533 | Tháng sử dụng | USAGE_COUNTER.usage_month | VARCHAR(7) | Y | — | YYYY-MM |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0534 | Số lượt LLM đã dùng | USAGE_COUNTER.llm_calls_used | INTEGER | Đã dùng |
| FLD_0535 | Số trang OCR đã dùng | USAGE_COUNTER.ocr_pages_used | INTEGER | Đã dùng |
| FLD_0521 | Hạn mức LLM mỗi tháng | PLAN.llm_monthly_quota | INTEGER | Số lượt gọi LLM |

**6. Luồng chính**

1. WRK mở chức năng "Xem mức sử dụng".
2. Người dùng cung cấp: Tháng sử dụng.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_PLAN_VIEW).
4. So với hạn mức gói.
5. Hệ thống trả kết quả: Số lượt LLM đã dùng, Số trang OCR đã dùng, Hạn mức LLM mỗi tháng.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Hết hạn mức: nêu rõ chuyển sang mẫu văn bản

**9. Logic nghiệp vụ**

- So với hạn mức gói
- BR_039 – Hết hạn mức LLM: Hết hạn mức LLM trong tháng thì chuyển sang giải thích theo mẫu; lõi tính toán không bị ảnh hưởng.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| usage_month | YYYY-MM | Giá trị không hợp lệ: YYYY-MM |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_PLAN_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_139_01** – Given Đã đăng nhập, When WRK thực hiện "Xem mức sử dụng" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi llm_calls_used, ocr_pages_used, llm_monthly_quota.
- **REQ_139_02** – Given tình huống "Hết hạn mức", When WRK thực hiện "Xem mức sử dụng", Then nêu rõ chuyển sang mẫu văn bản.
- **REQ_139_03** – Given quy tắc BR_039 (Hết hạn mức LLM), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

## MOD_017 – Đóng góp dữ liệu ẩn danh

### FUN_140 – Xem nội dung sẽ đóng góp ẩn danh

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_140 |
| Module / Sub-module | MOD_017 / Đóng góp |
| Actor | ROLE_WRK (Người lao động) |
| Mô tả | Xem trước dữ liệu sẽ được ẩn danh hóa |
| Permission | PER_ANON_VIEW |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Đã đồng ý ANON_CONTRIBUTION

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: record_json

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0042 | Mục đích | CONSENT.purpose_code | ENUM(20) | Y | — | ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0539 | Bản ghi ẩn danh | ANON_CONTRIBUTION.record_json | JSONB | Ví dụ chênh lệch theo khoản mục |

**6. Luồng chính**

1. WRK mở chức năng "Xem nội dung sẽ đóng góp ẩn danh".
2. Người dùng cung cấp: Mục đích.
3. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_ANON_VIEW).
4. Dựng bản ghi đã loại định danh để xem.
5. Hệ thống trả kết quả: Bản ghi ẩn danh.

**7. Luồng thay thế**

- A1: Người dùng hủy trước khi xác nhận → hệ thống không lưu thay đổi và giữ nguyên trạng thái trước.

**8. Luồng ngoại lệ**

- E1: Chưa đồng ý: không dựng

**9. Logic nghiệp vụ**

- Dựng bản ghi đã loại định danh để xem
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.
- BR_043 – Ngưỡng k-ẩn danh: Chỉ công bố chỉ số tổng hợp khi cỡ mẫu ≥ k (đề xuất k = 20); dữ liệu đóng góp không có định danh.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| purpose_code | ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} | Giá trị không hợp lệ: ∈{CASE_SHARE,EXTERNAL_LLM,ANON_CONTRIBUTION,SYNC} |
| purpose_code | bắt buộc | Giá trị không hợp lệ: bắt buộc |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_ANON_VIEW | ROLE_WRK (Người lao động) | Chỉ dữ liệu của chính mình (chủ sở hữu); kiểm tra ở phía máy chủ (BR_017) |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_140_01** – Given Đã đồng ý ANON_CONTRIBUTION, When WRK thực hiện "Xem nội dung sẽ đóng góp ẩn danh" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi record_json.
- **REQ_140_02** – Given tình huống "Chưa đồng ý", When WRK thực hiện "Xem nội dung sẽ đóng góp ẩn danh", Then không dựng.
- **REQ_140_03** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_140_04** – Given quy tắc BR_043 (Ngưỡng k-ẩn danh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_141 – Tạo bản ghi đóng góp ẩn danh

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_141 |
| Module / Sub-module | MOD_017 / Đóng góp |
| Actor | SYS_AGENT (Agent) |
| Mô tả | Tạo bản ghi không truy ngược được |
| Permission | PER_SYS_ANON |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Người dùng đã đồng ý

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: contribution_id, record_json, k_group_key

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0043 | Đã đồng ý | CONSENT.granted | BOOLEAN | Y | false | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0536 | Mã đóng góp | ANON_CONTRIBUTION.contribution_id | UUID(36) | Định danh |
| FLD_0539 | Bản ghi ẩn danh | ANON_CONTRIBUTION.record_json | JSONB | Ví dụ chênh lệch theo khoản mục |
| FLD_0540 | Khóa nhóm k-ẩn danh | ANON_CONTRIBUTION.k_group_key | VARCHAR(60) | Nhóm để kiểm tra ngưỡng tối thiểu |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_ANON).
3. Loại định danh.
4. Làm tròn.
5. Gán nhóm.
6. Không lưu liên kết tới USER.
7. Hệ thống trả kết quả: Mã đóng góp, Bản ghi ẩn danh, Khóa nhóm k-ẩn danh.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Rút đồng ý trước khi tạo: bỏ qua

**9. Logic nghiệp vụ**

- Loại định danh
- Làm tròn
- Gán nhóm
- Không lưu liên kết tới USER
- BR_037 – Đồng ý tách riêng, mặc định tắt: Mỗi mục đích (chia sẻ Case Pack, LLM ngoài, đóng góp ẩn danh, đồng bộ) có đồng ý riêng, mặc định tắt, rút được bất cứ lúc nào.
- BR_043 – Ngưỡng k-ẩn danh: Chỉ công bố chỉ số tổng hợp khi cỡ mẫu ≥ k (đề xuất k = 20); dữ liệu đóng góp không có định danh.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_ANON | SYS_AGENT (Agent) | Chỉ dữ liệu của người dùng giao nhiệm vụ, hoặc dữ liệu nguồn luật |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_141_01** – Given Người dùng đã đồng ý, When SYS_AGENT thực hiện "Tạo bản ghi đóng góp ẩn danh" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi contribution_id, record_json, k_group_key.
- **REQ_141_02** – Given tình huống "Rút đồng ý trước khi tạo", When SYS_AGENT thực hiện "Tạo bản ghi đóng góp ẩn danh", Then bỏ qua.
- **REQ_141_03** – Given quy tắc BR_037 (Đồng ý tách riêng, mặc định tắt), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.
- **REQ_141_04** – Given quy tắc BR_043 (Ngưỡng k-ẩn danh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

### FUN_142 – Tổng hợp thống kê ẩn danh

**1. Thông tin chung**

| Mục | Nội dung |
|---|---|
| Mã chức năng | FUN_142 |
| Module / Sub-module | MOD_017 / Tổng hợp |
| Actor | SYS_SCHED (Bộ lập lịch) |
| Mô tả | Tạo chỉ số tổng hợp khi đủ cỡ mẫu |
| Permission | PER_SYS_ANON |
| Ưu tiên | P3 |
| Nhãn | [ĐÃ XÁC NHẬN] [CẦN XÁC NHẬN] một phần |

**2. Tiền điều kiện**

- Có bản ghi đóng góp

**3. Hậu điều kiện**

- Dữ liệu đầu ra được ghi: metric_code, metric_value, sample_size

**4. Dữ liệu đầu vào**

| Field ID | Tên trường | Field Code | Kiểu | Bắt buộc | Mặc định | Quy tắc |
|---|---|---|---|---|---|---|
| FLD_0540 | Khóa nhóm k-ẩn danh | ANON_CONTRIBUTION.k_group_key | VARCHAR(60) | Y | — | — |

**5. Dữ liệu đầu ra**

| Field ID | Tên trường | Field Code | Kiểu | Mô tả |
|---|---|---|---|---|
| FLD_0544 | Mã chỉ số | AGG_STAT.metric_code | VARCHAR(40) | Ví dụ tỷ lệ kỳ lương lệch |
| FLD_0545 | Giá trị | AGG_STAT.metric_value | DECIMAL(14,4) | Giá trị tổng hợp |
| FLD_0546 | Cỡ mẫu | AGG_STAT.sample_size | INTEGER | Số bản ghi |

**6. Luồng chính**

1. Hệ thống kích hoạt chức năng khi điều kiện tiền đề đúng.
2. Hệ thống kiểm tra quyền và phạm vi dữ liệu (PER_SYS_ANON).
3. Gom theo nhóm.
4. Chỉ công bố khi cỡ mẫu ≥ k.
5. Hệ thống trả kết quả: Mã chỉ số, Giá trị, Cỡ mẫu.

**7. Luồng thay thế**

- Không có luồng thay thế do chức năng chạy tự động hoặc chỉ đọc.

**8. Luồng ngoại lệ**

- E1: Cỡ mẫu dưới k: không công bố

**9. Logic nghiệp vụ**

- Gom theo nhóm
- Chỉ công bố khi cỡ mẫu ≥ k
- BR_043 – Ngưỡng k-ẩn danh: Chỉ công bố chỉ số tổng hợp khi cỡ mẫu ≥ k (đề xuất k = 20); dữ liệu đóng góp không có định danh.

**10. Quy tắc validation**

| Trường | Quy tắc | Thông điệp lỗi |
|---|---|---|
| — | Không có quy tắc nhập liệu | — |

**11. Chuyển trạng thái**

Chức năng không làm thay đổi trạng thái nghiệp vụ.

**12. Phân quyền**

| Permission | Actor | Phạm vi dữ liệu |
|---|---|---|
| PER_SYS_ANON | SYS_SCHED (Bộ lập lịch) | Chỉ siêu dữ liệu cần để lập lịch; không đọc nội dung tài liệu |

**13. Tiêu chí chấp nhận (Given–When–Then)**

- **REQ_142_01** – Given Có bản ghi đóng góp, When SYS_SCHED thực hiện "Tổng hợp thống kê ẩn danh" với dữ liệu hợp lệ, Then hệ thống thực hiện đúng logic xử lý và trả/ghi metric_code, metric_value, sample_size.
- **REQ_142_02** – Given tình huống "Cỡ mẫu dưới k", When SYS_SCHED thực hiện "Tổng hợp thống kê ẩn danh", Then không công bố.
- **REQ_142_03** – Given quy tắc BR_043 (Ngưỡng k-ẩn danh), When chức năng được thực hiện, Then quy tắc được áp dụng nhất quán, vi phạm bị chặn hoặc ghi nhận.

