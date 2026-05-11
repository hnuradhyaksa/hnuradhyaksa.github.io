<script>
	import { onMount } from 'svelte';
	import { csvParse, group, scaleLinear, line, max, range } from 'd3';
	import csvRaw from '../data/ibtracs.SI.SP.WP.list.v04r01.csv?raw';

	let width = 960;
	let height = 600;

	// Increased top margin slightly to accommodate the new title placement
	const margin = { top: 60, right: 40, bottom: 60, left: 50 };

	let stormTracks = [];
	let lineChartData = [];

	// Hover State Variables
	let hoveredStorm = null;
	let svgMouseX = 0;
	let svgMouseY = 0;

	const blackStorms = ['VAMEI'];

	function toProperCase(str) {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
	}

	function getStormBaseColor(name) {
		if (name === 'SENYAR') return '#d75638';
		if (blackStorms.includes(name)) return '#333333';
		return '#bbbbbb';
	}

	function getStormClass(name, sid) {
		const isBaseRed = name === 'SENYAR';
		const isBaseBlack = blackStorms.includes(name);

		if (hoveredStorm) {
			if (hoveredStorm.sid === sid) {
				let baseClass = isBaseRed
					? 'path-senyar'
					: isBaseBlack
						? 'path-highlighted'
						: 'path-background';
				return `${baseClass} path-hovered`;
			} else {
				return 'path-dimmed';
			}
		}

		if (isBaseRed) return 'path-senyar';
		if (isBaseBlack) return 'path-highlighted';
		return 'path-background';
	}

	function getStormRank(name, sid) {
		if (hoveredStorm && hoveredStorm.sid === sid) return 99;
		if (name === 'SENYAR') return 2;
		if (blackStorms.includes(name)) return 1;
		return 0;
	}

	// Process data to include daysElapsed
	$: if (stormTracks.length > 0) {
		let tempChartData = stormTracks.map((track) => {
			const startTime = track[0].ISO_TIME.getTime();
			const points = track.map((pt) => ({
				LAT: pt.LAT,
				daysElapsed: (pt.ISO_TIME.getTime() - startTime) / (1000 * 60 * 60 * 24)
			}));

			return {
				sid: track[0].SID,
				name: track[0].NAME,
				year: track[0].ISO_TIME.getFullYear(),
				points
			};
		});

		lineChartData = tempChartData.sort(
			(a, b) => getStormRank(a.name, a.sid) - getStormRank(b.name, b.sid)
		);
	}

	$: maxDays = max(lineChartData, (d) => max(d.points, (p) => p.daysElapsed)) || 10;

	const xBuffer = 2; // Add 2 days of empty padding to the left and right

	$: xScale = scaleLinear()
		.domain([-xBuffer, maxDays + xBuffer])
		.range([margin.left, width - margin.right]);

	$: yScale = scaleLinear()
		.domain([-50, 50])
		.range([height - margin.bottom, margin.top]);

	$: lineGenerator = line()
		.x((d) => xScale(d.daysElapsed))
		.y((d) => yScale(d.LAT));

	// Generate Axis Ticks
	$: xTicks = maxDays ? range(0, Math.ceil(maxDays) + 1, 4) : [];
	$: yTicks = [-40, -20, 0, 20, 40];

	// UPDATED ARROWS: Dynamic calculation based on hover state and linear scales
	$: arrowMarkers =
		lineChartData && xScale && yScale
			? lineChartData
					.filter((storm) => {
						if (hoveredStorm) return storm.sid === hoveredStorm.sid;
						return storm.name === 'SENYAR' || blackStorms.includes(storm.name);
					})
					.flatMap((storm) => {
						const markers = [];
						let lastDayMarker = 0;

						for (let i = 0; i < storm.points.length - 1; i++) {
							const pt = storm.points[i];
							const nextPt = storm.points[i + 1];

							const currentDay = Math.floor(pt.daysElapsed);

							if (currentDay > lastDayMarker) {
								lastDayMarker = currentDay;

								const x1 = xScale(pt.daysElapsed);
								const y1 = yScale(pt.LAT);
								const x2 = xScale(nextPt.daysElapsed);
								const y2 = yScale(nextPt.LAT);

								const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

								markers.push({
									x: x1,
									y: y1,
									angle: angle,
									color: getStormBaseColor(storm.name)
								});
							}
						}
						return markers;
					})
			: [];

	// UPDATED LABELS: Only display static labels when NOTHING is being hovered
	$: stormLabels =
		lineChartData && xScale && yScale
			? lineChartData
					.filter((storm) => {
						if (hoveredStorm) return false; // Vanish all static labels on hover
						return storm.name === 'SENYAR' || blackStorms.includes(storm.name);
					})
					.map((storm) => {
						// Pin the label to the head (the end of the storm)
						const pt = storm.points[storm.points.length - 1];

						return {
							name: toProperCase(storm.name),
							x: xScale(pt.daysElapsed),
							y: yScale(pt.LAT),
							color: getStormBaseColor(storm.name)
						};
					})
					.filter((label) => label.x >= 0 && label.x <= width && label.y >= 0 && label.y <= height)
			: [];

	onMount(() => {
		const parsedData = csvParse(csvRaw, (d) => ({
			SID: d.SID,
			NAME: d.NAME,
			LAT: +d.LAT,
			LON: +d.LON,
			ISO_TIME: new Date(d.ISO_TIME)
		}));

		const visiblePoints = parsedData.filter((d) => d.LON >= 90 && d.LON <= 145);
		visiblePoints.sort((a, b) => a.ISO_TIME - b.ISO_TIME);

		stormTracks = Array.from(group(visiblePoints, (d) => d.SID).values());
	});
