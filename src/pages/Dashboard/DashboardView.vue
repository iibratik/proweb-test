<template>
  <section class="dashboard">
    <Loader v-if="loader" />
    <div class="dashboard-content" v-else>
      <DashboardNavbar />
      <DashboardLessons />
    </div>
  </section>
</template>

<script lang="ts" setup>
import Loader from "@/shared/ui/Loader/loader.vue";
import { useLessonsStore } from "@/store/lessonsState";
import "./dashboardView.scss";
import DashboardLessons from "@/widgets/Dashboard/DashboardLessons/DashboardLessons.vue";
import DashboardNavbar from "@/widgets/Dashboard/DashboardNavbar/DashboardNavbar.vue";
import { watch, ref, onMounted, onBeforeUnmount } from "vue";
const lessonStore = useLessonsStore();
const loader = ref(true);
onMounted(() => {
  lessonStore.getAllLessons();
});
onBeforeUnmount(() => {
  lessonStore.resetLessons();
});
watch(
  () => lessonStore.getCommonLessons.length,
  () => {
    if (lessonStore.getCommonLessons.length > 0) {
      loader.value = false;
    }
  },
  { immediate: true }
);
</script>
