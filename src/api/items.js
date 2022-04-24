export default function (instance) {
  return {
    getItems() {
      return instance.get("/api/items");
    },
    getItem(id) {
      return instance.get(`/api/items/view/${id}`);
    },
    createItem(payload) {
      return instance.post("/api/items", payload);
    },
    deleteItem(id) {
      return instance.delete(`/api/items/${id}`);
    },
    editItem(id) {
      return instance.post(`/api/items/${id}`);
    },
    // можно выполнять запрос в store
  };
}
