<template>
    <div class="prayer-generator container">
      <h1 class="title">Generate a Prayer</h1>
      <form @submit.prevent="generatePrayer" class="prayer-form">
        <div class="form-group">
          <label for="prayerTopic">Prayer Topic:</label>
          <select id="prayerTopic" v-model="form.prayerTopic" required>
            <option value="gratitude">Gratitude</option>
            <option value="healing">Healing</option>
            <option value="guidance">Guidance</option>
            <option value="forgiveness">Forgiveness</option>
            <option value="protection">Protection</option>
            <option value="strength">Strength</option>
            <option value="peace">Peace</option>
            <option value="wisdom">Wisdom</option>
            <option value="family">Family</option>
            <option value="work">Work/Career</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="mood">Your Current Mood:</label>
          <select id="mood" v-model="form.mood" required>
            <option value="joyful">Joyful</option>
            <option value="grateful">Grateful</option>
            <option value="hopeful">Hopeful</option>
            <option value="anxious">Anxious</option>
            <option value="fearful">Fearful</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="peaceful">Peaceful</option>
            <option value="confused">Confused</option>
            <option value="determined">Determined</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="prayerLength">Prayer Length:</label>
          <select id="prayerLength" v-model="form.prayerLength" required>
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (3-5 sentences)</option>
            <option value="long">Long (6-8 sentences)</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="prayerStyle">Prayer Style:</label>
          <select id="prayerStyle" v-model="form.prayerStyle" required>
            <option value="formal">Formal</option>
            <option value="conversational">Conversational</option>
            <option value="poetic">Poetic</option>
            <option value="scriptural">Scripture-based</option>
          </select>
        </div>
  
        <button type="submit" class="generate-button" :disabled="isLoading">
          {{ isLoading ? 'Generating...' : 'Generate Prayer' }}
        </button>
      </form>
  
      <div v-if="generatedPrayer" class="generated-prayer">
        <h2>Your Generated Prayer:</h2>
        <p class="prayer-text">{{ generatedPrayer }}</p>
        <button @click="handleSavePrayer">Save Prayer</button>
      </div>
  
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'PrayerGenerator',
    data() {
      return {
        form: {
          prayerTopic: 'gratitude',
          mood: 'grateful',
          prayerLength: 'medium',
          prayerStyle: 'conversational'
        },
        generatedPrayer: null,
        isLoading: false,
        error: null
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['savePrayer']),
      async generatePrayer() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await axios.post('/api/generate-prayer', {
            ...this.form,
            denomination: this.user.denomination // assuming user has denomination attribute
          });
          this.generatedPrayer = response.data.prayer;
        } catch (error) {
          this.error = 'Failed to generate prayer. Please try again.';
          console.error('Error generating prayer:', error);
        } finally {
          this.isLoading = false;
        }
      },
      handleSavePrayer() {
        const prayer = {
          id: Date.now(), // Generates a unique ID for the prayer
          text: this.generatedPrayer, // The generated prayer text
          topic: this.form.prayerTopic,
          createdAt: new Date().toISOString() // Store the current date as the creation time
        };
        this.savePrayer(prayer); // Call the Vuex action to save the prayer
        alert('Prayer saved successfully!'); // Show success message to the user
      }
    }
  }
  </script>
  
  <style scoped>
  .prayer-generator {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .prayer-form {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
  }
  
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #2C3E50;
    border-radius: 4px;
    background-color: white;
  }
  
  .generate-button, .save-button {
    width: 100%;
    padding: 12px;
    font-size: 1.1em;
    background-color: #D4AF37;
    color: #2C3E50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .generate-button:hover, .save-button:hover {
    background-color: #C19B20;
  }
  
  .generate-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .generated-prayer {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
  }
  
  .prayer-text {
    font-style: italic;
    margin-bottom: 20px;
    line-height: 1.8;
  }
  
  .error {
    color: #8B0000;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  