<template>
  <main id="cupons-novo">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form">
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
                <input class="col-sm-8 form-control" @change="validarValor" type="number" v-model="cupomToPost.valor">
                <span class="col-sm-8 text-danger" v-if="erro_valor" style="margin: 0 auto">{{erro_valor}}</span>
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

                <div class="form-group row">
                  <span class="col-sm-12 text-danger" v-if="erro_tipo" style="margin: 0 auto">{{erro_tipo}}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 col-form-label" for="">Validade</label>
                <input type="datetime-local" @change="validarData" class="col-sm-8 form-control" v-model="cupomToPost.validade">
                <span class="col-sm-8 text-danger" v-if="erro_data" style="margin: 0 auto">{{erro_data}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10">
        <button @click="novoCupom" class="btn btn-success float-right">Salvar Cupom</button>
        <router-link class="btn btn-default float-right" to="/admin/cupons">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/cupons/cupons-service.js'

export default {
  name: 'CuponsNovo',
  data() {
    return {
      cupomToPost: {
        codigo: '',
        nome: '',
        validade: '',
        valor: '',
        is_percent: false,
        is_fixed: false,
      },
      tipoCupom: '',
      erro_valor: null,
      erro_data: null,
      erro_tipo: null,
    }
  },
  methods: {
    async novoCupom(){
      var falta_tipo = this.validarTipo();

      if(falta_tipo || this.cupomToPost.validade == '' || this.erro_data || this.erro_valor)
        this.$toast.error('Alguns campos não estão válidos');
      else{      
        const response = await service.novoCupom(this.cupomToPost);
        if(response.data.success){
          this.$toast.success('O cupom foi cadastrado com sucesso!');
          this.$router.push('/admin/cupons');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    validarValor(e){
      var valor = e.target.value;
      if(valor < 0.00)
        this.erro_valor = 'Valor precisa ser positivo';
      else
        this.erro_valor = null;
    },
    validarData(e){
      var data = new Date(e.target.value);
      var hoje = new Date();

      if(data < hoje)
        this.erro_data = 'Data precisa ser válida';
      else if(e.target.value == "")
        this.erro_data = 'Preencha este campo.';
      else
        this.erro_data = null;
    },
    validarTipo(){
      if( this.cupomToPost.is_percent == false && this.cupomToPost.is_fixed == false){
        this.erro_tipo = 'Selecione um tipo';
        return true;
      }
      else{
        this.erro_tipo = null;
        return false;
      }      
    }
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
    }
  }
}
</script>

<style></style>