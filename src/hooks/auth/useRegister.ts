import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registerUserParams } from "@/stores/user/types";

export default function useRegister() {
  const userStore = useUserStore();
  const router = useRouter();
  const isLoading = ref(false);

  const onSubmit = async (data: registerUserParams) => {
    const user: registerUserParams = {
      login: data.login,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    try {
      isLoading.value = true;
      await userStore.register(user);
      router.push({
        name: "Dashboard",
      });
    } catch (error) {}
    isLoading.value = false;
  };

  return {
    onSubmit,
    isLoading,
  };
}
