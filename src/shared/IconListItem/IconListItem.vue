<template>
  <div class="list-item" :style="additionListStyle">
    <div class="list-item-pretend">
      <slot name="pretend"></slot>
    </div>
    <div class="list-item-title">
      <slot name="title">
        <slot />
      </slot>
    </div>
    <div class="list-item-append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "./listItem.scss";
const props = defineProps<{
  round?: number;
  background?: string;
  style?: Record<string, string | number>;
}>();
const additionListStyle = computed(() => ({
  borderRadius: `${props.round}px`,
  background: `${props.background}`,
  ...props.style,
}));
</script>
