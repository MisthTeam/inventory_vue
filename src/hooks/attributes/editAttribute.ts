import { ref } from "vue";
import { useAttributesStore } from "@/stores";
import { editAttributeDTO } from "@/stores/attrubutes/types";

export default function editAttribute() {
  const isLoading = ref(false);
  const attributesStore = useAttributesStore();

  const editing = async ({ id, device_type, meta, name }: editAttributeDTO) => {
    isLoading.value = true;
    await attributesStore.editAttribute({ id, device_type, meta, name });
    isLoading.value = false;
  };

  return {
    isLoading,
    editing,
  };
}
