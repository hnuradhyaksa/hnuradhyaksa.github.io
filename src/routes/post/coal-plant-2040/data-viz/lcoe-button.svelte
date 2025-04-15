<script>
	import { data } from '../data/lcoe_gen.js';
	import AnimatedNumber from './animated-number.svelte'
  
	let showCapex = true;
	let showOpex = false;
	let show2050 = false;
  
	$: years = show2050 ? [2022, 2030, 2050] : [2022, 2030];
  
	$: tableTitle =
	  showCapex && !showOpex
		? 'Projected Capital Expenditure (CAPEX)'
		: !showCapex && showOpex
		  ? 'Projected Operational Expenditure including fuel cost (OPEX + Fuel)'
		  : 'Projected Levelized Cost of Electricity (LCOE)';
  
	const calculateDelta = (d) => {
	  const futureYear = show2050 ? 2050 : 2030;
	  let base, futureVal;
  
	  if (showCapex && showOpex) {
		base = d['capex_2022'] + d['opex_2022'];
		futureVal = d[`capex_${futureYear}`] + d[`opex_${futureYear}`];
	  } else if (showCapex) {
		base = d['capex_2022'];
		futureVal = d[`capex_${futureYear}`];
	  } else if (showOpex) {
		base = d['opex_2022'];
		futureVal = d[`opex_${futureYear}`];
	  } else {
		base = 0;
		futureVal = 0;
	  }
	  return base === 0 ? 0 : (futureVal - base) / base;
	};
  
	const getValue = (d, year) => {
	  if (showCapex && showOpex) {
		return d[`capex_${year}`] + d[`opex_${year}`];
	  } else if (showCapex) {
		return d[`capex_${year}`];
	  } else if (showOpex) {
		return d[`opex_${year}`];
	  }
	  return 0;
	};
  
	function toggleCapex() {
	  if (showCapex && !showOpex) return;
	  showCapex = !showCapex;
	}
  
	function toggleOpex() {
	  if (showOpex && !showCapex) return;
	  showOpex = !showOpex;
	}
  
	$: sortedData = data.slice().sort((a, b) => calculateDelta(a) - calculateDelta(b));
  
	$: minDelta = sortedData.length ? Math.min(...sortedData.map((d) => calculateDelta(d))) : 0;
  
	function hexToRgb(hex) {
	  const sanitized = hex.replace('#', '');
	  const bigint = parseInt(sanitized, 16);
	  return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	  };
	}
  
	function rgbToHex(r, g, b) {
	  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
	}
  
	function getDeltaColor(delta) {
	  const minColorHex = '#6bbeaa';
	  const maxColorHex = '#fbf5b2';
	  const minVal = minDelta;
	  const maxVal = 0;
  
	  if (minVal === maxVal) {
		return maxColorHex;
	  }
	  const ratio = (delta - minVal) / (maxVal - minVal);
	  const minRgb = hexToRgb(minColorHex);
	  const maxRgb = hexToRgb(maxColorHex);
  
	  const r = Math.round(minRgb.r + ratio * (maxRgb.r - minRgb.r));
	  const g = Math.round(minRgb.g + ratio * (maxRgb.g - minRgb.g));
	  const b = Math.round(minRgb.b + ratio * (maxRgb.b - minRgb.b));
  
	  return rgbToHex(r, g, b);
	}
  </script>
  
  <div class="container">
	<div class="header">
	  <div class="header-text">
		<div class="table-title">{tableTitle}</div>
		<div class="table-subtitle">in USD¢/kWh</div>
	  </div>
	  <div class="header-controls">
		<div class="toggle-buttons">
		  <button on:click={toggleCapex} class:selected={showCapex}>CAPEX</button>
		  <button on:click={toggleOpex} class:selected={showOpex}>OPEX + Fuel</button>
		</div>
		<div class="toggle-instructions">Select both to show the projected LCOE</div>
	  </div>
	</div>
  
	<table class="lcoe-table">
	  <thead>
		<tr>
		  <th>Technology</th>
		  {#each years as year}
			<th class="year-cell">
			  {#if year === 2030 && !show2050}
				<button class="year-toggle-btn" on:click={() => (show2050 = true)}>+</button>
			  {:else if year === 2050 && show2050}
				<button class="year-toggle-btn" on:click={() => (show2050 = false)}>-</button>
			  {/if}
			  <div class="year-header">
				<span class="year-label">{year}</span>
			  </div>
			</th>
		  {/each}
		  <th>Δ</th>
		</tr>
	  </thead>
	  <tbody>
		{#each sortedData as d}
		  <tr>
			<td>{d.type}</td>
			{#each years as year}
			  <td>
				<AnimatedNumber value={getValue(d, year)} />
			  </td>
			{/each}
			<td style="background-color: {getDeltaColor(calculateDelta(d))}; font-weight: light; border: 2px solid white;">
			  <AnimatedNumber value={calculateDelta(d) * 100} />%
			</td>
		  </tr>
		{/each}
	  </tbody>
	</table>
	<div class="table-annotation">
	  <p>
		<strong>Data Source:</strong> Indonesia LCOE Calculator, IESR, 2023 release.
	  </p>
	</div>
  </div>
  
  <style>
	.lcoe-table {
	  font-family: Roboto;
	  font-weight: 300;
	  border-collapse: collapse;
	  width: 100%;
	}
	.lcoe-table th,
	.lcoe-table tbody td {
	  border-left: none;
	  border-right: none;
	  border-top: 1px solid #ccc;
	  border-bottom: 1px solid #ccc;
	  padding: 8px;
	  text-align: center;
	}
	.lcoe-table th:first-child,
	.lcoe-table td:first-child {
	  text-align: left;
	}
	.container {
	  width: 100%;
	  max-width: 600px;
	  margin: 0 auto;
	  margin-top: 1rem;
	}
	.header {
	  position: relative;
	  padding-right: 16rem;
	  height: 8rem;
	}
	.table-title {
	  font-family: Roboto, sans-serif;
	  font-size: 1rem;
	  font-weight: 700;
	  color: #1a1a1a;
	  margin-bottom: 0.3rem;
	  text-align: left;
	  white-space: normal;
	  word-wrap: break-word;
	  line-height: 1.4rem;
	}
	.table-subtitle {
	  font-family: Roboto, sans-serif;
	  font-size: 0.84rem;
	  color: #999;
	  text-align: left;
	}
	.header-controls {
	  position: absolute;
	  top: 0;
	  right: 0;
	  display: flex;
	  flex-direction: column;
	  align-items: flex-end;
	}
	.toggle-buttons {
	  display: flex;
	  gap: 10px;
	  margin-bottom: 0.5rem;
	}
	.toggle-buttons button {
	  padding: 0.5rem 1rem;
	  border: 1.5px solid #f1f1f0;
	  border-radius: 6px;
	  background: #eee;
	  cursor: pointer;
	  font-family: Roboto, sans-serif;
	  font-weight: 500;
	  color: #aaaab0;
	  transition: background 0.3s ease, color 0.3s ease;
	}
	.toggle-buttons button.selected {
	  background: white;
	  color: #1a1a1a;
	  border-color: #ccc;
	}
	.toggle-instructions {
	  font-family: Roboto, sans-serif;
	  font-size: 0.84rem;
	  font-style: italic;
	  color: #999;
	  text-align: right;
	}
	.year-cell {
	  position: relative;
	  padding-top: 3rem;
	}
	.year-header {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.year-label {
	  font-weight: bold;
	  margin-top: 4px;
	}
	.year-toggle-btn {
	  position: absolute;
	  top: -2rem;
	  left: 0;
	  width: 100%;
	  height: 2rem;
	  background: #eee;
	  border: 1px solid #ccc;
	  cursor: pointer;
	  font-size: 0.8rem;
	  color: #666;
	  line-height: 2rem;
	}
	.table-annotation {
	  margin-top: 1rem;
	  font-family: Roboto, sans-serif;
	  font-size: 0.74rem;
	  color: #7f7f7f;
	  text-align: left;
	}

	@media (max-width: 600px) {
		.lcoe-table tbody td {
			font-size: 0.84rem
		}

		.year-header {
			font-size: 0.84rem
		}

		.toggle-buttons {
			font-size: 0.84rem;
			flex-direction: column;
			gap: 5px;
		}

		.toggle-instructions {
			max-width: 8rem;
		}

		.header {
			padding-right: 10rem;
			height: 12rem;
		}
	}
  </style>
  