<template>
  <Form
    v-if="!deviceFound"
    @submit="onSubmit"
    v-slot="{ meta }"
    :validation-schema="ValidSchema"
  >
    <DynamicFields :schema="schema" />
    <button
      :disabled="!meta.dirty"
      class="btn btn-primary btn-block mt-3"
      type="submit"
    >
      Проверить
    </button>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import { useItemsStore } from "@/stores";

const itemStore = useItemsStore();
const deviceFound = ref(null);

const ValidSchema = yup.object({
  pn: yup.string().required("Введите pn предмета"),
});

const onSubmit = async ({ pn }) => {
  try {
    await itemStore.createItem(pn);
  } catch ({ response }) {
    if (response.data?.errors) {
      console.log(response.data);
    }
  }
};

const schema = {
  divClass: "form-floating mb-3",
  fields: [
    {
      label: "PN",
      name: "pn",
      as: "input",
      input: "text",
      classes: {
        input: "form-control",
      },
    },
  ],
};
</script>
