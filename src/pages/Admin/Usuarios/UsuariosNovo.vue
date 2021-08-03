<template>
  <main id="usuarios-novo-page">
    <div class="row">
      <!-- Informações básicas -->
      <div class="col-lg-12" >
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.nome">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.sobrenome">
              </div>
              
              <div class="form-group row">
                <label for="">Pessoa Jurídica</label>
                <input type="radio" name="tipoPessoa" :checked="usuario.isCompany" @change="mudarPessoa('pj')">
              </div>

              <div class="form-group row">
                <label for="">Pessoa Física</label>
                <input type="radio" name="tipoPessoa" :checked="!usuario.isCompany" @change="mudarPessoa('pf')">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tipo</label>
                <select name="" id="" class="col-sm-8 form-control" :disabled="isAdmin">
                  <option value="">Cliente</option>
                  <option value="" :selected="isEmployee">Funcionário</option>
                  <option value="" :selected="isAdmin">Administrador</option>
                </select>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">RG</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.rg">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">CPF</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.cpf">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <button class="btn btn-primary float-right" :disabled="isChanged" @click="salvarUsuario">Salvar</button>
        <router-link to="/admin/usuarios" class="btn btn-default float-right">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    name: 'UsuariosNovo',
    data() {
        return {
            usuario: {
                nome: '',
                sobrenome: '',
                isCompany: false,
                isEmployee: false,
                isAdmin: false,
                rg: '',
                cpf: ''
            },
            isChanged: true
        }
    }
}
</script>

<style>

</style>