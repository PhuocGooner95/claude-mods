# claude-mods

Các mod giao diện tự làm cho ứng dụng Claude Desktop (tab Code) và ứng dụng Claude trên điện thoại.

## trung-dia

Giao diện phong cách sử thi giả tưởng.

- **Ban ngày:** nền giấy da bản đồ cũ, chữ nâu mực.
- **Ban tối:** nền đá đêm ấm, chữ màu kem như dưới ánh lửa.
- **Màu nhấn:** vàng kim, cam than hồng, xanh rừng, xanh bạc.
- **Tranh nền:** hoàng hôn trên ba lớp núi, núi lửa xa rực sáng, một tháp đen có con mắt lửa, đoàn tám lữ khách trên mỏm đá, thú có cánh bay ngang trời, sao, tàn lửa và sương.

Tranh nền là hình SVG tự vẽ, nằm ngay trong `trung-dia/hooks/register.tsx`. Mod không tải gì từ mạng, không đọc file và không chạy lệnh nào.

### Cài đặt

Cần Claude Code bản 2.1.319 trở lên.

Tại ô nhập của một phiên Claude Code trong terminal:

```
/plugin install trung-dia --marketplace PhuocGooner95/claude-mods
```

Trả lời `y` để thêm marketplace, rồi chọn phạm vi cài (Enter để cài cho người dùng).

Từ shell:

```
claude plugin install trung-dia --marketplace PhuocGooner95/claude-mods
```

Trong ứng dụng desktop, nơi `/plugin` không chạy: bấm + cạnh ô nhập, chọn Plugins, Add marketplace với `PhuocGooner95/claude-mods`, rồi Add plugin.

### Lưu ý

- Mỗi phiên chỉ chạy một giao diện; mod giao diện cài sau sẽ thay mod cài trước.
- Terminal và các trình soạn code không vẽ giao diện này; hộp hỏi quyền luôn giữ giao diện gốc của ứng dụng.
- Trên một số bản ứng dụng desktop, tranh nền chỉ hiện dạng ảnh tĩnh, không chuyển động.

### Nguồn gốc

`trung-dia/hooks/make-colors.js` và `make-colors.d.ts` được chép nguyên từ bộ công cụ viết mod đi kèm Claude Code, dùng để sinh bảng màu. Phần còn lại là tự làm.

Đây là sản phẩm của người hâm mộ, lấy cảm hứng từ thể loại sử thi giả tưởng. Mod không dùng hình ảnh, logo hay phông chữ của bất kỳ tác phẩm nào và không liên kết với tác giả, hãng phim hay chủ sở hữu thương hiệu nào.
