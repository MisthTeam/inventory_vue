import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";
import { array_column } from "@/utils/helpers";
import { useRouter } from "vue-router";

export default function addItem(dto, attributes) {
  const isLoading = ref(false);
  const itemStore = useItemsStore();
  const toast = useToast();
  const router = useRouter();
  const addIt = async () => {
    try {
      isLoading.value = true;
      const item = await itemStore.createItem({
        ...dto.value,
        attr: array_column(attributes.value, "value", "id"),
      });
      router.push(`/items/${item.id}`);
      toast.success("Комплектующий добавлен");
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка. Повторите позже");
    }
    isLoading.value = false;
  };
  return {
    isAddLoading: isLoading,
    addIt,
  };
}
