<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" levation="10">
          <v-form>
            <!-- Renderizar as imagens do produto -->
            <v-row id="imagesRow">
              <v-col v-for="imagem in imagens" v-bind:key="imagem.id">
                <v-img :src="imagem" max-height="500" max-width="300"></v-img>
              </v-col>
            </v-row>

            <!-- Input de imagens do produto -->
            <v-row>
              <v-file-input
                @input="imagemInput"
                v-model="imagensRaw"
                label="Enviar arquivos"
                multiple
                outlined
                dense
              >
              </v-file-input>
            </v-row>

            <!-- Nome do produto -->
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  label="Nome do produto" 
                  v-model="produtoToPost.nome"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- SKU do produto -->
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  label="SKU" 
                  v-model="produtoToPost.sku"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Preço e custo do produto -->
            <v-row>
              <v-col>
                <v-text-field 
                  label="Preço" 
                  v-model="produtoToPost.preco"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field 
                  label="Custo" 
                  v-model="produtoToPost.custo"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Estoque e peso-->
            <v-row>
              <v-col>
                <v-text-field 
                  label="Estoque" 
                  v-model="produtoToPost.estoque"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field 
                  label="Peso (gramas)" 
                  v-model="produtoToPost.peso"
                  type="number"
                  :rules="[rules.positiveNotNull]"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <!-- Categoria -->
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="categoriaSelecionado"
                  :items="novasCategorias"
                  item-text="nome"
                  item-value="id"
                  label="Categorias do produto"
                ></v-select>
              </v-col>

              <!--
                Quando houver uma mudança de estoque
                é obrigatório escolher um motivo
              -->
              <v-col cols="6" v-if="estoque_changed">
                <v-select
                  item-text="motivo"
                  label="Selecione um motivo"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Modelo e Marca-->
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="modeloSelecionado"
                  :items="modelos"
                  item-text="modelo"
                  item-value="modelo_id"
                  label="Modelo"
                ></v-select>
              </v-col>

              <v-col cols="6">
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

            <h4>Variações de produto</h4>

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
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/produtos" class="mr-2">Voltar</v-btn>
        <v-btn @click="salvarProduto" color="success">Salvar produto</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
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
  data(){
    return {
      produtoToPost: {
        nome: '',
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
        this.$router.push('/admin/produtos');
      }
    },
    async getMarcas() {
      const response = await marcasService.getMarcas()
      if(response.data.success)
        this.marcas = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
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
          nome: 'Nenhum'
        })
        this.categorias.forEach((item) => { this.adicionar(item) })
      }
      else
        this.$toast.error(response.data.message);
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novasCategorias.push({ nome: item.nome, id: item.categoria_id })
      else {
        var string = `${item.nome}`;
        var index = this.categorias.findIndex( i => i.categoria_id == item.categoria_pai);
        var pai = this.categorias[index];
        string = `${pai.nome} / ${string}`; 

        while(pai.categoria_pai != null){
          index = this.categorias.findIndex( i => i.categoria_id == pai.categoria_pai);
          pai = this.categorias[index];
          string = `${this.categorias[index].nome} / ${string}`;
        }

        //console.log(string);
        this.novasCategorias.push({ nome: string, id: item.categoria_id });
      }
    },
    async salvarProduto(){
      if(this.produtoToPost.nome.length < 6)
        this.$toast.error('Nome de produto muito curto!');
      else if(this.produtoToPost.preco <= 0)
        this.$toast.error('Preço do produto não pode ser vazio')
      else{
        this.produtoToPost.variacoes = this.variacoes;
        const response = await produtoService.novoProduto(this.produtoToPost);
        
        if(response.data.success){
          const novo = response.data.data[0];
          this.imagemAdicionado(novo);
          this.$toast.success('Produto foi adicionado com sucesso!');
          this.$router.push('/admin/produtos');
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
    imagemInput(e){
      console.log('Input de imagens');
      let input = e.target.files;
      let caminhos = [];

      input.forEach((imagem) => {
        caminhos.push(URL.createObjectURL(imagem));
      })

      this.imagens = caminhos;
    },
    validarCusto(e){
      let valor = e.target.value;
      valor = parseFloat(valor);
      if(isNaN(valor))
        this.erro_custo = null;
      else if(valor < 0)
        this.erro_custo = 'Custo não pode ser menor que 0';
      else
        this.erro_custo = null;
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    validarEstoque(e){
      var valor = e.target.value;
      if(isNaN(valor))
        this.erro_estoque = null
      else if(valor < 0)
        this.erro_estoque = 'Estoque não pode ser menor que 0.'
      else
        this.erro_estoque = null;
    },
    validarPreco(e){
      let valor = e.target.value;
      valor = parseFloat(valor);
      if(isNaN(valor))
        this.erro_preco = null;
      else if(valor <= 0)
        this.erro_preco = 'Precisa ser maior que 0';
      else
        this.erro_preco = null;
    },
    validarPeso(e){
      let valor = e.target.value;
      valor = parseFloat(valor);
      if(isNaN(valor))
        this.erro_peso = null;
      else if(valor < 0)
        this.erro_peso = 'Peso não pode ser menor que 0';
      else
        this.erro_peso = null;
    },
    adicionarVariacao(){

      if(this.variacao_corSelecionado == 0 && this.variacao_tamanhoSelecionado == 0)
        this.$toast.error('Selecione ao menos uma variação.');
      else if(this.variacao_quantidade == null || this.variacao_quantidade < 0 )
        this.$toast.error('A variação precisa de uma quantidade positiva.');
      else{
        let variacao = {};
        variacao.nome = this.produtoToPost.nome;

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
        variacao.quantidade = this.variacao_quantidade;
        this.variacoes.push(variacao);

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
      // let encontrado = this.variacoes.filter( variacao => { return variacao === to_delete });
      // encontrado = encontrado[0];
      // let index = this.variacoes.findIndex(encontrado);
      // console.log(index);
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
  }
};
</script>

<style lang="css" scoped>
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