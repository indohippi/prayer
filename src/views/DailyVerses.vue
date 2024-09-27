<template>
    <div class="daily-verses">
      <h1>Daily Verses</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <h2>{{ currentDate }}</h2>
        <div v-for="verse in dailyVerses" :key="verse.reference">
          <blockquote>{{ verse.text }}</blockquote>
          <p>- {{ verse.reference }}</p>
        </div>
        <button @click="generateNewVerses" :disabled="isGenerating">
          {{ isGenerating ? 'Generating...' : 'Generate New Verses' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'DailyVerses',
    data() {
      return {
        loading: true,
        error: null,
        dailyVerses: [],
        isGenerating: false
      };
    },
    computed: {
      ...mapState(['user']),
      currentDate() {
        return new Date().toLocaleDateString();
      }
    },
    methods: {
      async fetchDailyVerses() {
        try {
          this.loading = true;
          const response = await axios.post('/api/daily-verses', {
            denomination: this.user.denomination,
            date: this.currentDate
          });
          this.dailyVerses = response.data.verses;
          this.loading = false;
        } catch (error) {
          this.error = "Failed to fetch daily verses. Please try again later.";
          this.loading = false;
        }
      },
      async generateNewVerses() {
        try {
          this.isGenerating = true;
          const response = await axios.post('/api/daily-verses', {
            denomination: this.user.denomination,
            date: this.currentDate,
            forceNew: true
          });
          this.dailyVerses = response.data.verses;
          this.isGenerating = false;
        } catch (error) {
          this.error = "Failed to generate new verses. Please try again later.";
          this.isGenerating = false;
        }
      }
    },
    mounted() {
      this.fetchDailyVerses();
    }
  }
  </script>