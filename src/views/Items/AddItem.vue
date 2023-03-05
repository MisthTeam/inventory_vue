<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { deviceTypes } from "@/utils/helpers";
import { getAttributesByType } from "@/hooks/attributes";
import { getDevice } from "@/hooks/devices";
import { addItem } from "@/hooks/items";
import { updateSpecification } from "@/stores/devices/types";
import { addItemParams } from "@/stores/items/types";
import { UpdateAttr } from "@/stores/attrubutes/types";

const dto: Ref<addItemParams> = ref({
  pn: "",
  device: { specification: {}, type: "HDD" },
  item: {
    name: "",
  },
  attr: {},
}); // DTO для отправки на сервер

// Хуки
const { isLoadingAttribute, getAttribute, attributes } = getAttributesByType();
const { addIt: saveItem, isAddLoading } = addItem(dto);
const { onSubmit, isLoadingDevice, responseRec, device } = getDevice(dto);

// Подгрузка кастомных атрибутов
watch(
  () => dto.value.device.type,
  async (value) => {
    if (value) await getAttribute(value);
    if (!device.value) dto.value.device.specification = {};
  },
  { deep: true },
);

// Изменение спецификации
const changeSpecification = ({ target, value }: updateSpecification) => {
  dto.value.device.specification = { ...dto.value.device.specification, [target]: value };
};

// Изменение атрибутов
const changeAttributes = ({ attrId, value }: UpdateAttr) => {
  return Object.assign(dto.value.attr, {
    [attrId]: { value },
  });
};
</script>

<template>
  <div class="container mt-6">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input
          v-model="dto.pn"
          v-focus
          type="text"
          class="form-control"
          required
          placeholder="enter pn"
          :disabled="isLoadingDevice || isLoadingAttribute"
        />
        <BaseButton :disabled="isLoadingDevice || isLoadingAttribute" class="btn-outline-secondary" type="submit">
          Проверить
        </BaseButton>
      </div>
    </form>
    <form @submit.prevent="saveItem">
      <template v-if="responseRec">
        <div class="form-floating mb-3">
          <select
            v-model="dto.device.type"
            class="form-select"
            :disabled="!!device || isLoadingAttribute"
            aria-label="Device type"
          >
            <option
              v-for="_type in deviceTypes"
              :key="_type.type"
              :value="_type.type"
              :selected="_type.type === dto.device.type"
            >
              {{ _type.type }}
            </option>
          </select>
          <label for="floatingInput">Device type</label>
        </div>

        <SpecificationsList
          v-if="dto.device.type"
          :disabled="isLoadingAttribute || !!device"
          :type="dto.device.type"
          :device="device"
          @editSpecification="changeSpecification"
        />

        <AttributesList :attributes="attributes" @updateAttr="changeAttributes" />

        <div class="form-floating mb-3">
          <input
            id="floatingInput"
            v-model="dto.item.name"
            type="text"
            class="form-control"
            required
            :disabled="isAddLoading || isLoadingAttribute"
            placeholder="S/N"
          />
          <label for="floatingInput">S/N</label>
        </div>

        <BaseButton :disabled="isAddLoading" class="btn-outline-secondary" type="submit"> Добавить </BaseButton>
      </template>
    </form>
  </div>
</template>
