<template>
  <div class="form-floating">
    <input
      id="floatingInputGrid"
      v-model="newTag"
      type="text"
      class="form-control"
      @keydown.enter="addTag(newTag)"
      @input="addTagIfDelem(newTag)"
    />
    <label for="floatingInputGrid">Название поля</label>

    <div v-for="(tag, index) in tags" :key="tag" class="row">
      <div class="col">
        <span class="badge bg-primary"> {{ tag }}</span>
        <BaseButton @click="removeTag(index)">x</BaseButton>
      </div>
    </div>
  </div>

  <small v-if="showCount">
    {{ tags.length }}
  </small>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: () => [],
  },
  showCount: {
    type: Boolean,
    default: false,
  },
  customDelimiter: {
    type: [Array<string>, String],
    default: () => [] as string[],
    validator: (val: string | string[]) => {
      if (typeof val == "string") return val.length == 1;
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] != "string" || val[i].length != 1) return false;
      }
      return true;
    },
  },
});

const tags = ref(props.modelValue);

const newTag = ref("");

const customDelimiter = [
  ...new Set(
    (typeof props.customDelimiter === "string" ? [props.customDelimiter] : props.customDelimiter).filter(
      (it) => it.length == 1,
    ),
  ),
];

const addTag = (tag: string) => {
  tag = tag.trim();

  if (!tag) return;

  if (tags.value.includes(tag)) return;

  tags.value.push(tag);
  newTag.value = "";
};

const addTagIfDelem = (tag: string) => {
  if (!customDelimiter || customDelimiter.length == 0) return;
  if (customDelimiter.includes(tag.charAt(tag.length - 1))) addTag(tag.substring(0, tag.length - 1));
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};
</script>

<script lang="ts">
export default {
  name: "TagsInput",
};
</script>
