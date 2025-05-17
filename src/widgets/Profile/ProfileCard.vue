<template>
  <div class="profile-card">
    <Avatar :avatar-image="profileInfo.imgLink" avatar-alt="developer image" />
    <div class="profile-card-body">
      <h2 class="profile-name">{{ profileInfo.name }}</h2>
      <p class="profile-desc">
        {{ profileInfo.age }} | {{ profileInfo.dateOfBirth }}<br />{{
          profileInfo.district
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./profileCard.scss";
import Avatar from "@/shared/ui/Avatar/Avatar.vue";
defineProps<{ profileInfo: ProfileInfo }>();
</script>

<style scoped></style>
