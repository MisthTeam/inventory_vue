import { useUserStore } from "@/stores";
import { User } from "@/stores/user/types";
import { onMounted, ref } from "vue";

export default function getUsers() {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const users = ref<User[]>([]);
  const fetching = async () => {
    isLoading.value = true;
    users.value = await userStore.getUsers();

    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    users,
  };
}
