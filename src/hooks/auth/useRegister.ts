import { useUserStore } from "@/stores";
import { ref } from "vue";
import { registerUserParams, User } from "@/stores/user/types";

export default function useRegister() {
  const userStore = useUserStore();
  const register = ref<User | null>(null);
  const isLoading = ref(false);

  const onSubmit = async (data: registerUserParams) => {
    try {
      isLoading.value = true;
      register.value = await userStore.register(data);
    } catch (error) {}
    isLoading.value = false;
  };

  return {
    onSubmit,
    register,
    isLoading,
  };
}
