<template>
    <div class="prayer-generator">
      <h1>Generate a Prayer</h1>
      <form @submit.prevent="generatePrayer">
        <div>
          <label for="topic">Prayer Topic:</label>
          <input id="topic" v-model="prayerTopic" required>
        </div>
        <div>
          <label for="mood">Your Current Mood:</label>
          <select id="mood" v-model="mood">
            <option value="joyful">Joyful</option>
            <option value="grateful">Grateful</option>
            <option value="concerned">Concerned</option>
            <option value="seeking guidance">Seeking Guidance</option>
          </select>
        </div>
        <button type="submit">Generate Prayer</button>
      </form>
      <div v-if="generatedPrayer" class="generated-prayer">
        <h2>Your Generated Prayer:</h2>
        <p>{{ generatedPrayer }}</p>
        <button @click="savePrayer">Save Prayer</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    name: 'PrayerGenerator',
    data() {
      return {
        prayerTopic: '',
        mood: 'grateful',
        generatedPrayer: null
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapMutations(['addSavedPrayer']),
      async generatePrayer() {
        // In a real app, you would call your backend API here
        // For this example, we'll just create a simple prayer
        const prayer = `Dear ${this.user.denomination === 'Christian' ? 'Lord' : 'God'}, 
          We come to you ${this.mood} and seeking your guidance on ${this.prayerTopic}. 
          Please bless us with your wisdom and grace. Amen.`
        this.generatedPrayer = prayer
      },
      savePrayer() {
        const prayer = {
          id: Date.now(), // Simple unique id
          text: this.generatedPrayer,
          topic: this.prayerTopic,
          createdAt: new Date().toISOString()
        }
        this.addSavedPrayer(prayer)
        alert('Prayer saved successfully!')
      }
    }
  }
  </script>