<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form @input="mudou">
            <!-- Nome da categoria -->
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da categoria"
                  v-model="categoriaToPost.nome_categoria"
                  
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="categoriaSelecionado"
                  :items="categorias"
                  item-text="nome_categoria"
                  item-value="categoria_id"
                  label="Categoria pai"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/categorias" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar categoria</v-btn>
        <v-btn @click="salvarCategoria" :disabled="isChanged" color="success">Salvar categoria</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Nesta página é possível editar o nome da categoria como a categoria pai da mesma. Adicionalmente, é possível deletar a categoria em questão.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import service from '@/services/categorias/categoria-service.js'
import rules from '@/utils/rules.js'
import Helper from '@/components/Helper.vue'

export default {
  name: 'CategoriasEditar',
  components: {
    Helper
  },
  data(){
    return {
      categoriaToPost: {},
      categorias: [],
      novo: [],
      categoriaSelecionado: 0,
      erro_nome: null,
      isChanged: true,
      rules: rules,
    }
  },
  methods:{
    async getCategoria(id){
      const response = await service.verCategoria(id);
      if(response.data.success){
        this.categoriaToPost = response.data.data;
      }
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/categorias');
      }
    },
    async getCategorias(){
      const response = await service.verCategorias();
      if(response.data.success){
        this.categorias = response.data.data;
        this.categorias.push({"categoria_id":0,"nome_categoria":"","url":"","categoria_pai":null,"is_enabled":true});
        // this.categorias.forEach((item) => { this.adicionar(item) })
      }
      else
        this.$toast.error(response.data.message); 
    },
    async deletarCategoria(id){
      const response = await service.deletarCategoria(id);
      if(response.data.success){
        this.$toast.success('Categoria foi removida com sucesso!');
        this.$router.push('/admin/categorias');
      }
      else
        this.$toast.error(response.data.message);
    },
    deletar(){
      const id = this.$route.params.id;
      this.deletarCategoria(id);
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novo.push({ nome_categoria: item.nome_categoria, id: item.categoria_id })
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
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    async salvarCategoria(){
      if(this.categoriaToPost.categoria_pai == this.categoriaToPost.categoria_id)
        this.$toast.error('Uma categoria não pode ser pai dela mesma.');
      else{
        if(this.erro_nome)
          this.$toast.error('Alguns campos estão inválidos');
        else{
          const response = await service.atualizarCategoria(this.categoriaToPost)
          if(response.data.success){
            this.$toast.success('Categoria foi atualizada com sucesso!');
            this.$router.push('/admin/categorias');
          }
          else
            this.$toast.error(response.data.message);
        }
      }
    },
    mudou(){
      this.isChanged = false;
    },
  },
  mounted(){
    let id = this.$route.params.id;
    this.isChanged = false;
    this.getCategoria(id);
    this.getCategorias();
  },
  watch: {
    categoriaToPost(){
      if(this.categoriaToPost.categoria_pai != null)
        this.categoriaSelecionado = this.categoriaToPost.categoria_pai;
    },
    categoriaSelecionado(){
      this.categoriaToPost.categoria_pai = this.categoriaSelecionado;
    }
    
    // categoriaSelecionado(){
    //   if(this.categoriaSelecionado != 0)
    //     this.categoriaToPost.categoria_pai = this.categoriaSelecionado;
    //   else
    //     this.categoriaToPost.categoria_pai = null;
    // },
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>