import { defineStore } from "pinia";

export const useScrollState = defineStore('scroll-store', {
    state() {
        return {
            scrollWidth: 0,
            stopScroll: false,
            scrollBorder: 0,
        }
    },
    getters: {
        getScrollWidth(state) {
            return state.scrollWidth
        },
        getScrollBorder(state) {
            return state.scrollBorder
        }
    },
    actions: {
        setStopScroll() {
            this.stopScroll = !this.stopScroll
        },
        addScrollWidth() {
            if (this.stopScroll) {
                return;
            } else {
                this.scrollWidth += this.setScrollWidth()
            }
        },
        reduceScrollWidth() {
            if (this.scrollWidth < 0) {
                return;
            } else {
                if (this.stopScroll) {
                    this.stopScroll = !this.stopScroll
                }
                this.scrollWidth -= this.setScrollWidth()
            }
        },
        setScrollWidth() {
            if (window.innerWidth >= 1320) {
                this.scrollBorder = 1.13
                return window.innerWidth / 6.5
            } else if (window.innerWidth >= 1140) {
                this.scrollBorder = 1.03
                return window.innerWidth / 2
            } else if (window.innerWidth >= 960) {
                this.scrollBorder = 1.03
                return window.innerWidth / 2
            } else if (window.innerWidth >= 720) {
                this.scrollBorder = 1.03
                return window.innerWidth / 2
            } else if (window.innerWidth >= 540) {
                this.scrollBorder = 1.010
                return window.innerWidth / 1.4
            }
            this.scrollBorder = 1.010
            return window.innerWidth
        }
    }
})