import { onMounted, ref } from "vue";
import { api } from "@/utils/api";

export default function getAttributes() {
  const isLoading = ref(true);
  const attributes = ref(null);
  const fetching = async () => {
    try {
      const { attrs } = api.get("attr");
      attributes.value = attrs;
    } catch (error) {
      console.log(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    attributes,
    isLoading,
  };
}
