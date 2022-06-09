import { defineStore } from "pinia";
import { stringify } from "qs";

import { ApiResponse, ResponseNotify } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { Device, deviceEditParams, DeviceState, fetchDevicesParams } from "./types";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: {
      data: [],
    } as DeviceState,
  }),
  actions: {
    async getDevices(params: fetchDevicesParams): Promise<DeviceState> {
      if (!params.type) {
        delete params.type;
      }
      if (!params.search) {
        delete params.search;
      }
      const response = await api.get<ApiResponse, DeviceState>(`devices?${stringify(params)}`);
      return (this.devices = response);
    },
    async getDeviceByPn(pn: string) {
      const response = await api.get<ApiResponse, Device>(`devices/pn/${pn}`);
      return response;
    },
    async deleteDevice(id: number) {
      const response = await api.delete<ApiResponse, Device>(`admin/device/${Number(id)}`);
      return response;
    },
    async editDevice({ id, ...payload }: deviceEditParams) {
      const response = await api.put<ApiResponse, ResponseNotify>(`admin/device/${Number(id)}`, payload);
      this.updateDevice({ id, ...payload });
      return response.notify;
    },

    updateDevice({ id, ...payload }: deviceEditParams) {
      let device = this.devices.data?.find((d) => d.id === id);
      if (device) {
        device = Object.assign(device, {
          ...payload,
        });
      }
    },
  },
});

export default useDevicesStore;
