<template>
  <h4>Параметры</h4>
  <form @submit.prevent="updateUser">
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input id="staticEmail" type="text" readonly class="form-control-plaintext" :value="user.email" />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input id="inputPassword" v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-lg-8">
        <button class="btn btn-dark" type="submit">Сохранить</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/stores/user/types";

const password = ref("");

interface Props {
  user: User;
}

defineProps<Props>();

const updateUser = () => {
  console.log(password.value);
};
</script>
