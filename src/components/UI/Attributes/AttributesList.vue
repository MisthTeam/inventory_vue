<template>
  <div
    v-for="(attribute, i) in attributes"
    :key="attribute.id"
    class="form-floating mb-3"
  >
    <AttributeField
      v-model="attributes[i]"
      :disabled="disabled"
      :attribute="attribute"
    />
  </div>
</template>

<script setup>
defineProps({
  attributes: {
    type: Array,
    requried: true,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<script>
export default {
  name: "AttributesList",
};
</script>
