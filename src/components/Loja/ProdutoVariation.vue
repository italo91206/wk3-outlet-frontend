<template>
  <section class="container">
    <h2>Cores :</h2>
    <div class="flex">
      <button 
        @click="selecionaCor(cor.cor)"
        v-for="cor in cores" 
        :key="cor.cor_id" class="variacao variacao-cor" :style="`background-color: ${cor.hexa}`">
        {{cor.cor}}
      </button>
    </div>

    <h2>Tamanhos :</h2>
    <div class="flex">
      <button 
        @click="selecionaTamanho(tamanho.tamanho)"
        v-for="tamanho in tamanhos" :key="tamanho.tamanho_id" class="variacao variacao-tamanho">
        {{tamanho.tamanho}}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProdutoVariation',
  props: ['data'],
  data(){
    return {
      cores: [],
      tamanhos: [],
    }
  },
  methods: {
    processaVariacoes(){
      let data = this.data;
      // primeira iteração para as cores
      data.forEach((variacao) => {
        if(variacao.cor)
          this.cores.push(variacao);
      })

      // segunda iteração para os tamanhos
      data.forEach((variacao) => {
        if(variacao.tamanho)
          this.tamanhos.push(variacao);
      })
    },
    selecionaCor(cor){
      let resultado = this.data.filter((variacao) => { 
        return variacao.cor == cor;
      });
      this.tamanhos = resultado;
    },
    selecionaTamanho(tamanho){
      const resultado = this.data.filter(variacao => { return variacao.tamanho == tamanho });
      console.log(resultado);
    }
  },
  mounted() {
    this.processaVariacoes();
  }
}
</script>

<style lang="css">
button.variacao {
  border: solid 1px grey;
}
</style>