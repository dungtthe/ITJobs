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

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("formatDate error:", error);
    return dateString;
  }
};
