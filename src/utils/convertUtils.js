export const toBigInt = (str) => {
  try {
    const trimmed = str.trim();
    if (!/^[-+]?\d+$/.test(trimmed)) {
      throw new Error("Chuỗi không phải là số nguyên hợp lệ");
    }
    return BigInt(trimmed);
  } catch (error) {
    console.error("Lỗi khi chuyển đổi sang BigInt:", error.message);
    return null;
  }
};

export const toNumber = (str) => {
  const trimmed = str.trim();
  const num = Number(trimmed);

  if (isNaN(num)) {
    console.error(`"${str}" không phải là số hợp lệ.`);
    return null;
  }

  return num;
};
