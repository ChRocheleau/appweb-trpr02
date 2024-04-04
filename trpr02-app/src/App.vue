<script setup lang="ts">
import Header from './components/Header.vue'
import MainMenu from './components/MainMenu.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <Header />
    <Suspense>
    <MainMenu />
    /></Suspense>
    <Footer />
</template>

<style></style>