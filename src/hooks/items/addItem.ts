import { Ref, ref } from "vue";
import { useItemsStore } from "@/stores";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { addItemParams } from "@/stores/items/types";

export default function addItem(dto: Ref<addItemParams>) {
  const isLoading = ref(false);
  const itemStore = useItemsStore();
  const toast = useToast();
  const router = useRouter();
  const addIt = async () => {
    try {
      isLoading.value = true;
      const item = await itemStore.createItem({ ...dto.value });
      router.push(`/items/${item.id}`);
      toast.success("Комплектующий добавлен");
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };
  return {
    isAddLoading: isLoading,
    addIt,
  };
}
