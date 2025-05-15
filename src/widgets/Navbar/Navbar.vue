<template>
  <nav class="navbar">
    <div class="container navbar-content p-20-horizontal">
      <h2 class="navbar__title">{{ currentTitle }}</h2>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import "./navbar.scss";
import { useRoute } from "vue-router";

const route = useRoute();
const currentTitle = computed(() => {
  return route.meta.navbarTitle;
});
</script>
