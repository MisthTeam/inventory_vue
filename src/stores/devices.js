import { api } from "@/utils/api";
import { defineStore } from "pinia";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: [] || null,
  }),
  actions: {
    async getDevices() {
      this.devices = (await api.get("/api/devices")).devices;
      return this.devices;
    },
    async getDeviceByPn(pn) {
      return (await api.get(`/api/devices/pn/${pn}`)).device;
    },
  },
});

export default useDevicesStore;
