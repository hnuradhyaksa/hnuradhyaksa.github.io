<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { data as fullData } from '../data/covid_downturn.js';
  import {base} from '$app/paths';

  const margin = { top: 50, right: 50, bottom: 50, left: 320 };
  const width = 720 - margin.left - margin.right;

  let svg;
  let isMiddleVisible = false;
  let displayedData = [];

  const getColor = (pct_change) => {
    return pct_change > 0 ? '#bad72e' : pct_change < 0 ? '#e74c3c' : '#f9f7f0';
  };

  const updateData = () => {
    const top5 = fullData.filter((d) => d.rank_top <= 5);
    const bottom5 = fullData.filter((d) => d.rank_bottom <= 5);
    const middle = fullData.filter(
      (d) => !top5.includes(d) && !bottom5.includes(d)
    );

    displayedData = isMiddleVisible
      ? [...top5, ...middle, ...bottom5]
      : [...top5, ...bottom5];
  };

  const toggleMiddleVisibility = () => {
    isMiddleVisible = !isMiddleVisible;
    updateData();
    renderChart();
  };

  const renderChart = () => {
    const top5 = displayedData.filter((d) => d.rank_top <= 5);
    const bottom5 = displayedData.filter((d) => d.rank_bottom <= 5);
    const middle = isMiddleVisible
      ? displayedData.filter((d) => !top5.includes(d) && !bottom5.includes(d))
      : [];

    const height =
      (top5.length + middle.length + bottom5.length) * 20 +
      margin.top +
      margin.bottom;

      const sortedData = displayedData.sort((b, a) => a.pct_change - b.pct_change);

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(sortedData, (d) => d.pct_change) - 4,
        d3.max(sortedData, (d) => d.pct_change) + 4,
      ])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.sector_eng))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.5);

    d3.select(svg).selectAll('*').remove();

    const svgElement = d3
      .select(svg)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svgElement
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisBottom(xScale)
          .ticks(8)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(() => '')
      )
      .attr(
        'transform',
        `translate(0,${height - margin.top - margin.bottom})`
      )
      .selectAll('.tick line')
      .attr('stroke', (d) => (d === 0 ? '#000' : '#ccc'))
      .attr('stroke-width', (d) => (d === 0 ? 0.6 : 1))
      .attr('stroke-dasharray', (d) => (d === 0 ? 'none' : '2,2'))
      .attr('opacity', 0.7);

    svgElement
      .append('g')
      .call(
        d3.axisBottom(xScale)
          .ticks(8)
          .tickSize(0)
          .tickFormat((d) => `${d}%`)
      )
      .attr(
        'transform',
        `translate(0,${height - margin.top - margin.bottom})`
      )
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '10')
      .style('fill', '#666')
      .style('text-anchor', 'middle');

    svgElement
      .append('g')
      .call(
        d3.axisTop(xScale)
          .ticks(8)
          .tickSize(0)
          .tickFormat(d => `${d}%`)
      )
      .attr('transform', `translate(0,2)`)
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '10')
      .style('fill', '#666')
      .style('text-anchor', 'middle');
    
    // Y-axis grid
    svgElement
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('.tick line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', 0.7);

    svgElement
      .append('g')
      .call(
        d3.axisLeft(yScale)
          .tickSize(0)
          .tickFormat((d) => d)
      )
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '11')
      .style('fill', '#666')
      .style('text-anchor', 'end');

    svgElement
      .selectAll('.domain')
      .remove();

    svgElement
      .append('defs')
      .append('marker')
      .attr('id', 'arrow-red')
      .attr('viewBox', '-10 -10 20 20')
      .attr('markerWidth', 4.5)
      .attr('markerHeight', 4.5)
      .attr('orient', 'auto')
      .attr('fill', '#e74c3c')
      .attr('stroke', 'white')
      .append('path')
      .attr('d', 'M-6,-6 L3,0 L-6,6');

    svgElement
      .append('defs')
      .append('marker')
      .attr('id', 'arrow-green')
      .attr('viewBox', '-10 -10 20 20')
      .attr('markerWidth', 4.5)
      .attr('markerHeight', 4.5)
      .attr('orient', 'auto')
      .attr('fill', '#bad72e')
      .attr('stroke', 'white')
      .append('path')
      .attr('d', 'M-6,-6 L3,0 L-6,6');

    svgElement
      .selectAll('.arrow')
      .data(sortedData)
      .enter()
      .append('line')
      .attr('class', 'arrow')
      .attr('x1', (d) => xScale(0))
      .attr('x2', (d) => xScale(d.pct_change))
      .attr(
        'y1',
        (d) => yScale(d.sector_eng) + yScale.bandwidth() / 2
      )
      .attr(
        'y2',
        (d) => yScale(d.sector_eng) + yScale.bandwidth() / 2
      )
      .attr('marker-end', (d) =>
        d.pct_change > 0 ? 'url(#arrow-green)' : d.pct_change < 0 ? 'url(#arrow-red)' : null
      )
      .attr('stroke', (d) => getColor(d.pct_change))
      .attr('stroke-width', 4.5);
    
    //cosmetic for expand/collapse feature

    const top5rank = sortedData.find((d) => d.rank_top === 5 );
    const bottom5rank = sortedData.find((d) => d.rank_bottom === 5 );

    const top5Y = yScale(top5rank?.sector_eng) + yScale.bandwidth() + 4;
    const bottom1Y = yScale(bottom5rank?.sector_eng) - 4;

    // Draw horizontal line below the 5th rank_top
    if (top5rank) {
      svgElement
        .append('line')
        .attr('x1', 0)
        .attr('x2', width + 24)
        .attr('y1', top5Y)
        .attr('y2', top5Y)
        .attr('stroke', '#dbdbdb')
        .attr('stroke-width', 1);
    }

    // Draw horizontal line above the 5th rank_bottom
    if (bottom5rank) {
      svgElement
        .append('line')
        .attr('x1', 0)
        .attr('x2', width + 24)
        .attr('y1', bottom1Y)
        .attr('y2', bottom1Y)
        .attr('stroke', '#dbdbdb')
        .attr('stroke-width', 1);
    }

  const toparrowExpand = `${base}/icon/normal-down.svg`;
  const botarrowExpand = `${base}/icon/normal-up.svg`;
  const toparrowCollapse = `${base}/icon/normal-up.svg`;
  const botarrowCollapse = `${base}/icon/normal-down.svg`;

  const getTopArrowSVG = () => (isMiddleVisible ? toparrowExpand : toparrowCollapse);
  const getBottomArrowSVG = () => (isMiddleVisible ? botarrowExpand : botarrowCollapse);

  if (top5rank) {
    svgElement
      .append('image')
      .attr('xlink:href', getTopArrowSVG())
      .attr('x', width + 12)
      .attr('y', top5Y - 12) 
      .attr('width', 10)
      .attr('height', 10)
      .style('cursor', 'pointer')
      .on('click', () => {
        isMiddleVisible = !isMiddleVisible;
        updateData();
        renderChart();
      });
  }

  if (bottom5rank) {
    svgElement
      .append('image')
      .attr('xlink:href', getBottomArrowSVG())
      .attr('x', width + 12)
      .attr('y', bottom1Y + 2)
      .attr('width', 10)
      .attr('height', 10)
      .style('cursor', 'pointer')
      .on('click', () => {
        isMiddleVisible = !isMiddleVisible;
        updateData();
        renderChart();
      });
    }
    };

    onMount(() => {
      updateData();
      renderChart();
    });
</script>

<svg bind:this={svg}></svg>

<style>
</style>
