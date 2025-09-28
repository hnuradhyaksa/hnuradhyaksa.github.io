<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { data } from '../data/coal_plant_op.js';

	let allYears = d3.range(2014, 2060 + 1);
	let selectedScenario = 'typical';

	let svg, x, y, canvasGroup, width;
	let fillRectGroup, netBarGroup, cancelledBarGroup;

	const base = d3.sum(
		data.filter((d) => +d.year < 2014),
		(d) => +d.net_addition || 0
	);

	let firstUpdate = true;

	onMount(() => {
		const svgHeight = 420;
		const margin = { top: 30, right: 30, bottom: 30, left: 50 };
		const titleMarginBottom = 50;
		const canvasHeight = svgHeight - margin.top - margin.bottom - titleMarginBottom;
		width = 800 - margin.left - margin.right;
		const yaxisWidth = 60;
		const netchartWidth = width - yaxisWidth;

		svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', svgHeight)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const defs = svg.append('defs');
		defs
			.append('pattern')
			.attr('id', 'diagonal-stripes')
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('width', 4)
			.attr('height', 4)
			.append('path')
			.attr('d', 'M0,0 L4,4')
			.attr('stroke', 'darkgrey')
			.attr('stroke-width', 1);

		let typicalData = allYears.map((year) => {
			const record = data.find((d) => +d.year === year);
			return record
				? {
						year,
						value: +record.net_addition || 0,
						cancelled: +record.cancelled || 0
					}
				: { year, value: 0, cancelled: 0 };
		});
		let cumulative = base;
		typicalData.forEach((d) => {
			d.start = cumulative;
			cumulative += d.value;
			d.end = cumulative;
			d.netBarTop = d.value >= 0 ? d.end : d.start;
			d.cancelledStart = d.netBarTop;
			d.cancelledEnd = d.netBarTop + d.cancelled;
		});
		const allYValues = typicalData.flatMap((d) => [
			d.start,
			d.end,
			d.cancelledStart,
			d.cancelledEnd
		]);
		const minVal = d3.min(allYValues);
		const maxVal = d3.max(allYValues);
		const expandedMax = maxVal + 12;
		const expandedMin = minVal - 12;
		const roundedMax = Math.ceil(expandedMax / 5) * 5;
		const roundedMin = Math.floor(expandedMin / 5) * 5;

		y = d3.scaleLinear().domain([roundedMin, roundedMax]).range([canvasHeight, 0]);
		x = d3.scaleBand().domain(allYears).range([0, netchartWidth]).padding(0.05);

		canvasGroup = svg
			.append('g')
			.attr('class', 'chart-canvas-group')
			.attr('transform', `translate(${yaxisWidth}, ${titleMarginBottom})`);

		const xAxis = canvasGroup
			.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0, ${canvasHeight})`)
			.call(d3.axisBottom(x).tickValues([2014, 2024, 2040, 2060]).tickFormat(d3.format('d')));
		xAxis.select('.domain').remove();
		xAxis
			.selectAll('text')
			.style('font-family', 'Roboto')
			.style('font-size', '0.74rem')
			.style('fill', '#7f7f7f');

		const yAxis = canvasGroup.append('g').attr('class', 'y-axis').call(d3.axisLeft(y).ticks(4));
		yAxis
			.selectAll('text')
			.style('font-family', 'Roboto')
			.style('font-size', '0.74rem')
			.style('fill', '#7f7f7f')
			.style('text-anchor', 'end');
		yAxis.select('.domain').remove();

		fillRectGroup = canvasGroup.append('g').attr('class', 'fill-rect-group');
		netBarGroup = canvasGroup.append('g').attr('class', 'net-bar-group');
		cancelledBarGroup = canvasGroup.append('g').attr('class', 'cancelled-bar-group');

		const titleGroup = svg
			.append('g')
			.attr('class', 'title-group')
			.attr('transform', `translate(0, 0)`);
		titleGroup
			.append('text')
			.attr('class', 'chart-title')
			.attr('y', 0)
			.style('font-family', 'Roboto')
			.style('font-size', '1rem')
			.style('font-weight', '700')
			.style('fill', 'black');

		canvasGroup
			.append('foreignObject')
			.attr('x', -margin.left - 20)
			.attr('y', -20)
			.attr('width', margin.left + 20)
			.attr('height', 60)
			.append('xhtml:div').html(`
		  <style>
			.ylabel {
			  font-family: Roboto, sans-serif;
			  font-size: 0.74rem;
			  color: #7f7f7f;
			  text-align: right;
			}
		  </style>
		  <div class="ylabel">
			Plant capacity<br>(Megawatts)
		  </div>
		`);

		const annotations = [
			{
				class: 'annotate-major-left',
				label: 'Operating<br>Capacity',
				x: 50,
				y: 225,
				width: margin.left + 60,
				height: 50
			},
			{
				class: 'annotate-major-left',
				label: 'Projection',
				x: 205,
				y: 225,
				width: margin.left + 20,
				height: 50
			},
			{
				class: 'annotate-minor-right',
				label: 'Net capacity added',
				x: 12,
				y: 122,
				width: margin.left,
				height: 50
			},
			{
				class: 'annotate-minor-right',
				label: 'Capacity addition canceled',
				x: 45,
				y: -9,
				width: margin.left + 60,
				height: 50
			}
		];

		const annotationStyle = `
		<style>
		  .annotation {
			font-family: Roboto, sans-serif;
			font-size: 0.74rem;
			color: #7f7f7f;
			white-space: normal;
			word-wrap: break-word;
		  }
		  .annotate-major-left {
			text-align: left;
			font-weight: 600;
			color: #666;
		  }
		  .annotate-minor-left {
			text-align: left;
			font-weight: normal;
		  }
		  .annotate-minor-right {
			text-align: right;
			font-weight: normal;
		  }
		</style>
	  `;

		annotations.forEach((annotation) => {
			canvasGroup
				.append('foreignObject')
				.attr('x', annotation.x)
				.attr('y', annotation.y)
				.attr('width', annotation.width)
				.attr('height', annotation.height)
				.append('xhtml:div')
				.html(
					`${annotationStyle}<div class="annotation ${annotation.class}">${annotation.label}</div>`
				);
		});
		
		canvasGroup
			.append('text')
			.attr('id', 'net-reduced-label')
			.attr('x', 320)
			.attr('y', 0)
			.attr('text-anchor', 'start')
			.style('font-family', 'Roboto')
			.style('font-size', '0.74rem')
			.style('fill', '#7f7f7f')
			.text('Net capacity reduced');

		updateChart(selectedScenario);

		d3.select('.grid').lower();
	});

	function updateChart(scenario) {
		const completeData = allYears.map((year) => {
			const record = data.find((d) => +d.year === year);
			if (record) {
				if (scenario === 'goal') {
					return {
						year,
						value: year <= 2040 ? +record.prabowo_scenario || 0 : 0,
						cancelled: +record.cancelled || 0
					};
				} else {
					return {
						year,
						value: +record.net_addition || 0,
						cancelled: +record.cancelled || 0
					};
				}
			} else {
				return { year, value: 0, cancelled: 0 };
			}
		});

		let cumulative = base;
		completeData.forEach((d) => {
			d.start = cumulative;
			cumulative += d.value;
			d.end = cumulative;
			d.netBarTop = d.value >= 0 ? d.end : d.start;
			d.cancelledStart = d.netBarTop;
			d.cancelledEnd = d.netBarTop + d.cancelled;
		});

		const newTitle =
			scenario === 'goal'
				? 'Steep capacity cuts needed to meet 2040 phase-out target'
				: 'Under typical lifespans, coal capacity would only be fully retired by 2060';

		d3.select('.chart-title').text(newTitle);

		const baseline = y(0);

		const fillRects = fillRectGroup.selectAll('rect').data(completeData, (d) => d.year);
		fillRects
			.enter()
			.append('rect')
			.attr('class', 'fill-rect')
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => {
				const barBottom = d.value >= 0 ? y(d.start) : y(d.end);
				return Math.min(baseline, barBottom);
			})
			.attr('height', (d) => {
				const barBottom = d.value >= 0 ? y(d.start) : y(d.end);
				return Math.abs(baseline - barBottom);
			})
			.style('fill', (d) => (d.year <= 2024 ? '#e8e8e8' : '#f7f7f7'))
			.merge(fillRects)
			.transition()
			.duration(750)
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => {
				const barBottom = d.value >= 0 ? y(d.start) : y(d.end);
				return Math.min(baseline, barBottom);
			})
			.attr('height', (d) => {
				const barBottom = d.value >= 0 ? y(d.start) : y(d.end);
				return Math.abs(baseline - barBottom);
			})
			.style('fill', (d) => (d.year <= 2024 ? '#e8e8e8' : '#f7f7f7'));
		fillRects.exit().remove();

		const netBars = netBarGroup.selectAll('rect').data(completeData, (d) => d.year);
		netBars
			.enter()
			.append('rect')
			.attr('class', 'net-bar')
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(Math.max(d.start, d.end)))
			.attr('height', (d) => Math.abs(y(d.start) - y(d.end)))
			.style('fill', (d) => {
				if (d.value > 0 && d.year > 2024) return '#ccc';
				return d.value >= 0 ? '#4c5067' : '#d75638';
			})
			.merge(netBars)
			.transition()
			.duration(750)
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(Math.max(d.start, d.end)))
			.attr('height', (d) => Math.abs(y(d.start) - y(d.end)))
			.style('fill', (d) => (d.value >= 0 ? '#4c5067' : '#d75638'));
		netBars.exit().remove();

		const cancelledBars = cancelledBarGroup.selectAll('rect').data(
			completeData.filter((d) => d.cancelled !== 0),
			(d) => d.year
		);
		cancelledBars
			.enter()
			.append('rect')
			.attr('class', 'cancelled-bar')
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(Math.max(d.cancelledStart, d.cancelledEnd)))
			.attr('height', (d) => Math.abs(y(d.cancelledStart) - y(d.cancelledEnd)))
			.attr('fill', 'url(#diagonal-stripes)')
			.merge(cancelledBars)
			.transition()
			.duration(750)
			.attr('x', (d) => x(d.year))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(Math.max(d.cancelledStart, d.cancelledEnd)))
			.attr('height', (d) => Math.abs(y(d.cancelledStart) - y(d.cancelledEnd)));
		cancelledBars.exit().remove();

		const grid = canvasGroup.selectAll('.grid').data([null]);
		grid
			.enter()
			.append('g')
			.attr('class', 'grid')
			.merge(grid)
			.call(
				d3
					.axisLeft(y)
					.ticks(5)
					.tickSize(-width)
					.tickFormat(() => '')
			)
			.selectAll('.tick line')
			.attr('stroke', 'white')
			.attr('stroke-width', 1);
		canvasGroup.select('.grid').select('.domain').remove();

		const labelPositions = {
			typical: { x: 320, y: 50 },
			goal: { x: 320, y: 210 }
		};
		const newPos = labelPositions[scenario] || labelPositions['typical'];

		if (!firstUpdate) {
			d3.select('#net-reduced-label')
				.transition()
				.duration(750)
				.attr('x', newPos.x)
				.attr('y', newPos.y);
		} else {
			d3.select('#net-reduced-label').attr('x', newPos.x).attr('y', newPos.y);
		}
		firstUpdate = false;
	}

	$: if (selectedScenario && y) {
		updateChart(selectedScenario);
	}
</script>

<div id="chart-container">
	<div id="chart"></div>

	<div class="toggle-buttons">
		<button
			on:click={() => (selectedScenario = 'typical')}
			class:selected={selectedScenario === 'typical'}
		>
			Typical
		</button>
		<button
			on:click={() => (selectedScenario = 'goal')}
			class:selected={selectedScenario === 'goal'}
		>
			Target
		</button>
	</div>
</div>

<style>
	#chart-container {
		position: relative;
		width: 800px;
		margin: 0 auto;
	}

	#chart {
		width: 100%;
		height: 420px;
	}

	.toggle-buttons {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 10;
		display: flex;
		gap: 5px;
	}

	.toggle-buttons button {
		padding: 0.5rem 1rem;
		border: 1.5px solid #f1f1f0;
		border-radius: 6px;
		background: #eee;
		cursor: pointer;
		font-family: Roboto, sans-serif;
		font-weight: 500;
		color: #aaaab0;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.toggle-buttons button.selected {
		background: white;
		color: #1a1a1a;
		border-color: #ccc;
	}

	.chart-annotation {
		margin-top: 10px;
		margin-left: 50px;
		padding: 10px;
		font-family: Roboto, sans-serif;
		font-size: 0.74rem;
		color: #7f7f7f;
		text-align: left;
	}

	.chart-title {
		padding-right: 8rem;
	}

	.chart-annotation p {
		margin: 5px 0;
	}
</style>
