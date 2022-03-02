<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="w100 pa-5" elevation="10">
            <v-btn v-bind:class="{ etapaAtivo: etapa == 1}" class="w100" @click="setEtapa(1)">Inf. Básicas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 2}" class="w100" @click="setEtapa(2)">Inf. Avançadas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 3}" class="w100" @click="setEtapa(3)">Compras</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 4}" class="w100" @click="setEtapa(4)">Acertos</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 5}" class="w100" @click="setEtapa(5)">Newsletter</v-btn>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-card class="w100 pa-10" elevation="10">
            <div class="w100" v-if="etapa == 1">
              <v-form>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="usuario.nome"
                  ></v-text-field>

                  <v-text-field
                    label="Sobrenome"
                    v-model="usuario.sobrenome"
                  ></v-text-field>

                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      label="Pessoa Jurídica"
                      value="pj"
                    ></v-radio>    

                    <v-radio
                      label="Pessoa Física"
                      value="pf"
                    ></v-radio>
                  </v-radio-group>

                  <v-select
                    v-model="tipoPermissoes"
                    :items="permissoes"
                    item-text="nome"
                    item-value="key"
                    label="Tipo de permissão"
                  ></v-select>
                </v-col>
              </v-form>
            </div>

            <div class="w100" v-if="etapa == 2">
              <v-form>
                <v-col cols="12">
                  <v-text-field
                    label="RG"
                    v-model="usuario.rg"
                  ></v-text-field>

                  <v-text-field
                    label="CPF"
                    v-model="usuario.cpf"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    v-model="usuario.email"
                  ></v-text-field>

                  <v-text-field 
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    v-model="usuario.password"
                    @click:append="show = !show"
                    label="Senha"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="usuario.is_enabled"
                    label="Usuário habilitado"
                  ></v-checkbox>
                </v-col>
              </v-form>
            </div>

            <div class="w100" v-if="etapa == 3">
              <h3>Compras efetuadas pelo usuário. Ainda não está pronto</h3>
            </div>

            <div class="w100" v-if="etapa == 4">
              <v-card-title>
                <v-text-field
                  v-model="termoBusca"
                  append-icon="mdi-magnify"
                  label="Buscar por acerto"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :search="termoBusca"
                :items="acertos"
                :loading="acertos.length == 0"
                loading-text="Carregando acertos... aguarde"
              >
              </v-data-table>
            </div>

            <div class="w100" v-if="etapa == 5">
              <h3>Newsletter assinado pelo cliente. Ainda não está pronto</h3>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/usuarios" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar usuário</v-btn>
        <v-btn @click="atualizarUsuario" color="success">Salvar usuário</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Na tela de edição do usuário é apresentado abas.<br/><br/>A aba <b>Informações básicas</b> informa os dados de nome, sobrenome, tipo de pessoa e tipo de permissão.<br/><br/>A aba <b>Informações avançadas</b> informa os dados de RG, CPF, e-mail, senha e a opção de habilitar/desabilitar usuário.<br/>A aba <b>compras</b> mostra a listagem com todas as compras já efetuadas pelo usuário.<br/>A aba <b>acertos</b> informa todos os acertos de estoque realizado pelo cliente, se este for o caso.<br/>A aba <b>newsletter</b> informa todas as newsletter no qual o usuário está cadastrado.<br/><br/>Ao apertar em "salvar" as alterações são salvas.<br/>Ao apertar em "deletar" o usuário em questão será deletado.<br/>Ao apertar em "voltar" o usuário é redirecionado de volta para a listagem de usuários.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/usuarios/usuario-service.js";
import acertosService from "@/services/acerto-estoque/acerto-estoque-service.js";
import validar from "@/utils/validacoes.js";

