<template>
  <main id="tamanhos-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome do tamanho</label>
                <input type="text" v-model="tamanhoToPost.tamanho" class="col-sm-8 form-control">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button class="btn btn-success float-right" @click="novo">Salvar Tamanho</button>
        <router-link class="btn btn-default float-right" to="/admin/tamanhos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosNovo',
  data(){
    return {
      tamanhoToPost: {
        tamanho: ''
      }
    }
  },
  methods:{
    async novo(){
      const response = await service.novoTamanho(this.tamanhoToPost);
      console.log(response.data);
    }
  }
}
</script>

<style>

</style>