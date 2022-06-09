import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { useToast } from "vue-toastification";

export function deleteDevice(id) {
  const isLoading = ref(false);
  const toast = useToast();
  const devicesStore = useDevicesStore();
  const deleting = async () => {
    isLoading.value = true;
    try {
      await devicesStore.deleteDevice(id);
      toast.success("Устройство удалено");
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при удалении файла, попробуйте позже");
    }
    isLoading.value = false;
  };
  return {
    deleting,
    isDeleteLoading: isLoading,
  };
}
