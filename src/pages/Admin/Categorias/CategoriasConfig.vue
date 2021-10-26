<template>
  <v-main class="pa-12">
    <v-container class="w100">
      <v-row>
        <v-card class="w100">
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
            class="w100"
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

    <Helper>
      <p>
        Aqui estão todas as categorias cadastradas, com informações como categoria pai e a url de busca no catálogo (para o SEO do site).
        <br/><br/>Ao clicar em “editar” será levado para a página de edição da categoria em específico.<br/>
        Ao clicar em “nova categoria” será levada para a página de cadastro de uma nova categoria.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import service from '@/services/categorias/categoria-service.js';
import Helper from '@/components/Helper.vue'

export default {
  name: "CategoriasConfig",
  components: {
    Helper
  },
  data() {
    return {
      categorias: [],
      novo: [],
      termoBusca: '',
      headers: [ 
        { text: 'Nome', value: 'nome_categoria' },
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
        this.novo.push({ nome_categoria: item.nome_categoria, id: item.categoria_id } )
      else {
        var string = `${item.nome_categoria}`;
        var index = this.categorias.findIndex( i => i.categoria_id == item.categoria_pai);
        var pai = this.categorias[index];
        string = `${pai.nome_categoria} / ${string}`; 

        while(pai.categoria_pai != null){
          index = this.categorias.findIndex( i => i.categoria_id == pai.categoria_pai);
          pai = this.categorias[index];
          string = `${this.categorias[index].nome_categoria} / ${string}`;
        }

        //console.log(string);
        this.novo.push({ nome_categoria: string, id: item.categoria_id });
      }
    },
    findById(id){
      let categoria = ''
      this.categorias.forEach((item) => {
        if(item.categoria_id == id){
          categoria = item.nome_categoria
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