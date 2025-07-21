<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { scaleQuantile } from 'd3';
	import { data as rawCountryData } from '../data/country_vuln_emmi.js';

	let searchTerm = '';
	let suggestions = [];
	let selectedCountryName = '';

	let chartContainer;
	let svgNode;
	let circles; // will hold d3 selection of circles
	let xScaleLog, yScale, margin;
	let hoveredChild = null;
	let tooltipX = 0;
	let tooltipY = 0;

	let countryLabel;
	let vizG;
	let pacificLabelsG;
	let legendRects;
	let xLabels;
	let yLabels;

	let legendActive = null;

	const countryData = rawCountryData.filter((d) => d.climate_vulnerability_index != null);
	const bivariatePalette = [
		['#f5f5f5', '#bbddf6', '#81c6f7'],
		['#edc2c2', '#b3aac3', '#7992c4'],
		['#e68e8e', '#ac7790', '#725f90']
	];
	const xClass = d3
		.scaleQuantile()
		.domain(countryData.map((d) => d.historical_emission))
		.range([0, 1, 2]);
	const yClass = d3
		.scaleQuantile()
		.domain(countryData.map((d) => d.climate_vulnerability_index))
		.range([0, 1, 2]);
	function originalFill(d) {
		const xi = xClass(d.historical_emission);
		const yi = yClass(d.climate_vulnerability_index);
		return bivariatePalette[yi][xi];
	}

	const pacific = new Set([
		'FJI',
		'KIR',
		'MHL',
		'FSM',
		'NRU',
		'PLW',
		'PNG',
		'WSM',
		'SLB',
		'TON',
		'TUV',
		'VUT',
		'NCL',
		'RUS',
		'CHN',
		'USA',
		'DEU',
		'JPN',
		'GBR',
		'IND',
		'CHE',
		'CZE',
		'AUS',
		'NZL'
	]);

	const sortedByVuln = [...countryData].sort(
		(a, b) => b.climate_vulnerability_index - a.climate_vulnerability_index
	);
	const vulnRank = new Map(sortedByVuln.map((d, i) => [d.country_iso3, i + 1]));
	const sortedByEmission = [...countryData].sort(
		(a, b) => b.historical_emission - a.historical_emission
	);
	const emissionRank = new Map(sortedByEmission.map((d, i) => [d.country_iso3, i + 1]));

	function formatUnit(d) {
		if (d === 1e9) return '1 Giga';
		if (d === 1e6) return '1 Mega';
		if (d === 1e3) return '1 Kilo';
		if (d > 1e9) return (d / 1e9).toFixed(0);
		if (d > 1e6) return (d / 1e6).toFixed(0);
		if (d > 1e3) return (d / 1e3).toFixed(0);
		return d.toFixed(0);
	}
	function formatUnitTooltip(d) {
		if (d >= 1e9) return `${(d / 1e9).toFixed(2)} Giga`;
		if (d >= 1e6) return `${(d / 1e6).toFixed(2)} Mega`;
		if (d >= 1e3) return `${(d / 1e3).toFixed(2)} Kilo`;
		return d.toFixed(0);
	}

	$: suggestions =
		searchTerm.length >= 2
			? rawCountryData
					.filter((d) => d.country.toLowerCase().startsWith(searchTerm.toLowerCase()))
					.map((d) => d.country)
			: [];

	function selectCountry(name) {
		selectedCountryName = name;
		suggestions = [];
		const d = rawCountryData.find((c) => c.country === name);
		hoveredChild = d;

		circles
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('fill', (dd) => (dd.country === name ? originalFill(dd) : '#ccc'))
			.attr('opacity', (dd) => (dd.country === name ? 1 : 0.4))
			.attr('stroke', (dd) => (dd.country === name ? '#000' : 'none'))
			.attr('stroke-width', (dd) => (dd.country === name ? 1 : 0));

		const el = chartContainer.querySelector(`circle[data-iso="${d.country_iso3}"]`);
		if (el) {
			const r = el.getBoundingClientRect();
			tooltipX = r.x + r.width / 2 + window.scrollX + 10;
			tooltipY = r.y + r.height / 2 + window.scrollY + 10;
		}

		pacificLabelsG.style('opacity', 0);

		const cx = xScaleLog(d.historical_emission);
		const cy = margin.top + yScale(d.climate_vulnerability_index);

		countryLabel
			.text(name)
			.attr('x', cx)
			.attr('y', cy - 10)
			.style('opacity', 1);

		const xi = xClass(d.historical_emission);
		const yi = yClass(d.climate_vulnerability_index);
		legendRects
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0.4))
			.attr('stroke', (ld) => (ld.xi === xi && ld.yi === yi ? '#000' : ''))
			.attr('stroke-width', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0));
		xLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.xi === xi ? 0.4 : 0));
		yLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.yi === yi ? 0.4 : 0));
	}

	function resetView() {
		searchTerm = '';
		suggestions = [];
		selectedCountryName = '';
		hoveredChild = null;

		circles
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('fill', originalFill)
			.attr('opacity', (dd) => (pacific.has(dd.country_iso3) ? 1 : 0.4))
			.attr('stroke', (dd) => (pacific.has(dd.country_iso3) ? '#000' : '#fff'))
			.attr('stroke-width', 1)
			.attr('stroke-opacity', 1);

		pacificLabelsG.style('opacity', 1);

		countryLabel.style('opacity', 0);

		legendRects
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', 1)
			.attr('stroke-width', 0);

		xLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.label === 'Moderate' ? 0 : 0.4));

		yLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.label === 'Moderate' ? 0 : 0.4));
	}

	function handleMouseOver(event, d) {
		if (selectedCountryName && d.country !== selectedCountryName) return;

		hoveredChild = d;
		updateTooltipPosition(event);

		circles
			.transition()
			.duration(150)
			.ease(d3.easeCubic)
			.attr('opacity', (dd) => (dd === d ? 1 : 0.4))
			.attr('stroke', (dd) => (dd === d ? '#000' : '#fff'))
			.attr('stroke-width', 1);

		countryLabel
			.text(d.country)
			.attr('x', xScaleLog(d.historical_emission))
			.attr('y', margin.top + yScale(d.climate_vulnerability_index) - 10)
			.style('opacity', 1)
			.attr('fill', '#333')
			.attr('stroke', 'white')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-width', 3)
			.attr('paint-order', 'stroke fill');

		pacificLabelsG.style('opacity', 0);
	}
	function handleMouseOut(event, d) {
		if (selectedCountryName && d.country !== selectedCountryName) return;

		hoveredChild = null;

		circles
			.transition()
			.duration(150)
			.ease(d3.easeCubic)
			.attr('fill', originalFill)
			.attr('opacity', (dd) => (pacific.has(dd.country_iso3) ? 1 : 0.4))
			.attr('stroke', (dd) => (pacific.has(dd.country_iso3) ? '#000' : '#fff'))
			.attr('stroke-width', 1);

		countryLabel.style('opacity', 0);
		pacificLabelsG.style('opacity', 1);
	}
	function updateTooltipPosition(event) {
		tooltipX = event.clientX + 10;
		tooltipY = event.clientY + 10;
	}

	function highlightLegend(xi, yi) {
		pacificLabelsG.style('opacity', 0);
		circles
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('fill', (d) =>
				xClass(d.historical_emission) === xi && yClass(d.climate_vulnerability_index) === yi
					? originalFill(d)
					: '#ccc'
			)
			.attr('opacity', (d) =>
				xClass(d.historical_emission) === xi && yClass(d.climate_vulnerability_index) === yi
					? 1
					: 0.4
			)
			.attr('stroke', (d) =>
				xClass(d.historical_emission) === xi && yClass(d.climate_vulnerability_index) === yi
					? '#000'
					: 'none'
			)
			.attr('stroke-width', (d) =>
				xClass(d.historical_emission) === xi && yClass(d.climate_vulnerability_index) === yi ? 1 : 0
			);

		legendRects
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0.4))
			.attr('stroke', (ld) => (ld.xi === xi && ld.yi === yi ? '#000' : '#fff'))
			.attr('stroke-width', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0));

		xLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.xi === xi ? 0.4 : 0));

		yLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.yi === yi ? 0.4 : 0));
	}

	function highlightLegendCell(xi, yi) {
		legendRects
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0.4))
			.attr('stroke', (ld) => (ld.xi === xi && ld.yi === yi ? '#000' : 'none'))
			.attr('stroke-width', (ld) => (ld.xi === xi && ld.yi === yi ? 1 : 0));

		xLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.xi === xi ? 0.4 : 0));

		yLabels
			.transition()
			.duration(300)
			.ease(d3.easeCubic)
			.attr('opacity', (d) => (d.yi === yi ? 0.4 : 0));
	}

	onMount(() => {
		const vw = chartContainer.clientWidth;
		const vh = chartContainer.clientHeight;

		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%');
		svgNode = svg.node();

		const defs = svg.append('defs');
		defs
			.append('filter')
			.attr('id', 'whiteOutline')
			.attr('x', '-20%')
			.attr('y', '-20%')
			.attr('width', '140%')
			.attr('height', '140%').html(`
		  <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated"/>
		  <feFlood flood-color="white" result="flood"/>
		  <feComposite in="flood" in2="dilated" operator="in" result="outline"/>
		  <feMerge>
			<feMergeNode in="outline"/>
			<feMergeNode in="SourceGraphic"/>
		  </feMerge>
		`);

		const vizTotalWidth = 800;
		const offsetX = Math.max(0, (vw - vizTotalWidth) / 2);
		margin = { top: 60, right: 60, bottom: 100, left: 60 };
		const vizInnerWidth = vizTotalWidth - margin.left - margin.right;
		const vizInnerHeight = vh - margin.top - margin.bottom;

		yScale = d3
			.scaleLinear()
			.domain(d3.extent(countryData, (d) => d.climate_vulnerability_index))
			.range([vizInnerHeight, 0]);

		let paddedMin = Math.max(1, d3.extent(countryData, (d) => d.historical_emission)[0] / 2);
		xScaleLog = d3
			.scaleLog()
			.domain([paddedMin, d3.extent(countryData, (d) => d.historical_emission)[1]])
			.range([margin.left, margin.left + vizInnerWidth]);

		vizG = svg.append('g').attr('transform', `translate(${offsetX},0)`);

		pacificLabelsG = vizG.append('g').attr('class', 'pacific-labels');

		pacificLabelsG
			.selectAll('text')
			.data(
				countryData
					.map((d) => ({
						...d,
						x: xScaleLog(d.historical_emission),
						y: margin.top + yScale(d.climate_vulnerability_index)
					}))
					.filter((d) => pacific.has(d.country_iso3))
			)
			.enter()
			.append('text')
			.attr('class', 'pacific-label')
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y - 10)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('fill', '#333')
			.attr('stroke', 'white')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-width', 3)
			.attr('paint-order', 'stroke fill')
			.style('pointer-events', 'none')
			.style('opacity', 1)
			.text((d) => d.country);

		const tickMin = Math.floor(yScale.domain()[0] * 10) / 10;
		const tickMax = Math.ceil(yScale.domain()[1] * 10) / 10;
		const tickVals = d3.range(tickMin, tickMax + 0.0001, 0.1).map((v) => +v.toFixed(1));
		const innerTicks = tickVals.slice(1, -1);

		const yAxis = d3
			.axisLeft(yScale)
			.tickValues(innerTicks)
			.tickFormat(d3.format('.1f'))
			.tickSize(-vizInnerWidth);
		const yAxisG = vizG
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.call(yAxis);
		yAxisG.selectAll('.tick line').attr('stroke', '#ddd').attr('stroke-opacity', 0.6);
		yAxisG.select('.domain').remove();
		yAxisG
			.selectAll('.tick text')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('text-anchor', 'start')
			.attr('fill', '#666')
			.attr('dx', '0.28em')
			.attr('dy', '-0.6em');

		vizG
			.append('text')
			.attr('class', 'y-axis-title')
			.attr('x', margin.left)
			.attr('y', margin.top + yScale(tickMax - 0.025))
			.attr('dy', '-0.6em')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('font-weight', 750)
			.attr('fill', '#333')
			.text('Climate Change Vulnerability Index');

		// more/less labels on Y
		const s1 = tickMax - 0.1,
			s2 = tickMax - 0.2;
		// vizG
		// 	.append('text')
		// 	.attr('class', 'y-axis-more')
		// 	.attr('x', margin.left)
		// 	.attr('y', margin.top + yScale((s1 + s2) / 2))
		// 	.attr('text-anchor', 'start')
		// 	.attr('font-family', 'Inter, sans-serif')
		// 	.attr('fill', '#666')
		// 	.call((g) => {
		// 		g.append('tspan')
		// 			.attr('class', 'arrow')
		// 			.attr('font-size', '1.2rem')
		// 			.attr('font-weight', 150)
		// 			.text('↑');
		// 		g.append('tspan')
		// 			.attr('class', 'label')
		// 			.attr('font-size', '0.86rem')
		// 			.attr('font-weight', 200)
		// 			.text(' more vulnerable');
		// 	});

		const b1 = tickMin + 0.1,
			b2 = tickMin + 0.2;
		// vizG
		// 	.append('text')
		// 	.attr('class', 'y-axis-less')
		// 	.attr('x', margin.left)
		// 	.attr('y', margin.top + yScale((b1 + b2) / 2))
		// 	.attr('text-anchor', 'start')
		// 	.attr('font-family', 'Inter, sans-serif')
		// 	.attr('fill', '#666')
		// 	.call((g) => {
		// 		g.append('tspan')
		// 			.attr('class', 'arrow')
		// 			.attr('font-size', '1.2rem')
		// 			.attr('font-weight', 150)
		// 			.text('↓');
		// 		g.append('tspan')
		// 			.attr('class', 'label')
		// 			.attr('font-size', '0.86rem')
		// 			.attr('font-weight', 200)
		// 			.text(' less vulnerable');
		// 	});

		const yMinPixel = margin.top + yScale.range()[0];
		const xLogG = vizG.append('g').attr('transform', `translate(0,${yMinPixel})`);
		const logAxis = d3
			.axisBottom(xScaleLog)
			.ticks(6, '~s')
			.tickFormat(formatUnit)
			.tickSize(-vizInnerHeight);
		xLogG.call(logAxis);
		xLogG.selectAll('.tick line').attr('stroke', '#ddd').attr('stroke-opacity', 0.6);
		xLogG.select('.domain').remove();
		xLogG
			.selectAll('.tick text')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('fill', '#666')
			.each(function (d) {
				const txt = formatUnit(d);
				const [num, unit] = txt.includes(' ') ? txt.split(' ') : [txt, ''];
				d3.select(this).text(null);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '-0.2em').text(num);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '1em').text(unit);
			});

		xLogG
			.append('text')
			.attr('class', 'x-axis-title')
			.attr('x', margin.left + vizInnerWidth / 2)
			.attr('y', 14)
			.attr('dy', '2.8em')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('font-weight', 750)
			.attr('fill', '#333')
			.text('[log] Historical Emission (Tons of CO2)');

		// xLogG
		// 	.append('text')
		// 	.attr('class', 'x-axis-less')
		// 	.attr('x', margin.left)
		// 	.attr('y', 20)
		// 	.attr('dy', '2.8em')
		// 	.attr('text-anchor', 'start')
		// 	.attr('font-family', 'Inter, sans-serif')
		// 	.attr('fill', '#666')
		// 	.call((g) => {
		// 		g.append('tspan')
		// 			.attr('class', 'arrow')
		// 			.attr('font-size', '1.2rem')
		// 			.attr('font-weight', 150)
		// 			.text('<-');
		// 		g.append('tspan')
		// 			.attr('class', 'label')
		// 			.attr('font-size', '0.86rem')
		// 			.attr('font-weight', 200)
		// 			.attr('dx', '0.3em')
		// 			.text('less responsible');
		// 	});

		// xLogG
		// 	.append('text')
		// 	.attr('class', 'x-axis-more')
		// 	.attr('x', margin.left + vizInnerWidth)
		// 	.attr('y', 20)
		// 	.attr('dy', '2.8em')
		// 	.attr('text-anchor', 'end')
		// 	.attr('font-family', 'Inter, sans-serif')
		// 	.attr('fill', '#666')
		// 	.call((g) => {
		// 		g.append('tspan')
		// 			.attr('class', 'label')
		// 			.attr('font-size', '0.86rem')
		// 			.attr('font-weight', 200)
		// 			.text('more responsible ');
		// 		g.append('tspan')
		// 			.attr('class', 'arrow')
		// 			.attr('font-size', '1.2rem')
		// 			.attr('font-weight', 150)
		// 			.attr('dx', '0.3em')
		// 			.text('->');
		// });

		circles = vizG
			.append('g')
			.selectAll('circle')
			.data(
				countryData.map((d) => ({
					...d,
					x: xScaleLog(d.historical_emission),
					yTarget: margin.top + yScale(d.climate_vulnerability_index)
				}))
			)
			.enter()
			.append('circle')
			.attr('r', 6)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.yTarget)
			.attr('data-iso', (d) => d.country_iso3)
			.attr('fill', originalFill)
			.attr('stroke', (d) => (pacific.has(d.country_iso3) ? '#000' : 'fff'))
			.attr('stroke-width', 1)
			.attr('opacity', (d) => (pacific.has(d.country_iso3) ? 1 : 0.4))
			.on('mouseover', (e, d) => {
				if (selectedCountryName && d.country !== selectedCountryName) return;
				handleMouseOver(e, d);
				const xi = xClass(d.historical_emission);
				const yi = yClass(d.climate_vulnerability_index);
				highlightLegendCell(xi, yi);
			})
			.on('mousemove', (e, d) => {
				if (selectedCountryName && d.country !== selectedCountryName) return;
				updateTooltipPosition(e);
			})
			.on('mouseout', (e, d) => {
				if (selectedCountryName) {
					if (d.country === selectedCountryName) {
						hoveredChild = null;
					}
					return;
				}

				handleMouseOut(e, d);
				if (legendActive === null) {
					resetView();
				} else {
					highlightLegend(legendActive.xi, legendActive.yi);
				}
			});

		svg.on('click', (e) => {
			if (e.target.tagName.toLowerCase() !== 'circle') {
				legendActive = null;
				resetView();
			}
		});

		vizG
			.selectAll('.pacific-label')
			.data(
				countryData
					.map((d) => ({
						...d,
						x: xScaleLog(d.historical_emission),
						y: margin.top + yScale(d.climate_vulnerability_index)
					}))
					.filter((d) => pacific.has(d.country_iso3))
			)
			.enter()
			.append('text')
			.attr('class', 'pacific-label')
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y - 10)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('stroke', 'white')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-width', 3)
			.attr('paint-order', 'stroke fill')
			.style('fill', '#333')
			.style('stroke', 'white')
			.style('stroke-width', '2px')
			.style('stroke-linejoin', 'round')
			.style('paint-order', 'fill stroke')
			.style('pointer-events', 'none')
			.style('opacity', 1)
			.text((d) => d.country);

		countryLabel = vizG
			.append('text')
			.attr('class', 'country-label')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('fill', '#333')
			.style('pointer-events', 'none')
			.style('opacity', 0);

		svg.on('click', (e) => {
			if (e.target.tagName.toLowerCase() !== 'circle') {
				legendActive = null;
				resetView();
			}
		});

		const legendX = 640;
		const legendY = 80;

		const cellSize = 30;

		const legendData = [];
		bivariatePalette.forEach((row, yi) => {
			row.forEach((color, xi) => {
				legendData.push({ xi, yi, color });
			});
		});

		const legendG = vizG
			.append('g')
			.attr('class', 'bivariate-legend')
			.attr('transform', `translate(${legendX},${legendY})`);

		legendG
			.selectAll('rect')
			.data(legendData)
			.enter()
			.append('rect')
			.attr('x', (d) => d.xi * cellSize)
			.attr('y', (d) => (2 - d.yi) * cellSize)
			.attr('width', cellSize)
			.attr('height', cellSize)
			.attr('fill', (d) => d.color)
			.attr('stroke-width', 0);

		legendRects = legendG.selectAll('rect');

		legendRects
			.on('mouseover', (event, d) => {
				if (legendActive === null) highlightLegend(d.xi, d.yi);
			})
			.on('mouseout', (event, d) => {
				if (legendActive === null) resetView();
				else highlightLegend(legendActive.xi, legendActive.yi);
			})
			.on('click', (event, d) => {
				event.stopPropagation();
				legendActive = { xi: d.xi, yi: d.yi };
				highlightLegend(d.xi, d.yi);
			});

		const xLabelsData = [
			{ label: 'Low', xi: 0, x: cellSize * 0.5 },
			{ label: 'Moderate', xi: 1, x: cellSize * 1.5 },
			{ label: 'High', xi: 2, x: cellSize * 2.5 }
		];
		xLabels = legendG
			.selectAll('text.x-label')
			.data(xLabelsData)
			.enter()
			.append('text')
			.classed('x-label', true)
			.attr('x', (d) => d.x)
			.attr('y', cellSize * 3 + 18)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter')
			.attr('font-size', '0.72rem')
			.attr('fill', '#000')
			.attr('opacity', (d) => (d.label === 'Moderate' ? 0 : 0.4))
			.text((d) => d.label);

		const yLabelsData = [
			{ label: 'High', yi: 2, x: -cellSize * 0.5, y: cellSize * 0.5 },
			{ label: 'Moderate', yi: 1, x: -cellSize * 0.5, y: cellSize * 1.5 },
			{ label: 'Low', yi: 0, x: -cellSize * 0.5, y: cellSize * 2.5 }
		];
		yLabels = legendG
			.selectAll('text.y-label')
			.data(yLabelsData)
			.enter()
			.append('text')
			.classed('y-label', true)
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter')
			.attr('font-size', '0.72rem')
			.attr('fill', '#000')
			.attr('opacity', (d) => (d.label === 'Moderate' ? 0 : 0.4))
			.attr('transform', (d) => `rotate(-90, ${d.x}, ${d.y})`)
			.text((d) => d.label);

		const legendText = legendG
			.append('text')
			.attr('x', cellSize * 1.5)
			.attr('y', cellSize * 3 + 42)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter')
			.attr('font-size', '0.72rem')
			.attr('fill', '#000')
			.attr('opacity', 0.6);

		legendText.append('tspan').text('Historical CO');

		legendText.append('tspan').text('2').attr('baseline-shift', 'sub').attr('font-size', '0.6em');

		legendText
			.append('tspan')
			.attr('x', cellSize * 1.5)
			.attr('dy', '1.2em')
			.text('Emission');

		legendG
			.append('text')
			.attr('x', cellSize * -0.5 - 24)
			.attr('y', cellSize * 1.5)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter')
			.attr('font-size', '0.72rem')
			.attr('fill', '#000')
			.attr('opacity', 0.6)
			.attr('transform', `rotate(-90, ${cellSize * -0.5 - 24}, ${cellSize * 1.5})`)
			.text('Vulnerability');

		pacificLabelsG.raise();
	});
