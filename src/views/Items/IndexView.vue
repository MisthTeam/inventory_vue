<script setup>
import ItemsList from "@/components/Items/ItemsList.vue";
import { getItems, useSearchItems, useSortedItems } from "@/hooks/items";
import { types } from "@/utils/helpers";
const { itemsRef, isLoading } = getItems(); // Получение items из БД
const { sortedValue, sortedItems } = useSortedItems(itemsRef); // Сортировка по выбранному селектору
const { searchQuery, searchedItems } = useSearchItems(sortedItems); // Фильтрация по имени
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container mt-6" v-if="itemsRef && !isLoading">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <router-link
          :to="{ path: `/items/add` }"
          type="button"
          class="btn btn-block btn-dark"
        >
          Добавить комплектующий
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <BaseSelector v-model="sortedValue" :options="types" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <ItemsList :items="searchedItems" v-if="searchedItems.length" />
        <div v-else class="text-center">
          <h5>Данных комплектующих ещё нету</h5>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>
