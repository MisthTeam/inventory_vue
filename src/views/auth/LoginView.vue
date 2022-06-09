<script setup lang="ts">
import { useLogin } from "@/hooks/auth";
import { loginUserParams } from "@/stores/user/types";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useForm } from "vee-validate";
import * as yup from "yup";
const ValidSchema = yup.object({
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});
const { isLoading, onSubmit } = useLogin();
const { handleSubmit } = useForm();

// const onSubmit = async (params) => {
//   console.log(params);
// };
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 100vh">
      <div class="col-4">
        <div class="card shadow-lg">
          <div class="card-body">
            <h4 class="card-title text-center">Вход</h4>
            <Form :validation-schema="ValidSchema" @submit="onSubmit">
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
              <BaseButton type="submit" :disabled="isLoading" class="btn-primary w-100 mt-3"> Войти </BaseButton>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
