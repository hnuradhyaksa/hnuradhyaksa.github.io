<script>
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';
	import { data } from '../data/sea_level_rise.js';
	import { selectedScenario, selectedConfidence, selectedCountry } from '../data/stores.js';

	const breakpoint = 720;

	let wrapper;
	let svg;
	let resizeObserver;

	function getLayout() {
		const vw = wrapper?.clientWidth ?? 800;
		const isSmall = vw < breakpoint;

		const margin = isSmall
			? { top: 28, right: 40, bottom: 64, left: 50 }
			: { top: 40, right: 60, bottom: 80, left: 60 };

		const fullWidth = vw;
		const fullHeight = isSmall ? Math.max(260, Math.round(vw * 0.5)) : 400;

		const innerWidth = Math.max(120, fullWidth - margin.left - margin.right);
		const innerHeight = Math.max(160, fullHeight - margin.top - margin.bottom);

		const axisFontSize = isSmall ? '0.72rem' : '0.86rem';

		return { isSmall, margin, fullWidth, fullHeight, innerWidth, innerHeight, axisFontSize };
	}

	const years = [2020, 2050, 2100];
	const formatCm = d3.format('.2f');
	const strokeRect = 2;

	$: filtered = data
		.filter(
			(d) =>
				d.scenario === $selectedScenario &&
				d.confidence === $selectedConfidence &&
				d.name === $selectedCountry &&
				years.includes(+d.period_year)
		)
		.map((d) => ({
			year: +d.period_year,
			value: +d.value * 100,
			name: d.name
		}));

	$: {
		if (svg) {
			if (filtered?.length) {
				draw();
			} else {
				d3.select(svg).selectAll('*').remove();
			}
		}
	}

	onMount(() => {
		draw();
		resizeObserver = new ResizeObserver(() => draw());
		if (wrapper) resizeObserver.observe(wrapper);
	});

	onDestroy(() => {
		if (resizeObserver) resizeObserver.disconnect();
	});

	function draw() {
		if (!svg || !filtered?.length) return;

		const { margin, fullWidth, fullHeight, innerWidth, innerHeight, axisFontSize } = getLayout();

		const root = d3.select(svg).attr('width', fullWidth).attr('height', fullHeight);
		root.selectAll('*').remove();

		const base = root.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		const x0 = d3.scaleBand().domain(years).range([0, innerWidth]).padding(0.3);

		const xAxisTopG = base
			.append('g')
			.attr('transform', 'translate(0,0)')
			.call(d3.axisTop(x0).tickFormat(d3.format('d')));
		xAxisTopG.select('.domain').remove();
		xAxisTopG.selectAll('line').remove();
		xAxisTopG
			.selectAll('text')
			.style('font-family', 'Inter')
			.style('font-size', axisFontSize)
			.style('fill', '#666');

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(filtered, (d) => d.value)])
			.nice()
			.range([innerHeight, 0]);

		const yGrid = base
			.append('g')
			.call(d3.axisLeft(y).ticks(3).tickSize(-innerWidth).tickFormat(''));
		yGrid.select('.domain').remove();
		yGrid.selectAll('line').attr('stroke', '#E9E9E9');

		const yAxisG = base.append('g').call(d3.axisLeft(y).ticks(3).tickSize(0));
		yAxisG.select('.domain').remove();
		yAxisG
			.selectAll('text')
			.style('font-family', 'Inter')
			.style('font-size', axisFontSize)
			.style('fill', '#666')
			.attr('text-anchor', 'start')
			.attr('dx', '1px')
			.attr('dy', '-8px');

		const lastTickG = yAxisG.select('.tick:last-of-type');
		const match = lastTickG.attr('transform')?.match(/translate\(\s*0,\s*([\d.]+)\s*\)/) || [];
		const yGroup = +match[1] || 0;
		const xLocal = +(lastTickG.select('text').attr('x') || 0);

		base
			.append('text')
			.attr('x', xLocal)
			.attr('y', yGroup)
			.attr('dx', '30px')
			.attr('dy', '-8px')
			.attr('text-anchor', 'start')
			.style('font-family', 'Inter')
			.style('font-size', axisFontSize)
			.style('fill', '#666')
			.text('cm');

		const defs = base.append('defs');

		const bandGradient = defs
			.append('linearGradient')
			.attr('id', 'band-gradient')
			.attr('gradientUnits', 'userSpaceOnUse')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', innerHeight);
		bandGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f0f0f0');
		bandGradient.append('stop').attr('offset', '100%').attr('stop-color', '#fff');

		const bandWidth = x0.bandwidth() / 3;
		base
			.selectAll('.band')
			.data(years)
			.join('rect')
			.attr('class', 'band')
			.attr('x', (d) => x0(d) + x0.bandwidth() / 2 - bandWidth / 2)
			.attr('y', 0)
			.attr('width', bandWidth)
			.attr('height', innerHeight)
			.attr('fill', 'url(#band-gradient)');

		const marker = defs
			.append('marker')
			.attr('id', 'arrow')
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 5)
			.attr('refY', 0)
			.attr('markerWidth', 6)
			.attr('markerHeight', 6)
			.attr('orient', -90);
		marker.append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#0D96F9');

		const padding = 8;
		const rectHeight = 25;
		const rx = 6,
			ry = 6;

		const selGroup = base
			.selectAll('.sel')
			.data(filtered.slice().sort((a, b) => a.year - b.year))
			.join((enter) => {
				const g = enter.append('g').attr('class', 'sel');
				g.append('rect');
				g.append('text');
				g.append('line');
				return g;
			});

		selGroup
			.select('text')
			.text((d) => '+' + formatCm(d.value))
			.attr('x', (d) => x0(d.year) + x0.bandwidth() / 2)
			.attr('y', (d) => y(d.value) + 1)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.style('font', '650 0.72rem Inter')
			.attr('fill', '#0D96F9');

		selGroup.each(function (d) {
			d.rectWidth = d3.select(this).select('text').node().getBBox().width + padding * 2;
		});

		selGroup
			.select('rect')
			.attr('width', (d) => d.rectWidth)
			.attr('height', rectHeight)
			.attr('rx', rx)
			.attr('ry', ry)
			.attr('x', (d) => x0(d.year) + x0.bandwidth() / 2 - d.rectWidth / 2)
			.attr('y', (d) => y(d.value) - rectHeight / 2)
			.attr('fill', '#CFEAFE')
			.attr('stroke', '#0D96F9')
			.attr('stroke-width', strokeRect);

		selGroup
			.select('line')
			.attr('x1', (d) => x0(d.year) + x0.bandwidth() / 2)
			.attr('y1', y(0))
			.attr('x2', (d) => x0(d.year) + x0.bandwidth() / 2)
			.attr('y2', (d) => y(d.value) + rectHeight / 2 + strokeRect / 2)
			.attr('stroke', '#0D96F9')
			.attr('stroke-width', 1.5)
			.attr('marker-end', 'url(#arrow)');
	}
</script>

<div class="chart-wrapper" bind:this={wrapper}>
	<svg bind:this={svg}></svg>
</div>

<style>
	.chart-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}
	svg {
		display: block;
		width: 100%;
		max-width: 100%;
		height: auto;
	}
</style>
