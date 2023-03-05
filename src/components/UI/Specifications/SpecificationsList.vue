<script setup lang="ts">
import { computed } from "vue";
import SpecificationField from "./SpecificationField.vue";
import { Device, updateSpecification } from "@/stores/devices/types";
import { deviceTypes } from "@/utils/helpers";

interface Props {
  type: string;
  disabled?: boolean;
  device?: Device | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  device: null,
});

defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();

const deviceType = computed(() => deviceTypes.find((d) => d.type === props.type));
</script>

<script lang="ts">
export default {
  name: "SpecificationsList",
};
</script>

<template>
  <div v-if="deviceType" class="input-group justify-content-between mb-3">
    <SpecificationField
      v-for="(spec, i) of deviceType.specification"
      v-cloak
      :key="i"
      :disabled="disabled"
      :specification="device?.specification[spec.name] || ''"
      :name-specification="spec.name"
      :type-specification="spec.value"
      :dropdown-list="spec.list"
      @editSpecification="(v) => $emit('editSpecification', v)"
    />
  </div>
</template>
