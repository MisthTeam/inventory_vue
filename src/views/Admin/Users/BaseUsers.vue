<template>
  <div class="row justify-content-center">
    <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2 text-center">
      <h4>Пользователи</h4>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-xl-5 col-lg-5 col-md-12 col-12 mt-2">
      <LoadingSpinner v-if="isLoading" />
      <UsersList v-else :users="users" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getUsers } from "@/hooks/user";
import UsersList from "@/components/Admin/Users/UsersList.vue";

const { isLoading, users } = getUsers();
</script>
