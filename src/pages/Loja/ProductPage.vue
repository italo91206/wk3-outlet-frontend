<template>
    <h2>Nome do produto: {{ slug }}</h2>
</template>

<script>
import service from '@/services/produto/produto-service.js'

export default {
    name: "ProductPage",
    data() {
        return {
            produto: {}
        }
    },
    methods: {
        async recuperarProduto(){
            const response = await service.recuperarProduto(slug)
            if(response.data.success)
                this.produtos = response.data.dados;
        }
    },
    mounted() {
        this.$router.params
        alert(this.slug)
    }
}
</script>