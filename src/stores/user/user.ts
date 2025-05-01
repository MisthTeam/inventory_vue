import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { loginUserParams, registerUserParams, User, AuthResponse, Role } from "./types";
import { auth_response, roles as rolesMaps, sleep, user } from "@/mocks";

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

    async register(_: registerUserParams) {
      await sleep(250);
      return user;
    },
    async login(_: loginUserParams) {
      await sleep(250);
      this.setBearerToken(auth_response.access_token);
      return (this.user = auth_response.user);
    },
    async fetchUserData() {
      await sleep(250);
      return (this.user = user);
    },
    async logout() {
      await sleep(250);
      // await api.post<ApiResponse>("auth/logout");
      this.setBearerToken();
    },
    async getUsers() {
      await sleep(250);
      // const response = await api.get<ApiResponse, Array<User>>("admin/users");
      return Array(1).fill(user);
    },
    async getUserById(_: number) {
      await sleep(250);
      // const response = await api.get<ApiResponse, User>(`admin/users/u/${id}`);
      return user;
    },
    async getRoles(): Promise<Role[]> {
      await sleep(250);
      // const reponse = await api.get<ApiResponse, Role[]>("admin/users/roles");
      return rolesMaps;
    },
    async setRoles(_: number, roles: number[]) {
      const roleMap = Object.fromEntries(rolesMaps.map((role) => [role.id, role.value]));
      const updatedRoles = roles.map((id) => roleMap[id]);
      const newUser = Object.assign(user, {
        roles: updatedRoles,
      });
      await sleep(250);
      // const response = await api.post<ApiResponse, User>(`admin/users/roles/${id}`, {
      //   roles,
      // });
      return (this.user = newUser);
    },
    async updatePassword(id: number, password: string) {
      await sleep(250);
      // await api.post<ApiResponse>(`admin/users/passwd/${id}`, {
      //   password,
      // });
    },
  },
});

export default useUserStore;
