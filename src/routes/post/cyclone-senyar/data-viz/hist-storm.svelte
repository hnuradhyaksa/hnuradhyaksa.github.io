<script>
	import { onMount } from 'svelte';
	import { geoMercator, geoPath } from 'd3-geo';
	import { csvParse, group } from 'd3';
	import * as topojson from 'topojson-client';

	import mapData from '../data/ne_50m_land_100.json';
	import csvRaw from '../data/ibtracs.SI.SP.WP.list.v04r01.csv?raw';

	let width = 800;
	let mapHeight = 600;
	let stormTracks = [];
	let geoJsonFeatures = [];

	// Hover State Variables
	let hoveredStorm = null;
	let svgMouseX = 0;
	let svgMouseY = 0;

	let minDataLat = -11;
	let maxDataLat = 6;

	$: if (mapData && mapData.objects) {
		const objectKey = Object.keys(mapData.objects)[0];
		geoJsonFeatures = topojson.feature(mapData, mapData.objects[objectKey]).features;
	}

	$: stormGeoJSON = {
		type: 'FeatureCollection',
		features: stormTracks.map((track) => ({
			type: 'Feature',
			properties: {
				NAME: track[0].NAME,
				SID: track[0].SID,
				YEAR: track[0].ISO_TIME.getFullYear()
			},
			geometry: {
				type: 'LineString',
				coordinates: track.map((d) => [d.LON, d.LAT])
			}
		}))
	};

	const blackStorms = ['SEROJA', 'DAHLIA', 'VAMEI', 'TERATAI', 'FLORES', 'CEMPAKA', 'BAKUNG'];

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

	$: sortedFeatures =
		stormGeoJSON && stormGeoJSON.features
			? [...stormGeoJSON.features].sort(
					(a, b) =>
						getStormRank(a.properties.NAME, a.properties.SID) -
						getStormRank(b.properties.NAME, b.properties.SID)
				)
			: [];

	// UPDATED ARROWS: Dynamic calculation based on hover state
	$: arrowMarkers =
		stormTracks && projection
			? stormTracks
					.filter((track) => {
						// If a storm is hovered, ONLY generate arrows for that specific storm
						if (hoveredStorm) return track[0].SID === hoveredStorm.sid;
						// Otherwise, use the default idle behavior
						return track[0].NAME === 'SENYAR' || blackStorms.includes(track[0].NAME);
					})
					.flatMap((track) => {
						const markers = [];
						const startTime = track[0].ISO_TIME.getTime();
						let lastDayMarker = 0;

						for (let i = 0; i < track.length - 1; i++) {
							const pt = track[i];
							const nextPt = track[i + 1];

							const daysElapsed = Math.floor(
								(pt.ISO_TIME.getTime() - startTime) / (1000 * 60 * 60 * 24)
							);

							if (daysElapsed > lastDayMarker) {
								lastDayMarker = daysElapsed;

								const [x1, y1] = projection([pt.LON, pt.LAT]);
								const [x2, y2] = projection([nextPt.LON, nextPt.LAT]);
								const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

								markers.push({
									x: x1,
									y: y1,
									angle: angle,
									color: getStormBaseColor(pt.NAME),
									day: daysElapsed
								});
							}
						}
						return markers;
					})
			: [];

	// UPDATED LABELS: Only display static labels when NOTHING is being hovered
	$: stormLabels =
		stormTracks && projection
			? stormTracks
					.filter((track) => {
						if (hoveredStorm) return false; // Vanish all static labels on hover
						return track[0].NAME === 'SENYAR' || blackStorms.includes(track[0].NAME);
					})
					.map((track) => {
						const stormName = track[0].NAME;
						const stormYear = track[0].ISO_TIME.getFullYear();
						const positionPreference =
							stormName === 'SENYAR' ||
							stormName === 'VAMEI' ||
							stormName === 'DAHLIA' ||
							(stormName === 'BAKUNG' && stormYear === 2014)
								? 'head'
								: 'tail';
						let labelIndex = positionPreference === 'head' ? track.length - 1 : 0;

						const pt = track[labelIndex];
						const [x, y] = projection([pt.LON, pt.LAT]);

						return {
							name: toProperCase(stormName),
							x: x,
							y: y,
							color: getStormBaseColor(stormName)
						};
					})
					.filter(
						(label) => label.x >= 0 && label.x <= width && label.y >= 0 && label.y <= mapHeight
					)
			: [];

	$: cameraBounds = {
		type: 'Feature',
		geometry: {
			type: 'LineString',
			coordinates: [
				[90, minDataLat],
				[145, maxDataLat]
			]
		}
	};

	let projection = geoMercator();

	let fadeEndLatitude = 15;
	$: fadeEndY = projection ? projection([0, fadeEndLatitude])[1] : 200;

	let pathGenerator = geoPath().projection(projection);

	const customCountries = [
		{ name: 'Indonesia', lat: -0.6, lon: 114.0 },
		{ name: 'Malaysia', lat: 4.5, lon: 102.0 },
		{ name: 'Philippines', lat: 12.5, lon: 122.0 },
		{ name: 'Australia', lat: -25.0, lon: 133.0 },
		{ name: 'Papua New Guinea', lat: -6.0, lon: 144.0 },
		{ name: 'Thailand', lat: 15.8, lon: 100.9 },
		{ name: 'Vietnam', lat: 14.0, lon: 108.0 },
		{ name: 'Myanmar', lat: 21.0, lon: 95.9 },
		{ name: 'Cambodia', lat: 12.5, lon: 104.9 },
		{ name: 'Laos', lat: 19.8, lon: 102.4 },
		{ name: 'Brunei', lat: 4.2, lon: 114.5 },
		{ name: 'Singapore', lat: 1.35, lon: 103.8 },
		{ name: 'Japan', lat: 36.0, lon: 138.0 },
		{ name: 'Pakistan', lat: 30.0, lon: 70.0 },
		{ name: 'India', lat: 22.0, lon: 79.0 },
		{ name: 'Sri Lanka', lat: 7.5, lon: 80.5 },
		{ name: 'Bangladesh', lat: 24.0, lon: 90.0 },
		{ name: 'Nepal', lat: 28.0, lon: 84.0 },
		{ name: 'Bhutan', lat: 27.5, lon: 90.5 },
		{ name: 'China', lat: 35.0, lon: 105.0 },
		{ name: 'Taiwan', lat: 23.5, lon: 121.0 },
		{ name: 'South Korea', lat: 36.0, lon: 128.0 },
		{ name: 'North Korea', lat: 40.0, lon: 127.0 },
		{ name: 'Mongolia', lat: 46.0, lon: 105.0 },
		{ name: 'Afghanistan', lat: 33.0, lon: 66.0 },
		{ name: 'Kyrgyzstan', lat: 41.0, lon: 75.0 },
		{ name: 'Tajikistan', lat: 39.0, lon: 71.0 }
	];

	$: countryLabels = projection
		? customCountries
				.map((c) => ({
					name: c.name,
					...Object.fromEntries(
						Object.entries(projection([c.lon, c.lat])).map(([k, v], i) => [i === 0 ? 'x' : 'y', v])
					)
				}))
				.filter((l) => l.x >= 0 && l.x <= width && l.y >= 0 && l.y <= mapHeight)
		: [];

	$: if (stormTracks.length > 0 && width > 0) {
		const topPadding = 360;

		const bottomPadding = 80;

		const tempProj = geoMercator().fitExtent(
			[
				[0, 0],
				[width, width]
			],
			cameraBounds
		);
		const bounds = geoPath().projection(tempProj).bounds(cameraBounds);

		// Replace the hardcoded 720 with dynamic padding
		mapHeight = Math.ceil(bounds[1][1] - bounds[0][1] + topPadding + bottomPadding);

		projection = geoMercator()
			.fitExtent(
				[
					[20, topPadding], // Left and Top
					[width - 20, mapHeight - bottomPadding] // Right and Bottom
				],
				cameraBounds
			)
			.clipExtent([
				[0, 0],
				[width, mapHeight]
			]);

		pathGenerator = geoPath().projection(projection);
	}

	onMount(() => {
		const parsedData = csvParse(csvRaw, (d) => ({
			SID: d.SID,
			NAME: d.NAME,
			LAT: +d.LAT,
			LON: +d.LON,
			ISO_TIME: new Date(d.ISO_TIME)
		}));

		const visiblePoints = parsedData.filter((d) => d.LON >= 90 && d.LON <= 145);
		const latitudes = visiblePoints.map((d) => d.LAT);
		minDataLat = Math.min(...latitudes);
		maxDataLat = Math.max(...latitudes);

		parsedData.sort((a, b) => a.ISO_TIME - b.ISO_TIME);
		stormTracks = Array.from(group(parsedData, (d) => d.SID).values());
	});
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg
		{width}
		height={mapHeight}
		on:mousemove={(e) => {
			if (hoveredStorm) {
				const rect = e.currentTarget.getBoundingClientRect();
				svgMouseX = e.clientX - rect.left;
				svgMouseY = e.clientY - rect.top;
			}
		}}
	>
		<svg
			{width}
			height={mapHeight}
			on:mousemove={(e) => {
				if (hoveredStorm) {
					const rect = e.currentTarget.getBoundingClientRect();
					svgMouseX = e.clientX - rect.left;
					svgMouseY = e.clientY - rect.top;
				}
			}}
		>
			<defs>
				<linearGradient
					id="top-fade"
					gradientUnits="userSpaceOnUse"
					x1="0"
					y1="0"
					x2="0"
					y2={fadeEndY}
				>
					<stop offset="0%" stop-color="#ffffff" />
					<stop offset="100%" stop-color="#dbdbdb" />
				</linearGradient>
			</defs>
			<g class="land-layer">
				{#if geoJsonFeatures.length > 0}
					{#each geoJsonFeatures as feature}
						<path d={pathGenerator(feature)} class="landmass" />
					{/each}
				{/if}
			</g>

			<g class="storm-layer">
				{#if sortedFeatures.length > 0}
					{#each sortedFeatures as feature}
						<path
							d={pathGenerator(feature)}
							class="storm-path {getStormClass(feature.properties.NAME, feature.properties.SID)}"
							on:mouseenter={(e) => {
								// Grab immediate coordinates on enter to avoid an instant teleport/flicker
								const rect = e.target.closest('svg').getBoundingClientRect();
								svgMouseX = e.clientX - rect.left;
								svgMouseY = e.clientY - rect.top;

								hoveredStorm = {
									sid: feature.properties.SID,
									name: feature.properties.NAME,
									year: feature.properties.YEAR
								};
							}}
							on:mouseleave={() => {
								hoveredStorm = null;
							}}
						/>
					{/each}
				{/if}
			</g>

			<g class="arrow-layer">
				{#each arrowMarkers as marker}
					<g transform="translate({marker.x}, {marker.y}) rotate({marker.angle})">
						<path
							d="M -2.5 -3 L 1.5 0 L -2.5 3"
							fill="none"
							stroke={marker.color}
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				{/each}
			</g>

			<g class="label-layer">
				{#each countryLabels as label}
					<text
						x={label.x}
						y={label.y}
						text-anchor="middle"
						alignment-baseline="middle"
						fill="#ababab"
						stroke="white"
						stroke-width="3"
						stroke-linejoin="round"
						paint-order="stroke fill"
						font-family="sans-serif"
						font-size="0.72rem"
						font-weight="250"
					>
						{label.name}
					</text>
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
	</svg>
</div>

<style>
	.chart-container {
		width: 100%;
		background-color: #fff;
	}

	.landmass {
		fill: url(#top-fade);
		stroke: #ffffff;
		stroke-width: 0.5px;
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

	/* Idle States */
	.path-background {
		stroke: #bbbbbb;
		stroke-width: 1px;
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

	/* Active Highlight Override */
	.path-hovered {
		stroke-width: 2px !important;
		opacity: 1 !important;
	}

	/* Dim override for un-hovered background items */
	.path-dimmed {
		stroke: #bbbbbb !important;
		stroke-width: 1px !important;
		opacity: 0.25 !important;
	}
</style>
