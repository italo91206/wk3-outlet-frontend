<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100 pa-12" elevation="10">
          <v-form>
            <v-row>
              <h2>Detalhes do cupom</h2>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Código do cupom"
                  v-model="cupomToPost.codigo"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  label="Nome do cupom"
                  v-model="cupomToPost.nome"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  label="Valor do cupom"
                  v-model="cupomToPost.valor"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-radio-group v-model="radioGroup" row mandatory>
                  <v-radio
                    label="Percentual"
                    value="percentual"
                  ></v-radio>

                  <v-radio
                    label="Valor Fixo"
                    value="fixo"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="6">
                <input
                  type="datetime-local"
                  v-model="cupomToPost.validade"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>

            <v-row>
              <h2>Regras do cupom</h2>
            </v-row>

            <v-row>
              <v-expansion-panels>
                <v-expansion-panel
                  id="regras-por-categorias"
                  @click="getCategorias"
                >
                  <v-expansion-panel-header>
                    Por categorias
                    <v-chip class="ma-2 count-chip"
                      v-if="categories_select.length > 0"
                    >
                      {{getCategoriesSelected}}
                    </v-chip>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-text-field
                      v-model="categoria_search"
                      append-icon="mdi-magnify"
                      label="Buscar por categoria"
                      single-line
                      hide-details
                    ></v-text-field>

                    <v-data-table
                      v-model="categories_select"
                      :headers="categoria_headers"
                      :search="categoria_search"
                      :items="categories"
                      :loading="categories_loading"
                      :options="{itemsPerPage: 5}"
                      dense
                      item-key="nome_categoria"
                      show-select
                      loading-text="Carregando categorias... aguarde"
                    >
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                  id="regras-por-produtos"
                  @click="getProdutos"
                >
                  <v-expansion-panel-header>
                    Por produtos (SKU)
                    <v-chip class="ma-2 count-chip"
                      v-if="produtos_selected.length > 0"
                    >
                      {{getProductsSelected}}
                    </v-chip>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-text-field
                      v-model="produto_search"
                      append-icon="mdi-magnify"
                      label="Buscar por produtos"
                      single-line
                      hide-details
                    ></v-text-field>

                    <v-data-table
                      v-model="produtos_selected"
                      :headers="produto_headers"
                      :search="produto_search"
                      :items="produtos"
                      :loading="produtos_loading"
                      item-key="nome_produto"
                      show-select
                      dense
                      loading-text="Carregando produtos... aguarde"
                    >
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                  id="regras-por-atributos"
                  @click="getAttributes"
                >
                  <v-expansion-panel-header>
                    Por atributos (modelo, marca)
                    <v-chip class="ma-2 count-chip"
                      v-if="marcas_selected.length > 0 || modelos_selected.length > 1"
                    >
                      {{getAtributosSelected}}
                    </v-chip>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-row>
                      <!-- marcas data-table -->
                      <v-col cols="6">
                        <v-text-field
                          v-model="marca_search"
                          append-icon="mdi-magnify"
                          label="Buscar por marcas"
                          single-line
                          hide-details
                        ></v-text-field>

                        <v-data-table
                          v-model="marcas_selected"
                          :headers="marca_headers"
                          :search="marca_search"
                          :items="marcas"
                          :loading="marcas_loading"
                          :options="{itemsPerPage: 5}"
                          item-key="marca"
                          show-select
                          loading-text="Carregando marcas... aguarde"
                        >
                        </v-data-table>
                      </v-col>

                      <!-- modelos data-table -->
                      <v-col cols="6">
                        <v-text-field
                          v-model="modelo_search"
                          append-icon="mdi-magnify"
                          label="Buscar por modelos"
                          single-line
                          hide-details
                        ></v-text-field>

                        <v-data-table
                          v-model="modelos_selected"
                          :headers="modelo_headers"
                          :search="modelo_search"
                          :items="modelos"
                          :loading="modelos_loading"
                          :options="{itemsPerPage: 5}"
                          item-key="modelo"
                          show-select
                          loading-text="Carregando modelos... aguarde"
                        >
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                  id="regras-por-variacoes"
                  @click="getVariations"
                >
                  <v-expansion-panel-header>
                    Por variações (tamanho, cor)
                    <v-chip class="ma-2 count-chip"
                      v-if="tamanhos_selected.length > 0 || cores_selected.length > 0"
                    >
                      {{getVariationsSelected}}
                    </v-chip>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-row>
                      <!-- cores data-table -->
                      <v-col cols="6">
                        <v-text-field
                          v-model="cor_search"
                          append-icon="mdi-magnify"
                          label="Buscar por cores"
                          single-line
                          hide-details
                        ></v-text-field>

                        <v-data-table
                          v-model="cores_selected"
                          :headers="cor_headers"
                          :search="cor_search"
                          :items="cores"
                          :loading="cores_loading"
                          :options="{itemsPerPage: 5}"
                          item-key="cor"
                          show-select
                          loading-text="Carregando cores... aguarde"
                        >
                          <template v-slot:item.hexa="{ item }">
                            <div
                              :style="`background-color: ${item.hexa}`"
                              class="color-swatch"
                            ></div>
                          </template>
                        </v-data-table>
                      </v-col>

                      <!-- tamanhos data-table -->
                      <v-col cols="6">
                        <v-text-field
                          v-model="tamanho_search"
                          append-icon="mdi-magnify"
                          label="Buscar por tamanhos"
                          single-line
                          hide-details
                        ></v-text-field>

                        <v-data-table
                          v-model="tamanhos_selected"
                          :headers="tamanho_headers"
                          :search="tamanho_search"
                          :items="tamanhos"
                          :loading="tamanhos_loading"
                          :options="{itemsPerPage: 5}"
                          item-key="tamanho"
                          show-select
                          loading-text="Carregando tamanhos... aguarde"
                        >
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel id="regras-por-quantidade">
                  <v-expansion-panel-header>
                    Por quantidade/unidades
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <h4>
                      Para o cupom ser válido, as condições acima se aplicam à:
                    </h4>

                    <v-row>
                      <v-col cols="6">
                        <v-radio-group v-model="quantity_rules">
                          <v-radio
                            label="Todos os itens do carrinho"
                            value="todos"
                          ></v-radio>

                          <v-radio
                            label="Por quantidade (un)"
                            value="por_quantidade"
                          ></v-radio>

                          <v-radio
                            label="Por valor (R$)"
                            value="por_valor"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="6"
                        v-if="quantity_rules == 'por_valor' || quantity_rules == 'por_quantidade'"
                      >
                        <v-row class="pa-5">
                          <v-col cols="6">
                            <v-select
                              :items="
                              [{ label: 'Maior que', value: 'maior_que'},
                              { label: 'Menor que', value: 'menor_que'}]"
                              item-value="value"
                              item-text="label"
                              v-model="quantity_condition"
                            ></v-select>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field
                              v-model="quantity_value"
                              single-line
                              hide-details
                              label="Valor/Quantidade"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>

                    <h4>Quantidade de uso</h4>

                    <v-row>
                      <v-col cols="6">
                        <v-radio-group v-model="cupomToPost.use_rules">
                          <v-radio
                            label="Uso imilitado"
                            value="ilimited"
                          ></v-radio>

                          <v-radio
                            label="Quantidade limitada de uso"
                            value="limited"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="6" v-if="cupomToPost.use_rules == 'limited'">
                        <v-text-field
                          v-model="cupomToPost.use_quantity"
                          single-line
                          hide-details
                          type="number"
                          label="Quantidade"
                          class="col-2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/cupons" class="mr-2">Voltar</v-btn>
        <v-btn @click="novoCupom" color="success">Salvar cupom</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Este setor conta com a integração de um novo cupom, na qual o administrador deve adicionar o código, o nome e o valor do cupom oferecido, podendo esse escolher entre percentual e valor fixo, datando seu término.<br/>Ao final, o usuário tem a opção de salvar cupom ou voltar para consultas.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import cupons_service from '@/services/cupons/cupons-service.js'
