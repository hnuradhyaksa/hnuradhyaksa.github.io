<!-- src/components/Response.svelte -->
<script>
	import { data } from '../data/sea_level_rise.js';
	import {
	  selectedYear,
	  selectedScenario,
	  selectedConfidence,
	  selectedCountry
	} from '../data/stores.js';
  
	// motion
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
  
	// grab store values
	$: year       = $selectedYear;
	$: scenario   = $selectedScenario;
	$: confidence = $selectedConfidence;
	$: country    = $selectedCountry;
  
	// filter & compute raw (meters)
	$: filtered     = data.filter(
	  (d) =>
		d.period_year === year &&
		d.scenario   === scenario &&
		d.confidence === confidence &&
		d.name       === country
	);
	$: rawSeaLevel = filtered.length
	  ? Math.max(...filtered.map((d) => d.value))
	  : undefined;
  
	// 1) tweened store, starting at 0
	const animated = tweened(0, {
	  duration: 600,
	  easing: cubicOut
	});
  
	// 2) drive it whenever rawSeaLevel changes
	$: if (rawSeaLevel !== undefined) {
	  animated.set(rawSeaLevel);
	} else {
	  animated.set(0);
	}
  
	// 3) derive sign & cm value from the live tweened number
	$: displaySign = $animated >= 0 ? '+' : '−';
	$: displayVal  = (Math.abs($animated) * 100).toFixed(2);
  </script>
  
  <div class="response">
	…Rising Sea Level* is projected to reach
	<span class="result">
	  {#if rawSeaLevel !== undefined}
		{#key Math.sign($animated)}
		  <span in:fade out:fade class="sign">{displaySign}</span>
		{/key}
		<span class="number">{displayVal} cm</span>
	  {:else}
		N/A
	  {/if}
	</span>
	<em class="reference-text">* relative to the 1995-2014 reference period</em>
  </div>
  
  <style>
	.response {
	  font-family: 'Lora';
	  font-size: 1.2rem;
	  color: #000;
	}
	.result {
	  font-weight: 750;
	  display: inline-flex;
	  align-items: baseline;
	}
	.sign {
	  margin-right: 0.1em;
	}
	.number {
	  display: inline-block;
	  min-width: 4ch;
	}
	.reference-text {
		display: block;
		font-size: 0.72rem;
		font-style: normal;
		color: #666;
		margin-top: 0.86rem;
	}
  </style>