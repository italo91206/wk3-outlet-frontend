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
                  :rules="[ rules.specialCharacters ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/modelos" class="mr-2">Voltar</v-btn>
        <v-btn @click="novoModelo" color="success">Salvar modelo</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Na tela de edição do modelo é apresentado o campo "Nome da marca" para que seja alterado o nome da marca a ser cadastrada.<br/><br/>Ao apertar em "salvar" as alterações são salvas.<br/>Ao apertar em "voltar" o usuário é redirecionado de volta para a listagem de modelos
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/modelos/modelos-service.js'
import rules from '@/utils/rules.js';

export default {
  name: 'ModelosEditar',
  components: {
    Helper
  },
  data(){
    return {
      modeloToPost: {},
      isChanged: true,
      erro_nome: null,
      rules: rules,
    }
  },
  methods: {
    async novoModelo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos')
      else{
        const response = await service.novoModelo(this.modeloToPost);
        if(response.data.success){
          this.$toast.success('Modelo foi cadastrado com sucesso!');
          this.$router.push('/admin/modelos')
        }
        else
          this.$toast.error(response.data.message);
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
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>