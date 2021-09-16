<template>
  <v-main class="pa-12 w100">
    <v-container>
      <v-row>
        <v-card class="pa-12" width="100%" elevation="10">
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
        <v-btn @click="novoMotivo" color="success">Salvar motivo</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/motivo/motivos-service.js'

export default {
  name: "MotivosNovo",
  data(){
    return {
      motivoToPost: {
        motivo: ''
      },
      isChanged: true,
      erro_nome: null
    }
  },
  methods: {
    async novoMotivo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.novoMotivo(this.motivoToPost);
        if(response.data.success){
          this.$toast.success('Motivo foi adicionado com sucesso!');
          this.$router.push('/admin/motivos');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    mudou() {
      this.isChanged = false;
    },
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>