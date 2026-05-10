<script>
    import { scaleLinear, scalePoint, line } from 'd3';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    const data = [
        {
            agency: 'BNPB',
            values: [
                { year: 2023, val: 1036.18, dis_val: 5140.8 },
                { year: 2024, val: 957.23, dis_val: 4656.7 },
                { year: 2025, val: 927.57, dis_val: 1779.9 },
                { year: 2026, val: 490.96, dis_val: null }
            ]
        },
        {
            agency: 'BPBD - Aceh',
            values: [
                { year: 2023, val: 38.16, dis_val: 49.8 },
                { year: 2024, val: 30.39, dis_val: 38.2 },
                { year: 2025, val: 29.95, dis_val: 107.7 },
                { year: 2026, val: 19.86, dis_val: null }
            ]
        },
        {
            agency: 'BPBD - North Sumatera',
            values: [
                { year: 2023, val: 40.53, dis_val: 136.9 },
                { year: 2024, val: 37.19, dis_val: 109.8 },
                { year: 2025, val: 37.07, dis_val: 152.9 },
                { year: 2026, val: 34.12, dis_val: null }
            ]
        }
    ];

    const years = [2023, 2024, 2025, 2026];

    const tickConfigs = data.map((series) => {
        if (series.agency === 'BNPB') {
            return {
                reg: [0, 250, 500, 750, 1000],
                dis: [0, 2000, 4000, 6000]
            };
        } else {
            return {
                reg: [0, 25, 50],
                dis: [0, 50, 100, 150, 200]
            };
        }
    });

    let showDisaster = false;
    const animationDuration = 800;
    const fastFadeDuration = 200; // Added a fast duration for fading out

    const maxValues = tweened(
        tickConfigs.map((c) => c.reg[c.reg.length - 1]),
        { duration: animationDuration, easing: cubicOut }
    );

    const regularOpacity = tweened(1, { duration: animationDuration, easing: cubicOut });
    const disasterOpacity = tweened(0, { duration: animationDuration, easing: cubicOut });

    // We pass specific duration overrides to the .set() calls
    $: {
        if (showDisaster) {
            // Fade OUT regular quickly, Fade IN disaster smoothly
            regularOpacity.set(0, { duration: fastFadeDuration });
            disasterOpacity.set(1, { duration: animationDuration });
            maxValues.set(tickConfigs.map((c) => c.dis[c.dis.length - 1]), { duration: animationDuration });
        } else {
            // Fade OUT disaster quickly, Fade IN regular smoothly
            regularOpacity.set(1, { duration: animationDuration });
            disasterOpacity.set(0, { duration: fastFadeDuration });
            maxValues.set(tickConfigs.map((c) => c.reg[c.reg.length - 1]), { duration: animationDuration });
        }
    }

    const width = 315;
    const height = 250;
    const margin = { top: 40, right: 30, bottom: 40, left: 110 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scalePoint().domain(years.map(String)).range([0, innerWidth]);
</script>

<div class="main-container">
    <div class="toggle-bar">
        <label class="disaster-toggle-container">
            <span class="toggle-label">Display disaster budget realization</span>

            <div class="switch">
                <input type="checkbox" bind:checked={showDisaster} />
                <span class="slider round"></span>
            </div>
        </label>
    </div>

    <div class="dashboard">
        <div class="charts-grid">
            {#each data as series, i}
                {@const currentMax = $maxValues[i]}
                {@const currentYScale = scaleLinear().domain([0, currentMax]).range([innerHeight, 0])}

                {@const regularValues = series.values}
                {@const disasterValues = series.values.filter((v) => v.dis_val !== null)}

                {@const pathGenerator = line()
                    .x((d) => xScale(String(d.year)))
                    .y((d) => currentYScale(d.val))}

                {@const disPathGenerator = line()
                    .x((d) => xScale(String(d.year)))
                    .y((d) => currentYScale(d.dis_val))}

                <div class="chart-wrapper">
                    <h2 class="chart-title" style="margin-left: {margin.left}px;">{series.agency}</h2>

                    <svg {width} {height} style="overflow: hidden;">
                        <g transform="translate({margin.left}, {margin.top})">
                            {#each tickConfigs[i].reg as tick}
                                <g opacity={$regularOpacity}>
                                    <line
                                        x1="-18"
                                        y1={currentYScale(tick)}
                                        x2="-24"
                                        y2={currentYScale(tick)}
                                        class="tick-mark"
                                    />
                                    <text x="-30" y={currentYScale(tick)} class="y-axis-label">
                                        {tick.toLocaleString('en-US')}{series.agency === 'BNPB' && tick === 1000
                                            ? ' Billion'
                                            : ''}
                                    </text>
                                    <line
                                        x1={-12}
                                        y1={currentYScale(tick)}
                                        x2={innerWidth + 12}
                                        y2={currentYScale(tick)}
                                        class="horizontal-grid-line"
                                    />
                                </g>
                            {/each}

                            {#each tickConfigs[i].dis as tick}
                                <g opacity={$disasterOpacity}>
                                    <line
                                        x1="-18"
                                        y1={currentYScale(tick)}
                                        x2="-24"
                                        y2={currentYScale(tick)}
                                        class="tick-mark"
                                    />
                                    <text x="-30" y={currentYScale(tick)} class="y-axis-label">
                                        {tick.toLocaleString('en-US')}{series.agency === 'BNPB' && tick === 6000
                                            ? ' Billion'
                                            : ''}
                                    </text>
                                    <line
                                        x1={-12}
                                        y1={currentYScale(tick)}
                                        x2={innerWidth + 12}
                                        y2={currentYScale(tick)}
                                        class="horizontal-grid-line"
                                    />
                                </g>
                            {/each}

                            {#each years as year}
                                <line
                                    x1={xScale(String(year))}
                                    y1={-12}
                                    x2={xScale(String(year))}
                                    y2={innerHeight + 12}
                                    class="vertical-grid-line"
                                />
                                <text x={xScale(String(year))} y={innerHeight + 25} class="x-axis-label">
                                    {year}
                                </text>
                            {/each}

                            <path
                                d={disPathGenerator(disasterValues)}
                                class="disaster-line"
                                opacity={$disasterOpacity}
                            />

                            {#each disasterValues as point}
                                <circle
                                    cx={xScale(String(point.year))}
                                    cy={currentYScale(point.dis_val)}
                                    r="5"
                                    class="disaster-point"
                                    opacity={$disasterOpacity}
                                />
                                <text
                                    x={xScale(String(point.year))}
                                    y={currentYScale(point.dis_val) - 12}
                                    class="data-label"
                                    opacity={$disasterOpacity}
                                >
                                    {point.dis_val.toLocaleString('en-US')}
                                </text>
                            {/each}

                            <path d={pathGenerator(regularValues)} class="data-line" />

                            {#each regularValues as point}
                                <circle
                                    cx={xScale(String(point.year))}
                                    cy={currentYScale(point.val)}
                                    r="5"
                                    class="data-point"
                                />

                                <text
                                    x={xScale(String(point.year))}
                                    y={currentYScale(point.val) - 12}
                                    class="data-label"
                                    opacity={$regularOpacity}
                                >
                                    {point.val.toLocaleString('en-US')}
                                </text>
                            {/each}
                        </g>
                    </svg>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }

    .toggle-bar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        max-width: 1000px;
        margin-bottom: 2rem;
    }

    .disaster-toggle-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
    }

    .toggle-label {
        font-family: 'Inter';
        font-size: 0.86rem;
        font-weight: 300;
        color: #707070;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 36px;
        height: 20px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #eee;
        border: 1.5px solid #f1f1f0;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        border: 1px solid #ccc;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #3b82f6;
        border-color: #3b82f6;
    }

    input:checked + .slider:before {
        transform: translateX(16px);
        border-color: #3b82f6;
    }

    .slider.round {
        border-radius: 26px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .dashboard {
        display: flex;
        justify-content: center;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .chart-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .chart-title {
        font-family: 'Inter', sans-serif;
        font-size: 0.86rem;
        font-weight: 600;
        color: #000;
        margin: 0 0 0.5rem 0;
        text-align: left;
    }

    .y-axis-label {
        font-family: 'Inter', sans-serif;
        text-anchor: end;
        dominant-baseline: middle;
        font-size: 0.72rem;
        font-weight: 400;
        fill: #666;
    }

    .tick-mark {
        stroke: #333;
        stroke-width: 1;
    }

    .horizontal-grid-line {
        stroke: #e0e0e0;
        stroke-width: 1;
        stroke-dasharray: 4 4;
    }

    .vertical-grid-line {
        stroke: #ccc;
        stroke-width: 1;
    }

    .data-line {
        fill: none;
        stroke: #d95a40;
        stroke-width: 3.5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .data-point {
        fill: #d95a40;
        stroke: #fff;
        stroke-width: 1.5;
    }

    .disaster-line {
        fill: none;
        stroke: #3b82f6;
        stroke-width: 3.5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .disaster-point {
        fill: #3b82f6;
        stroke: #fff;
        stroke-width: 1.5;
    }

    .x-axis-label {
        font-family: 'Inter', sans-serif;
        text-anchor: middle;
        font-size: 0.72rem;
        font-weight: 400;
        fill: #666;
    }

    .data-label {
        font-family: 'Inter', sans-serif;
        text-anchor: middle;
        font-size: 0.72rem;
        font-weight: 350;
        fill: #666;
        text-shadow:
            -2px -2px 0 #ffffff,
            0px -2px 0 #ffffff,
            2px -2px 0 #ffffff,
            2px 0px 0 #ffffff,
            2px 2px 0 #ffffff,
            0px 2px 0 #ffffff,
            -2px 2px 0 #ffffff,
            -2px 0px 0 #ffffff;
    }
</style>