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
      state.savedPrayers.push(prayer);
    },
    removeSavedPrayer(state, prayerId) {
      state.savedPrayers = state.savedPrayers.filter(prayer => prayer.id !== prayerId);
    },
    setSavedPrayers(state, prayers) {
      state.savedPrayers = prayers;
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
      if (state.user && state.user.id) {
        const updatedPrayers = [...state.savedPrayers, prayer];
        localStorage.setItem(`prayers_${state.user.id}`, JSON.stringify(updatedPrayers));
        commit('addSavedPrayer', prayer);
      }
    },
    loadSavedPrayers({ commit, state }) {
      if (state.user && state.user.id) {
        const savedPrayers = JSON.parse(localStorage.getItem(`prayers_${state.user.id}`) || '[]');
        commit('setSavedPrayers', savedPrayers);
      } else {
        commit('setSavedPrayers', []);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
});