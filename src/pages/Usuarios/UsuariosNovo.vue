<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100 pa-12" elevation="5">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome"
                  v-model="usuarioToPost.nome"
                ></v-text-field>

                <v-text-field
                  label="Sobrenome"
                  v-model="usuarioToPost.sobrenome"
                ></v-text-field>

                <v-select
                  v-model="tipoPermissoes"
                  :items="permissoes"
                  item-text="nome"
                  item-value="key"
                  label="Tipo de permissão"
                ></v-select>

                <v-text-field
                  label="Email"
                  v-model="usuarioToPost.email"
                ></v-text-field>

                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  v-model="usuarioToPost.password"
                  @click:append="show = !show"
                  label="Senha"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/usuarios" class="mr-2">Voltar</v-btn>
        <v-btn @click="salvarUsuario" color="success">Salvar usuário</v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Adicionar novo usuário
      </template>

      <template #texto>
        <p>
          A tela de adicionar um novo usuário possibilita a inserção de campos como nome, sobrenome, tipo de permissão, e-mail e senha do usuário. Por padrão o usuário já é cadastrado com o perfil habilitado.<br/>
          Para inserir informações adicionais de cadastro, basta consultar logo após.
        </p>
      </template>

    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/usuarios/usuario-service.js";

export default {
  name: "UsuariosNovo",
  components: {
    Helper
  },
  data() {
    return {
      usuarioToPost: {
        nome: "",
        sobrenome: "",
        email: "",
        password: "",
        isEmployee: false,
        isAdmin: false,
        isCompany: false
      },
      show: 'password',
      isChanged: true,
      erro_nome: null,
      erro_sobrenome: null,
      erro_email: null,
      erro_senha: null,
      erro_cargo: null,
      tipoCargo: 0,
      tipoPermissoes: { nome: 'Cliente', key: '0'},
      permissoes: [
        { nome: 'Cliente', key: '0'},
        { nome: 'Funcionário', key: '1'},
        { nome: 'Administrador', key: '2'},
      ],
    };
  },
  mounted(){
    const is_admin = this.$store.getters['perfil/isAdmin']
    if(!is_admin)
      this.permissoes = this.permissoes.filter((permissao) => permissao.nome != 'Administrador')
  },
  methods:{
    mudou(){
      this.isChanged = false;
    },
    validar_nome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = null;
    },
    validar_sobrenome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_sobrenome = "Não é possível inserir caracteres especiais";
      else
        this.erro_sobrenome = null;
    },
    validar_email(e){
      var valor = e.target.value;
      if(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(valor))
        this.erro_email = null;
      else
        this.erro_email = 'Email inválido';
    },
    async salvarUsuario(){
      // if(this.tipoCargo == 0)
      //   this.erro_cargo = 'Selecione um cargo.';
      // else
      //   this.erro_cargo = null;

      // if(this.erro_nome || this.erro_email || this.erro_senha || this.erro_sobrenome || this.erro_cargo)
      //   this.$toast.error('Alguns campos estão inválidos');
      // else{

      // }
      const response = await service.novoUsuario(this.usuarioToPost);
        if(response.data.success){
          this.$toast.success('Usuário cadastrado com sucesso');
          this.$router.push('/usuarios');
        }
        else
          this.$toast.error(response.data.message);
    },
  },
  watch: {
    tipoPermissoes(){
      if(this.tipoPermissoes == 0){
        this.usuarioToPost.isEmployee = false;
        this.usuarioToPost.isAdmin = false;
      }
      else if(this.tipoPermissoes == 1){
        this.usuarioToPost.isEmployee = true;
        this.usuarioToPost.isAdmin = false;
      }
      else if(this.tipoPermissoes == 2){
        this.usuarioToPost.isEmployee = true;
        this.usuarioToPost.isAdmin = true;
      }
    },
  }
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
