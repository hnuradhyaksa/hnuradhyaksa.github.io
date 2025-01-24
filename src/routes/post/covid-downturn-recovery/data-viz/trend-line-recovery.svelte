<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { data } from '../data/recovery_trend.js';

    let groupedData = Object.entries(
    data.reduce((acc, d) => {
      acc[d.parent_sector_eng] = acc[d.parent_sector_eng] || {};
      acc[d.parent_sector_eng][d.sector_eng] = acc[d.parent_sector_eng][d.sector_eng] || [];
      acc[d.parent_sector_eng][d.sector_eng].push(d);
      return acc;
    }, {})
  );

  let chartRefs = {};

  onMount(() => {
    // Area chart
    groupedData.forEach(([parent, sectors]) => {
      Object.entries(sectors).forEach(([sector, sectorData]) => {
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 210 - margin.left - margin.right;
        const height = 160 - margin.top - margin.bottom;

        const svg = d3.select(chartRefs[sector])
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const recovery_status = sectorData[sectorData.length - 1]?.recovery_status;
      
        const color = getRecoveryColor(recovery_status);
        const bandColor = '#d63127';

      // Create distinct groups for layering
        const gridGroup = svg.append('g').attr('class', 'grid-group');
        const lineGroup = svg.append('g').attr('class', 'area-group');
        const axisGroup = svg.append('g').attr('class', 'axis-group');

        const x = d3.scaleLinear()
          .domain(d3.extent(sectorData, d => d.year))
          .range([0, width]);

        const y = d3.scaleLinear()
          .domain(d3.extent(sectorData, d => d.value))
          .range([height, 0]);

        // Append grid lines to the grid group
        gridGroup.append('g')
          .attr('class', 'grid x-grid')
          .attr('transform', `translate(0,${height})`)
          .call(
            d3.axisBottom(x)
              .ticks(3)
              .tickSize(-height)
              .tickFormat(() => '')
          )
          .selectAll('.tick line')
          .attr('stroke', '#ccc')
          .attr('stroke-dasharray', '2,2')
          .attr('opacity', 0.7);

        gridGroup.append('g')
          .attr('class', 'grid y-grid')
          .call(
            d3.axisLeft(y)
              .ticks(4)
              .tickSize(-width)
              .tickFormat(() => '')
          )
          .selectAll('.tick line')
          .attr('stroke', '#ccc')
          .attr('stroke-dasharray', '2,2')
          .attr('opacity', 0.7);

        // Append the area chart to the area group
        lineGroup.append('path')
          .datum(sectorData)
          .attr('class', 'line')
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2.5)
          .attr('d', d3.line()
            .x(d => x(d.year))
            .y(d => y(d.value))
          );

        let hoverCircle = svg.append('circle')
          .attr('r', 3) 
          .attr('fill', color)
          .style('opacity', 0)
          .style('pointer-events', 'none');

        svg.on('mousemove', function (event) {
          const mouseX = d3.pointer(event)[0]; // Get the x-coordinate of the mouse
          const closestYear = Math.round(x.invert(mouseX)); // Snap to the nearest year
          const closestData = sectorData.find(d => d.year === closestYear); // Find the data point for the closest year

          if (closestData) {
            hoverCircle
              .attr('cx', x(closestData.year))
              .attr('cy', y(closestData.value))
              .style('opacity', 1); // Ensure the circle is visible

            // Update the year and value dynamically for the hovered sector
            updateYearValue(sector, closestData.year, closestData.value);
          }
        })
        .on('mouseleave', function () {
          // Hide the circle only when the mouse leaves the chart area
          hoverCircle.style('opacity', 0);

          // Reset to the most recent data point when not hovered
          const mostRecentData = sectorData[sectorData.length - 1];
          updateYearValue(sector, mostRecentData.year, mostRecentData.value);
        });

        // Append axes to the axis group
        axisGroup.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x).ticks(3).tickSize(5).tickFormat(d3.format('d')))
          .selectAll('text')
          .style('font-family', 'Roboto')
          .style('font-size', '10')
          .style('fill', '#666')
          .style('text-anchor', 'center');

        axisGroup.append('g')
          .call(d3.axisLeft(y).ticks(4).tickSize(5))
          .selectAll('text')
          .style('font-family', 'Roboto')
          .style('font-size', '10')
          .style('fill', '#666')
          .style('text-anchor', 'end');

        axisGroup.selectAll('.tick line')
          .style('stroke', '#ccc')
        
        lineGroup.append('rect')
          .attr('x', x(2019))
          .attr('y',0)
          .attr('width', x(2020) - x(2019))
          .attr('height', height)
          .attr('fill', bandColor)
          .attr('opacity', 0.07);

        gridGroup.selectAll('.domain').remove();
        lineGroup.selectAll('.domain').remove();
        axisGroup.selectAll('.domain').remove();
      });
    });
  });

  const getRecoverySymbol = (recovery_status) => {
          switch (recovery_status) {
            case 1: return '↗';
            case 2: return '→';
            case 3: return '↘';
            case 4: return '↓';
            default: return '';
          }
        };

  const getRecoveryColor = (recovery_status) => {
          switch (recovery_status) {
            case 1: return '#1a9850';
            case 2: return '#67bc63';
            case 3: return '#f46c42';
            case 4: return '#d63127';
            default: return '#aeaeae';
          }
        };

  function updateYearValue(sector, year, value) {
  const sectorElement = document.querySelector(`.sector[data-sector="${sector}"]`);
  if (sectorElement) {
    const yearElement = sectorElement.querySelector('.year-display');
    const valueElement = sectorElement.querySelector('.value-display');

    if (yearElement) {
      yearElement.textContent = `GRDP in ${year}:`;
    }

    if (valueElement) {
      valueElement.textContent = `${value.toLocaleString('en-US')} Billion Rupiah`;
    }
  }
}
</script>

<div>
  {#each groupedData as [parent, sectors]}
    <div class="parent-group">
      <p>{parent}</p>
    </div>
      <div class="grid">
        {#each Object.entries(sectors) as [sector, sectorData]}
          <div class="sector" data-sector="{sector}">
            <p>{sector}</p>
            <div class="recovery-status">
              <span style="color: {getRecoveryColor(sectorData[sectorData.length - 1]?.recovery_status)}">
                {getRecoverySymbol(sectorData[sectorData.length - 1]?.recovery_status)} &ThinSpace;
              </span>
              <span class="value" style="font-weight: 500">
                {sectorData[sectorData.length - 1]?.recovery_category}
              </span>
            </div>
            <div class="value">
              <p class="year-display">GRDP in {sectorData[sectorData.length - 1]?.year}:</p>
              <p class="value-display">{sectorData[sectorData.length - 1]?.value?.toLocaleString('en-US')} Billion Rupiah</p>
            </div>
            <svg bind:this={chartRefs[sector]} data-sector="{sector}"></svg>
          </div>
        {/each}
      </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 720px;
  }
  .parent-group {
    margin-bottom: 20px;
    font-family: 'Vollkorn';
    font-style: italic;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .sector {
    margin-bottom: 10px;
    font-family: 'Roboto';
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .recovery-status {
    font-family: 'Inter';
    font-size: 0.7rem;
    font-weight: 350;
    line-height: 0.8rem;
  }
  .value {
    margin-bottom: 5px;
    font-family: 'Roboto';
    font-size: 0.7rem;
    font-weight: 350;
    line-height: 0.4rem;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
