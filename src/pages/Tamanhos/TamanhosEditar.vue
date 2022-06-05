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
        <v-btn @click="deletar" color="error" class="mr-2"
          >Deletar tamanho</v-btn
        >
        <v-btn
          @click="salvarTamanho"
          :disabled="isValidForm == false"
          color="success"
          >Salvar tamanho</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Editar tamanho </template>

      <template #texto>
        <p>
          Na tela de edição do tamanho é apresentado o campo "Nome do tamanho"
          para que seja alterado o nome do tamanho a ser editado.<br /><br />Ao
          apertar em "salvar" as alterações são salvas.<br />Ao apertar em
          "deletar" o tamanho em questão será deletado.<br />Ao apertar em
          "voltar" o usuário é redirecionado de volta para a listagem de
          tamanhos
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
  name: "TamanhosEditar",
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
    async listarTamanho(id) {
      const response = await service.listarTamanho(id);
      if (response.data.success) this.tamanhoToPost = response.data.data;
      else {
        this.$toast.error(response.data.message);
        this.$router.push("/tamanhos");
      }
    },
    async salvarTamanho() {
      this.$refs.form.validate();

      if (this.isValidForm) {
        const response = await service.atualizarTamanho(this.tamanhoToPost);
        if (response.data.success) {
          this.$toast.success("Tamanho foi atualizado com sucesso");
          this.$router.push("/tamanhos");
        } else this.$toast.error(response.data.message);
      }
    },
    async deletarTamanho(id) {
      const response = await service.deletarTamanho(id);
      if (response.data.success) {
        this.$toast.success("Tamanho removido com sucesso");
        this.$router.push("/tamanhos");
      } else this.$toast.error(response.data.message);
    },
    mudou() {
      this.isChange = false;
    },
    deletar() {
      const id = this.$route.params.id;
      this.deletarTamanho(id);
    },
    validarNome(e) {
      var string = e.target.value;
      if (/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else this.erro_nome = "";
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.listarTamanho(id);
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
