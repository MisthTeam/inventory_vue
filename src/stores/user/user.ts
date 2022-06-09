import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { loginUserParams, registerUserParams, User } from "./types";

const useUserStore = defineStore({
  id: "user",

  state: () => ({
    user: null as User | null,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggenIn: (state) => !!state.user,
  },
  actions: {
    setBearerToken(token: string | null = null) {
      if (token) {
        localStorage.setItem("Authorization", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        this.$reset();
        localStorage.removeItem("Authorization");
        delete api.defaults.headers.common["Authorization"];
      }
    },

    async register(responseData: registerUserParams) {
      const response = await api.post<ApiResponse, any>("auth/register", responseData);
      this.setBearerToken(response.access_token);
    },
    async login(responseData: loginUserParams) {
      const response = await api.post<ApiResponse, any>("auth/login", responseData);
      this.setBearerToken(response.access_token);
    },
    async fetchUserData() {
      const response = await api.get<ApiResponse, User>("auth/me");
      return (this.user = response);
    },
  },
});

export default useUserStore;
