<template>
  <div id="app">
    <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/generate-prayer">Generate Prayer</router-link> |
      <router-link to="/saved-prayers">Saved Prayers</router-link> |
      <router-link to="/daily-verses">Daily Verses</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { authService } from './services/auth';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['setUser', 'loadSavedPrayers'])
  },
  created() {
    const user = authService.getCurrentUser();
    if (user) {
      this.setUser(user);
      this.loadSavedPrayers();
    }
  }
}
</script>