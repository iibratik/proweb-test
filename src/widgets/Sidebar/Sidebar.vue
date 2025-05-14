<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h2 class="sidebar-header__title">PROWEB</h2>
      </div>
      <div class="sidebar-body">
        <ul class="slider-lists">
          <IconListItem
            :round="11"
            @click="router.push(`${item.path}`)"
            :class="item.path == route.fullPath ? 'active' : ''"
            v-for="item in routers"
            :key="item.path"
            class="slider-list"
          >
            <template v-slot:pretend>
              <img :src="getImgUrl(`${item.icon}`)" :alt="`${item.icon}icon`" />
            </template>
            <template v-slot:title>
              <span class="sidebar-list__title">{{ item.title }}</span>
            </template>
          </IconListItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import "./sidebar.scss";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

import IconListItem from "@/shared/IconListItem/IconListItem.vue";
const routers = reactive([
  {
    path: "/",
    title: "Запуски",
    icon: "flag",
  },
  {
    path: "/profile",
    title: "Обо мне",
    icon: "avatar",
  },
]);
function getImgUrl(iconName: string) {
  return new URL(`../../assets/icons/${iconName}-icon.svg`, import.meta.url).href;
}
</script>

<style scoped></style>
