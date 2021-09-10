<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
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
            :items="cupons"
            :loading="cupons.length == 0"
            loading-text="Carregando cupons... aguarde"
          >
            <template v-slot:item.cupom_id="{ item }">
              <router-link
                :to="`/admin/cupons/editar/${item.cupom_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/cupons/novo">
          Novo cupom
        </v-btn>
      </v-row>
    </v-container>
  </v-main>

  <!-- <main id="cupons">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Status</th>
                    <th>Nome do Cupom</th>
                    <th>Valor</th>
                    <th>Validade</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="cupom in cupons" v-bind:key="cupom.cupom_id">
                    <td>{{cupom.codigo}}</td>
                    <td>{{cupom.status}}</td>
                    <td>{{cupom.nome}}</td>
                    <td>{{cupom.valor}}</td>
                    <td>{{cupom.validade}}</td>
                    <td>
                      <router-link :to="`/admin/cupons/editar/${cupom.cupom_id}`">
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
        <router-link to="/admin/cupons/novo" class="btn btn-success float-right">
          Novo Cupom
        </router-link>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from '@/services/cupons/cupons-service.js'

export default {
  name: 'CuponsConfig',
  data(){
    return {
      cupons: [],
      termoBusca: '',
      headers: [ 
        { text: 'Código', value: 'codigo' },
        { text: 'Status', value: 'status' },
        { text: 'Nome', value: 'nome' },
        { text: 'Valor', value: 'valor' },
        { text: 'Validade', value: 'validade' },
        { text: 'Ações', value: 'cupom_id' },
      ]
    }
  },
  methods: {
    async listarCupons(){
      const response = await service.listarCupons();
      if(response.data.success)
        this.cupons = response.data.data;
      else
        this.$toast.error(response.data.message);
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

      })
    }
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>