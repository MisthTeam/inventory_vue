import { useUserStore } from "@/stores";
import { User } from "@/stores/user/types";
import { onMounted, ref } from "vue";

export default function getUser(id: number) {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const user = ref<User | null>(null);
  const fetching = async () => {
    isLoading.value = true;
    user.value = await userStore.getUserById(id);

    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    user,
  };
}
