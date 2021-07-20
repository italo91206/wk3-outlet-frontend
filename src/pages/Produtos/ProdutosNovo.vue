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

              <div class="custom-file col-sm-2 col-form-label">
                <input type="file" class="custom-file-input" id="custom-file-input">
                <label for="custom-file-input" class="custom-file-label">Adicionar imagens</label>
              </div>
            </div>

            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Nome produto</label>
              <input type="text" class="col-sm-8 form-control" />
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Preço</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <hr/>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Custo</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Estoque</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Descrição do produto</label>
                <textarea type="text" rows="3" class="col-sm-8 form-control"></textarea>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Categoria</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <hr/>

             <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Modelo</label>
                <select name="" id="" class="col-sm-8 form-control">
                  <option value="" selected>-- Escolher um modelo --</option>
                  <option v-for="modelo in modelos" v-bind:key="modelo.id" value="modelo">{{modelo.modelo}}</option>
                </select>
                
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Marca</label>
                <select name="" id="" class="col-sm-8 form-control">
                  <option value="" selected>-- Escolher uma marca --</option>
                  <option v-for="marca in marcas" v-bind:key="marca.id" value="marca">{{marca.marca}}</option>
                </select>
            </div>

            <div class="form-group row">
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

export default {
  name: "ProdutosNovo",
  data(){
    return {
      nomeInput: '',
      precoInput: '',
      custoInput: '',
      modeloInput: '',
      marcaInput: '',
      pesoInput: '',
      categoriaInput: '',
      descricaoInput: '',
      coresInput: '',
      estoqueInput: '',
      marcas: '',
      modelos: '',
      cores: ''
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
    salvarProduto(){
      alert('Estou tentando salvar o produto')
    }
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
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