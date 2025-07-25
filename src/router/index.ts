import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentsView/ComponentsView.vue'),
    },
    {
      path: '/components/dropdown-list',
      name: 'dropdown-list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ComponentsView/Pages/DropdownListView.vue'),
    },
    {
      path: '/components/calendar',
      name: 'calendar',
      component: () => import('../views/ComponentsView/Pages/CalendarView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView/ProjectsView.vue'),
    },
    {
      path: '/projects/overtime',
      name: 'overtime-project',
            component: () => import('../views/ProjectsView/Pages/OvertimeProjectView/index.vue'),
    },
  ],
})

export default router
