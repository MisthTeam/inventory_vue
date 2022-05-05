<script setup>
defineProps({
  attributes: {
    types: Array,
    required: false,
    default: () => null,
  },
  disabled: {
    types: Boolean,
    required: false,
    default: false,
  },
});
</script>

<script>
export default {
  name: "AddAttributeFields",
};
</script>

<template>
  <div
    class="form-floating mb-3"
    v-for="attribute in attributes"
    :key="attribute.id"
  >
    <input
      type="text"
      v-if="attribute.meta.type === 'text'"
      class="form-control"
      id="floatingInput"
      :value="attribute.value"
      required
      :disabled="disabled"
      :placeholder="attribute.name"
    />

    <select
      :disabled="disabled"
      class="form-select"
      v-if="attribute.meta.type === 'select'"
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
  </div>
</template>
