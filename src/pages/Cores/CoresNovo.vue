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
              <v-col cols="6">
                <v-text-field
                  label="Nome da cor"
                  v-model="corToPost.cor"
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-color-picker
                  dot-size="18"
                  swatches-max-height="200"
                  v-model="colorPicker"
                  hide-inputs
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/cores" class="mr-2">Voltar</v-btn>
        <v-btn @click="salvar" :disabled="isValidForm == false" color="success">Salvar cor</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Adicionar cor
      </template>

      <template #texto>
        <p>
          Local na qual o usuário pode inserir o nome de uma nova cor, escolhendo a integração da imagem pela paleta de cores disponibilizada pelo site.<br/>Ao final é constatada a opção de salvar a imagem ou voltar ao setor de consultas.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/cores/cor-service.js";
import rules from '@/utils/rules.js'

export default {
  name: "CoresNovo",
  components: {
    Helper
  },
  data() {
    return {
      corToPost: {},
      colorPicker: {},
      isValidForm: false,
      rules: rules,
    };
  },
  methods: {
    async salvar() {
      this.$refs.form.validate();

      if(this.isValidForm){
        const response = await service.salvarCor(this.corToPost);
        if(response.data.success){
          this.$toast.success('Cor adicionada com sucesso!');
          this.$router.push('/cores');
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
  },
  watch: {
    colorPicker: function(){
      this.corToPost.hexa = this.colorPicker.hex;
    }
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
