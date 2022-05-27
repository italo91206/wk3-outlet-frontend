<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-col cols="6">
          <CardReportSales report-name="tabela-1" />
        </v-col>

        <v-col cols="6">
          <CardReportSales report-name="tabela-2"/>
        </v-col>

        <v-col cols="6">
          <CardReportSales report-name="tabela-3"/>
        </v-col>

        <v-col cols="6">
          <CardReportSales report-name="tabela-4"/>
        </v-col>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Seja bem-vindo à dashboard =)
      </template>

      <template #texto>
        <p>
          Esta é a sua dashboard. Aqui é o local aonde você poderá ver um breve resumo de relatório de faturamento, estoque, newsletter e outros.
          À sua esquerda você encontra o menu de atalhos para realizar outras ações. Você pode navegar para consultar ou realizar operações como cadastro,
          leitura, consulta e outras ações auxiliares. Alguns desses atalhos:
        </p>
        <p>
          <b>Vendas</b> - Consulta de vendas e informações detalhadas<br />
          <b>Catálogo</b> - acesso à opçoes referente à produtos e categorias, como também acertos de estoques<br />
          <b>Marketing</b> - acesso à opções referente à cupons e newsletters<br />
          <b>Relatórios</b> - acesso à relatórios de produtos, usuários e estoque<br />
          <b>Configurações</b> - acesso à atributos e outras configurações envolvendo entidades do sistema, como
          <b>cor, modelo, tamanho, motivos de acerto de estoque, marcas e
            usuários</b><br/>
          <b>Sair</b> - desconectar da sua conta
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import CardReportSales from "@/components/CardReportSales.vue"
import Helper from "@/components/Helper.vue";

export default {
  name: "Dashboard",
  components: {
    Helper, CardReportSales
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>
