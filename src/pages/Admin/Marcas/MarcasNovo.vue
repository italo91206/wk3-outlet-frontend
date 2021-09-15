<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da marca"
                  v-model="marcaToPost.marca"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/marcas" class="mr-2">Voltar</v-btn>
        <v-btn @click="novaMarca" color="success">Salvar marca</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/marcas/marcas-service'

export default {
  name: 'MarcasNovo',
  data(){
    return {
      marcaToPost: {},
      isChanged: true,
      erro_nome: null,
    }
  },
  methods:{
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    async novaMarca(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos');
      else{
        const response = await service.novaMarca(this.marcaToPost);
        if(response.data.success){
          this.$toast.success('Marca foi cadastrada com sucesso');
          this.$router.push('/admin/marcas');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    mudou(){
      this.isChanged = false;
    }
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>