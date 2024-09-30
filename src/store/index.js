// store/index.js
import { createStore } from 'vuex';
import { authService } from '../services/auth';

export default createStore({
  state: {
    user: null,
    savedPrayers: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addSavedPrayer(state, prayer) {
      if (prayer && typeof prayer === 'object' && prayer.id && prayer.text && prayer.topic) {
        state.savedPrayers.push(prayer);
        console.log('Prayer added to state:', prayer);
        console.log('Updated savedPrayers:', state.savedPrayers);
      } else {
        console.error('Invalid prayer object:', prayer);
      }
    },
    removeSavedPrayer(state, prayerId) {
      state.savedPrayers = state.savedPrayers.filter(prayer => prayer.id !== prayerId);
    },
    setSavedPrayers(state, prayers) {
      state.savedPrayers = prayers;
      console.log('SavedPrayers set in state:', prayers);
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    register({ commit }, user) {
      authService.register(user);
      commit('setUser', authService.getCurrentUser());
    },
    login({ commit }, { email, password }) {
      const user = authService.login(email, password);
      commit('setUser', user);
    },
    logout({ commit }) {
      authService.logout();
      commit('setUser', null);
      commit('setSavedPrayers', []);
    },
    updateProfile({ commit }, userData) {
      authService.updateUser(userData);
      commit('setUser', userData);
    },
    savePrayer({ commit, state }, prayer) {
      console.log('Saving prayer in Vuex:', prayer);
      commit('addSavedPrayer', prayer);
      if (state.user && state.user.id) {
        // Save to localStorage
        const updatedPrayers = [...state.savedPrayers];
        localStorage.setItem(`prayers_${state.user.id}`, JSON.stringify(updatedPrayers));
        console.log('Prayers saved to localStorage:', updatedPrayers);
      } else {
        console.error('User not logged in, cannot save to localStorage');
      }
    },
    loadSavedPrayers({ commit, state }) {
      if (state.user && state.user.id) {
        const savedPrayers = JSON.parse(localStorage.getItem(`prayers_${state.user.id}`) || '[]');
        console.log('Loaded prayers from localStorage:', savedPrayers);
        commit('setSavedPrayers', savedPrayers);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
});