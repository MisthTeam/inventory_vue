<template>
    <div class="container" v-if="itemsRef">
        {{ itemsRef }}
    </div>
</template>

<script setup>
import useItemsStore from '@/stores/items';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const itemsStore = useItemsStore();
const itemsRef = storeToRefs(itemsStore).items;
const fetching = async () => {
    try {
        const items = await itemsStore.getItems();
        itemsRef.value = items;
    } catch (error) {
        console.log(error);
    }
};

onMounted(fetching);
</script>

<style></style>
