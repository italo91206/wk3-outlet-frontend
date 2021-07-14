<template>
  <main id="produtos">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body table-responsive p-0">
                    <table class="table table-striped table-valign-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="produto in produtos" v-bind:key="produto.id">
                                <td>{{produto.produto_id}}</td>
                                <td>{{produto.nome}}</td>
                                <td>{{produto.preco | preco}}</td>
                                <td>{{produto.estoque}}</td>
                                <td>
                                    <button class="btn" @click="preparaEditar(marca)"><i class="fas fa-pencil-alt"></i></button>
                                    <button class="btn" @click="remover(marca)"><i class="fas fa-times"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <router-link to="/produtos/novo">
                <button class="btn btn-success float-right">
                    Novo Produto
                </button>
            </router-link>
        </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/produto/produto-service.js'

export default {
    name: 'ProdutosConfig',
    data(){
        return {
            produtos: []
        }
    },
    methods:{
        async listarProdutos(){
            const response = await service.listarProdutos()
            if(response.data.success)
                this.produtos = response.data.dados;
        }
    },
    mounted(){
        this.listarProdutos();
    },
    filters: {
        preco: function(value){
            return `R$ ${value.toFixed(2)}` ;
        }
    }
}
</script>

<style>

</style>