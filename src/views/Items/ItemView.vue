<script setup lang="ts">
import { deleteItem, editItem, getItem, getStatused } from "@/hooks/items";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { UpdateAttr } from "@/stores/attrubutes/types";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { Item } from "@/stores/items/types";

const route = useRoute();
const isEditing = ref(false);

const user = useUserStore();
const { isHasRole: isHasDelete } = checkUserRole(user.getUser, "items:delete");
const { isHasRole: isHasEdit } = checkUserRole(user.getUser, "items:edit");
const { item, isLoading } = getItem(route.params.id as string);
const { deleteIt, isDeleteLoading } = deleteItem();
const { isUpdateLoading, editIt } = editItem(isEditing);
const { statusList } = getStatused();
const DTO = ref<Item>({} as Item);

// Изменение атрибутов
const changeAttributes = ({ attrId, value: newValue }: UpdateAttr) => {
  const attr = DTO.value.attributes.find((attr) => attr.id === attrId);
  if (attr) {
    Object.assign(attr, {
      value: newValue,
    });
  }
};

watch(item, (newItem) => {
  DTO.value = JSON.parse(JSON.stringify(newItem));
});
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="container">
    <div v-if="item && statusList" class="row justify-content-center align-items-center vh-100">
      <div class="row justify-content-center">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <BaseButton
            v-if="!isEditing"
            class="w-100 btn-warning"
            :class="{
              disabled: !isHasEdit,
            }"
            @clickButton="() => (isEditing = !isEditing)"
          >
            Изменить
          </BaseButton>
          <BaseButton v-else :disabled="isUpdateLoading" class="w-100 btn-success" @clickButton="editIt(DTO.id, DTO)">
            Сохранить
          </BaseButton>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-md-0 mt-2">
          <BaseButton
            :disabled="isDeleteLoading"
            class="w-100 btn-danger"
            :class="{
              disabled: !isHasDelete,
            }"
            @clickButton="deleteIt(DTO.id)"
          >
            Удалить
          </BaseButton>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-3">
          <ItemsFields v-model="DTO.meta.name" :item="item" :disabled="!isEditing" />
          <AttributesList :attributes="DTO.attributes" :disabled="!isEditing" @updateAttr="changeAttributes" />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected :value="DTO.device.type">
                {{ DTO.device.type }}
              </option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <SpecificationsList disabled :type="DTO.device.type" :device="DTO.device" />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select v-model="DTO.status.id" class="form-select" :disabled="!isEditing" aria-label="Change status">
              <option
                v-for="status in statusList"
                :key="status.id"
                :value="status.id"
                :selected="status.id === item.status.id"
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
