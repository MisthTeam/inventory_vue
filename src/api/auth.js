export default function (instance) {
  return {
    login(payload) {
      return instance.post("/api/auth/login", payload);
    },
    register(payload) {
      return instance.post("/api/auth/register", payload);
    },
    me() {
      return instance.get("/api/auth/me");
    },
  };
}
