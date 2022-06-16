<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="row justify-content-center">
        <button @click="click">dsds</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
const click = async () => {
  const response = await api.post<ApiResponse>("items/test", {
    test: "test",
  });
  console.log(response);
};
</script>
