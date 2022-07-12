import { useUserStore } from "@/stores";
import { User } from "@/stores/user/types";
import { AxiosError } from "axios";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getUser(id: number) {
  const isLoading = ref(false);
  const toats = useToast();
  const userStore = useUserStore();
  const user = ref<User | null>(null);
  const fetching = async () => {
    try {
      isLoading.value = true;
      user.value = await userStore.getUserById(id);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      const { response } = error as AxiosError;
      if (response?.status != 404) toats.error("Произошла ошибка при получении данных. Попробуйте позже");
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    user,
  };
}
