import { defineStore } from "pinia";
import { stringify } from "qs";

import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { Device, deviceEditParams, DeviceState, fetchDevicesParams } from "./types";
import { devices, sleep } from "@/mocks";

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

      await sleep(250);
      // const response = await api.get<ApiResponse, DeviceState>(`devices?${stringify(params)}`);
      return (this.devices = devices);
    },
    async getDeviceByPn(pn: string) {
      // const response = await api.post<ApiResponse, Device>(`devices/pn`, {
      //   pn,
      // });
      await sleep(250);
      const dev = devices.data.find((device) => device.pn === pn);
      if (!dev) return null;

      return dev;
    },
    async deleteDevice(id: number) {
      await sleep(250);
      // const response = await api.delete<ApiResponse, Device>(`admin/device/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const device = devices.data.find((dev) => dev.id === id)!;
      this.deleteDeviceInArray(id);
      return device;
    },
    async editDevice({ id, ...payload }: deviceEditParams) {
      await sleep(250);
      // await api.put<ApiResponse>(`admin/device/${Number(id)}`, payload);
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
