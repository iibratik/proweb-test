<template>
  <Sidebar :isActive="isActive" />
  <div class="body">
    <header class="header">
      <Navbar />
    </header>
    <main>
      <router-view> </router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Navbar from "@/widgets/Navbar/Navbar.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const isActive = ref(false);
</script>

<style scoped></style>
