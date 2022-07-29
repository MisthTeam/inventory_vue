<template>
  <div class="row justify-content-center">
    <div class="col-lg-7 col-12">
      <BaseButton
        type="button"
        class="w-100 btn-success"
        :class="{
          disabled: !isAddAttr,
        }"
        :disabled="isLoadingAdding"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="openModal"
      >
        Добавить поле
      </BaseButton>
    </div>
  </div>
  <LoadingSpinner v-if="isLoading" />
  <BaseAttributes v-else :attributes="attributes" />
  <BaseModal name="Добавление атрибута" :isOpen="isOpenModal" @close="modalCancel" @ok="modalOk">
    <template #default>
      <form @submit.prevent="modalOk">
        <div class="row g-2">
          <div class="col-md">
            <div class="form-floating">
              <input id="floatingInputGrid" v-model="dto.name" required type="text" class="form-control" />
              <label for="floatingInputGrid">Название поля</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating">
              <select id="floatingSelectGrid" v-model="dto.device_type" required class="form-select">
                <option selected value="" disabled>Выбор за вами...</option>
                <option v-for="{ type } in deviceTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <label for="floatingInputGrid">Тип девайса</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating">
              <select id="floatingSelectGrid" v-model="dto.meta.type" required class="form-select">
                <option selected value="" disabled>Выбирете...</option>
                <option value="text">text</option>
                <option value="select">select</option>
              </select>
              <label for="floatingSelectGrid">Тип будущего поля</label>
            </div>
          </div>
        </div>
        <div v-if="dto.meta.type === 'select'" class="row">
          <div class="col-md mt-3">
            <TagsInput v-model="dto.meta.list" :customDelimiter="[',', ' ']" />
          </div>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { addAttribute, getAttributes } from "@/hooks/attributes";
import { ref } from "vue";
import BaseAttributes from "@/components/Admin/Attributes/BaseAttributes.vue";
import { AddAttributeDTO } from "@/stores/attrubutes/types";
import { deviceTypes } from "@/utils/helpers";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";

const user = useUserStore();
const { isHasRole: isAddAttr } = checkUserRole(user.getUser, "attr:add");

const initialDTO = {
  name: "",
  device_type: "",
  meta: {
    type: "",
    list: [] as string[],
  },
};

const { adding, isLoading: isLoadingAdding } = addAttribute();
const isOpenModal = ref(false);
const dto = ref<AddAttributeDTO>(JSON.parse(JSON.stringify(initialDTO)));
const { isLoading, attributes } = getAttributes();

const openModal = () => {
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
    dto.value = { ...initialDTO };
  }
};

const modalOk = () => dto.value && adding(dto.value);
</script>
