import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { Device } from "@/stores/devices/types";

export function deleteDevice(id: number) {
  const isLoading = ref(false);
  const devicesStore = useDevicesStore();
  const device = ref<Device>({} as Device);

  const deleting = async (): Promise<Device> => {
    isLoading.value = true;
    device.value = await devicesStore.deleteDevice(id);
    isLoading.value = false;
    return device.value;
  };
  return {
    deleting,
    isDeleteLoading: isLoading,
  };
}
