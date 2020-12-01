<script>

import { Line } from 'vue-chartjs'
import chartData from "../chart-data.js"

export default {
  data() {
    return {
      chartData,
      newData: 100,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart(chartData.sampleChartData.data, this.chartData.sampleChartData.options)
      }
    }
  },
  methods: {
    pushData(data) {
      data = this.chartData.sampleChartData.data.datasets[0].data

      data.push(this.newData)
      let increasePercentage = Math.random()
      let increasedAmount = this.newData * (increasePercentage * (Math.random() * 3)) / 100
      this.newData += increasedAmount
      
      if(data.length > 7) {
        console.log("Removing")
            data.shift()
      }


      console.log("Ran")
      
      console.log(this.chartData.sampleChartData.data.datasets[0].data)
    }
  },
  extends: Line,
  
  mounted() {
    this.renderChart(this.chartData.sampleChartData.data, this.chartData.sampleChartData.options)
  },

  created() {
      setInterval(this.pushData, 5000)
  }
}

</script>


