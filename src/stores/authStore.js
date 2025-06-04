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

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export const useAccountBalanceStore = create((set) => ({
  accountBalance: 0,
  setAccountBalance: (balance) => set({ accountBalance: balance }),
  clearAccountBalance: () => set({ accountBalance: 0 }),
}));
