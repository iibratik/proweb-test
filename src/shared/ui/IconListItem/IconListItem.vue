<template>
  <div class="list-item" :style="additionListStyle">
    <div
      class="list-item-pretend"
      :style="useMobStyle ? additionListStyle : ''"
      v-if="slots.pretend"
    >
      <slot name="pretend"></slot>
    </div>
    <div class="list-item-title" v-if="!useMobStyle && slots.title">
      <slot name="title">
        <slot />
      </slot>
    </div>
    <div class="list-item-append" v-if="slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import "./listItem.scss";

const slots = useSlots();
const props = defineProps<{
  round?: number;
  background?: string;
  style?: Record<string, string | number>;
}>();
const useMobStyle = computed(() => {
  if (window.innerWidth <= 960) {
    console.log(useMobStyle);
    return true;
  }
  return false;
});

const additionListStyle = computed(() => ({
  borderRadius: `${useMobStyle ? "30" : props.round}px`,
  background: `${props.background}`,
  ...props.style,
}));
</script>
