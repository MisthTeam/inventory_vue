<script setup>
import { getItems } from "@/hooks";
import { convertTime } from "@/utils/helpers";

const { itemsRef } = getItems();
</script>
<template>
  <div class="container mt-6" v-if="itemsRef">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Тип устройства</th>
          <th scope="col">Пользователь</th>
          <th scope="col">Дата добавления</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemsRef" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.meta.name }}</td>
          <td>{{ item.device.type }}</td>
          <td>{{ item.user.login }}</td>
          <td>
            {{ convertTime(item.created_at) }}
          </td>
          <td>
            <router-link :to="{ path: `/item/${item.id}` }"> View </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <router-view />
</template>
