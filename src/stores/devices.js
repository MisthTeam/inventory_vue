import api from "@/core/axios";
import { defineStore } from "pinia";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: [] || null,
  }),
  actions: {
    async getDevices() {
      const { data } = await api.get("/api/devices/");
      this.devices = data.devices;
      return this.devices;
    },
  },
});

export default useDevicesStore;
