<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="form">
            <div class="form-group">
              <div class="imagem-place-holder">
                <span>+</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Imagens do produto</label>

              <div class="custom-file col-sm-2 col-form-label disabled">
                <input type="file" class="custom-file-input" id="custom-file-input">
                <label for="custom-file-input" class="custom-file-label">Adicionar imagens</label>
              </div>
            </div>

            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Nome produto</label>
              <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.nome"/>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Preço</label>
                <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.preco">
            </div>

            <hr/>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Custo</label>
                <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.custo">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Estoque</label>
                <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.estoque" @change="mudouEstoque">
            </div>

            <div class="form-group row" v-if="estoque_changed">
              <label for="" class="col-sm-2 col-form-label">Motivo de acerto</label>
              <select name="" id="" v-model="motivo" class="col-sm-8 form-control">
                <option value="" disabled selected>-- Selecionar um --</option>
                <option v-for="motivo in motivos" :key="motivo.motivo_id" :value="motivo.motivo_id">{{ motivo.motivo }}</option>
              </select>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
                <input type="text" class="col-sm-8 form-control" v-model="produtoToPost.peso">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Descrição do produto</label>
                <textarea type="text" rows="3" class="col-sm-8 form-control" v-model="produtoToPost.descricao"></textarea>
            </div>

            <div class="form-group row disabled">
                <label for="" class="col-sm-2 col-form-label">Categoria</label>
                <select name="" id="" class="col-sm-8 form-control" v-model="categoriaSelecionado">
                  <option value="" selected>-- Escolher uma categoria --</option>
                  <option v-for="categoria in novasCategorias" v-bind:key="categoria.id" :value="categoria.id">{{categoria.nome}}</option>
                </select>
            </div>

            <hr/>

             <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Modelo</label>
                <select name="" id="" class="col-sm-8 form-control" v-model="modeloSelecionado">
                  <option value="" selected>-- Escolher um modelo --</option>
                  <option v-for="modelo in modelos" v-bind:key="modelo.id" :value="modelo.modelo_id">{{modelo.modelo}}</option>
                </select>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Marca</label>
                <select name="" id="" v-model="marcaSelecionado" class="col-sm-8 form-control">
                  <option value="" selected>-- Escolher uma marca --</option>
                  <option v-for="marca in marcas" v-bind:key="marca.id" :value="marca.marca_id">{{marca.marca}}</option>
                </select>
            </div>

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
      categorias: [],
      novasCategorias: [],
      categoriaSelecionado: '',
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
          const acerto = await acertoService.gravarAcerto(this.produtoToPost, 1, this.motivo);
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
    }
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
    this.getProduto();
    this.getCategorias();
  },
  watch: {
    produtoToPost: function(){
      if(this.produtoToPost.modelo_id) this.modeloSelecionado = this.produtoToPost.modelo_id;
      if(this.produtoToPost.marca_id) this.marcaSelecionado = this.produtoToPost.marca_id;
    },
    estoque_changed: function(){
      this.carregarMotivos();
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