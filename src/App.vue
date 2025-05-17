<template>
  <Sidebar :isActive="isActive" />
  <div class="body isYouScroll" @wheel="handleScroll">
    <header class="header">
      <Navbar @switch-sidebar="switchSidebar()" />
    </header>
    <main>
      <router-view> </router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useScrollState } from "@/store/scrollState";
import Navbar from "@/widgets/Navbar/Navbar.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const scrollState = useScrollState();
const isActive = ref(false);
function handleScroll(event: WheelEvent) {
  if (event.ctrlKey) {
    event.preventDefault();
    if (event.deltaY > 0) {
      scrollState.addScrollWidth();
    } else if (event.deltaY < 0) {
      scrollState.reduceScrollWidth();
    }
  }
}
function switchSidebar() {
  isActive.value = !isActive.value;
}
</script>
