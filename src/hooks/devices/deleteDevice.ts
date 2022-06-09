import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { useToast } from "vue-toastification";
import { Device } from "@/stores/devices/types";

export function deleteDevice(id: number) {
  const isLoading = ref(false);
  const toast = useToast();
  const devicesStore = useDevicesStore();
  const device = ref<Device>({} as Device);
  const deleting = async (): Promise<Device> => {
    isLoading.value = true;
    try {
      device.value = await devicesStore.deleteDevice(id);
      toast.success("Устройство удалено");
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при удалении файла, попробуйте позже");
    }
    isLoading.value = false;
    return device.value;
  };
  return {
    deleting,
    isDeleteLoading: isLoading,
  };
}
