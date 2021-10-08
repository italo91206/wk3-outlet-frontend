<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do tamanho"
                  v-model="tamanhoToPost.tamanho"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/tamanhos" class="mr-2">Voltar</v-btn>
        <v-btn @click="novo" color="success">Salvar tamanho</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js';
import rules from '@/utils/rules.js';

export default {
  name: 'TamanhosNovo',
  data(){
    return {
      tamanhoToPost: {
        tamanho: ''
      },
      erro_nome: null,
      rules: rules,
    }
  },
  methods:{
    async novo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.novoTamanho(this.tamanhoToPost);
        if(response.data.success){
          this.$toast.success('Tamanho foi cadastrado com sucesso');
          this.$router.push('/admin/tamanhos');
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
    }
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>