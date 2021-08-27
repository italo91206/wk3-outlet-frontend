<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="form">

            <div class="form-group row">

              <div class="col-sm-2" style="opacity: 0">
                <span>hidden</span>
              </div>

              <div class="col-sm-8 row">
                <div v-if="imagens.length == 0" class="imagem-place-holder">
                  <span>+</span>
                </div>

                <div v-else v-for="imagem in imagens" v-bind:key="imagem.id" class="imagem-place-holder">
                  <img :src="imagem" alt="">
                </div>
              </div>
            </div>

            <!-- Imagens do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Imagens do produto</label>

              <div class="custom-file col-sm-2 col-form-label disabled">
                <input type="file" class="custom-file-input" id="custom-file-input" @input="imagemInput" multiple>
                <label for="custom-file-input" class="custom-file-label">Adicionar imagens</label>
              </div>
            </div>

            <!-- Nome do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Nome do produto</label>
              <input type="text" class="col-sm-8 form-control" @change="validarNome" v-model="produtoToPost.nome"/>
              <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
            </div>

            <!-- Preço do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Preço</label>
              <input type="number" class="col-sm-8 form-control" @change="validarPreco" v-model="produtoToPost.preco">
              <span class="col-sm-8 text-danger" v-if="erro_preco" style="margin: 0 auto">{{erro_preco}}</span>
            </div>

            <hr/>

            <!-- Custo do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Custo</label>
              <input type="number" class="col-sm-8 form-control" @change="validarCusto" v-model="produtoToPost.custo">
              <span class="col-sm-8 text-danger" v-if="erro_custo" style="margin: 0 auto">{{erro_custo}}</span>
            </div>

            <!-- Estoque -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Estoque</label>
              <input type="number" class="col-sm-8 form-control" v-model="produtoToPost.estoque">
            </div>

            <!-- Peso (gramas) -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
              <input type="number" class="col-sm-8 form-control" v-model="produtoToPost.peso">
            </div>

            <!-- Descrição -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Descrição do produto</label>
              <textarea type="text" rows="3" class="col-sm-8 form-control" v-model="produtoToPost.descricao"></textarea>
            </div>

            <!-- Categoria -->
            <div class="form-group row disabled">
              <label for="" class="col-sm-2 col-form-label">Categoria</label>
              <select name="" id="" class="col-sm-8 form-control" v-model="categoriaSelecionado">
                <option value="" selected>-- Escolher uma categoria --</option>
                <option v-for="categoria in categorias" v-bind:key="categoria.categoria_id" :value="categoria.categoria_id">{{categoria.nome}}</option>
              </select>
            </div>

            <hr/>

            <!-- Modelo -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Modelo</label>
              <select name="" id="" class="col-sm-8 form-control" v-model="modeloSelecionado">
                <option value="" selected>-- Escolher um modelo --</option>
                <option v-for="modelo in modelos" v-bind:key="modelo.id" :value="modelo.modelo_id">{{modelo.modelo}}</option>
              </select>
            </div>

            <!-- Marca -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Marca</label>
              <select name="" id="" v-model="marcaSelecionado" class="col-sm-8 form-control">
                <option value="" selected>-- Escolher uma marca --</option>
                <option v-for="marca in marcas" v-bind:key="marca.id" :value="marca.marca_id">{{marca.marca}}</option>
              </select>
            </div>

            <!-- Cores -->
            <div class="form-group row disabled">
              <label for="" class="col-sm-2 col-form-label">Cores</label>
              
              <div v-for="cor in cores" v-bind:key="cor.id" class="color-option">
                <input type="checkbox" class="color-checkbox" v-bind:value="cor.id" v-bind:id="`cor-${cor.id}`">
                <label v-bind:for="`cor-${cor.id}`" style="display: flex">
                  <div v-bind:style="`background-color: ${cor.hexa}`"></div>
                  {{cor.cor}}
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-10">
                <button class="btn btn-success float-right" @click="salvarProduto">
                  Salvar Produto
                </button>

                <router-link class="btn btn-default float-right" to="/admin/produtos">
                  Voltar
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marcasService from '@/services/marcas/marcas-service.js'
import modelosService from '@/services/modelos/modelos-service.js'
import coresService from '@/services/cores/cor-service.js'
import produtoService from '@/services/produto/produto-service.js'
import categoriaService from '@/services/categorias/categoria-service.js'
import imagemService from '@/services/imagens/imagem-service.js'

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
      modeloSelecionado: '',
      marcaSelecionado: '',
      modelos: [],
      marcas: [],
      cores: [],
      categorias: [],
      novasCategorias: [],
      categoriaSelecionado: '',
      erro_nome: null,
      erro_custo: null,
      erro_preco: null,
      imagens: [],
    }
  },
  methods: {
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
      }
      else
        this.$toast.error(response.data.message);
    },
    async salvarProduto(){
      if(this.produtoToPost.nome.length < 6)
        this.$toast.error('Nome de produto muito curto!');
      else if(this.produtoToPost.preco <= 0)
        this.$toast.error('Preço do produto não pode ser vazio')
      else{
        const response = await produtoService.novoProduto(this.produtoToPost);
        this.imagemAdicionado();
        if(response.data.success){
          this.$toast.success('Produto foi adicionado com sucesso!');
          this.$router.push('/admin/produtos');
        }
        else{
          this.$toast.error(response.data.message);
        }
      }
    },
    async imagemAdicionado(){
      const formData = new FormData();
      const imagefile = document.querySelector("#custom-file-input");

      formData.append("fileimage", imagefile.files)
      const response = await imagemService.enviarImagens(formData);
      if(!response.data.success)
        this.$toast.error(response.data.message);
    },
    imagemInput(e){
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
        this.erro_custo = 'Precisa ser número'
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    validarPreco(e){
      let valor = e.target.value;
      valor = parseFloat(valor);
      if(isNaN(valor))
        this.erro_preco = 'Precisa ser número'
    },
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
    this.getCategorias();
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
    }
  }
};
</script>

<style>
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