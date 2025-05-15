<template>
  <div class="dashboard-header">
    <h2 class="dashboard-header__title">Категории</h2>
    <ChipItem
      @click="lessonStore.getFilterCategory(category)"
      v-for="category in lessonStore.getLessonCategories"
      :color="category.color"
      :active="isActive(category)"
      >{{ category.name }}
    </ChipItem>
  </div>
</template>

<script setup lang="ts">
import ChipItem from "@/shared/ui/ChipItem/ChipItem.vue";
import { useLessonsStore } from "@/store/lessonsState";
import LessonCategory from "@/types/lessonCategory";
const lessonStore = useLessonsStore();
function isActive(category: LessonCategory) {
  return lessonStore.getActiveFilterCategory.some(
    (activeCat) => activeCat.id === category.id
  );
}
</script>

<style scoped></style>
