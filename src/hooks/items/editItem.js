import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";

export default function editItem(isEditing) {
  const isLoading = ref(false);
  const itemsStore = useItemsStore();
  const toast = useToast();
  const editIt = async (id, itemRef, event) => {
    if (!isEditing.value) {
      event.stopPropagation();
    }
    isLoading.value = true;
    try {
      await itemsStore.editItem(id, itemRef);
      toast.success("Комплектующий изменён");
      isEditing.value = false;
    } catch (error) {
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
