import { useUserStore } from "@/stores";
import { Role } from "@/stores/user/types";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getRoles() {
  const isLoading = ref(false);
  const toats = useToast();
  const roles = ref<Role[]>([]);
  const userStore = useUserStore();
  const fetching = async () => {
    try {
      isLoading.value = true;
      roles.value = await userStore.getRoles();
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toats.error("Произошла ошибка при получении данных. Попробуйте позже");
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    roles,
  };
}
