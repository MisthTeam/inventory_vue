<template>
  <tr @click="toUser(user.id)">
    <td>{{ user.login }}</td>
    <td>{{ user.email }}</td>
  </tr>
</template>
<script lang="ts" setup>
import { User } from "@/stores/user/types";
import { useRouter } from "vue-router";

interface Props {
  user: User;
}

defineProps<Props>();

const router = useRouter();
const toUser = (id: number) => router.push(`/admin/users/${id}`);
</script>
