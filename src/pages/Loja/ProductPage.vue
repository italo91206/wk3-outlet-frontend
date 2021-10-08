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
      <p><b>Modelo:</b> {{produto.modelo_id}}</p>
      <p><b>Marca:</b> {{produto.marca_id}}</p>
      <p><b>Categoria:</b> {{produto.categoria_id}}</p>

      <produto-variation :data="produto.variacoes">
      </produto-variation>

      <button @click="addToCart">
        Adicionar ao carrinho
      </button>
    </section>
    
  </main>
</template>

<script>
import service from "@/services/produto/produto-service.js";
import ProdutoVariation from '@/components/Loja/ProdutoVariation';

export default {
  name: "ProductPage",
  components: {
    ProdutoVariation
  },
  data() {
    return {
      produto: null,
      produtoSelecionado: null,
      loading: true,
    };
  },
  methods: {
    async recuperarProduto(url) {
      const response = await service.recuperarProduto(url);
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
      if(this.produtoSelecionado == null && this.produto.variacoes != null){
        this.$toast.error('Selecione uma variação');
      }
      else{
        this.$store.dispatch('carrinho/adicionarProduto', this.produto);
      }
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