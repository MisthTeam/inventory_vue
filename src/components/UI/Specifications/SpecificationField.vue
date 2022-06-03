<script setup>
defineProps({
  specification: {
    type: String,
    required: false,
  },
  nameSpec: {
    type: String,
    required: false,
    default: "",
  },
});

defineEmits({
  editSpecification: null,
});
</script>

<template>
  <input
    type="text"
    required
    class="form-control"
    :value="specification"
    :placeholder="nameSpec"
    :aria-label="nameSpec"
    @input="
      $emit('editSpecification', {
        value: $event.target.value,
        target: nameSpec,
      })
    "
  />
</template>
