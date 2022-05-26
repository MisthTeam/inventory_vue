import { useUserStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function useLogin() {
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const isLoading = ref(false);

  const onSubmit = async ({ login, password }) => {
    try {
      isLoading.value = true;
      await userStore.login({ login, password });
      const redirectPath = route.query?.redirect || "/";
      router.push(redirectPath);
    } catch ({ response }) {
      if (response?.data) {
        toast.error(response.data.error);
      }
    }
    isLoading.value = false;
  };

  return {
    onSubmit,
    isLoading,
  };
}
