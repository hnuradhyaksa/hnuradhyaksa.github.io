<script>
    import PostHeader from '$lib/components/post-style/post-header.svelte';
    import '$lib/components/post-style/post-body.scss';
    import BacktoHome from '$lib/components/back2home.svelte';

    // dataviz
    import CandleBar from './data-viz/coal-retirement.svelte';
    import CirclePack from './data-viz/coal-addition.svelte';
    import LcoeTable from './data-viz/lcoe-button.svelte';
</script>

<article>
    <div class = "completeright">
        <PostHeader postId={3} />
        <div class = "body article-text-center">
            <p>
                Coal is one of the most carbon-intensive fuels and has become a target for phase-out in efforts to limit global temperature rise. 
                Unfortunately, it has been a key fuel for economic growth for a developing country like Indonesia. 
                It has remained dominant in the generation mix for years, though efforts are underway to reduce its role.
            </p>
            <p>
                During the G20 meeting in Rio, President Prabowo 
                <a href="https://setkab.go.id/en/g20-summit-president-prabowo-subianto-highlights-indonesias-green-energy-vision-global-climate-role/" target="_blank">
                set a target for a complete coal phase-out by 2040
                </a>. 
                That means Indonesia must reduce 58.13 GW of coal capacity to zero in just 15 years, requiring the retirement of nearly 4 GW of coal plants annually.
            </p>
        </div>
    </div>
</article>

<div class="chart-container">
    <CandleBar/>
</div>

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Coal capacity addition data obtained from
				<a href="https://globalenergymonitor.org/projects/global-coal-plant-tracker/" target="_blank">
					Global Coal Plant Tracker, Global Energy Monitor, January 2025 release.
				</a>
			</span>
			<span class="g-ref">
				Includes both grid-connected and captive coal plants.
			</span>
		</div>
	</div>
</div>

<article>
    <div class="completeright">
        <div class="body article-text-center">
            <p>
                This reduction is not only ambitious but also exceptionally abrupt. 
                The timeline is extremely tight, especially considering Indonesia's historical reliance on coal.
                Based on data from the 
                <a href="https://globalenergymonitor.org/projects/global-coal-plant-tracker/" target="_blank"> Global Coal Plant Tracker 
                </a> compiled by Global Energy Monitor, the typical scenario given the current generation mix would only allow Indonesia to completely phase out coal power by 2060.
            </p>
            <p>
                Such a rapid transition is likely to pose considerable technical, economic, and institutional challenges, requiring careful planning and strong coordination across sectors.
            </p>
            <p>
                Despite Indonesia canceling over 18 GW of planned capacity additions for 2023-2030, 
                ongoing projects will still increase net coal power capacity, which is set to peak in 2026. 
                At least 7.17 GW of new coal capacity &mdash; roughly evenly split between captive and grid-connected power plants &mdash; is expected to come online by then.
            </p>
            <p>
                
            </p>
        </div>
    </div>
</article>

<div class="chart-container">
    <CirclePack/>
</div>

<article>
    <div class="completeright">
        <div class="body article-text-center">
            <p>
                In total, Indonesia is still planning to add at least 18 coal-fired power plants to meet residential electricity demand and another 7 for industrial use by 2030, amounting to 3.60 GW of grid-connected capacity and 3.57 GW of captive capacity.
            </p>
        </div>
    </div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">What does the future hold?</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
            <p>
                Prior to outlining Indonesia's coal phase-out commitment, President Prabowo emphasized the country's vast geothermal potential. 
                He pledged to meet future electricity demand with 75 GW of renewable energy, placing geothermal among the technologies expected to anchor Indonesia's low-carbon transition.
            </p>
            <p>
                Unlike variable renewables such as solar and wind, geothermal offers a unique advantage: it provides baseload power. That reliability makes geothermal an attractive candidate to replace coal in Indonesia's energy mix. 
                The country sits on the world's largest geothermal reserves after the United States, yet less than 10% has been tapped.
            </p>
            <p>
                However, tapping geothermal at scale is not without challenges. 
                While geothermal is cost-competitive over the long term, its high upfront investment and exploration risks continue to pose major hurdles, according to LCOE data. 
            </p>
            <p>
                In 2023, the LCOE for geothermal in Indonesia was higher than that of solar PV or wind. 
                By 2030 and 2050, projections suggest geothermal costs will decline gradually, though not as steeply as solar or wind, which continue to benefit from faster innovation and global cost reductions.
            </p>
        </div>
    </div>
</article>

<div class="chart-container">
    <LcoeTable/>
</div>

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				The Levelized Cost of Energy value is obtained from IESR: Indonesia LCOE Calculator, 2023 release.
			</span>
		</div>
	</div>
</div>

<article>
    <div class="completeright">
        <div class="body article-text-center">
        <p>
            Despite this, geothermal's long project lifetimes and dispatchable nature could offer strategic value as Indonesia balances its generation mix. When paired with intermittent renewables and storage, geothermal can serve as the backbone of a more resilient and clean energy system.
        </p>
        <p>
            Ultimately, the future of geothermal in Indonesia will hinge on policy certainty, risk-sharing mechanisms for exploration, and investments in transmission to bring remote resources to demand centers. 
        </p>
        <p>    
            If these barriers can be overcome, geothermal won't just complement the energy transition. 
        </p>
        <p>
            It could anchor it.
        </p>
    </div>
    </div>
</article>

<BacktoHome />

<style>
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<footer>

</footer>