<template>
  <v-btn @click="createPDF">
    Baixar relatório
  </v-btn>
</template>

<script>
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "BaixarRelatorioButton",
  props: [ 'headers', 'dados', 'tipoRelatorio' ],
  data() {
    return {
      tableData: [],
      checkedRows: [],
      columns: [ 'selected', 'sku', ],
      options: {  }
    }
  },
  computed: {
    nomeDoArquivo: function(){
      let data = new Date();
      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();
      return `relatorio-${this.tipoRelatorio}-${dia}-${mes}-${ano}`
    }
  },
  methods: {
    realizaTratamento(){
      let dados_copy = JSON.parse(JSON.stringify(
        this.dados
      ));

      dados_copy.forEach((d) => {
        if(d.total) d.total = d.total.toFixed(2)
        if(d.custo) d.custo = d.custo.toFixed(2)
        if(d.prazo_entrega == null) d.prazo_entrega = '-'
        if(d.data_venda){
          let data = new Date(d.data_venda);
          let dia = data.getDate();
          let mes = data.getMonth() + 1;
          let ano = data.getFullYear();
          d.data_venda = `${dia}/${mes}/${ano}`
        }
        if(d.preco) d.preco = d.preco.toFixed(2)
        if(d.total_unitario == null) d.total_unitario = 0
        if(d.total_valor == null) d.total_valor = (0).toFixed(2)
      })
      return dados_copy
    },
    createPDF() {
      let dados_to_go = this.realizaTratamento()

      var docDefinition = {
        content: [
          {
            table: {
              headerRows: 1,
              body: [],
              widths: [],
            }
          }
        ],
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
      };

      let headers_inicias = []
      this.headers.forEach((header) => {
        let header_object = { text: header.text , style: 'tableHeader' }
        headers_inicias.push(header_object)
      })

      docDefinition.content[0].table.body.push(headers_inicias)

      dados_to_go.forEach((dado) => {
        let row = []
        this.headers.forEach((header) => {
          let string = dado[`${header.value}`]
          row.push(`${string}`)
          // docDefinition.content[0].table.body.push(`${string}`)
        })
        // console.log("row", row)
        docDefinition.content[0].table.body.push(row)
      })

      headers_inicias.forEach((h) => {
        if(h.text == 'nome' || h.text == 'nome_completo' || h.text == 'cliente' )
          docDefinition.content[0].table.widths.push('*')
        else
          docDefinition.content[0].table.widths.push('auto')
      })

      // console.log(docDefinition.content[0].table.widths)
      pdfMake.createPdf(docDefinition).download(this.nomeDoArquivo);
    },
  },
}
</script>
