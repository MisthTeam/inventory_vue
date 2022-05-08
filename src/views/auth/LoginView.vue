<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-4">
        <div class="card shadow-lg">
          <div class="card-body">
            <h4 class="card-title text-center">Вход</h4>
            <Form @submit="onSubmit" :validation-schema="ValidSchema">
              <div class="form-group">
                <label class="form-label">Логин</label>
                <Field type="text" class="form-control" name="login" />
                <ErrorMessage name="login" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password</label>
                <Field type="password" class="form-control" name="password" />
                <ErrorMessage name="password" />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-block mt-3"
                :disabled="isLoading"
              >
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                <span v-if="!isLoading">Войти</span>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from "@/hooks/auth";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const ValidSchema = yup.object({
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});
const { isLoading, onSubmit } = useLogin();
</script>
