import Lesson from "@/types/lesson";
import LessonCategory from "@/types/lessonCategory";
import OpenLesson from "@/types/openlesson";
import { defineStore } from "pinia";

export const useLessonsStore = defineStore('lessons', {
    state: () => {
        return {
            lessonsCategory: [] as LessonCategory[],
            commonLessons: [] as Lesson[],
            openLessons: [] as OpenLesson[],
            activeFilterCategory: [] as LessonCategory[],
            filteredLessons: [] as Lesson[]
        }
    },
    getters: {
        getCommonLessons(state) {
            return state.commonLessons
        },
        getLessonCategories(state) {
            return state.lessonsCategory
        },
        getActiveFilterCategory(state) {
            return state.activeFilterCategory
        },
        getFilteredLessons(state) {
            return state.filteredLessons
        }
    },
    actions: {
        async getAllLessons() {
            if (this.commonLessons.length === 0) {
                try {
                    const response = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/')
                    const json = response.json()
                    json.then((body) => {
                        const result = body.results
                        result.forEach((lesson: Lesson) => {
                            lesson.categories.forEach((category: LessonCategory) => {

                                if (!this.lessonsCategory.some(existCategory => existCategory.id === category.id)) {
                                    this.lessonsCategory.push(category)
                                }
                            })
                            const sortedOpenLessons = lesson.open_lessons.sort((a, b) => {
                                const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
                                if (dateDiff !== 0) return dateDiff
                                return a.time.localeCompare(b.time)
                            })
                            const sortedGroups = lesson.groups.sort((a, b) => {
                                const dateDiff = new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                                if (dateDiff !== 0) return dateDiff
                                return a.study_time.localeCompare(b.study_time)
                            })
                            if (lesson.groups.length > 0) {
                                this.commonLessons.push({
                                    ...lesson,
                                    groups: sortedGroups,
                                    open_lessons: sortedOpenLessons,
                                })
                                this.filteredLessons.push({
                                    ...lesson,
                                    groups: sortedGroups,
                                    open_lessons: sortedOpenLessons,
                                })
                            }
                        })
                    })
                } catch (error) {
                    console.error(error);

                }
            }
        },
        getFilterCategory(category: LessonCategory) {
            const index = this.activeFilterCategory.findIndex(c => c.id === category.id)

            if (index === -1) {
                this.activeFilterCategory.push(category)
            } else {
                this.activeFilterCategory.splice(index, 1)
            }

            if (this.activeFilterCategory.length <= 0) {
                this.filteredLessons = this.commonLessons
            } else {
                this.setFilteredLesson()
            }

        },
        setFilteredLesson() {
            this.filteredLessons = [...this.commonLessons];
            this.filteredLessons = this.filterByAllowed(this.filteredLessons, this.activeFilterCategory)
            this.filteredLessons = this.sortLessonsByEarliestGroupDate(this.filteredLessons);
        },
        filterByAllowed(lessons: Lesson[], allowedCategories: LessonCategory[]): Lesson[] {
            const allowedKeys = new Set(allowedCategories.map(cat => cat.key));
            return lessons.filter(lesson => {
                const lessonCategoryKeys = lesson.categories.map(cat => cat.key);
                const hasMatch = lessonCategoryKeys.some(key => allowedKeys.has(key))
                return hasMatch;
            });
        },
        sortLessonsByEarliestGroupDate(lessons: Lesson[]): Lesson[] {
            return lessons.slice().sort((a, b) => {
                const dateA = this.getEarliestGroupDate(a);
                const dateB = this.getEarliestGroupDate(b);
                return dateA - dateB;
            });
        },
        getEarliestGroupDate(lesson: Lesson): number {
            if (!lesson.groups?.length) return Infinity;

            return Math.min(
                ...lesson.groups
                    .map(group => new Date(group.start_date).getTime())
                    .filter(time => !isNaN(time))
            );
        },
        resetLessons() {
            this.lessonsCategory = []
            this.commonLessons = []
            this.openLessons = []
            this.activeFilterCategory = []
            this.filteredLessons = []
        }
    }
})