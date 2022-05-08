import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default function deleteItem() {
  const isLoading = ref(false);
  const route = useRouter();
  const itemsStore = useItemsStore();
  const toast = useToast();
  const deleteIt = async (id) => {
    isLoading.value = true;
    await itemsStore.deleteItem(id);
    route.push("/items");
    toast.success("Комплектующий удален");
    isLoading.value = false;
  };
  return {
    isDeleteLoading: isLoading,
    deleteIt,
  };
}