</script>

<div class="chart-wrapper">
	<div class="search-container" on:click|stopPropagation>
		<input type="text" placeholder="Select a country..." bind:value={searchTerm} />
		{#if suggestions.length}
			<ul class="dropdown">
				{#each suggestions as country}
					<li on:click={() => selectCountry(country)}>
						{country}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="scatter-log-chart" bind:this={chartContainer}></div>
</div>

{#if hoveredChild}
	<div class="tooltip" style="position: fixed; left: {tooltipX}px; top: {tooltipY}px;">
		<div class="country-name">{hoveredChild.country}</div>
		<div class="line-break-small"></div>
		<div>
			<span class="vuln-rank">#{vulnRank.get(hoveredChild.country_iso3)}</span>
			<span class="vuln-text"> most vulnerable </span>
		</div>
		<div>
			<span class="annot-text"> with a vulnerability index of </span>
			<span class="annot-num">
				{hoveredChild.climate_vulnerability_index.toFixed(2)}
			</span>
		</div>
		<div class="line-break-small"></div>
		<div>
			<span class="emm-rank">#{emissionRank.get(hoveredChild.country_iso3)}</span>
			<span class="emm-text"> most responsible </span>
		</div>
		<div>
			<span class="annot-text"> contributing </span>
			<span class="annot-num">
				{formatUnitTooltip(hoveredChild.historical_emission)} tons of CO₂
			</span>
		</div>
	</div>
{/if}

<style>
	.chart-wrapper {
		max-width: 800px;
		margin: 0 auto;
	}
	.search-container {
		position: relative;
		width: 30%;
		margin: 0 auto;
		margin-top: 2.8rem;
		margin-bottom: 2.8rem;
	}
	.search-container input {
		width: 100%;
		height: 0.64rem;
		padding: 0.5rem;
		font-size: 0.86rem;
		border: 1.5px solid rgba(0, 0, 0, 0.1);
		border-radius: 20px;
		transition:
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}
	.search-container input:focus {
		outline: none;
		border-color: #0d96f9;
		box-shadow: 0 0 8px rgba(0, 120, 255, 0.5);
	}
	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background: white;
		opacity: 0.95;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		margin-top: 0.25em;
		width: max-content;
		white-space: nowrap;
		overflow: visible;
		font-family: 'Inter', sans-serif;
		font-size: 0.86rem;
		font-weight: 350;
		z-index: 10;
		list-style: none;
		margin: 0;
		padding: 0.75em;
	}
	.dropdown li {
		opacity: 0.4;
		padding: 0.5em;
		color: #000;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}
	.dropdown li:hover {
		opacity: 1;
		font-weight: 450;
		background: #f0f0f0;
	}

	.tooltip {
		background: white;
		padding: 18px;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
		font-family: 'Inter', sans-serif;
		opacity: 0.9;
		z-index: 10;
		pointer-events: none;
	}
	.tooltip .country-name {
		font-size: 1rem;
		font-weight: bold;
		color: black;
	}
	.tooltip .vuln-rank,
	.tooltip .emm-rank {
		font-size: 0.86rem;
		font-weight: bold;
		color: black;
	}
	.tooltip .vuln-text,
	.tooltip .emm-text,
	.tooltip .annot-text {
		font-size: 0.86rem;
		color: black;
		opacity: 0.4;
		font-style: italic;
	}
	.tooltip .annot-num {
		font-size: 0.86rem;
		font-weight: 500;
		color: black;
		opacity: 0.8;
		font-style: italic;
	}
	.line-break-small {
		margin: 0.82rem 0;
	}
	.scatter-log-chart {
		width: 100%;
		height: 80vh;
		position: relative;
		background: white;
	}
	:global(.scatter-log-chart svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
