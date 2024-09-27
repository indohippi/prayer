<template>
    <div class="daily-verses">
      <h1>Daily Verses</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <h2>{{ currentDate }}</h2>
        <blockquote>{{ dailyVerse.text }}</blockquote>
        <p>- {{ dailyVerse.reference }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'DailyVerses',
    data() {
      return {
        loading: true,
        error: null,
        dailyVerse: null
      }
    },
    computed: {
      ...mapState(['user']),
      currentDate() {
        return new Date().toLocaleDateString()
      }
    },
    mounted() {
      this.fetchDailyVerse()
    },
    methods: {
      async fetchDailyVerse() {
        try {
          // In a real app, you would call your backend API here
          // For this example, we'll just create a sample verse
          await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
          this.dailyVerse = {
            text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
            reference: "John 3:16"
          }
          this.loading = false
        } catch (error) {
          this.error = "Failed to fetch daily verse. Please try again later."
          this.loading = false
        }
      }
    }
  }
  </script>