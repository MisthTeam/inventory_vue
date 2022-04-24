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
        </tr>
      </tbody>
    </table>
    <!-- {{ DevicesRef }} -->
  </div>
  <router-view />
</template>

<script setup>
import { getDevices, getItems } from "@/hooks";
// import { getItems } from "@/hooks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const { itemsRef } = getItems();
const { DevicesRef } = getDevices();
console.log(DevicesRef);

const convertTime = (time) =>
  format(new Date(time.replace(" ", "T")), "Q MMMM yyyy", {
    locale: ru,
  });
</script>

<style></style>
