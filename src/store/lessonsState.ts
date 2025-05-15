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
        getLessons(state) {
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
            if (this.commonLessons.length == 0) {
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
                            lesson.open_lessons.forEach(ol => this.openLessons.push(ol))
                            if (lesson.groups.length > 0) {
                                this.commonLessons.push(lesson)
                                this.filteredLessons.push(lesson)
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
            this.filteredLessons = this.filterByAllowed(this.filteredLessons, this.activeFilterCategory)
            console.log(this.filteredLessons);
        },
        filterByAllowed(lessons: Lesson[], allowedCategories: LessonCategory[]) {
            const allowedSet = new Set(allowedCategories.map(cat => cat.key))

            return lessons.filter(lesson =>
                lesson.categories.some(cat => allowedSet.has(cat.key))
            )
        }
    }
})