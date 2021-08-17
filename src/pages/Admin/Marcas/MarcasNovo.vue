<template>
  <main id="marca-novo">
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
        <button @click="novaMarca" class="btn btn-success float-right" :disabled="isChanged">Salvar Marca</button>
        <router-link class="btn btn-default float-right" to="/admin/marcas">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/marcas/marcas-service'

export default {
  name: 'MarcasNovo',
  data(){
    return {
      marcaToPost: {},
      isChanged: true,
      erro_nome: null,
    }
  },
  methods:{
    validarNome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = '';
    },
    async novaMarca(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos');
      else{
        const response = await service.novaMarca(this.marcaToPost);
        if(response.data.success){
          this.$toast.success('Marca foi cadastrada com sucesso');
          this.$router.push('/admin/marcas');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    mudou(){
      this.isChanged = false;
    }
  }
}
</script>

<style>

</style>