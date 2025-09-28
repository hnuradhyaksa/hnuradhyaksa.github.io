<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { data } from "../data/plant_addition.js";

  const formatCapacity = d3.format(",");

  function splitPlantName(name) {
    const safeName = name || "";
    const words = safeName.trim().split(/\s+/);
    if (words.length > 2) {
      const firstLine = words.slice(0, 2).join(" ");
      const secondLine = words.slice(2).join(" ");
      return [firstLine, secondLine];
    }
    return [safeName];
  }

  const filtered = data.filter(d => d.plant_name !== "Total plant addition");
  const groups = filtered.filter(d => d.level === 2);
  const groupDict = {};
  groups.forEach(g => {
    groupDict[g.id] = { ...g, children: [] };
  });
  filtered.forEach(d => {
    if (d.level === 3) {
      const parent = groupDict[d.parent_id];
      if (parent) {
        parent.children.push(d);
      }
    }
  });
  const groupData = Object.values(groupDict);

  const maxParentCapacity = d3.max(groupData, d => +d.capacity);
  const parentRadiusScale = d3.scaleSqrt()
    .domain([0, maxParentCapacity])
    .range([0, 140]);
  groupData.forEach(g => {
    g.radius = parentRadiusScale(+g.capacity);
  });

  groupData.forEach(g => {
    if (g.children.length) {
      const root = d3.hierarchy({ children: g.children }).sum(d => +d.capacity);
      const packLayout = d3.pack().padding(5).size([2 * g.radius, 2 * g.radius]);
      packLayout(root);
      g.packedChildren = root.children;
    }
  });

  let isMobile = false;
  onMount(() => {
    function handleResize() {
      isMobile = window.innerWidth < 600;
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const margin = 40;
  let totalWidth, totalHeight;

  $: {
  if (isMobile) {
    const verticalGap = 100;
    let yOffset = margin;
    groupData.forEach(g => {
      g.cx = margin + g.radius;
      g.cy = yOffset + g.radius;
      yOffset += 2 * g.radius + margin + verticalGap;
    });
    totalWidth = d3.max(groupData, g => 2 * g.radius) + 2 * margin;
    totalHeight = groupData.reduce((sum, g) => sum + 2 * g.radius, 0) + (groupData.length + 1) * (margin + verticalGap);
  } else {
    let xOffset = margin;
    groupData.forEach(g => {
      g.cx = xOffset + g.radius;
      g.cy = margin + g.radius;
      xOffset += 2 * g.radius + margin;
    });
    totalWidth = groupData.reduce((sum, g) => sum + 2 * g.radius, 0) + (groupData.length + 1) * margin;
    totalHeight = d3.max(groupData, g => 2 * g.radius) + 2 * margin;
  }
}

  let hoveredChild = null;
  let tooltipX = 0;
  let tooltipY = 0;

  function handleMouseOver(event, child) {
    hoveredChild = child.data;
    updateTooltipPosition(event);
  }

  function updateTooltipPosition(event) {
    tooltipX = event.clientX + 10;
    tooltipY = event.clientY + 10;
  }

  function handleMouseOut() {
    hoveredChild = null;
  }

  function getStatusBadgeStyle(status) {
    const isConstruction = status === 'construction';
    const isPrepermit = status === 'pre-permit';
    return `
      background: ${isConstruction ? '#bbb' : '#eee'};
      color: ${isConstruction ? '#fff' : '#bbb'};
      border: ${isPrepermit ? '2px solid #ccc' : 'none'};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 8px;
      border-radius: 12px;
      display: inline-block;
      font-size: 0.62rem;
      font-weight: 500;
    `;
  }
</script>

<style>
  .tooltip {
    position: fixed;
    pointer-events: none;
    background: white;
    padding: 8px;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    font-family: 'Roboto', sans-serif;
    z-index: 10;
  }
  .tooltip .plant-name {
    font-size: 1rem;
    font-weight: bold;
    color: black;
  }
  .tooltip .unit-name {
    font-size: 0.74rem;
    color: #919191;
    font-style: italic;
  }
  .tooltip .capacity {
    font-size: 1rem;
    color: black;
    font-weight: bold;
  }
  .tooltip .year {
    font-size: 0.74rem;
    color: #919191;
    font-style: italic;
  }
  .tooltip .line-break-small {
    margin: 0.82rem 0;
  }
  .tooltip .line-break-big {
    margin: 1rem 0;
  }
</style>

{#if isMobile}
  <!-- Mobile: vertical layout, responsive SVG -->
  <svg width="100%" height="auto" viewBox={`0 0 ${totalWidth} ${totalHeight}`} preserveAspectRatio="xMidYMid meet">
    <defs>
      <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M0,0 L4,4" stroke="black" stroke-width="2" />
      </pattern>
    </defs>
  
    {#each groupData as group}
      <g transform={`translate(${group.cx}, ${group.cy})`}>
        <circle r={group.radius} fill="#d9d9d9" stroke="none"></circle>
  
        <text text-anchor="middle" x="0" y={-group.radius - 20}
              style="font-family: Roboto, sans-serif; font-size: 0.74rem; font-weight: 600;"
              fill="#333">
          {#each splitPlantName(group.plant_name) as line, index}
            <tspan x="0" dy={index === 0 ? "0" : "1.2em"}>{line}</tspan>
          {/each}
        </text>
  
        <text text-anchor="middle" x="0" y={group.radius + 20}
              style="font-family: Roboto, sans-serif; font-size: 0.74rem;"
              fill="#7f7f7f">
          {formatCapacity(group.capacity)} Megawatts
        </text>
  
        {#if group.packedChildren}
          {#each group.packedChildren as child (child.data.id)}
            <g transform={`translate(${child.x - group.radius}, ${child.y - group.radius})`}
               on:mouseover={(event) => handleMouseOver(event, child)}
               on:mousemove={updateTooltipPosition}
               on:mouseout={handleMouseOut}>
              <circle 
                r={child.r} 
                fill={child.data.status === 'announced'
                        ? "#eee"
                        : child.data.status === 'pre-permit'
                          ? "#eee"
                          : child.data.status === 'construction'
                            ? "#bbb"
                            : "#ffffff"}
                stroke={hoveredChild && hoveredChild.id === child.data.id
                        ? "black"
                        : (child.data.status === 'pre-permit' ? "#ccc" : "none")}
                stroke-width={hoveredChild && hoveredChild.id === child.data.id
                        ? "1.5pt"
                        : (child.data.status === 'pre-permit' ? "1.5pt" : "0")}
              ></circle>
              {#if [4, 5, 8, 9, 22, 23, 26, 27, 28].includes(child.data.id)}
                <text text-anchor="middle" dominant-baseline="middle" fill="#333">
                  {#each child.data.plant_label.split("\n") as line, index}
                    <tspan 
                      x="0" 
                      dy={index === 0 ? "-0.4em" : "1.2em"} 
                      style="font-family: Roboto, sans-serif; font-size: 0.74rem;">
                      {line}
                    </tspan>
                  {/each}
                  <tspan 
                    x="0" 
                    dy="1.6em" 
                    style="font-family: Roboto, sans-serif; font-size: 0.6rem;" 
                    fill="#7f7f7f">
                    {child.data.unit_name}
                  </tspan>
                </text>
              {/if}
            </g>
          {/each}
        {/if}
      </g>
    {/each}
  </svg>
{:else}
  <!-- Desktop: horizontal layout, fixed size SVG -->
  <svg width={totalWidth} height={totalHeight}>
    <defs>
      <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M0,0 L4,4" stroke="black" stroke-width="2" />
      </pattern>
    </defs>
  
    {#each groupData as group}
      <g transform={`translate(${group.cx}, ${group.cy})`}>
        <circle r={group.radius} fill="#d9d9d9" stroke="none"></circle>
  
        <text text-anchor="middle" x="0" y={-group.radius - 20}
              style="font-family: Roboto, sans-serif; font-size: 0.74rem; font-weight: 600;"
              fill="#333">
          {#each splitPlantName(group.plant_name) as line, index}
            <tspan x="0" dy={index === 0 ? "0" : "1.2em"}>{line}</tspan>
          {/each}
        </text>
  
        <text text-anchor="middle" x="0" y={group.radius + 20}
              style="font-family: Roboto, sans-serif; font-size: 0.74rem;"
              fill="#7f7f7f">
          {formatCapacity(group.capacity)} Megawatts
        </text>
  
        {#if group.packedChildren}
          {#each group.packedChildren as child (child.data.id)}
            <g transform={`translate(${child.x - group.radius}, ${child.y - group.radius})`}
               on:mouseover={(event) => handleMouseOver(event, child)}
               on:mousemove={updateTooltipPosition}
               on:mouseout={handleMouseOut}>
              <circle 
                r={child.r} 
                fill={child.data.status === 'announced'
                        ? "#eee"
                        : child.data.status === 'pre-permit'
                          ? "#eee"
                          : child.data.status === 'construction'
                            ? "#bbb"
                            : "#ffffff"}
                stroke={hoveredChild && hoveredChild.id === child.data.id
                        ? "black"
                        : (child.data.status === 'pre-permit' ? "#ccc" : "none")}
                stroke-width={hoveredChild && hoveredChild.id === child.data.id
                        ? "1.5pt"
                        : (child.data.status === 'pre-permit' ? "1.5pt" : "0")}
              ></circle>
              {#if [4, 5, 8, 9, 22, 23, 26, 27, 28].includes(child.data.id)}
                <text text-anchor="middle" dominant-baseline="middle" fill="#333">
                  {#each child.data.plant_label.split("\n") as line, index}
                    <tspan 
                      x="0" 
                      dy={index === 0 ? "-0.4em" : "1.2em"} 
                      style="font-family: Roboto, sans-serif; font-size: 0.74rem;">
                      {line}
                    </tspan>
                  {/each}
                  <tspan 
                    x="0" 
                    dy="1.6em" 
                    style="font-family: Roboto, sans-serif; font-size: 0.6rem;" 
                    fill="#7f7f7f">
                    {child.data.unit_name}
                  </tspan>
                </text>
              {/if}
            </g>
          {/each}
        {/if}
      </g>
    {/each}
  </svg>
{/if}

{#if hoveredChild}
  <div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px;">
    <div class="plant-name">{hoveredChild.plant_name}</div>
    <div class="unit-name">{hoveredChild.unit_name}</div>
    <div class="line-break-small"></div>
    <div class="capacity">{formatCapacity(hoveredChild.capacity)} MW</div>
    <div class="line-break-small"></div>
    <div class="line-break-big"></div>
    <div class="status-badge" style={getStatusBadgeStyle(hoveredChild.status)}>
      {hoveredChild.status}
    </div>
    <div class="line-break-big"></div>
    <div class="year">Scheduled to be operational in {hoveredChild.year}</div>
  </div>
{/if}
