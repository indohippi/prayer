<template>
    <div class="saved-prayers container">
      <h1 class="title">Your Saved Prayers</h1>
      <div v-if="savedPrayers.length === 0" class="no-prayers">
        <p>You haven't saved any prayers yet.</p>
        <router-link to="/generate-prayer" class="generate-link">Generate a Prayer</router-link>
      </div>
      <ul v-else class="prayer-list">
        <li v-for="prayer in validSavedPrayers" :key="prayer.id" class="prayer-item">
          <h3 class="prayer-topic">{{ capitalizeFirstLetter(prayer.topic || 'Untitled') }}</h3>
          <p class="prayer-text">{{ prayer.text }}</p>
          <p class="prayer-date">Created on: {{ formatDate(prayer.createdAt) }}</p>
          <button @click="deletePrayer(prayer.id)" class="delete-button">Delete</button>
        </li>
      </ul>
      <div class="debug-info">
        <h3>Debug Info:</h3>
        <pre>{{ JSON.stringify(savedPrayers, null, 2) }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    name: 'SavedPrayers',
    computed: {
      ...mapState(['savedPrayers']),
      validSavedPrayers() {
        return this.savedPrayers.filter(prayer => 
          prayer && typeof prayer === 'object' && prayer.id && prayer.text && prayer.topic
        );
      }
    },
    methods: {
      ...mapMutations(['removeSavedPrayer']),
      deletePrayer(id) {
        if (confirm('Are you sure you want to delete this prayer?')) {
          this.removeSavedPrayer(id)
        }
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
      }
    },
    mounted() {
      console.log('Saved Prayers:', this.savedPrayers);
    }
  }
  </script>
  
  <style scoped>
  .saved-prayers {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: #2C3E50;
    font-size: 2.5em;
  }
  
  .no-prayers {
    text-align: center;
    padding: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .generate-link {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #D4AF37;
    color: #2C3E50;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.3s;
    font-weight: bold;
  }
  
  .generate-link:hover {
    background-color: #C19B20;
    transform: translateY(-2px);
  }
  
  .prayer-list {
    list-style-type: none;
    padding: 0;
  }
  
  .prayer-item {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .prayer-item:hover {
    transform: translateY(-5px);
  }
  
  .prayer-topic {
    color: #8B0000;
    margin-bottom: 10px;
    font-size: 1.4em;
  }
  
  .prayer-text {
    color: #333333;
    line-height: 1.6;
    margin-bottom: 15px;
    font-style: italic;
  }
  
  .prayer-date {
    color: #666666;
    font-size: 0.9em;
    margin-bottom: 15px;
  }
  
  .delete-button {
    background-color: #8B0000;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #660000;
  }
  </style>