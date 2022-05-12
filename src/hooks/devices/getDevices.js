import { useDevicesStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getDevices() {
  const isLoading = ref(true);
  const toast = useToast();
  const DevicesStore = useDevicesStore();
  const DevicesRef = storeToRefs(DevicesStore).devices;
  const fetching = async () => {
    try {
      const devices = await DevicesStore.getDevices();
      DevicesRef.value = devices;
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
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
