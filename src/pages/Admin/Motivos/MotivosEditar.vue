<template>
  <main id="motivos-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="">Descrição motivo</label>
                <input class="col-sm-8 form-control" v-model="motivoToPost.motivo" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button class="btn btn-success float-right" :class="{ disabled: isChange }" @click="salvarMotivo">Salvar Motivo</button>
        <button class="btn btn-danger float-right" @click="deletar">Deletar Motivo</button>
        <router-link class="btn btn-default float-right" to="/admin/motivos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/motivo/motivos-service.js'

export default {
  name: 'MotivosEditar',
  data(){
    return {
      motivoToPost: {
        motivo: ''
      },
      isChange: true
    }
  },
  methods: {
    async getMotivo(id){
      const response = await service.getMotivo(id);
      this.motivoToPost = response.data;
    },
    async salvarMotivo(){
      const response = await service.atualizarMotivo(this.motivoToPost);
      console.log(response.data);
    },
    async deletarMotivo(id){
      const response = await service.deletarMotivo(id);
      console.log(response.data);
    },
    mudou(){
      this.isChange = false;
    },
    deletar(){
      const resposta = confirm('Deseja mesmo deletar este motivo? Esta ação é irreversível');
      if(resposta){
        const id = this.$route.params.id;
        this.deletarMotivo(id);
      }
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.getMotivo(id);
  }
};
</script>

<style>
</style>