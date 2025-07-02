<script>
	import { data } from '../data/mean_temp_anomaly.js';
	import {
		selectedYear,
		selectedScenario,
		//   selectedConfidence,
		selectedCountry
	} from '../data/stores.js';
	import { fade } from 'svelte/transition';

	// derive filter options
	const scenarios = Array.from(new Set(data.map((d) => d.scenario))).filter(
		(s) => s !== 'historical'
	);
	// const confidences = Array.from(new Set(data.map(d => d.confidence)));
	const countries = Array.from(new Set(data.map((d) => d.name))).sort();

	// popover flags & timeouts
	let showScenario = false;
	// let showConfidence = false;
	let showCountry = false;
	let hideScenarioTimeout, hideConfidenceTimeout, hideCountryTimeout;

	// tooltip flags & timeouts
	let showScenarioTooltip = false;
	let hideScenarioTooltipTimeout;
	// let showConfidenceTooltip = false;
	// let hideConfidenceTooltipTimeout;

	// const confidenceTooltips = {
	//     optimistic: {
	//             title: '10<sup>th</sup> Percentile of the Multi-Model Ensemble',
	//             body:  'Represents a lower-bound projection — a plausible but less likely scenario with smaller temperature rise.'
	//     },
	//     pessimistic: {
	//             title: '90<sup>th</sup> Percentile of the Multi-Model Ensemble',
	//             body:  'Represents an upper-bound projection — a plausible but less likely scenario with greater temperature rise.'
	//     },
	//     typical: {
	//             title: 'Median: 50<sup>th</sup> Percentile of the Multi-Model Ensemble',
	//             body:  'The most likely or typical outcome from climate models.'
	//     }
	// };

	const scenarioTooltips = {
		Sustainability: {
			title: 'Shared Socioeconomic Pathway 1 - 2.6 W/m²',
			body: 'Gradual global shift toward inclusive, well-being-focused development within environmental limits, with improved commons management, faster demographic transition, and low-material, energy-efficient consumption reducing inequality.'
		},
		'Middle of the Road': {
			title: 'Shared Socioeconomic Pathway 2 - 4.5 W/m²',
			body: 'Continuation of historical social, economic, and technology trends: uneven development progress, slow institutional strides toward sustainability, moderate population growth, slight decline in resource intensity, and persistent inequality.'
		},
		'Regional Rivalry': {
			title: 'Shared Socioeconomic Pathway 3 - 7.0 W/m²',
			body: 'Rising nationalism and regional conflicts drive inward-focused energy and food security policies, low investment in education and tech, material-intensive consumption, slow economic growth, and worsening environmental degradation.'
		},
		'Taking the Highway': {
			title: 'Shared Socioeconomic Pathway 5 - 8.5 W/m²',
			body: 'Rapid global growth fueled by integrated markets, innovation, and strong human-capital investments; paired with abundant fossil-fuel use and resource-intensive lifestyles; managing local pollution successfully but posing high mitigation challenges.'
		}
	};

	// reactive store pulls
	$: year = $selectedYear;
	$: scenario = $selectedScenario;
	// $: confidence = $selectedConfidence;
	$: country = $selectedCountry;
</script>

