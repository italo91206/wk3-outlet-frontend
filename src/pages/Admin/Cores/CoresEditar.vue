<template>
  <main id="cores">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome da cor</label>
                <input type="text" v-model="corToPost.cor" class="col-sm-8 form-control">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Cor</label>
                <input type="color" v-model="corToPost.hexa" class="col-sm-8 form-control">
              </div>
            </div>
            
            <div class="row">
              <div class="col-lg-9">
                <button class="btn btn-primary float-right" :disabled="isChanged" @click="atualizarCor">Salvar</button>
                <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
                <router-link to="/admin/cores" class="btn btn-default float-right">Voltar</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/cores/cor-service.js'

export default {
    name: "CoresEditar",
    data(){
      return {
        corToPost: {}
      }
    },
    methods: {
      async listarCor(id){
        const response = await service.listarCor(id);
        this.corToPost = response.data;
      },
      async deletarCor(id){
        const response = await service.deletarCor(id);
        console.log(response.data);
      },
      async atualizarCor(){
        const response = await service.atualizarCor(this.corToPost);
        console.log(response.data)
      },
      deletar(){
        let resposta = confirm('Tem certeza que deseja excluir ? Não há volta.')
        if(resposta)
          this.deletarCor(this.corToPost.cor_id);
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.listarCor(id);
    }
}
</script>

<style>
.color-swatch{
  width: 24px;
  height: 24px;
}
</style>