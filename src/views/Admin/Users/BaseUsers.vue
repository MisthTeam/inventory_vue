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
        :class="{
          disabled: !isHasAddUserRole,
        }"
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
              <input
                id="floatingInputEmail"
                v-model="dto.email"
                type="email"
                class="form-control"
                required
                placeholder="name@example.com"
              />
              <label for="floatingInputEmail">Эл. почта</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input
                id="floatingInputLogin"
                v-model="dto.login"
                type="text"
                class="form-control"
                required
                placeholder="name@example.com"
              />
              <label for="floatingInputLogin">Логин</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input
                id="floatingInputPassword"
                v-model="dto.password"
                type="password"
                class="form-control"
                required
                placeholder="name@example.com"
              />
              <label for="floatingInputPassword">Пароль</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-floating mb-1">
              <input
                id="floatingInputPassword2"
                v-model="dto.password_confirmation"
                type="password"
                class="form-control"
                required
                placeholder="name@example.com"
              />
              <label for="floatingInputPassword2">Подтверждение пароля</label>
            </div>
          </div>
          <BaseButton type="submit" class="btn-success"> Добавить </BaseButton>
        </div>
      </form>
    </template>
    <template #footer="{ closeModal }">
      <button ref="closeBtn" type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
        Отмена
      </button>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { getUsers } from "@/hooks/user";
import UsersList from "@/components/Admin/Users/UsersList.vue";
import { ref, shallowRef, watch } from "vue";
import useRegister from "@/hooks/auth/useRegister";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";

const initialDTO = {
  login: "",
  password: "",
  email: "",
  password_confirmation: "",
};

const user = useUserStore();
const { isHasRole: isHasAddUserRole } = checkUserRole(user.getUser, "users:add");
const { isLoading, users } = getUsers();
const { isLoading: isRegisterLoading, onSubmit, register } = useRegister();

const isOpenModal = ref(false);
const closeBtn = ref<HTMLButtonElement | null>(null);
const dto = shallowRef<typeof initialDTO>({ ...initialDTO });

const openModal = () => {
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
    dto.value = Object.assign({}, initialDTO);
  }
};

const modalOk = () => {
  onSubmit(dto.value);
  modalCancel();
  closeBtn.value?.click();
};

watch(register, (value) => {
  if (value) {
    users.value.push(value);
    register.value = null;
  }
});
</script>
