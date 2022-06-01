import { useDevicesStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getDevices() {
  const isLoading = ref(true);
  const toast = useToast();
  const devicesStore = useDevicesStore();
  const devices = storeToRefs(devicesStore).devices;
  const fetching = async () => {
    try {
      devices.value = await devicesStore.getDevices();
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.error(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    devicesStore,
    devices,
    isLoading,
  };
}
