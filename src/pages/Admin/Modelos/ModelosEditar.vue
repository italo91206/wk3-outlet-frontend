<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do modelo"
                  v-model="modeloToPost.modelo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/modelos" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar modelo</v-btn>
        <v-btn @click="salvarModelo" color="success">Salvar modelo</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/modelos/modelos-service.js'

export default {
  name: 'ModelosEditar',
  data(){
    return {
      modeloToPost: {},
      isChanged: true,
      erro_nome: null,
    }
  },
  methods: {
    async listarModelo(id){
      const response = await service.verModelo(id);
      if(response.data.success)
        this.modeloToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/modelos');
      }
    },
    async salvarModelo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos')
      else{
        const response = await service.atualizarModelo(this.modeloToPost);
        if(response.data.success){
          this.$toast.success('Modelo foi atualizado com sucesso!');
          this.$router.push('/admin/modelos')
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarModelo(id){
      const response = await service.deletarModelo(id);
      if(response.data.success){
        this.$toast.success('Modelo foi deletado com sucesso!');
        this.$router.push('/admin/modelos');
      }
      else
        this.$toast.error(response.data.message);
    },
    deletar(){
      const response = confirm('Tem certeza que deseja remover? Esta ação é irreversível!');
      if(response){
        const id = this.$route.params.id;
        this.deletarModelo(id)
      }
    },
    mudou(){
      this.isChanged = false;
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = null;
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarModelo(id);
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>