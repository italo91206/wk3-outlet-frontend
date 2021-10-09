<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="pa-12 w100" elevation="10">
          <v-form>
            <!-- Renderizar as imagens do produto -->
            <v-row>
              <section id="galeria-imagens">
                <v-col v-for="imagem in imagens" v-bind:key="imagem.id">
                  <v-img :src="imagem"></v-img>
                </v-col>
              </section>
            </v-row>
            
            <!-- Input de imagens do produto -->
            <v-row>
              <v-file-input
                label="Enviar arquivos"
                outlined
                dense
              >
              </v-file-input>
            </v-row>

            <!-- Nome do produto -->
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  label="Nome do produto" 
                  v-model="produtoToPost.nome"
                  :rules="[rules.specialCharacters]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- SKU do produto -->
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  label="SKU" 
                  v-model="produtoToPost.sku"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Preço e custo do produto -->
            <v-row>
              <v-col>
                <v-text-field 
                  label="Preço" 
                  v-model="produtoToPost.preco"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field 
                  label="Custo" 
                  v-model="produtoToPost.custo"
                  type="number"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Estoque e peso-->
            <v-row>
              <v-col>
                <v-text-field 
                  label="Estoque" 
                  v-model="produtoToPost.estoque"
                  type="number"
                  @change="mudouEstoque"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field 
                  label="Peso (gramas)" 
                  v-model="produtoToPost.peso"
                  type="number"
                  :rules="[rules.positiveNotNull]"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <!-- Categoria -->
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="categoriaSelecionado"
                  :items="novasCategorias"
                  item-text="nome"
                  item-value="id"
                  label="Categorias do produto"
                ></v-select>
              </v-col>

              <!--
                Quando houver uma mudança de estoque
                é obrigatório escolher um motivo
              -->
              <v-col cols="6" v-if="estoque_changed">
                <v-select
                  v-model="motivo"
                  :items="motivos"
                  item-text="motivo"
                  item-value="motivo_id"
                  label="Selecione um motivo"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Modelo e Marca-->
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="modeloSelecionado"
                  :items="modelos"
                  item-text="modelo"
                  item-value="modelo_id"
                  label="Modelo"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-select
                  v-model="marcaSelecionado"
                  :items="marcas"
                  item-text="marca"
                  item-value="marca_id"
                  label="Marca"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Descrição -->
            <v-row>
              <v-col>
                <v-textarea
                  label="Descrição do produto" 
                  v-model="produtoToPost.descricao"
                  type="number"
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>

            <h4>Variações de produto</h4>

            <!-- Cor e tamanho -->
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="variacao_corSelecionado"
                  :items="cores"
                  item-text="cor"
                  item-value="cor_id"
                  label="Cor"
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-select
                  v-model="variacao_tamanhoSelecionado"
                  :items="tamanhos"
                  item-text="tamanho"
                  item-value="tamanho_id"
                  label="Tamanho"
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-text-field
                  v-model="variacao_quantidade"
                  label="Quantidade"
                  :rules="[rules.positiveNumber]"
                ></v-text-field>
              </v-col>

              <v-col cols="3" class="flex align-center">
                <v-btn @click="adicionarVariacao">
                  Adicionar
                </v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headersVariacoes"
              :items="variacoes"
              hide-default-footer
              no-data-text="Este produto não possui variações"
              :disable-sort="true"
            >
              <template v-slot:item.acao="{item}">
                <a class="link" @click="removerVariacao(item.variacao_id)">
                  Remover
                </a>
              </template>

              <template v-slot:item.quantidade="{item}">
                <v-edit-dialog
                  :return-value.sync="item.quantidade"
                  large
                  persistent
                >
                  <div>{{ item.quantidade }}</div>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">
                      Atualizar quantidade
                    </div>
                    <v-text-field
                      v-model="item.quantidade"
                      :rules="[rules.positiveNotNull]"
                      label="Quantidade"
                      single-line
                      counter
                      autofocus
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/produtos" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletarConfirm" color="error" class="mr-2">Deletar produto</v-btn>
        <v-btn @click="salvarProduto" color="success">Salvar produto</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import marcasService from '@/services/marcas/marcas-service.js'
import modelosService from '@/services/modelos/modelos-service.js'
import coresService from '@/services/cores/cor-service.js'
import produtoService from '@/services/produto/produto-service.js'
import motivosService from '@/services/motivo/motivos-service.js'
import acertoService from '@/services/acerto-estoque/acerto-estoque-service.js'
import categoriaService from '@/services/categorias/categoria-service.js'
import imagemService from '@/services/imagens/imagem-service.js'
import tamanhoService from '@/services/tamanhos/tamanhos-service.js'
import validar from '@/utils/validacoes.js'
import rules from '@/utils/rules.js'

