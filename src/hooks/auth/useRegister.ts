import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registerUserParams } from "@/stores/user/types";

export default function useRegister() {
  const userStore = useUserStore();
  const router = useRouter();
  const isLoading = ref(false);

  const onSubmit = async (data: registerUserParams) => {
    try {
      isLoading.value = true;
      await userStore.register(data);
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
