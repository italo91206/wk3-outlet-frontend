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

    <Helper>
      <p>
        Na tela de edição do motivo é apresentado o campo "Nome do motivo" para que seja alterado o nome do motivo a ser editado.<br/><br/>Ao apertar em "salvar" as alterações são salvas.<br/>Ao apertar em "deletar" o motivo em questão será deletado.<br/>Ao apertar em "voltar" o usuário é redirecionado de volta para a listagem de motivos.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/motivo/motivos-service.js'

export default {
  name: 'MotivosEditar',
  components: {
    Helper
  },
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
      const id = this.$route.params.id;
      this.deletarMotivo(id);
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