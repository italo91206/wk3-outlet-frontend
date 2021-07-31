<template>
    <div>
        <a v-for="produto in produtos" v-bind:key="produto.id" v-bind:href="`/${produto.url}`">
            {{ produto.nome }}
        </a>
    </div>
</template>

<script>
import service from '@/services/produto/produto-service.js'

export default {
    name: "ProductSearch",
    data() {
        return {
            produtos: []
        }
    },
    methods: {
        async listarProdutos(){
            const response = await service.listarProdutos()
            if(response.data.success)
                this.produtos = response.data.dados;
        }
    },
    mounted(){
        this.listarProdutos();
    }
}
</script>

<style>
</style>