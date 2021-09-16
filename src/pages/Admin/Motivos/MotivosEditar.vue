<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do motivo"
                  v-model="motivoToPost.motivo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/motivos" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar motivo</v-btn>
        <v-btn @click="salvarMotivo" color="success">Salvar motivo</v-btn>
      </v-row>
    </v-container>
  </v-main>
  
  <!-- <main id="motivos-editar">
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
  </main> -->
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
      if(response.data.success)
        this.motivoToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/motivos');
      }
    },
    async salvarMotivo(){
      const response = await service.atualizarMotivo(this.motivoToPost);
      if(response.data.success){
        this.$toast.success('Motivo foi atualizado com sucesso.');
        this.$router.push('/admin/motivos');
      }
      else
        this.$toast.error(response.data.message);
    },
    async deletarMotivo(id){
      const response = await service.deletarMotivo(id);
      if(response.data.success){
        this.$toast.success('Motivo foi excluído com sucesso.');
        this.$router.push('/admin/motivos');
      }
      else
        this.$toast.error(response.data.message);
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

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>