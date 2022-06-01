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
    try {
      await itemsStore.deleteItem(id);
      route.push("/items");
      toast.success("Комплектующий удален");
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка. Повторите позже");
    }
    isLoading.value = false;
  };
  return {
    isDeleteLoading: isLoading,
    deleteIt,
  };
}
