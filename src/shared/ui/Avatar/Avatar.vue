<template>
  <div class="avatar">
    <img :src="avatarImage" :alt="avatarAlt" />
  </div>
</template>

<script setup lang="ts">
import "./avatar.scss";
const props = defineProps<{
  avatarImage: string;
  avatarAlt?: string;
}>();
</script>
