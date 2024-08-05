import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashBoard.vue'
import LocationDetail from '../views/LocationDetails.vue'
import ReportView from '@/views/ReportView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {requiresAuth: true }
  },
  {
    path: '/locationdetail',
    name: 'locationdetail',
    component: LocationDetail,
    meta: {requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'reportPage',
    component: ReportView,
    meta: {requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
