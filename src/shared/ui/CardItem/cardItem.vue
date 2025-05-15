<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-upper">
        <h3 class="card-header-upper__title">{{ item.name }}</h3>
        <Minichip :color="item.categories[0].color">{{
          item.categories[0].name
        }}</Minichip>
      </div>
    </div>
    <div class="card-body" v-if="item.groups[0]?.start_date">
      <div class="card-body-header">
        <h3 class="card-body-header__title">Старт групп</h3>
        <div class="card-date">
          <span class="date-content">{{ start_day }}</span>
          <div class="date-days" v-if="lesson_days">
            <span class="days" v-for="(day, index) in lesson_days"
              >{{ day }}<span v-if="index < lesson_days.length - 1">, </span>
            </span>
          </div>
        </div>
        <div class="card-body-header-content">
          <ul class="card-lists">
            <li class="card-list" v-for="lesson in lessons_time" :key="lesson">
              {{ lesson }}
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body-main">
        <div class="main-content">
          <h4 class="main-content__title">Открытые уроки</h4>
          <ul class="main-lists">
            <li class="main-list" v-for="lesson in open_lessons" :key="lesson.id">
              <div class="list-head">
                <span class="head-title">{{ lesson.date }}</span>
                <span class="head-subtitle">{{ lesson.weekDay }}</span>
              </div>
              <div class="list-body">
                <ul class="times">
                  <li class="time" v-for="time in open_lessons[0].times">
                    <span :key="time">{{ time }}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Minichip from "@/shared/ui/MiniChip/minichip.vue";
import Lesson from "@/types/lesson";
import "./cardItem.scss";
import OpenLesson from "@/types/openlesson";
defineProps<{
  item: Lesson;
  start_day: string;
  lesson_days: Array<string>;
  lessons_time: Array<string>;
  open_lessons: Array<OpenLesson>;
}>();
</script>

<style scoped></style>
