<template>
  <div id="app">
    <wk3header v-if="$route.layout != 'Login'"></wk3header>
    <router-view></router-view>
  </div>
</template>

<script>
import wk3header from '@/components/wk3header.vue'

export default {
  name: 'App',
  components: {
    wk3header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
