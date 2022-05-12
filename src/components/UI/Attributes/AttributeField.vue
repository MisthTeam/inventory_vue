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
  name: "AttributeField",
};
</script>

<template>
  <input
    v-if="attribute.meta.type === 'text'"
    id="floatingInput"
    type="text"
    class="form-control"
    :value="attribute.value"
    required
    :disabled="disabled"
    :placeholder="attribute.name"
    @input="updatevalue('value', $event.target.value)"
  />

  <select
    v-if="attribute.meta.type === 'select'"
    :disabled="disabled"
    class="form-select"
    :value="attribute.value"
    @change="updatevalue('value', $event.target.value)"
  >
    <option
      v-for="l in attribute.meta.list"
      :key="l"
      :selected="l === attribute.value"
      :value="l"
    >
      {{ l }}
    </option>
  </select>
  <label for="floatingInput">{{ attribute.name }}</label>
</template>
