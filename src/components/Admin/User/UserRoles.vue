<template>
  <h4>Права</h4>
  <LoadingSpinner v-if="isLoading" />
  <div v-for="role in roles" v-else :key="role.id" class="form-check form-switch">
    <input
      :id="role.name"
      v-model="dto"
      class="form-check-input"
      type="checkbox"
      role="switch"
      name="test"
      :value="role.value"
      :checked="user.roles.includes(role.value)"
    />
    <label class="form-check-label" :for="role.name">{{ role.name }}</label>
  </div>
  <div class="row justify-content-center text-center">
    <div class="col-lg-8">
      <BaseButton class="btn-dark" :disabled="isSetLoading" @click="addUserRoles">Сохранить</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoles, setRoles } from "@/hooks/user";
import { User } from "@/stores/user/types";
import { shallowRef } from "vue";

interface Props {
  user: User;
}

const { isLoading, roles } = getRoles();
const props = defineProps<Props>();
const dto = shallowRef(props.user.roles);
const { setRolesToUser, isLoading: isSetLoading } = setRoles();

const addUserRoles = () => {
  const rolesId = dto.value.map((v) => roles.value.find((r) => r.value === v)?.id) as number[];
  setRolesToUser(rolesId);
};
</script>
