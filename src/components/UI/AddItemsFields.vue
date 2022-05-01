<template>
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      @input="updateValue"
      id="floatingInput"
      required
      :disabled="disabled"
      placeholder="Название комплектующего"
    />
    <label for="floatingInput">Название комплектующего</label>
  </div>
  <div v-if="attributes">
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
        :value="attribute.pivot.value"
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
          :value="l === attribute.pivot.value"
        >
          {{ l }}
        </option>
      </select>
      <label for="floatingInput">{{ attribute.name }}</label>
    </div>
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
  attributes: {
    types: Array,
    rqeuired: true,
  },
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
