<script setup>
import { getItem, deleteItem, editItem } from "@/hooks/items";
import { checkUserRole } from "@/hooks/user";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { ref } from "vue";

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
  <div class="container mt-6" v-if="itemRef && !isLoading">
    <div class="row">
      <div class="row justify-content-center" v-if="isHasRole">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <button
            v-if="!isEditing"
            type="button"
            class="btn btn-block btn-warning"
            @click="isEditing = !isEditing"
            :disabled="isEditing"
          >
            <b>Изменить</b>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-block btn-success"
            @click="editIt(itemRef.id, itemRef)"
            :disabled="isUpdateLoading"
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
            @click="deleteIt(itemRef.id)"
            :disabled="isDeleteLoading"
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
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <AddItemsFields :disabled="!isEditing" v-model="itemRef.meta.name" />
          <div
            class="form-floating mb-3"
            v-for="(attribute, i) in itemRef.attributes"
            :key="attribute.id"
          >
            <AddAttributeFields
              :disabled="!isEditing"
              :attribute="attribute"
              v-model="itemRef.attributes[i]"
            />
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected value="">{{ itemRef.device.type }}</option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <AddSpecFields
            :dto="{}"
            :option="itemRef.device.type"
            :device="itemRef.device"
          />
        </div>
      </div>
    </div>
    {{ itemRef.attributes }}
  </div>
  <div v-else-if="!itemRef && !isLoading" class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h2>Предмета нету</h2>
      </div>
    </div>
  </div>
</template>
