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
    setBearerToken(token = null) {
      if (token) {
        localStorage.setItem("Authorization", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        this.$reset();
        localStorage.removeItem("Authorization");
        delete api.defaults.headers.common["Authorization"];
      }
    },

    async register(responseData) {
      const response = await api.post("auth/register", responseData);
      this.setBearerToken(response.access_token);
    },
    async login(responseData) {
      const response = await api.post("auth/login", responseData);
      this.setBearerToken(response.access_token);
    },
    async fetchUserData() {
      return (this.user = await api.get("auth/me"));
    },
  },
});

export default useUserStore;
