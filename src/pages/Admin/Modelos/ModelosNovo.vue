<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome do modelo"
                  v-model="modeloToPost.modelo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/modelos" class="mr-2">Voltar</v-btn>
        <v-btn @click="novoModelo" color="success">Salvar modelo</v-btn>
      </v-row>
    </v-container>
  </v-main>

  <!-- <main id="modelo-novo">
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
        <button @click="novoModelo" class="btn btn-success float-right" :disabled="isChanged">Salvar Modelo</button>
        <router-link class="btn btn-default float-right" to="/admin/modelos">Voltar</router-link>
      </div>
    </div>
  </main> -->
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
    async novoModelo(){
      if(this.erro_nome)
        this.$toast.error('Alguns campos estão inválidos')
      else{
        const response = await service.novoModelo(this.modeloToPost);
        if(response.data.success){
          this.$toast.success('Modelo foi cadastrado com sucesso!');
          this.$router.push('/admin/modelos')
        }
        else
          this.$toast.error(response.data.message);
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
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>