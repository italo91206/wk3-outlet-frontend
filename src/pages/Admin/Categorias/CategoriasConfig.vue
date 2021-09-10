<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por categoria"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="categorias"
            :loading="categorias.length == 0"
            loading-text="Carregando categorias... aguarde"
          >
            <template v-slot:item.categoria_id="{ item }">
              <router-link
                :to="`/admin/categorias/editar/${item.categoria_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/categorias/novo">
          Nova categoria
        </v-btn>
      </v-row>
    </v-container>
  </v-main>

  <!-- <main id="categorias">
    <div class="row">
      pra mostrar a árvore de categorias
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
  </main> -->
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
      termoBusca: '',
      headers: [ 
        { text: 'Nome', value: 'nome' },
        { text: 'Categoria pai', value: 'categoria_pai' },
        { text: 'URL', value: 'url' },
        { text: 'Ações', value: 'categoria_id' },
      ],
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
        if(item.categoria_id == id){
          categoria = item.nome
        }
      })
      return categoria;
    },
    remanejaPai(){
      this.categorias.forEach((item) => {
        // console.log(item.nome);
        if(item.categoria_pai != null){
          item.categoria_pai = this.findById(item.categoria_pai);
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

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>