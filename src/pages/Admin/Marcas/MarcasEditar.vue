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
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/marcas" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar marca</v-btn>
        <v-btn @click="salvarMarca" color="success">Salvar marca</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/marcas/marcas-service';
import rules from '@/utils/rules.js';

export default {
  name: 'MarcasEditar',
  data(){
    return {
      marcaToPost: {},
      isChanged: true,
      erro_nome: null,
      rules: rules,
    }
  },
  methods:{
    async listarMarca(id){
      const response = await service.getMarca(id);
      if(response.data.success)
        this.marcaToPost = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    async salvarMarca(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos');
      else{
        const response = await service.salvarMarca(this.marcaToPost);
        if(response.data.success){
          this.$toast.success('Marca foi atualizada com sucesso');
          this.$router.push('/admin/marcas');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarMarca(id){
      const response = await service.deletarMarca(id);
      if(response.data.success){
        this.$toast.success('Marca foi removida com sucesso');
        this.$router.push('/admin/marcas');
      }
      else
        this.$toast.error(response.data.message);
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
    },
    deletar(){
      const response = confirm('Tem certeza que deseja remover? Esta ação é irreversível!');
      if(response){
        const id = this.$route.params.id;
        this.deletarMarca(id)
      }
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarMarca(id);
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>