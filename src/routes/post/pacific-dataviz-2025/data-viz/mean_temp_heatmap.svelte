<script>
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';
	import { data } from '../data/mean_temp_anomaly.js';
	import { selectedScenario, selectedConfidence, selectedCountry } from '../data/stores.js';

	let chartContainer;
	let resizeObserver;
	let svg, g, cellsG, xAxisG, yAxisG, legendG, defs;

	let margin = { top: 20, right: 100, bottom: 120, left: 100 };

	let xScale, yScale, colorScale;

	$: filteredData = data.filter(
		(d) =>
			d.name === $selectedCountry &&
			d.confidence === $selectedConfidence &&
			(d.scenario === 'historical' || d.scenario === $selectedScenario)
	);

	function initChart() {
		svg = d3.select(chartContainer).append('svg');
		g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		defs = svg.append('defs');
		legendG = g.append('g').attr('class', 'legend');

		xAxisG = g.append('g').attr('class', 'x-axis');
		yAxisG = g.append('g').attr('class', 'y-axis');
		cellsG = g.append('g').attr('class', 'cells');

		updateChart('layout');
	}

	function updateChart(mode = 'layout') {
		if (!chartContainer) return;

		const vw = chartContainer.clientWidth;
		const breakpoint = 768;
		const isSmallScreen = vw < breakpoint;

		const width = Math.max(vw - margin.left - margin.right, 10);
		const height = isSmallScreen ? vw * 1 : vw * 0.3;

		svg
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);

		const years = Array.from(new Set(data.map((d) => d.period_year))).sort((a, b) => a - b);
		const seasons = Array.from(new Set(data.map((d) => d.period_season))).sort((a, b) => a - b);

		xScale = d3.scaleBand().padding(0.01);
		yScale = d3.scaleBand().padding(0.025);

		margin = isSmallScreen
			? { top: 12, right: 40, bottom: 80, left: 60 }
			: { top: 20, right: 100, bottom: 120, left: 100 };

		g.attr('transform', `translate(${margin.left},${margin.top})`);

		if (isSmallScreen) {
			xScale.domain(seasons).range([0, width]);
			yScale.domain(years).range([0, height]);
		} else {
			xScale.domain(years).range([0, width]);
			yScale.domain(seasons).range([0, height]);
		}

		const anomalies = data.map((d) => d.anomaly);
		const [min, max] = d3.extent(anomalies);
		colorScale = d3.scaleLinear().domain([min, 0, max]).range(['#006d77', '#ffffff', '#d62828']);

		drawAxesandLegend(height, isSmallScreen);
		updateCells(mode, isSmallScreen);
	}

	function drawAxesandLegend(height, isSmallScreen) {
		const seasonNames = { 1: 'Wet', 4: 'Early Dry', 7: 'Dry', 10: 'Early Wet' };
		const seasonMonths = { 1: 'Jan-Mar', 4: 'Apr-Jun', 7: 'Jul-Sep', 10: 'Oct-Dec' };

		xAxisG.selectAll('.tick text').style('fill', '#999');
		yAxisG.selectAll('.tick text').style('fill', '#999');

		if (isSmallScreen) {
			xAxisG
				.attr('transform', `translate(0,${height})`)
				.call(d3.axisBottom(xScale).tickSize(0))
				.call((sel) => sel.select('.domain').remove())
				.call((sel) => {
					sel.selectAll('.tick text').each(function (d) {
						const t = d3.select(this).text('').attr('text-anchor', 'middle');
						t.append('tspan').text(seasonNames[d]).attr('x', 0).attr('dy', '1.2em');
						t.append('tspan').text(seasonMonths[d]).attr('x', 0).attr('dy', '1.2em');
					});
				});

			yAxisG
				.call(d3.axisLeft(yScale).tickValues(yScale.domain().filter((d, i) => !(i % 20))))
				.call((sel) => sel.select('.domain').remove());
		} else {
			xAxisG
				.attr('transform', `translate(0,${height})`)
				.call(d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => !(i % 25))))
				.call((sel) => sel.select('.domain').remove());

			yAxisG
				.call(d3.axisLeft(yScale).tickSize(0))
				.call((sel) => sel.select('.domain').remove())
				.call((sel) => {
					sel.selectAll('.tick text').each(function (d) {
						const t = d3.select(this).text('').attr('text-anchor', 'end');
						t.append('tspan').text(seasonNames[d]).attr('x', -10).attr('dy', '0em');
						t.append('tspan').text(seasonMonths[d]).attr('x', -10).attr('dy', '1.2em');
					});
				});
		}

		const anomaliesAll = data.map((d) => d.anomaly);
		const [minAll, maxAll] = d3.extent(anomaliesAll);

		const innerWidth = Math.abs(xScale.range()[1] - xScale.range()[0]);

		const base = Math.round(innerWidth * 0.8);
		const legendWidth = isSmallScreen ? Math.max(120, Math.min(base, innerWidth)) : 300;
		const legendHeight = 10;

		let grad = defs.select('#legend-gradient');
		if (grad.empty()) {
			grad = defs
				.append('linearGradient')
				.attr('id', 'legend-gradient')
				.attr('x1', '0%')
				.attr('y1', '0%')
				.attr('x2', '100%')
				.attr('y2', '0%');
		}

		const stopsData = [minAll, 0, maxAll];
		grad
			.selectAll('stop')
			.data(stopsData)
			.join(
				(enter) => enter.append('stop'),
				(update) => update,
				(exit) => exit.remove()
			)
			.attr('offset', (v) => `${((v - minAll) / (maxAll - minAll)) * 100}%`)
			.attr('stop-color', (v) => colorScale(v));

		const offsetX = isSmallScreen ? (innerWidth - legendWidth) / 2 : 0;
		legendG.attr('transform', `translate(${offsetX},${height + 40})`);

		legendG
			.selectAll('rect.legend-gradient')
			.data([null])
			.join('rect')
			.attr('class', 'legend-gradient')
			.attr('width', legendWidth)
			.attr('height', legendHeight)
			.style('fill', 'url(#legend-gradient)');

		const legendScale = d3.scaleLinear().domain([minAll, maxAll]).range([0, legendWidth]);
		const ticks = [minAll, 0, maxAll].filter((v, i, a) => a.indexOf(v) === i);

		legendG
			.selectAll('g.legend-axis')
			.data([null])
			.join('g')
			.attr('class', 'legend-axis')
			.attr('transform', `translate(0,${legendHeight})`)
			.call(
				d3
					.axisBottom(legendScale)
					.tickValues(ticks)
					.tickFormat((d) => (d === 0 ? '0°C' : d3.format('+.1f')(d)))
			)
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.selectAll('text')
					.style('fill', '#666')
					.style('font-family', 'Inter')
					.style('font-size', '0.72rem')
					.filter((d) => d === 0)
					.style('font-size', '0.86rem')
			);
	}

	function initScales() {
		const years = Array.from(new Set(data.map((d) => d.period_year))).sort((a, b) => a - b);
		const seasons = Array.from(new Set(data.map((d) => d.period_season))).sort((a, b) => a - b);

		xScale = d3.scaleBand().domain(years).range([0, width]).padding(0);
		yScale = d3.scaleBand().domain(seasons).range([0, height]).padding(0.025);

		const anomalies = data.map((d) => d.anomaly);
		const [min, max] = d3.extent(anomalies);
		colorScale = d3.scaleLinear().domain([min, 0, max]).range(['#006d77', '#ffffff', '#d62828']);
	}

	function updateCells(mode, isSmallScreen) {
		if (!filteredData || !xScale) return;

		const key = (d) => `${d.period_year}-${d.period_season}`;

		const join = cellsG.selectAll('rect.cell').data(filteredData, key);

		if (mode === 'data') {
			join.exit().transition().duration(300).style('opacity', 0).remove();
		} else {
			join.exit().remove();
		}

		const enter = join
			.enter()
			.append('rect')
			.attr('class', 'cell')
			.attr('x', (d) => (isSmallScreen ? xScale(d.period_season) : xScale(d.period_year)))
			.attr('y', (d) => (isSmallScreen ? yScale(d.period_year) : yScale(d.period_season)))
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth())
			.attr('fill', mode === 'data' ? '#ccc' : (d) => colorScale(d.anomaly))
			.style('opacity', mode === 'data' ? 0 : 1);

		const cells = enter.merge(join);

		cells
			.attr('x', (d) => (isSmallScreen ? xScale(d.period_season) : xScale(d.period_year)))
			.attr('y', (d) => (isSmallScreen ? yScale(d.period_year) : yScale(d.period_season)))
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth());

		if (mode === 'data') {
			cells
				.transition()
				.duration(600)
				.style('opacity', 1)
				.attr('fill', (d) => colorScale(d.anomaly));
		} else {
			cells.attr('fill', (d) => colorScale(d.anomaly));
		}
	}

	onMount(() => {
		initChart();
		resizeObserver = new ResizeObserver(() => updateChart('layout'));
		resizeObserver.observe(chartContainer);
	});

	onDestroy(() => {
		if (resizeObserver) resizeObserver.disconnect();
	});

	$: if (chartContainer && filteredData) {
		updateChart('data');
	}
</script>

<div class="chart-wrapper" bind:this={chartContainer}></div>

<style>
	.chart-wrapper {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	svg {
		display: block;
		margin: auto;
	}
</style>
