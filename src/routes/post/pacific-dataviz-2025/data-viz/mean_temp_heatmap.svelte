<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { data } from '../data/mean_temp_anomaly.js';
	import { selectedScenario, selectedConfidence, selectedCountry } from '../data/stores.js';
  
	let margin = { top: 20, right: 100, bottom: 120, left: 100 };
	let width = 800 - margin.left - margin.right;
	let height = 400 - margin.top - margin.bottom;
	let svg;
  
	let xScale, yScale, colorScale;
	let g, cellsG;
  
	// 1. Initialize scales
	function initScales() {
	  const years = Array.from(new Set(data.map(d => d.period_year))).sort((a, b) => a - b);
	  const seasons = Array.from(new Set(data.map(d => d.period_season))).sort((a, b) => a - b);
  
	  xScale = d3.scaleBand().domain(years).range([0, width]).padding(0);
	  yScale = d3.scaleBand().domain(seasons).range([0, height]).padding(0.025);
  
	  const anomalies = data.map(d => d.anomaly);
	  const [min, max] = d3.extent(anomalies);
	  colorScale = d3.scaleLinear().domain([min, 0, max]).range(['#006d77', '#ffffff', '#d62828']);
	}
  
	// Reactive filtered data
	$: filteredData = data.filter(
	  d =>
		d.name === $selectedCountry &&
		d.confidence === $selectedConfidence &&
		(d.scenario === 'historical' || d.scenario === $selectedScenario)
	);
  
	// 2. Draw static axes and legend once
	function drawAxesAndLegend() {
	  // X Axis
	  g.append('g')
		.attr('transform', `translate(0,${height})`)
		.call(
		  d3.axisBottom(xScale)
			.tickValues(xScale.domain().filter((d, i) => !(i % 25)))
		)
		.call(sel => sel.select('.domain').remove())
		.call(sel => sel.selectAll('text')
		  .style('fill', '#666')
		  .style('font-family', 'Inter')
		  .style('font-size', '0.8rem')
		);
  
	  // Y Axis
	  const seasonNames = { 1: 'Wet Season', 4: 'Early Dry', 7: 'Dry Season', 10: 'Early Wet' };
	  const seasonMonths = { 1: 'Jan–Mar', 4: 'Apr–Jun', 7: 'Jul–Sep', 10: 'Oct–Dec' };
  
	  g.append('g')
		.call(d3.axisLeft(yScale).tickSize(0))
		.call(sel => sel.select('.domain').remove())
		.call(sel => {
		  sel.selectAll('.tick text').each(function(d) {
			const t = d3.select(this).text('').attr('text-anchor', 'end');
			t.append('tspan')
			  .text(seasonNames[d])
			  .attr('x', -10)
			  .attr('dy', '0em')
			  .style('font-family', 'Inter')
			  .style('font-size', '0.86rem')
			  .style('fill', '#000');
			t.append('tspan')
			  .text(seasonMonths[d])
			  .attr('x', -10)
			  .attr('dy', '1.2em')
			  .style('font-family', 'Inter')
			  .style('font-size', '0.72rem')
			  .style('fill', '#999');
		  });
		  sel.selectAll('.tick line').remove();
		});
  
	  // Legend
	  const anomaliesAll = data.map(d => d.anomaly);
	  const [minAll, maxAll] = d3.extent(anomaliesAll);
	  const legendWidth = 300, legendHeight = 10;
  
	  // gradient
	  const defs = g.append('defs');
	  const grad = defs.append('linearGradient')
		.attr('id', 'legend-gradient')
		.attr('x1', '0%').attr('y1', '0%')
		.attr('x2', '100%').attr('y2', '0%');
  
	  [minAll, 0, maxAll].forEach(v => {
		grad.append('stop')
		  .attr('offset', `${((v - minAll)/(maxAll - minAll))*100}%`)
		  .attr('stop-color', colorScale(v));
	  });
  
	  const legend = g.append('g').attr('transform', `translate(0,${height + 40})`);
	  legend.append('rect')
		.attr('width', legendWidth)
		.attr('height', legendHeight)
		.style('fill', 'url(#legend-gradient)');
  
	  const legendScale = d3.scaleLinear().domain([minAll, maxAll]).range([0, legendWidth]);
	  const ticks = [minAll, 0, maxAll].filter((v,i,a) => a.indexOf(v) === i);
  
	  legend.append('g')
		.attr('transform', `translate(0,${legendHeight})`)
		.call(
		  d3.axisBottom(legendScale)
			.tickValues(ticks)
			.tickFormat(d => d === 0 ? '0°C' : d3.format('.1f')(d))
		)
		.call(g => g.select('.domain').remove())
		.call(g => g.selectAll('text')
		  .style('fill', '#666')
		  .style('font-family', 'Inter')
		  .style('font-size', '0.72rem')
		  .filter(d => d === 0)
		  .style('font-size', '0.86rem')
		);
	}
  
	function updateCells() {
  // key by year+season only, not scenario
  const join = cellsG.selectAll("rect.cell")
    .data(filteredData, d => `${d.period_year}-${d.period_season}`);

  // enter (only runs on first mount, since scenario-years never change)
  join.enter()
    .append("rect")
      .classed("cell", true)
      .attr("x", d => xScale(d.period_year))
      .attr("y", d => yScale(d.period_season))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.anomaly))
    .merge(join)                  // now both new+old cells
    .transition()                 // animate _every_ colour change
      .duration(1000)
      .attr("fill", d => colorScale(d.anomaly));

  join.exit().remove();
}
  
	onMount(() => {
	  initScales();
	  // setup SVG & group
	  g = d3.select(svg)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);
  
	  // draw static parts
	  drawAxesAndLegend();
  
	  // group for cells
	  cellsG = g.append('g').attr('class', 'cells');
  
	  // initial draw
	  updateCells();
	});
  
	// reactive update on filter change
	$: if (xScale && filteredData) {
	  updateCells();
	}
  </script>
  
  <div class="chart-wrapper">
	<svg bind:this={svg}></svg>
  </div>
  
  <style>
	.chart-wrapper {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 100%;
	}
	svg { display: block; margin: auto; }
  </style>