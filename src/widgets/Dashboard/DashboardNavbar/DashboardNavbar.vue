<template>
  <div class="dashboard-header">
    <h2 class="dashboard-header__title">Категории</h2>
    <ul class="dashboard-header-lists">
      <li
        class="dashboard-header-list"
        v-for="category in lessonStore.getLessonCategories"
        :key="category.id"
      >
        <ChipItem
          @click="lessonStore.getFilterCategory(category)"
          :color="category.color"
          :active="isActive(category)"
        >
          {{ category.name }}
        </ChipItem>
      </li>
    </ul>
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
