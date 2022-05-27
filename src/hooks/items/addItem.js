import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";
import { array_column } from "@/utils/helpers";


export default function addItem(dto, attributes) {
  const isLoading = ref(false);
  const itemStore = useItemsStore();
  const toast = useToast();
  const addIt = async () => {
    try {
      isLoading.value = true;
      await itemStore.createItem({
        ...dto.value,
        attr: array_column(attributes.value, "value", "id"),
      });
      toast.success("Комплектующий добавлен");
    } catch (error) {
      console.error(error);
      toast.error(
        "Произошла ошибка, проверьте данные или свяжитесь с администратором"
      );
    }
    isLoading.value = false;
  };
  return {
    isAddLoading: isLoading,
    addIt,
  };
}
