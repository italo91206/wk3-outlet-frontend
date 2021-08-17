<template>
  <main id="marca-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Marca</label>
                <input class="col-sm-8 form-control" @change="validarNome" type="text" v-model="marcaToPost.marca">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button @click="salvarMarca" class="btn btn-success float-right" :disabled="isChanged">Salvar Marca</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
        <router-link class="btn btn-default float-right" to="/admin/marcas">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/marcas/marcas-service'

export default {
  name: 'MarcasEditar',
  data(){
    return {
      marcaToPost: {},
      isChanged: true,
      erro_nome: null,
    }
  },
  methods:{
    async listarMarca(id){
      const response = await service.getMarca(id);
      if(response.data.success)
        this.marcaToPost = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    async salvarMarca(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos');
      else{
        const response = await service.salvarMarca(this.marcaToPost);
        if(response.data.success){
          this.$toast.success('Marca foi atualizada com sucesso');
          this.$router.push('/admin/marcas');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarMarca(id){
      const response = await service.deletarMarca(id);
      if(response.data.success){
        this.$toast.success('Marca foi removida com sucesso');
        this.$router.push('/admin/marcas');
      }
      else
        this.$toast.error(response.data.message);
    },
    mudou(){
      this.isChanged = false;
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    deletar(){
      const response = confirm('Tem certeza que deseja remover? Esta ação é irreversível!');
      if(response){
        const id = this.$route.params.id;
        this.deletarMarca(id)
      }
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarMarca(id);
  }
};
</script>

<style>
</style>