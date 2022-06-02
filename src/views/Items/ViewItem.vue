<script setup>
import { deleteItem, editItem, getItem, getStatused } from "@/hooks/items";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();
const isEditing = ref(false);
const { itemRef, isLoading } = getItem(route.params.id);
const { isHasRole } = checkUserRole(userStore.getUser, "items:control");
const { deleteIt, isDeleteLoading } = deleteItem();
const { isUpdateLoading, editIt } = editItem(isEditing);
const { statusList } = getStatused();
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="container">
    <div
      v-if="itemRef && statusList"
      class="row justify-content-center align-items-center vh-100"
    >
      <div v-if="isHasRole" class="row justify-content-center">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <BaseButton
            v-if="!isEditing"
            @clickButton="() => (isEditing = !isEditing)"
            class="w-100 btn-warning"
          >
            Изменить
          </BaseButton>
          <BaseButton
            v-else
            :disabled="isUpdateLoading"
            @clickButton="editIt(itemRef.id, itemRef)"
            class="w-100 btn-success"
          >
            Сохранить
          </BaseButton>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-md-0 mt-2">
          <BaseButton
            :disabled="isDeleteLoading"
            @clickButton="deleteIt(itemRef.id)"
            class="w-100 btn-danger"
          >
            Удалить
          </BaseButton>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-3">
          <ItemsFields
            v-model="itemRef.meta.name"
            :item="itemRef"
            :disabled="!isEditing"
          />
          <AttributesList
            :attributes="itemRef.attributes"
            :disabled="!isEditing"
          />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected :value="itemRef.device.type">
                {{ itemRef.device.type }}
              </option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <SpecFields
            disabled
            :option="itemRef.device.type"
            :device="itemRef.device"
          />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              :disabled="!isEditing"
              aria-label="Change status"
              v-model="itemRef.status.id"
            >
              <option
                v-for="status in statusList"
                :key="status.id"
                :value="status.id"
                :selected="status.id === itemRef.status.id"
                :disabled="status.id === itemRef.status.id"
              >
                {{ status.name }}
              </option>
            </select>
            <label for="floatingInput">Change status</label>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row justify-content-center align-items-center vh-100">
      <div class="col-12 text-center">
        <h2>Предмета нету</h2>
      </div>
    </div>
  </div>
</template>
