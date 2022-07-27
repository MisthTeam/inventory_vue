import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { useToast } from "vue-toastification";
import { deviceEditParams } from "@/stores/devices/types";

export default function editDevice() {
  const isLoading = ref(false);
  const toast = useToast();
  const devicesStore = useDevicesStore();
  const editing = async ({ id, specification, pn, type }: deviceEditParams) => {
    isLoading.value = true;
    try {
      await devicesStore.editDevice({
        id,
        type,
        pn,
        specification,
      });
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };
  return {
    editing,
    isEditingLoading: isLoading,
  };
}
