<script setup>
import { deviceTypes } from "../../utils/helpers";
import { ref, watch } from "vue";
import { getAttributeByType } from "../../hooks/attributes";
import { getDevice } from "../../hooks/devices";
import { addItem } from "../../hooks/items";

const dto = ref({
  pn: "",
  device: { specification: {}, type: "HDD" },
  item: {
    name: "",
  },
  attr: {},
}); // DTO для отправки на сервер

// Хуки
const { isLoadingAttribute, getAttribute, attributes } = getAttributeByType();
const { addIt, isAddLoading } = addItem(dto);
const { onSubmit, isLoadingDevice, responseRec, device } = getDevice(dto);

// Подгрузка кастомных атрибутов
watch(
  () => dto.value.device.type,
  async (value) => {
    if (value) await getAttribute(value);
    if (!device.value) dto.value.device.specification = {};
  },
  { deep: true }
);

// Изменение спецификации
const changeSpecification = ({ target, value }) =>
  Object.assign(dto.value.device.specification, {
    [target]: value,
  });

const changeAttributes = ({ attr, value }) => {
  Object.assign(dto.value.attr, {
    [attr.id]: { value },
  });
};
</script>

<template>
  <div class="container mt-6">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input
          v-model="dto.pn"
          type="text"
          class="form-control"
          required
          placeholder="enter pn"
          v-focus
          :disabled="isLoadingDevice || isLoadingAttribute"
        />
        <BaseButton
          :disabled="isLoadingDevice || isLoadingAttribute"
          class="btn-outline-secondary"
          type="submit"
        >
          Проверить
        </BaseButton>
      </div>
    </form>
    <form @submit.prevent="addIt">
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
              :key="_type.id"
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
          :dto="dto"
          :disabled="isLoadingAttribute || !!device"
          :type="dto.device.type"
          :device="device"
          @editSpecification="changeSpecification"
        />

        <AttributesList
          @updateAttr="changeAttributes"
          :attributes="attributes"
        />

        <ItemsFields
          v-model="dto.item.name"
          :disabled="isAddLoading || isLoadingAttribute"
        />

        <BaseButton
          :disabled="isAddLoading"
          class="btn-outline-secondary"
          type="submit"
        >
          Добавить
        </BaseButton>
      </template>
    </form>
  </div>
</template>
