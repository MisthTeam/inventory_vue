<template>
    <div>
        {{ itemsRef.value }}
    </div>
</template>

<script setup>
import api from '@/api';
import { onMounted, ref } from 'vue';

const itemsRef = ref([]);
const fetching = async () => {
    try {
        const { items } = await api.items.get();
        itemsRef.value = items;
    } catch (error) {
        console.log(error);
    }
};

onMounted(fetching);


</script>

<style></style>