</script>

<div class="chart-wrapper" bind:clientWidth={width}>
	<svg
		{width}
		{height}
		on:mousemove={(e) => {
			if (hoveredStorm) {
				const rect = e.currentTarget.getBoundingClientRect();
				svgMouseX = e.clientX - rect.left;
				svgMouseY = e.clientY - rect.top;
			}
		}}
	>
		{#if yScale}
			<g class="highlight-band">
				<rect
					x={margin.left}
					y={yScale(5)}
					width={width - margin.left - margin.right}
					height={yScale(-5) - yScale(5)}
					fill="#f0f0f0"
					opacity="0.6"
				/>
				<text
					x={margin.left + (width - margin.left - margin.right) / 2}
					y={yScale(0)}
					text-anchor="middle"
					alignment-baseline="middle"
					font-family="Inter, sans-serif"
					font-size="0.86rem"
					fill="#999"
					font-style="italic"
					font-weight="300"
					style="pointer-events: none;"
				>
					Weak Coriolis Zone
				</text>
			</g>
		{/if}

		<g class="grid-layer">
			{#each yTicks as tick}
				<line
					x1={margin.left}
					x2={width - margin.right}
					y1={yScale(tick)}
					y2={yScale(tick)}
					stroke="#ddd"
					stroke-opacity="0.6"
					stroke-width="1"
					class:zero-line={tick === 0}
				/>
			{/each}

			{#each xTicks as tick}
				<line
					x1={xScale(tick)}
					x2={xScale(tick)}
					y1={margin.top}
					y2={height - margin.bottom}
					stroke="#ddd"
					stroke-opacity="0.6"
					stroke-width="1"
					class:zero-line={tick === 0}
				/>
			{/each}
		</g>

		<g class="y-axis">
			<text
				x={margin.left - 16}
				y={margin.top}
				transform="rotate(-90, {margin.left - 16}, {margin.top})"
				text-anchor="end"
				alignment-baseline="middle"
				font-family="Inter, sans-serif"
				font-size="0.86rem"
				font-weight="200"
				fill="#666"
			>
				North →
			</text>

			<text
				x={margin.left - 16}
				y={height - margin.bottom}
				transform="rotate(-90, {margin.left - 16}, {height - margin.bottom})"
				text-anchor="start"
				alignment-baseline="middle"
				font-family="Inter, sans-serif"
				font-size="0.86rem"
				font-weight="200"
				fill="#666"
			>
				← South
			</text>

			{#each yTicks as tick}
				<text
					x={margin.left}
					y={yScale(tick)}
					dx="0.28em"
					dy="-0.6em"
					text-anchor="start"
					font-family="Inter, sans-serif"
					font-size="0.86rem"
					fill="#666"
				>
					{tick}°
				</text>
			{/each}

			<text
				x={margin.left}
				y={margin.top / 2}
				dy="-0.6em"
				text-anchor="start"
				font-family="Inter, sans-serif"
				font-size="0.86rem"
				font-weight="750"
				fill="#333"
			>
				Latitude
			</text>
		</g>

		<g class="x-axis">
			{#each xTicks as tick}
				<text
					x={xScale(tick)}
					y={height - margin.bottom}
					dy="1.2em"
					text-anchor="middle"
					font-family="Inter, sans-serif"
					font-size="0.86rem"
					fill="#666"
				>
					{tick}
				</text>
			{/each}

			<text
				x={margin.left + (width - margin.left - margin.right) / 2}
				y={height - margin.bottom + 14}
				dy="2.8em"
				text-anchor="middle"
				font-family="Inter, sans-serif"
				font-size="0.86rem"
				font-weight="750"
				fill="#333"
			>
				Days Elapsed
			</text>
		</g>

		<g class="storm-layer">
			{#each lineChartData as storm}
				<path
					d={lineGenerator(storm.points)}
					class="storm-path {getStormClass(storm.name, storm.sid)}"
					on:mouseenter={(e) => {
						const rect = e.target.closest('svg').getBoundingClientRect();
						svgMouseX = e.clientX - rect.left;
						svgMouseY = e.clientY - rect.top;

						hoveredStorm = {
							sid: storm.sid,
							name: storm.name,
							year: storm.year
						};
					}}
					on:mouseleave={() => {
						hoveredStorm = null;
					}}
				/>
			{/each}
		</g>

		<g class="arrow-layer">
			{#each arrowMarkers as marker}
				<g transform="translate({marker.x}, {marker.y}) rotate({marker.angle})">
					<path
						d="M -2.5 -3 L 1.5 0 L -2.5 3"
						fill="none"
						stroke={marker.color}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						style="pointer-events: none;"
					/>
				</g>
			{/each}
		</g>

		<g class="storm-label-layer">
			{#each stormLabels as label}
				<text
					x={label.x}
					y={label.y - 12}
					text-anchor="middle"
					alignment-baseline="middle"
					fill={label.color}
					stroke="white"
					stroke-width="3"
					stroke-linejoin="round"
					paint-order="stroke fill"
					font-family="Inter, sans-serif"
					font-size="0.72rem"
					font-weight="350"
					style="pointer-events: none;"
				>
					{label.name}
				</text>
			{/each}
		</g>

		{#if hoveredStorm}
			<g style="pointer-events: none;">
				<text
					x={svgMouseX}
					y={svgMouseY - 15}
					text-anchor="middle"
					alignment-baseline="middle"
					fill={getStormBaseColor(hoveredStorm.name)}
					stroke="white"
					stroke-width="3"
					stroke-linejoin="round"
					paint-order="stroke fill"
					font-family="Inter, sans-serif"
					font-size="0.72rem"
					font-weight="350"
				>
					{toProperCase(hoveredStorm.name)}, {hoveredStorm.year}
				</text>
			</g>
		{/if}
	</svg>
</div>

<style>
	.chart-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 800px;
		margin-top: 4rem;
		margin-bottom: 4rem;
	}

	.storm-path {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition:
			opacity 0.2s,
			stroke 0.2s,
			stroke-width 0.2s;
		cursor: pointer;
	}

	.path-background {
		stroke: #bbbbbb;
		stroke-width: 1.5px;
		opacity: 0.25;
	}
	.path-highlighted {
		stroke: #333333;
		stroke-width: 1.5px;
		opacity: 1;
	}
	.path-senyar {
		stroke: #d75638;
		stroke-width: 1.5px;
		opacity: 1;
	}

	.path-hovered {
		stroke-width: 2px !important;
		opacity: 1 !important;
	}

	.path-dimmed {
		stroke: #bbbbbb !important;
		stroke-width: 1px !important;
		opacity: 0.15 !important;
	}

	:global(.zero-line) {
		stroke-dasharray: 4, 2;
	}
</style>
