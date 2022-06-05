<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form v-model="isValidForm" ref="form" @submit.prevent>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do tamanho"
                  v-model="tamanhoToPost.tamanho"
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/tamanhos" class="mr-2">Voltar</v-btn>
        <v-btn @click="novo" :disabled="isValidForm == false" color="success"
          >Salvar tamanho</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Novo tamanho </template>

      <template #texto>
        <p>
          Na tela de criar novo tamanho é apresentado o campo "Nome do tamanho"
          para que seja adicionado o nome do tamanho a ser editado.<br /><br />Ao
          apertar em "salvar" as alterações são salvas.<br />Ao apertar em
          "voltar" o usuário é redirecionado de volta para a listagem de
          tamanhos.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/tamanhos/tamanhos-service.js";
import rules from "@/utils/rules.js";

export default {
  name: "TamanhosNovo",
  components: {
    Helper,
  },
  data() {
    return {
      tamanhoToPost: {},
      isValidForm: false,
      rules: rules,
    };
  },
  methods: {
    async novo() {
      this.$refs.form.validate();

      if (this.isValidForm) {
        const response = await service.novoTamanho(this.tamanhoToPost);
        if (response.data.success) {
          this.$toast.success("Tamanho foi cadastrado com sucesso");
          this.$router.push("/tamanhos");
        } else this.$toast.error(response.data.message);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
