import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "@/pages/DashboardView.vue";
import ProfileView from "@/pages/ProfileView.vue";

const routes = [
    {
        path: '/',
        component: DashboardView,
        name: 'dashboard'
    },
    {
        path: '/profile',
        component: ProfileView,
        name: 'profile'
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router