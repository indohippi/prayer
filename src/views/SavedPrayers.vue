<template>
    <div class="saved-prayers">
      <h1>Your Saved Prayers</h1>
      <div v-if="savedPrayers.length === 0">
        <p>You haven't saved any prayers yet.</p>
        <router-link to="/generate-prayer">Generate a Prayer</router-link>
      </div>
      <ul v-else>
        <li v-for="prayer in savedPrayers" :key="prayer.id">
          <h3>{{ prayer.topic }}</h3>
          <p>{{ prayer.text }}</p>
          <p>Created on: {{ new Date(prayer.createdAt).toLocaleDateString() }}</p>
          <button @click="deletePrayer(prayer.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    name: 'SavedPrayers',
    computed: {
      ...mapState(['savedPrayers'])
    },
    methods: {
      ...mapMutations(['removeSavedPrayer']),
      deletePrayer(id) {
        if (confirm('Are you sure you want to delete this prayer?')) {
          this.removeSavedPrayer(id)
        }
      }
    }
  }
  </script>