import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "@/pages/Dashboard/DashboardView.vue";
import ProfileView from "@/pages/ProfileView/ProfileView.vue";

const routes = [
    {
        path: '/',
        component: DashboardView,
        name: 'dashboard',
        meta: { navbarTitle: 'Запуски' }
    },
    {
        path: '/profile',
        component: ProfileView,
        name: 'profile',
        meta: { navbarTitle: 'Обо мне' }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router