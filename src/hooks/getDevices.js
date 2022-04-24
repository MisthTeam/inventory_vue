import { useDevicesStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default function getDevices() {
  const DevicesStore = useDevicesStore();
  const DevicesRef = storeToRefs(DevicesStore).devices;
  const fetching = async () => {
    try {
      const devices = await DevicesStore.getDevices();
      DevicesRef.value = devices;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetching);

  return {
    DevicesStore,
    DevicesRef,
  };
}
