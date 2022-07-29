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
        <input
          id="inputPassword"
          v-model="password"
          :readonly="!isHasRole"
          :disabled="isLoading"
          type="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-lg-8">
        <BaseButton
          :disabled="isLoading"
          class="btn-dark"
          :class="{
            disabled: !isHasRole,
          }"
          type="submit"
          >Сохранить</BaseButton
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/stores/user/types";
import { checkUserRole, updatePassword } from "@/hooks/user";
import { useUserStore } from "@/stores";

const password = ref("");
const { isLoading, fetching } = updatePassword();

interface Props {
  user: User;
}

const authUser = useUserStore();

const props = defineProps<Props>();
const { isHasRole } = checkUserRole(authUser.getUser, "users:password");

const updateUser = async () => {
  await fetching(props.user.id, password.value);
  password.value = "";
};
</script>
