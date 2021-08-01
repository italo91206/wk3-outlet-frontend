<template>
    <p>Página de produto {{ $route.params.product_url }}</p>
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
        async recuperarProduto(url){
            const response = await service.recuperarProduto(url);
            this.produto = response.data.dados;
            
            if(!this.produto)
                this.$router.push('/404')
        }
    },
    mounted() {
        const url = this.$route.params.product_url;
        this.recuperarProduto(url);
    }
}
</script>