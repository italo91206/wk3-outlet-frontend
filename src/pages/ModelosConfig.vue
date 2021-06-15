<template>
    <main>
        <div>
            <div class="form-group">
                <label for="">Nome do modelo</label>
                <input type="text" v-model="modeloInput" :disabled="disabled">
                <button :disabled="disabled" @click="botaoForm">
                    {{ tipoAcao }}
                </button>
            </div>
        </div>

        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
            </tr>
            <tr v-for="modelo in modelos" :key="modelo.id">
                <td>{{modelo.id}}</td>
                <td>{{modelo.modelo}}</td>
                <td>
                    <button @click="preparaEditar(modelo)"><i class="fas fa-pencil-alt"></i></button>
                    <button @click="remover(modelo)"><i class="fas fa-times"></i></button>
                </td>
            </tr>
        </table>
    </main>
</template>

<script>
import Axios from 'axios'

export default {
    name: "ModelosConfig",
    data(){
      return {
        uri: "http://localhost:5000",
        modelos: '',
        modeloInput: '',
        modeloIdToEdit: null,
        tipoAcao: 'Adicionar novo',
        disabled: false
      }
    },
    methods:{
        listarModelos(){
            Axios
                .get(`${this.uri}/modelo/modelos`)
                .then(response => (this.modelos = response.data))
        },
        remover(modelo){
            var acao = confirm(`Deseja mesmo remover ${modelo.modelo} ?`)
 
            if(acao == true){
                Axios
                    .delete(`${this.uri}/modelo/deleteModelo`, {
                        data: {id: modelo.id}
                    })
                    .then(() => {
                        this.listarModelos();
                    })
            }
        },
        preparaEditar(modelo){
            this.tipoAcao = "Salvar edição"
            this.modeloInput = modelo.modelo
            this.modeloIdToEdit = modelo.id
        },
        inserir(){
            Axios
                .post(`${this.uri}/modelo/novoModelo`, { modelo: this.modeloInput})
                .then( () => {
                    this.listarModelos();
                    this.modeloInput = ""
                })
                
        },
        botaoForm(){
            if(this.tipoAcao == "Salvar edição"){
                Axios
                    .put(`${this.uri}/modelo/editarModelo`, {                        
                        id: this.modeloIdToEdit,
                        modelo: this.modeloInput           
                    })
                    .then( () => {
                        this.tipoAcao = "Adicionar novo"
                        this.modeloInput = ""
                        this.modeloIdToEdit = null
                        this.listarModelos();
                    })                                    
            }
            else if(this.tipoAcao == "Adicionar novo"){
                if(this.modeloInput.length == 0)
                    alert('Por favor escreva algo.')
                else
                    this.inserir()
            }            
        }
    },
    mounted(){
        this.listarModelos();
    }
}
</script>

<style>

</style>