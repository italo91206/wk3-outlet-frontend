<template>
  <main id="cupons-novo">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group">
                <label for="" class="col-sm-2 col-form-label">Código do Cupom</label>
                <input class="col-sm-8 form-control" type="text" v-model="cupomToPost.codigo">
              </div>

              <div class="form-group">
                <label for="" class="col-sm-2 col-form-label">Nome do cupom</label>
                <input class="col-sm-8 form-control" type="text" v-model="cupomToPost.nome">
              </div>

              <div class="form-group">
                <label for="" class="col-sm-2 col-form-label">Valor do cupom</label>
                <input class="col-sm-8 form-control" type="text" v-model="cupomToPost.valor">
              </div>

              <div class="form-group">
                <div class="form-check">
                  <input type="radio" name="tipoCupom" class="form-check-input" value="percentual" v-model="tipoCupom">
                  <label for="" class="form-check-label">Percentual</label>
                </div>

                <div class="form-check">
                  <input type="radio" name="tipoCupom" class="form-check-input" value="fixo" v-model="tipoCupom">
                  <label for="" class="form-check-label">Valor Fixo</label>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 col-form-label" for="">Validade</label>
                <input type="date" class="col-sm-8 form-control" v-model="cupomToPost.validade">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button @click="salvarCupom" class="btn btn-success float-right" :disabled="isChanged">Salvar Cupom</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
        <router-link class="btn btn-default float-right" to="/admin/cupons">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/cupons/cupons-service.js'

export default {
  name: 'CuponsEditar',
  data() {
    return {
      cupomToPost: {},
      tipoCupom: '',
      isChanged: true
    }
  },
  methods: {
    async listarCupom(id){
      const response = await service.listarCupom(id);
      this.cupomToPost = response.data;
    },
    async salvarCupom(){
      const response = await service.atualizarCupom(this.cupomToPost);
      console.log(response.data);
    },
    async deletarCupom(id){
      const response = await service.deletarCupom(id);
      console.log(response.data);
    },
    deletar(){
      const id = this.$route.params.id;
      const response = confirm('Tem certeza que deseja remover? Esta ação é irreversível!');
      if(response)
        this.deletarCupom(id)
    },
    mudou(){
      this.isChanged = false;
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.listarCupom(id);
  },
  watch: {
    tipoCupom: function(){
      if(this.tipoCupom == 'percentual'){
        this.cupomToPost.is_fixed = false;
        this.cupomToPost.is_percent = true;
      }
      else{
        this.cupomToPost.is_fixed = true;
        this.cupomToPost.is_percent = false;
      }
    },
    cupomToPost: function(){
      if(this.cupomToPost.is_fixed){
        this.tipoCupom = "fixo";
      }
      else{
        this.tipoCupom = "percentual";
      }

      const validade = this.cupomToPost.validade;
      const data = new Date(validade);

      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();

      dia = this.pad(dia, 2);
      mes = this.pad(mes, 2);

      this.cupomToPost.validade = `${ano}-${mes}-${dia}`;
      // console.log(validade);
    }
  }
}
</script>

<style></style>