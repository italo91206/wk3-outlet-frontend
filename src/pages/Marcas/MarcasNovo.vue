<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row v-model="isValidForm" ref="form" @submit.prevent>
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
        <v-btn @click="novaMarca" :disabled="isValidForm == false" color="success">Salvar marca</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>Adicionar nova marca</template>

      <template #texto>
        <p>
          Na tela de cadastro de uma nova marca é apresentado o campo "Nome da
          marca" para que seja inserido o nome da marca a ser cadastrada.<br />Evite
          nomes longos e complexos.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/marcas/marcas-service";
import rules from "@/utils/rules.js";

export default {
  name: "MarcasNovo",
  components: {
    Helper,
  },
  data() {
    return {
      marcaToPost: {},
      isValidForm: false,
      rules: rules,
    };
  },
  methods: {
    async novaMarca() {
      this.$refs.form.validate();

      if(this.isValidForm){
        const response = await service.novaMarca(this.marcaToPost);
        if (response.data.success) {
          this.$toast.success("Marca foi cadastrada com sucesso");
          this.$router.push("/marcas");
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
