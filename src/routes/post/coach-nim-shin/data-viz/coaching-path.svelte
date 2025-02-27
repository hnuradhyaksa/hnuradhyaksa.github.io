<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { coachesData } from "../data/head_coach_reign.js";

  function getOrdinalParts(n) {
    let j = n % 10,
        k = n % 100,
        suffix;
    if (j === 1 && k !== 11) {
      suffix = "st";
    } else if (j === 2 && k !== 12) {
      suffix = "nd";
    } else if (j === 3 && k !== 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    return { number: n.toString(), suffix };
  }
  
  // Receive the active step (0–n)
  export let activeStep = 0;
  
  let svg;
  
  function drawPaths(data) {
    const svgSelection = d3.select(svg);
    svgSelection.selectAll("*").remove();

    // Create defs for the white outline filter (used for labels)
    const defs = svgSelection.append("defs");
    defs.append("filter")
      .attr("id", "whiteOutline")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%")
      .html(`
        <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated"/>
        <feFlood flood-color="white" result="flood"/>
        <feComposite in="flood" in2="dilated" operator="in" result="outline"/>
        <feMerge>
          <feMergeNode in="outline"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `);

    let xi = 0;
    let yi = 0;
    let unitoff =32;
    let strokewidth = 24;
    const ch = unitoff;
    let lastX = xi;
    let lastY = yi;
    let pathfont = 14;

    // Sort data if needed
    data.sort((a, b) => a.period_start - b.period_start);

    data.forEach((coach, index) => {
      const coachName = coach.head_coach;
      const sanitizedCoachName = coachName.toLowerCase().replace(/\s+/g, '-');

      const { arcsinh_period, rank_start, rank_finish, direction_start, direction_finish } = coach;
      const period_length = arcsinh_period;
      const rank_difference = rank_finish - rank_start;
      let cvs = unitoff * (direction_start === "up" ? -1 : 1);
      let cve = unitoff * (direction_finish === "up" ? -1 : 1);
      let rank_offset = 9.5 * rank_difference + (direction_finish === "up" ? -2 : 2) * 9.5;

      if (index !== 0) {
        xi = lastX;
        yi = lastY;
      }

      const x_end = xi + period_length + ch;
      const y_curve_start = yi + cvs;
      const y_curve_end = y_curve_start + cve;

      // Append a group for each coach
      const coachG = svgSelection.append("g")
        .attr("class", "coach-group")
        .attr("data-index", index);

      const connectingGradient = defs.append("linearGradient")
        .attr("id", `connectingGradient-${sanitizedCoachName}-${index}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", xi)
        .attr("y1", yi)
        .attr("x2", xi + ch + period_length)
        .attr("y2", y_curve_start);

      connectingGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "white");

      connectingGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", direction_finish === "up" ? "#e64c3d" : "#018dd6");

      // Draw the connecting path
      coachG.append("path")
        .attr("id", `${sanitizedCoachName}-connecting`)
        .attr("d", `
          M${xi} ${yi}
          Q${xi} ${y_curve_start} ${xi + ch} ${y_curve_start}
          h${period_length}
        `)
        .attr("stroke", `url(#connectingGradient-${sanitizedCoachName}-${index})`)
        .attr("stroke-width", strokewidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "butt");

      // Draw the finishing path
      coachG.append("path")
        .attr("id", `${sanitizedCoachName}-finishing`)
        .attr("d", `
          M${x_end} ${y_curve_start}
          Q${x_end + ch} ${y_curve_start} ${x_end + ch} ${y_curve_end}
          v${rank_offset - 2 * cve}
        `)
        .attr("stroke", direction_finish === "up" ? "#e64c3d" : "#018dd6")
        .attr("stroke-width", strokewidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "butt");

      // Draw the arrow polygon (for the finishing path)
      const arrowX = x_end + ch;
      const arrowY = y_curve_end + rank_offset - 2 * cve;
      const arrowHalfWidth = strokewidth;
      const arrowHeight = unitoff;
      let arrowPoints;
      if (direction_finish === "up") {
        arrowPoints = `
          ${arrowX - arrowHalfWidth},${arrowY} 
          ${arrowX},${arrowY - arrowHeight} 
          ${arrowX + arrowHalfWidth},${arrowY}
        `;
      } else {
        arrowPoints = `
          ${arrowX - arrowHalfWidth},${arrowY} 
          ${arrowX},${arrowY + arrowHeight} 
          ${arrowX + arrowHalfWidth},${arrowY}
        `;
      }
      coachG.append("polygon")
        .attr("id", `${sanitizedCoachName}-arrow`)
        .attr("points", arrowPoints)
        .attr("fill", direction_finish === "up" ? "#e64c3d" : "#018dd6");

      // --- Add label showing the difference (with sign) near the arrow --- 
      const diff = rank_start - rank_finish;
      const diffLabelText = (diff > 0 ? '+' : '') + diff;
      
      let diffLabelX, diffLabelY;
      if (direction_finish === "up") {
        diffLabelX = arrowX;
        diffLabelY = arrowY - arrowHeight / 3;
      } else {
        diffLabelX = arrowX;
        diffLabelY = arrowY + arrowHeight / 3;
      }
      
      coachG.append("text")
        .attr("class", "rank-label diff-label")
        .attr("x", diffLabelX)
        .attr("y", diffLabelY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", pathfont)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 2)
        .attr("paint-order", "stroke fill")
        .text(diffLabelText);

    if (index === 0) {
      const finishingPathNode = coachG.select(`#${sanitizedCoachName}-finishing`).node();
      const totalLengthFinishing = finishingPathNode.getTotalLength();
      const midPointFinishing = finishingPathNode.getPointAtLength(totalLengthFinishing / 2);
      
      const { number, suffix } = getOrdinalParts(rank_start);
      
      const firstCoachText = coachG.append("text")
        .attr("x", midPointFinishing.x)
        .attr("y", midPointFinishing.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", pathfont)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 2)
        .attr("paint-order", "stroke fill");

      firstCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "0em")
        .text("Before FIFA");

      firstCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "1em")
        .text("sanctioned PSSI: ");
      
      firstCoachText.append("tspan")
        .attr("baseline-shift", "baseline")
        .text(number);
      
      firstCoachText.append("tspan")
        .attr("baseline-shift", "super")
        .attr("font-size", "70%")
        .text(suffix);
    }

    if (index === 1) {
      const finishingPathNode = coachG.select(`#${sanitizedCoachName}-finishing`).node();
      const totalLengthFinishing = finishingPathNode.getTotalLength();
      const midPointFinishing = finishingPathNode.getPointAtLength(totalLengthFinishing / 2);
      
      const { number, suffix } = getOrdinalParts(rank_start);
      
      const firstCoachText = coachG.append("text")
        .attr("x", midPointFinishing.x)
        .attr("y", midPointFinishing.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", pathfont)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 2)
        .attr("paint-order", "stroke fill");

      firstCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "0em")
        .text("When Alfred Riedl");

      firstCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "1em")
        .text("took over: ");
      
      firstCoachText.append("tspan")
        .attr("baseline-shift", "baseline")
        .text(number);
      
      firstCoachText.append("tspan")
        .attr("baseline-shift", "super")
        .attr("font-size", "70%")
        .text(suffix);
    }

    if (index === data.length - 1) {
      const finishingPathNode = coachG.select(`#${sanitizedCoachName}-finishing`).node();
      const totalLengthFinishing = finishingPathNode.getTotalLength();
      const midPointFinishing = finishingPathNode.getPointAtLength(totalLengthFinishing / 2);
      
      const { number, suffix } = getOrdinalParts(rank_finish);
      
      const lastCoachText = coachG.append("text")
        .attr("x", midPointFinishing.x)
        .attr("y", midPointFinishing.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", pathfont)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 2)
        .attr("paint-order", "stroke fill");
      
      lastCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "0em")
        .text("When Shin Tae-Yong");

      lastCoachText.append("tspan")
        .attr("x", midPointFinishing.x)
        .attr("dy", "1em")
        .text("left the team: ");
      
      lastCoachText.append("tspan")
        .attr("baseline-shift", "baseline")
        .text(number);
      
      lastCoachText.append("tspan")
        .attr("baseline-shift", "super")
        .attr("font-size", "70%")
        .text(suffix);
    }
  
      lastX = x_end + ch;
      lastY = y_curve_end + rank_offset - 2 * cve;
    });
  
    // Reverse the coach groups to control the drawing order.
    const coachGroups = svgSelection.selectAll("g.coach-group").nodes();
    coachGroups.reverse().forEach(g => {
      svgSelection.node().appendChild(g);
    });
  
    const bbox = svgSelection.node().getBBox();
    const extra = 19;
    svgSelection
      .attr("viewBox", `${bbox.x - extra} ${bbox.y - extra} ${bbox.width + extra * 2} ${bbox.height + extra * 2}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  }
  
  onMount(() => {
    drawPaths(coachesData);
  });
  
  // Reactive update: For each coach group, if its index matches activeStep,
  // then set arrow (path and polygon) opacity to 1 and all labels (text) opacity to 1;
  // otherwise, keep arrows dim (opacity 0.2) and hide all labels (opacity 0).
  $: if (svg) {
    d3.select(svg).selectAll("g.coach-group").each(function () {
      const index = +this.getAttribute("data-index");
      if (index === activeStep) {
        d3.select(this).selectAll("path, polygon").attr("opacity", 1);
        d3.select(this).selectAll("text").attr("opacity", 1);
      } else {
        d3.select(this).selectAll("path, polygon").attr("opacity", 0.2);
        d3.select(this).selectAll("text").attr("opacity", 0);
      }
    });
  }
</script>
  
<svg 
  bind:this={svg} 
  width="800" 
  height="600"
  preserveAspectRatio="xMidYMid meet"
></svg>
  
<style>
  /* Prevent strokes from scaling with zoom/responsive changes */
  .coach-group * {
    vector-effect: non-scaling-stroke;
  }
</style>
