import { create } from "zustand";

//jwt
//tam thoi luu jwt token trong sessionStorage
export const setJwtToken = (token) => {
  sessionStorage.setItem("jwtToken", token);
};
export const getJwtToken = () => {
  return sessionStorage.getItem("jwtToken");
};
export const removeJwtToken = () => {
  sessionStorage.removeItem("jwtToken");
};

// Zustand store luu ten voi img thoi
export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));
