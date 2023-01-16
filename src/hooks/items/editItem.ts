import { Ref, ref } from "vue";
import { useItemsStore } from "@/stores";
import { Item } from "@/stores/items/types";

export default function editItem(isEditing: Ref<boolean>) {
  const isLoading = ref(false);
  const itemsStore = useItemsStore();
  const editIt = async (id: number, item: Item) => {
    isLoading.value = true;
    await itemsStore.editItem(id, item);
    isEditing.value = false;

    isLoading.value = false;
  };
  return {
    isUpdateLoading: isLoading,
    isEditing,
    editIt,
  };
}
