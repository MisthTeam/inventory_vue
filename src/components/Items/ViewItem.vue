<template>
    <div>
        <p>Да это здесь {{ itemsStore.getCurrentItem(+route.params.id) }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { getItems } from '@/hooks';

const route = useRoute();
const { itemsStore } = getItems();
</script>
<style></style>
