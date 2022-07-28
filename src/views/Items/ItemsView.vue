<script setup lang="ts">
import { onStartTyping } from "@vueuse/core";
import { ref, watch, computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems, getStatused } from "@/hooks/items";
import { deviceTypes } from "@/utils/helpers";
import TheFilter from "@/components/Items/TheFilter.vue";
import { fetchItemsParams, ItemsFilterParams } from "@/stores/items/types";

const input = ref<HTMLInputElement | null>(null);
const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.search?.toString() || ""); // Фильтрация по названию
const sortedValue = ref(route.query.sorted?.toString() || ""); // Сортировка по выбранному селектору
const statusValue = ref<string | number>(""); // Сортировка по статусу
const page = ref(Number(route.query.page) || 1); // Страница на которой сейчас
const limit = ref(Number(route.query.limit) || 10); // Лимит предметов на стр
const filterParams = ref<ItemsFilterParams | null>(null); // Параметры для фильтрации

const params = computed<fetchItemsParams>(() => ({
  page: page.value,
  limit: limit.value,
  search: searchQuery.value,
  type: sortedValue.value,
  filter: filterParams.value,
})); // Параметры

const limitedValues = computed(() => [10, 50, 100]); // Массив значений, можно выбрать по скольки устанавливать лимит

const { itemsRef, isLoading, fetching } = getItems(); // Получение items из БД
const { statusList } = getStatused(); // Получение статусов с бэка

onStartTyping(() => {
  if (input.value) input.value?.focus();
});

const updateFilterParams = (newParams: ItemsFilterParams) => (filterParams.value = newParams);

watch(
  () => statusValue.value,
  (value) => {
    if (!statusList.value.length) return;
    filterParams.value = { ...filterParams.value, status: value };
  },
);

watch(
  [page, limit, searchQuery, sortedValue],
  ([newPage, newLimit, newSearch, newSorted], [oldPage, _, oldSearch, oldSorted]) => {
    if (!newSorted && filterParams.value) filterParams.value = null;

    if (route.name !== "Items") return;
    router.push({
      query: {
        sorted: newSorted,
        search: newSearch,
        page: newPage,
        limit: newLimit,
      },
    });

    fetching(params.value);
  },
);

watch(
  () => filterParams.value,
  (newValue) => {
    if (!newValue) return;

    fetching(params.value);
  },
);

watchEffect(() => {
  page.value = Number(route.query?.page || 1);
  sortedValue.value = String(route.query?.sorted || "");
  searchQuery.value = String(route.query?.search || "");
  limit.value = Number(route.query?.limit || 10);
});

onMounted(() => {
  fetching(params.value);
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
        <BaseSelector v-model="sortedValue" :disabled="isLoading" :options="deviceTypes.map((t) => t.type)" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          ref="input"
          v-model.lazy="searchQuery"
          :disabled="isLoading"
          type="text"
          class="form-control"
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-2">
        <select v-model="statusValue" :disabled="!statusList.length || isLoading" class="form-select">
          <option selected value="">Все статусы</option>
          <option v-for="option in statusList" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
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
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12">
        <BasePagination
          v-model="page"
          :disabled="isLoading"
          :current-page="page"
          :totalPages="itemsRef.meta?.last_page || 1"
        />
      </div>
      <div class="col-xl-1 col-lg-2 col-md-2 col-sm-4 col-4">
        <select v-model="limit" :disabled="isLoading" class="form-select">
          <option v-for="limVal in limitedValues" :key="limVal" :value="limVal">
            {{ limVal }}
          </option>
          <option value="50000">all</option>
        </select>
      </div>
    </div>
  </div>
</template>
