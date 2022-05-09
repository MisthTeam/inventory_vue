<script setup>
const props = defineProps({
  modelValue: Object,
  attribute: {
    types: Object,
    required: true,
    default: () => {},
  },
  disabled: {
    types: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const updatevalue = (key, value) => {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};
</script>

<script>
export default {
  name: "AddAttributeFields",
};
</script>

<template>
  <input
    type="text"
    v-if="attribute.meta.type === 'text'"
    class="form-control"
    id="floatingInput"
    :value="attribute.value || ''"
    @input="updatevalue('value', $event.target.value)"
    required
    :disabled="disabled"
    :placeholder="attribute.name"
  />

  <select
    :disabled="disabled"
    class="form-select"
    v-if="attribute.meta.type === 'select'"
    :value="attribute.value || ''"
    @change="updatevalue('value', $event.target.value)"
  >
    <option
      v-for="l in attribute.meta.list"
      :key="l"
      :value="l === attribute.value"
    >
      {{ l }}
    </option>
  </select>
  <label for="floatingInput">{{ attribute.name }}</label>
</template>
