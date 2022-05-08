import { useDevicesStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

export default function getDevices() {
  const isLoading = ref(true);
  const DevicesStore = useDevicesStore();
  const DevicesRef = storeToRefs(DevicesStore).devices;
  const fetching = async () => {
    try {
      const devices = await DevicesStore.getDevices();
      DevicesRef.value = devices;
    } catch (error) {
      console.log(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    DevicesStore,
    DevicesRef,
    isLoading,
  };
}