import categoria_service from '@/services/categorias/categoria-service.js';
import produto_service from "@/services/produto/produto-service.js";
import modelo_service from '@/services/modelos/modelos-service.js'
import marca_service from '@/services/marcas/marcas-service'
import cor_service from "@/services/cores/cor-service.js";
import tamanho_service from '@/services/tamanhos/tamanhos-service.js'

import rules from '@/utils/rules.js'

export default {
  name: 'CuponsNovo',
  components: {
    Helper
  },
  data() {
    return {
      cupomToPost: {},
      tipoCupom: '',
      radioGroup: null,
      rules: rules,
      product_rules: [],
      attribute_rules: [],
      variation_rules: [],

      produtos: [],
      produtos_loading: true,
      produtos_selected: [],
      produto_search: '',
      produto_headers: [
        { text: 'Nome', value: 'nome_produto' },
        { text: 'Preço', value: 'preco' },
        { text: 'SKU', value: 'sku' },
      ],

      categories: [],
      categories_loading: true,
      categories_select: [],
      categoria_search: '',
      categoria_headers: [
        { text: 'Nome', value: 'nome_categoria' },
        { text: 'Categoria pai', value: 'categoria_pai' },
      ],

      marcas: [],
      marcas_loading: true,
      marcas_selected: [],
      marca_search: '',
      marca_headers: [
        { text: 'Marca', value: 'marca' },
      ],

      modelos: [],
      modelos_loading: true,
      modelos_selected: [],
      modelo_search: '',
      modelo_headers: [
        { text: 'Modelo', value:'modelo' },
      ],

      cores: [],
      cores_loading: true,
      cores_selected: [],
      cor_search: '',
      cor_headers: [
        { text: 'Cor', value: 'hexa' },
        { text: 'Nome', value: 'cor' },
      ],

      tamanhos: [],
      tamanhos_loading: true,
      tamanhos_selected: [],
      tamanho_search: '',
      tamanho_headers: [
        { text: 'Tamanho', value: 'tamanho' },
      ],

      quantity_rules: 'todos',
      quantity_value: null,
      quantity_condition: '',
    }
  },
  methods: {
    async novoCupom(){
      if(this.cupomToPost.validade == '')
        this.$toast.error('Alguns campos não estão válidos');
      else {
        let quantity_rules = {
          rules: this.quantity_rules,
          value: this.quantity_value,
          condition: this.quantity_condition
        }

        let selected_rules = {
          categorias: this.categories_select,
          produtos: this.produtos_selected,
          marcas: this.marcas_selected,
          modelos: this.modelos_selected,
          cores: this.cores_selected,
          tamanhos: this.tamanhos_selected
        }

        await cupons_service.novoCupom(this.cupomToPost, quantity_rules, selected_rules)
          .then((response) => {
            if(response.data.success){
              this.$toast.success('O cupom foi cadastrado com sucesso!');
              this.$router.push('/cupons');
            }
            else
              this.$toast.error(response.data.message);
          })
          .catch((error) => {
            console.log(error)
            this.$toast.error("Algo deu errado");
            this.$router.push('/cupons');
          })
      }
    },
    async getCategorias(){
      await categoria_service.verCategorias()
        .then((response) => {
          this.categories = response.data.data;
          this.categories = this.categories.filter((categoria) => {
            return categoria.is_enabled
          })
        })
        .catch((response) => {
          this.$toast.error(response.data.error)
        })
        .finally(() => {
          this.categories_loading = false;
        })
    },
    async getProdutos() {
      await produto_service.listarProdutos()
        .then((response) => {
          this.produtos = response.data.data;
          this.produtos = this.produtos.filter((produto) => {
            return produto.is_enabled
          })
        })
        .catch((response) => {
          this.$toast.error(response.data.error)
        })
        .finally(() => {
          this.produtos_loading = false;
        })
    },
    async getAttributes(){
      const marcas = await marca_service.getMarcas()
        .then((response) => {
          this.marcas = response.data.data
        })
        .catch((response) => {
          this.$toast.error(response.data.message);
        });

      const modelos = await modelo_service.verModelos()
        .then((response) => {
          this.modelos = response.data.data
        })
        .catch((response) => {
          this.$toast.error(response.data.message);
        });

      await Promise.all([
        marcas, modelos
      ])
      .then(() => {
        this.marcas_loading = false;
        this.modelos_loading = false;
      })
    },
    async getVariations(){
      const tamanhos = await tamanho_service.listarTamanhos()
        .then((response) => {
          this.tamanhos = response.data.data;
        })
        .catch((response) => {
          this.$toast.error(response.data.message)
        })
        .finally(() => {
          this.tamanhos_loading = false;
        });
      const cores = await cor_service.listarCores()
        .then((response) => {
          this.cores = response.data.data;
        })
        .catch((response) => {
          this.$toast.error(response.data.message)
        })
        .finally(() => {
          this.cores_loading = false;
        });

      await Promise.all([ tamanhos, cores ])
    }
  },
  computed: {
    getCategoriesSelected(){
      let qtd = this.categories_select.length;
      let string = qtd > 1 ? "selecionados" : "selecionado"
      return `${qtd} ${string}`
    },
    getProductsSelected(){
      let qtd = this.produtos_selected.length;
      let string = qtd > 1 ? "selecionados" : "selecionado"
      return `${qtd} ${string}`
    },
    getAtributosSelected(){
      let qtd_marcas = this.marcas_selected.length;
      let qtd_modelos = this.modelos_selected.length
      let string = (qtd_marcas + qtd_modelos) > 1 ? "selecionados" : "selecionado"
      return `${qtd_marcas + qtd_modelos} ${string}`
    },
    getVariationsSelected(){
      let qtd_cores = this.cores_selected.length;
      let qtd_tamanhos = this.tamanhos_selected.length
      let string = (qtd_cores + qtd_tamanhos) > 1 ? "selecionados" : "selecionado"
      return `${qtd_cores + qtd_tamanhos} ${string}`
    },
    getAllRulesSelected(){
      let qtd_cores = this.cores_selected.length;
      let qtd_tamanhos = this.tamanhos_selected.length
      let qtd_marcas = this.marcas_selected.length;
      let qtd_modelos = this.modelos_selected.length
      let qtd_produtos = this.produtos_selected.length;
      let qtd_categorias = this.categories_select.length;

      return qtd_cores + qtd_tamanhos + qtd_marcas + qtd_modelos + qtd_produtos + qtd_categorias
    }
  },
  watch: {
    radioGroup: function(){
      if(this.radioGroup == 'percentual'){
        this.cupomToPost.is_fixed = false;
        this.cupomToPost.is_percent = true;
      }
      else{
        this.cupomToPost.is_fixed = true;
        this.cupomToPost.is_percent = false;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}

.count-chip{
  flex: unset;
}

.color-swatch {
  width: 24px;
  height: 24px;
}
</style>
