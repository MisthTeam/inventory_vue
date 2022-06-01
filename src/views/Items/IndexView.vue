<script setup>
import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems, useSearchItems, useSortedItems } from "@/hooks/items";
import { deviceTypes } from "@/utils/helpers";
const { itemsRef, isLoading } = getItems(); // Получение items из БД
const { sortedValue, sortedItems } = useSortedItems(itemsRef); // Сортировка по выбранному селектору
const { searchQuery, searchedItems } = useSearchItems(sortedItems); // Фильтрация по имени
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-if="itemsRef && !isLoading" class="container mt-6">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <router-link to="/items/add" type="button" class="btn w-100 btn-dark">
          Добавить комплектующий
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <BaseSelector
          v-model="sortedValue"
          :options="deviceTypes.map((t) => t.type)"
        />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <ItemsList :items="searchedItems" />
      </div>
    </div>
  </div>
</template>
