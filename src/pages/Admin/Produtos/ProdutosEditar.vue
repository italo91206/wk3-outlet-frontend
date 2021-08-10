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
                <input type="text" class="col-sm-8 form-control">
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
      motivos: []
    }
  },
  methods: {
    async getMarcas() {
      const response = await marcasService.getMarcas()
      this.marcas = response.data;
    },
    async getModelos(){
      const response = await modelosService.getModelos();
      this.modelos = response.data;
    },
    async getCores(){
      const response = await coresService.listarCores();
      this.cores = response.data;
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
          liberar = true;
          console.log(acerto.data);
        }
      }
      if(liberar){
        const response = await produtoService.atualizarProduto(this.produtoToPost);
        console.log(response.data);
      }
    },
    async getProduto(){
      const url = this.$route.params.product_url;
      const response = await produtoService.recuperarProduto(url);
      this.produtoToPost = response.data.dados;
    }, 
    async deletarProduto(){
      const response = await produtoService.deletarProduto(this.produtoToPost.produto_id);
      console.log(response.data);
    },
    async carregarMotivos(){
      const response = await motivosService.listarMotivos();
      this.motivos = response.data;
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
  },
  watch: {
    produtoToPost: function(){
      this.modeloSelecionado = this.produtoToPost.modelo_id;
      this.marcaSelecionado = this.produtoToPost.marca_id;
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