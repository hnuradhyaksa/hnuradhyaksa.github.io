<script>
	import { scaleLinear, scalePoint } from 'd3';
	import { fade } from 'svelte/transition';
	import { cubicOut, backOut } from 'svelte/easing';

	function grow(node, { delay = 0, duration = 250, easing = cubicOut }) {
		return {
			delay,
			duration,
			easing,
			css: (t) => `clip-path: inset(${100 - t * 100}% -50% -10% -50%);`
		};
	}

	const data = [
		{
			agency: 'Aceh',
			values: [
				{ prevMonth: 'Jan', month: 'Feb', prev: 0, curr: 0.0024, change: 0.0024 },
				{ prevMonth: 'Feb', month: 'Mar', prev: 0.0024, curr: 0.0231, change: 0.0207 },
				{ prevMonth: 'Mar', month: 'Apr', prev: 0.0231, curr: 0.0341, change: 0.0109 },
				{ prevMonth: 'Apr', month: 'May', prev: 0.0341, curr: 0.037, change: 0.0029 },
				{ prevMonth: 'May', month: 'Jun', prev: 0.037, curr: 0.0587, change: 0.0217 },
				{ prevMonth: 'Jun', month: 'Jul', prev: 0.0587, curr: 0.0652, change: 0.0066 },
				{ prevMonth: 'Jul', month: 'Aug', prev: 0.0652, curr: 0.0786, change: 0.0134 },
				{ prevMonth: 'Aug', month: 'Sep', prev: 0.0786, curr: 0.0852, change: 0.0065 },
				{ prevMonth: 'Sep', month: 'Oct', prev: 0.0852, curr: 0.0936, change: 0.0085 },
				{ prevMonth: 'Oct', month: 'Nov', prev: 0.0936, curr: 0.101, change: 0.0074 },
				{ prevMonth: 'Nov', month: 'Dec', prev: 0.101, curr: 0.404, change: 0.303 },
				{ prevMonth: 'Dec', month: 'End', prev: 0.404, curr: 0.404, change: 0 }
			]
		},
		{
			agency: 'North Sumatera',
			values: [
				{ prevMonth: 'Jan', month: 'Feb', prev: 0.0239, curr: 0.0247, change: 0.0008 },
				{ prevMonth: 'Feb', month: 'Mar', prev: 0.0247, curr: 0.0297, change: 0.005 },
				{ prevMonth: 'Mar', month: 'Apr', prev: 0.0297, curr: 0.0314, change: 0.0017 },
				{ prevMonth: 'Apr', month: 'May', prev: 0.0314, curr: 0.0357, change: 0.0043 },
				{ prevMonth: 'May', month: 'Jun', prev: 0.0357, curr: 0.0393, change: 0.0035 },
				{ prevMonth: 'Jun', month: 'Jul', prev: 0.0393, curr: 0.0462, change: 0.007 },
				{ prevMonth: 'Jul', month: 'Aug', prev: 0.0462, curr: 0.0562, change: 0.01 },
				{ prevMonth: 'Aug', month: 'Sep', prev: 0.0562, curr: 0.0631, change: 0.0069 },
				{ prevMonth: 'Sep', month: 'Oct', prev: 0.0631, curr: 0.1014, change: 0.0383 },
				{ prevMonth: 'Oct', month: 'Nov', prev: 0.1014, curr: 0.1296, change: 0.0282 },
				{ prevMonth: 'Nov', month: 'Dec', prev: 0.1296, curr: 0.2977, change: 0.168 },
				{ prevMonth: 'Dec', month: 'End', prev: 0.2977, curr: 0.2977, change: 0 }
			]
		},
		{
			agency: 'West Sumatera',
			values: [
				{ prevMonth: 'Jan', month: 'Feb', prev: 0.0606, curr: 0.0648, change: 0.0043 },
				{ prevMonth: 'Feb', month: 'Mar', prev: 0.0648, curr: 0.1004, change: 0.0356 },
				{ prevMonth: 'Mar', month: 'Apr', prev: 0.1004, curr: 0.1096, change: 0.0092 },
				{ prevMonth: 'Apr', month: 'May', prev: 0.1096, curr: 0.1151, change: 0.0055 },
				{ prevMonth: 'May', month: 'Jun', prev: 0.1151, curr: 0.1214, change: 0.0063 },
				{ prevMonth: 'Jun', month: 'Jul', prev: 0.1214, curr: 0.1423, change: 0.021 },
				{ prevMonth: 'Jul', month: 'Aug', prev: 0.1423, curr: 0.1547, change: 0.0123 },
				{ prevMonth: 'Aug', month: 'Sep', prev: 0.1547, curr: 0.1692, change: 0.0146 },
				{ prevMonth: 'Sep', month: 'Oct', prev: 0.1692, curr: 0.184, change: 0.0148 },
				{ prevMonth: 'Oct', month: 'Nov', prev: 0.184, curr: 0.2413, change: 0.0572 },
				{ prevMonth: 'Nov', month: 'Dec', prev: 0.2413, curr: 0.6411, change: 0.3999 },
				{ prevMonth: 'Dec', month: 'End', prev: 0.6411, curr: 0.6411, change: 0 }
			]
		}
	];

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const visibleMonths = ['Jan', 'Feb', 'Jun', 'Jul', 'Nov', 'Dec'];

	let viewMode = 'candle';

	// Only one set of ticks is needed now
	const ticks = [0, 0.2, 0.4, 0.6, 0.8];

	const width = 315;
	const height = 250;
	const margin = { top: 40, right: 20, bottom: 40, left: 45 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scalePoint().domain(months).range([0, innerWidth]);
	const step = xScale.step();

	// Fixed Y-Scale, permanently set to 0.8 max
	const fixedYScale = scaleLinear().domain([0, 0.8]).range([innerHeight, 0]);
</script>

<div class="main-container">
	<div class="toggle-bar">
		<div class="toggle-buttons">
			<button on:click={() => (viewMode = 'candle')} class:selected={viewMode === 'candle'}
				>% Change</button
			>
			<button on:click={() => (viewMode = 'prev')} class:selected={viewMode === 'prev'}
				>% Cumulative</button
			>
		</div>
	</div>

	<div class="dashboard">
		<div class="charts-grid">
			{#each data as series}
				<div class="chart-wrapper">
					<h2 class="chart-title" style="margin-left: {margin.left}px;">{series.agency}</h2>

					<svg {width} {height} style="overflow: visible;">
						<g transform="translate({margin.left}, {margin.top})">
							{#each ticks as tick}
								<g>
									<line
										x1="-5"
										y1={fixedYScale(tick)}
										x2="-10"
										y2={fixedYScale(tick)}
										class="tick-mark"
									/>
									<text x="-15" y={fixedYScale(tick)} class="y-axis-label">
										{(tick * 100).toFixed(0)}{tick === 0.8 ? '%' : ''}
									</text>
									<line
										x1={-5}
										y1={fixedYScale(tick)}
										x2={innerWidth + 5}
										y2={fixedYScale(tick)}
										class="horizontal-grid-line"
									/>
								</g>
							{/each}

							{#each months as month}
								{#if visibleMonths.includes(month)}
									<line
										x1={xScale(month)}
										y1={-12}
										x2={xScale(month)}
										y2={innerHeight + 12}
										class="vertical-grid-line"
									/>
									<text
										x={xScale(month)}
										y={innerHeight + 25}
										transform="rotate(-45, {xScale(month)}, {innerHeight + 25})"
										class="x-axis-label"
									>
										{month}
									</text>
								{/if}
							{/each}

							{#each series.values as point, i (point.prevMonth + '_' + viewMode)}
								{@const isCandle = viewMode === 'candle'}

								{@const xPos = isCandle
									? xScale(point.prevMonth) + step * 0.15
									: xScale(point.prevMonth) - step * 0.25}
								{@const rectWidth = isCandle ? step * 0.7 : step * 0.5}

								{@const yPos = isCandle
									? fixedYScale(Math.max(point.prev, point.curr))
									: fixedYScale(point.prev)}
								{@const rectHeight = isCandle
									? Math.abs(fixedYScale(point.prev) - fixedYScale(point.curr))
									: Math.abs(fixedYScale(0) - fixedYScale(point.prev))}

								{@const isTargetMonth = isCandle
									? point.prevMonth === 'Nov' && point.month === 'Dec'
									: point.prevMonth === 'Dec'}
								{@const barFill = isTargetMonth ? '#D75638' : '#ccc'}

								{@const showLabel = isCandle
									? point.month === 'Nov' || point.month === 'Dec'
									: point.prevMonth === 'Nov' || point.prevMonth === 'Dec'}
								<g
									in:grow={{ duration: 500, delay: 600 + i * 30, easing: backOut }}
									out:grow={{
										duration: 250,
										delay: (series.values.length - 1 - i) * 20,
										easing: cubicOut
									}}
								>
									{#if rectHeight > 0.5}
										<rect x={xPos} y={yPos} width={rectWidth} height={rectHeight} fill={barFill} />
									{/if}

									{#if showLabel && rectHeight > 0.5}
										<text
											class="data-label"
											x={xPos + rectWidth / 2}
											y={yPos - 8}
											in:fade={{ duration: 300, delay: 1500 + i * 30 }}
											out:fade={{ duration: 100, delay: (series.values.length - 1 - i) * 20 }}
										>
											{isCandle
												? (point.change > 0 ? '+' : '') + (point.change * 100).toFixed(1)
												: (point.prev * 100).toFixed(1) + '%'}
										</text>
									{/if}
								</g>
							{/each}
						</g>
					</svg>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	}

	.toggle-bar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		max-width: 1000px;
		margin-bottom: 2rem;
	}

	.toggle-buttons {
		display: flex;
		gap: 5px;
	}

	.toggle-buttons button {
		padding: 0.5rem 0.8rem;
		border: 1.5px solid #f1f1f0;
		border-radius: 6px;
		background: #eee;
		cursor: pointer;
		font-family: Roboto, 'Inter', sans-serif;
		font-weight: 500;
		font-size: 0.72rem;
		color: #aaaab0;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.toggle-buttons button.selected {
		background: white;
		color: #000;
		border-color: #ccc;
	}

	.dashboard {
		display: flex;
		justify-content: center;
	}

	.charts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.chart-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.chart-title {
		font-family: 'Inter', sans-serif;
		font-size: 0.86rem;
		font-weight: 600;
		color: #000;
		margin: 0 0 0.5rem 0;
		text-align: left;
	}

	.y-axis-label {
		font-family: 'Inter', sans-serif;
		text-anchor: end;
		dominant-baseline: middle;
		font-size: 0.72rem;
		font-weight: 400;
		fill: #666;
	}

	.x-axis-label {
		font-family: 'Inter', sans-serif;
		text-anchor: middle;
		font-size: 0.72rem;
		font-weight: 400;
		fill: #666;
	}

	.tick-mark {
		stroke: #ccc;
		stroke-width: 1;
	}

	.horizontal-grid-line {
		stroke: #e0e0e0;
		stroke-width: 1;
		stroke-dasharray: 4 4;
	}

	.vertical-grid-line {
		stroke: #e0e0e0;
		stroke-width: 1;
		stroke-dasharray: 4 4;
	}

	.data-label {
		font-family: 'Inter', sans-serif;
		text-anchor: middle;
		dominant-baseline: middle;
		font-size: 0.72rem;
		font-weight: 350;
		fill: #666;
		text-shadow:
			-2px -2px 0 #ffffff,
			0px -2px 0 #ffffff,
			2px -2px 0 #ffffff,
			2px 0px 0 #ffffff,
			2px 2px 0 #ffffff,
			0px 2px 0 #ffffff,
			-2px 2px 0 #ffffff,
			-2px 0px 0 #ffffff;
	}
</style>
