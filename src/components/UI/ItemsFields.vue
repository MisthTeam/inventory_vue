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
  <div v-if="item" class="form-floating mb-3">
    <input
      id="floatingInput2"
      type="text"
      class="form-control"
      :value="item.device.pn"
      disabled
      placeholder="P/N"
    />

    <label for="floatingInput2">P/N</label>
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
  item: {
    types: Object,
    requried: false,
    default: () => {},
  },
});
defineEmits(["update:modelValue"]);
</script>

<script>
export default {
  name: "ItemsFields",
};
</script>
