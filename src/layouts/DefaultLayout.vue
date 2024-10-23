<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="full-screen-bg">
    <Header />
    <router-view></router-view> <!-- Hier wird der Inhalt der gerouteten Seiten angezeigt -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
</script>

<style scoped>
/* Hier kannst du deine Styles für das Layout hinzufügen */
</style>