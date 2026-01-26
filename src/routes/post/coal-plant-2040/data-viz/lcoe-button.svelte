<script>
    import { data } from '../data/lcoe_gen.js';
    import AnimatedNumber from './animated-number.svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let showCapex = true;
    let showOpex = false;
    let hoveredYear = null;

    $: displayYear = hoveredYear || 2050;

    $: costTypeText = 
        showCapex && !showOpex
            ? 'Capital Expenditure (CAPEX)'
            : !showCapex && showOpex
            ? 'Operational Expenditure + Fuel' 
            : 'Levelized Cost of Electricity (LCOE)';

    $: shortCostLabel = 
        showCapex && !showOpex
            ? 'CAPEX'
            : !showCapex && showOpex
            ? 'OPEX' 
            : 'LCOE';

    $: subtitle = 'Square size represents cost relative to 2022 levels';

    function toggleCapex() {
        if (showCapex && !showOpex) return; 
        showCapex = !showCapex;
    }

    function toggleOpex() {
        if (showOpex && !showCapex) return;
        showOpex = !showOpex;
    }

    $: processedData = data.map(d => {
        const getValue = (year) => {
            let val = 0;
            if (showCapex) val += d[`capex_${year}`] || 0;
            if (showOpex) val += d[`opex_${year}`] || 0;
            return val;
        };

        const v2022 = getValue(2022);
        const v2030 = getValue(2030);
        const v2050 = getValue(2050);
        
        const s2022 = 10; // Reference Area = 100 (10x10)

        // NEW CALCULATION:
        // 1. Calculate Area proportional to cost (Cost / Cost2022 * 100)
        // 2. Square root the Area to get side length
        const s2030 = v2022 ? Math.sqrt((v2030 / v2022) * 100) : 0;
        const s2050 = v2022 ? Math.sqrt((v2050 / v2022) * 100) : 0;
        
        const multiplier = v2050 ? Math.round((1 - (v2050 / v2022)) * 100 * 10) / 10 : 0;
        const multiplier2030 = v2030 ? Math.round((1 - (v2030 / v2022)) * 100 * 10) / 10 : 0;

        return {
            ...d, v2022, v2030, v2050, s2022, s2030, s2050, 
            multiplier, multiplier2030
        };
    });

    $: sortedData = (() => {
        const geo = processedData.find(d => d.type.toLowerCase().includes('geothermal'));
        const rest = processedData
            .filter(d => !d.type.toLowerCase().includes('geothermal'))
            .sort((a, b) => a.type.localeCompare(b.type));
        return geo ? [geo, ...rest] : rest;
    })();
</script>

