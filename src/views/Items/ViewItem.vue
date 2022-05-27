<script setup>
import { deleteItem, editItem, getItem } from "@/hooks/items";
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
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div
      v-if="itemRef && !isLoading"
      class="row justify-content-center align-items-center vh-100"
    >
      <div v-if="isHasRole" class="row justify-content-center">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <button
            v-if="!isEditing"
            type="button"
            class="btn btn-block btn-warning"
            :disabled="isEditing"
            @click="isEditing = !isEditing"
          >
            <b>Изменить</b>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-block btn-success"
            :disabled="isUpdateLoading"
            @click="(event) => editIt(itemRef.id, itemRef, event)"
          >
            <span
              v-if="isUpdateLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span>Сохранить</span>
          </button>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-md-0 mt-2">
          <button
            type="button"
            class="btn btn-block btn-danger"
            :disabled="isDeleteLoading"
            @click="deleteIt(itemRef.id)"
          >
            <span
              v-if="isDeleteLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <b>Удалить</b>
          </button>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-3">
          <ItemsFields v-model="itemRef.meta.name" :item="itemRef" :disabled="!isEditing" />
          <AttributesList
            :attributes="itemRef.attributes"
            :disabled="!isEditing"
          />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected value="">
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
      </div>
    </div>
    <div
      v-else-if="!itemRef && !isLoading"
      class="row justify-content-center align-items-center vh-100"
    >
      <div class="col-12 text-center">
        <h2>Предмета нету</h2>
      </div>
    </div>
  </div>
</template>
