<template>
  <main id="categorias">
    <div class="row">
      <!-- pra mostrar a árvore de categorias -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <div class="form-check" @click="mudouDeVolta">
                <input type="radio" value="0" class="form-check-input" @click="selecionar(0)" name="categoria" checked>
                <label for="" class="form-check-label">Raíz</label>
              </div>
              
              <div v-for="categoria in novo" :key="categoria.id" class="form-check" @click="mudouDeVolta">
                <input type="radio" :value="categoria.id" class="form-check-input" @click="selecionar(categoria.id)" name="categoria">
                <label for="" class="form-check-label">{{categoria.nome}}</label>
              </div>  
            </div>
          </div>
        </div>
      </div>

      <!-- para editar a categoria selecionada -->
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label"
                  >Nome da categoria</label
                >
                <input class="col-sm-8 form-control" v-model="categoriaToPost.nome" type="text" />
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label"
                  >URL da categoria</label
                >
                <input class="col-sm-8 form-control" v-model="categoriaToPost.url" type="text" />
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Descrição</label>
                <textarea
                  class="col-sm-8 form-control"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  v-model="categoriaToPost.descricao"
                ></textarea>
              </div>

              <div class="form-group row">
                <button class="btn btn-default float-right disabled" @click="adicionarPai" :disabled="categoriaSelecionado == 0">Adicionar nova categoria pai</button>
                <button class="btn btn-default float-right disabled" @click="adicionarFilha">Adicionar nova categoria filha</button>
              </div>

              <div class="form-group row">
                <button class="btn btn-danger float-right" @click="removerCategoria" :disabled="categoriaSelecionado == 0">Remover</button>
                <button class="btn btn-success float-right" @click="salvarCategoria" :disabled="isChanged">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import service from '@/services/categorias/categoria-service.js';

export default {
  name: "CategoriasConfig",
  data() {
    return {
      categorias: [],
      novo: [],
      categoriaToPost: {},
      categoriaSelecionado: '',
      isChanged: true,
      adicionarCategoria: '',
      adicionarNovo: false,
    }
  },
  methods: {
    async getCategorias(){
      const response = await service.verCategorias()
      if(response.data.success){
        this.categorias = response.data.data;
        this.categorias.forEach((item) => { this.adicionar(item) })
      }
    },
    selecionar(valor){
      this.categoriaSelecionado = valor;
    },
    mudou(){
      this.isChanged = false;
    },
    mudouDeVolta(){
      this.isChanged = true;
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novo.push({ nome: item.nome, id: item.categoria_id } )
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
        this.novo.push({ nome: string, id: item.categoria_id });
      }
    },
    adicionarPai(){
      // this.categoriaSelecionado = 0;
      // this.adicionarCategoria = "pai";
      // console.log('foo')
      // this.adicionarNovo = true;
      // this.categoriaToPost.categoria_id = null;
    },
    adicionarFilha(){
      // this.categoriaSelecionado = 0;
      // this.adicionarCategoria = "filha";
      // this.adicionarNovo = true;
      // this.categoriaToPost.categoria_id = null;
    },
    removerCategoria(){
      console.log('foo');
    },
    recarregarCategorias(){
      this.categorias = [];
      this.novo = [];
      this.getCategorias();
    },
    async salvarCategoria(){
      if(!this.adicionarNovo){
        const response = await service.atualizarCategoria(this.categoriaToPost);
        if(response.data.success){
          this.$toast.success('Categoria atualizada com sucesso!');
          this.recarregarCategorias();
        }
        else
          this.$toast.error(response.data.message);
      }
      else{
        const response = await service.novaCategoria(this.categoriaToPost, this.adicionarCategoria);
        if(response.data.success){
          this.$toast.success('Categoria adicionada com sucesso!');
          this.recarregarCategorias();
        }
        else
          this.$toast.error(response.data.message);
      }
    }
  },
  watch: {
    categoriaSelecionado(){
      if(this.categoriaSelecionado != 0){
        var index = this.categorias.findIndex((item) => item.categoria_id == this.categoriaSelecionado);
        this.categoriaToPost = JSON.parse(JSON.stringify(this.categorias[index]));
      }
      else{
        console.log("Sou zero");
        this.categoriaToPost.nome = "";
        this.categoriaToPost.categoria_pai = "";
        this.categoriaToPost.descricao = "";
        this.categoriaToPost.url = "";
      }
    }
  },
  mounted(){
    this.getCategorias();
  }
};
</script>

<style>
</style>