<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form v-model="isValidForm" ref="form" @submit.prevent>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="categoriaSelecionado"
                  :items="categorias"
                  item-text="nome_categoria"
                  item-value="categoria_id"
                  label="Categoria pai"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Nome da categoria"
                  v-model="categoriaToPost.nome_categoria"
                  :rules="[rules.specialCharacters, rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/categorias" class="mr-2">Voltar</v-btn>
        <v-btn
          @click="salvarCategoria"
          :disabled="isValidForm == false"
          color="success"
          >Salvar categoria</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Nova categoria </template>

      <template #texto>
        <p>
          Insira o nome da nova categoria desejada. Opcionalmente, é possível
          selecionar qual é a sua categoria pai. Evite nomes complexos e muito
          grandes.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import service from "@/services/categorias/categoria-service.js";
import rules from "@/utils/rules.js";
import Helper from "@/components/Helper.vue";

export default {
  name: "CategoriasNovo",
  components: {
    Helper,
  },
  data() {
    return {
      categoriaToPost: {},
      categorias: [],
      novo: [],
      categoriaSelecionado: 0,
      rules: rules,
      isValidForm: false,
    };
  },
  methods: {
    async getCategorias() {
      const response = await service.verCategorias();
      if (response.data.success) {
        this.categorias = response.data.data;
        this.categorias.forEach((item) => {
          this.adicionar(item);
        });
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/categorias");
      }
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novo.push({
          nome_categoria: item.nome_categoria,
          id: item.categoria_id,
        });
      else {
        var string = `${item.nome_categoria}`;
        var index = this.categorias.findIndex(
          (i) => i.categoria_id == item.categoria_pai
        );
        var pai = this.categorias[index];
        string = `${pai.nome_categoria} / ${string}`;

        while (pai.categoria_pai != null) {
          index = this.categorias.findIndex(
            (i) => i.categoria_id == pai.categoria_pai
          );
          pai = this.categorias[index];
          string = `${this.categorias[index].nome_categoria} / ${string}`;
        }

        //console.log(string);
        this.novo.push({ nome_categoria: string, id: item.categoria_id });
      }
    },
    async salvarCategoria() {
      this.$refs.form.validate();

      if (this.isValidForm) {
        const response = await service.novaCategoria(this.categoriaToPost);
        if (response.data.success) {
          this.$toast.success("Categoria adicionado com sucesso!");
          this.$router.push("/categorias");
        } else this.$toast.error(response.data.message);
      }
    },
  },
  mounted() {
    this.getCategorias();
  },
  watch: {
    categoriaSelecionado() {
      if (this.categoriaSelecionado != 0)
        this.categoriaToPost.categoria_pai = this.categoriaSelecionado;
      else this.categoriaToPost.categoria_pai = null;
    },
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
