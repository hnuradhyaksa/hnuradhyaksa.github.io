<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import * as d3 from "d3";
  import { milestone } from "../data/milestone.js"; // adjust path as needed

  // SVG dimensions and margins
  const svgWidth = 800;
  let fullSvgHeight;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // State for milestone highlighting & scroll
  let currentMilestoneIndex = 0;
  let wheelDelta = 0;
  const threshold = 20;

  // D3 selections & scale for the left-side timeline
  let svg, leftGroup;
  let data = [];
  let yScale;

  // Left-side tick settings
  const leftWidth = svgWidth / 9;
  const tickLength = 40;

  // Sticky container elements
  let outerContainer;
  let innerContainer;
  let isSticky = false;

  // Reactive active datum for the narrative block.
  let activeDatum = {};

  let showNarrative = false;

  // Separate fade durations (in ms)
  let fadeInDuration = 100;
  let fadeOutDuration = 200;

  // Helper functions for date formatting.
  function getOrdinal(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function formatDateWithOrdinal(date) {
    const day = date.getDate();
    const ordinal = getOrdinal(day);
    const month = d3.timeFormat("%B")(date);
    const year = date.getFullYear();
    return `${month} ${day}${ordinal}, ${year}`;
  }

  onMount(() => {
    // Parse dates and prepare data from milestone.js.
    data = milestone.map((d, i) => ({
      ...d,
      id: i,
      date: d3.timeParse("%Y-%m-%d")(d.date)
    }));

    const minDate = d3.min(data, d => d.date);
    const maxDate = d3.max(data, d => d.date);
    const offsetMonths = 1;
    const startDate = d3.timeMonth.offset(minDate, -offsetMonths);
    const endDate = d3.timeMonth.offset(maxDate, offsetMonths);

    const numberOfDays = d3.timeDay.count(startDate, endDate) + 1;
    const daySpacing = 20;
    fullSvgHeight = daySpacing * numberOfDays + margin.top + margin.bottom;

    yScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([margin.top, fullSvgHeight - margin.bottom]);

    // Create the SVG for the timeline.
    svg = d3.select("#timeline")
      .attr("width", svgWidth)
      .attr("height", fullSvgHeight);

    leftGroup = svg.append("g")
      .attr("class", "left-group")
      .attr("transform", "translate(0,0)");

    // Start hidden.
    leftGroup.style("opacity", 0);

    // Daily supporting ticks (shorter)
    const supportingTickLength = tickLength * 0.6;
    leftGroup.append("g")
      .attr("class", "supporting-ticks")
      .attr("transform", "translate(0,0)")
      .call(
        d3.axisRight(yScale)
          .ticks(d3.timeDay.every(1))
          .tickSizeInner(supportingTickLength)
          .tickSizeOuter(0)
          .tickFormat(() => "")
      )
      .call(g => g.select(".domain").remove())
      .selectAll("line")
      .attr("stroke", "#ccc");

    // Main milestone tick lines.
    leftGroup.selectAll("line.tick")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "tick")
      .attr("x1", 0)
      .attr("x2", tickLength)
      .attr("y1", d => yScale(d.date))
      .attr("y2", d => yScale(d.date))
      .attr("stroke", "#000");

    // Date labels for each milestone.
    leftGroup.selectAll("text.date")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "date")
      .attr("x", tickLength + 5)
      .attr("y", d => yScale(d.date))
      .attr("text-anchor", "start")
      .attr("dy", "0.35em")
      .text(d => formatDateWithOrdinal(d.date))
      .style("font-family", "Roboto")
      .style("font-size", "0.82rem");

    // Set the initial active milestone.
    updateHighlight();
  });

  // Update left timeline and active datum.
  function updateHighlight() {
    activeDatum = data[currentMilestoneIndex];
    const activeY = yScale(activeDatum.date);
    const viewportCenter = window.innerHeight / 2;
    const leftTranslateY = viewportCenter - activeY;

    // Center the active date on the left timeline.
    leftGroup.transition().duration(500)
      .attr("transform", `translate(0, ${leftTranslateY})`);

    // Fade date texts so that only the active one is fully opaque.
    leftGroup.selectAll("text.date")
      .transition().duration(500)
      .style("opacity", (d, i) => i === currentMilestoneIndex ? 1 : 0);
  }

  // Change milestone with sequential fade out/in.
  function changeMilestone(newIndex) {
    // Trigger fade-out by hiding the narrative.
    showNarrative = false;
    // Wait for the fade-out transition to complete, then update.
    setTimeout(() => {
      currentMilestoneIndex = newIndex;
      updateHighlight();
      // Fade in new narrative.
      showNarrative = true;
    }, fadeOutDuration);
  }

  // Handle wheel events to trigger milestone change.
  function handleWheel(event) {
    if (!isSticky) return;
    event.preventDefault();
    wheelDelta += event.deltaY;
    if (wheelDelta > threshold) {
      if (currentMilestoneIndex < data.length - 1) {
        changeMilestone(currentMilestoneIndex + 1);
      }
      wheelDelta = 0;
    } else if (wheelDelta < -threshold) {
      if (currentMilestoneIndex > 0) {
        changeMilestone(currentMilestoneIndex - 1);
      }
      wheelDelta = 0;
    }
  }

  // Adjust sticky positioning and control fade in/out for both narrative and axis.
  function handleScroll() {
    const rect = outerContainer.getBoundingClientRect();
    const fadeStart = window.innerHeight * 0.8;
    const fadeEnd = window.innerHeight;
    let newOpacity = 1;
    if (rect.bottom < fadeEnd) {
      newOpacity = (rect.bottom - fadeStart) / (fadeEnd - fadeStart);
      newOpacity = Math.max(0, Math.min(1, newOpacity));
    }
    d3.select(innerContainer)
      .transition()
      .duration(300)
      .style("opacity", newOpacity);

    // Keep track of the previous sticky state.
    let wasSticky = isSticky;
    if (rect.top > 0) {
      innerContainer.style.position = 'absolute';
      innerContainer.style.top = '0';
      innerContainer.style.left = '';
      innerContainer.style.transform = '';
      isSticky = false;
    } else if (rect.bottom < window.innerHeight) {
      innerContainer.style.position = 'absolute';
      innerContainer.style.top = (outerContainer.offsetHeight - window.innerHeight) + 'px';
      innerContainer.style.left = '';
      innerContainer.style.transform = '';
      isSticky = false;
    } else {
      innerContainer.style.position = 'fixed';
      innerContainer.style.top = '0';
      innerContainer.style.left = '50%';
      innerContainer.style.transform = 'translateX(-50%)';
      isSticky = true;
    }

    // When entering sticky mode, fade in the narrative and axis.
    if (!wasSticky && isSticky) {
      showNarrative = true;
      leftGroup.transition().duration(fadeInDuration)
        .style("opacity", 1);
    }
    // When leaving sticky mode, fade out the narrative and axis.
    if (wasSticky && !isSticky) {
      showNarrative = false;
      leftGroup.transition().duration(fadeOutDuration)
        .style("opacity", 0);
    }
  }
