<template>
  <main id="modelo-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Modelo</label>
                <input class="col-sm-8 form-control" @change="validarNome" type="text" v-model="modeloToPost.modelo">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button @click="salvarModelo" class="btn btn-success float-right" :disabled="isChanged">Salvar Modelo</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
        <router-link class="btn btn-default float-right" to="/admin/modelos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/modelos/modelos-service.js'

export default {
  name: 'ModelosEditar',
  data(){
    return {
      modeloToPost: {},
      isChanged: true,
      erro_nome: null,
    }
  },
  methods: {
    async listarModelo(id){
      const response = await service.verModelo(id);
      if(response.data.success)
        this.modeloToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/modelos');
      }
    },
    async salvarModelo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos')
      else{
        const response = await service.atualizarModelo(this.modeloToPost);
        if(response.data.success){
          this.$toast.success('Modelo foi atualizado com sucesso!');
          this.$router.push('/admin/modelos')
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarModelo(id){
      const response = await service.deletarModelo(id);
      if(response.data.success){
        this.$toast.success('Modelo foi deletado com sucesso!');
        this.$router.push('/admin/modelos');
      }
      else
        this.$toast.error(response.data.message);
    },
    deletar(){
      const response = confirm('Tem certeza que deseja remover? Esta ação é irreversível!');
      if(response){
        const id = this.$route.params.id;
        this.deletarModelo(id)
      }
    },
    mudou(){
      this.isChanged = false;
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = null;
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarModelo(id);
  }
}
</script>

<style>

</style>