<script setup lang="ts">
import { onStartTyping } from "@vueuse/core";
import { ref, watch, computed, onMounted } from "vue";

import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems } from "@/hooks/items";
import { deviceTypes } from "@/utils/helpers";
import TheFilter from "@/components/Items/TheFilter.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { fetchItemsParams, ItemsFilterParams } from "@/stores/items/types";

const input = ref<HTMLInputElement | null>(null);
const route = useRoute();
const searchQuery = ref(route.query.search?.toString() || ""); // Фильтрация по названию
const sortedValue = ref(route.query.sorted?.toString() || ""); // Сортировка по выбранному селектору
const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 10);
const filterParams = ref<ItemsFilterParams | null>(null);

const params = computed<fetchItemsParams>(() => ({
  page: page.value,
  limit: limit.value,
  search: searchQuery.value,
  type: sortedValue.value,
  filter: filterParams.value,
})); // Параметры

const { itemsRef, isLoading, fetching } = getItems(); // Получение items из БД

onStartTyping(() => {
  if (input.value) input.value?.focus();
});

const updateFilterParams = (newParams: ItemsFilterParams) => (filterParams.value = newParams);

watch(
  [page, limit, searchQuery, sortedValue],
  ([newPage, newLimit, newSearch, newSorted], [oldPage, _, oldSearch, oldSorted]) => {
    if (!newSorted && filterParams.value) filterParams.value = null;

    if (newSorted != oldSorted || newSearch != oldSearch) {
      router.push({
        path: route.path,
        query: {
          sorted: newSorted,
          search: newSearch,
          page: 1,
          limit: newLimit,
        },
      });
    } else {
      router.push({
        path: route.path,
        query: {
          sorted: newSorted,
          search: newSearch,
          page: newPage,
          limit: newLimit,
        },
      });
    }

    fetching(params.value);
  },
);

watch(
  () => filterParams.value,
  (newValue) => {
    if (!newValue) return;

    if (!sortedValue.value) filterParams.value = null;

    fetching(params.value);
  },
);
watch(
  () => route.query,
  (queryParams) => {
    page.value = Number(queryParams.page || 1);
    sortedValue.value = String(queryParams.sorted || "");
    searchQuery.value = String(queryParams.search || "");
    limit.value = Number(queryParams.limit || 10);
  },
  { deep: true },
);

onMounted(() => {
  fetching(params.value);
  deviceTypes.push({
    id: 9,
    type: "STATUS",
    specification: [],
  });
});
</script>
<template>
  <div class="container mt-6">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <router-link to="/items/add" type="button" class="btn w-100 btn-dark"> Добавить комплектующий </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <BaseSelector v-model="sortedValue" :options="deviceTypes.map((t) => t.type)" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          ref="input"
          v-model.lazy="searchQuery"
          type="text"
          class="form-control"
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <TheFilter
      v-if="sortedValue"
      :disabled="isLoading"
      :value="sortedValue"
      :params="params"
      :specification="itemsRef.specification"
      @updateFilterParams="updateFilterParams"
    />
    <div class="row justify-content-center mt-2">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <LoadingSpinner v-if="isLoading" />
        <ItemsList v-else :items="itemsRef.data" />
        <BasePagination v-model="page" :current-page="page" :totalPages="itemsRef.meta?.last_page || 1" />
      </div>
    </div>
  </div>
</template>
