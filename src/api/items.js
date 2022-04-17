export default function (instance) {
    return {
        getItems() {
            return instance.get('/items');
        },
        createItem(payload) {
            return instance.post('/items', payload);
        },
        deleteItem(id) {
            return instance.delete(`/items/${id}`);
        },
        editItem(id) {
            return instance.post(`/items/${id}`);
        },
    };
}
