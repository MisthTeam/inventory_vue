import { useUserStore } from "@/stores";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function updatePassword() {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const toats = useToast();

  const fetching = async (id: number, password: string) => {
    isLoading.value = true;
    try {
      await userStore.updatePassword(id, password);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toats.error("Произошла ошибка. Попробуйте позже");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetching,
  };
}
