<template>
  <main id="tamanhos-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
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
        <button class="btn btn-success float-right" :class="{ disabled: isChange }" @click="salvarMotivo">Salvar Tamanho</button>
        <button class="btn btn-danger float-right" @click="deletar">Deletar Tamanho</button>
        <router-link class="btn btn-default float-right" to="/admin/tamanhos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosEditar',
  data(){
    return {
      tamanhoToPost: {},
      isChange: true
    }
  },
  methods: {
    async listarTamanho(id){
      const response = await service.listarTamanho(id);
      this.tamanhoToPost = response.data;
    },
    async salvarMotivo(){
      const response = await service.atualizarTamanho(this.tamanhoToPost);
      console.log(response.data);
    },
    async deletarTamanho(id){
      const response = await service.deletarTamanho(id);
      console.log(response.data);
    },
    mudou(){
      this.isChange = false;
    },
    deletar(){
      const resposta = confirm('Deseja mesmo deletar este tamanho? Esta ação é irreversível');
      if(resposta){
        const id = this.$route.params.id;
        this.deletarTamanho(id);
      }
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarTamanho(id);
  }
}
</script>

<style>

</style>