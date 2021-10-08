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
                  :rules="[rules.required]"
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
                  v-model="cupomToPost.validade"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/cupons" class="mr-2">Voltar</v-btn>
        <v-btn @click="novoCupom" color="success">Salvar cupom</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/cupons/cupons-service.js'
import rules from '@/utils/rules.js'

export default {
  name: 'CuponsNovo',
  data() {
    return {
      cupomToPost: {},
      tipoCupom: '',
      radioGroup: null,
      rules: rules,
    }
  },
  methods: {
    async novoCupom(){
      if(this.cupomToPost.validade == '')
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
    }
  }
}
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>