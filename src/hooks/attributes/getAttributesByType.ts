import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useItemsStore } from "@/stores";
import { AttributeField } from "@/stores/items/types";

export default function getAttributesByType() {
  const isLoading = ref(false);
  const attributes = ref<Array<AttributeField>>([]);
  const toast = useToast();
  const itemsStore = useItemsStore();

  const getAttribute = async (device_type: string) => {
    isLoading.value = true;
    try {
      attributes.value = await itemsStore.getAttributesByType(device_type);
    } catch (error) {
      toast.error("Произошла ошибка при получении данных атрибутов. Попробуйте позже");
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
