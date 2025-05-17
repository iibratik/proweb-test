<template>
  <div class="dashboard-body" @touchstart="touchStart" @touchend="touchEnd">
    <ul class="lessons-lists" ref="dashboardContent">
      <li class="lesson-list" v-for="lesson in sortedLessons" :key="lesson.id">
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
import { computed, ref, watch } from "vue";
import { useLessonsStore } from "@/store/lessonsState";
import LessonGroup from "@/types/lessonGroups";
import { useScrollState } from "@/store/scrollState";

const lessonStore = useLessonsStore();
const scrollStore = useScrollState();
const dashboardContent = ref<HTMLDivElement | null>(null);
const startX = ref(0);
const startY = ref(0);
const sortedLessons = computed(() => {
  return lessonStore.getFilteredLessons
    .slice()
    .sort(
      (a, b) =>
        new Date(a.groups[0].start_date).getTime() -
        new Date(b.groups[0].start_date).getTime()
    );
});

watch(
  () => scrollStore.getScrollWidth,
  () => {
    setListScroll();
  },
  { immediate: true }
);

function setListScroll() {
  if (dashboardContent.value) {
    console.log(dashboardContent.value.offsetWidth);
    if (
      scrollStore.getScrollWidth >=
      dashboardContent.value.offsetWidth / scrollStore.getScrollBorder
    ) {
      scrollStore.setStopScroll();
      return;
    } else {
      dashboardContent.value.style.transform = `translateX(-${scrollStore.getScrollWidth}px)`;
    }
  }
}
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
        ...openLesson,
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

function touchStart(event: TouchEvent) {
  const touch = event.touches[0];
  startX.value = touch.clientX;
  startY.value = touch.clientY;
}
function touchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0];
  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;
  const deltaX = touchEndX - startX.value;
  const deltaY = touchEndY - startY.value;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 30) {
      scrollStore.reduceScrollWidth();
    } else {
      scrollStore.addScrollWidth();
    }
  }
}
</script>
