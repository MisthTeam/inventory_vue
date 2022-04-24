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
        <tr v-for="item in itemsRef" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.meta.name }}</td>
          <td>{{ item.device.type }}</td>
          <td>14:00 18.04.2022</td>
        </tr>
      </tbody>
    </table>
  </div>
  {{ itemsRef }}
  <router-view />
</template>

<script setup>
import { getItems } from "@/hooks";

const { itemsRef } = getItems();
</script>

<style></style>
