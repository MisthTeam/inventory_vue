<template>
    <Form @submit="onSubmit" :validation-schema="ValidSchema">
        <div class="form-floating mb-3">
            <Field type="text" class="form-control" name="pn" placeholder="name@example.com" />
            <label for="floatingInput">PN</label>
            <ErrorMessage name="pn" />
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Войти</button>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
// import { useRouter } from 'vue-router';
import { useItemsStore } from '@/stores';

const itemStore = useItemsStore();

// const router = useRouter();
const ValidSchema = yup.object({
    pn: yup.string().required('Введите pn предмета'),
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
</script>
<style></style>
