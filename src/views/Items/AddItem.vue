<script setup>
import { deviceTypes } from "@/utils/helpers";
import { ref, watch } from "vue";
import { getAttributeByType } from "@/hooks/attributes";
import { getDevice } from "@/hooks/devices";
import { addItem } from "@/hooks/items";
const dto = ref({
  pn: "",
  device: { specification: {}, type: null },
  item: {
    name: "",
  },
});
const { isLoadingAttribute, getAttribute, attributes } = getAttributeByType();
const { addIt, isAddLoading } = addItem(dto, attributes);

const { onSubmit, isLoadingDevice, responseRec, device } = getDevice(dto);

watch(
  () => dto.value.device.type,
  async (value) => {
    dto.value.device.type = value;
    if (value) await getAttribute(value);
    if (!device.value) {
      dto.value.device.specification = {};
    }
  },
  { deep: true }
);

const logs = ({ target, value }) => {
  dto.value.device.specification[target] = value;
};
</script>

<template>
  <div class="container mt-6">
    <form @submit.prevent="addIt">
      <form @submit.prevent="onSubmit">
        <div class="input-group mb-3">
          <input
            v-model="dto.pn"
            type="text"
            class="form-control"
            required
            placeholder="enter pn"
            aria-label="enter pn"
            aria-describedby="button-addon2"
            v-focus
            :disabled="isLoadingDevice || isLoadingAttribute"
          />
          <button
            :disabled="isLoadingDevice || isLoadingAttribute"
            class="btn btn-outline-secondary"
            type="submit"
          >
            <span
              v-if="isLoadingDevice || isLoadingAttribute"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span v-else>Проверить</span>
          </button>
        </div>
      </form>
      <div v-if="responseRec">
        <div class="form-floating mb-3">
          <select
            v-model="dto.device.type"
            class="form-select"
            :disabled="!!device || isLoadingAttribute"
            aria-label="Device type"
          >
            <option :selected="t.type " v-for="t in deviceTypes" :key="t.id" :value="t.type">
              {{ t.type }}
            </option>
          </select>
          <label for="floatingInput">Device type</label>
        </div>
        <SpecFields
          v-if="dto.device.type"
          :dto="dto"
          :disabled="isLoadingAttribute || !!device"
          :option="dto.device.type"
          :device="device"
          @editDevice="logs"
        />
        <AttributesList :attributes="attributes" />
        <ItemsFields v-model="dto.item.name" :disabled="isAddLoading || isLoadingAttribute" />
        <button
          :disabled="isAddLoading"
          class="btn btn-outline-secondary"
          type="submit"
        >
          <span
            v-if="isAddLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span v-if="!isAddLoading">Добавить устройство</span>
        </button>
      </div>
    </form>
  </div>
</template>
