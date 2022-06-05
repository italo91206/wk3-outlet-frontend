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
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/modelos" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2"
          >Deletar modelo</v-btn
        >
        <v-btn
          @click="salvarModelo"
          color="success"
          :disabled="isValidForm == false"
          >Salvar modelo</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>Editar modelo</template>

      <template #texto>
        <p>
          Na tela de edição do modelo é apresentado o campo "Nome do modelo"
          para que seja alterado o nome do modelo a ser editado.<br /><br />Ao
          apertar em "salvar" as alterações são salvas.<br />Ao apertar em
          "deletar" o modelo em questão será deletado.<br />Ao apertar em
          "voltar" o usuário é redirecionado de volta para a listagem de marcas
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/modelos/modelos-service.js";
import rules from "@/utils/rules.js";

export default {
  name: "ModelosEditar",
  components: {
    Helper,
  },
  data() {
    return {
      modeloToPost: {},
      rules: rules,
      isValidForm: false,
    };
  },
  methods: {
    async listarModelo(id) {
      const response = await service.verModelo(id);
      if (response.data.success) this.modeloToPost = response.data.data;
      else {
        this.$toast.error(response.data.message);
        this.$router.push("/modelos");
      }
    },
    async salvarModelo() {
      this.$refs.form.validate()
      if(this.isValidForm){
        const response = await service.atualizarModelo(this.modeloToPost);
        if (response.data.success) {
          this.$toast.success("Modelo foi atualizado com sucesso!");
          this.$router.push("/modelos");
        } else this.$toast.error(response.data.message);
      }
    },
    async deletarModelo(id) {
      const response = await service.deletarModelo(id);
      if (response.data.success) {
        this.$toast.success("Modelo foi deletado com sucesso!");
        this.$router.push("/modelos");
      } else this.$toast.error(response.data.message);
    },
    deletar() {
      const id = this.$route.params.id;
      this.deletarModelo(id);
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.listarModelo(id);
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
