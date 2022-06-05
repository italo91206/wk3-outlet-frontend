<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="w100 pa-5" elevation="10">
            <v-btn v-bind:class="{ etapaAtivo: etapa == 1}" class="w100 mb-2" @click="etapa = 1">Inf. Básicas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 2}" class="w100 mb-2" @click="etapa = 2">Inf. Avançadas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 3}" class="w100 mb-2" @click="etapa = 3">Compras</v-btn>
            <v-btn v-if="usuario.isAdmin || usuario.isEmployee" v-bind:class="{ etapaAtivo: etapa == 4}" class="w100 mb-2" @click="etapa = 4">Acertos</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 5}" class="w100" @click="etapa = 5">Newsletter</v-btn>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-card class="w100 pa-10" elevation="10">
            <div class="w100" v-if="etapa == 1">
              <v-form v-model="isValidForm_basico" ref="form_basico" @submit.prevent >
                <v-col cols="12">
                  <v-checkbox
                    v-model="usuario.is_enabled"
                    label="Usuário habilitado"
                  ></v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="usuario.nome"
                    :rules="[rules.required, rules.specialCharacters]"
                  ></v-text-field>

                  <v-text-field
                    label="Sobrenome"
                    v-model="usuario.sobrenome"
                    :rules="[rules.required, rules.specialCharacters]"
                  ></v-text-field>

                  <v-radio-group v-model="usuario.isCompany">
                    <v-radio
                      label="Pessoa Jurídica"
                      :value="true"
                    ></v-radio>

                    <v-radio
                      label="Pessoa Física"
                      :value="false"
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
              <v-form v-model="isValidForm_avancado" ref="form_avancado" @submit.prevent >
                <v-col cols="12">
                  <v-text-field
                    label="RG"
                    v-model="usuario.rg"
                    :rules="[rules.required, rules.onlyNumbers]"
                    maxlength="9"
                    counter="9"
                  ></v-text-field>

                  <v-text-field
                    label="CPF"
                    v-model="usuario.cpf"
                    :rules="[rules.required, rules.onlyNumbers]"
                    maxlength="11"
                    counter="11"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    v-model="usuario.email"
                    :rules="[rules.email, rules.required]"
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    v-model="usuario.password"
                    @click:append="show = !show"
                    label="Senha"
                  ></v-text-field>
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
                :loading="loading"
                loading-text="Carregando acertos... aguarde"
                no-data-text="Usuário não fez acertos."
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
        <v-btn to="/usuarios" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar usuário</v-btn>
        <v-btn @click="atualizarUsuario" :disabled="buttonIsValid == false" color="success">Salvar usuário</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Editar usuário
      </template>

      <template #texto>
        <p>
          Na tela de edição do usuário é apresentado abas.<br/><br/>
          <b>Informações básicas</b> - dados de nome, sobrenome, tipo de pessoa e tipo de permissão.<br/>
          <b>Informações avançadas</b> informa os dados de RG, CPF, e-mail, senha e a opção de habilitar/desabilitar usuário.<br/>
          <b>Compras</b> mostra a listagem com todas as compras já efetuadas pelo usuário.<br/>
          <b>Acertos</b> informa todos os acertos de estoque realizado pelo cliente, se este for o caso.<br/>
          <b>Newsletter</b> informa todas as newsletter no qual o usuário está cadastrado.<br/>
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/usuarios/usuario-service.js";
import acertosService from "@/services/acerto-estoque/acerto-estoque-service.js";
import rules from "@/utils/rules.js";

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
      isValidForm_basico: false,
      isValidForm_avancado: false,
      etapa: 1,
      radioGroup: null,
      tipoPermissoes: 0,
      acertos: [],
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
      ],
      rules: rules,
      termoBusca: "",
      loading: false,
    };
  },
  methods: {
    async listarUsuario(id) {
      const response = await service.listarUsuario(id);
      if (response.data.success) {
        this.usuario = response.data.data;
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/usuarios");
      }
    },
    async deletarUsuario(id) {
      let admin = this.$store.getters['perfil/isAdmin']
      let my_id = this.$store.getters['perfil/getId']

      if(!admin && this.usuario.isAdmin){
        this.$toast.error('Você não tem permissões para isso');
      }
      else{
        const response = await service.deletarUsuario(id);
        if (response.data.success) {
          if(my_id == this.usuario.id){
            localStorage.removeItem('user');
            this.$store.dispatch('auth/logout');
            this.$router.push('/admin');
          }
          else{
            this.$toast.success("Usuário foi removido com sucesso!");
            this.$router.push("/usuarios");
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

      let is_valid = this.validarFormulario()
      if(is_valid){
        const my_id = this.$store.getters['perfil/getId']
        const response = await service.atualizarUsuario(this.usuario);
        if (response.data.success) {
          if(my_id == this.usuario.id && this.usuario.is_enabled == false){
            localStorage.removeItem('user');
            this.$store.dispatch('auth/logout');
            this.$router.push('/admin');
          }
          else{
            this.$toast.success("Usuário foi atualizado com sucesso!");
            this.$router.push("/usuarios");
          }
        } else this.$toast.error(response.data.message);
        }
    },
    async carregarAcertos(id) {
      this.loading = true;

      await acertosService.listarAcertosPorUsuario(id)
        .then((response) => {
          if(response.data.success)
            this.acertos = response.data.data;
          else
            this.$toast.error(response.data.message)
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado")
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    validarFormulario(){
      let is_valid = false;
      const { etapa } = this

      if(etapa == 1){
        this.$refs.form_basico.validate()
        is_valid = this.isValidForm_basico
      }
      else if(etapa == 2){
        this.$refs.form_avancado.validate()
        is_valid = this.isValidForm_avancado
      }

      return is_valid
    },
    mudarPessoa(tipo) {
      if (tipo == "pj") this.usuario.isCompany = true;
      else if (tipo == "pf") this.usuario.isCompany = false;
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
    },
    tipoPermissoes(){
      if(this.tipoPermissoes == 0){
        this.usuario.isEmployee = false;
        this.usuario.isAdmin = false;
      }
      else if(this.tipoPermissoes == 1){
        this.usuario.isEmployee = true;
        this.usuario.isAdmin = false;
      }
      else if(this.tipoPermissoes == 2){
        this.usuario.isEmployee = true;
        this.usuario.isAdmin = true;
      }
    },
  },
  computed: {
    buttonIsValid(){
      let { etapa } = this;

      if(etapa == 1)
        return this.isValidForm_basico
      else if(etapa == 2)
        return this.isValidForm_avancado
      else
        return true
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
