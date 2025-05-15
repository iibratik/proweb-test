<template>
  <section class="dashboard">
    <div class="dashboard-content">
      <DashboardNavbar />
      <DashboardLessons />
    </div>
  </section>
</template>

<script lang="ts" setup>
import "./dashboardView.scss";
import DashboardLessons from "@/widgets/Dashboard/DashboardLessons/DashboardLessons.vue";
import DashboardNavbar from "@/widgets/Dashboard/DashboardNavbar/DashboardNavbar.vue";
</script>
