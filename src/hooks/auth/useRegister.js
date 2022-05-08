import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function useRegister() {
  const userStore = useUserStore();
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const toast = useToast();
  const isLoading = ref(false);

  const onSubmit = async (data, { setErrors }) => {
    const user = {
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
    } catch (error) {
      setErrors(error.errors);
    }
    isLoading.value = false;
  };

  return {
    onSubmit,
    isLoading,
  };
}
