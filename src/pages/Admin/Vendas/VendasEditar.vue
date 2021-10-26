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

    <Helper>
      <p>
        Aqui está todas as informações sobre a venda. Será possível consultar quem realizou a compra, se esta possui endereço de entrega, quais os produtos vendidos, quais os valores individuais de cada produto, se foi utilizado algum cupom de desconto, e informações básicas do usuário. 
        <br/><br/>Ao clicar no usuário, será redirecionado para a página de informações mais detalhadas.
        <br/>Ao clicar em um produto, será redirecionado para a consulta completa do mesmo.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import service from '@/services/vendas/vendas-service.js';
import Helper from '@/components/Helper.vue'

export default {
  name: 'VendasEditar',
  components: {
    Helper
  },
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