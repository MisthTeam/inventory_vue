<template>
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      @input="updateValue"
      id="floatingInput"
      required
      placeholder="Item name"
    />
    <label for="floatingInput">Item name</label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<script>
export default {
  name: "AddItemsFields",
};
</script>
