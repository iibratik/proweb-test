import { defineStore } from "pinia";
import { useLessonsStore } from "./lessonsState";
export const useScrollState = defineStore('scroll-store', {
    state() {
        return {
            scrollWidth: 0,
            stopScroll: false,
            scrollIndex: 0,
            scrollEndBrackPoint: 0
        }
    },
    getters: {
        getScrollIndex(state) {
            return state.scrollIndex
        },
    },
    actions: {
        setStopScroll() {
        },
        addScrollWidth() {
            const lessonStore = useLessonsStore()
            if (this.scrollIndex === lessonStore.getFilteredLessons.length - Math.abs(this.scrollEndBrackPoint)) {
                return;
            }
            this.scrollIndex++

        },
        reduceScrollWidth() {
            if (this.scrollIndex == 0) {
                return
            }
            this.scrollIndex--
        },
        setScrollOptions(deviceWidth: number) {
            switch (true) {
                case deviceWidth >= 1920:
                    this.scrollEndBrackPoint = 3
                    break;
                case deviceWidth >= 1440:
                    this.scrollEndBrackPoint = 1
                    break;
                case deviceWidth >= 1024:
                    this.scrollEndBrackPoint = 1
                    break;
                case deviceWidth >= 768:
                    this.scrollEndBrackPoint = 1
                    break;
                default:
                    this.scrollEndBrackPoint = 1

                    break;
            }

        }
    }
})