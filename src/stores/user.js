import { api } from "@/utils/api";
import { defineStore } from "pinia";

const useUserStore = defineStore({
  id: "user",

  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggenIn: (state) => !!state.user,
  },
  actions: {
    setBearerToken(token) {
      localStorage.setItem("Authorization", token);
    },

    async register(responseData) {
      const response = await api.post("/api/auth/register", responseData);
      this.setBearerToken(response.access_token);
    },
    async login(responseData) {
      const response = await api.post("/api/auth/login", responseData);
      this.setBearerToken(response.access_token);
    },
    async fetchUserData() {
      this.user = await api.get("/api/auth/me");
      return this.user;
    },
    async logout() {
      this.$reset();
      localStorage.removeItem("Authorization");
    },
  },
});

export default useUserStore;
