<template>
  <aside id="wk-carrinho">
    <h2>Este é o carrinho</h2>
    
    <ul id="wk-carrinho--lista-produtos">
      <li v-for="produto in produtos" :key="produto.produto_id" class="wk-carrinho--produto-item">
        
        <div class="wk-carrinho--produto-imagem">
          <template v-if="produto.imagens">
            <img :src="`http://wk3outlet.italoferreira.dev.br/static/${produto.imagens[0].url}`">
          </template>
          
          <template v-else>
            <img src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png">
          </template>
        </div>

        <div class="wk-carrinho--produto-text">
          <span class="wk-carrinho--produto-nome">{{ produto.nome_produto }}</span>

          <span 
            v-if="produto.variacao.cor"
            class="wk-carrinho--produto-variation-span"
          >
            {{produto.variacao.cor  }}
          </span>

          <span 
            v-if="produto.variacao.tamanho"
            class="wk-carrinho--produto-variation-span"
          >
            {{produto.variacao.tamanho  }}
          </span>
          
          <span class="w100 wk-carrinho--produto-preco">
            {{ produto.preco | preco}}
          </span>

          <span class="w100 wk-carrinho--produto-quantidade">
            Quantidade: 1
          </span>
        </div>

        <v-btn @click="removerProduto(produto)" class="wk-carrinho--produto-remover">
          <v-icon size="10">fas fa-trash-alt</v-icon>
        </v-btn>
      </li>
    </ul>

    <span>
      Total {{ total | preco }}
    </span>

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
      total: this.$store.state.carrinho.total,
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
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
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

.wk-carrinho--produto-item img {
    max-width: 50px;
    max-height: 80px;
    width: 100%;
    height: 100%;
}

.wk-carrinho--produto-variation-span {
  background-color: #b9b9b9;
  color: #fff;
  border-radius: 5px;
  padding: 1px 3px;
  margin-right: 10px;
}

.wk-carrinho--produto-item {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0px;
  border-bottom: solid 1px grey;
  margin: 0 15px;
  position: relative;
}

#wk-carrinho--lista-produtos {
  list-style: none;
  margin: unset;
  padding: unset;
}

.wk-carrinho--produto-text {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  flex: 0 0 80%;
}

.wk-carrinho--produto-nome {
  width: 100%;
}

.wk-carrinho--produto-remover {
  position: absolute;
  right: 15px;
  top: 15px;
}

.wk-carrinho--produto-remover {
    position: absolute;
    right: 15px;
    top: 0px;
    border-radius: 100%;
    font-size: 4px !important;
    padding: unset !important;
    width: 40px !important;
    height: 40px !important;
    min-width: unset !important;
    min-height: unset !important;
}
</style>