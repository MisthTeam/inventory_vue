<template>
  <select class="form-select" :disabled="disabled" :value="modelValue" @change="changeOption">
    <option :disabled="disableFirstElement" selected value=""><slot>Все</slot></option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  options: Array<string>;
  disabled?: boolean;
  disableFirstElement?: boolean;
}
withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: "",
  disabled: false,
  disableFirstElement: false,
});

const emit = defineEmits(["update:modelValue"]);

const changeOption = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
};
</script>

<script lang="ts">
export default { name: "BaseSelector" };
</script>
