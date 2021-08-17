<template>
  <main id="modelos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Modelo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="modelo in modelos" :key="modelo.modelo_id">
                    <td>{{modelo.modelo_id}}</td>
                    <td>{{modelo.modelo}}</td>
                    <td>
                      <router-link :to="`/admin/marcas/editar/${modelo.modelo_id}`">
                        Editar
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/modelos/novo" class="btn btn-success float-right">
          Novo modelo
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import Axios from "axios";

export default {
  name: "ModelosConfig",
  data() {
    return {
      uri: "http://localhost:5000",
      modelos: "",
      modeloInput: "",
      modeloIdToEdit: null,
      tipoAcao: "Adicionar novo",
      disabled: false,
    };
  },
  methods: {
    listarModelos() {
      Axios.get(`${this.uri}/modelo/modelos`).then(
        (response) => (this.modelos = response.data)
      );
    },
    remover(modelo) {
      var acao = confirm(`Deseja mesmo remover ${modelo.modelo} ?`);

      if (acao == true) {
        Axios.delete(`${this.uri}/modelo/deleteModelo`, {
          data: { id: modelo.id },
        }).then(() => {
          this.listarModelos();
        });
      }
    },
    preparaEditar(modelo) {
      this.tipoAcao = "Salvar edição";
      this.modeloInput = modelo.modelo;
      this.modeloIdToEdit = modelo.id;
    },
    inserir() {
      Axios.post(`${this.uri}/modelo/novoModelo`, {
        modelo: this.modeloInput,
      }).then(() => {
        this.listarModelos();
        this.modeloInput = "";
      });
    },
    botaoForm() {
      if (this.tipoAcao == "Salvar edição") {
        Axios.put(`${this.uri}/modelo/editarModelo`, {
          id: this.modeloIdToEdit,
          modelo: this.modeloInput,
        }).then(() => {
          this.tipoAcao = "Adicionar novo";
          this.modeloInput = "";
          this.modeloIdToEdit = null;
          this.listarModelos();
        });
      } else if (this.tipoAcao == "Adicionar novo") {
        if (this.modeloInput.length == 0) alert("Por favor escreva algo.");
        else this.inserir();
      }
    },
  },
  mounted() {
    this.listarModelos();
  },
};
</script>

<style>
</style>