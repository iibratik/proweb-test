<template>
  <div class="profile">
    <div class="profile-content">
      <ProfileCard :profile-info="profileInfo" />
      <div class="profile-body">
        <h2 class="profile-body__title">Информация</h2>
        <div class="profile-info">
          <div
            class="profile-about"
            v-for="item in developerState.knowledgeInfo"
            i
            :key="item"
          >
            <p v-html="item"></p>
          </div>
          <div class="profile-about" v-for="item in developerState.workExp" i :key="item">
            <p v-html="item"></p>
          </div>
          <ul class="profile-skills">
            <li
              class="profile-skill"
              v-for="item in developerState.techStack"
              :key="item"
            >
              <p v-html="item"></p>
            </li>
          </ul>
          <div
            class="profile-about"
            v-for="item in developerState.interest"
            i
            :key="item"
          >
            <p v-html="item"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProfileCard from "@/widgets/Profile/ProfileCard.vue";
import "./profileView.scss";
import { useDeveloperState } from "@/store/developerState";
import Loader from "@/shared/ui/Loader/loader.vue";
const developerState = useDeveloperState().$state;
const profileInfo: ProfileInfo = {
  age: developerState.age,
  dateOfBirth: developerState.dateOfBirth,
  district: developerState.district,
  imgLink: developerState.developerPhoto,
  name: developerState.name,
};
</script>
