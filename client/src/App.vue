<script setup>
import { Toaster } from "vue-sonner";
import 'vue-sonner/style.css'
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Toaster richColors position="top-right" />
  <Navigation />
  <router-view />
</template>
