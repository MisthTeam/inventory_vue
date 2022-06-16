<script setup lang="ts">
import { updateSpecification } from "@/stores/devices/types";

interface Props {
  specification?: string;
  nameSpec: string;
}

withDefaults(defineProps<Props>(), {
  nameSpec: "",
  specification: "",
});

defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();
</script>

<template>
  <input
    type="text"
    required
    :placeholder="nameSpec"
    :aria-label="nameSpec"
    class="form-control"
    :value="specification"
    @input="
      $emit('editSpecification', {
        value: ($event.target as HTMLInputElement).value,
        target: nameSpec,
      })
    "
  />
</template>
