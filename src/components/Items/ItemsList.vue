<template>
  <table v-if="items.length" class="table">
    <thead>
      <tr>
        <th scope="col">S/N</th>
        <th scope="col">Тип</th>
        <th scope="col">Инфо</th>
      </tr>
    </thead>
    <tbody>
      <BaseItem v-for="item in items" :key="item.id" :item="item" />
    </tbody>
  </table>
  <div v-else class="text-center">
    <h5>Комплектующих нету</h5>
  </div>
</template>
<script setup lang="ts">
import BaseItem from "./Item.vue";
import { Item } from "@/stores/items/types";

interface Props {
  items: Array<Item>;
}

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>
