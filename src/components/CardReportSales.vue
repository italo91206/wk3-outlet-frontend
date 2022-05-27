<template>
  <v-card
    class="mx-auto text-center"
    max-height="400"
  >
    <canvas
      :id="reportName"
      width="400"
      height="200"
    ></canvas>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
        to="/relatorios/vendas"
      >
        Ver mais
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Chart, registerables  } from 'chart.js'

  export default {
    name: 'CardReportSales',
    props: ['report-name'],
    data() {
      return {
        value: [
          423,
          446,
          675,
          510,
          590,
          610,
          760,
        ],
        chart: {}
      }
    },
    mounted(){
      const data = {
        labels: ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 30, 15, 50, 80, 120, 20],
            borderColor: '',
            backgroundColor: '',
          },
        ]
      }

      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };

      Chart.register(...registerables);
      const context = document.getElementById(this.reportName).getContext('2d')
      this.chart = new Chart(context, config)
    }
  }
</script>
