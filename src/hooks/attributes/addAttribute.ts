import { ref } from "vue";
import { useToast } from "vue-toastification";
import { AddAttributeDTO, Attribute } from "@/stores/attrubutes/types";
import { useAttributesStore } from "@/stores";

export default function addAttribute() {
  const isLoading = ref(false);
  const attribute = ref<Attribute>();
  const attributesStore = useAttributesStore();
  const toast = useToast();
  const adding = async (attr: AddAttributeDTO) => {
    try {
      isLoading.value = true;
      attribute.value = await attributesStore.addAttribute(attr);
      toast.success("Дополнительное поле добавлено");
      return attribute.value;
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    attribute,
    adding,
    isLoading,
  };
}
