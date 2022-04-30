<template>
  <v-main id="vendas-editar" class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <div class="w100">
            <v-form>
              <p>
                <strong>Data da venda</strong>
                {{ getData }}
              </p>

              <p>
                <strong>Status da venda</strong>
                {{ venda.status }}
              </p>
            </v-form>
          </div>

          <hr />

          <div class="w100">
            <v-data-table
              :headers="headers"
              :items="produtos"
              :hide-default-footer="true"
            >
              <template v-slot:item.url="{ item }">
                <img :src="item.url" alt="" />
              </template>

              <template v-slot:item.preco="{ item }">
                {{ item.preco | preco }}
              </template>

              <template v-slot:item.subtotal="{ item }">
                {{ item.subtotal | preco }}
              </template>
            </v-data-table>
          </div>

          <hr />

          <div class="row w100">
            <v-col cols="6">
              <p>{{ venda.nome }} {{ venda.sobrenome }}</p>
              <p>{{ venda.email }}</p>
              <p>{{ getEndereco }}</p>
            </v-col>

            <v-col cols="6">
              <div class="prices-info">
                <div class="flex">
                  <p>Subtotal</p>
                  <b>{{ venda.total | preco }}</b>
                </div>

                <div class="flex">
                  <p>Descontos</p>
                  <b>- {{ venda.desconto | preco }}</b>
                </div>

                <div class="flex">
                  <p>Total</p>
                  <b>{{ (venda.total - venda.desconto) | preco }}</b>
                </div>
              </div>
            </v-col>
          </div>

        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/vendas" class="mr-2">Voltar</v-btn>
        <v-btn color="error" class="mr-2">Estornar pagamento</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Detalhes da venda </template>

      <template #texto>
        <p>
          Aqui está todas as informações sobre a venda. Será possível consultar
          quem realizou a compra, se esta possui endereço de entrega, quais os
          produtos vendidos, quais os valores individuais de cada produto, se
          foi utilizado algum cupom de desconto, e informações básicas do
          usuário.
          <br /><br />Ao clicar no usuário, será redirecionado para a página de
          informações mais detalhadas. <br />Ao clicar em um produto, será
          redirecionado para a consulta completa do mesmo.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import service from "@/services/vendas/vendas-service.js";
import Helper from "@/components/Helper.vue";

export default {
  name: "VendasEditar",
  components: {
    Helper,
  },
  data() {
    return {
      loading: true,
      venda: {},
      produtos: [],
      headers: [
        { text: "Produto", value: "url" },
        { text: "Nome", value: "nome_produto" },
        { text: "Valor un.", value: "preco" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Subtotal", value: "subtotal" },
      ],
      fallback_url:
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
      base_url: "http://wk3outlet.italoferreira.dev.br/static/",
    };
  },
  computed: {
    getEndereco() {
      let { venda } = this;
      if (venda.endereco_id == null) return "Retirada na loja";
      else return "Ainda não tratei o envio.";
    },
    getData() {
      let data = new Date(this.venda.data_venda);
      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    },
  },
  methods: {
    async recuperarVenda(id) {
      await service
        .recuperarVenda(id)
        .then((response) => {
          if (response.data.success) {
            let { venda, produtos } = response.data.data;
            this.venda = venda;
            this.produtos = produtos;
          } else {
            this.$toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Algo deu errado");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    produtos() {
      let { produtos, fallback_url, base_url } = this;

      produtos.forEach((p) => {
        p.subtotal = p.preco * p.quantidade;
        p.url = p.url == null ? fallback_url : `${base_url}${p.url}`;
      });
    },
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
  mounted() {
    const id = this.$route.params.venda_id;
    this.recuperarVenda(id);
  },
};
</script>

<style lang="css" scope>
.row + .row {
  margin-top: 24px;
}

#vendas-editar img {
  width: 45px;
}

.flex {
  display: flex;
}
</style>