export default {
  name: "UsuariosEditar",
  components: {
    Helper
  },
  data() {
    return {
      usuario: {},
      isAdmin: false,
      isEmployee: false,
      isChanged: true,
      etapa: 1,
      erro_nome: null,
      erro_sobrenome: null,
      radioGroup: null,
      tipoPermissoes: 0,
      acertos: null,
      show: 'text',
      permissoes: [
        { nome: 'Cliente', key: 0},
        { nome: 'Funcionário', key: 1},
        { nome: 'Administrador', key: 2},
      ],
      headers: [
        { text: 'Data alteração', value: 'data' },
        { text: 'Produto', value: 'produto' },
        { text: 'Estoque (anterior)', value: 'valor' },
        { text: 'Motivo', value: 'motivo' },
      ]
    };
  },
  methods: {
    async listarUsuario(id) {
      const response = await service.listarUsuario(id);
      if (response.data.success) {
        this.usuario = response.data.data;
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/admin/usuarios");
      }
    },
    async deletarUsuario(id) {
      let admin = this.$store.state.perfil.isAdmin;
      if(!admin && this.usuario.isAdmin){
        this.$toast.error('Você não tem permissões para isso');
      }
      else{
        const response = await service.deletarUsuario(id);
        if (response.data.success) {
          if(this.$store.state.perfil.perfil.id == this.usuario.id){
            localStorage.removeItem('user');
            this.$store.dispatch('auth/logout');
            this.$router.push('/admin');
          }
          else{
            this.$toast.success("Usuário foi removido com sucesso!");
            this.$router.push("/admin/usuarios");
          }
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async atualizarUsuario() {
      if(this.tipoPermissoes == 1){
        this.usuario.isEmployee = true;
        this.usuario.isAdmin = false;
      }
      else if(this.tipoPermissoes == 2){
        this.usuario.isEmployee = false;
        this.usuario.isAdmin = true;
      }
      const response = await service.atualizarUsuario(this.usuario);
      if (response.data.success) {
        this.$toast.success("Usuário foi atualizado com sucesso!");
        this.$router.push("/admin/usuarios");
      } else this.$toast.error(response.data.message);
    },
    async carregarAcertos(id) {
      const response = await acertosService.listarAcertosPorUsuario(id);
      if(response.data.success){
        this.acertos = response.data.data;
      }
    },
    mudarPessoa(tipo) {
      if (tipo == "pj") this.usuario.isCompany = true;
      else if (tipo == "pf") this.usuario.isCompany = false;
    },
    mudou() {
      this.isChanged = false;
    },
    setEtapa(num) {
      this.etapa = num;
    },
    deletar() {
      let id = this.$route.params.id;
      this.deletarUsuario(id);
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    },
    validar_nome(e) {
      this.erro_nome = validar.validarNome(e.target.value);
    },
    validar_sobrenome(e) {
      this.erro_sobrenome = validar.validarNome(e.target.value);
    }
  },
  mounted() {
    const is_admin = this.$store.getters['perfil/isAdmin']
    const id = this.$route.params.id;
    this.listarUsuario(id);
    if(!is_admin)
      this.permissoes = this.permissoes.filter((permissao) => permissao.nome != 'Administrador')
  },
  watch: {
    usuario: function() {
      this.isAdmin = this.usuario.isAdmin;
      this.isEmployee = this.usuario.isEmployee;

      if(this.isEmployee){
        this.tipoPermissoes = 1;
      }
      else if(this.isAdmin){
        this.tipoPermissoes = 2;
      }
      else{
        this.tipoPermissoes = 0;
      }
    },
    etapa: function() {
      if(this.etapa == 4){
        let id = this.usuario.id;
        this.carregarAcertos(id)
      }
    },
    acertos: function(){
      this.acertos.forEach( (item) => {
        let data = new Date(item.data);
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();

        dia = this.pad(dia, 2);
        mes = this.pad(mes, 2);

        item.data = `${dia}/${mes}/${ano}`;

        let valor = Math.abs(item.valor_anterior - item.valor_novo);
        if(valor > 0)
          item.valor = `+ ${valor}`;
        else
          item.valor = `- ${valor}`
      })
    }
  }
};
</script>

<style lang="css" scoped>
button.etapaAtivo {
  border: solid 1px #557ba1;
}

.row + .row {
  margin-top: 24px;
}
</style>