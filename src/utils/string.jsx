import { Buffer } from "buffer";

export const FormatTitle = (str) => {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, " ") // Loại bỏ ký tự đặc biệt, thay bằng khoảng trắng
    .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
    .trim() // Xóa khoảng trắng đầu/cuối
    .replace(/^./, (char) => char.toUpperCase()); // Viết hoa chữ cái đầu
};

export const Base64ToJson = (base64String) => {
  try {
    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
    return JSON.parse(jsonString); // Chuyển về object JSON
  } catch (error) {
    console.error("Invalid base64 string:", error);
    return null;
  }
};

export const JSONToBase64 = (json) => {
  try {
    const stringJSON = JSON.stringify(json);
    const base64JSON = Buffer.from(stringJSON, "utf-8").toString("base64");
    return base64JSON;
  } catch (error) {
    console.error("Invalid base64 string:", error);
    return null;
  }
};

export function ShortenAddress(address, length = 4) {
  if (!address || address.length < 2 * length + 2) return address;
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

export const ConvertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const Base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };