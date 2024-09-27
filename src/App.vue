<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/generate-prayer">Generate Prayer</router-link> |
      <router-link to="/saved-prayers">Saved Prayers</router-link> |
      <router-link to="/daily-verses">Daily Verses</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>