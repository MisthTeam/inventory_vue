<script setup>
import Items from "@/components/Items/Items.vue";
import { getItems, useSearch, useSortedItems } from "@/hooks";
import { types } from "@/utils/helpers";
const { itemsRef } = getItems(); // Получение items из БД
const { sortedValue, sortedItems } = useSortedItems(itemsRef); // Сортировка по выбранному селектору
const { searchQuery, searchedItems } = useSearch(sortedItems); // Фильтрация по имени
</script>
<template>
  <div class="container mt-6" v-if="itemsRef">
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
        <Selector v-model="sortedValue" :options="types" />
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
        <Items :items="searchedItems" v-if="searchedItems.length" />
        <div v-else class="text-center">
          <h5>Данных комплектующих ещё нету</h5>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>
