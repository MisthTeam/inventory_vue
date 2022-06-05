import { useDevicesStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getDevices() {
  const isLoading = ref(true);
  const toast = useToast();
  const devicesStore = useDevicesStore();
  const devices = storeToRefs(devicesStore).devices;
  const fetching = async (params = { limit: 10, page: 1 }) => {
    isLoading.value = true;
    try {
      devices.value = await devicesStore.getDevices(params);
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.error(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);
  onUnmounted(() => {
    devicesStore.$reset();
  });

  return {
    devicesStore,
    devices,
    fetching,
    isLoading,
  };
}
