<template>
  <main id="tamanhos-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome do tamanho</label>
                <input type="text" @change="validarNome" v-model="tamanhoToPost.tamanho" class="col-sm-8 form-control">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button class="btn btn-success float-right" @click="novo">Salvar Tamanho</button>
        <router-link class="btn btn-default float-right" to="/admin/tamanhos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosNovo',
  data(){
    return {
      tamanhoToPost: {
        tamanho: ''
      },
      erro_nome: null,
    }
  },
  methods:{
    async novo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.novoTamanho(this.tamanhoToPost);
        if(response.data.success){
          this.$toast.success('Tamanho foi cadastrado com sucesso');
          this.$router.push('/admin/tamanhos');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    }
  }
}
</script>

<style>

</style>