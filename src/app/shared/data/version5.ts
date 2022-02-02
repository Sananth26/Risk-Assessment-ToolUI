

//Widget chart 1
export var w_lineChartData1: Array<any> = [

    { data: [12, 6, 10, 6, 11, 5, 8], label: 'Serviced' },
   // { data: [270, 230, 190, 105, 160, 170, 75], label: 'Series B' }
  
  ];
  export var w_lineChartLabels1: Array<any> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"];
  export var w_lineChartOptions1: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    tooltips: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
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
  export var w_lineChartColors1: Array<any> = [
  
  
    {
  
      backgroundColor: '#1155e410',
      borderColor: '#1155e4',
      pointBackgroundColor: '#FFF',
      pointBorderColor: '#00e46e',
      pointHoverBackgroundColor: '#00e46e',
      pointRadius: '0',
      pointHoverBorderColor: '#FFF',
      pointHoverRadius: '0',
      pointBorderWidth: '0'
    },
    {
  
      backgroundColor: 'rgba(0, 157, 160, 0.1)',
      borderColor: 'rgba(0, 251, 255, 0.493)',
      pointBackgroundColor: '#FFF',
      pointBorderColor: 'rgba(0, 157, 160,1)',
      pointHoverBackgroundColor: 'rgba(0, 157, 160,1)',
      pointRadius: '1',
      pointHoverBorderColor: '#FFF',
      pointHoverRadius: '5',
      pointBorderWidth: '2'
    },
  
  ];
  export var w_lineChartLegend1 = false;
  export var w_lineChartType1 = 'line';
  
  
  
  
  //Widget chart 2
  export var w_lineChartData2: Array<any> = [
  
    { data: [12, 6, 10, 6, 11, 5, 8], label: 'Earnings' },
   // { data: [270, 230, 190, 105, 160, 170, 75], label: 'Series B' }
  
  ];
  export var w_lineChartLabels2: Array<any> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"];
  export var w_lineChartOptions2: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    tooltips: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
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
  export var w_lineChartColors2: Array<any> = [
  
  
    {
  
      backgroundColor: '#80008010',
      borderColor: '#800080d3',
      pointBackgroundColor: '#FFF',
      pointBorderColor: '#00e46e',
      pointHoverBackgroundColor: '#00e46e',
      pointRadius: '0',
      pointHoverBorderColor: '#FFF',
      pointHoverRadius: '0',
      pointBorderWidth: '0'
    },
    {
  
      backgroundColor: 'rgba(0, 157, 160, 0.1)',
      borderColor: 'rgba(0, 251, 255, 0.493)',
      pointBackgroundColor: '#FFF',
      pointBorderColor: 'rgba(0, 157, 160,1)',
      pointHoverBackgroundColor: 'rgba(0, 157, 160,1)',
      pointRadius: '1',
      pointHoverBorderColor: '#FFF',
      pointHoverRadius: '5',
      pointBorderWidth: '2'
    },
  
  ];
  export var w_lineChartLegend2 = false;
  export var w_lineChartType2 = 'line';
  
  
  
  
  // barChart
  export var barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
        display: false,
        labels: {
          boxWidth:8
        }
    },
    tooltips: {
      displayColors:false
    },
    scales: {
      xAxes: [{
        
      ticks: {
        beginAtZero:true,
        fontColor: '#4e4e4e',
        padding: 0,
      },
      gridLines: {
        display: true ,
        borderDash: [8, 4],
        color: "rgba(66, 59, 116, 0.15)"
      },
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: '#4e4e4e',
          padding: 10,
        },
        display: true,
        gridLines: {
          display: false ,
          color: "rgba(66, 59, 116, 0.15)",
          borderDash: [8, 4],
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Value'
        }
      }]
    }
  
  };
  export var barChartLabels: string[] =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Nov", "Dec"];
  export var barChartType = 'bar';
  export var barChartLegend = false;
  
  export var barChartData: any[] = [
    { barPercentage: .4, data: [20, 17, 32, 40, 46, 31, 23, 31, 40, 46, 55], label: 'Earnings' },
    { barPercentage: .4, data: [16, 10, 20, 24, 28, 22, 12, 17, 23, 31, 38], label: 'Visits' }
  ];
  
  export var barChartColors: Array<any> = [
  
  
    {
  
      backgroundColor: '#80008090',
      //hoverBackgroundColor: 'rgba(255, 0, 0, 0.616)',
      borderColor: '#fff',
      pointBackgroundColor: 'rgba(255, 0, 0, 0.616)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 1,
    },
    {
  
      backgroundColor: '#80008030',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  
  ];
  
  
  
  
    
    // Doughnut
    export var doughnutChartLabels: string[] = ['Assisted', 'InProgress', 'OnHold', 'Completed'];
    export var doughnutChartData: number[] = [34, 41, 23, 57];
    export var doughnutChartColors: any[] = [{ backgroundColor: ["#14abef80", "#fba54099", "#80008080", "#02ba5a80"] }];
    export var doughnutChartType = 'doughnut';
    export var doughnutChartOptions: any = {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      legend: {
        position: 'bottom',
              display: false,
        labels: {
                boxWidth:8
              }
      }
    };
  
  
    
  
    //line chart
  
  export var lineChartData: Array<any> = [
  
    { data: [70, 41, 24, 41, 55, 60, 68], label: 'Fulfilled' },
    { data: [43, 63, 13, 59, 36, 53, 60], label: 'Service Quality' },
    { data: [10, 16, 60, 30, 23, 18, 27], label: 'OnHold' },
  
  ];
  export var lineChartLabels: Array<any> = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun'];
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
      fontColor: '#4e4e4e'
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero:true,
          fontColor: '#4e4e4e',
          padding: 10,
        },
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Months'
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
      borderDash: [0],
      borderColor: "#02ba5a",
      backgroundColor: '#02ba5a10',
      pointBorderColor: "#02ba5a",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 3,
      pointHoverBorderWidth: 1,
      pointRadius: 2,
    },
    {
  
      fill: true,
      borderDash: [0],
      borderColor: "#fba540",
      backgroundColor: '#fba54010',
      pointBorderColor: "#fba540",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 3,
      pointHoverBorderWidth: 2,
      pointRadius: 2,
    },
    {
  
      fill: true,
      borderDash: [0],
      borderColor: "#ff2a2a",
      backgroundColor: '#ff2a2a10',
      pointBorderColor: "#ff2a2a",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 3,
      pointHoverBorderWidth: 2,
      pointRadius: 2,
    },
  
  ];
  export var lineChartLegend = false;
  export var lineChartType = 'line';
  
  