<template>
  <section class="container">
    <h2>Isto é a página "Dashboard.vue"</h2>
    
    <Helper>
      <p>
        Utilize o menu lateral à esquerda para navegar. Todas as entidades e ativos de configuração estão agrupados por tipo de ativo e logo depois por tipo de ação.
      </p>
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