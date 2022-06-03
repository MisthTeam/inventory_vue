<template>
  <table v-if="items.length" class="table">
    <thead>
      <tr>
        <th scope="col">S/N</th>
        <th scope="col">Тип устройства</th>
        <th scope="col">Инфо</th>
      </tr>
    </thead>
    <tbody>
      <Item v-for="item in items" :key="item.id" :item="item" />
    </tbody>
  </table>
  <div v-else class="text-center">
    <h5>Комплектующих нету</h5>
  </div>
</template>
<script setup>
import Item from "./Item.vue";
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
