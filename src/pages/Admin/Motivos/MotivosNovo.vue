<template>
  <main id="motivos-novo">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="">Descrição motivo</label>
                <input class="col-sm-8 form-control" @change="validarNome" v-model="motivoToPost.motivo" type="text">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button class="btn btn-success float-right" @click="novoMotivo">Salvar Motivo</button>
        <router-link class="btn btn-default float-right" to="/admin/motivos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/motivo/motivos-service.js'

export default {
  name: "MotivosNovo",
  data(){
    return {
      motivoToPost: {
        motivo: ''
      },
      isChanged: true,
      erro_nome: null
    }
  },
  methods: {
    async novoMotivo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.novoMotivo(this.motivoToPost);
        if(response.data.success){
          this.$toast.success('Motivo foi adicionado com sucesso!');
          this.$router.push('/admin/motivos');
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
    },
    mudou() {
      this.isChanged = false;
    },
  }
};
</script>

<style>
</style>