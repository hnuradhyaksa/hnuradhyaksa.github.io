<script>
	import { onMount } from 'svelte';
	import { select, hierarchy, pack } from 'd3';

	const total = 1500;
	const accessed = 200;
	const untapped = total - accessed;
	const dataTotal = { children: Array.from({ length: total }, () => ({})) };
	const dataAccessed = { children: Array.from({ length: accessed }, () => ({})) };
	const dataUntapped = { children: Array.from({ length: untapped }, () => ({})) };
	const R = 4;
	const colorTotal = '#8172ac';
	const colorAccessed = '#0D96F9';
	const colorUntapped = '#d9d9d9';
	const labelTotal = '1,500 Million';
	const labelAccessed = '200 Million';
	const labelUntapped = '1,300 Million';

	const breakpoint = 640;
	let viewportWidth;

	function renderPack(data, selector, fillColor, label) {
		const root = hierarchy(data).sum(() => 1);
		pack()
			.radius(() => R)
			.padding(1)(root);
		const size = root.r * 2;

		select(selector).attr('width', size).attr('height', size).selectAll('*').remove();
		const g = select(selector).append('g').attr('transform', `translate(${root.r},${root.r})`);

		g.selectAll('circle')
			.data(root.leaves())
			.join('circle')
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)
			.attr('r', (d) => d.r)
			.attr('fill', fillColor)
			.attr('stroke', '#fff');

		g.append('text')
			.text(label)
			.attr('dy', '0.35em')
			.attr('text-anchor', 'middle')
			.attr('stroke', 'white')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-width', 6)
			.attr('paint-order', 'stroke fill')
			.style('font-family', 'Inter, sans-serif')
			.style('font-size', '1.12rem')
			.style('font-weight', 550)
			.style('fill', 'black');
	}

	// NEW: Function to draw the annotation, which we can call anytime
	function drawAnnotation() {
		const rootUntapped = hierarchy(dataUntapped).sum(() => 1);
		pack()
			.radius(() => R)
			.padding(1)(rootUntapped);
		const leaves = rootUntapped.leaves();
		const gUntapped = select('#chart-untapped').select('g');

		gUntapped.selectAll('.annotation-element').remove();

		let highlight, angle1, angle2, textAnchor, segLen1, segLen2;

		if (viewportWidth < breakpoint) {
			highlight = (() => {
				const quad = leaves.filter((d) => d.x < 0 && d.y < 0);
				const cx = -rootUntapped.r / 2;
				const cy = -rootUntapped.r / 2;
				return quad.length
					? quad.reduce((best, cur) =>
							Math.hypot(cur.x - cx, cur.y - cy) < Math.hypot(best.x - cx, best.y - cy) ? cur : best
						)
					: leaves[0];
			})();

			angle1 = (315 * Math.PI) / 180;
			angle2 = angle1 - (45 * Math.PI) / 180;
			textAnchor = 'start';

			segLen1 = R * 6;
			segLen2 = R * 20;
		} else {
			highlight = (() => {
				const quad = leaves.filter((d) => d.x < 0 && d.y > 0);
				const cx = -rootUntapped.r / 2;
				const cy = rootUntapped.r / 2;
				return quad.length
					? quad.reduce((best, cur) =>
							Math.hypot(cur.x - cx, cur.y - cy) < Math.hypot(best.x - cx, best.y - cy) ? cur : best
						)
					: leaves[0];
			})();

			angle1 = (135 * Math.PI) / 180;
			angle2 = angle1 + (45 * Math.PI) / 180;
			textAnchor = 'end';

			segLen1 = R * 5;
			segLen2 = R * 15;
		}

		gUntapped
			.append('circle')
			.attr('class', 'annotation-element')
			.attr('cx', highlight.x)
			.attr('cy', highlight.y)
			.attr('r', highlight.r)
			.attr('fill', colorUntapped)
			.attr('stroke', '#333')
			.attr('stroke-width', 1);

		const x1 = highlight.x + Math.cos(angle1) * segLen1;
		const y1 = highlight.y + Math.sin(angle1) * segLen1;
		const x2 = x1 + Math.cos(angle2) * segLen2;
		const y2 = y1 + Math.sin(angle2) * segLen2;
		const startX = highlight.x + Math.cos(angle1) * highlight.r;
		const startY = highlight.y + Math.sin(angle1) * highlight.r;

		gUntapped
			.append('line')
			.attr('class', 'annotation-element')
			.attr('x1', startX)
			.attr('y1', startY)
			.attr('x2', x1)
			.attr('y2', y1)
			.attr('stroke', '#333')
			.attr('stroke-width', 1);
		gUntapped
			.append('line')
			.attr('class', 'annotation-element')
			.attr('x1', x1)
			.attr('y1', y1)
			.attr('x2', x2)
			.attr('y2', y2)
			.attr('stroke', '#333')
			.attr('stroke-width', 1);

		gUntapped
			.append('text')
			.attr('class', 'annotation-element')
			.attr('x', textAnchor === 'end' ? x2 - 4 : x2 + 4)
			.attr('y', textAnchor === 'end' ? y2 + 4 : y2 - 4)
			.text('One circle represents 1 Million US$')
			.style('font-family', 'Inter, sans-serif')
			.style('font-size', '0.75rem')
			.attr('fill', '#333')
			.attr('text-anchor', textAnchor);
	}

	onMount(() => {
		renderPack(dataTotal, '#chart-total', colorTotal, labelTotal);
		renderPack(dataAccessed, '#chart-accessed', colorAccessed, labelAccessed);
		renderPack(dataUntapped, '#chart-untapped', colorUntapped, labelUntapped);

		select('#chart-untapped').style('overflow', 'visible');
	});

	$: if (viewportWidth) {
		drawAnnotation();
	}
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<div class="grid-container">
	<div class="chart-container top">
		<div class="title">
			Finance need for climate adaptation, mitigation, and loss and damage (US$)
		</div>
		<svg id="chart-total"></svg>
	</div>

	<div class="chart-container">
		<div class="title">Fund accessed (US$)</div>
		<svg id="chart-accessed"></svg>
	</div>

	<div class="chart-container">
		<div class="title">Remaining need (US$)</div>
		<svg id="chart-untapped"></svg>
	</div>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3.6rem;
		max-width: 640px;
		margin: 0 auto;
	}
	.chart-container {
		text-align: center;
	}
	.chart-container svg {
		margin: 1.4rem auto;
	}
	.chart-container.top {
		grid-column: 1 / -1;
	}
	.chart-container .title {
		display: inline-block;
		margin: 0 auto 1.4rem;
		font-family: 'Inter';
		font-size: 0.86rem;
		font-weight: 400;
		max-width: 40%;
		white-space: normal;
		overflow-wrap: break-word;
		text-align: center;
	}
	svg {
		display: block;
		margin: 0 auto;
	}

	@media (max-width: 640px) {
		.grid-container {
			grid-template-columns: 1fr;
		}

		.chart-container.top {
			grid-column: auto;
		}

		.chart-container .title {
			max-width: 80%;
		}
	}
</style>
