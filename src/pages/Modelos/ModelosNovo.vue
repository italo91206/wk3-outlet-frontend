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
                  label="Nome do modelo"
                  v-model="modeloToPost.modelo"
                  :rules="[ rules.specialCharacters, rules.required ]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/modelos" class="mr-2">Voltar</v-btn>
        <v-btn
          @click="novoModelo"
          color="success"
          :disabled="isValidForm == false"
        >
          Salvar modelo
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>Adicionar novo modelo</template>

      <template #texto>
        <p>
          Na tela de edição do modelo é apresentado o campo "Nome da marca" para que seja alterado o nome da marca a ser cadastrada.<br/><br/>Ao apertar em "salvar" as alterações são salvas.<br/>Ao apertar em "voltar" o usuário é redirecionado de volta para a listagem de modelos
        </p>
      </template>
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
      rules: rules,
      isValidForm: false,
    }
  },
  methods: {
    async novoModelo(){
      this.$refs.form.validate()
      if(this.isValidForm){
        const response = await service.novoModelo(this.modeloToPost);
        if(response.data.success){
          this.$toast.success('Modelo foi cadastrado com sucesso!');
          this.$router.push('/modelos')
        }
        else
          this.$toast.error(response.data.message);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
