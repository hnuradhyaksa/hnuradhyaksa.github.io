<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import * as d3 from 'd3';
	import { milestone } from '../data/milestone.js'; // adjust path as needed

	let outerContainer;
	let innerContainer;

	// Dynamic dimensions – these will update based on the container's size.
	let svgWidth = 0;
	let fullSvgHeight;
	let leftWidth = 0; // computed as a fraction of svgWidth
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	// State for milestone highlighting & scroll
	let currentMilestoneIndex = 0;
	let wheelDelta = 0;
	const threshold = 20;

	// D3 selections & scales for the timeline
	let svg, leftGroup;
	let data = [];
	let yScale;

	// Use a mutable variable for tickLength so it can be updated.
	let tickLength = 40;

	// Right group for mobile helper arrows
	let rightGroup;

	// Sticky container state
	let isSticky = false;

	// Active datum for the narrative block.
	let activeDatum = {};

	let showNarrative = false;

	// Fade durations (in ms)
	let fadeInDuration = 100;
	let fadeOutDuration = 200;

	// Helper functions for date formatting.
	function getOrdinal(day) {
		if (day > 3 && day < 21) return 'th';
		switch (day % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}

	function formatDateWithOrdinal(date) {
		const day = date.getDate();
		const ordinal = getOrdinal(day);
		const month = d3.timeFormat('%B')(date);
		const year = date.getFullYear();
		return `${month} ${day}${ordinal}, ${year}`;
	}

	// Update dimensions based on outerContainer size.
	function updateDimensions() {
		if (outerContainer) {
			svgWidth = outerContainer.clientWidth;
			leftWidth = svgWidth / 9; // adjust if needed
			tickLength = svgWidth < 600 ? 20 : 40;

			if (svg) {
				svg.attr('width', svgWidth).attr('viewBox', `0 0 ${svgWidth} ${fullSvgHeight}`);
			}

			// Update the date labels.
			if (leftGroup) {
				if (svgWidth < 600) {
					leftGroup
						.selectAll('text.date')
						.attr('transform', (d) => {
							// Position the label to the right of the tick.
							const x = tickLength + 5;
							const y = yScale(d.date);
							return `translate(${x + tickLength + 5},${y}) rotate(90)`;
						})
						.attr('text-anchor', 'middle')
						.attr('dominant-baseline', 'middle')
						.attr('x', null)
						.attr('y', null);
				} else {
					leftGroup
						.selectAll('text.date')
						.attr('transform', null)
						.attr('x', tickLength + 5)
						.attr('y', (d) => yScale(d.date))
						.attr('text-anchor', 'start')
						.attr('dy', '0.35em');
				}
			}

			// Create or remove the mobile helper arrows.
			if (svgWidth < 600) {
				if (!rightGroup) {
					rightGroup = svg
						.append('g')
						.attr('class', 'right-group')
						// Position the group near the right edge and vertically centered.
						.attr('transform', `translate(${svgWidth - 50}, ${window.innerHeight / 2})`);
					createArrows();
					updateArrows();
				} else {
					rightGroup.attr('transform', `translate(${svgWidth - 50}, ${window.innerHeight / 2})`);
				}
			} else {
				if (rightGroup) {
					rightGroup.remove();
					rightGroup = null;
				}
			}
		}
	}

	// Create arrow buttons (using text symbols) inside rightGroup.
	function createArrows() {
		// Up arrow group.
		const up = rightGroup
			.append('g')
			.attr('class', 'up-arrow')
			.attr('cursor', 'pointer')
			.attr('transform', 'translate(0,-20)') // position above center
			.on('click', () => {
				if (currentMilestoneIndex > 0) changeMilestone(currentMilestoneIndex - 1);
			});
		up.append('text')
			.attr('x', 0)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.style('font-family', 'Inter, sans-serif')
			.style('fill', '#0084db')
			.style('opacity', '0.4')
			.style('font-size', '24px')
			.text('↑');

		// Down arrow group.
		const down = rightGroup
			.append('g')
			.attr('class', 'down-arrow')
			.attr('cursor', 'pointer')
			.attr('transform', 'translate(0,20)') // position below center
			.on('click', () => {
				if (currentMilestoneIndex < data.length - 1) changeMilestone(currentMilestoneIndex + 1);
			});
		down
			.append('text')
			.attr('x', 0)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.style('font-family', 'Inter, sans-serif')
			.style('fill', '#0084db')
			.style('opacity', '0.4')
			.style('font-size', '24px')
			.text('↓');
	}

	// Update arrow visibility based on current milestone.
	function updateArrows() {
		if (svgWidth < 600 && rightGroup) {
			if (currentMilestoneIndex === 0) {
				rightGroup.select('.up-arrow').style('display', 'none');
				rightGroup.select('.down-arrow').style('display', 'block');
			} else if (currentMilestoneIndex === data.length - 1) {
				rightGroup.select('.down-arrow').style('display', 'none');
				rightGroup.select('.up-arrow').style('display', 'block');
			} else {
				rightGroup.select('.up-arrow').style('display', 'block');
				rightGroup.select('.down-arrow').style('display', 'block');
			}
		}
	}

	onMount(() => {
		// Process data from milestone.js.
		data = milestone.map((d, i) => ({
			...d,
			id: i,
			date: d3.timeParse('%Y-%m-%d')(d.date)
		}));

		const minDate = d3.min(data, (d) => d.date);
		const maxDate = d3.max(data, (d) => d.date);
		const offsetMonths = 1;
		const startDate = d3.timeMonth.offset(minDate, -offsetMonths);
		const endDate = d3.timeMonth.offset(maxDate, offsetMonths);

		const numberOfDays = d3.timeDay.count(startDate, endDate) + 1;
		const daySpacing = 20;
		fullSvgHeight = daySpacing * numberOfDays + margin.top + margin.bottom;

		// Create the SVG element.
		svg = d3
			.select('#timeline')
			.attr('width', svgWidth)
			.attr('height', fullSvgHeight)
			.attr('viewBox', `0 0 ${svgWidth} ${fullSvgHeight}`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		// Create yScale.
		yScale = d3
			.scaleTime()
			.domain([startDate, endDate])
			.range([margin.top, fullSvgHeight - margin.bottom]);

		// Create the left-side group.
		leftGroup = svg
			.append('g')
			.attr('class', 'left-group')
			.attr('transform', 'translate(0,0)')
			.style('opacity', 0);

		// Supporting ticks.
		const supportingTickLength = tickLength * 0.6;
		leftGroup
			.append('g')
			.attr('class', 'supporting-ticks')
			.attr('transform', 'translate(0,0)')
			.call(
				d3
					.axisRight(yScale)
					.ticks(d3.timeDay.every(1))
					.tickSizeInner(supportingTickLength)
					.tickSizeOuter(0)
					.tickFormat(() => '')
			)
			.call((g) => g.select('.domain').remove())
			.selectAll('line')
			.attr('stroke', '#ccc');

		// Main milestone tick lines.
		leftGroup
			.selectAll('line.tick')
			.data(data)
			.enter()
			.append('line')
			.attr('class', 'tick')
			.attr('x1', 0)
			.attr('x2', tickLength)
			.attr('y1', (d) => yScale(d.date))
			.attr('y2', (d) => yScale(d.date))
			.attr('stroke', '#000');

		// Date labels.
		leftGroup
			.selectAll('text.date')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'date')
			.text((d) => formatDateWithOrdinal(d.date))
			.style('font-family', 'Roboto')
			.style('font-size', '0.82rem');

		// Now that the SVG and groups exist, update dimensions.
		updateDimensions();
		updateHighlight();
	});

	// Update left timeline and active datum.
	function updateHighlight() {
		activeDatum = data[currentMilestoneIndex];
		const activeY = yScale(activeDatum.date);
		const viewportCenter = window.innerHeight / 2;
		const leftTranslateY = viewportCenter - activeY;

		// Center the active date on the left timeline.
		leftGroup.transition().duration(500).attr('transform', `translate(0, ${leftTranslateY})`);

		// Fade date texts so that only the active one is fully opaque.
		leftGroup
			.selectAll('text.date')
			.transition()
			.duration(500)
			.style('opacity', (d, i) => (i === currentMilestoneIndex ? 1 : 0));

		// Update mobile helper arrows.
		updateArrows();
	}

	// Change milestone with sequential fade out/in.
	function changeMilestone(newIndex) {
		showNarrative = false;
		setTimeout(() => {
			currentMilestoneIndex = newIndex;
			updateHighlight();
			showNarrative = true;
		}, fadeOutDuration);
	}

	// Handle wheel events.
	function handleWheel(event) {
		if (!isSticky) return;
		event.preventDefault();
		wheelDelta += event.deltaY;
		if (wheelDelta > threshold) {
			if (currentMilestoneIndex < data.length - 1) {
				changeMilestone(currentMilestoneIndex + 1);
			}
			wheelDelta = 0;
		} else if (wheelDelta < -threshold) {
			if (currentMilestoneIndex > 0) {
				changeMilestone(currentMilestoneIndex - 1);
			}
			wheelDelta = 0;
		}
	}

	// Handle scroll events.
	function handleScroll() {
		const rect = outerContainer.getBoundingClientRect();
		const fadeStart = window.innerHeight * 0.8;
		const fadeEnd = window.innerHeight;
		let newOpacity = 1;
		if (rect.bottom < fadeEnd) {
			newOpacity = (rect.bottom - fadeStart) / (fadeEnd - fadeStart);
			newOpacity = Math.max(0, Math.min(1, newOpacity));
		}
		d3.select(innerContainer).transition().duration(300).style('opacity', newOpacity);

		let wasSticky = isSticky;
		if (rect.top > 0) {
			innerContainer.style.position = 'absolute';
			innerContainer.style.top = '0';
			innerContainer.style.left = '';
			innerContainer.style.transform = '';
			isSticky = false;
		} else if (rect.bottom < window.innerHeight) {
			innerContainer.style.position = 'absolute';
			innerContainer.style.top = outerContainer.offsetHeight - window.innerHeight + 'px';
			innerContainer.style.left = '';
			innerContainer.style.transform = '';
			isSticky = false;
		} else {
			innerContainer.style.position = 'fixed';
			innerContainer.style.top = '0';
			innerContainer.style.left = '50%';
			innerContainer.style.transform = 'translateX(-50%)';
			isSticky = true;
		}

		if (!wasSticky && isSticky) {
			showNarrative = true;
			leftGroup.transition().duration(fadeInDuration).style('opacity', 1);
			// Fade in the helper arrows
			if (rightGroup) {
				rightGroup.transition().duration(fadeInDuration).style('opacity', 1);
			}
		}
		if (wasSticky && !isSticky) {
			showNarrative = false;
			leftGroup.transition().duration(fadeOutDuration).style('opacity', 0);
			// Fade out the helper arrows
			if (rightGroup) {
				rightGroup.transition().duration(fadeOutDuration).style('opacity', 0);
			}
		}
	}

	// Listen for window resize events.
	function handleResize() {
		updateDimensions();
	}
</script>

<svelte:window on:resize={handleResize} on:scroll={handleScroll} on:wheel={handleWheel} />

<div bind:this={outerContainer} class="outer-container">
	<div bind:this={innerContainer} class:sticky={isSticky} class="inner-container">
		<svg id="timeline"></svg>
		{#if isSticky && showNarrative}
			<div
				class="narrative-block"
				in:fade={{ duration: fadeInDuration }}
				out:fade={{ duration: fadeOutDuration }}
			>
				<!-- Milestone Title -->
				<div class="versus milestone">{activeDatum.milestone}</div>
				<!-- Versus Text -->
				<div class="versus vs">
					<span class="small-text" style="font-size: 1rem;">vs. </span>
					<span class="big-text">{activeDatum.versus}</span>
				</div>
				<!-- Score -->
				<div class="score">
					<span class="small-text">{activeDatum.score_for}</span>
					<span class="small-text"> - </span>
					<span class="small-text">{activeDatum.score_against}</span>
				</div>
				<!-- Annotation -->
				<div class="annotation">{activeDatum.annot}</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.outer-container {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		position: relative;
		height: 1600px;
		overflow: hidden;
	}

	.inner-container {
		width: 100%;
		max-width: 1000px;
		background: white;
		z-index: 10;
		overflow: hidden;
	}
	.inner-container.sticky {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: white;
		z-index: 10;
	}

	/* Narrative block styling */
	.narrative-block {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		pointer-events: none;
	}

	.versus.milestone {
		text-transform: uppercase;
		letter-spacing: 4px;
		font-family: Roboto, sans-serif;
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.48rem;
		margin-bottom: 1rem;
	}

	.versus.vs {
		font-family: Vollkorn, serif;
		font-style: italic;
		font-size: 1.4rem;
		font-weight: 400;
	}

	.score {
		font-family: Vollkorn, serif;
		font-style: italic;
		font-size: 1rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	.annotation {
		font-family: 'Noto Serif';
		font-size: 0.8rem;
		color: #333;
		font-weight: 400;
		line-height: 1.4rem;
		margin-bottom: 1rem;
	}

	/* D3-generated left-group text styles */
	text.date {
		font-family: Roboto, sans-serif;
		font-size: 0.82rem;
		fill: #333;
	}
</style>
