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

            <!-- Link para o produto pai, caso este seja uma variação -->
            <div class="form-group row" v-if="link_pai">
              <p>
                Este produto é uma variação de 
                <router-link :to="`/admin/produtos/editar/${link_pai}`" class="warning">
                  /{{ link_pai }}
                </router-link>
              </p>
            </div>

            <!-- Input de imagens do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Imagens do produto</label>

              <div class="custom-file col-sm-2 col-form-label disabled">
                <input type="file" class="custom-file-input" id="custom-file-input">
                <label for="custom-file-input" class="custom-file-label">Adicionar imagens</label>
              </div>
            </div>

            <!-- Nome do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Nome produto</label>
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
              <input type="text" class="col-sm-8 form-control" @change="validarPreco" v-model="produtoToPost.preco">
              <span class="col-sm-8 text-danger" v-if="erro_preco" style="margin: 0 auto">{{erro_preco}}</span>
            </div>

            <hr/>

            <!-- Custo do produto -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Custo</label>
              <input type="text" class="col-sm-8 form-control" @change="validarCusto" v-model="produtoToPost.custo">
              <span class="col-sm-8 text-danger" v-if="erro_custo" style="margin: 0 auto">{{erro_custo}}</span>
            </div>

            <!-- Estoque -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Estoque</label>
              <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.estoque" @change="mudouEstoque">
              <span class="col-sm-8 text-danger" v-if="erro_estoque" style="margin: 0 auto">{{erro_estoque}}</span>
            </div>

            <!--
              Pra quando houver uma mudança de estoque
              É obrigado escolher um motivo
            -->
            <div class="form-group row" v-if="estoque_changed">
              <label for="" class="col-sm-2 col-form-label">Motivo de acerto</label>
              <select name="" id="" v-model="motivo" class="col-sm-8 form-control">
                <option value="" disabled selected>-- Selecionar um --</option>
                <option v-for="motivo in motivos" :key="motivo.motivo_id" :value="motivo.motivo_id">{{ motivo.motivo }}</option>
              </select>
            </div>

            <!-- Peso (gramas) -->
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
              <input type="text" class="col-sm-8 form-control" @change="validarPeso" v-model="produtoToPost.peso">
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
                <option v-for="categoria in novasCategorias" v-bind:key="categoria.id" :value="categoria.id">{{categoria.nome}}</option>
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

              <!-- Tamanhos -->
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

            <!-- Botões de salvar / deletar / voltar -->
            <div class="row">
              <div class="col-sm-10">
                <button class="btn btn-success float-right" @click="salvarProduto">
                  Salvar Produto
                </button>

                <button @click="deletarConfirm" class="btn btn-danger float-right">
                  Deletar produto
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
import motivosService from '@/services/motivo/motivos-service.js'
import acertoService from '@/services/acerto-estoque/acerto-estoque-service.js'
import categoriaService from '@/services/categorias/categoria-service.js'
import imagemService from '@/services/imagens/imagem-service.js'
import tamanhoService from '@/services/tamanhos/tamanhos-service.js'
import validar from '@/utils/validacoes.js'

