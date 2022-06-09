<template>
  <select
    class="form-select"
    :disabled="disabled"
    :value="modelValue"
    @change="changeOption"
  >
    <option selected value=""><slot>Все</slot></option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: String,
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const changeOption = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<script>
export default { name: "BaseSelector" };
</script>
