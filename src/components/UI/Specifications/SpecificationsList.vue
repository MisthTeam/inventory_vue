<script setup>
import { deviceTypes } from "@/utils/helpers";
import { computed } from "vue";
import SpecificationField from "./SpecificationField.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  device: {
    type: Object,
    required: false,
    default: null,
  },
  dto: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

defineEmits({
  editSpecification: null,
});

const deviceType = computed(() =>
  deviceTypes.find((d) => d.type === props.type)
);
</script>

<script>
export default {
  name: "SpecificationsList",
};
</script>

<template>
  <div v-if="deviceType" class="input-group justify-content-between mb-3">
    <SpecificationField
      :disabled="disabled"
      v-for="(specification, i) of deviceType.specification"
      :key="i"
      :specification="
        device?.specification[specification] ||
        dto.device?.specification[specification] ||
        null
      "
      :nameSpec="specification"
      @editSpecification="(v) => $emit('editSpecification', v)"
    />
  </div>
</template>
