import { defineStore } from "pinia";

export const useDeveloperState = defineStore('developer', {
    state: () => {
        return {
            developerPhoto: ''
        }
    }
})