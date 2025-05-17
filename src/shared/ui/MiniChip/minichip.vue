<template>
  <div
    class="mini-chip"
    :style="{ background: color, color: color[1] === '0' ? 'white' : 'black' }"
  >
    <div class="mini-chip-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./minichip.scss";
defineProps<{
  color: string;
}>();
</script>
