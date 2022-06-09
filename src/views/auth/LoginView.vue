<script setup lang="ts">
import { ref } from "vue";
import { useLogin } from "@/hooks/auth";
const { isLoading, onSubmit } = useLogin();
const login = ref("");
const password = ref("");
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 100vh">
      <div class="col-4">
        <div class="card shadow-lg">
          <div class="card-body">
            <h4 class="card-title text-center">Вход</h4>
            <form @submit.prevent="onSubmit({ login, password })">
              <div class="form-group">
                <label class="form-label">Логин</label>
                <input v-model="login" type="text" class="form-control" required name="login" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" required name="password" />
              </div>
              <BaseButton type="submit" :disabled="isLoading" class="btn-primary w-100 mt-3"> Войти </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
