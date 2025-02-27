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

	// Assign an index property to each era for sequencing.
	function addEraIndices() {
		eras = eras.map((eraObj, index) => ({ ...eraObj, index }));
	}

	function animateUpTo(targetIndex) {
		if (currentAnimatedIndex >= targetIndex || isAnimating) return;
		const nextIndex = currentAnimatedIndex + 1;
		const eraObj = eras[nextIndex];
		const path = eraPaths[eraObj.era];
		const totalLength = path.node().getTotalLength();

		// Create interpolators for the dash offset and rank.
		const dashInterp = d3.interpolateNumber(totalLength, 0);
		const startRank = eraObj.data[0].fifa_rank;
		const endRank = eraObj.data[eraObj.data.length - 1].fifa_rank;
		const rankInterp = d3.interpolateNumber(startRank, endRank);

		// Make sure the tail text is visible.
		tailText.attr('opacity', 1);

		isAnimating = true; // Mark that an animation is in progress.
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
				isAnimating = false; // Animation finished.
				// Chain to the next animation if needed.
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

		isAnimating = true; // Mark that reverse animation is in progress.
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
				isAnimating = false; // Reverse animation finished.
				reverseAnimateDownTo(targetIndex);
			});
	}

	// The IntersectionObserver detects when each narrative block enters or exits the viewport.
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
						// If scrolling upward (i.e. currentY is greater than previous Y),
						// trigger the reverse animation.
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

	onMount(() => {
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

		// Add an index for sequencing.
		addEraIndices();

		// --- Chart Setup ---
		const margin = { top: 60, right: 30, bottom: 30, left: 50 };
		const width = 800 - margin.left - margin.right;
		const height = 500 - margin.top - margin.bottom;

		const svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
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

		const [minDate, maxDate] = d3.extent(timeline, (d) => d.period);
		const oneDay = 24 * 60 * 60 * 1000;
		const newMinDate = new Date(minDate.getTime() - oneDay);
		const newMaxDate = new Date(maxDate.getTime() + oneDay);

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

		// Add grid lines.
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
			.call(d3.axisBottom(xScale))
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

		// Create a single text element for the counting number.
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
	});
</script>

<div class="scrollytelling-container">
	<!-- Sticky chart -->
	<div class="chart-container">
		<div id="chart"></div>
	</div>

	<!-- Narrative blocks -->
	<div class="narrative-container">
		{#each eras as eraObj}
			<!-- Main animated narrative block -->
			<div class="narrative-block" use:handleScroll={eraObj.era}>
				<div
					class="narrative-content {eraObj.era === 'luis' || eraObj.era === 'simon' ? 'right-anchored' : ''} {eraObj.era === 'shin' ? 'left-anchored' : ''}">
					<p>
						{#if eraObj.narrative}
							{eraObj.narrative}
						{:else}
							This is the narrative for era {eraObj.era}. Scroll up to reverse the effect.
						{/if}
					</p>
				</div>
			</div>

			<!-- Extra explanation block for Simon without animation -->
			{#if eraObj.era === 'luis' && narratives.find(n => n.era === 'luis').extraNarrative}
				<div class="narrative-block" style="justify-content: flex-end;">
					<div
						class="narrative-content {eraObj.era === 'luis' || eraObj.era === 'simon' ? 'right-anchored' : ''} {eraObj.era === 'shin' ? 'left-anchored' : ''}">
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

	/* Container for the scrollytelling experience */
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

	/* D3 chart dimensions */
	#chart {
		width: 800px;
		height: 500px;
	}

	/* Narrative container; each block is 100vh tall */
	.narrative-container {
		position: relative;
		z-index: 2;
	}

	/* Each narrative block fills the viewport */
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

	/* Wrap the narrative text */
	.narrative-content {
		position: relative;
		display: inline-block;
	}

	/* Default narrative text styling */
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

	/* For 'luis' and 'simon' eras: anchor text at end (right) with left padding at 40% */
	.narrative-content.right-anchored p {
		background: white;
		text-align: right;
		margin: 0 0 0 auto;
		padding: 20px;
		width: 50%;
		font-family: 'Noto Serif';
		font-size: 1.2rem;
		line-height: 2.4rem;
		color: #333;
		opacity: 0.9;
	}

	/* For 'shin' era: anchor text at start (left) with right padding at 40% */
	.narrative-content.left-anchored p {
		background: white;
		text-align: start;
		margin: 0;
		padding: 20px;
		width: 60%;
		font-family: 'Noto Serif';
		font-size: 1.2rem;
		line-height: 2.4rem;
		color: #333;
		opacity: 0.9;
	}

	:global(.rank-text) {
		font-family: 'Roboto';
		font-size: 1rem;
		font-weight: 500;
		text-anchor: start;
	}
</style>
