import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import PrayerGenerator from '../views/PrayerGenerator.vue'
import SavedPrayers from '../views/SavedPrayers.vue'
import DailyVerses from '../views/DailyVerses.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/profile', name: 'Profile', component: UserProfile },
  { path: '/generate-prayer', name: 'PrayerGenerator', component: PrayerGenerator },
  { path: '/saved-prayers', name: 'SavedPrayers', component: SavedPrayers },
  { path: '/daily-verses', name: 'DailyVerses', component: DailyVerses },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router