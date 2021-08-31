<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="form">
            <!-- Renderização das imagens do produto -->
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

            <!-- Input de imagens do produto -->
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

            <!-- SKU do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">SKU</label>
              <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.sku"/>
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
              <input type="number" class="col-sm-8 form-control" @change="validarEstoque" v-model="produtoToPost.estoque">
              <span class="col-sm-8 text-danger" v-if="erro_estoque" style="margin: 0 auto">{{erro_estoque}}</span>
            </div>

            <!-- Peso (gramas) -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
              <input type="number" class="col-sm-8 form-control" @change="validarPeso" v-model="produtoToPost.peso">
              <span class="col-sm-8 text-danger" v-if="erro_peso" style="margin: 0 auto">{{erro_peso}}</span>
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

            <hr/>
            <h4>Variações de produto</h4>

            <div class="form-group row">
              <!-- Cores -->
              <div class="form-group row col-sm-5">            
                <label for="" class="col-sm-5 col-form-label">Cor</label>
                
                <select name="" id="" v-model="variacao_corSelecionado" class="col-sm-5 form-control">
                  <option value="0" selected>-- Escolher uma cor --</option>
                  <option v-for="cor in cores" v-bind:key="cor.cor_id" :value="cor.cor_id">{{cor.cor}}</option>
                </select>
              </div>

              <!-- Cores -->
              <div class="form-group row col-sm-5">
                <label for="" class="col-sm-5 col-form-label">Tamanho</label>

                <select name="" id="" v-model="variacao_tamanhoSelecionado" class="col-sm-5 form-control">
                  <option value="0" selected>-- Escolher um tamanho --</option>
                  <option v-for="tamanho in tamanhos" v-bind:key="tamanho.tamanho_id" :value="tamanho.tamanho_id">{{tamanho.tamanho}}</option>
                </select>
              </div>

              <div class="form-group col-sm-2">
                <button class="btn btn-success" @click="adicionarVariacao">Adicionar</button>
              </div>
            </div>

            <div class="form-group col-lg-12 row">
              <table class="table table-striped table-valign-middle">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>SKU</th>
                    <th>Cor</th>
                    <th>Tamanho</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="variacao in variacoes" v-bind:key="variacao.id">
                    <td>{{variacao.nome}}</td>
                    <td>{{variacao.sku}}</td>
                    <td>{{variacao.cor}}</td>
                    <td>{{variacao.tamanho}}</td>
                    <td><a class="link" @click="removerVariacao(variacao.nome)">remover</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Botões de salvar / voltar -->
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
import tamanhoService from '@/services/tamanhos/tamanhos-service.js'

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
        tipo_produto: 'simples',
      },
      modeloSelecionado: '',
      marcaSelecionado: '',
      variacao_corSelecionado: 0,
      variacao_tamanhoSelecionado: 0,
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
      imagens: [],
      variacoes: [],
      variacaoIndex: 0,
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

      if(this.variacao_corSelecionado == 0 && this.variacao_tamanhoSelecionado == 0){
        this.$toast.error('Selecione ao menos uma variação.');
      }
      else{
        let variacao = { ...this.produtoToPost };
        variacao.sku = `${variacao.sku}-${this.variacaoIndex++}`;
        
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
        
        this.variacoes.push(variacao);
        this.variacao_tamanhoSelecionado = 0;
        this.variacao_corSelecionado = 0;
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
    variacoes: function(){
      this.produtoToPost.tipo_produto = this.variacoes.length > 0 ? 'configuravel' : 'simples';
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