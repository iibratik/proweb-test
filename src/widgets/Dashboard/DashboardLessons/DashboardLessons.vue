<template>
  <div class="dashboard-body" @touchstart="touchStart" @touchend="touchEnd">
    <ul class="lesson-lists" ref="dashboardContent">
      <li
        class="lesson-list"
        v-for="(lesson, index) in sortedLessons"
        :ref="(el) => index === 0 && setFirstItem(el as HTMLLIElement)"
        :key="lesson.id"
      >
        <CardItem
          draggable="true"
          class="lesson-card"
          :item="lesson"
          :lesson_days="formattedDays(lesson.groups)"
          :start_day="formattedStartDay(lesson.groups)"
          :lessons_time="formattedTime(lesson.groups)"
          :open_lessons="formatedOpenLessons(lesson.open_lessons)"
          @dragstart="onLessonDragStart(index)"
          @dragover.prevent
          @drop="onLessonDrop(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CardItem from "@/shared/ui/CardItem/cardItem.vue";
import OpenLesson from "@/types/openlesson";
import { computed, reactive, ref, watch } from "vue";
import { useLessonsStore } from "@/store/lessonsState";
import LessonGroup from "@/types/lessonGroups";
import { useScrollState } from "@/store/scrollState";
import Lesson from "@/types/lesson";

// store
const lessonStore = useLessonsStore();
const scrollStore = useScrollState();

// scroll
const dashboardContent = ref<HTMLUListElement | null>(null);
const firstListItem = ref<HTMLLIElement | null>(null);
const startX = ref(0);
const startY = ref(0);
const lessonDragIndex = ref<null | number>(null);

//lessons
const sortedLessons = reactive<Lesson[]>([]);

watch(
  [() => scrollStore.getScrollIndex, () => lessonStore.getFilteredLessons],
  ([newScroll, newLessons], [oldScroll, oldLessons]) => {
    if (newScroll !== oldScroll) {
      setListScroll();
    }
    if (newLessons !== oldLessons) {
      newLessons
        .slice()
        .sort(
          (a, b) =>
            new Date(a.groups[0].start_date).getTime() -
            new Date(b.groups[0].start_date).getTime()
        );
      sortedLessons.splice(0, sortedLessons.length, ...newLessons);
    }
  },
  { immediate: true }
);

// FORMATING LOGIC
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

//scrool logic
function setFirstItem(el: HTMLLIElement | null) {
  if (el) firstListItem.value = el;
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
function setListScroll() {
  if (dashboardContent.value && firstListItem.value) {
    dashboardContent.value.style.transform = `translateX(
    -${scrollStore.getScrollIndex * firstListItem.value.offsetWidth}px`;
  }
}

// DND LOGIC
function onLessonDragStart(draggingLessonindex: number) {
  lessonDragIndex.value = draggingLessonindex;
}
function onLessonDrop(dropLessonIndex: number) {
  if (lessonDragIndex.value === null || lessonDragIndex.value === dropLessonIndex) return;
  const updatedLessons = [...sortedLessons];
  const [movedLesson] = updatedLessons.splice(lessonDragIndex.value, 1);
  updatedLessons.splice(dropLessonIndex, 0, movedLesson);
  sortedLessons.splice(0, sortedLessons.length, ...updatedLessons);
  lessonStore.resetFilteredLessons(sortedLessons);
  lessonDragIndex.value = null;
}
</script>
