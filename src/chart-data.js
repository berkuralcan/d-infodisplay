export const chartData = {
    sampleChartData: {
        type: 'line',
        data: {
          labels: ["Data", "Data2", "Data3", "Data4", "Data5", "Data6", "Data7"],
          datasets: [
            { // one line graph
              label: "Dansuk Mühendislik - Proje Hacmi",
              data: [],
    
                // [11, 22, 33, 37, 42, 55, 70],
                //borderColor to define the graph line.
                //pointBackgroundColor to define the inner bgcolor
                //pointBorderColor to add a separate colored line to the points
                //backgroundColor to define the space
    
              backgroundColor: [
                'rgba(71, 183,132,.5)'
              ],
              borderColor: '#03ffa7cb',
              pointBackgroundColor: '#00b564',
              pointBorderColor: '#47b784',
              fill: false,
              borderWidth: 4,
            },
    
          ]
        },
        options: {
          legend: false, // Pass the object for more options.
          maintainAspectRatio: false,
          responsive: true,
          lineTension: 1,
          title: {
              display: true,
          },
          animation: {
              duration: 500,
              easing: "linear",
              
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                suggestedMin: 70,
                suggestedMax: 130,
                display: true,
                align: "end",
                padding: 2
              },  
            }],
    
            xAxes: [{
               display: false, 
               suggestedMin:10,
               suggestedMax: 200,
            }],
    
          }
        }
      }

}



  
  export default chartData;