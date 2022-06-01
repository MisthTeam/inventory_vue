import { api } from "@/utils/api";
import { defineStore } from "pinia";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: [] || null,
  }),
  actions: {
    async getDevices() {
      const { response } = await api.get("devices");
      return (this.devices = response);
    },
    async getDeviceByPn(pn) {
      return (await api.get(`devices/pn/${pn}`)).response;
    },
    async deleteDevice(id) {
      await api.delete(`admin/device/${Number(id)}`);
    },
    async editDevice(id, payload) {
      await api.put(`admin/device/${Number(id)}`, payload);
    },
  },
});

export default useDevicesStore;
