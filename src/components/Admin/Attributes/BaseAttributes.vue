<template>
  <div v-if="attributes.length" class="row justify-content-center">
    <div class="col-lg-7 col-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Тип</th>
            <th scope="col">Для</th>
          </tr>
        </thead>
        <BaseAttribute v-for="attr in attributes" :key="attr.id" :attribute="attr" @openModal="openModal" />
      </table>
    </div>
  </div>
  <div v-else class="text-center mt-4">
    <h5>Не нашел ни одного дополнительного поля</h5>
  </div>
  <BaseModal name="Изменение атрибута" :isOpen="isOpenModal" idOpen="exampleModal2" @close="modalCancel" @ok="modalOk">
    <template #default>
      <div class="row g-2">
        <div class="col-md">
          <div class="form-floating">
            <input id="floatingInputGrid" v-model="dto.name" type="text" class="form-control" />
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
            <select id="floatingSelectGrid" v-model="dto.meta.type" class="form-select">
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
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { editAttribute } from "@/hooks/attributes";
import { Attribute, editAttributeDTO } from "@/stores/attrubutes/types";
import BaseAttribute from "./BaseAttribute.vue";
import { deviceTypes } from "@/utils/helpers";

interface Props {
  attributes: Attribute[];
}
defineProps<Props>();

const initialDTO: editAttributeDTO = {
  id: 0,
  name: "",
  device_type: "",
  meta: {
    type: "",
    list: [] as string[],
  },
};

const isOpenModal = ref(false);
const dto = ref<editAttributeDTO>(initialDTO);

const { editing } = editAttribute();
const openModal = (attribute: Attribute) => {
  dto.value = JSON.parse(JSON.stringify(attribute));
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
    dto.value = initialDTO;
  }
};

watch(
  () => dto.value.meta.type,
  (value) => {
    if (value === "text") dto.value.meta.list = [];
  },
);

const modalOk = () => dto.value && editing(dto.value);
</script>
