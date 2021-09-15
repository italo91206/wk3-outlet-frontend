<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da cor"
                  v-model="corToPost.cor"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-color-picker
                  dot-size="18"
                  swatches-max-height="200"
                  v-model="corToPost.hexa"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/cores" class="mr-2">Voltar</v-btn>
        <v-btn @click="salvar" color="success">Salvar cor</v-btn>
      </v-row>
    </v-container>
  </v-main>
  
  <!-- <main id="cores">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label"
                  >Nome da cor</label
                >
                <input
                  type="text"
                  v-model="corToPost.cor"
                  class="col-sm-8 form-control"
                  @change="validarNome"
                />
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Cor</label>
                <input
                  type="color"
                  v-model="corToPost.hexa"
                  class="col-sm-8 form-control"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-9">
                <button
                  class="btn btn-success float-right"
                  :disabled="isChanged"
                  @click="salvar"
                >
                  Salvar
                </button>
                <router-link
                  to="/admin/cores"
                  class="btn btn-default float-right"
                  >Voltar</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from "@/services/cores/cor-service.js";

export default {
  name: "CoresNovo",
  data() {
    return {
      corToPost: {
        cor: "",
        hexa: "",
      },
      isChanged: true,
      erro_nome: null
    };
  },
  methods: {
    async salvar() {
      if(this.erro_nome)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.salvarCor(this.corToPost);
        if(response.data.success){
          this.$toast.success('Cor adicionada com sucesso!');
          this.$router.push('/admin/cores');
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
  },
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>