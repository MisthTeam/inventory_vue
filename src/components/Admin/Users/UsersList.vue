<template>
  <table v-if="users.length" class="table">
    <thead>
      <tr>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <UserItem v-for="user in users" :key="user.id" :user="user" />
    </tbody>
  </table>
  <div v-else class="text-center">
    <h5>Пользователей нету</h5>
  </div>
</template>
<script lang="ts" setup>
import { User } from "@/stores/user/types";
import UserItem from "./UserItem.vue";

interface Props {
  users: User[];
}

defineProps<Props>();
</script>

<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
