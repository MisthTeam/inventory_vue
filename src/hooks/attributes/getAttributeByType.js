import { onMounted, ref } from "vue";
import { api } from "@/utils/api";
import { useToast } from "vue-toastification";

export default function getAttributeByType() {
  const isLoading = ref(false);
  const attributes = ref(null);
  const toast = useToast();
  const getAttribute = async (device_type) => {
    isLoading.value = true;
    try {
      const { attrs } = await api.get(`attr/type/${device_type}`);
      attributes.value = attrs;
    } catch (error) {
      toast.error(
        "Произошла ошибка при получении данных атрибутов. Попробуйте позже"
      );
      console.log(error);
    }
    isLoading.value = false;
  };

  return {
    attributes,
    isLoadingAttribute: isLoading,
    getAttribute,
  };
}
