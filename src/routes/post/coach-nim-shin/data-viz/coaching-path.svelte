<script>
  import { onMount } from "svelte";
  import * as d3 from 'd3';
  import { coachesData } from '../data/head_coach_reign.js';

  let svg;


// Function to draw paths
function drawPaths(data) {
  const svgSelection = d3.select(svg);

  let xi = 200;
  let yi = 200;
  const ch = 20;
  let lastX = xi;
  let lastY = yi;

  // Sort the data by period_start
  data.sort((a, b) => a.period_start - b.period_start);

  // Iterate over each head_coach
  data.forEach(coach => {
    const { period_start, period_finish, rank_start, rank_finish, direction_start, direction_end } = coach;
    const period_length = (period_finish - period_start)/3;
    const rank_difference = (rank_finish - rank_start);

    let cvs = 20 * (direction_start === 'up' ? -1 : 1);
    let cve = 20 * (direction_end === 'up' ? -1 : 1);

    if (period_start !== 0) {
      xi = lastX;
      yi = lastY;
    }

    const x_end = xi + period_length - ch;
    const y_curve_start = yi + cvs;
    const y_curve_end = yi + cve;

    const paths = [
      {
        d: `M${x_end} ${y_curve_start} 
            Q${x_end + ch} ${y_curve_start} ${x_end + ch} ${y_curve_start + cve} 
            v${rank_difference - 2 * Math.abs(cvs)}`,
        stroke: "#ebc7c7"
      },
      {
        d: `M${xi} ${yi} 
            Q${xi} ${y_curve_start} ${xi + ch} ${y_curve_start} 
            h${period_length - 2 * ch}`,
        stroke: "#ebc7c7"
      }
    ];

    const g = svgSelection.append("g")
      .attr("class", "snake-path");
    g.selectAll("path")
      .data(paths)
      .enter()
      .append("path")
      .attr("stroke-width", 18)
      .attr("fill", "none")
      .attr("stroke", d => d.stroke)
      .attr("d", d => d.d)
      .attr("class", "snake")
      .attr("stroke-linecap", "butt");

    // Update lastX and lastY for continuity
    lastX = x_end + ch;
    lastY = y_curve_start + cve + rank_difference - 2 * Math.abs(cvs);
  });
}

  // Call drawPaths on component mount
  onMount(() => {
    drawPaths(coachesData);
  });
</script>

<style>
  svg {
    width: 100%;
    height: 4500px;
    border: 1px solid #ccc;
  }
</style>

<svg bind:this={svg}></svg>
