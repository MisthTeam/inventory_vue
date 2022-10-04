import { defineStore } from "pinia";
import { stringify } from "qs";

import { ApiResponse } from "@/interfaces/api.interface";
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
      const response = await api.post<ApiResponse, Device>(`devices/pn`, {
        pn,
      });
      return response;
    },
    async deleteDevice(id: number) {
      const response = await api.delete<ApiResponse, Device>(`admin/device/${id}`);
      this.deleteDeviceInArray(id);
      return response;
    },
    async editDevice({ id, ...payload }: deviceEditParams) {
      await api.put<ApiResponse>(`admin/device/${Number(id)}`, payload);
      this.updateDevice({ id, ...payload });
      return true;
    },

    updateDevice({ id, ...payload }: deviceEditParams) {
      let device = this.devices.data?.find((d) => d.id === id);
      if (device) {
        device = Object.assign(device, {
          ...payload,
        });
      }
    },

    deleteDeviceInArray(id: number) {
      this.devices.data = this.devices.data.filter((device) => device.id !== id);
    },
  },
});

export default useDevicesStore;
