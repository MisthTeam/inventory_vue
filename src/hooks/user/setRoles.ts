import { useUserStore } from "@/stores";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function setRoles() {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const toats = useToast();
  const setRolesToUser = async (id: number, dto: number[]) => {
    isLoading.value = true;
    await userStore.setRoles(id, dto);
    toats.success("Роли успешно изменены");

    isLoading.value = false;
  };

  return {
    isLoading,
    setRolesToUser,
  };
}
