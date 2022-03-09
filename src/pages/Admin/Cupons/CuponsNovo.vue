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
                      loading-text="Carregando produtos... aguarde"
                    >
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel id="regras-por-atributos">
                  <v-expansion-panel-header>
                    Por atributos (modelo, marca)
                  </v-expansion-panel-header>  

                  <v-expansion-panel-content>
                    conteúdo
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel id="regras-por-variacoes">
                  <v-expansion-panel-header>
                    Por variações (tamanho, cor)
                  </v-expansion-panel-header>  

                  <v-expansion-panel-content>
                    conteúdo
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/cupons" class="mr-2">Voltar</v-btn>
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
import service from '@/services/cupons/cupons-service.js'
import categoria_service from '@/services/categorias/categoria-service.js';
import produto_service from "@/services/produto/produto-service.js";
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

      colors: [],
      marcas: [],
      modelos: [],
      tamanhos: []
    }
  },
  methods: {
    async novoCupom(){
      if(this.cupomToPost.validade == '')
        this.$toast.error('Alguns campos não estão válidos');
      else{      
        const response = await service.novoCupom(this.cupomToPost);
        if(response.data.success){
          this.$toast.success('O cupom foi cadastrado com sucesso!');
          this.$router.push('/admin/cupons');
        }
        else
          this.$toast.error(response.data.message);
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
</style>