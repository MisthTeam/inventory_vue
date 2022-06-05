import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { stringify } from "qs";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: {
      data: [] || null,
    },
  }),
  actions: {
    async getDevices(params) {
      if (!params.type) {
        delete params.type;
      }
      if (!params.search) {
        delete params.search;
      }
      const { response } = await api.get(`devices?${stringify(params)}`);
      return (this.devices = response);
    },
    async getDeviceByPn(pn) {
      const { response } = await api.get(`devices/pn/${pn}`);
      return response;
    },
    async deleteDevice(id) {
      await api.delete(`admin/device/${Number(id)}`);
    },
    async editDevice(id, payload) {
      const { response } = await api.put(`admin/device/${Number(id)}`, payload);
      this.updateDevice(id, payload);
      return response;
    },

    updateDevice(id, payload) {
      let device = this.devices.data.find((d) => d.id === id);
      if (device) {
        device = Object.assign(device, {
          ...payload,
        });
      }
    },
  },
});

export default useDevicesStore;
