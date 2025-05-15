<template>
  <div
    class="chip"
    :style="{
      background: active ? color : '',
      color: color[1] == '0' && active ? 'white' : 'black',
    }"
  >
    <div class="chip-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./chipItem.scss";

const props = defineProps<{
  color: string;
  active?: boolean;
}>();
</script>
