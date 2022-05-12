<template>
  <div class="form-floating mb-3">
    <input
      id="floatingInput"
      type="text"
      class="form-control"
      :value="modelValue"
      required
      :disabled="disabled"
      placeholder="S/N"
      @input="$emit('update:modelValue', $event.target.value)"
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
  name: "ItemsFields",
};
</script>
