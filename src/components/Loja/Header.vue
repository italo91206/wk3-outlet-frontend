<template>
  <header id="wk-header">
    <div class="wk-container flex">
      <router-link to="/">Este é o header</router-link>
      <ul class="items-menu">
        <li><a @click="toggleCarrinho">abrir carrinho</a></li>
      </ul>
    </div>

    <Carrinho :toggled="carrinhoToggled"/>
  </header>
</template>

<script>
import Carrinho from '@/components/Loja/Carrinho'

export default {
  name: "LojaHeader",
  components: {
    Carrinho
  },
  data(){
    return {
      carrinhoToggled: false,
    }
  },
  methods: {
    toggleCarrinho(){
      this.carrinhoToggled = !this.carrinhoToggled;
    }
  }
};
</script>

<style lang="css">
#wk-header {
  height: 100px;
  border-bottom: solid 2px #bdb9b9;
}
.items-menu{
  width: 100%;
}
.wk-container{
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 0px !important;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>