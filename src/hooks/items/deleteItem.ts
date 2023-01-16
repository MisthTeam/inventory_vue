import { ref } from "vue";
import { useItemsStore } from "@/stores";
import { useRouter } from "vue-router";

export default function deleteItem() {
  const isLoading = ref(false);
  const route = useRouter();
  const itemsStore = useItemsStore();

  const deleteIt = async (id: number) => {
    isLoading.value = true;

    await itemsStore.deleteItem(id);
    route.push("/items");

    isLoading.value = false;
  };
  return {
    isDeleteLoading: isLoading,
    deleteIt,
  };
}
