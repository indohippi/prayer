<template>
  <div class="home container">
    <h1 class="title">Welcome to Your Prayer App</h1>
    <div class="content">
      <p v-if="user" class="greeting">Hello, <span class="denomination">{{ user.denomination }}</span> follower!</p>
      <p v-else class="greeting">Please set up your profile to get started.</p>
      <router-link v-if="!user" to="/profile" class="cta-button">Set Up Profile</router-link>
      <router-link v-else to="/generate-prayer" class="cta-button">Generate a Prayer</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding-top: 50px;
}

.title {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #2C3E50;
}

.greeting {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.denomination {
  color: #8B0000;
  font-weight: 600;
}

.cta-button {
  display: inline-block;
  background-color: #D4AF37;
  color: #2C3E50;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1.1em;
  transition: background-color 0.3s, transform 0.3s;
}

.cta-button:hover {
  background-color: #C19B20;
  transform: translateY(-2px);
  text-decoration: none;
}
</style>