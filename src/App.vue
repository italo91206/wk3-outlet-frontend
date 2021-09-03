<template>
  <v-app id="app">
    <AppLayout>
      <v-main>
        <router-view></router-view>
      </v-main>
    </AppLayout>
  </v-app>
</template>

<script>
import AppLayout from '@/layouts/AppLayout'

export default {
  name: 'App',
  components: { AppLayout }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
