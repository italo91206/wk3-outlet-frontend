<template>
  <v-main class="pa-12 w100">
    <v-container>
      <v-row>
        <v-card class="pa-12" width="100%" elevation="10">
          <v-form
            v-model="isValidForm"
            ref="form"
            @submit.prevent
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do motivo"
                  v-model="motivoToPost.motivo"
                  :rules="[ rules.specialCharacters, rules.required ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/motivos" class="mr-2">Voltar</v-btn>
        <v-btn
          @click="novoMotivo"
          :disabled="isValidForm == false"
          color="success"
          >Salvar motivo</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Adicionar motivo </template>

      <template #texto>
        <p>
          Na tela de edição do motivo é apresentado o campo "Nome do motivo"
          para que seja alterado o nome do motivo a ser cadastrado.<br /><br />Ao
          apertar em "salvar" as alterações são salvas.<br />Ao apertar em
          "voltar" o usuário é redirecionado de volta para a listagem de
          motivos.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/motivo/motivos-service.js";
import rules from "@/utils/rules.js";

export default {
  name: "MotivosNovo",
  components: {
    Helper,
  },
  data() {
    return {
      motivoToPost: {},
      rules: rules,
      isValidForm: false,
    };
  },
  methods: {
    async novoMotivo() {
      this.$refs.form.validate()

      if(this.isValidForm) {
        const response = await service.novoMotivo(this.motivoToPost);
        if (response.data.success) {
          this.$toast.success("Motivo foi adicionado com sucesso!");
          this.$router.push("/motivos");
        } else this.$toast.error(response.data.message);
      }
    }
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
