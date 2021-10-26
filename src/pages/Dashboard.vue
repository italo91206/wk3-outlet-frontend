<template>
  <section class="container">
    <h2>Isto é a página "Dashboard.vue"</h2>
    
    <Helper>
      teste de slot
    </Helper>
  </section>
</template>

<script>
import Helper from '@/components/Helper.vue'

export default {
  name: 'Dashboard',
  components: {
    Helper
  }
}
</script>

<style>

</style>