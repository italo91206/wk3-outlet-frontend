<template>
  <main id="wk-product-page">
    <section v-if="loading" class="container">
      <h2>Carregando ....</h2>
    </section>

    <section v-else class="container">
      <p><b>Nome do produto:</b> {{produto.nome}}</p>
      <p><b>Preço do produto:</b> {{produto.preco | preco}}</p>
      <p><b>Descrição do produto:</b></p>
      <p>{{produto.descricao}}</p>
      <p><b>Modelo:</b> {{produto.modelo}}</p>
      <p><b>Marca:</b> {{produto.marca}}</p>
      <p><b>Categoria:</b> {{produto.categoria}}</p>

      <produto-variation 
        :data="produto.variacoes"
        v-on:selecionarVariacao="selecionarVariacao"
      >
      </produto-variation>

      <v-btn @click="addToCart" color="success">
        Adicionar ao carrinho
      </v-btn>
    </section>
  </main>
</template>

<script>
import service from "@/services/catalogo/catalogo-service.js";
import ProdutoVariation from '@/components/Loja/ProdutoVariation';

export default {
  name: "ProductPage",
  components: {
    ProdutoVariation
  },
  data() {
    return {
      produto: null,
      variacaoSelecionada: null,
      loading: true,
    };
  },
  methods: {
    async recuperarProduto(url) {
      const response = await service.getProduto(url);
      if(response.data.success){
        this.produto = response.data.data;
        this.loading = false;
      }
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/');
      }
    },
    addToCart(){
      let possui_variacoes = this.verificaVariacao();

      if(possui_variacoes){
        if(this.variacaoSelecionada == null)
          this.$toast.error('Selecione uma variação');
        else{
          this.produto.variacao = this.variacaoSelecionada;
          this.$store.dispatch('carrinho/adicionarProduto', this.produto);
        }
      }
      else{
        this.variacaoSelecionada = this.produto;
        this.$store.dispatch('carrinho/adicionarProduto', this.produto);
      }
    },
    verificaVariacao(){
      if(this.produto.variacoes.length == 0)
        return false;
      else
        return true;
    },
    selecionarVariacao(id){
      // console.log(this.produto.variacoes)
      // console.log(id);
      // this.variacaoSelecionada = id;
      let variacao = this.produto.variacoes.filter((item) => { return item.variacao_id === id});
      this.variacaoSelecionada = variacao[0];    
    }
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
  mounted() {
    const url = this.$route.params.product_url;
    this.recuperarProduto(url);
  }
};
</script>

<style lang="css">

</style>