<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form v-model="isValidForm" ref="form" @submit.prevent>
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
                  v-model="corToPost.hexa"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/cores" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar cor</v-btn>
        <v-btn
          @click="atualizarCor"
          :disabled="isValidForm == false"
          color="success"
          >Salvar cor</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Editar cor </template>

      <template #texto>
        <p>
          Local na qual o usuário pode inserir o nome de uma nova cor,
          escolhendo a integração da imagem pela paleta de cores disponibilizada
          pelo site.<br />Ao final é constatada a opção de salvar a imagem ou
          voltar ao setor de consultas.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/cores/cor-service.js";
import rules from "@/utils/rules.js";

export default {
  name: "CoresEditar",
  components: {
    Helper,
  },
  data() {
    return {
      corToPost: {},
      isValidForm: false,
      rules: rules,
    };
  },
  methods: {
    async listarCor(id) {
      const response = await service.listarCor(id);
      if (response.data.success) this.corToPost = response.data.data;
      else {
        this.$toast.error(response.data.message);
        this.$router.push("/cores");
      }
    },
    async deletarCor(id) {
      const response = await service.deletarCor(id);
      if (response.data.success) {
        this.$toast.success("Cor foi removida com sucesso!");
        this.$router.push("/cores");
      } else this.$toast.error(response.data.message);
    },
    async atualizarCor() {
      this.$refs.form.validate();

      if (this.isValidForm) {
        const response = await service.atualizarCor(this.corToPost);
        if (response.data.success) {
          this.$toast.success("Cor foi alterada com sucesso!");
          this.$router.push("/cores");
        } else this.$toast.error(response.data.message);
      }
    },
    mudou() {
      this.isChanged = false;
    },
    deletar() {
      this.deletarCor(this.corToPost.cor_id);
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
    this.listarCor(id);
  },
};
</script>

<style lang="css" scoped>
.color-swatch {
  width: 24px;
  height: 24px;
}

.row + .row {
  margin-top: 24px;
}
</style>
