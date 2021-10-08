<template>
  <section>
    <div v-for="variacao in data" :key="variacao.variacao_id" class="variacao variacao-cor">
      Cor: {{variacao.cor_id}}
    </div>

    <div v-for="variacao in data" :key="variacao.variacao_id" class="variacao variacao-tamanho">
      Tamanho: {{variacao.tamanho_id}}
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProdutoVariation',
  props: ['data'],
  data(){
    return {
      msg: null,
    }
  }
}
</script>

<style lang="css">

</style>