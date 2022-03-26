import { defineStore } from 'pinia';

const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            id: 0,
            nickname: 'adada'
        },
    }),
    getters: {
        getUser: (state) => state.user,
        isLoggenIn: (state) => !!state.user,
    },
    actions: {
        setBearerToken(token) {
            localStorage.setItem('Authorization', token);
        },

        async register() {
            // await api.auth.register(responseData);
        },
        async login() {
            // const { data } = await api.auth.login(responseData);
            // this.setBearerToken(data.access_token);
            // return await this.fetchUserData();
        },
        async fetchUserData() {
            // const { data } = await api.auth.me();
            // this.user = data;
            // return this.user;
        },
    },
});

export default useUserStore;
