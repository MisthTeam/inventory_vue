import { onMounted, ref } from "vue";
import { api } from "@/utils/api";
import { useToast } from "vue-toastification";

export default function getAttributes() {
  const isLoading = ref(true);
  const attributes = ref(null);
  const toast = useToast();
  const fetching = async () => {
    try {
      const { response } = api.get("attr");
      attributes.value = response;
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.log(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    attributes,
    isLoading,
  };
}