export default {
  name: "ProdutosEditar",
  data(){
    return {
      produtoToPost: {
        nome: '',
        preco: '',
        custo: '',
        peso: '',
        descricao: '',
        estoque: '',
        marca_id: '',
        modelo_id: '',
      },
      headersVariacoes: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cor', value: 'cor' },
        { text: 'Tamanho', value: 'tamanho' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Ação', value: 'acao' },
      ],
      modeloSelecionado: '',
      marcaSelecionado: '',
      modelos: [],
      marcas: [],
      cores: [],
      estoque_changed: false,
      motivo: '',
      motivos: [],
      erro_nome: null,
      erro_custo: null,
      erro_preco: null,
      erro_estoque: null,
      erro_peso: null,
      categorias: [],
      tamanhos: [],
      variacoes: [],
      novasCategorias: [],
      categoriaSelecionado: null,
      imagens: [],
      link_pai: null,
      variacaoIndex: 0,
      variacao_corSelecionado: 0,
      variacao_tamanhoSelecionado: 0,
      variacao_quantidade: null,
      rules: rules,
    }
  },
  methods: {
    async getMarcas() {
      const response = await marcasService.getMarcas()
      if(response.data.success){
        this.marcas = response.data.data;
        this.marcas.push({
          marca: 'Sem marca',
          marca_id: null,
        })
      }
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    },
    async getModelos(){
      const response = await modelosService.verModelos();
      if(response.data.success){
        this.modelos = response.data.data;
        this.modelos.push({
          modelo: 'Sem modelo',
          modelo_id: null,
        })
      }
      else
        this.$toast.error(response.data.message);
    },
    async getCores(){
      const response = await coresService.listarCores();
      if(response.data.success)
        this.cores = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    async getCategorias(){
      const response = await categoriaService.verCategorias();
      if(response.data.success){
        this.categorias = response.data.data;
        this.categorias.forEach((item) => { this.adicionar(item) })
      }
      else
        this.$toast.error(response.data.message);
    },
    async salvarProduto(){
      let liberar = true;
      
      if(this.estoque_changed){
        if(this.motivo == ""){
          liberar = false;
          this.$toast.error('Por favor selecione um motivo');
        }
        else{
          const perfil_id = this.$store.state.perfil.perfil.id
          const acerto = await acertoService.gravarAcerto(this.produtoToPost, perfil_id, this.motivo);
          if(acerto.data.success)
            this.$toast.success('Estoque foi acertado com sucesso').
          else
            this.$toast.error(acerto.data.message);
        }
      }
      if(liberar){
        this.produtoToPost.variacoes = this.variacoes;
        const response = await produtoService.atualizarProduto(this.produtoToPost);
        if(response.data.success){
          this.$toast.success('Produto foi atualizado com sucesso');
          this.$router.push('/admin/produtos');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
    async getProduto(){
      const url = this.$route.params.product_url;
      const response = await produtoService.recuperarProduto(url);
      
      if(response.data.success)
        this.produtoToPost = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    }, 
    async deletarProduto(){
      const response = await produtoService.deletarProduto(this.produtoToPost.produto_id);
      if(response.data.success){
        this.$toast.success('Produto foi removido com sucesso!');
        this.$router.push('/admin/produtos');
      }
      else
        this.$toast.error(response.data.message);
    },
    async carregarMotivos(){
      const response = await motivosService.listarMotivos();
      if(response.data.success)
        this.motivos = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    },
    async getTamanhos() {
      const response = await tamanhoService.listarTamanhos()
      if(response.data.success)
        this.tamanhos = response.data.data;
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/produtos');
      }
    },
    async recuperarImagens() {
      const id = this.produtoToPost.produto_id;
      const response = await imagemService.recuperarImagens(id);

      if(response.data.success){
        const ENVIROMENT = process.env.NODE_ENV;
        let baseURL = `http://localhost:5000`

        if(ENVIROMENT === 'production')
          baseURL = `https://wk3-outlet-backend.herokuapp.com`;

        const recuperado = response.data.data;
        let novo = [];

        recuperado.forEach((item) => {
          novo.push(`${baseURL}${item.url}`)
        })
        
        this.imagens = novo;
      }
    },
    async carregarUrlProdutoPai(id){
      const response = await produtoService.recuperarUrlPorId(id)
      if(response.data.success)
        this.link_pai = response.data.data.url;
      else
        console.error(response.data.message);
    },
    adicionar(item) {
      if (item.categoria_pai == null)
        this.novasCategorias.push({ nome: item.nome, id: item.categoria_id })
      else {
        var string = `${item.nome}`;
        var index = this.categorias.findIndex( i => i.categoria_id == item.categoria_pai);
        var pai = this.categorias[index];
        string = `${pai.nome} / ${string}`; 

        while(pai.categoria_pai != null){
          index = this.categorias.findIndex( i => i.categoria_id == pai.categoria_pai);
          pai = this.categorias[index];
          string = `${this.categorias[index].nome} / ${string}`;
        }

        //console.log(string);
        this.novasCategorias.push({ nome: string, id: item.categoria_id });
      }
    },
    deletarConfirm(){
      const acao = confirm('Deseja mesmo remover o produto ? Esta ação é irreversível !');
      if(acao)
        this.deletarProduto();
    },
    mudouEstoque(){
      this.estoque_changed = true;
    },
    validarNome(e){
      this.erro_nome = validar.validarNome(e.target.value);
    },
    validarEstoque(e){
      this.erro_estoque = validar.validarNumeroInteiro(e.target.value);
    },
    validarCusto(e){
      this.erro_custo = validar.validarNumeroInteiro(e.target.value);
    },
    validarPreco(e){
      this.erro_preco = validar.validarNumeroFlutuante(e.target.value);
    },
    validarPeso(e){
      this.erro_peso = validar.validarNumeroFlutuante(e.target.value);
    },
    adicionarVariacao(){

      if(this.variacao_corSelecionado == 0 && this.variacao_tamanhoSelecionado == 0)
        this.$toast.error('Selecione ao menos uma variação.');
      else if(this.variacao_quantidade == null || this.variacao_quantidade < 0 )
        this.$toast.error('A variação precisa de uma quantidade positiva.');
      else{
        let variacao = {};
        variacao.nome = this.produtoToPost.nome;

        if(this.variacao_corSelecionado != 0){
          variacao.cor_id = this.variacao_corSelecionado;
          const cor = this.cores.filter(cor => { return cor.cor_id === variacao.cor_id });
          variacao.cor = cor[0].cor;
          variacao.nome = `${variacao.nome} ${variacao.cor}`;
        }
        if(this.variacao_tamanhoSelecionado != 0){
          variacao.tamanho_id = this.variacao_tamanhoSelecionado;
          const tamanho = this.tamanhos.filter(tamanho => { return tamanho.tamanho_id === variacao.tamanho_id });
          variacao.tamanho = tamanho[0].tamanho;
          variacao.nome = `${variacao.nome} ${variacao.tamanho}`;
        }
        variacao.quantidade = this.variacao_quantidade;
        this.variacoes.push(variacao);

        this.variacao_tamanhoSelecionado = 0;
        this.variacao_corSelecionado = 0;
        this.variacao_quantidade = null;
      }
    },
    async removerVariacao(to_delete){
      console.log(to_delete);
      const response = await produtoService.removerVariacao(to_delete);
      if(response.data.success){
        let index = 0;
        let achei = null;
        this.variacoes.forEach((variacao) => {
          if(variacao.variacao_id == to_delete)
            achei = index;
          index++;
        })
        this.variacoes.splice(achei, 1);
      }
      else{
        this.$toast.error(response.data.message);
      }
    },
  },
  mounted(){
    this.getMarcas();
    this.getModelos();
    this.getCores();
    this.getTamanhos();
    this.getProduto();
    this.getCategorias();
  },
  watch: {
    produtoToPost: function(){
      if(this.produtoToPost.modelo_id) this.modeloSelecionado = this.produtoToPost.modelo_id;
      if(this.produtoToPost.marca_id) this.marcaSelecionado = this.produtoToPost.marca_id;
      if(this.produtoToPost.produto_pai) this.carregarUrlProdutoPai(this.produtoToPost.produto_pai);
      if(this.produtoToPost.categoria_id) this.categoriaSelecionado = this.produtoToPost.categoria_id;
      this.recuperarImagens();
      this.novasCategorias.push({
        id: null,
        nome: 'Nenhum'
      }),
      this.variacoes = this.produtoToPost.variacoes;
    },
    estoque_changed: function(){
      this.carregarMotivos();
    },
    variacoes: function(){
      this.variacoes.forEach((variacao) => {
        // console.log(variacao);
        variacao.nome = this.produtoToPost.nome;

        if(variacao.cor_id){
          //console.log(variacao.cor_id)
          const cor = this.cores.filter(cor => { return cor.cor_id === variacao.cor_id });
          variacao.cor = cor[0].cor;
          variacao.nome = `${variacao.nome} ${variacao.cor}`;
        }
        if(variacao.tamanho_id){
          //console.log(variacao.tamanho_id)
          // console.log(this.tamanhos);
          // console.log(variacao.tamanho_id);
          const tamanho = this.tamanhos.filter(tamanho => { return tamanho.tamanho_id === variacao.tamanho_id });
          variacao.tamanho = tamanho[0].tamanho;
          variacao.nome = `${variacao.nome} ${variacao.tamanho}`;
        }
      })
    },
    categoriaSelecionado: function(){
      this.produtoToPost.categoria_id = this.categoriaSelecionado;
    },
    modeloSelecionado: function(){
      this.produtoToPost.modelo_id = this.modeloSelecionado;
    },
    marcaSelecionado: function(){
      this.produtoToPost.marca_id = this.marcaSelecionado;
    }
  }
};
</script>

<style lang="css" scoped>
.imagem-place-holder {
  height: 80px;
  width: 80px;
  border: #343a40 2px dashed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-checkbox{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.color-option {
    display: flex;
    flex-wrap: wrap;
    
    position: relative;
}

.color-option label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: unset;
    padding: 5px 7px;
    border: solid 2px #dbdbdb;
    border-radius: 3px;
    margin-right: 10px;
}

.color-option label div {
    margin-right: 12px;
    height: 20px;
    width: 20px;
    border-radius: 5px;
}

.color-checkbox:hover{
  cursor: pointer;
}

input.color-checkbox[type="checkbox"]:checked + label {
  border-color: #626262;
}

.row+.row {
  margin-top: 24px;
}

</style>