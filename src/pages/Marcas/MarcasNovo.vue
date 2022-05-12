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
        <v-btn to="/marcas" class="mr-2">Voltar</v-btn>
        <v-btn @click="novaMarca" color="success">Salvar marca</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>Adicionar nova marca</template>

      <template #texto>
        <p>
          Na tela de cadastro de uma nova marca é apresentado o campo "Nome da marca" para que seja inserido o nome da marca a ser cadastrada.<br/>Evite nomes longos e complexos.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/marcas/marcas-service'
import rules from '@/utils/rules.js';

export default {
  name: 'MarcasNovo',
  components: {
    Helper
  },
  data(){
    return {
      marcaToPost: {},
      isChanged: true,
      erro_nome: null,
      rules: rules,
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
          this.$router.push('/marcas');
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
