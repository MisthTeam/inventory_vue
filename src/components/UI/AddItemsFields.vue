<template>
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      id="floatingInput"
      required
      :disabled="disabled"
      placeholder="S/N"
    />
    <label for="floatingInput">S/N</label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  disabled: {
    types: Boolean,
    required: false,
    default: false,
  },
});
defineEmits(["update:modelValue"]);
</script>

<script>
export default {
  name: "AddItemsFields",
};
</script>
