import { api } from "@/utils/api";
import { defineStore } from "pinia";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: [] || null,
  }),
  actions: {
    async getDevices() {
      this.devices = (await api.get("devices")).devices;
      return this.devices;
    },
    async getDeviceByPn(pn) {
      return (await api.get(`devices/pn/${pn}`)).device;
    },
    async deleteDevice(id) {
      await api.delete(`admin/device/${Number(id)}`);
    },
  },
});

export default useDevicesStore;
