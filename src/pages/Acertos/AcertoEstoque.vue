<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form v-model="isValidForm" ref="form" @submit.prevent>
            <!-- Nome do usuario -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="usuario"
                  v-model="getUsuario"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Nome do produto -->
            <v-row>
              <v-col cols="8">
                <v-autocomplete
                  v-model="produto_id_selected"
                  :items="produtos"
                  label="Produtos"
                  item-text="nome_produto"
                  item-value="produto_id"
                ></v-autocomplete>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  :disabled="productHasVariations"
                  label="Quantidade em estoque"
                  v-model="default_product_stock"
                  :rules="[rules.required, rules.positiveNotNull]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Tabela de motivos -->
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="motivo_id_selected"
                  :items="motivos"
                  label="Motivos"
                  item-text="motivo"
                  item-value="motivo_id"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <!-- Adicionar novas variações -->
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Variações do produto
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <!-- Inserção de cor e tamanho -->
                  <v-row>
                    <v-col cols="3">
                      <v-select
                        v-model="variacao_corSelecionado"
                        :items="cores"
                        item-text="cor"
                        item-value="cor_id"
                        label="Cor"
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-select
                        v-model="variacao_tamanhoSelecionado"
                        :items="tamanhos"
                        item-text="tamanho"
                        item-value="tamanho_id"
                        label="Tamanho"
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-text-field
                        v-model="variacao_quantidade"
                        label="Quantidade"
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="3" class="flex align-center">
                      <v-btn @click="adicionarVariacao">
                        Adicionar
                      </v-btn>
                    </v-col>
                  </v-row>

                  <!-- Tabela de variações -->
                  <v-data-table
                    :headers="headersVariacoes"
                    :items="variacoes"
                    hide-default-footer
                    no-data-text="Este produto não possui variações"
                    :disable-sort="true"
                    class="w100"
                  >
                    <template v-slot:item.quantidade="{item}">
                      <v-text-field
                        type="number"
                        v-model="item.quantidade"
                      ></v-text-field>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/acertos" class="mr-2">Voltar</v-btn>
        <v-btn @click="realizarAcerto" color="success">Realizar acerto</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Realizar acerto de estoque
      </template>

      <template #texto>
        <p>
          Ao selecionar um produto, basta logo em seguite inserir o novo estoque.
          Quando este tiver variações, é possível definir novas quantidades também para elas.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import motivos_service from "@/services/motivo/motivos-service.js";
import produto_service from "@/services/produto/produto-service.js";
import cores_service from "@/services/cores/cor-service.js";
import tamanho_service from "@/services/tamanhos/tamanhos-service.js";
import acerto_service from '@/services/acerto-estoque/acerto-estoque-service.js';
import Helper from '@/components/Helper.vue'
import rules from "@/utils/rules.js";

