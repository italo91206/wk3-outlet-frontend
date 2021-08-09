<template>
  <section>
    <ul>
      <li>
        <router-link to="/admin/cores">
          Gerenciar Cores
        </router-link>
      </li>

      <li>
        <router-link to="/admin/tamanhos">
          Gerenciar Tamanhos
        </router-link>
      </li>

      <li>
        <router-link to="/admin/modelos">
          Gerenciar Modelos
        </router-link>
      </li>

      <li>
        <router-link to="/admin/marcas">
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