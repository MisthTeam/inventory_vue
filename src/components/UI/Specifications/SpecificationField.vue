<script setup lang="ts">
import { updateSpecification } from "@/stores/devices/types";
import { convertedValues, formatBytes } from "@/utils/helpers";
import { ref, watch } from "vue";

interface Props {
  specification?: string | number;
  nameSpec: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  nameSpec: "",
  specification: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();

const capacityBefore = ref(props.nameSpec === "volume" ? formatBytes(Number(props.specification))[0] : 0);

const unit = ref((formatBytes(Number(props.specification))[1] as string) ?? "");

const howmultiply = ref(convertedValues[unit.value as keyof typeof convertedValues] ?? 0);

const capacityEnter = ref(Number(capacityBefore.value) * howmultiply.value ?? 0);

watch(unit, (value) => {
  howmultiply.value = convertedValues[value as keyof typeof convertedValues];
  capacityEnter.value = Number(capacityBefore.value) * howmultiply.value ?? 0;
  emit("editSpecification", {
    target: "volume",
    value: capacityEnter.value,
  });
});

watch(capacityBefore, (value) => {
  capacityEnter.value = Number(value) * howmultiply.value ?? 0;
});
</script>

<template>
  <input
    v-if="nameSpec != 'volume'"
    :disabled="disabled"
    type="text"
    required
    :placeholder="nameSpec"
    :aria-label="nameSpec"
    :title="nameSpec"
    class="form-control"
    :value="specification"
    @input="
      $emit('editSpecification', {
        value: ($event.target as HTMLInputElement).value,
        target: nameSpec,
      })
    "
  />

  <template v-else>
    <input
      v-model="capacityBefore"
      type="number"
      step="0.1"
      required
      :disabled="!unit.length || disabled"
      title="capacity"
      class="form-control"
      placeholder="capacity"
      aria-label="capacity"
      @input="
        $emit('editSpecification', {
          target: 'volume',
          value: capacityEnter,
        })
      "
    />
    <select id="inputGroupSelect01" v-model="unit" required :disabled="disabled" title="unit" class="form-select">
      <option disabled selected value="">Единица измерения</option>
      <option value="TB">TB</option>
      <option value="MB">MB</option>
      <option value="GB">GB</option>
    </select>
  </template>
</template>
