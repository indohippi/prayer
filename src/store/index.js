import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    savedPrayers: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addSavedPrayer(state, prayer) {
      state.savedPrayers.push(prayer)
    },
    removeSavedPrayer(state, prayerId) {
      state.savedPrayers = state.savedPrayers.filter(prayer => prayer.id !== prayerId)
    }
  },
  actions: {
    // Actions for API calls and complex operations
  },
  modules: {
    // Potential modules for better organization
  }
})