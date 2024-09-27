<template>
    <div class="prayer-generator">
      <h1>Generate a Prayer</h1>
      <form @submit.prevent="generatePrayer">
        <div>
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
        <div>
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
        <div>
          <label for="prayerLength">Prayer Length:</label>
          <select id="prayerLength" v-model="form.prayerLength" required>
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (3-5 sentences)</option>
            <option value="long">Long (6-8 sentences)</option>
          </select>
        </div>
        <div>
          <label for="prayerStyle">Prayer Style:</label>
          <select id="prayerStyle" v-model="form.prayerStyle" required>
            <option value="formal">Formal</option>
            <option value="conversational">Conversational</option>
            <option value="poetic">Poetic</option>
            <option value="scriptural">Scripture-based</option>
          </select>
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Generating...' : 'Generate Prayer' }}
        </button>
      </form>
      <div v-if="generatedPrayer" class="generated-prayer">
        <h2>Your Generated Prayer:</h2>
        <p>{{ generatedPrayer }}</p>
        <button @click="savePrayer">Save Prayer</button>
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
            denomination: this.user.denomination
          });
          this.generatedPrayer = response.data.prayer;
        } catch (error) {
          this.error = 'Failed to generate prayer. Please try again.';
          console.error('Error generating prayer:', error);
        } finally {
          this.isLoading = false;
        }
      },
      savePrayer() {
        const prayer = {
          id: Date.now(),
          text: this.generatedPrayer,
          topic: this.form.prayerTopic,
          createdAt: new Date().toISOString()
        };
        this.savePrayer(prayer);
        alert('Prayer saved successfully!');
      }
    }
  }
  </script>