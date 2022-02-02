
//chart 1
export var Chart1Data: Array<any> = [

  { data: [8, 14, 10, 27, 23, 29, 21], label: 'Total Orders' },

];
export var Chart1Labels: Array<any> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
export var Chart1Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        display: false,
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var Chart1Colors: Array<any> = [


  {

    backgroundColor: '#4479e920',
    borderColor: '#4375e8',
    pointBackgroundColor: '#FFF',
    pointBorderColor: '#00e46e',
    pointHoverBackgroundColor: '#00e46e',
    pointRadius: '0',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '0',
    pointBorderWidth: '0',
    borderWidth: 2
  },

];
export var Chart1Legend = false;
export var Chart1Type = 'line';




  
  // Doughnut -Chart 2
  export var doughnutChartLabels: string[] = ['Google ads', 'Facebook'];
  export var doughnutChartData: number[] = [40, 30];
  export var doughnutChartColors: any[] = [{ backgroundColor: ["#26d048", "#3b5998"] }];
  export var doughnutChartType = 'doughnut';
  export var doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 75,
    legend: {
      position: 'right',
            display: false,
      labels: {
              boxWidth:8
            }
    }
  };


  //line -chart 3

  export var lineChartData: Array<any> = [

    { data: [13, 20, 14, 15, 7, 4, 8], label: 'Google' },
    { data: [3, 30, 16, 6, 35, 14, 11], label: 'Facebook' }
  
  ];
  export var lineChartLabels: Array<any> = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  export var lineChartOptions: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
      mode: 'label'
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      fontColor: '#4e4e4e',
      labels: {
        boxWidth:30
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          padding: 10,
        },
        display: true,
        gridLines: {
          borderDash: [8, 4],
          display: true,
          color: "rgba(66, 59, 116, 0.15)",
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Days'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: '#4e4e4e',
          padding: 10,
        },
        display: true,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Value'
        }
      }]
    },
  };
  export var lineChartColors: Array<any> = [
  
    {
  
      fill: true,
      backgroundColor: '#26d04845',
      borderColor: '#26d048',
      pointRadius :"0",
      borderWidth: 3
    },
    {
  
      fill: true,
      backgroundColor: '#3b599845',
      borderColor: '#3b5998',
      pointRadius :"0",
      borderWidth: 3
    },
  ];
  export var lineChartLegend = true;
  export var lineChartType = 'line';
  

  