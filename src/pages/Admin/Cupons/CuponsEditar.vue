<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100 pa-12" elevation="10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Código do cupom"
                  v-model="cupomToPost.codigo"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Nome do cupom"
                  v-model="cupomToPost.nome"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Valor do cupom"
                  v-model="cupomToPost.valor"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-radio-group v-model="radioGroup" row mandatory>
                  <v-radio
                    label="Percentual"
                    value="percentual"
                  ></v-radio>

                  <v-radio
                    label="Valor Fixo"
                    value="fixo"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col>
                <input 
                  type="datetime-local" 
                  @change="validarData"  
                  v-model="cupomToPost.validade"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/cupons" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar cupom</v-btn>
        <v-btn @click="salvarCupom" color="success">Salvar cupom</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Este setor conta com a edição de um cupom em questão, na qual o administrador consegue adicionar o código, o nome e o valor do cupom oferecido, podendo esse escolher entre percentual e valor fixo, datando seu término.<br/><br/> Ao final, o usuário tem a opção de salvar, deletar ou voltar para consultas. 
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/cupons/cupons-service.js'
import rules from '@/utils/rules.js'

export default {
  name: 'CuponsEditar',
  components: {
    Helper
  },
  data() {
    return {
      cupomToPost: {},
      tipoCupom: '',
      isChanged: true,
      erro_validade: '',
      erro_tipo: '',
      erro_valor: '',
      rules: rules,
      radioGroup: null, 
    }
  },
  methods: {
    async listarCupom(id){
      const response = await service.listarCupom(id);
      if(response.data.success)
        this.cupomToPost = response.data.data;
      else{
        this.$toast.error("Algo deu errado.");
        console.error(response.data.message);
        this.$router.push('/admin/cupons');
      }
    },
    async salvarCupom(){
      var falta_tipo = this.validarTipo();

      if(falta_tipo || this.cupomToPost.validade == '' || this.erro_data || this.erro_valor)
        this.$toast.error('Alguns campos não estão válidos');
      else{
        const response = await service.atualizarCupom(this.cupomToPost);
        if(response.data.success){
          this.$toast.success('Cupom foi atualizado com sucesso!');
          this.$router.push('/admin/cupons');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async deletarCupom(id){
      const response = await service.deletarCupom(id);
      if(response.data.success){
        this.$toast.success('Cupom foi deletado com sucesso!');
        this.$router.push('/admin/cupons');
      }
      else
        this.$toast.error(response.data.message);
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
  mounted(){
    const id = this.$route.params.id;
    this.listarCupom(id);
  },
  watch: {
    radioGroup: function(){
      if(this.radioGroup == 'percentual'){
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

      // Formato para datetime-local precisa ser: yyyy-MM-ddThh:mm
      const validade = this.cupomToPost.validade;
      const data = new Date(validade);

      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();
      let horas = data.getHours();
      let minutos = data.getMinutes();

      dia = this.pad(dia, 2);
      mes = this.pad(mes, 2);
      horas = this.pad(horas, 2);
      minutos = this.pad(horas, 2);

      // console.log(`${ano}-${mes}-${dia}T${horas}:${minutos}`);
      this.cupomToPost.validade = `${ano}-${mes}-${dia}T${horas}:${minutos}`;
    }
  }
}
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>