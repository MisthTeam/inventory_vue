<template>
  <template v-if="filtered.length">
    <form @submit.prevent="onSubmit">
      <template v-for="{ variables } in filtered" :key="variables.toString()">
        <div class="row justify-content-center mt-2">
          <div class="col-lg-8">
            <template v-if="variables.includes('volume')">
              <input
                v-model.lazy="capacity"
                min="0"
                step="0.1"
                type="number"
                placeholder="Введите емкость"
                title="capacity"
                class="form-control mb-2"
              />
              <select id="inputGroupSelect01" v-model="unit" title="unit" class="form-select">
                <option selected value="">Единица измерения</option>
                <option value="TB">TB</option>
                <option value="GB">GB</option>
              </select>
            </template>
          </div>
        </div>
        <div v-if="variables.includes('hhz')" class="row justify-content-center mb-2">
          <div class="col-lg-4 mb-2">
            <input v-model.lazy="firstHhz" min="0" type="number" step="0.1" class="form-control" placeholder="2" />
          </div>
          <div class="col-lg-4">
            <input v-model.lazy="secondHhz" type="number" step="0.1" class="form-control" placeholder="4.2" />
          </div>
        </div>
        <div v-if="variables.includes('socket')" class="row justify-content-center">
          <div class="col-lg-8">
            <BaseSelector v-model="socket" :options="specification?.CPU?.socket" />
          </div>
        </div>
      </template>
      <div class="row justify-content-center text-center mt-2">
        <div class="col-lg-8">
          <button class="btn btn-dark" type="submit">Показать</button>
        </div>
      </div>
    </form>
  </template>
</template>
<script lang="ts" setup>
import { fetchItemsParams, ItemsFilterParams } from "@/stores/items/types";
import { convertedValues, filteredTypes } from "@/utils/helpers";
import { computed, ref, watch } from "vue";

interface Props {
  value: string;
  specification: any;
  params?: fetchItemsParams;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  specification: () => ({}),
  params: () => ({}),
});

const emit = defineEmits<{
  (event: "updateFilterParams", value: ItemsFilterParams): void;
}>();

const filtered = computed(() => filteredTypes.filter((t) => t.type.includes(props.value)));

const capacity = ref("");
const unit = ref("");
const socket = ref("");
const firstHhz = ref("");
const secondHhz = ref("");

watch(
  () => props.value,
  (_, oldValue) => {
    if (!oldValue) return;
    capacity.value = "";
    unit.value = "";
    socket.value = "";
    firstHhz.value = "";
    secondHhz.value = "";
  },
);

const onSubmit = () => {
  const howMultiply = convertedValues[unit.value as keyof typeof convertedValues] ?? 1;
  const multiplyVolume = Number(capacity.value) * howMultiply;

  emit("updateFilterParams", {
    volume: multiplyVolume === 0 ? "" : multiplyVolume,
    socket: socket.value,
    hhz: firstHhz.value && secondHhz.value ? [firstHhz.value, secondHhz.value] : firstHhz.value || secondHhz.value,
  });
};
</script>
