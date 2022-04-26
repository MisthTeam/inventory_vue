import { api } from "@/utils/api";
import { defineStore } from "pinia";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: [] || null,
  }),
  actions: {
    async getDevices() {
      this.devices = await api.get("/api/devices");
      return this.devices;
    },
  },
});

export default useDevicesStore;
