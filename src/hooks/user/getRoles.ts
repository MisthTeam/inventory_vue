import { useUserStore } from "@/stores";
import { Role } from "@/stores/user/types";
import { onMounted, ref } from "vue";

export default function getRoles() {
  const isLoading = ref(false);
  const roles = ref<Role[]>([]);
  const userStore = useUserStore();
  const fetching = async () => {
    isLoading.value = true;
    roles.value = await userStore.getRoles();

    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    isLoading,
    roles,
  };
}
