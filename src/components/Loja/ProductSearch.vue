<template>
    <div>
        <router-link v-for="produto in produtos" v-bind:key="produto.id" v-bind:to="`/${produto.url}`">
            {{ produto.nome_produto }}
        </router-link>
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
                this.produtos = response.data.data;
        }
    },
    mounted(){
        this.listarProdutos();
    }
}
</script>

<style>
</style>