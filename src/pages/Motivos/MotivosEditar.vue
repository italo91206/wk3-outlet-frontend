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
                  label="Nome do motivo"
                  v-model="motivoToPost.motivo"
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/motivos" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2"
          >Deletar motivo</v-btn
        >
        <v-btn
          @click="salvarMotivo"
          :disabled="isValidForm == false"
          color="success"
          >Salvar motivo</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Editar motivo </template>

      <template #texto>
        <p>
          Na tela de edição do motivo é apresentado o campo "Nome do motivo"
          para que seja alterado o nome do motivo a ser editado.<br /><br />Ao
          apertar em "salvar" as alterações são salvas.<br />Ao apertar em
          "deletar" o motivo em questão será deletado.<br />Ao apertar em
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
import rules from '@/utils/rules.js';

export default {
  name: "MotivosEditar",
  components: {
    Helper,
  },
  data() {
    return {
      motivoToPost: {},
      isChange: true,
      isValidForm: false,
      rules: rules,
    };
  },
  methods: {
    async getMotivo(id) {
      const response = await service.getMotivo(id);
      if (response.data.success) this.motivoToPost = response.data.data;
      else {
        this.$toast.error(response.data.message);
        this.$router.push("/motivos");
      }
    },
    async salvarMotivo() {
      this.$refs.form.validate()
      if(this.isValidForm){
        const response = await service.atualizarMotivo(this.motivoToPost);
        if (response.data.success) {
          this.$toast.success("Motivo foi atualizado com sucesso.");
          this.$router.push("/motivos");
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarMotivo(id) {
      const response = await service.deletarMotivo(id);
      if (response.data.success) {
        this.$toast.success("Motivo foi excluído com sucesso.");
        this.$router.push("/motivos");
      } else this.$toast.error(response.data.message);
    },
    mudou() {
      this.isChange = false;
    },
    deletar() {
      const id = this.$route.params.id;
      this.deletarMotivo(id);
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getMotivo(id);
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
