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
      const notify = await devicesStore.editDevice({
        id,
        type,
        pn,
        specification,
      });
      toast.success(notify.content);
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка, попробуйте позже");
    }
    isLoading.value = false;
  };
  return {
    editing,
    isEditingLoading: isLoading,
  };
}