export default {
  name: "ProdutosEditar",
  data(){
    return {
      produtoToPost: {
        nome: '',
        preco: '',
        custo: '',
        peso: '',
        descricao: '',
        estoque: '',
        marca_id: '',
        modelo_id: '',
      },
      modeloSelecionado: '',
      marcaSelecionado: '',
      modelos: [],
      marcas: [],
      cores: [],
      estoque_changed: false,
      motivo: '',
      motivos: [],
      erro_nome: null,
      erro_custo: null,
      erro_preco: null,
      erro_estoque: null,
      erro_peso: null,
      categorias: [],
      tamanhos: [],
      variacoes: [],
      novasCategorias: [],
      categoriaSelecionado: '',
      imagens: [],
      link_pai: null,
      variacao_corSelecionado: 0,
      variacao_tamanhoSelecionado: 0,
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
        this.categorias.forEach((item) => { this.adicionar(item) })
      }
      else
        this.$toast.error(response.data.message);
    },
    async salvarProduto(){
      let liberar = true;
      
      if(this.estoque_changed){
        if(this.motivo == ""){
          liberar = false;
          alert('Por favor selecione um motivo');
        }
        else{
          const perfil_id = this.$store.state.perfil.perfil.id
          const acerto = await acertoService.gravarAcerto(this.produtoToPost, perfil_id, this.motivo);
          if(acerto.data.success)
            this.$toast.success('Estoque foi acertado com sucesso').
          else
            this.$toast.error(acerto.data.message);
        }
      }
      if(liberar){
        const response = await produtoService.atualizarProduto(this.produtoToPost);
        if(response.data.success){
          this.$toast.success('Produto foi atualizado com sucesso');
          this.$router.push('/admin/produtos');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async getProduto(){
      const url = this.$route.params.product_url;
      const response = await produtoService.recuperarProduto(url);
      
      if(response.data.success)
        this.produtoToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    }, 
    async deletarProduto(){
      const response = await produtoService.deletarProduto(this.produtoToPost.produto_id);
      if(response.data.success){
        this.$toast.success('Produto foi removido com sucesso!');
        this.$router.push('/admin/produtos');
      }
      else
        this.$toast.error(response.data.message);
    },
    async carregarMotivos(){
      const response = await motivosService.listarMotivos();
      if(response.data.success)
        this.motivos = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    },
    async getTamanhos() {
      const response = await tamanhoService.listarTamanhos()
      if(response.data.success)
        this.tamanhos = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    },
    async recuperarImagens() {
      const id = this.produtoToPost.produto_id;
      const response = await imagemService.recuperarImagens(id);

      if(response.data.success){
        const ENVIROMENT = process.env.NODE_ENV;
        let baseURL = `http://localhost:5000`

        if(ENVIROMENT === 'production')
          baseURL = `https://wk3-outlet-backend.herokuapp.com`;

        const recuperado = response.data.data;
        let novo = [];

        recuperado.forEach((item) => {
          novo.push(`${baseURL}${item.url}`)
        })
        
        this.imagens = novo;
      }
    },
    async carregarUrlProdutoPai(id){
      const response = await produtoService.recuperarUrlPorId(id)
      if(response.data.success)
        this.link_pai = response.data.data.url;
      else
        console.error(response.data.message);
    },
    async recuperarVariacoes(){
      const response = await produtoService.recuperarVariacoes(this.produtoToPost.produto_id);
      if(response.data.success)
        this.variacoes = response.data.data;
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
    deletarConfirm(){
      const acao = confirm('Deseja mesmo remover o produto ? Esta ação é irreversível !');
      if(acao)
        this.deletarProduto();
    },
    mudouEstoque(){
      this.estoque_changed = true;
    },
    validarNome(e){
      this.erro_nome = validar.validarNome(e.target.value);
    },
    validarEstoque(e){
      this.erro_estoque = validar.validarNumeroInteiro(e.target.value);
    },
    validarCusto(e){
      this.erro_custo = validar.validarNumeroInteiro(e.target.value);
    },
    validarPreco(e){
      this.erro_preco = validar.validarNumeroFlutuante(e.target.value);
    },
    validarPeso(e){
      this.erro_peso = validar.validarNumeroFlutuante(e.target.value);
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
    },
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
    this.getProduto();
    this.getCategorias();
    this.getTamanhos();
  },
  watch: {
    produtoToPost: function(){
      if(this.produtoToPost.modelo_id) this.modeloSelecionado = this.produtoToPost.modelo_id;
      if(this.produtoToPost.marca_id) this.marcaSelecionado = this.produtoToPost.marca_id;
      if(this.produtoToPost.produto_pai) this.carregarUrlProdutoPai(this.produtoToPost.produto_pai);
      if(this.produtoToPost.tipo_produto == 'configuravel') this.recuperarVariacoes();
      this.recuperarImagens();
    },
    estoque_changed: function(){
      this.carregarMotivos();
    },
    variacoes: function(){
      this.variacoes.forEach((variacao) => {
        if(variacao.cor_id){
          const cor = this.cores.filter(cor => { return cor.cor_id === variacao.cor_id });
          variacao.cor = cor[0].cor;
        }
        if(variacao.tamanho_id){
          const tamanho = this.tamanhos.filter(tamanho => { return tamanho.tamanho_id === variacao.tamanho_id });
          variacao.tamanho = tamanho[0].tamanho;
        }
      })
    }
  }
};
</script>

<style>
.imagem-place-holder {
  height: 80px;
  width: 80px;
  border: #343a40 2px dashed;
  display: flex;
  justify-content: center;
  align-items: center;
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