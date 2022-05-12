<template>
  <div
    v-for="{ as, classes, name, label, children, ...attrs } in schema.fields"
    :key="name"
    :class="schema.divClass"
  >
    <Field
      :id="name"
      :class="classes?.input"
      :as="as"
      :name="name"
      v-bind="attrs"
    >
      <template v-if="children && children.length">
        <component
          :is="tag"
          v-for="({ tag, text, ...childAttrs }, idx) in children"
          :key="idx"
          v-bind="childAttrs"
        >
          {{ text }}
        </component>
      </template>
    </Field>
    <label :class="classes?.label" :for="name">{{ label }}</label>
    <ErrorMessage :name="name" />
  </div>
</template>
<script>
export default {
  name: "DynamicFields",
};
</script>
<script setup>
import { Field, ErrorMessage } from "vee-validate";
defineProps({
  schema: {
    type: Object,
    required: true,
  },
});
</script>
