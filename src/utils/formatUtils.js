export const formatVND = (amount) => {
  try {
    // Dùng BigInt để xử lý các số rất lớn (vì là tiền)
    const value = BigInt(amount);
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    console.error("formatVND error:", error);
    return amount; // fallback nếu lỗi
  }
};
