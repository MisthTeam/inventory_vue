<script setup lang="ts">
import { onStartTyping } from "@vueuse/core";
import { ref, watch, computed } from "vue";

import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems } from "@/hooks/items";
import { deviceTypes } from "@/utils/helpers";
import TheFilter from "@/components/Items/TheFilter.vue";

const input = ref<HTMLInputElement | null>(null);
const searchQuery = ref(""); // Сортировка по выбранному селектору
const sortedValue = ref(""); // Фильтрация по названию
const { itemsRef, isLoading, fetching } = getItems(); // Получение items из БД
const page = ref(itemsRef.value.meta?.current_page || 1);

onStartTyping(() => {
  if (input.value) input.value?.focus();
});
const params = computed(() => ({
  page: page.value,
  limit: 10,
  search: searchQuery.value,
  type: sortedValue.value,
}));

watch([page, sortedValue, searchQuery], () => {
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
        <BaseSelector v-once v-model="sortedValue" :options="deviceTypes.map((t) => t.type)" />
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
      :value="sortedValue"
      :fetching="fetching"
      :params="params"
      :specification="itemsRef.specification"
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
