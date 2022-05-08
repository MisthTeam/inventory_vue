<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-4">
        <div class="card shadow-lg">
          <div class="card-body">
            <h4 class="card-title text-center">Регистрация</h4>
            <Form @submit="onSubmit" :validation-schema="ValidSchema">
              <div class="form-group mt-2">
                <label class="form-label">Login</label>
                <Field type="text" class="form-control" name="login" />
                <ErrorMessage name="login" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Email address</label>
                <Field type="email" class="form-control" name="email" />
                <ErrorMessage name="email" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password</label>
                <Field type="password" class="form-control" name="password" />
                <ErrorMessage name="password" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Password confirmation</label>
                <Field
                  type="password"
                  class="form-control"
                  name="password_confirmation"
                />
                <ErrorMessage name="password_confirmation" />
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
                <span v-if="!isLoading">Зарегистрироваться</span>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegister } from "@/hooks/auth";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const ValidSchema = yup.object({
  login: yup.string().required("Введите логин"),
  email: yup
    .string()
    .required("Введите email")
    .email("Введите корректный email адресс"),
  password: yup.string().required("Введите пароль"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Введите повторный пароль"),
});
const { isLoading, onSubmit } = useRegister();
</script>
