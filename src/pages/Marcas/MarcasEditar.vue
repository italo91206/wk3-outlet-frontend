<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form
            v-model="isValidForm"
            ref="form"
            @submit.prevent
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da marca"
                  v-model="marcaToPost.marca"
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/marcas" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar marca</v-btn>
        <v-btn @click="salvarMarca" :disabled="isValidForm == false" color="success">Salvar marca</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Editar marca
      </template>

      <template #texto>
        <p>
          Na tela de edição da marca é apresentado o campo "Nome da marca" para que seja alterado o nome da marca a ser cadastrada.<br/><br/>Ao apertar em "salvar" as alterações são salvas.<br/>Ao apertar em "deletar" a marca em questão será deletada.<br/>Ao apertar em "voltar" o usuário é redirecionado de volta para a listagem de marcas
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/marcas/marcas-service';
import rules from '@/utils/rules.js';

export default {
  name: 'MarcasEditar',
  components: {
    Helper
  },
  data(){
    return {
      marcaToPost: {},
      isValidForm: false,
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
      this.$refs.form.validate()

      if(this.isValidForm){
        const response = await service.salvarMarca(this.marcaToPost);
        if(response.data.success){
          this.$toast.success('Marca foi atualizada com sucesso');
          this.$router.push('/marcas');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarMarca(id){
      const response = await service.deletarMarca(id);
      if(response.data.success){
        this.$toast.success('Marca foi removida com sucesso');
        this.$router.push('/marcas');
      }
      else
        this.$toast.error(response.data.message);
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
