<template>
  <div class="container mt-6" v-if="itemsRef">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Тип устройства</th>
          <th scope="col">Дата добавления</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>ЖД</td>
          <td>HDD</td>
          <td>14:00 18.04.2022</td>
        </tr>
      </tbody>
    </table>
  </div>
  {{ itemsRef }}
</template>

<script setup>
import useItemsStore from "@/stores/items";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const itemsStore = useItemsStore();
const itemsRef = storeToRefs(itemsStore).items;
const fetching = async () => {
  try {
    const items = await itemsStore.getItems();
    itemsRef.value = items;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetching);
</script>

<style></style>
