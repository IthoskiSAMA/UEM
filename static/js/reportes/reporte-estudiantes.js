document.addEventListener("DOMContentLoaded", () => {
	echarts.init(document.querySelector("#pieChart")).setOption(
	{
		title: {
			subtext: '2022 - 2023',
			left: 'center'
		},
			tooltip: {
			trigger: 'item'
		},
			legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [{
			name: '2022 - 2023',
			type: 'pie',
			radius: '60%',
			data: [
				{
					value: 1048,
					name: 'Graduados'
				},
				{
					value: 735,
					name: 'Retirados'
				},
				{
					value: 580,
					name: 'Reprobados'
				}
			],
			emphasis: {
				itemStyle: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	});
});

document.addEventListener("DOMContentLoaded", () => {
	echarts.init(document.querySelector("#verticalBarChart")).setOption({
		title: {
			subtext: '2022 - 2023',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01]
		},
		yAxis: {
			type: 'category',
			data: ['Octavo', 'Noveno', 'Décimo', '1ro Bachillerato', '2do Bachillerato', '3ro Bachillerato']
		},
		series: [{
			//name: '2022 - 2023',
			type: 'bar',
			data: [2005, 1990, 1870, 1600, 1500, 1520]
		}
		]
	});
});