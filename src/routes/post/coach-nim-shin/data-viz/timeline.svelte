<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { timeline } from '../data/timeline.js';
	import { narratives } from '../data/narrative_timeline.js';
  
	let eras = [];
	let eraPaths = {};
	let prevYMap = {};
	let currentAnimatedIndex = -1;
	let tailText;
	let isAnimating = false;
  
	// Chart margins and default dimensions.
	const margin = { top: 60, right: 30, bottom: 30, left: 50 };
	let width = 800 - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;
  
	// Update width based on the #chart container.
	function updateDimensions() {
	  const container = document.getElementById('chart');
	  if (container) {
		const containerWidth = container.getBoundingClientRect().width;
		width = containerWidth - margin.left - margin.right;
	  }
	}
  
	// Add an index to each era for sequencing.
	function addEraIndices() {
	  eras = eras.map((eraObj, index) => ({ ...eraObj, index }));
	}
  
	function animateUpTo(targetIndex) {
	  if (currentAnimatedIndex >= targetIndex || isAnimating) return;
	  const nextIndex = currentAnimatedIndex + 1;
	  const eraObj = eras[nextIndex];
	  const path = eraPaths[eraObj.era];
	  const totalLength = path.node().getTotalLength();
  
	  const dashInterp = d3.interpolateNumber(totalLength, 0);
	  const startRank = eraObj.data[0].fifa_rank;
	  const endRank = eraObj.data[eraObj.data.length - 1].fifa_rank;
	  const rankInterp = d3.interpolateNumber(startRank, endRank);
  
	  // Ensure tail text is visible.
	  tailText.attr('opacity', 1);
  
	  isAnimating = true;
	  path
		.interrupt()
		.transition()
		.duration(2000)
		.ease(d3.easeLinear)
		.attrTween('stroke-dashoffset', function () {
		  return function (t) {
			const dashOffset = dashInterp(t);
			const point = path.node().getPointAtLength(totalLength - dashOffset);
			tailText
			  .attr('x', point.x)
			  .attr('y', point.y - 10)
			  .text(Math.round(rankInterp(t)));
			return dashOffset;
		  };
		})
		.on('end', () => {
		  currentAnimatedIndex = nextIndex;
		  isAnimating = false;
		  animateUpTo(targetIndex);
		});
	}
  
	function reverseAnimateDownTo(targetIndex) {
	  if (currentAnimatedIndex < targetIndex || isAnimating) return;
	  const eraObj = eras[currentAnimatedIndex];
	  const path = eraPaths[eraObj.era];
	  const totalLength = path.node().getTotalLength();
  
	  const dashInterp = d3.interpolateNumber(0, totalLength);
	  const startRank = eraObj.data[0].fifa_rank;
	  const endRank = eraObj.data[eraObj.data.length - 1].fifa_rank;
	  const rankInterp = d3.interpolateNumber(endRank, startRank);
  
	  isAnimating = true;
	  path
		.interrupt()
		.transition()
		.duration(1000)
		.ease(d3.easeLinear)
		.attrTween('stroke-dashoffset', function () {
		  return function (t) {
			const dashOffset = dashInterp(t);
			const point = path.node().getPointAtLength(totalLength - dashOffset);
			tailText
			  .attr('x', point.x)
			  .attr('y', point.y - 10)
			  .text(Math.round(rankInterp(t)));
			return dashOffset;
		  };
		})
		.on('end', () => {
		  currentAnimatedIndex--;
		  isAnimating = false;
		  reverseAnimateDownTo(targetIndex);
		});
	}
  
	// IntersectionObserver to trigger animations as narrative blocks scroll.
	function handleScroll(node, eraName) {
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			const currentY = entry.boundingClientRect.top;
			if (prevYMap[eraName] === undefined) {
			  prevYMap[eraName] = currentY;
			}
			const eraIndex = eras.findIndex((e) => e.era === eraName);
			if (entry.isIntersecting) {
			  animateUpTo(eraIndex);
			} else {
			  // When scrolling upward, trigger the reverse animation.
			  if (currentY > prevYMap[eraName]) {
				reverseAnimateDownTo(eraIndex);
			  }
			}
			prevYMap[eraName] = currentY;
		  });
		},
		{ threshold: 0.5 }
	  );
	  observer.observe(node);
	  return {
		destroy() {
		  observer.disconnect();
		}
	  };
	}
  
	// Draw (or redraw) the chart.
	function drawChart() {
	  // Remove any previous SVG.
	  d3.select('#chart').selectAll('svg').remove();
	  updateDimensions();
  
	  // Process timeline data.
	  timeline.forEach((d) => {
		d.period = new Date(d.period);
		d.fifa_rank = +d.fifa_rank;
	  });
  
	  // Group timeline data by era.
	  const grouped = d3.group(timeline, (d) => d.era);
	  eras = Array.from(grouped, ([era, data]) => ({
		era,
		data: data.sort((a, b) => a.period - b.period)
	  }));
  
	  // Sort eras by the earliest date.
	  eras.sort((a, b) => d3.min(a.data, (d) => d.period) - d3.min(b.data, (d) => d.period));
  
	  // Merge narrative text if available.
	  eras = eras.map((eraObj) => {
		const narrativeObj = narratives.find((n) => n.era === eraObj.era);
		return narrativeObj ? { ...eraObj, narrative: narrativeObj.text } : eraObj;
	  });
  
	  // Assign sequential indices.
	  addEraIndices();
  
	  // Create SVG with a viewBox so it scales responsively.
	  const svg = d3
		.select('#chart')
		.append('svg')
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr('preserveAspectRatio', 'xMidYMid meet')
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);
  
	  // Chart title.
	  svg
		.append('text')
		.attr('x', 0)
		.attr('y', -margin.top / 2)
		.attr('class', 'chart-title')
		.style('font-family', 'Roboto')
		.style('font-size', '1rem')
		.style('font-weight', '700')
		.style('fill', 'black')
		.text('FIFA Ranking Over Time');
  
	  // Create x-scale.
	  const xScale = d3
		.scaleTime()
		.domain(d3.extent(timeline, (d) => d.period))
		.range([0, width]);
  
	  // Create y-scale.
	  const yMinData = d3.min(timeline, (d) => d.fifa_rank);
	  const yMaxData = d3.max(timeline, (d) => d.fifa_rank);
	  const expandedMax = yMaxData + 12;
	  const expandedMin = yMinData - 12;
	  const roundedMax = Math.ceil(expandedMax / 5) * 5;
	  const roundedMin = Math.floor(expandedMin / 5) * 5;
	  const yScale = d3.scaleLinear().domain([roundedMax, roundedMin]).range([height, 0]);
	  const tickInterval = width < 600 ? d3.timeYear.every(2) : d3.timeYear.every(1);
  
	  // Draw grid lines.
	  const tickValues = [];
	  for (let t = roundedMax; t >= roundedMin; t -= 30) {
		tickValues.push(t);
	  }
	  const grid = svg
		.append('g')
		.attr('class', 'grid')
		.call(
		  d3
			.axisLeft(yScale)
			.tickValues(tickValues)
			.tickSize(-width)
			.tickFormat(() => '')
		);
	  grid.select('.domain').remove();
	  grid.selectAll('.tick line').attr('stroke', '#ccc').attr('stroke-width', '1');
  
	  // Append axes.
	  svg
		.append('g')
		.attr('transform', `translate(0,${height})`)
		.call(d3.axisBottom(xScale).ticks(tickInterval))
		.selectAll('text')
		.style('font-family', 'Roboto')
		.style('font-size', '0.74rem');
  
	  const yAxis = svg.append('g').call(d3.axisLeft(yScale).tickValues(tickValues).tickSize(0));
	  yAxis
		.selectAll('text')
		.attr('x', -5)
		.attr('dy', '-0.7em')
		.style('font-family', 'Roboto')
		.style('font-size', '0.74rem')
		.style('fill', '#666')
		.style('text-anchor', 'start');
	  yAxis.selectAll('.domain').remove();
  
	  // Define the line generator.
	  const line = d3
		.line()
		.x((d) => xScale(d.period))
		.y((d) => yScale(d.fifa_rank));
  
	  // Create a single text element for the tail count.
	  tailText = svg
		.append('text')
		.attr('class', 'rank-text')
		.attr('fill', '#666')
		.attr('font-size', '1rem')
		.attr('font-weight', '700')
		.attr('text-anchor', 'middle')
		.attr('opacity', 0);
  
	  // Draw one path per era (initially hidden via stroke-dashoffset).
	  eras.forEach((eraObj) => {
		const path = svg
		  .append('path')
		  .datum(eraObj.data)
		  .attr('fill', 'none')
		  .attr('stroke', '#f56d42')
		  .attr('stroke-width', 3)
		  .attr('data-era', eraObj.era)
		  .attr('d', line);
		const totalLength = path.node().getTotalLength();
		path.attr('stroke-dasharray', totalLength).attr('stroke-dashoffset', totalLength);
		eraPaths[eraObj.era] = path;
	  });
	}
  
	onMount(() => {
	  drawChart();
	});
  </script>
  
  <!-- Recalculate the chart on window resize -->
  <svelte:window on:resize={drawChart} />
  
  <div class="scrollytelling-container">
	<!-- Sticky chart container -->
	<div class="chart-container">
	  <div id="chart"></div>
	</div>
  
	<!-- Narrative blocks -->
	<div class="narrative-container">
	  {#each eras as eraObj}
		<div class="narrative-block" use:handleScroll={eraObj.era}>
		  <div
			class="narrative-content {eraObj.era === 'luis' || eraObj.era === 'simon' ? 'right-anchored' : ''} {eraObj.era === 'shin' ? 'left-anchored' : ''}"
		  >
			<p>
			  {#if eraObj.narrative}
				{eraObj.narrative}
			  {:else}
				This is the narrative for era {eraObj.era}. Scroll up to reverse the effect.
			  {/if}
			</p>
		  </div>
		</div>
  
		{#if eraObj.era === 'luis' && narratives.find(n => n.era === 'luis').extraNarrative}
		  <div class="narrative-block" style="justify-content: flex-end;">
			<div
			  class="narrative-content {eraObj.era === 'luis' || eraObj.era === 'simon' ? 'right-anchored' : ''} {eraObj.era === 'shin' ? 'left-anchored' : ''}"
			>
			  <p>{narratives.find(n => n.era === 'luis').extraNarrative}</p>
			</div>
		  </div>
		{/if}
	  {/each}
	</div>
  </div>
  
  <style>
	/* Basic resets */
	html,
	body {
	  margin: 0;
	  padding: 0;
	}
  
	/* Scrollytelling container */
	.scrollytelling-container {
	  position: relative;
	}
  
	/* Sticky chart container */
	.chart-container {
	  position: sticky;
	  top: 0;
	  height: 100vh;
	  z-index: 1;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: white;
	}
  
	/* Chart container: width is 100% with a max-width */
	#chart {
	  width: 100%;
	  max-width: 800px;
	  margin: 0 auto;
	}
  
	/* Let SVG scale with the container */
	#chart svg {
	  width: 100%;
	  height: auto;
	}
  
	/* Narrative container */
	.narrative-container {
	  position: relative;
	  z-index: 2;
	}
  
	/* Each narrative block fills most of the viewport */
	.narrative-block {
	  position: relative;
	  height: 120vh;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin: 0 auto;
	  width: 75%;
	  background: transparent;
	}
  
	/* Narrative text styling */
	.narrative-content {
	  position: relative;
	  display: inline-block;
	}
	.narrative-content p {
	  background: white;
	  text-align: center;
	  margin: 0;
	  padding: 20px;
	  font-family: 'Noto Serif';
	  font-size: 1.2rem;
	  line-height: 2.4rem;
	  color: #333;
	  opacity: 0.9;
	}
	.narrative-content.right-anchored p {
	  text-align: right;
	  margin: 0 0 0 auto;
	  padding: 20px;
	  width: 50%;
	}
	.narrative-content.left-anchored p {
	  text-align: start;
	  margin: 0;
	  padding: 20px;
	  width: 60%;
	}
  
	/* Chart title and tail text */
	:global(.chart-title) {
	  font-family: 'Roboto';
	  font-size: 1rem;
	  font-weight: 700;
	}
	:global(.rank-text) {
	  font-family: 'Roboto';
	  font-size: 1rem;
	  font-weight: 500;
	  text-anchor: start;
	}
  
	/* Responsive font sizes */
	@media (max-width: 600px) {
	  :global(.chart-title) {
		font-size: 0.8rem;
	  }
	  :global(.rank-text) {
		font-size: 0.8rem;
	  }
	  .narrative-content p {
		font-size: 0.8rem;
		line-height: 1.4rem;
	  }
	}
  </style>
  