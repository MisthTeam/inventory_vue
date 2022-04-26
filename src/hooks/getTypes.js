import { onMounted, ref } from "vue";
import { api } from "@/utils/api";

export default function getTypes() {
  const typesRef = ref(null);
  const fetching = async () => {
    try {
      const { types } = await api.get("/api/devices/fields");
      typesRef.value = types;
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(fetching);

  return {
    typesRef,
  };
}
