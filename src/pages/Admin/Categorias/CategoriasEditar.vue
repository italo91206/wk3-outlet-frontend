<template>
  <main id="categorias-novo">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome da categoria</label>
                <input type="text" class="col-sm-8 form-control" @change="validarNome" v-model="categoriaToPost.nome">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Categoria Pai</label>
                <select name="" id="" class="col-sm-8 form-control" v-model="categoriaSelecionado">
                  <option value="0" disabled selected>-- Escolher uma categoria --</option>
                  <option v-for="categoria in categorias" v-bind:key="categoria.categoria_id" :value="categoria.categoria_id">{{categoria.nome}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <button @click="salvarCategoria" class="btn btn-success float-right" :disabled="isChanged">Salvar categoria</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
        <router-link to="/admin/categorias" class="btn btn-default float-right">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/categorias/categoria-service.js'

export default {
  name: 'CategoriasEditar',
  data(){
    return {
      categoriaToPost: {},
      categorias: [],
      novo: [],
      categoriaSelecionado: 0,
      erro_nome: null,
      isChanged: true,
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
        this.novo.push({ nome: item.nome, id: item.categoria_id })
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
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    async salvarCategoria(){
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
    },
    mudou(){
      this.isChanged = false;
    },
  },
  mounted(){
    let id = this.$route.params.id;
    this.getCategoria(id);
    this.getCategorias();
  },
  watch: {
    categoriaToPost(){
      if(this.categoriaToPost.categoria_pai != null)
        this.categoriaSelecionado = this.categoriaToPost.categoria_pai;
    },
    // categoriaSelecionado(){
    //   if(this.categoriaSelecionado != 0)
    //     this.categoriaToPost.categoria_pai = this.categoriaSelecionado;
    //   else
    //     this.categoriaToPost.categoria_pai = null;
    // },
  }
}
</script>

<style>

</style>