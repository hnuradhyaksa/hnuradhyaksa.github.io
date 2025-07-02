<script>
	import { selectedConfidence } from '../data/stores.js';

	// tooltip definitions
	export let confidenceTooltips = {
		optimistic: {
			title: '10<sup>th</sup> Percentile of the Multi-Model Ensemble',
			body: 'Represents a lower-bound projection — a plausible but less likely scenario with smaller temperature rise.'
		},
		pessimistic: {
			title: '90<sup>th</sup> Percentile of the Multi-Model Ensemble',
			body: 'Represents an upper-bound projection — a plausible but less likely scenario with greater temperature rise.'
		},
		typical: {
			title: 'Median: 50<sup>th</sup> Percentile of the Multi-Model Ensemble',
			body: 'The most likely or typical outcome from climate models.'
		}
	};

	// Map each percentile position to a confidence key
	const positions = { optimistic: 17, typical: 50, pessimistic: 83 };

	// the two lines for the top label:
	const topLabels = {
		optimistic: { likeliness: 'Best Case', impact: 'Lower Rise' },
		pessimistic: { likeliness: 'Worst Case', impact: 'Higher Rise' },
		typical: { likeliness: '', impact: 'Typical' }
	};

	// Tooltip visibility
	let showTooltip = false;
	let hideTooltipTimeout;

	// Current selection and dynamic tooltip position
	$: current = $selectedConfidence;
	$: tooltipLeft = `${positions[current]}%`;

	function getOrdinalSuffix(n) {
		const rem100 = n % 100;
		if (rem100 >= 11 && rem100 <= 13) return 'th';
		const rem10 = n % 10;
		if (rem10 === 1) return 'st';
		if (rem10 === 2) return 'nd';
		if (rem10 === 3) return 'rd';
		return 'th';
	}
</script>

