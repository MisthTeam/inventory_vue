<script setup lang="ts">
interface Props {
  specification?: string;
  nameSpec: string;
}

withDefaults(defineProps<Props>(), {
  nameSpec: "",
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
        value: ($event.target as HTMLInputElement).value,
        target: nameSpec,
      })
    "
  />
</template>
