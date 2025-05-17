<template>
  <div class="avatar">
    <img :src="avatarImage" :alt="avatarAlt" />
  </div>
</template>

<script setup lang="ts">
import "./avatar.scss";
defineProps<{
  avatarImage: string;
  avatarAlt?: string;
}>();
</script>
