<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <p>
              <strong>ID da preferência</strong>
              {{ venda.preference_id }}
            </p>

            <p>
              <strong>Data da venda</strong>
              {{  venda.data_venda }}
            </p>
            

            <p>
              <strong>Status da venda</strong>
              {{  venda.status }}
            </p>

            <p>
              <strong>Cliente</strong>
              {{  venda.usuario_id }}
            </p>

            <p>
              <strong>Valor da venda</strong>
              {{  venda.total }}
            </p>

            <p>
              <strong>Desconto</strong>
              {{  venda.desconto }}
            </p>

          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/vendas" class="mr-2">Voltar</v-btn>
        <v-btn color="error" class="mr-2">Estornar pagamento</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/vendas/vendas-service.js';

export default {
  name: 'VendasEditar',
  data(){
    return {
      venda: {}
    }
  },
  methods: {
    async recuperarVenda(id){
      const response = await service.recuperarVenda(id);
      if(response.data.success){
        this.venda = response.data.data;
      }
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/vendas');
      }
    }
  },
  mounted(){
    const id = this.$route.params.venda_id;
    this.recuperarVenda(id)
  }
}
</script>

<style lang="css" scope>
.row+.row {
  margin-top: 24px;
}
</style>