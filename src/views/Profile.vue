<template>
    <div class="profile">
      <h1>User Profile</h1>
      <form @submit.prevent="saveProfile">
        <div>
          <label for="denomination">Denomination:</label>
          <input id="denomination" v-model="profile.denomination" required>
        </div>
        <div>
          <label for="sex">Sex:</label>
          <select id="sex" v-model="profile.sex" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label for="age">Age:</label>
          <input id="age" type="number" v-model="profile.age" required>
        </div>
        <!-- Add more fields as needed -->
        <button type="submit">Save Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex'
  
  export default {
    name: 'Profile',
    data() {
      return {
        profile: {
          denomination: '',
          sex: '',
          age: null,
        }
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      saveProfile() {
        // Save profile to Vuex store
        this.setUser(this.profile)
        // You might also want to save this to a backend API
        console.log('Profile saved:', this.profile)
      }
    }
  }
  </script>