<div class="filter-wrapper">
	<div class="label-title">Projection range</div>

	<div class="legend">
		<div class="legend-bar"></div>

		{#each Object.entries(positions) as [key, pct]}
			<div
				class="tick-group"
				style="left: {pct}%; transform: translateX(-50%);"
				on:click={() => selectedConfidence.set(key)}
			>
				<!-- Top two-line label -->
				<div class="label-top">
					<span class="likeliness {current === key ? 'selected' : ''}">
						{topLabels[key].likeliness}
					</span><br />
					<span class="impact {current === key ? 'selected' : ''}">
						{topLabels[key].impact}
					</span>
				</div>

				<!-- wider-click-area tick -->
				<div class="tick"></div>

				<!-- Bottom percentile label -->
				<div class="label-bottom">
					{pct}<sup>{getOrdinalSuffix(pct)}</sup>
				</div>
			</div>
		{/each}

		<div class="pointer" style="left: {positions[current]}%">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 22 14"
				width="22"
				height="14"
				style="display:block;pointer-events:none"
			>
				<polygon points="11,14 0,0 22,0" fill="#333" stroke="#fff" stroke-width="2" />
			</svg>
		</div>
	</div>

	<div class="legend-bottom-label">PERCENTILE</div>

	{#if showTooltip}
		<div class="tooltip" style="left: {tooltipLeft}; transform: translateX(-50%);">
			<div class="tooltip-title">{@html confidenceTooltips[current].title}</div>
			<div class="tooltip-body">{confidenceTooltips[current].body}</div>
			<div class="tooltip-arrow"></div>
		</div>
	{/if}
</div>

<style>
	:global(:root) {
		--bar-height: 0.86rem;
	}

	.filter-wrapper {
		position: static;
		width: 60%;
		padding-top: 2.8rem;
		margin: 0 auto 3.2rem;
		display: block;
	}

	.label-title {
		text-align: center;
		font-family: 'Inter';
		font-size: 0.86rem;
		font-weight: 350;
		margin-bottom: 3.6rem;
	}

	.legend {
		position: relative;
		width: 100%;
		height: var(--bar-height);
	}

	.legend-bar {
		width: 100%;
		height: 100%;
		border-radius: calc(var(--bar-height) / 2);
		background: linear-gradient(
			to right,
			rgba(217, 217, 217, 0) 0%,
			rgba(217, 217, 217, 0.25) 25%,
			rgba(217, 217, 217, 1) 50%,
			rgba(217, 217, 217, 0.25) 75%,
			rgba(217, 217, 217, 0) 100%
		);
	}

	/* — New wrapper for each tick + labels — */
	.tick-group {
		position: absolute;
		top: 0;
		width: 0;
		height: 0;
		cursor: pointer;
		--pointer-width: 18px;
		--pointer-height: 12px;
		--triangle-height: 12px;
		--stroke: 4px;
	}

	.legend-bottom-label {
		text-align: center;
		font-family: 'Inter';
		font-size: 0.64rem;
		font-weight: 350;
		color: #000;
		opacity: 0.6;
		margin-top: 2.2rem;
		letter-spacing: 0.18rem;
		text-transform: uppercase;
	}

	/* — Top two-line label (“Likeliness” / “Impact”) — */
	.label-top {
		position: absolute;
		bottom: calc(var(--bar-height));
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		font-family: 'Inter';
		line-height: 1.2;
		display: inline-block;
		white-space: nowrap;
	}
	.label-top .likeliness {
		font-size: 0.64rem;
		font-weight: 350;
		color: #000;
		opacity: 0;
		transition: opacity 450ms ease;
	}

	.label-top .likeliness.selected {
		opacity: 0.35;
	}
	.label-top .impact {
		display: block;
		font-size: 0.64rem;
		font-weight: 350;
		color: #000;
		opacity: 0.35;
		transition:
			font-size 300ms ease,
			opacity 300ms ease;
	}
	.label-top .impact.selected {
		font-size: 0.86rem;
		font-weight: 400;
		opacity: 1;
	}

	/* — Tick itself (wide hit-area + thin line) — */
	.tick {
		position: absolute;
		top: -4px;
		width: 3rem; /* clickable zone */
		height: calc(var(--bar-height) + 8px);
		background: transparent;
		cursor: pointer;
		transform: translateX(-50%);
	}
	.tick::after {
		content: '';
		position: absolute;
		left: 50%;
		top: calc(var(--bar-height) + 0.5em);
		transform: translateX(-50%);
		width: 1px;
		height: 30%;
		background: #333;
	}

	/* — Bottom percentile label (e.g. “10ᵗʰ”) — */
	.label-bottom {
		position: absolute;
		top: calc(var(--bar-height) + 1em);
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		font-family: 'Inter';
		font-size: 0.64rem;
		color: #000;
		opacity: 0.6;
	}

	.pointer {
		position: absolute;
		top: calc(-1 * var(--bar-height) / 2);
		transform: translateX(-50%);
		z-index: 2;
		transition: left 300ms ease-out;
	}

	.pointer svg {
		/* pick up your existing CSS vars for width/height: */
		width: calc(var(--pointer-width) + var(--stroke));
		height: calc(var(--pointer-height) + var(--stroke) + var(--triangle-height));
		display: block; /* remove any inline‐SVG whitespace */
		pointer-events: none;
	}

	/* — Tooltip (unchanged) — */
	.tooltip {
		position: absolute;
		bottom: calc(100% + 0.5em);
		background: #fff;
		font-family: 'Inter';
		color: #000;
		padding: 0.5em 0.75em;
		border-radius: 2px;
		font-size: 0.72rem;
		width: 240px;
		line-height: 1.4;
		z-index: 3;
		box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
	}
	.tooltip-arrow {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 6px solid #fff;
	}
	.tooltip-title {
		font-weight: 500;
		margin-bottom: 0.5em;
	}
	.tooltip-body {
		font-weight: 250;
	}
</style>
