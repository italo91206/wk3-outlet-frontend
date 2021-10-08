<template>
  <main v-if="!maintenance">
    <loja-header></loja-header>
    <slot/>
    <loja-footer></loja-footer>
  </main>

  <main v-else id="maintenance">
    <section class="wrapper">
      <div class="text-center">
        <img src="logotipo-extenso.png" alt="">
        <h2>Manutenção</h2>
        <p>
          Pedimos desculpas, estamos em manutenção.<br/>
          Volte mais tarde!
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import LojaHeader from "@/components/Loja/Header.vue";
import LojaFooter from "@/components/Loja/Footer.vue";

export default {
  name: "AppLayoutDefault",
  components: {
    LojaHeader, LojaFooter
  },
  data() {
    return{
      maintenance: false,
    }
  }
}
</script>

<style lang="css">
#maintenance{
  background-color: #FF9900;
  position: fixed;
  width: 100%;
  height: 100%;
  color: #ffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#maintenance h2{
  font-size: 60px;
  text-transform: uppercase;
  font-weight: bold;
}

#maintenance .wrapper{
  max-width: 50%;
  margin: 20% auto;
}
</style>