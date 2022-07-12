import { useUserStore } from "@/stores";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function setRoles() {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const toats = useToast();
  const setRolesToUser = async (dto: number[]) => {
    try {
      isLoading.value = true;
      await userStore.setRoles(dto);
      toats.success("Роли успешно изменены");
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toats.error("Произошла ошибка при получении данных. Попробуйте позже");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    setRolesToUser,
  };
}