<div class="filter-wrapper">
	By {year}, under the

	<!-- Confidence filter + tooltip -->
	<!-- <span
      class="filter-wrapper"
      on:mouseenter={() => {
        clearTimeout(hideConfidenceTimeout);
        clearTimeout(hideConfidenceTooltipTimeout);
        showConfidence = true;
        showConfidenceTooltip = true;
      }}
      on:mouseleave={() => {
        hideConfidenceTimeout        = setTimeout(() => showConfidence        = false, 120);
        hideConfidenceTooltipTimeout = setTimeout(() => showConfidenceTooltip = false, 50);
      }}
    >
      <span class="filter-label">{confidence}</span>
  
      {#if showConfidenceTooltip}
      <div class="tooltip">
        <div class="tooltip-title">
            {@html confidenceTooltips[confidence].title}
        </div>
        <div class="tooltip-body">
          {confidenceTooltips[confidence].body}
        </div>
        <div class="tooltip-arrow"></div>
      </div>
    {/if}
  
      {#if showConfidence}
        <div class="popover" transition:fade={{ duration: 150 }}>
          <ul>
            {#each confidences as c}
              <li on:click={() => selectedConfidence.set(c)}>{c}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </span> -->

	<!-- Scenario filter + tooltip -->
	<span
		class="filter-wrapper"
		on:mouseenter={() => {
			clearTimeout(hideScenarioTimeout);
			clearTimeout(hideScenarioTooltipTimeout);
			showScenario = true;
			showScenarioTooltip = true;
		}}
		on:mouseleave={() => {
			hideScenarioTimeout = setTimeout(() => (showScenario = false), 120);
			hideScenarioTooltipTimeout = setTimeout(() => (showScenarioTooltip = false), 50);
		}}
	>
		<span class="filter-label">{scenario}</span>

		{#if showScenarioTooltip}
			<div
				class="tooltip-wrapper"
				style="
    position: absolute;
    bottom: calc(100% + 1em);
    left:   calc(50% - 2em);
    overflow: visible;
    -webkit-filter: drop-shadow(0px 2px 6px rgba(0,0,0,0.2));
            filter: drop-shadow(0px 2px 6px rgba(0,0,0,0.2));
  "
			>
				<div class="tooltip">
					<div class="tooltip-title">
						{scenarioTooltips[scenario].title}
					</div>
					<div class="tooltip-body">
						{scenarioTooltips[scenario].body}
					</div>
					<div class="tooltip-arrow"></div>
				</div>
			</div>
		{/if}

		{#if showScenario}
			<div class="popover" transition:fade={{ duration: 150 }}>
				<ul>
					{#each scenarios as s}
						<li on:click={() => selectedScenario.set(s)}>{s}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</span>

	scenario,

	<span
		class="filter-wrapper"
		on:mouseenter={() => {
			clearTimeout(hideCountryTimeout);
			showCountry = true;
		}}
		on:mouseleave={() => {
			hideCountryTimeout = setTimeout(() => (showCountry = false), 120);
		}}
	>
		<span class="filter-label">{country}'s</span>
		{#if showCountry}
			<div class="popover" transition:fade={{ duration: 120 }}>
				<ul>
					{#each countries as c}
						<li on:click={() => selectedCountry.set(c)}>{c}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<span>...</span>
	</span>
</div>

<style>
	.filter-wrapper {
		position: relative;
		/* display: inline-block; */
		font-family: 'Lora';
		font-size: 1.2rem;
	}

	.filter-label {
		color: #000;
		cursor: pointer;
		text-decoration: underline;
	}
	.filter-label:hover {
		background-color: #000;
		color: #fff;
	}
	.popover {
		position: absolute;
		top: 100%;
		left: 0;
		background: white;
		opacity: 0.95;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		margin-top: 0.25em;
		width: max-content;
		white-space: nowrap;
		overflow: visible;
		font-family: 'Inter', sans-serif;
		font-size: 0.86rem;
		font-weight: 350;
		z-index: 10;
	}
	.popover ul {
		list-style: none;
		margin: 0;
		padding: 0.75em;
	}
	.popover li {
		opacity: 0.4;
		padding: 0.5em;
		color: #000;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}
	.popover li:hover {
		opacity: 1;
		font-weight: 450;
		background: #f0f0f0;
	}
	/* filter {
		font-family: 'Lora';
		font-size: 1.2rem;
		color: #333;
		margin-block-start: 0.32em;
		margin-block-end: 0.32em;
	} */

	.tooltip {
		--arrow-height: 12px;
		--arrow-half-width: 12px;
		--arrow-center: 22%;
		position: absolute;
		clip-path: polygon(
			0% 0%,
			100% 0%,
			100% calc(100% - var(--arrow-height)),
			calc(var(--arrow-center) + var(--arrow-half-width)) calc(100% - var(--arrow-height)),
			var(--arrow-center) 100%,
			calc(var(--arrow-center) - var(--arrow-half-width)) calc(100% - var(--arrow-height)),
			0% calc(100% - var(--arrow-height))
		);
		position: absolute;
		bottom: calc(100%);
		left: calc(50% - 40px);
		transform: none;
		padding: 1.6rem 1.6rem;
		background: #fff;
		font-family: 'Inter';
		color: #000;
		font-size: 0.72rem;
		width: 320px;
		line-height: 1.6;
		white-space: normal;
		overflow-wrap: break-word;
		z-index: 20;
	}

	.tooltip-title {
		font-weight: 500;
		margin-bottom: 0.86rem;
	}

	.tooltip-body {
		font-weight: 250;
	}
</style>
