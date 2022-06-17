import { useDevicesStore } from "@/stores";
import { fetchDevicesParams } from "@/stores/devices/types";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

export default function getDevices() {
  const isLoading = ref(true);
  const devicesStore = useDevicesStore();
  const devices = storeToRefs(devicesStore).devices;
  const fetching = async (params: fetchDevicesParams = { limit: 10, page: 1 }) => {
    isLoading.value = true;
    try {
      devices.value = await devicesStore.getDevices(params);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
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
