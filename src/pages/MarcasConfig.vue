<template>
    <main>
        <div>
            <div class="form-group">
                <label for="">Nome da Marca</label>
                <input type="text" v-model="marcaInput" :disabled="disabled">
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
            <tr v-for="marca in marcas" :key="marca.id">
                <td>{{marca.id}}</td>
                <td>{{marca.marca}}</td>
                <td>
                    <button @click="preparaEditar(marca)"><i class="fas fa-pencil-alt"></i></button>
                    <button @click="remover(marca)"><i class="fas fa-times"></i></button>
                </td>
            </tr>
        </table>
    </main>
</template>

<script>
import Axios from 'axios'

export default {
    name: "MarcasConfig",
    data(){
      return {
        uri: "http://localhost:5000",
        marcas: '',
        marcaInput: '',
        marcaIdToEdit: null,
        tipoAcao: 'Adicionar novo',
        disabled: false
      }
    },
    methods:{
        listarMarcas(){
            Axios
                .get(`${this.uri}/marca/marcas`)
                .then(response => (this.marcas = response.data))
        },
        remover(marca){
            var acao = confirm(`Deseja mesmo remover ${marca.marca} ?`)
 
            if(acao == true){
                Axios
                    .delete(`${this.uri}/marca/deleteMarca`, {
                        data: {id: marca.id}
                    })
                    .then(() => {
                        this.listarMarcas();
                    })
            }
        },
        preparaEditar(marca){
            this.tipoAcao = "Salvar edição"
            this.marcaInput = marca.marca
            this.marcaIdToEdit = marca.id
        },
        inserir(){
            Axios
                .post(`${this.uri}/marca/novaMarca`, { marca: this.marcaInput})
                .then( () => {
                    this.listarMarcas();
                    this.marcaInput = ""
                })
                
        },
        botaoForm(){
            if(this.tipoAcao == "Salvar edição"){
                Axios
                    .put(`${this.uri}/marca/editarMarca`, {                        
                        id: this.marcaIdToEdit,
                        marca: this.marcaInput           
                    })
                    .then( () => {
                        this.tipoAcao = "Adicionar novo"
                        this.marcaInput = ""
                        this.marcaIdToEdit = null
                        this.listarMarcas();
                    })                                    
            }
            else if(this.tipoAcao == "Adicionar novo"){
                if(this.marcaInput.lenghth <= 0)
                    alert('Por favor escreva algo.')
                else
                    this.inserir()
            }            
        }
    },
    mounted(){
        this.listarMarcas();
    }
}
</script>

<style>

</style>