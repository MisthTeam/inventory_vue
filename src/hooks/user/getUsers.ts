import { useUserStore } from "@/stores";
import { User } from "@/stores/user/types";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getUsers() {
  const isLoading = ref(false);
  const toats = useToast();
  const userStore = useUserStore();
  const users = ref<User[]>([]);
  const fetching = async () => {
    try {
      isLoading.value = true;
      users.value = await userStore.getUsers();
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toats.error("Произошла ошибка при получении данных. Попробуйте позже");
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    users,
  };
}
