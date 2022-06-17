import { useUserStore } from "@/stores";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { loginUserParams } from "@/stores/user/types";

export default function useLogin() {
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref(false);

  const onSubmit = async (params: loginUserParams) => {
    try {
      isLoading.value = true;
      await userStore.login({ ...params });
      const redirect = (route.query?.redirect as LocationQueryValue) || "/";
      router.push(redirect);
    } catch (error) {}
    isLoading.value = false;
  };

  return {
    onSubmit,
    isLoading,
  };
}
