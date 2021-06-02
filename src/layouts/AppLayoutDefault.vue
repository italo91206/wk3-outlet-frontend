<template>
  <main v-if="!maintenance">
    <h2>Eba, estamos no ar!</h2>
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
export default {
  name: "AppLayoutDefault",
  data() {
    return{
      maintenance: true
    }
  }
}
</script>

<style>
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