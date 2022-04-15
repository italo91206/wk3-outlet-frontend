<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" levation="10">
          <v-form>
            <!-- Renderizar as imagens do produto -->
            <v-row id="imagesRow">
              <v-col v-for="imagem in imagens" v-bind:key="imagem.id" class="images-col--imagem">
                <v-img :src="imagem"
                  max-height="100"
                  max-width="60"
                ></v-img>
              </v-col>
            </v-row>

            <!-- Input de imagens do produto -->
            <v-row>
              <v-file-input
                @input="imagemInput"
                v-model="imagensRaw"
                label="Enviar imagens"
                multiple
                outlined
                dense
                id="custom-file-input"
              >
              </v-file-input>
            </v-row>

            <!-- Nome do produto -->
            <v-row>
              <v-col cols="9">
                <v-text-field
                  label="Nome do produto"
                  v-model="produtoToPost.nome_produto"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field
                  label="SKU"
                  v-model="produtoToPost.sku"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="Estoque"
                  v-model="produtoToPost.estoque"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field
                  label="Preço"
                  v-model="produtoToPost.preco"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field
                  label="Custo"
                  v-model="produtoToPost.custo"
                  type="number"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field
                  label="Peso (gramas)"
                  v-model="produtoToPost.peso"
                  type="number"
                  :rules="[rules.positiveNotNull]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-select
                  v-model="categoriaSelecionado"
                  :items="novasCategorias"
                  item-text="nome_categoria"
                  item-value="id"
                  label="Categorias do produto"
                ></v-select>
              </v-col>

              <v-col cols="4">
                <v-select
                  v-model="modeloSelecionado"
                  :items="modelos"
                  item-text="modelo"
                  item-value="modelo_id"
                  label="Modelo"
                ></v-select>
              </v-col>

              <v-col cols="4">
                <v-select
                  v-model="marcaSelecionado"
                  :items="marcas"
                  item-text="marca"
                  item-value="marca_id"
                  label="Marca"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Descrição -->
            <v-row>
              <v-col>
                <v-textarea
                  label="Descrição do produto"
                  v-model="produtoToPost.descricao"
                  type="number"
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Variações do produto
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <!-- Cor e tamanho -->
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
                          :rules="[rules.positiveNumber]"
                          type="number"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="3" class="flex align-center">
                        <v-btn @click="adicionarVariacao">
                          Adicionar
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-data-table
                      :headers="headersVariacoes"
                      :items="variacoes"
                      hide-default-footer
                      no-data-text="Este produto não possui variações"
                      :disable-sort="true"
                    >
                      <template v-slot:item.acao="{item}">
                        <a class="link" @click="removerVariacao(item.nome)">
                          Remover
                        </a>
                      </template>

                      <template v-slot:item.quantidade="{item}">
                        <v-edit-dialog
                          :return-value.sync="item.quantidade"
                          large
                          persistent
                        >
                          <div>{{ item.quantidade }}</div>
                          <template v-slot:input>
                            <div class="mt-4 text-h6">
                              Atualizar quantidade
                            </div>
                            <v-text-field
                              v-model="item.quantidade"
                              :rules="[rules.positiveNotNull]"
                              label="Quantidade"
                              single-line
                              counter
                              autofocus
                            ></v-text-field>
                          </template>
                        </v-edit-dialog>
                      </template>
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/produtos" class="mr-2">Voltar</v-btn>
        <v-btn @click="salvarProduto" color="success">Salvar produto</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        O referente setor traz a integração de um novo produto no site, possibilitando ao administrador adicionar os seguintes itens: as imagens do produto; nome do produto; o SKU; o preço; custo; a possibilidade em estoque; peso em gramas; a categoria do produto aderido ao setor e construído pelo administrador; o modelo e a marca constatados em seleções construídas pelo gestor.<br/><br/>O produto também pode constar com uma descrição oferecida pelo gestor, que pode oferecer variações da mercadoria em relevância, adicionando cor, tamanho e quantidade.<br/>Ao final, o administrador tem a possibilidade de salvar o material para integrá-lo ou voltar a páginas de consultas.
      </p>
    </Helper>

  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import marcasService from '@/services/marcas/marcas-service.js'
