<template>
  <main id="motivos-novo">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="">Descrição motivo</label>
                <input class="col-sm-8 form-control" v-model="motivoToPost.motivo" type="text">
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
      }
    }
  },
  methods: {
    async novoMotivo(){
      const response = await service.novoMotivo(this.motivoToPost);
      console.log(response.data);
    }
  }
};
</script>

<style>
</style>