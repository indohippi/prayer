<template>
  <div class="profile container">
    <h1 class="title">{{ isAuthenticated ? 'User Profile' : 'Register/Login' }}</h1>
    <form @submit.prevent="handleSubmit" class="profile-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" required type="email">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="form.password" required type="password">
      </div>
      <div v-if="!isAuthenticated" class="form-group">
        <label for="denomination">Denomination:</label>
        <input id="denomination" v-model="form.denomination" required>
      </div>
      <div v-if="!isAuthenticated" class="form-group">
        <label for="age">Age:</label>
        <input id="age" v-model.number="form.age" required type="number">
      </div>
      <button type="submit" class="submit-button">{{ isAuthenticated ? 'Update Profile' : 'Register/Login' }}</button>
    </form>
    <button v-if="isAuthenticated" @click="logout" class="logout-button">Logout</button>
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

<style scoped>
.profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.profile-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.submit-button {
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

.submit-button:hover {
  background-color: #C19B20;
}

.logout-button {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  font-size: 1.1em;
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #660000;
}
</style>