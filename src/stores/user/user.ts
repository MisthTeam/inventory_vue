import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { loginUserParams, registerUserParams, User, AuthResponse, Role } from "./types";

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
      const response = await api.post<ApiResponse, User>("auth/register", responseData);
      return response;
    },
    async login(responseData: loginUserParams) {
      const response = await api.post<ApiResponse, AuthResponse>("auth/login", responseData);
      this.setBearerToken(response.access_token);
      return (this.user = response.user);
    },
    async fetchUserData() {
      const response = await api.get<ApiResponse, User>("auth/me");
      return (this.user = response);
    },
    async logout() {
      await api.post<ApiResponse>("auth/logout");
      this.setBearerToken();
    },
    async getUsers() {
      const response = await api.get<ApiResponse, Array<User>>("admin/users");
      return response;
    },
    async getUserById(id: number) {
      const response = await api.get<ApiResponse, User>(`admin/users/u/${id}`);
      return response;
    },
    async getRoles(): Promise<Role[]> {
      const reponse = await api.get<ApiResponse, Role[]>("admin/users/roles");
      return reponse;
    },
    async setRoles(roles: number[]) {
      const response = await api.post<ApiResponse, User>(`admin/users/roles/${this.user?.id}`, {
        roles,
      });
      return (this.user = response);
    },
    async updatePassword(id: number, password: string) {
      await api.post<ApiResponse>(`admin/users/passwd/${id}`, {
        password,
      });
    },
  },
});

export default useUserStore;
