<template>
  <v-main>
    <side-menu></side-menu>

    <v-app>
      <slot/>
    </v-app>
  </v-main>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {SideMenu},
};
</script>
