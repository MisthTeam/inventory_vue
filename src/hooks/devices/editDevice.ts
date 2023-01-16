import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { deviceEditParams } from "@/stores/devices/types";

export default function editDevice() {
  const isLoading = ref(false);
  const devicesStore = useDevicesStore();

  const editing = async ({ id, specification, pn, type }: deviceEditParams) => {
    isLoading.value = true;

    await devicesStore.editDevice({
      id,
      type,
      pn,
      specification,
    });
    isLoading.value = false;
  };
  return {
    editing,
    isEditingLoading: isLoading,
  };
}
