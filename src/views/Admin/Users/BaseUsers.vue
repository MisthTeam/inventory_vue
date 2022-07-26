<template>
  <div class="row justify-content-center">
    <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2 text-center">
      <h4>Пользователи</h4>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-xl-5 col-lg-5 col-md-12 col-12 mt-2">
      <BaseButton
        type="button"
        class="w-100 btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        :disabled="isRegisterLoading"
        @click="openModal"
      >
        Добавить пользователя
      </BaseButton>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-xl-5 col-lg-5 col-md-12 col-12 mt-2">
      <LoadingSpinner v-if="isLoading || isRegisterLoading" />
      <UsersList v-else :users="users" />
    </div>
  </div>
  <BaseModal name="Добавление пользователя" :isOpen="isOpenModal" @close="modalCancel" @ok="modalOk">
    <template #default>
      <form @submit.prevent="modalOk">
        <div class="row g-2 justify-content-center">
          <div class="col-8">
            <div class="form-floating mb-1">
              <input id="floatingInput" type="email" class="form-control" placeholder="name@example.com" />
              <label for="floatingInput">Эл. почта</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input id="floatingInput" type="text" class="form-control" placeholder="name@example.com" />
              <label for="floatingInput">Логин</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input id="floatingInput" type="password" class="form-control" placeholder="name@example.com" />
              <label for="floatingInput">Пароль</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input id="floatingInput" type="password" class="form-control" placeholder="name@example.com" />
              <label for="floatingInput">Подтверждение пароля</label>
            </div>
          </div>
        </div>
      </form>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { getUsers } from "@/hooks/user";
import UsersList from "@/components/Admin/Users/UsersList.vue";
import { ref, shallowRef, watch } from "vue";
import useRegister from "@/hooks/auth/useRegister";

const initialDTO = {
  login: "",
  password: "",
  email: "",
  password_confirmation: "",
};

const dto = shallowRef<typeof initialDTO>(JSON.parse(JSON.stringify(initialDTO)));

const { isLoading, users } = getUsers();
const { isLoading: isRegisterLoading, onSubmit, register } = useRegister();

const isOpenModal = ref(false);

const openModal = () => {
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
    dto.value = { ...initialDTO };
  }
};

const modalOk = () => onSubmit(dto.value);

watch(register, (value) => {
  if (value) {
    users.value.push(value);
    register.value = null;
  }
});
</script>
