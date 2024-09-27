import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import PrayerGenerator from '../views/PrayerGenerator.vue'
import SavedPrayers from '../views/SavedPrayers.vue'
import DailyVerses from '../views/DailyVerses.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/generate-prayer', name: 'PrayerGenerator', component: PrayerGenerator },
  { path: '/saved-prayers', name: 'SavedPrayers', component: SavedPrayers },
  { path: '/daily-verses', name: 'DailyVerses', component: DailyVerses },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
