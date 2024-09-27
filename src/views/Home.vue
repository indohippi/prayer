<template>
    <div class="home">
      <h1>Welcome to Your Prayer App</h1>
      <p v-if="user">Hello, {{ user.denomination }} follower!</p>
      <p v-else>Please set up your profile to get started.</p>
      <router-link to="/profile" v-if="!user">Set Up Profile</router-link>
      <router-link to="/generate-prayer" v-else>Generate a Prayer</router-link>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'Home',
    computed: {
      ...mapState(['user'])
    }
  }
  </script>