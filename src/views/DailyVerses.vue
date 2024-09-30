<template>
    <div class="daily-verses container">
      <h1 class="title">Daily Verses</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="verses-content">
        <h2 class="date">{{ currentDate }}</h2>
        <div v-for="verse in dailyVerses" :key="verse.reference" class="verse">
          <blockquote class="verse-text">{{ verse.text }}</blockquote>
          <p class="verse-reference">- {{ verse.reference }}</p>
        </div>
        <button @click="generateNewVerses" :disabled="isGenerating" class="generate-button">
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
        return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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
  
  <style scoped>
  .daily-verses {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .verses-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .date {
    text-align: center;
    color: #8B0000;
    margin-bottom: 30px;
  }
  
  .verse {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #D4AF37;
  }
  
  .verse-text {
    font-style: italic;
    margin-bottom: 10px;
    line-height: 1.8;
  }
  
  .verse-reference {
    text-align: right;
    font-weight: 600;
    color: #2C3E50;
  }
  
  .generate-button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 1.1em;
    background-color: #D4AF37;
    color: #2C3E50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 30px;
  }
  
  .generate-button:hover {
    background-color: #C19B20;
  }
  
  .generate-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .loading, .error {
    text-align: center;
    padding: 20px;
    font-size: 1.2em;
  }
  
  .error {
    color: #8B0000;
  }
  </style>