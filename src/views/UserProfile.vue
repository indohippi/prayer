<template>
  <div class="profile">
    <h1>{{ isAuthenticated ? 'User Profile' : 'Register/Login' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" required type="email">
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="form.password" required type="password">
      </div>
      <div v-if="!isAuthenticated">
        <label for="denomination">Denomination:</label>
        <input id="denomination" v-model="form.denomination" required>
      </div>
      <div v-if="!isAuthenticated">
        <label for="age">Age:</label>
        <input id="age" v-model.number="form.age" required type="number">
      </div>
      <button type="submit">{{ isAuthenticated ? 'Update Profile' : 'Register/Login' }}</button>
    </form>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  data() {
    return {
      form: {
        email: '',
        password: '',
        denomination: '',
        age: null
      }
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['register', 'login', 'logout', 'updateProfile']),
    handleSubmit() {
      if (this.isAuthenticated) {
        this.updateProfile(this.form);
      } else {
        try {
          this.register(this.form);
        } catch (error) {
          if (error.message === 'User already exists') {
            this.login({ email: this.form.email, password: this.form.password });
          } else {
            alert(error.message);
          }
        }
      }
    }
  },
  mounted() {
    if (this.user) {
      this.form = { ...this.user };
    }
  }
}
</script>