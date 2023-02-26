<template>
  <template v-if="filtered.length">
    <template v-for="{ variables } in filtered" :key="variables">
      <div class="row justify-content-center mt-2">
        <div class="col-lg-8">
          <template v-if="variables.includes('volume')">
            <div class="input-group">
              <input
                v-model.lazy="filterParams.volume"
                min="0"
                step="0.1"
                type="number"
                :disabled="!filterParams.unit.length"
                placeholder="Введите емкость"
                title="volume"
                class="form-control"
              />
              <select
                id="inputGroupSelect01"
                v-model="filterParams.unit"
                title="unit"
                class="form-select"
                style="max-width: 30%"
              >
                <option selected value="">Единица измерения</option>
                <option value="TB">TB</option>
                <option value="GB">GB</option>
              </select>
            </div>
          </template>
        </div>
      </div>
      <div v-if="variables.includes('hhz')" class="row justify-content-center mb-2">
        <div class="col-lg-8">
          <div class="input-group mb-3">
            <input
              v-model.lazy="filterParams.firstHhz"
              min="0"
              type="number"
              step="0.1"
              class="form-control"
              placeholder="Минимальная частота в HHz"
            />
            <input
              v-model.lazy="filterParams.secondHhz"
              type="number"
              step="0.1"
              class="form-control"
              placeholder="Максимальная частота в HHz"
            />
          </div>
        </div>
      </div>
      <div v-if="variables.includes('socket')" class="row justify-content-center">
        <div class="col-lg-8">
          <BaseSelector v-model="filterParams.socket" :options="specification?.CPU?.socket"> Все сокеты </BaseSelector>
        </div>
      </div>
      <div v-if="variables.includes('reg')" class="row justify-content-center">
        <div class="col-lg-8">
          <BaseSelector v-model="filterParams.reg" :options="['reg', 'non-reg']"> Все типы </BaseSelector>
        </div>
      </div>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { computed, watch, watchEffect, reactive } from "vue";
import { ItemsFilterParams, FilterProps } from "@/stores/items/types";
import { convertedValues, filteredTypes } from "@/utils/helpers";

interface Props {
  type: string;
  specification: any;
  filter: ItemsFilterParams;
}

const props = withDefaults(defineProps<Props>(), {
  type: "",
  specification: () => ({}),
  filter: () => ({}),
});

const emit = defineEmits<{
  (event: "updateFilterParams", value: ItemsFilterParams): void;
}>();

const filtered = computed(() => filteredTypes.filter((t) => t.type.includes(props.type)));

const filterParams = reactive<FilterProps>({
  volume: "",
  unit: "",
  socket: "",
  firstHhz: "",
  secondHhz: "",
  reg: "",
  model: "",
  company: "",
  screen_resolution: "",
});

watch(filterParams, () => {
  const howMultiply = convertedValues[filterParams.unit as keyof typeof convertedValues] ?? 1;
  const multiplyVolume = Number(filterParams.volume) * howMultiply;
  emit("updateFilterParams", {
    ...filterParams,
    volume: multiplyVolume === 0 ? "" : multiplyVolume,
  });
});

watchEffect(() => {
  const { volume, unit, socket, firstHhz, secondHhz, reg } = props.filter;

  if (socket) filterParams.socket = String(socket);

  if (volume && unit) {
    const howMultiply = convertedValues[unit as keyof typeof convertedValues];
    filterParams.volume = Number(volume) / howMultiply;
    filterParams.unit = String(unit);
  }

  if (firstHhz) filterParams.firstHhz = Number(firstHhz);
  if (secondHhz) filterParams.secondHhz = Number(secondHhz);
  if (reg) filterParams.reg = String(reg);
});
</script>