export default {
  name: "AcertoEstoque",
  components: {
    Helper
  },
  data() {
    return {
      produtos: [],
      motivos: [],
      cores: [],
      tamanhos: [],
      productHasVariations: false,

      produto_id_selected: null,
      estoque_options: {},
      default_product_stock: null,
      motivo_id_selected: null,

      variacoes: [],
      variacao_corSelecionado: 0,
      variacao_tamanhoSelecionado: 0,
      variacao_quantidade: null,
      headersVariacoes: [
        { text: "Nome", value: "nome" },
        { text: "Cor", value: "cor" },
        { text: "Tamanho", value: "tamanho" },
        { text: "Quantidade", value: "quantidade" }
      ],

      rules: rules,
      isValidForm: false,
    };
  },
  methods: {
    async realizarAcerto(){
      let usuario_id = this.$store.getters['perfil/getId']
      let motivo_id = this.motivo_id_selected
      let produto = this.getSelectedProduct

      if(produto == undefined)
        this.$toast.error('Você não selecionou nenhum produto.')
      else if(motivo_id == null)
        this.$toast.error('Selecione um motivo.')
      else {
        produto.variacoes = this.variacoes
        await acerto_service.gravarAcerto(produto, usuario_id, motivo_id)
          .then((response) => {
            if(response.data.success){
              this.$toast.success('Acerto gravado com sucesso')
              this.$router.push('/acertos')
            }
            else
              this.$toast.error(response.data.message)
          })
          .catch((error) => {
            this.$toast.error("Algo deu errado.")
            console.log(error)
          })
      }
    },
    async removerVariacao(to_delete){
      console.log(to_delete);
      const response = await produto_service.removerVariacao(to_delete);
      if(response.data.success){
        let index = 0;
        let achei = null;
        this.variacoes.forEach((variacao) => {
          if(variacao.variacao_id == to_delete)
            achei = index;
          index++;
        })
        this.variacoes.splice(achei, 1);
      }
      else{
        this.$toast.error(response.data.message);
      }
    },

    adicionarVariacao(){
      if(this.variacao_corSelecionado == 0 && this.variacao_tamanhoSelecionado == 0)
        this.$toast.error('Selecione ao menos uma variação.');
      else if(this.variacao_quantidade == null || this.variacao_quantidade < 0 )
        this.$toast.error('A variação precisa de uma quantidade positiva.');
      else{
        let variacao = {};
        variacao.nome = this.getSelectedProduct.nome_produto;

        if(this.variacao_corSelecionado != 0){
          variacao.cor_id = this.variacao_corSelecionado;
          const cor = this.cores.filter(cor => { return cor.cor_id === variacao.cor_id });
          variacao.cor = cor[0].cor;
          variacao.nome = `${variacao.nome} ${variacao.cor}`;
        }
        if(this.variacao_tamanhoSelecionado != 0){
          variacao.tamanho_id = this.variacao_tamanhoSelecionado;
          const tamanho = this.tamanhos.filter(tamanho => { return tamanho.tamanho_id === variacao.tamanho_id });
          variacao.tamanho = tamanho[0].tamanho;
          variacao.nome = `${variacao.nome} ${variacao.tamanho}`;
        }

        console.log("variacao nome", variacao.nome)
        let ja_existe = this.variacoes.filter((v) => { return variacao.nome == v.nome})
        if(ja_existe.length > 0)
          ja_existe[0].nova_quantidade = ja_existe[0].quantidade + this.variacao_quantidade
        else{
          variacao.quantidade = this.variacao_quantidade;
          this.variacoes.push(variacao);
        }

        this.variacao_tamanhoSelecionado = 0;
        this.variacao_corSelecionado = 0;
        this.variacao_quantidade = null;
      }
    },
  },
  async mounted() {
    Promise.all([
      motivos_service.listarMotivos(),
      produto_service.listarProdutos(),
      tamanho_service.listarTamanhos(),
      cores_service.listarCores(),
    ]).then((response) => {
      this.motivos = response[0].data.data;
      this.produtos = response[1].data.data;
      this.tamanhos = response[2].data.data;
      this.cores = response[3].data.data;
    });
  },
  computed: {
    get_total_variation_stock(){
      let estoque = 0;

      this.variacoes.forEach((variacao) => {
        estoque += parseInt(variacao.quantidade)
      })

      console.log("estoque", estoque)
      return estoque;
    },
    getUsuario() {
      const u = this.$store.getters["perfil/getPerfil"];
      return `${u.nome} ${u.sobrenome}`;
    },
    getSelectedProduct() {
      let id = this.produto_id_selected;
      let found = this.produtos.filter((p) => {
        return p.produto_id == id
      });

      return found[0]
    },
  },
  watch: {
    produto_id_selected: async function () {
      produto_service
        .recuperarVariacoes(this.produto_id_selected)
        .then((response) => {
          this.variacoes = response.data.data;
          console.log(response.data.data)
        });
      this.estoque_options = this.getSelectedProduct.estoque
      this.default_product_stock = this.getSelectedProduct.estoque

      if(this.variacoes.length ==0 )
        this.productHasVariations = false
      else
        this.productHasVariations = true
    },
    variacoes: function () {
      this.productHasVariations = this.variacoes.length > 0
      this.variacoes.forEach((variacao) => {
        variacao.nome = this.getSelectedProduct.nome_produto;

        if (variacao.cor_id) {
          //console.log(variacao.cor_id)
          const cor = this.cores.filter((cor) => {
            return cor.cor_id === variacao.cor_id;
          });
          variacao.cor = cor[0].cor;
          variacao.nome = `${variacao.nome} ${variacao.cor}`;
        }
        if (variacao.tamanho_id) {
          //console.log(variacao.tamanho_id)
          // console.log(this.tamanhos);
          // console.log(variacao.tamanho_id);
          const tamanho = this.tamanhos.filter((tamanho) => {
            return tamanho.tamanho_id === variacao.tamanho_id;
          });
          variacao.tamanho = tamanho[0].tamanho;
          variacao.nome = `${variacao.nome} ${variacao.tamanho}`;
          variacao.nova_quantidade = null
        }
      });
      if(this.productHasVariations)
        this.default_product_stock = this.get_total_variation_stock
    },
    variacao_quantidade(){
      this.variacao_quantidade = parseInt(this.variacao_quantidade)
    },
  },
};
</script>

<style>
</style>
