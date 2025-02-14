<script>
    import { onMount, onDestroy } from 'svelte';
    import * as d3 from 'd3';
    import { rankData } from '../data/fans_vs_rank.js';
  
    let svg;
  
    // Mapping for federation colors.
    const federationColor = {
        'UEFA': '#b22222',
        'AFC': '#383b69',
        'CAF': '#0c8c40',
        'CONCACAF': '#f7b742',
        'CONMEBOL': '#28aece',
        'OFC': '#ced7e1'
    };
  
    function drawChart() {
      // Clear any previous chart content.
      d3.select(svg).selectAll('*').remove();
  
      // Define margins.
      const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  
      // Cap maximum width at 720px.
      const containerWidth = Math.min(svg.clientWidth, 720);
      const width = containerWidth - margin.left - margin.right;
      // Using your ratio.
      const height = (width * 3) / 4;
  
      // Set up the responsive viewBox and dimensions.
      d3.select(svg)
        .attr(
          'viewBox',
          `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
        )
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
  
      // Determine if we are in mobile mode.
      const isMobile = window.innerWidth < 768;
      // Define tick intervals.
      const xTickInterval = isMobile ? 20 : 20; // same for both in this example
      const yTickInterval = isMobile ? 60 : 40;
  
      // Get data extents.
      const xDataExtent = d3.extent(rankData, d => d.pct_fans);
      const yDataExtent = d3.extent(rankData, d => d.rank);
  
      // Compute buffered domains using your formula:
      //   min x scale: min x data - xTickInterval/2
      //   max x scale: max x data + xTickInterval/2
      //   min y scale: min y data - yTickInterval/2
      //   max y scale: max y data + yTickInterval/2
      const xDomain = [
        xDataExtent[0] - xTickInterval / 2,
        xDataExtent[1] + xTickInterval / 2
      ];
      const yDomain = [
        yDataExtent[0] - yTickInterval / 2,
        yDataExtent[1] + yTickInterval / 2
      ];
  
      // Compute tick values (ruler) anchored at 0.
      const xMinTick = Math.floor(xDomain[0] / xTickInterval) * xTickInterval;
      const xMaxTick = Math.ceil(xDomain[1] / xTickInterval) * xTickInterval;
      const xTickValues = d3.range(xMinTick, xMaxTick + xTickInterval, xTickInterval);
  
      const yMinTick = Math.floor(yDomain[0] / yTickInterval) * yTickInterval;
      const yMaxTick = Math.ceil(yDomain[1] / yTickInterval) * yTickInterval;
      const yTickValues = d3.range(yMinTick, yMaxTick + yTickInterval, yTickInterval);
  
      // Create scales.
      const xScale = d3.scaleLinear().domain(xDomain).range([0, width]);
      const yScale = d3.scaleLinear().domain(yDomain).range([0, height]);
  
      const populationExtent = d3.extent(rankData, d => d.et_population);
      const rScale = d3.scaleSqrt().domain(populationExtent).range([3, 20]);
  
      // Create a group to account for margins.
      const g = d3.select(svg)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // --- GRID LINES ---
      // X-grid.
      const xGrid = g.append('g')
        .attr('class', 'x-grid')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3.axisBottom(xScale)
            .tickValues(xTickValues)
            .tickSize(-height)
            .tickFormat('')
        );
      xGrid.selectAll('line')
        .attr('stroke', '#ccc')
        .attr('stroke-dasharray', '2,2')
        .attr('opacity', 0.7);
      xGrid.select('path').remove();
  
      // Remove grid ticks at x = 0 and x = 100.
      xGrid.selectAll('.tick')
        .filter(d => d === 0 || d === 100)
        .remove();
  
      // Y-grid.
      const yGrid = g.append('g')
        .attr('class', 'y-grid')
        .call(
          d3.axisLeft(yScale)
            .tickValues(yTickValues)
            .tickSize(-width)
            .tickFormat('')
        );
      yGrid.selectAll('line')
        .attr('stroke', '#ccc')
        .attr('stroke-dasharray', '2,2')
        .attr('opacity', 0.7);
      yGrid.select('path').remove();
  
      // Remove grid ticks at y = 0 and y = 240.
      yGrid.selectAll('.tick')
        .filter(d => d === 0 || d === 240)
        .remove();
  
      // --- AXES ---
      // X-axis.
      const xAxisGroup = g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3.axisBottom(xScale)
            .tickValues(xTickValues)
        );
      xAxisGroup.select('.domain').remove();
      xAxisGroup.selectAll('.tick line').remove();
  
      // Remove x-axis tick and its text for x = 0 and x = 100.
      xAxisGroup.selectAll('.tick')
        .filter(d => d === 0 || d === 100)
        .remove();
  
      // Style the remaining tick text.
      xAxisGroup.selectAll('.tick text')
        .attr('font-family', 'Roboto')
        .attr('font-size', '10px')
        .attr('fill', '#666');
  
      // X-axis title.
      g.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', width)
        .attr('y', height + margin.bottom - 5)
        .attr('text-anchor', 'end')
        .attr('font-family', 'Roboto')
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text('% Fans Population');
  
      // Y-axis.
      const yAxisGroup = g.append('g')
        .attr('class', 'y-axis')
        .call(
          d3.axisLeft(yScale)
            .tickValues(yTickValues)
        );
      yAxisGroup.select('.domain').remove();
      yAxisGroup.selectAll('.tick line').remove();
  
      // Remove y-axis tick and its text for y = 0 and y = 240.
      yAxisGroup.selectAll('.tick')
        .filter(d => d === 0 || d === 240)
        .remove();
  
      // Style the remaining y-axis tick text.
      yAxisGroup.selectAll('.tick text')
        .attr('font-family', 'Roboto')
        .attr('font-size', '10px')
        .attr('fill', '#666');
  
      // Y-axis title.
      g.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -margin.top)
        .attr('y', -margin.left + 15)
        .attr('text-anchor', 'end')
        .attr('font-family', 'Roboto')
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text('FIFA Rank');
  
      // --- PLOT DATA POINTS ---
      g.selectAll('circle')
        .data(rankData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.pct_fans))
        .attr('cy', d => yScale(d.rank))
        .attr('r', d => rScale(d.et_population))
        .attr('fill', d => federationColor[d.federation] || 'steelblue')
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('opacity', 0.74);
  
      const federations = ["UEFA", "AFC", "CAF", "CONCACAF", "CONMEBOL", "OFC"];
      let totalLegendWidth = 0;

      federations.forEach(fed => {
        const textWidth = fed.length * 7; 
        const itemWidth = 10 + 5 + textWidth;
        totalLegendWidth += itemWidth + 15;
      });
      totalLegendWidth -= 15; // remove extra gap after last item
  
      const legend = g.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - totalLegendWidth}, ${height - 15})`);
  
      let xOffset = 0;
      federations.forEach(fed => {
        const textWidth = fed.length * 7; 
        const itemWidth = 10 + 5 + textWidth;
        const legendItem = legend.append("g")
          .attr("class", "legend-item")
          .attr("transform", `translate(${xOffset}, 0)`);
        legendItem.append("circle")
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 5)
            .attr("fill", federationColor[fed])
            .attr("stroke", "none");
        legendItem.append("text")
          .attr("x", 10 + 5)
          .attr("y", 10 - 1)
          .attr("font-family", "Roboto")
          .attr("font-size", "10px")
          .attr("fill", "#666")
          .text(fed);
        xOffset += itemWidth + 15;
      });
    }
  
    onMount(() => {
      drawChart();
      window.addEventListener('resize', drawChart);
    });
  
    onDestroy(() => {
      window.removeEventListener('resize', drawChart);
    });
  </script>
  
  <svg bind:this={svg}></svg>
  
  <style>
    /* The SVG scales responsively and is capped at 720px maximum width */
    svg {
      width: 100%;
      max-width: 720px;
      height: auto;
      display: block;
    }
  </style>
  