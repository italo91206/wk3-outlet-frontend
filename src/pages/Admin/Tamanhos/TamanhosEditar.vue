<template>
  <main id="tamanhos-editar">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome do tamanho</label>
                <input type="text" 
                  v-model="tamanhoToPost.tamanho" 
                  @change="validarNome"
                  class="col-sm-8 form-control">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button class="btn btn-success float-right" :class="{ disabled: isChange }" @click="salvarMotivo">Salvar Tamanho</button>
        <button class="btn btn-danger float-right" @click="deletar">Deletar Tamanho</button>
        <router-link class="btn btn-default float-right" to="/admin/tamanhos">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from "@/services/tamanhos/tamanhos-service.js";

export default {
  name: "TamanhosEditar",
  data() {
    return {
      tamanhoToPost: {},
      isChange: true,
      erro_nome: null,
    };
  },
  methods: {
    async listarTamanho(id) {
      const response = await service.listarTamanho(id);
      if(response.data.success)
        this.tamanhoToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/tamanhos');
      }
    },
    async salvarMotivo() {
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.atualizarTamanho(this.tamanhoToPost);
        if(response.data.success){
          this.$toast.success('Tamanho foi atualizado com sucesso');
          this.$router.push('/admin/tamanhos');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarTamanho(id) {
      const response = await service.deletarTamanho(id);
      if(response.data.success){
        this.$toast.success('Tamanho removido com sucesso');
        this.$router.push('/admin/tamanhos');
      }
      else
        this.$toast.error(response.data.message);
    },
    mudou() {
      this.isChange = false;
    },
    deletar() {
      const resposta = confirm(
        "Deseja mesmo deletar este tamanho? Esta ação é irreversível"
      );
      if (resposta) {
        const id = this.$route.params.id;
        this.deletarTamanho(id);
      }
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
    this.listarTamanho(id);
  },
};
</script>

<style>
</style>