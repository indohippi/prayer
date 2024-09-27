// src/services/auth.js

const AUTH_KEY = 'prayer_app_auth';
const USERS_KEY = 'prayer_app_users';

export const authService = {
  register(user) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === user.email)) {
      throw new Error('User already exists');
    }
    users.push({ ...user, id: Date.now() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.login(user.email, user.password);
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userWithoutPassword = Object.fromEntries(
        Object.entries(user).filter(([key]) => key !== 'password')
      );
      localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    throw new Error('Invalid credentials');
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  },

  updateUser(userData) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const index = users.findIndex(u => u.id === userData.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    }
  }
};