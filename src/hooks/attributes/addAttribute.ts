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
    isLoading.value = true;
    attribute.value = await attributesStore.addAttribute(attr);

    toast.success("Дополнительное поле добавлено");

    isLoading.value = false;

    return attribute.value;
  };

  return {
    attribute,
    adding,
    isLoading,
  };
}
