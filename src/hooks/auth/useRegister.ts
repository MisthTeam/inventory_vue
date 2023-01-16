import { useUserStore } from "@/stores";
import { ref } from "vue";
import { registerUserParams, User } from "@/stores/user/types";

export default function useRegister() {
  const userStore = useUserStore();
  const register = ref<User | null>(null);
  const isLoading = ref(false);

  const onSubmit = async (data: registerUserParams) => {
    isLoading.value = true;
    register.value = await userStore.register(data);
    isLoading.value = false;
  };

  return {
    onSubmit,
    register,
    isLoading,
  };
}
