<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por nome de cupom"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="enabled_only_filter ? getEnabledOnly : cupons"
            :loading="cupons_loading"
            loading-text="Carregando cupons... aguarde"
          >
            <template v-slot:item.cupom_id="{ item }">
              <router-link
                :to="`/cupons/editar/${item.cupom_id}`"
              >
                Editar
              </router-link>
            </template>

            <template v-slot:top>
              <v-col>
                <v-checkbox
                  v-model="enabled_only_filter"
                  label="Mostrar somente habilitados"
                ></v-checkbox>
              </v-col>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/cupons/novo">
          Novo cupom
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Consultar cupons
      </template>

      <template #texto>
        <p>
          Setor que consta com todos os cupons cadastrados, com informações como o código, status, nome, valor, e validade do cupom.<br/><br/>Ao clicar em “editar” será levado para a página de edição de determinado cupom em específico.<br/>Ao clicar em “nova cupom” será levada para a página de cadastro de um novo cupom no site.
        </p>
      </template>
    </Helper>

  </v-main>
</template>

<script>
import service from '@/services/cupons/cupons-service.js'
import Helper from '@/components/Helper.vue'

export default {
  name: 'CuponsConfig',
  components: {
    Helper
  },
  data(){
    return {
      cupons: [],
      cupons_before: [],
      cupons_loading: true,
      termoBusca: '',
      headers: [
        { text: 'Código', value: 'codigo' },
        { text: 'Status', value: 'status' },
        { text: 'Habilitado', value: 'is_enabled' },
        { text: 'Nome', value: 'nome' },
        { text: 'Valor', value: 'valor' },
        { text: 'Validade', value: 'validade' },
        { text: 'Ações', value: 'cupom_id' },
      ],
      enabled_only_filter: true,
    }
  },
  methods: {
    async listarCupons(){
      await service.listarCupons()
      .then((response) => {
        this.cupons = response.data.data;
      })
      .catch((response) => {
        this.$toast.error(response.data.message);
      })
      .finally(() => {
        this.cupons_loading = false;
      })
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted(){
    this.listarCupons();
  },
  computed: {
    getEnabledOnly(){
      return this.cupons.filter((c) => { return c.is_enabled == 'Sim' })
    }
  },
  watch:{
    cupons: function(){
      this.cupons.forEach( (item) => {
        if(item.is_fixed){
          let novo = item.valor.toFixed(2)
          item.valor = `R$ ${novo}`;
        }
        else{
          let novo = item.valor.toFixed(2);
          novo = this.pad(novo, 2);
          item.valor = `${novo} %`
        }

        let data = new Date(item.validade);
        let hoje = new Date();

        if(hoje > data)
          item.status = "expirado";
        else
          item.status = "válido";

        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();

        dia = this.pad(dia, 2);
        mes = this.pad(mes, 2);

        item.validade = `${dia}/${mes}/${ano}`;

        item.is_enabled = item.is_enabled ? 'Sim' : 'Não'

      })
    },
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
