<template>
  <div class="dashboard-body">
    <ul class="lessons-lists">
      <li
        class="lesson-list"
        v-for="lesson in lessonStore.getFilteredLessons"
        :key="lesson.id"
      >
        <CardItem
          class="lesson-card"
          :item="lesson"
          :lesson_days="formattedDays(lesson.groups)"
          :start_day="formattedStartDay(lesson.groups)"
          :lessons_time="formattedTime(lesson.groups)"
          :open_lessons="formatedOpenLessons(lesson.open_lessons)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CardItem from "@/shared/ui/CardItem/cardItem.vue";
import OpenLesson from "@/types/openlesson";
import { computed, onMounted } from "vue";
import { useLessonsStore } from "@/store/lessonsState";
import LessonGroup from "@/types/lessonGroups";
const lessonStore = useLessonsStore();
onMounted(() => {
  lessonStore.getAllLessons();
});

function formattedStartDay(groups: Array<LessonGroup>) {
  if (groups[0]?.start_date) {
    const changedStartDay = groups.map((group) => {
      if (group.start_date) {
        return changeDayFormat(group.start_date);
      }
      return "";
    });
    return changedStartDay[0];
  }
  return "";
}
function formattedDays(groups: Array<LessonGroup>) {
  if (groups.length > 0) {
    let changedDays = [] as string[];
    groups.forEach((group) => {
      if (group.days.length > 0) {
        changedDays = group.days.map((daynumber) => changeWeekDayFormat(daynumber));
      }
      return [] as string[];
    });
    return changedDays;
  }
  return [] as string[];
}
function formattedTime(groups: LessonGroup[]) {
  if (groups[0]?.study_time) {
    const changedTime = groups.map((group) => {
      return changeTimeFormat(group.study_time);
    });
    return changedTime;
  }
  return [] as string[];
}
function formatedOpenLessons(lessons: OpenLesson[]) {
  if (lessonStore.openLessons.length > 0) {
    const result = setMergeLesson(lessons);
    const uniqueLessons = computed(() => {
      const sameDate = new Set<string>();
      return result.filter((lesson) => {
        if (sameDate.has(lesson.date)) return false;
        sameDate.add(lesson.date);
        return true;
      });
    });

    const formatedLessons = uniqueLessons.value.map((lesson: OpenLesson) => {
      const formatedTimes = lesson.times.map((time) => changeTimeFormat(time));
      const openLesson = {
        id: lesson.id,
        format: lesson.format,
        practical: lesson.practical,
        date: changeDayFormat(lesson.date),
        time: changeTimeFormat(lesson.time),
        times: [...formatedTimes],
        weekDay: getWeekDayByDate(lesson.date),
      };

      return openLesson;
    });
    return formatedLessons;
  }
  return [] as OpenLesson[];
}
function changeDayFormat(curentDay: string) {
  const formatingDay = new Date(curentDay);
  return new Intl.DateTimeFormat("ru-Ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(formatingDay);
}
function changeWeekDayFormat(daynumber: number) {
  const weekDaysMap: Record<number, string> = {
    0: "ПН",
    1: "ВТ",
    2: "СР",
    3: "ЧТ",
    4: "ПТ",
    5: "СБ",
    6: "ВС",
  };
  return weekDaysMap[Number(daynumber)] || "";
}

function changeTimeFormat(currentTime: string) {
  const [hours, minutes] = currentTime.split(":");
  return `${hours}:${minutes}`;
}
function getWeekDayByDate(currentDate: string) {
  const date = new Date(currentDate);
  return changeWeekDayFormat(date.getDay());
}
function setMergeLesson(lessons: OpenLesson[]) {
  const map = new Map<string, OpenLesson>();
  for (const openLesson of lessons) {
    if (!map.has(openLesson.date)) {
      map.set(openLesson.date, {
        id: openLesson.id,
        format: openLesson.format,
        practical: false,
        date: openLesson.date,
        time: openLesson.time,
        times: [openLesson.time],
        weekDay: openLesson.weekDay,
      });
    } else {
      const entry = map.get(openLesson.date)!;
      if (!entry.times.includes(openLesson.time)) {
        entry.times.push(openLesson.time);
      }
    }
  }
  return Array.from(map.values());
}
</script>
