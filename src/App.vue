<template>
    <Navbar />
    <div class="container mt-6">
        <router-view />
    </div>
</template>

<script setup>
import Navbar from '@/components/NavbarMenu.vue';
</script>
<style>
html {
    height: 100%;
}
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
.btn-block {
    width: 100%;
}
</style>
