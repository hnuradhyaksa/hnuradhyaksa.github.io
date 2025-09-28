<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	const dataSteps = [
		{
			description:
				'As the planet warms, climate extremes grow more common. Each country has different exposure levels and preparedness capacities',
			value: 30,
			color: '#4682b4'
		},
		{ description: 'Some countries are more vulnerable than others', value: 60, color: '#d9534f' },
		{ description: 'including Pacific island nations...', value: 100, color: '#5cb85c' },
		{
			description: '...despite having such a small CO₂ footprint...',
			value: 100,
			color: '#5cb85c'
		},
		{ description: '...that barely contributing at all', value: 100, color: '#5cb85c' }
	];

	let stepElements = [];

	import { data as rawCountryData } from '../data/country_vuln_emmi.js';

	let chartContainer;

	let currentStep = 0;
	let previousStep = 0;

	let vizGroup, yAxisGroup, circles, labels, xAxisLogGroup, xAxisLinearGroup, moreLabel, lessLabel;

	let xScaleLog, xScaleLin, xClass, yClass, margin;

	let nodes, vulnExtent, pacificCodes, bivariatePalette;

	let getRightX;

	let hasCrawled = false;
	function recolorAndShowAxis() {
		if (hasCrawled) return;
		hasCrawled = true;

		yAxisGroup.transition().duration(600).attr('opacity', 1);
		vizGroup.select('.y-axis-title').transition().duration(600).attr('opacity', 1);
		vizGroup.select('.y-axis-more').transition().delay(200).duration(600).attr('opacity', 1);
		vizGroup.select('.y-axis-less').transition().delay(200).duration(600).attr('opacity', 1);

		const colorScale = d3.scaleLinear().domain(vulnExtent).range(['#FFF7EC', '#D7301F']);
		const sorted = nodes
			.map((node, i) => ({ v: node.vulnerability, index: i }))
			.sort((a, b) => a.v - b.v);

		sorted.forEach((item, rank) => {
			circles
				.filter((d, i) => i === item.index)
				.transition()
				.delay(rank * 5)
				.duration(300)
				.attr('fill', () => {
					const node = nodes[item.index];
					const xi = xClass(node.historical_emission);
					const yi = yClass(node.vulnerability);
					return bivariatePalette[yi][xi];
				})
				.attr('stroke', '#fff')
				.attr('stroke-width', 1)
				.attr('opacity', 1);
		});
	}

	function revertRecolorAndHideAxis() {
		if (!hasCrawled) return;
		hasCrawled = false;

		const sorted = nodes
			.map((node, i) => ({ v: node.vulnerability, index: i }))
			.sort((a, b) => a.v - b.v);
		const reversed = sorted.slice().reverse();

		reversed.forEach((item, rank) => {
			circles
				.filter((d, i) => i === item.index)
				.transition()
				.delay(rank * 5)
				.duration(300)
				.attr('fill', '#ccc')
				.attr('stroke', null)
				.attr('stroke-width', 0)
				.attr('opacity', 0.4);
		});

		yAxisGroup.transition().duration(600).attr('opacity', 0);
		vizGroup.select('.y-axis-title').transition().duration(600).attr('opacity', 0);
		vizGroup.select('.y-axis-more').transition().duration(600).attr('opacity', 0);
		vizGroup.select('.y-axis-less').transition().duration(600).attr('opacity', 0);
	}

	let hasHighlightedPI = false;
	function highlightPacific() {
		if (hasHighlightedPI) return;
		hasHighlightedPI = true;

		circles
			.filter((d) => !pacificCodes.has(d.iso3))
			.transition()
			.duration(500)
			.attr('fill', '#ccc')
			.attr('opacity', 0.4);

		circles
			.filter((d) => pacificCodes.has(d.iso3))
			.transition()
			.duration(500)
			.attr('fill', (d) => {
				const xi = xClass(d.historical_emission);
				const yi = yClass(d.vulnerability);
				return bivariatePalette[yi][xi];
			})
			.attr('opacity', 1)
			.attr('stroke', '#000')
			.attr('stroke-width', 1.5);

		labels.transition().delay(200).duration(500).attr('opacity', 1);
	}

	function revertHighlightPacific() {
		if (!hasHighlightedPI) return;
		hasHighlightedPI = false;

		circles
			.transition()
			.duration(500)
			.attr('fill', (d) => {
				const xi = xClass(d.historical_emission);
				const yi = yClass(d.vulnerability);
				return bivariatePalette[yi][xi];
			})
			.attr('opacity', 1)
			.attr('stroke', null)
			.attr('stroke-width', 0);

		labels.transition().duration(500).attr('opacity', 0);
	}

	let hasShownScatter = false;
	function showScatter() {
		if (hasShownScatter) return;
		hasShownScatter = true;

		xAxisLogGroup.transition().duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-title').transition().delay(200).duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-less').transition().delay(200).duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-more').transition().delay(200).duration(600).attr('opacity', 1);

		circles
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('cx', (d) => xScaleLog(d.historical_emission));

		labels
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('x', (d) => xScaleLog(d.historical_emission));
	}

	function revertShowScatter() {
		if (!hasShownScatter) return;
		hasShownScatter = false;

		circles
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('cx', (d) => d.x);

		labels
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('x', (d) => d.x);

		xAxisLogGroup.transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-title').transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-less').transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-more').transition().duration(600).attr('opacity', 0);
	}

	let hasSwitchedScale = false;
	function switchToLinearScale() {
		if (hasSwitchedScale) return;
		hasSwitchedScale = true;

		xAxisLogGroup.transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-title').transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-less').transition().duration(600).attr('opacity', 0);
		xAxisLogGroup.select('.x-axis-more').transition().duration(600).attr('opacity', 0);

		xAxisLinearGroup.transition().duration(600).attr('opacity', 1);
		xAxisLinearGroup
			.select('.x-axis-title')
			.transition()
			.delay(200)
			.duration(600)
			.attr('opacity', 1);
		xAxisLinearGroup
			.select('.x-axis-less')
			.transition()
			.delay(200)
			.duration(600)
			.attr('opacity', 1);
		xAxisLinearGroup
			.select('.x-axis-more')
			.transition()
			.delay(200)
			.duration(600)
			.attr('opacity', 1);

		circles
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('cx', (d) => xScaleLin(d.historical_emission));

		labels
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('x', (d) => xScaleLin(d.historical_emission));

		const targetX = getRightX(200);
		if (moreLabel) {
			moreLabel.transition().duration(1000).ease(d3.easeCubic).attr('x', targetX);
		}
		if (lessLabel) {
			lessLabel.transition().duration(1000).ease(d3.easeCubic).attr('x', targetX);
		}
	}

	function revertSwitchToLinearScale() {
		if (!hasSwitchedScale) return;
		hasSwitchedScale = false;

		xAxisLinearGroup.transition().duration(600).attr('opacity', 0);
		xAxisLinearGroup.select('.x-axis-title').transition().duration(600).attr('opacity', 0);
		xAxisLinearGroup.select('.x-axis-less').transition().duration(600).attr('opacity', 0);
		xAxisLinearGroup.select('.x-axis-more').transition().duration(600).attr('opacity', 0);

		xAxisLogGroup.transition().duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-title').transition().delay(200).duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-less').transition().delay(200).duration(600).attr('opacity', 1);
		xAxisLogGroup.select('.x-axis-more').transition().delay(200).duration(600).attr('opacity', 1);

		circles
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('cx', (d) => xScaleLog(d.historical_emission));

		labels
			.transition()
			.duration(1000)
			.ease(d3.easeCubic)
			.attr('x', (d) => xScaleLog(d.historical_emission));

		if (moreLabel) {
			moreLabel.transition().duration(1000).ease(d3.easeCubic).attr('x', margin.left);
		}
		if (lessLabel) {
			lessLabel.transition().duration(1000).ease(d3.easeCubic).attr('x', margin.left);
		}
	}

	function updateVisualization(activeStep) {
		if (activeStep >= 1) {
			recolorAndShowAxis();
		} else {
			revertRecolorAndHideAxis();
		}

		if (activeStep >= 2) {
			highlightPacific();
		} else {
			revertHighlightPacific();
		}

		if (activeStep >= 3) {
			showScatter();
		} else {
			revertShowScatter();
		}

		if (activeStep >= 4) {
			switchToLinearScale();
		} else {
			revertSwitchToLinearScale();
		}
	}

	$: updateVisualization(currentStep);

	function drawChart() {
		d3.select(chartContainer).select('svg').remove();
	}

	onMount(() => {
		const countryData = rawCountryData.filter((d) => d.climate_vulnerability_index != null);
		const viewportWidth = chartContainer.clientWidth;
		const viewportHeight = chartContainer.clientHeight;

		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%');

		const vizTotalWidth = 800;
		const offsetX = Math.max(0, (viewportWidth - vizTotalWidth) / 2);

		getRightX = (pad = 30) => {
			const totalW = chartContainer.clientWidth;
			return totalW - offsetX - pad;
		};

		margin = { top: 180, right: 60, bottom: 180, left: 60 };
		const vizInnerWidth = vizTotalWidth - margin.left - margin.right;
		const vizInnerHeight = viewportHeight - margin.top - margin.bottom;

		vulnExtent = d3.extent(countryData, (d) => d.climate_vulnerability_index);
		const yScale = d3.scaleLinear().domain(vulnExtent).range([vizInnerHeight, 0]);

		const yDomainMin = vulnExtent[0];
		const yMinPixel = margin.top + yScale(yDomainMin);

		const tickMin = Math.floor(vulnExtent[0] * 10) / 10;
		const tickMax = Math.ceil(vulnExtent[1] * 10) / 10;
		const tickVals = d3.range(tickMin, tickMax + 0.0001, 0.1).map((v) => +v.toFixed(1));
		const innerTickVals = tickVals.filter((v) => v !== tickMin && v !== tickMax);

		vizGroup = svg.append('g').attr('transform', `translate(${offsetX}, 0)`);

		const yAxis = d3
			.axisLeft(yScale)
			.tickValues(innerTickVals)
			.tickFormat(d3.format('.1f'))
			.tickSize(-vizInnerWidth);

		yAxisGroup = vizGroup
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
			.call(yAxis)
			.attr('opacity', 0);

		yAxisGroup.selectAll('.tick line').attr('stroke', '#ddd').attr('stroke-opacity', 0.6);
		yAxisGroup.select('.domain').remove();
		yAxisGroup
			.selectAll('.tick text')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.8rem')
			.attr('text-anchor', 'start')
			.attr('fill', '#666')
			.attr('dx', '0.28em')
			.attr('dy', '-0.6em');

		vizGroup
			.append('text')
			.attr('x', margin.left)
			.attr('y', margin.top + yScale(tickMax))
			.attr('dy', '-0.6em')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.86rem')
			.attr('font-weight', 750)
			.attr('fill', '#333')
			.text(`Climate Change Vulnerability Index`)
			.attr('opacity', 0)
			.attr('class', 'y-axis-title');

		const secondTick = tickMax - 0.1;
		const thirdTick = secondTick - 0.1;
		moreLabel = null;
		lessLabel = null;
		if (secondTick >= tickMin) {
			const yTop = margin.top + yScale(secondTick);
			const ySecond = margin.top + yScale(thirdTick);
			moreLabel = vizGroup
				.append('text')
				.attr('x', margin.left)
				.attr('y', (yTop + ySecond) / 2)
				.attr('text-anchor', 'start')
				.attr('font-family', 'Inter, sans-serif')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'y-axis-more');

			moreLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.text('↑');

			moreLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.text(' more vulnerable');
		}

		const secondFromBottom = tickMin + 0.1;
		const thirdFromBottom = secondFromBottom + 0.1;
		if (secondFromBottom <= tickMax) {
			const yBottom = margin.top + yScale(secondFromBottom);
			const yNext = margin.top + yScale(thirdFromBottom);
			lessLabel = vizGroup
				.append('text')
				.attr('x', margin.left)
				.attr('y', (yBottom + yNext) / 2)
				.attr('text-anchor', 'start')
				.attr('font-family', 'Inter')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'y-axis-less');

			lessLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.text('↓');

			lessLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.text(' less vulnerable');
		}

		const nodeRadius = 6;
		nodes = countryData.map((d) => ({
			country: d.country,
			iso3: d.country_iso3,
			vulnerability: d.climate_vulnerability_index,
			historical_emission: d.historical_emission,
			x: margin.left + vizInnerWidth / 2,
			yTarget: margin.top + yScale(d.climate_vulnerability_index),
			r: nodeRadius
		}));

		const nodeGroup = vizGroup.append('g');

		circles = nodeGroup
			.selectAll('circle')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('r', nodeRadius)
			.attr('fill', '#ccc')
			.attr('opacity', 0.4)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.yTarget);

		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'y',
				d3
					.forceY()
					.y((d) => d.yTarget)
					.strength(1)
			)
			.force('x', d3.forceX(margin.left + vizInnerWidth / 2).strength(0.05))
			.force('collide', d3.forceCollide(nodeRadius + 1))
			.stop();
		for (let i = 0; i < 200; i++) simulation.tick();
		circles.attr('cx', (d) => d.x).attr('cy', (d) => d.yTarget);

		pacificCodes = new Set([
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
			'NCL'
		]);
		const piNodes = nodes.filter((d) => pacificCodes.has(d.iso3));
		labels = nodeGroup
			.selectAll('.pi-label')
			.data(piNodes)
			.enter()
			.append('text')
			.attr('class', 'pi-label')
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.yTarget - (nodeRadius + 4))
			.attr('text-anchor', 'middle')
			.attr('font-family', 'Inter, sans-serif')
			.attr('font-size', '0.8rem')
			.attr('fill', '#000')
			.attr('stroke', 'white')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-width', 3)
			.attr('paint-order', 'stroke fill')
			.attr('opacity', 0)
			.text((d) => d.country);

		const emissionExtent = d3.extent(nodes, (d) => d.historical_emission);
		const emissionMin = emissionExtent[0];
		const emissionMax = emissionExtent[1];

		let paddedMin = emissionMin / 2;
		paddedMin = Math.max(1, paddedMin);

		xClass = d3
			.scaleQuantile()
			.domain(nodes.map((d) => d.historical_emission))
			.range([0, 1, 2]);

		yClass = d3
			.scaleQuantile()
			.domain(nodes.map((d) => d.vulnerability))
			.range([0, 1, 2]);

		bivariatePalette = [
			['#ddd', '#ddd', '#ddd'],
			['#edc2c2', '#ddd', '#ddd'],
			['#e68e8e', '#ac7790', '#ddd']
		];

		const formatUnit = (d) => {
			if (d === 1e9) return '1 Giga';
			if (d === 1e6) return '1 Mega';
			if (d === 1e3) return '1 Kilo';
			if (d > 1e9) return (d / 1e9).toFixed(0);
			if (d > 1e6) return (d / 1e6).toFixed(0);
			if (d > 1e3) return (d / 1e3).toFixed(0);
			return d.toFixed(0);
		};

		xScaleLog;
		xScaleLin;

		xAxisLogGroup = vizGroup
			.append('g')
			.attr('transform', `translate(0, ${yMinPixel})`)
			.attr('opacity', 0);

		(() => {
			xScaleLog = d3
				.scaleLog()
				.domain([paddedMin, emissionMax])
				.range([margin.left, margin.left + vizInnerWidth]);

			const logAxis = d3
				.axisBottom(xScaleLog)
				.ticks(6, '~s')
				.tickFormat(formatUnit)
				.tickSize(-vizInnerHeight);

			xAxisLogGroup.call(logAxis);
			xAxisLogGroup.selectAll('.tick line').attr('stroke', '#ddd').attr('stroke-opacity', 0.6);
			xAxisLogGroup.select('.domain').remove();
			xAxisLogGroup
				.selectAll('.tick text')
				.attr('text-anchor', 'middle')
				.attr('font-family', 'Inter, sans-serif')
				.attr('font-size', '0.8rem')
				.attr('fill', '#666')
				.text(function (d) {
					return formatUnit(d);
				});
			xAxisLogGroup.selectAll('.tick text').each(function (d) {
				const label = formatUnit(d);
				let [num, unit] = label.includes(' ') ? label.split(' ') : [label, ''];
				d3.select(this).text(null);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '-0.2em').text(num);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '1em').text(unit);
			});

			xAxisLogGroup
				.append('text')
				.attr('x', margin.left + vizInnerWidth / 2)
				.attr('y', 14)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'middle')
				.attr('font-family', 'Inter, sans-serif')
				.attr('font-size', '0.86rem')
				.attr('font-weight', 750)
				.attr('fill', '#333')
				.text('[log] Historical Emission (Tons of CO2)')
				.attr('opacity', 0)
				.attr('class', 'x-axis-title');

			const logLessXLabel = xAxisLogGroup
				.append('text')
				.attr('x', margin.left)
				.attr('y', 20)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'start')
				.attr('font-family', 'Inter, sans-serif')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'x-axis-less');
			logLessXLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.text('<-');
			logLessXLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.attr('dx', '0.3em')
				.text('less responsible');

			const logMoreXLabel = xAxisLogGroup
				.append('text')
				.attr('x', margin.left + vizInnerWidth)
				.attr('y', 20)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'end')
				.attr('font-family', 'Inter, sans-serif')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'x-axis-more');
			logMoreXLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.text('more responsible ');
			logMoreXLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.attr('dx', '0.3em')
				.text('->');
		})();

		xAxisLinearGroup = vizGroup
			.append('g')
			.attr('transform', `translate(0, ${yMinPixel})`)
			.attr('opacity', 0);

		(() => {
			xScaleLin = d3
				.scaleLinear()
				.domain([emissionMin, emissionMax])
				.range([margin.left + 100, margin.left + vizInnerWidth - 100]);

			const linAxis = d3
				.axisBottom(xScaleLin)
				.ticks(6)
				.tickFormat(formatUnit)
				.tickSize(-vizInnerHeight);

			xAxisLinearGroup.call(linAxis);
			xAxisLinearGroup.selectAll('.tick line').attr('stroke', '#ddd').attr('stroke-opacity', 0.6);
			xAxisLinearGroup.select('.domain').remove();
			xAxisLinearGroup
				.selectAll('.tick text')
				.attr('text-anchor', 'middle')
				.attr('font-family', 'Inter, sans-serif')
				.attr('font-size', '0.8rem')
				.attr('fill', '#666')
				.text(function (d) {
					return formatUnit(d);
				});
			xAxisLinearGroup.selectAll('.tick text').each(function (d) {
				const label = formatUnit(d);
				let [num, unit] = label.includes(' ') ? label.split(' ') : [label, ''];
				d3.select(this).text(null);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '-0.2em').text(num);
				d3.select(this).append('tspan').attr('x', 0).attr('dy', '1em').text(unit);
			});

			xAxisLinearGroup
				.append('text')
				.attr('x', margin.left + vizInnerWidth / 2)
				.attr('y', 14)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'middle')
				.attr('font-family', 'Inter, sans-serif')
				.attr('font-size', '0.86rem')
				.attr('font-weight', 750)
				.attr('fill', '#333')
				.text('Historical Emission (Gigatons of CO2)')
				.attr('opacity', 0)
				.attr('class', 'x-axis-title');

			const linLessXLabel = xAxisLinearGroup
				.append('text')
				.attr('x', margin.left)
				.attr('y', 20)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'start')
				.attr('font-family', 'Inter, sans-serif')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'x-axis-less');
			linLessXLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.text('<-');
			linLessXLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.attr('dx', '0.3em')
				.text('less responsible');

			const linMoreXLabel = xAxisLinearGroup
				.append('text')
				.attr('x', margin.left + vizInnerWidth)
				.attr('y', 20)
				.attr('dy', '2.8em')
				.attr('text-anchor', 'end')
				.attr('font-family', 'Inter, sans-serif')
				.attr('fill', '#666')
				.attr('opacity', 0)
				.attr('class', 'x-axis-more');
			linMoreXLabel
				.append('tspan')
				.attr('class', 'label')
				.attr('font-size', '0.85rem')
				.attr('font-weight', 200)
				.text('more responsible ');
			linMoreXLabel
				.append('tspan')
				.attr('class', 'arrow')
				.attr('font-size', '1.2rem')
				.attr('font-weight', 150)
				.attr('dx', '0.3em')
				.text('->');
		})();

		const options = { root: null, threshold: 0.5 };
		const observer = new IntersectionObserver(
			(entries) => {
				const intersectingEntry = entries.find((entry) => entry.isIntersecting);

				if (intersectingEntry) {
					const newStep = Number(intersectingEntry.target.dataset.stepIndex);

					if (newStep !== currentStep) {
						previousStep = currentStep;
						currentStep = newStep;
					}
				}
			},
			{
				rootMargin: '-50% 0px -50% 0px',
				threshold: 0
			}
		);

		stepElements.forEach((el) => {
			if (el) observer.observe(el);
		});
	});
</script>

<div class="scrolly-container">
	<div class="graphic-wrapper" bind:this={chartContainer}></div>

	{#each dataSteps as step, i}
		<div
			class="text-step"
			class:is-active={i === currentStep}
			data-step-index={i}
			bind:this={stepElements[i]}
		>
			<div class="step-box"><p>{step.description}</p></div>
		</div>
	{/each}
</div>

<style>
	.scrolly-container {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
	}

	.graphic-wrapper {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: white;
		z-index: 0;
	}

	.text-step {
		font-family: Inter, sans-serif;
		font-size: 1.125rem;
		line-height: 1.58;
		font-weight: 350;
		position: relative;
		z-index: 10;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-box {
		display: inline-block;
		width: fit-content;
		max-width: 80%;
		background: white;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
		line-height: 1.58;
		opacity: 0.85;
		transition:
			transform 0.3s,
			border 0.3s;
	}

	.text-step.is-active .step-box {
		transform: scale(1.03);
	}

	@media (max-width: 640px) {
		.step-box {
			max-width: 90%;
		}
	}

	.scrolly-container > .text-step:nth-child(2) {
		margin-top: -100vh;
	}

	:global(.graphic-wrapper svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
