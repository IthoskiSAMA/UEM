document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#reportsChart"), {
        series: [
            {
                name: 'Estudiantes',
                data: [1000, 2000, 3000, 4000, 4500, 4600, 4100, 4500, 4700, 4800, 4000, 3900, 3700],
            }
        ],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        markers: {
            size: 4
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.8,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'year',
            categories: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]
        },
    }).render();
});


document.addEventListener("DOMContentLoaded", () => {
    var budgetChart = echarts.init(document.querySelector("#budgetChart")).setOption({
        legend: {
            data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
            // shape: 'circle',
            indicator: [{
                name: 'Sales',
                max: 6500
            },
            {
                name: 'Administration',
                max: 16000
            },
            {
                name: 'Information Technology',
                max: 30000
            },
            {
                name: 'Customer Support',
                max: 38000
            },
            {
                name: 'Development',
                max: 52000
            },
            {
                name: 'Marketing',
                max: 25000
            }
            ]
        },
        series: [{
            name: 'Budget vs spending',
            type: 'radar',
            data: [{
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
            },
            {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
            }
            ]
        }]
    });
});


document.addEventListener("DOMContentLoaded", () => {
    echarts.init(document.querySelector("#trafficChart")).setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [{
                value: 1048,
                name: 'Search Engine'
            },
            {
                value: 735,
                name: 'Direct'
            },
            {
                value: 580,
                name: 'Email'
            },
            {
                value: 484,
                name: 'Union Ads'
            },
            {
                value: 300,
                name: 'Video Ads'
            }
            ]
        }]
    });
});