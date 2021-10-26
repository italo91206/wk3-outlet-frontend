<template>
  <aside id="wk-carrinho">
    <h2>Este é o carrinho</h2>
    <ul>
      <li v-for="produto in produtos" :key="produto.produto_id">
        <span>{{ produto.nome_produto }}</span>
        <a @click="removerProduto(produto)">remover</a>
      </li>
    </ul>
    <v-btn to="/checkout">
      Checkout
    </v-btn>
  </aside>
</template>

<script>
export default {
  name: "Carrinho",
  props: ["toggled"],
  data(){
    return {
      produtos: this.$store.state.carrinho.carrinho,
    }
  },
  methods: {
    removerProduto(produto){
      this.$store.dispatch('carrinho/removerProduto', produto);
    }
  },
  watch: {
    toggled: function() {
      document.querySelector("#wk-carrinho").classList.toggle("ativo");
    }
  }
};
</script>

<style lang="css">
#wk-carrinho {
  position: absolute;
  right: 0px;
  width: 425px;
  height: 100%;
  border-left: solid 1px black;
  background: #fff;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.2s ease;
  z-index: 1;
}

#wk-carrinho.ativo {
  transform: translateX(0%);
  transition: transform 0.2s ease;
}
</style>