<div id="chart-container">
    
    <div class="title-container">
        <div class="title">
            How Much Is
            
            <span class="anim-wrapper">
                {#key costTypeText}
                    <span 
                        class="anim-text"
                        in:fly={{ y: 5, duration: 300, delay: 50, easing: cubicOut }} 
                        out:fly={{ y: -5, duration: 300, easing: cubicOut }}
                    >
                        {costTypeText}
                    </span>
                {/key}
            </span>

            Expected to Shrink by

            <span class="anim-wrapper year-wrapper">
                {#key displayYear}
                    <span 
                        class="anim-text"
                        in:fly={{ y: 5, duration: 300, delay: 50, easing: cubicOut }} 
                        out:fly={{ y: -5, duration: 300, easing: cubicOut }}
                    >
                        {displayYear}
                    </span>
                {/key}
            </span>
            Compared to 2022?
        </div>

        <div class="subtitle">{subtitle}</div>
    </div>

    <div class="legend">
        <div class="legend-item interactive"
             on:mouseenter={() => hoveredYear = 2030}
             on:mouseleave={() => hoveredYear = null}
             class:dimmed={hoveredYear === 2050}
        >
            <div class="legend-box light"></div>
            <span>2030</span>
        </div>

        <div class="legend-item interactive"
             on:mouseenter={() => hoveredYear = 2050}
             on:mouseleave={() => hoveredYear = null}
             class:dimmed={hoveredYear === 2030}
        >
            <div class="legend-box dark"></div>
            <span>2050</span>
        </div>
    </div>

    <div class="content-wrapper">
        <div class="toggle-buttons">
            <button on:click={toggleCapex} class:selected={showCapex}>CAPEX</button>
            <button on:click={toggleOpex} class:selected={showOpex}>OPEX + Fuel</button>
        </div>

        <div class="viz-grid">
            {#each sortedData as d}
                <div class="viz-card">
                    <div class="label-group">
                        <div class="multiplier-text">
                            <AnimatedNumber 
                                value={hoveredYear === 2030 ? d.multiplier2030 : d.multiplier} 
                                format="0.0" 
                            />%
                            {#if d.type.toLowerCase().includes('geothermal')}
                                <span class="annotation-text">lower</span>
                            {/if}
                        </div>
                        
                        <div class="value-text">
                            {#if d.type.toLowerCase().includes('geothermal')}
                                {shortCostLabel} {hoveredYear || 2050} = 
                            {/if}
                            <AnimatedNumber 
                                value={hoveredYear === 2030 ? d.v2030 : d.v2050} 
                                format="0.00" 
                            /> USD¢/kWh
                        </div>
                    </div>

                    <svg viewBox="0 0 10 10" class="chart-svg">
                        <defs>
                            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" fill="#666" />
                            </marker>
                        </defs>
                        <rect x="0" y="0" width="10" height="10" class="rect-reference" />
                        <rect 
                            x="0" y={10 - d.s2030} width={d.s2030} height={d.s2030} 
                            fill="#d75638" 
                            opacity={hoveredYear === 2050 ? 0 : 0.15}
                            style="transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);"
                        />
                        <rect 
                            x="0" y={10 - d.s2050} width={d.s2050} height={d.s2050} 
                            fill="#d75638" 
                            opacity={hoveredYear === 2030 ? 0 : 1}
                            style="transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);"
                        />
                        <line 
                            x1="10" y1="0" 
                            x2={hoveredYear === 2030 ? d.s2030 : d.s2050} 
                            y2={10 - (hoveredYear === 2030 ? d.s2030 : d.s2050)} 
                            stroke="#666" stroke-width="0.15" marker-end="url(#arrowhead)"
                            style="transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);"
                        />
                    </svg>
                    <div class="label-type">{d.type}</div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* ... (Previous styles unchanged) ... */
    #chart-container {
        position: relative;
        width: 960px;
        margin: 0 auto;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        margin-left: auto;
        margin-right: auto;
        max-width: 64ch; 
        margin-bottom: 0.8rem;
    }

    .title {
        font-family: 'Lora', serif;
        font-size: 1.2rem;
        font-weight: 600;
        background: white;
        margin-bottom: 0.4rem;
        line-height: 1.5; 
    }

    .anim-wrapper {
        display: inline-grid;
        grid-template-columns: 1fr;
        vertical-align: bottom;
        align-items: end; 
    }
    
    .year-wrapper {
        min-width: 3ch; 
        text-align: center;
    }

    .anim-text {
        grid-area: 1 / 1;
    }

    .subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 0.86rem;
        font-weight: 300;
        color: #707070;
        margin-bottom: 0rem;
        line-height: 1.2rem;
    }

    .legend {
        display: flex;
        gap: 1.5rem;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 64ch;
        margin-top: 2.4rem;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        color: #666;
        cursor: pointer;
        transition: opacity 0.3s ease;
    }

    .legend-item.dimmed {
        opacity: 0.3;
    }

    .legend-box {
        width: 14px;
        height: 14px;
    }

    .legend-box.light {
        background: #d75638;
        opacity: 0.15;
    }

    .legend-box.dark {
        background: #d75638;
        opacity: 1;
    }

    .content-wrapper {
        position: relative;
    }

    .toggle-buttons {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        display: flex;
        gap: 5px;
    }

    .toggle-buttons button {
        padding: 0.5rem 0.8rem;
        border: 1.5px solid #f1f1f0;
        border-radius: 6px;
        background: #eee;
        cursor: pointer;
        font-family: Roboto, sans-serif;
        font-weight: 500;
        font-size: 0.8rem;
        color: #aaaab0;
        transition: background 0.3s ease, color 0.3s ease;
    }

    .toggle-buttons button.selected {
        background: white;
        color: #000;
        border-color: #ccc;
    }

    .viz-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 4rem 8rem;
        padding-top: 4rem; 
        align-items: start; 
        padding-bottom: 4rem;
    }

    .viz-card {
        display: flex;
        flex-direction: column;
    }

    .label-group {
        margin-bottom: 1.2rem;
    }

    .multiplier-text {
        font-family: 'Lora', serif;
        font-size: 1.2rem;
        font-weight: 700;
        color: #000;
        line-height: 1.1;
    }

    .annotation-text {
        font-family: 'Lora', serif;
        font-size: 0.92rem;
        font-weight: 550;
        color: #000;
    }

    .value-text {
        font-family: Inter, sans-serif;
        font-size: 0.72rem;
        color: #666;
        margin-top: 8px;
    }

    .chart-svg {
        width: 100%;
        overflow: visible;
    }

    .rect-reference {
        fill: none;
        stroke: #666;
        stroke-width: 0.08;
        stroke-dasharray: 0.3 0.3;
    }

    .label-type {
        font-family: Inter, sans-serif;
        margin-top: 1.2rem;
        font-size: 0.9rem;
        line-height: 1.2;
        color: #000;
        font-weight: 350;
    }

    @media (max-width: 700px) {
        .viz-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
        }
        #chart-container {
            width: 100%;
            max-width: 800px;
        }
        
        .toggle-buttons {
            position: relative;
            justify-content: flex-end;
            margin-bottom: 1rem;
            width: 100%;
        }

        .viz-grid {
            padding-top: 1rem;
        }
    }
</style>