import modelosService from '@/services/modelos/modelos-service.js'
import coresService from '@/services/cores/cor-service.js'
import produtoService from '@/services/produto/produto-service.js'
import categoriaService from '@/services/categorias/categoria-service.js'
import imagemService from '@/services/imagens/imagem-service.js'
import tamanhoService from '@/services/tamanhos/tamanhos-service.js'
import rules from '@/utils/rules.js'

export default {
  name: "ProdutosNovo",
  components: {
    Helper
  },
  data(){
    return {
      produtoToPost: {
        nome_produto: '',
        preco: null,
        custo: null,
        peso: null,
        descricao: '',
        estoque: null,
        marca_id: null,
        modelo_id: null,
        categoria_id: null,
      },
      headersVariacoes: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cor', value: 'cor' },
        { text: 'Tamanho', value: 'tamanho' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Ação', value: 'acao' },
      ],
      modeloSelecionado: '',
      marcaSelecionado: '',
      variacao_corSelecionado: 0,
      variacao_tamanhoSelecionado: 0,
      variacao_quantidade: null,
      modelos: [],
      marcas: [],
      cores: [],
      categorias: [],
      tamanhos: [],
      novasCategorias: [],
      categoriaSelecionado: '',
      erro_nome: null,
      erro_custo: null,
      erro_preco: null,
      erro_estoque: null,
      erro_peso: null,
      rules: rules,
      imagens: [],
      variacoes: [],
      variacaoIndex: 0,
      estoque_changed: false,
      imagensRaw: null,
    }
  },
  methods: {
    async getTamanhos() {
      const response = await tamanhoService.listarTamanhos()
      if(response.data.success)
        this.tamanhos = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/produtos');
      }
    },
    async getMarcas() {
      const response = await marcasService.getMarcas()
      if(response.data.success)
        this.marcas = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/produtos');
      }
    },
    async getModelos(){
      const response = await modelosService.verModelos();
      if(response.data.success)
        this.modelos = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    async getCores(){
      const response = await coresService.listarCores();
      if(response.data.success)
        this.cores = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    async getCategorias(){
      const response = await categoriaService.verCategorias();
      if(response.data.success){
        this.categorias = response.data.data;
        // this.categorias.forEach((item) => { this.adicionar(item) })
        this.categorias.push({
          id: null,
          nome_categoria: 'Nenhum'
        })
        this.categorias.forEach((item) => { this.adicionar(item) })
      }
      else
        this.$toast.error(response.data.message);
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novasCategorias.push({ nome_categoria: item.nome_categoria, id: item.categoria_id })
      else {
        var string = `${item.nome_categoria}`;
        var index = this.categorias.findIndex( i => i.categoria_id == item.categoria_pai);
        var pai = this.categorias[index];
        string = `${pai.nome_categoria} / ${string}`;

        while(pai.categoria_pai != null){
          index = this.categorias.findIndex( i => i.categoria_id == pai.categoria_pai);
          pai = this.categorias[index];
          string = `${this.categorias[index].nome_categoria} / ${string}`;
        }

        //console.log(string);
        this.novasCategorias.push({ nome_categoria: string, id: item.categoria_id });
      }
    },
    async salvarProduto(){
      if(this.produtoToPost.nome_produto.length < 6)
        this.$toast.error('Nome de produto muito curto!');
      else if(this.produtoToPost.preco <= 0)
        this.$toast.error('Preço do produto não pode ser vazio')
      else if(this.produtoToPost.categoria_id == null)
        this.$toast.error('Produto precisa ter uma categoria.')
      else if(this.produtoToPost.modelo_id == null)
        this.$toast.error('Produto precisa ter um modelo.')
        else if(this.produtoToPost.marca_id == null)
        this.$toast.error('Produto precisa ter uma marca.')
      else{
        this.produtoToPost.variacoes = this.variacoes;
        const response = await produtoService.novoProduto(this.produtoToPost);

        if(response.data.success){
          const novo = response.data.data[0];
          this.imagemAdicionado(novo);
          this.$toast.success('Produto foi adicionado com sucesso!');
          this.$router.push('/produtos');
        }
        else{
          this.$toast.error(response.data.message);
        }
      }
    },
    async imagemAdicionado(novo){
      const formData = new FormData();
      const imagefile = document.querySelector("#custom-file-input");
      const files = imagefile.files;

      files.forEach((item) => {
        formData.append('fileimage', item);
      })

      formData.append('id', novo);

      const response = await imagemService.enviarImagens(formData);
      if(!response.data.success)
        this.$toast.error(response.data.message);
    },
    removerImagem(imagem){
      let filtrado = this.imagens.filter((item) => { return item != imagem})
      this.imagens = filtrado;
    },
    imagemInput(e){
      // console.log('Input de imagens');
      let input = e.target.files;
      let caminhos = [];

      input.forEach((imagem) => {
        caminhos.push(URL.createObjectURL(imagem));
      })

      this.imagens = caminhos;
    },
    adicionarVariacao(){

      if(this.variacao_corSelecionado == 0 && this.variacao_tamanhoSelecionado == 0)
        this.$toast.error('Selecione ao menos uma variação.');
      else if(this.variacao_quantidade == null || this.variacao_quantidade < 0 )
        this.$toast.error('A variação precisa de uma quantidade positiva.');
      else{
        let variacao = {};
        variacao.nome = this.produtoToPost.nome_produto;

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
          ja_existe[0].quantidade += this.variacao_quantidade
        else{
          variacao.quantidade = this.variacao_quantidade;
          this.variacoes.push(variacao);
        }

        this.variacao_tamanhoSelecionado = 0;
        this.variacao_corSelecionado = 0;
        this.variacao_quantidade = null;
      }
    },
    removerVariacao(to_delete){
      let index = 0;
      let achei;

      this.variacoes.forEach((variacao) => {
        if(variacao.nome != to_delete)
          index++;
        else
          achei = index;
      })

      this.variacoes.splice(achei, 1);
    }
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
    this.getCategorias();
    this.getTamanhos();
  },
  watch: {
    modeloSelecionado: function(){
      this.produtoToPost.modelo_id = this.modeloSelecionado;
    },
    marcaSelecionado: function() {
      this.produtoToPost.marca_id = this.marcaSelecionado;
    },
    categoriaSelecionado: function(){
      this.produtoToPost.categoria_id = this.categoriaSelecionado;
    },
    imagensRaw: function(){
      let caminhos = [];
      this.imagensRaw.forEach((imagem) => {
        caminhos.push(URL.createObjectURL(imagem));
      })
      this.imagens = caminhos;
    },
    variacao_quantidade(){
      this.variacao_quantidade = parseInt(this.variacao_quantidade)
    }
  }
};
</script>

<style lang="css" scoped>
.deletar-imagem {
  position: absolute;
  top: 0;
  right: 10px;
  opacity: 0;
}

.images-col--imagem {
  position: relative;
}

.images-col--imagem:hover .deletar-imagem {
  opacity: 1;
  transition: all .2s ease;
}

.row+.row {
  margin-top: 24px;
}

.imagem-place-holder img{
  width: 100%;
  height: 100%;
}

.imagem-place-holder {
  height: 80px;
  width: 80px;
  border: #f4f6f9 2px;
  display: flex;
  border-style: dashed;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
}

.color-checkbox{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.color-option {
    display: flex;
    flex-wrap: wrap;

    position: relative;
}

.color-option label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: unset;
    padding: 5px 7px;
    border: solid 2px #dbdbdb;
    border-radius: 3px;
    margin-right: 10px;
}

.color-option label div {
    margin-right: 12px;
    height: 20px;
    width: 20px;
    border-radius: 5px;
}

.color-checkbox:hover{
  cursor: pointer;
}

input.color-checkbox[type="checkbox"]:checked + label {
  border-color: #626262;
}
</style>
