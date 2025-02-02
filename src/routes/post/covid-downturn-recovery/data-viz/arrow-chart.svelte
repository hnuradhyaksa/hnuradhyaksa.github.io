<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import { data as fullData } from '../data/covid_downturn.js';
  import { base } from '$app/paths';

  let svg;
  let isMiddleVisible = false;
  let displayedData = [];

  // Define overall responsive dimensions.
  let totalWidth = 720;
  // Reserve a fixed proportion for labels (e.g., 30%) and the rest for the plotting area.
  const labelRatio = 0.4; // 30% for labels
  const graphRatio = 0.6; // 70% for plotting area

  // Fixed margins for top, right, and bottom.
  const margin = { top: 50, right: 50, bottom: 50, left: 0 }; // left will be computed dynamically

  // These will be computed from totalWidth.
  let labelMaxWidth = 0; // maximum width available for y-axis labels (for truncation)
  let chartWidth = 0;    // width of the plotting area (totalWidth - margin.left - margin.right)

  const updateDimensions = () => {
    totalWidth = Math.min(window.innerWidth * 0.9, 720);
    margin.left = totalWidth * labelRatio;
    chartWidth = totalWidth - margin.left;
    labelMaxWidth = margin.left - 10;
  };

  // Returns a color based on percent change.
  const getColor = (pct_change) =>
    pct_change > 0 ? '#bad72e' : pct_change < 0 ? '#e74c3c' : '#f9f7f0';

  // Filter the data based on whether the middle group is visible.
  const updateData = () => {
    const top5 = fullData.filter((d) => d.rank_top <= 5);
    const bottom5 = fullData.filter((d) => d.rank_bottom <= 5);
    const middle = fullData.filter((d) => !top5.includes(d) && !bottom5.includes(d));
    displayedData = isMiddleVisible ? [...top5, ...middle, ...bottom5] : [...top5, ...bottom5];
  };


  const truncateText = (selection, maxWidth) => {
    selection.each(function () {
      const textElem = d3.select(this);
      let textContent = textElem.text();
      if (this.getComputedTextLength() <= maxWidth) return;

      const ellipsis = '...';
      let truncated = textContent;
      while (this.getComputedTextLength() > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
        textElem.text(truncated + ellipsis);
      }
    });
  };

  // Main function to render the chart.
  const renderChart = () => {
    // Group the data.
    const top5 = displayedData.filter((d) => d.rank_top <= 5);
    const bottom5 = displayedData.filter((d) => d.rank_bottom <= 5);
    const middle = isMiddleVisible
      ? displayedData.filter((d) => !top5.includes(d) && !bottom5.includes(d))
      : [];
    // Determine chart height based on number of rows.
    const numRows = displayedData.length;
    const rowHeight = 20; // Fixed row height
    const height = numRows * rowHeight + margin.top + margin.bottom;

    // Sort data for consistent ordering.
    const sortedData = displayedData.sort((b, a) => a.pct_change - b.pct_change);

    // Compute the xScale domain.
    const domainMin = d3.min(sortedData, (d) => d.pct_change) - 4;
    const domainMax = d3.max(sortedData, (d) => d.pct_change) + 4;
    // Choose a tick interval based on totalWidth.
    const tickInterval = totalWidth >= 720 ? 10 : 20;
    // Generate tick values.
    const tickValues = d3.range(
      Math.ceil(domainMin / tickInterval) * tickInterval,
      domainMax + tickInterval,
      tickInterval
    );

    // Define the xScale using the plotting area's width.
    const xScale = d3
      .scaleLinear()
      .domain([domainMin, domainMax])
      .range([0, chartWidth]);

    // Define the yScale using the sorted data.
    const yScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.sector_eng))
      .range([0, numRows * rowHeight])
      .padding(0.5);

    // Clear previous SVG content.
    d3.select(svg).selectAll('*').remove();

    const svgElement = d3
      .select(svg)
      .attr('width', totalWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svgElement
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(tickValues)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(() => '')
      )
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .selectAll('.tick line')
      .attr('stroke', (d) => (d === 0 ? '#000' : '#ccc'))
      .attr('stroke-width', (d) => (d === 0 ? 0.6 : 1))
      .attr('stroke-dasharray', (d) => (d === 0 ? 'none' : '2,2'))
      .attr('opacity', 0.7);

    // ---- X-Axis (Bottom) ----
    svgElement
      .append('g')
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(tickValues)
          .tickSize(0)
          .tickFormat((d) => `${d}%`)
      )
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '10')
      .style('fill', '#666')
      .style('text-anchor', 'middle');

    // ---- X-Axis (Top) ----
    svgElement
      .append('g')
      .call(
        d3
          .axisTop(xScale)
          .tickValues(tickValues)
          .tickSize(0)
          .tickFormat((d) => `${d}%`)
      )
      .attr('transform', `translate(0,2)`)
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '10')
      .style('fill', '#666')
      .style('text-anchor', 'middle');

    // ---- Y-Axis Grid Lines ----
    // Grid lines span the plotting area (chartWidth).
    svgElement
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => '')
      )
      .selectAll('.tick line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', 0.7);

    // ---- Y-Axis with Truncated Labels ----
    // Instead of wrapping, we truncate the text if it exceeds labelMaxWidth.
    const yAxisGroup = svgElement
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0)
          .tickFormat((d) => d)
      );
    yAxisGroup
      .selectAll('text')
      .style('font-family', 'Roboto')
      .style('font-size', '11')
      .style('fill', '#666')
      .style('text-anchor', 'end')
      .call(truncateText, labelMaxWidth);

    // Remove the default domain path.
    d3.select(svgElement.node()).selectAll('.domain').remove();

    // ---- Define Markers for Arrowheads ----
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

    // ---- Draw Arrows for Each Data Entry ----
    svgElement
      .selectAll('.arrow')
      .data(sortedData)
      .enter()
      .append('line')
      .attr('class', 'arrow')
      .attr('x1', (d) => xScale(0))
      .attr('x2', (d) => xScale(d.pct_change))
      .attr('y1', (d) => yScale(d.sector_eng) + yScale.bandwidth() / 2)
      .attr('y2', (d) => yScale(d.sector_eng) + yScale.bandwidth() / 2)
      .attr(
        'marker-end',
        (d) =>
          d.pct_change > 0
            ? 'url(#arrow-green)'
            : d.pct_change < 0
            ? 'url(#arrow-red)'
            : null
      )
      .attr('stroke', (d) => getColor(d.pct_change))
      .attr('stroke-width', 4.5);

    // ---- Expand/Collapse Cosmetic Markers ----
    const top5rank = sortedData.find((d) => d.rank_top === 5);
    const bottom5rank = sortedData.find((d) => d.rank_bottom === 5);
    const top5Y = top5rank ? yScale(top5rank.sector_eng) + yScale.bandwidth() + 4 : 0;
    const bottom1Y = bottom5rank ? yScale(bottom5rank.sector_eng) - 4 : 0;

    if (top5rank) {
      svgElement
        .append('line')
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', top5Y)
        .attr('y2', top5Y)
        .attr('stroke', '#dbdbdb')
        .attr('stroke-width', 1);
    }

    if (bottom5rank) {
      svgElement
        .append('line')
        .attr('x1', 0)
        .attr('x2', chartWidth)
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
        .attr('x', chartWidth - 12)
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
        .attr('x', chartWidth - 12)
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


  const handleResize = () => {
    updateDimensions();
    renderChart();
  };

  onMount(() => {
    updateDimensions();
    updateData();
    renderChart();
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<svg bind:this={svg}></svg>
