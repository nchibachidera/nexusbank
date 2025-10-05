 import api from "./api";

export const testBackend = async () => {
  try {
    const res = await api.get("/test");
    console.log("✅ Backend response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Backend connection failed:", err);
  }
};