</script>

<svelte:window on:scroll={handleScroll} on:wheel={handleWheel} />

<div bind:this={outerContainer} class="outer-container">
  <div bind:this={innerContainer} class:sticky={isSticky} class="inner-container">
    <svg id="timeline"></svg>
    {#if isSticky && showNarrative}
      <div
        class="narrative-block"
        in:fade={{ duration: fadeInDuration }}
        out:fade={{ duration: fadeOutDuration }}
      >
        <!-- Line 1: Milestone (positioned above center) -->
        <div class="versus milestone">{activeDatum.milestone}</div>
        <!-- Line 2: Versus Text -->
        <div class="versus vs">
          <span class="small-text" style="font-size: 1rem;">vs. </span>
          <span class="big-text">{activeDatum.versus}</span>
        </div>
        <!-- Line 3: Score -->
        <div class="score">
          <span class="small-text">{activeDatum.score_for}</span>
          <span class="small-text"> - </span>
          <span class="small-text">{activeDatum.score_against}</span>
        </div>
        <!-- Line 4: Image -->
        <div class="image-container">
          {@html activeDatum.link_pic}
        </div>
        <!-- Line 5: Annotation -->
        <div class="annotation">{activeDatum.annot}</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .outer-container {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    height: 1600px;
    overflow: hidden;
  }

  .inner-container {
    width: 1000px;
    background: white;
    z-index: 10;
    overflow: hidden;
  }
  .inner-container.sticky {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 100vh;
    overflow: hidden;
    background: white;
    z-index: 10;
  }

  /* Narrative block styling */
  .narrative-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
  }

  .versus.milestone {
    text-transform: uppercase;
    letter-spacing: 4px;
    font-family: Roboto, sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.48rem;
    margin-bottom: 1rem;
  }

  .versus.vs {
    font-family: Vollkorn, serif;
    font-style: italic;
    font-size: 1.4rem;
    font-weight: 400;
  }

  .score {
    font-family: Vollkorn, serif;
    font-style: italic;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .image-container {
    width: 400px;
    margin: 0 auto;
  }

  .annotation {
    font-family: "Noto Serif";
    font-size: 0.8rem;
    color: #333;
    font-weight: 400;
    line-height: 1.4rem;
    margin-bottom: 1rem;
  }

  /* D3-generated left-group text styles */
  text.date {
    font-family: Roboto, sans-serif;
    font-size: 0.82rem;
    fill: #333;
  }
</style>
