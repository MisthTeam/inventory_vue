import api from '@/api';
import { defineStore } from 'pinia';

const useItemsStore = defineStore({
    id: 'items',

    state: () => ({
        items: [] || null,
    }),
    getters: {
        getAllItems: (state) => state.items,
        getCurrentItem: (state) => {
            return (itemId) => state.items && state.items.find((item) => item.id === itemId);
        },
    },
    actions: {
        async getItems() {
            const { data } = await api.items.getItems();
            this.items = data.items;
            return this.items;
        },
        async createItem(pn) {
            const { data } = await api.items.createItem({
                pn: pn,
            });
            return data;
        },
    },
});

export default useItemsStore;
