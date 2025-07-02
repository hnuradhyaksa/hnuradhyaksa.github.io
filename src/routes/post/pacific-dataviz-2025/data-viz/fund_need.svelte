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

	onMount(() => {
		renderPack(dataTotal, '#chart-total', colorTotal, labelTotal);
		renderPack(dataAccessed, '#chart-accessed', colorAccessed, labelAccessed);
		renderPack(dataUntapped, '#chart-untapped', colorUntapped, labelUntapped);
	});
</script>

<div class="grid-container">
	<div class="chart-container top">
		<div class="title">Finance need for climate adaptation, mitigation, and loss and damage</div>
		<svg id="chart-total"></svg>
	</div>

	<div class="chart-container">
		<div class="title">Fund accessed</div>
		<svg id="chart-accessed"></svg>
	</div>

	<div class="chart-container">
		<div class="title">Remaining need</div>
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
		margin: 1.4rem auto 1.4rem;
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
</style>
