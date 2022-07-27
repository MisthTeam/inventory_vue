import { useAttributesStore } from "@/stores";
import { editAttributeDTO } from "@/stores/attrubutes/types";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default function editAttribute() {
  const isLoading = ref(false);
  const toast = useToast();
  const attributesStore = useAttributesStore();

  const editing = async ({ id, device_type, meta, name }: editAttributeDTO) => {
    isLoading.value = true;
    try {
      await attributesStore.editAttribute({ id, device_type, meta, name });
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };

  return {
    isLoading,
    editing,
  };
}
