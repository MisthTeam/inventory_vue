import { computed, ref } from "vue";

export default function useSearchItems(sortedItems) {
  const searchQuery = ref("");
  const searchedItems = computed(() => {
    return sortedItems.value.filter((item) => {
      return item.meta?.name
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
  });

  return {
    searchQuery,
    searchedItems,
  };
}
