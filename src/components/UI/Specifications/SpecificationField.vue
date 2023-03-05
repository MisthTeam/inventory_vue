<script setup lang="ts">
import { ref, computed } from "vue";
import { updateSpecification } from "@/stores/devices/types";
import { convertedValues, formatBytes } from "@/utils/helpers";
import { DeviceSpecificationValue } from "@/interfaces/utils.interface";

interface Props {
  specification?: string | number;
  dropdownList?: string[];
  nameSpecification: string;
  typeSpecification: keyof typeof DeviceSpecificationValue;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  specification: "",
  disabled: false,
  dropdownList: () => [],
});

const emit = defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();

// Сколько стало после перерасчета с учетом какой был UNIT
const capacityAfterTranslated = ref(
  props.nameSpecification === "volume" ? Number(formatBytes(Number(props.specification))[0]) : 0,
);

// Какая единица измерения
const unit = ref<keyof typeof convertedValues>(
  (formatBytes(Number(props.specification))[1] as keyof typeof convertedValues) ?? "",
);

// На сколько умножать, чтобы получить абсолютное значение емкости
const howToMultiply = computed(() => convertedValues[unit.value] ?? 0);

//Абсолютное значение емкости
const absoluteCapacity = computed(() => capacityAfterTranslated.value * howToMultiply.value ?? 0);
</script>

<template>
  <template v-if="typeSpecification === 'volume'">
    <input
      id="capacity"
      v-model="capacityAfterTranslated"
      type="number"
      step="0.1"
      min="0"
      required
      :disabled="!unit.length || disabled"
      title="capacity"
      class="form-control"
      placeholder="capacity"
      aria-label="capacity"
      @input="
        $emit('editSpecification', {
          target: 'volume',
          value: absoluteCapacity,
        })
      "
    />
    <select id="unit" v-model="unit" required :disabled="disabled" title="unit" class="form-select">
      <option disabled selected value="">Единица измерения</option>
      <option value="TB">TB</option>
      <option value="MB">MB</option>
      <option value="GB">GB</option>
    </select>
  </template>
  <template v-else-if="typeSpecification === 'text'">
    <input
      :id="nameSpecification"
      :disabled="disabled"
      type="text"
      required
      :placeholder="nameSpecification"
      :aria-label="nameSpecification"
      :title="nameSpecification"
      class="form-control"
      :value="specification"
      @input="
        $emit('editSpecification', {
          value: ($event.target as HTMLInputElement).value,
          target: nameSpecification,
        })
      "
    />
  </template>
  <template v-else-if="typeSpecification === 'dropdown'">
    <select
      :id="nameSpecification"
      required
      :disabled="disabled"
      :title="nameSpecification"
      class="form-select"
      :value="specification"
      @change="
        $emit('editSpecification', {
          value: ($event.target as HTMLInputElement).value,
          target: nameSpecification,
        })
      "
    >
      <option disabled selected value="">Выбор</option>
      <option v-for="value of dropdownList" :key="value" :value="value.toLowerCase()">{{ value }}</option>
    </select>
  </template>
  <template v-else-if="typeSpecification === 'integer'">
    <input
      :id="nameSpecification"
      :disabled="disabled"
      type="number"
      required
      :placeholder="nameSpecification"
      :aria-label="nameSpecification"
      :title="nameSpecification"
      class="form-control"
      :value="specification"
      @input="
        $emit('editSpecification', {
          value: ($event.target as HTMLInputElement).value,
          target: nameSpecification,
        })
      "
    />
  </template>
</template>
