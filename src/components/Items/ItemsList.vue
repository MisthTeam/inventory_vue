<template>
  <table class="table" v-if="items.length">
    <thead>
      <tr>
        <th scope="col">S/N</th>
        <th scope="col">Тип устройства</th>
        <th scope="col">Инфо</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" @click="toItem(item.id)">
        <td>{{ item.meta?.name || "nope" }}</td>
        <td>{{ item.device.type }}</td>
        <td>{{ item.device.specification.volume }}</td>
        <td>{{ item.user.login }}</td>
        <td>
          <!-- {{ convertTime(item.created_at) }} -->
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useRouter } from "vue-router";
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const router = useRouter();
const toItem = (id) => {
  router.push(`/items/${id}`);
};
</script>

<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
