import { Ref, ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";
import { Item } from "@/stores/items/types";

export default function editItem(isEditing: Ref<boolean>) {
  const isLoading = ref(false);
  const itemsStore = useItemsStore();
  const toast = useToast();
  const editIt = async (id: number, item: Item) => {
    isLoading.value = true;
    try {
      await itemsStore.editItem(id, item);
      isEditing.value = false;
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toast.error("Случилась ошибка при изменении");
    }
    isLoading.value = false;
  };
  return {
    isUpdateLoading: isLoading,
    isEditing,
    editIt,
  };
}
