import { useUserStore } from "@/stores";
import { ref } from "vue";

export default function updatePassword() {
  const isLoading = ref(false);
  const userStore = useUserStore();

  const fetching = async (id: number, password: string) => {
    isLoading.value = true;

    await userStore.updatePassword(id, password);

    isLoading.value = false;
  };

  return {
    isLoading,
    fetching,
  };
}
