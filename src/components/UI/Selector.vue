<template>
  <select class="form-select" :value="modelValue" @change="changeOption">
    <option selected value="">Выберите тип сортировки</option>
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
});

const emit = defineEmits(["update:modelValue"]);

const changeOption = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<script>
export default { name: "Selector" };
</script>
