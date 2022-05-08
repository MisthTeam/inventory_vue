import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";

export default function editItem(isEditing) {
  const isLoading = ref(false);
  const itemsStore = useItemsStore();
  const toast = useToast();
  const editIt = async (id, itemRef) => {
    isLoading.value = true;
    itemRef.value = await itemsStore.editItem(id, itemRef);
    toast.success("Комплектующий изменён");
    isEditing.value = false;
    isLoading.value = false;
  };
  return {
    isUpdateLoading: isLoading,
    isEditing,
    editIt,
  };
}
