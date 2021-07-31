<template>
  <main>
    <h2>Página home da loja</h2>
    <product-search></product-search>
  </main>
</template>

<script>
import ProductSearch from "@/components/Loja/ProductSearch.vue";

export default {
    components: {
      ProductSearch
    },
    name: 'Home'
}
</script>

<style>

</style>