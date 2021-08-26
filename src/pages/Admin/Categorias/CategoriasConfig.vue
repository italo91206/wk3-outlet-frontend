<template>
  <main id="categorias">
    <div class="row">
      <!-- pra mostrar a árvore de categorias -->
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-response p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria pai</th>
                  <th>URL</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="categoria in categorias" :key="categoria.categoria_id">
                  <td>{{categoria.nome}}</td>
                  <td>{{categoria.categoria_pai}}</td>
                  <td>{{categoria.url}}</td>
                  <td>
                    <router-link :to="`/admin/categorias/editar/${categoria.categoria_id}`">
                      Editar
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/categorias/novo">
          <button class="btn btn-success float-right">Nova Categoria</button>
        </router-link>
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
        this.remanejaPai();
      }
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
    findById(id){
      let categoria = ''
      this.categorias.forEach((item) => {
        if(item.categoria_id == id)
          categoria = item.nome
      })
      return categoria;
    },
    remanejaPai(){
      this.categorias.forEach((item) => {
        if(item.categoria_pai != null){
          item.categoria_pai = this.findById(item.categoria_id)
        }
      })
    }
  },
  watch: {
  },
  mounted(){
    this.getCategorias();
  }
};
</script>

<style>
</style>