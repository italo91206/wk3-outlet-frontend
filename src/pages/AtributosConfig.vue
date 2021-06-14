<template>
  <section>
    <ul>
      <li>
        <router-link to="/cores">
          Gerenciar Cores
        </router-link>
      </li>

      <li>
        <router-link to="/">
          Gerenciar Tamanhos
        </router-link>
      </li>

      <li>
        <router-link to="/modelos">
          Gerenciar Modelos
        </router-link>
      </li>

      <li>
        <router-link to="/marcas">
          Gerenciar Marcas
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "AtributosConfig"
}
</script>

<style>

</style>