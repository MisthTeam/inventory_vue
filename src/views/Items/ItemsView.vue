<script setup lang="ts">
import { onStartTyping } from "@vueuse/core";
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems, getStatused } from "@/hooks/items";
import { deviceTypes } from "@/utils/helpers";
import TheFilter from "@/components/Items/TheFilter.vue";
import { ItemsFilterParams } from "@/stores/items/types";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import useFilterable from "@/hooks/use/filterable";
import { parse, stringify } from "qs";
import { provide } from "vue";

const user = useUserStore();
const { isHasRole } = checkUserRole(user.getUser, "items:create");
const input = ref<HTMLInputElement | null>(null);

const { itemsRef, isLoading, fetching } = getItems(); // Получение items из БД
const { statusList } = getStatused(); // Получение статусов с бэка
const initialFilters = {
  status: "",
};
const { page, limit, searchQuery, sortedValue, filters } = useFilterable({
  fetching,
  initialFilters,
}); // Хук фильтрации

const route = useRoute();
const router = useRouter();

provide("fetching", fetching);

const onSubmit = () => {
  router.push({
    query: {
      page: page.value,
      limit: limit.value,
      search: searchQuery.value,
      sorted: sortedValue.value,
      filter: stringify(filters.value),
    },
  });
  fetching({
    page: page.value,
    limit: limit.value,
    search: searchQuery.value,
    type: sortedValue.value,
    filter: filters.value,
  });
};

const limitedValues = computed(() => [10, 50, 100]); // Массив значений, можно выбрать по скольки устанавливать лимит

onStartTyping(() => {
  if (input.value) input.value.focus();
});

const updateFilterParams = (newParams: ItemsFilterParams) => (filters.value = { ...filters.value, ...newParams });
watch(sortedValue, (_, oldType) => {
  if (!oldType) return;
  const newParams = {
    volume: "",
    unit: "",
    socket: "",
    firstHhz: "",
    secondHhz: "",
  };
  filters.value = { ...filters.value, ...newParams };
});

watchEffect(() => {
  if (Object.keys(route.query).length) {
    page.value = Number(route.query.page) || 1;
    sortedValue.value = route.query.sorted?.toString() || "";
    searchQuery.value = route.query.search?.toString() || "";
    limit.value = Number(route.query.limit) || 10;
    filters.value = (parse(route.query.filter as string) as ItemsFilterParams) || {
      status: "",
    };
  }
});

onMounted(() => {
  fetching({
    page: page.value,
    limit: limit.value,
    search: searchQuery.value,
    type: sortedValue.value,
    filter: filters.value,
  });
});
</script>
<template>
  <div class="container mt-6">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <router-link
          to="/items/add"
          type="button"
          class="btn w-100 btn-dark"
          :class="{
            disabled: !isHasRole,
          }"
        >
          Добавить комплектующий
        </router-link>
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
        <select v-model="filters.status" :disabled="!statusList.length || isLoading" class="form-select">
          <option selected value="">Все статусы</option>
          <option v-for="option in statusList" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <TheFilter
      v-if="sortedValue"
      :type="sortedValue"
      :filter="filters"
      :specification="itemsRef.specification"
      @updateFilterParams="updateFilterParams"
    />
    <div class="row justify-content-center text-center mt-2">
      <div class="col-lg-8">
        <BaseButton class="btn-dark" type="submit" :disabled="isLoading" @click="onSubmit">Показать</BaseButton>
      </div>
    </div>
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
