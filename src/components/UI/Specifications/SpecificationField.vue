<script setup lang="ts">
import { updateSpecification } from "@/stores/devices/types";

interface Props {
  specification?: string | { [key: string]: string };
  nameSpec: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  nameSpec: "",
  specification: "",
  disabled: false,
});

defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();
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

  <template v-else-if="typeof specification === 'object'">
    <input
      type="text"
      required
      :disabled="disabled"
      title="capacity"
      class="form-control"
      :value="specification?.capacity"
      placeholder="capacity"
      aria-label="capacity"
      @input="
        $emit('editSpecification', {
          target: 'capacity',
          value: ($event.target as HTMLInputElement).value,
        })
      "
    />
    <select
      id="inputGroupSelect01"
      required
      :disabled="disabled"
      title="unit"
      class="form-select"
      :value="specification?.unit"
      @change="
        $emit('editSpecification', {
          target: 'unit',
          value: ($event.target as HTMLSelectElement).value,
        })
      "
    >
      <option disabled selected value="">Единица измерения</option>
      <option value="TB">TB</option>
      <option value="GB">GB</option>
    </select>
  </template>
</template>
