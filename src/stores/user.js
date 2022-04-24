import api from "@/api";
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
      const { data } = await api.auth.register(responseData);
      this.setBearerToken(data.access_token);
      return this.fetchUserData();
    },
    async login(responseData) {
      const { data } = await api.auth.login(responseData);
      this.setBearerToken(data.access_token);
      return this.fetchUserData();
    },
    async fetchUserData() {
      const { data } = await api.auth.me();
      this.user = data;
      return this.user;
    },
  },
});

export default useUserStore;
