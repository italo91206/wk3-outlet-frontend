<template>
  <main id="cores">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome da cor</label>
                <input 
                  type="text" 
                  v-model="corToPost.cor" 
                  class="col-sm-8 form-control"
                  @change="validarNome">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Cor</label>
                <input type="color" v-model="corToPost.hexa" class="col-sm-8 form-control">
              </div>
            </div>
            
            <div class="row">
              <div class="col-lg-9">
                <button class="btn btn-primary float-right" :disabled="isChanged" @click="atualizarCor">Salvar</button>
                <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
                <router-link to="/admin/cores" class="btn btn-default float-right">Voltar</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/cores/cor-service.js'

export default {
    name: "CoresEditar",
    data(){
      return {
        corToPost: {},
        isChanged: true,
        erro_nome: null,
      }
    },
    methods: {
      async listarCor(id){
        const response = await service.listarCor(id);
        if(response.data.success)
          this.corToPost = response.data.data;
        else{
          this.$toast.error(response.data.message);
          this.$router.push('/admin/cores');
        }
      },
      async deletarCor(id){
        const response = await service.deletarCor(id);
        if(response.data.success){
          this.$toast.success('Cor foi removida com sucesso!');
          this.$router.push('/admin/cores');
        }
        else
          this.$toast.error(response.data.message);
      },
      async atualizarCor(){
        if(this.erro_nome)
          this.$toast.error('Alguns campos não estão válidos');
        else{
          const response = await service.atualizarCor(this.corToPost);
          if(response.data.success){
            this.$toast.success('Cor foi alterada com sucesso!');
            this.$router.push('/admin/cores');
          }
          else
            this.$toast.error(response.data.message);
        }
      },
      mudou(){
        this.isChanged = false
      },
      deletar(){
        let resposta = confirm('Tem certeza que deseja excluir ? Não há volta.')
        if(resposta)
          this.deletarCor(this.corToPost.cor_id);
      },
      validarNome(e){
        var string = e.target.value;
        if(/[^A-z\s\d][\\^]?/.test(string))
          this.erro_nome = "Não é possível inserir caracteres especiais";
        else
          this.erro_nome = '';
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.listarCor(id);
    },
}
</script>

<style>
.color-swatch{
  width: 24px;
  height: 24px;
}
</style>