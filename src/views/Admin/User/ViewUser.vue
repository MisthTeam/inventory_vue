<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col mt-6 ml-c">
        <LoadingSpinner v-if="isLoading" />
        <BaseUser v-else :user="user" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getUser } from "@/hooks/user";
import { useRoute } from "vue-router";
import BaseUser from "@/components/Admin/User/BaseUser.vue";

const route = useRoute();

const { isLoading, user } = getUser(Number(route.params?.id));
</script>
