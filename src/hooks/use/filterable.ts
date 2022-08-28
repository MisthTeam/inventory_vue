import { stringify } from "qs";
import { ref, toRefs, watch } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";

interface FilterableProps {
  fetching: (params?: Record<string, any>) => Promise<void>;
  initialFilters?: Record<string, any>;
}

interface FilterableParamsProps {
  page: number;
  searchQuery: string;
  sortedValue: string;
  limit: number;
  filters: Record<string, any>;
}

export default function useFilterable({ fetching, initialFilters }: FilterableProps) {
  const filterableParams = ref<FilterableParamsProps>({
    page: 1,
    searchQuery: "",
    sortedValue: "",
    limit: 10,
    filters: {
      ...initialFilters,
    },
  });

  const router = useRouter();

  const stopPageWatcher = watch(
    () => filterableParams.value.page,
    (newPage) => {
      router.push({
        query: {
          page: newPage,
          limit: filterableParams.value.limit,
          search: filterableParams.value.searchQuery,
          sorted: filterableParams.value.sortedValue,
          filter: stringify(filterableParams.value.filters),
        },
      });
      fetching({
        page: newPage,
        limit: filterableParams.value.limit,
        search: filterableParams.value.searchQuery,
        type: filterableParams.value.sortedValue,
        filter: filterableParams.value.filters,
      });
    },
  );

  const stopLimitWatcher = watch(
    () => filterableParams.value.limit,
    (newLimit) => {
      router.push({
        query: {
          page: filterableParams.value.page,
          limit: newLimit,
          search: filterableParams.value.searchQuery,
          sorted: filterableParams.value.sortedValue,
          filter: stringify(filterableParams.value.filters),
        },
      });
      fetching({
        page: filterableParams.value.page,
        limit: newLimit,
        search: filterableParams.value.searchQuery,
        type: filterableParams.value.sortedValue,
        filter: filterableParams.value.filters,
      });
    },
  );

  onBeforeRouteLeave(() => {
    stopPageWatcher();
    stopLimitWatcher();
  });

  return {
    ...toRefs(filterableParams.value),
  };
}
