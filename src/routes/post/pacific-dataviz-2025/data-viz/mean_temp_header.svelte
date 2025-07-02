<script>
	import { data } from '../data/mean_temp_anomaly.js';
	import {
		selectedYear,
		selectedScenario,
		selectedConfidence,
		selectedCountry
	} from '../data/stores.js';

	// 1) import tweened and an easing fn
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// grab the store values
	$: year = $selectedYear;
	$: scenario = $selectedScenario;
	$: confidence = $selectedConfidence;
	$: country = $selectedCountry;

	// filter & compute raw value
	$: filtered = data.filter(
		(d) =>
			d.period_year === year &&
			d.scenario === scenario &&
			d.confidence === confidence &&
			d.name === country
	);
	$: rawAnomaly = filtered.length ? Math.max(...filtered.map((d) => d.anomaly)) : undefined;

	// 2) create a tweened store initialized to 0
	const animated = tweened(0, {
		duration: 600,
		easing: cubicOut
	});

	// 3) whenever rawAnomaly changes, drive the tweened store
	$: if (rawAnomaly !== undefined) {
		animated.set(rawAnomaly);
	} else {
		// optional: reset to 0 (or leave as-is)
		animated.set(0);
	}

	// 4) derive display sign & value off the animated number
	$: displaySign = $animated >= 0 ? '+' : '−';
	$: displayVal = Math.abs($animated).toFixed(1);
</script>

<div class="response">
	…Mean Surface Air Temperature Anomaly* is projected to reach
	<span class="result">
		{#if rawAnomaly !== undefined}
			<!--   animate the sign with a keyed block + fade -->
			{#key Math.sign($animated)}
				<span class="sign">{displaySign}</span>
			{/key}

			<!-- and the number itself -->
			<span class="number">{displayVal}°C</span>
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
	.number {
		display: inline-block;
		min-width: 2.5ch;
	}
	.reference-text {
		display: block;
		font-size: 0.72rem;
		font-style: normal;
		color: #666;
		margin-top: 0.86rem;
	}
</style>
