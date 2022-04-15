<template>
  <section class="container">
    <h2>Isto é a página "Dashboard.vue"</h2>

    <Helper>
      <template #titulo>
        Teste de template
      </template>

      <template #texto>
        <p>
          Utilize o menu lateral à esquerda para navegar. Todas as entidades e
          ativos de configuração estão agrupados por tipo de ativo e logo
          depois por tipo de ação.<br />
          <br /><b>Vendas</b> - o usuário é redirecionado para uma listagem de
          vendas efetuadas.<br />
          <b>Catálogo</b> - o usuário terá acesso à opçoes referente à
          <b>produtos</b> e <b>categorias</b>, como também acesso à acertos de
          estoques realizados<br />
          <b>Marketing</b> - o usuário terá acesso à opções referente à
          <b>cupons</b> e <b>newsletters</b><br />
          <b>Relatórios</b> - o usuário terá acesso à relatórios de
          <b>produtos</b>, <b>usuários</b> e <b>estoque</b><br />
          <b>Configurações</b> - o usuário terá acesso à atributos e outras
          configurações envolvendo entidades do sistema, como
          <b
            >cor, modelo, tamanho, motivos de acerto de estoque, marcas e
            usuários</b
          ><br />
          <b>Sair</b> - o usuário é redirecionado para o login administrativo,
          sendo forçadamente deslogado
        </p>
      </template>
    </Helper>
  </section>
</template>

<script>
import Helper from "@/components/Helper.vue";

export default {
  name: "Dashboard",
  components: {
    Helper,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>
