
  //line -chart 1

  export var lineChartData: Array<any> = [

    { data: [33, 43, 43, 63, 53, 76, 63], label: 'Visits' },
    { data: [43, 59, 67, 91, 83, 106, 93], label: 'Sales' },
  
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
      fontColor: '#4e4e4e'
    },
    scales: {
      xAxes: [{
        ticks: {
          padding: 10,
        },
        display: true,
        gridLines: {
          borderDash: [8, 4],
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
      borderDash: [0],
      backgroundColor: "#fa782420",
      borderColor: "#fa7824",
      borderWidth: 5,
      pointBorderColor: "#fa7824",
      pointBackgroundColor: "#fa7824",
      pointBorderWidth: 3,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
    },
    {
  
      fill: true,
      borderDash: [0],
      backgroundColor: "#24d2fe20",
      borderColor: "#24d2fe",
      borderWidth: 5,
      pointBorderColor: "#24d2fe",
      pointBackgroundColor: "#24d2fe",
      pointBorderWidth: 3,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
    },
  
  ];
  export var lineChartLegend = false;
  export var lineChartType = 'line';
  


// bar -Chart 2
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
        padding: 10,
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
  export var barChartLabels: string[] =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  export var barChartType = 'bar';
  export var barChartLegend = false;
  
  export var barChartData: any[] = [
    { barPercentage: .4, data: [9, 7, 14, 10, 12, 8], label: 'Sales' },
  ];
  
  export var barChartColors: Array<any> = [
  
  
    {
  
      backgroundColor: '#f83e38',
      hoverBackgroundColor: 'rgba(255, 0, 0, 0.616)',
      borderColor: '#fff',
      pointBackgroundColor: 'rgba(255, 0, 0, 0.616)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 1,
    },
  
  ];
  
  
//area -chart 3
export var areaChartData: Array<any> = [

  { data: [12, 6, 10, 6, 11, 5, 8], label: 'Series A' },

];
export var areaChartLabels: Array<any> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"];
export var areaChartOptions: any = {
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
export var areaChartColors: Array<any> = [


  {

    backgroundColor: '#00e46e67',
    borderColor: '#00e46e',
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
export var areaChartLegend = false;
export var areaChartType = 'line';

  
  
  // Doughnut -Chart 4
  export var doughnutChartLabels: string[] = ['Google Chrome', 'Opera', 'Firefox'];
  export var doughnutChartData: number[] = [90, 40, 20];
  export var doughnutChartColors: any[] = [{ backgroundColor: ["#02ba5a", "#f5365c", "#03d0ea"] }];
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

 // pie -chart 5
  export const single = [
    {
      name: 'India',
      value: 50
    },
    {
      name: 'USA',
      value: 35
    },
    {
      name: 'Indo',
      value: 60
    },
    {
      name: 'UAE',
      value: 40
    },
    {
      name: 'Spain',
      value: 55
    },
    {
      name: 'Italy',
      value: 60
    }
  ];