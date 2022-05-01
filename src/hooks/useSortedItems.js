import { computed, ref } from "vue";

export default function sortedItems(items) {
  const sortedValue = ref("");
  const sortedItems = computed(() => {
    return [...items.value]?.filter((el) => {
      return el.device.type.indexOf(sortedValue.value) > -1;
    });
  });

  return {
    sortedValue,
    sortedItems,
  };
}
