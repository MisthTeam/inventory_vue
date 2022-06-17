<script setup lang="ts">
import { ref } from "vue";
import { useRegister } from "@/hooks/auth";

const login = ref("");
const password = ref("");
const email = ref("");
const password_confirmation = ref("");

const { isLoading, onSubmit } = useRegister();
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 100vh">
      <div class="col-4">
        <div class="card shadow-lg">
          <div class="card-body">
            <h4 class="card-title text-center">Регистрация</h4>
            <form @submit.prevent="onSubmit({ login, password, email, password_confirmation })">
              <div class="form-group mt-2">
                <label class="form-label">Login</label>
                <input v-model="login" type="text" class="form-control" required name="login" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" required name="email" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" required class="form-control" name="password" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password confirmation</label>
                <input
                  v-model="password_confirmation"
                  required
                  type="password"
                  class="form-control"
                  name="password_confirmation"
                />
              </div>
              <BaseButton type="submit" :disabled="isLoading" class="btn-primary w-100 mt-3">
                Зарегистрироваться
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
