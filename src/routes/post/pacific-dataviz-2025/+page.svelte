<script>
	import PostHeader from '$lib/components/post-style/post-header.svelte';
	import '$lib/components/post-style/post-body.scss';
	import BacktoHome from '$lib/components/back2home.svelte';

	// dataviz
	import FirstScrolly from './data-viz/opening-scrolly.svelte';
	import ScatterDanger from './data-viz/scatter_danger.svelte';
	import RiskFilter from './data-viz/risk_filter.svelte';
	import MeanTempHeader from './data-viz/mean_temp_header.svelte';
	import MeanTempConf from './data-viz/mean_temp_confidence.svelte';
	import MeanTemp from './data-viz/mean_temp_heatmap.svelte';
	import SeaTrendConf from './data-viz/sea_rise_confidence.svelte';
	import SeaTrendHeader from './data-viz/sea_rise_header.svelte';
	import SeaTrend from './data-viz/sea_rise_trend.svelte';
	import PrepMap from './data-viz/local_prep_map.svelte';
	import FundNeed from './data-viz/fund_need.svelte';

	import ScatterSearch from './data-viz/scatter_search.svelte';
	import { data as rawCountryData } from './data/country_vuln_emmi.js';

	let selectedCountryIso3 = null;

	function handleSelect(e) {
		selectedCountryIso3 = e.detail.country_iso3;
	}
	function handleReset() {
		selectedCountryIso3 = null;
	}
</script>

<FirstScrolly />

<article>
	<div class="completeright">
		<PostHeader postId={4} />
		<div class="body article-text-center">
			<p>
				<!-- Some of the world's lowest-emitting countries are paying the highest price for climate change. 
                    Pacific Island nations, with carbon footprints barely visible on a global scale, now face rising seas and heated temperatures both at the surface and in the ocean. -->
				Anthropogenic climate change represents a debt accumulating globally. Yet, tragically, its highest
				price is often paid by those who contributed the least to the balance.
			</p>
			<p>
				Pacific island nations are among those who will pay the uneven debt of the human-driven
				emissions. They emit less carbon dioxide than three-quarters of all countries, yet according
				to the vulnerability index, nearly all rank among the 50 countries most vulnerable to
				climate change. Only Fiji appears outside the group—but it's still more at risk than most
				countries.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Where Impact Far Exceeds Imprint</div>
		<div class="subtitle">
			Pacific nations rank among the most vulnerable to climate change — and among those that emit
			the least.
		</div>
	</div>
</div>

<ScatterDanger
	data={rawCountryData}
	selectedIso3={selectedCountryIso3}
	on:resetScatter={handleReset}
/>

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Climate Change Vulnerability Index obtained from
				<a href="https://gain.nd.edu/our-work/country-index/" target="_blank">
					University of Notre Dame Global Adaptation Initiative; Country Index
				</a>
			</span>
			<span class="g-ref">
				Historical CO₂ Emission from
				<a href="https://globalcarbonbudget.org/" target="_blank"> Global Carbon Budget (2024) </a>
				- with major processing by
				<a href="https://ourworldindata.org/grapher/cumulative-co-emissions" target="_blank">
					Our World in Data
				</a>
			</span>
			<span class="g-ref">
				Labels for the Climate Change Vulnerability Index and Historical CO₂ Emissions are assigned
				by dividing each dataset into three equal percentile groups. Countries in the lowest third
				receive the “Low” label, those in the middle third receive “Moderate,” and those in the
				highest third receive “High.”
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				The Climate Change Vulnerability Index, developed by the University of Notre Dame, evaluates
				a country's overall risk to climate change. It measures three key dimensions: exposure to
				climate-related hazards, the sensitivity of populations and infrastructure, and the nation's
				capacity to cope with and adapt to those risks.
			</p>
			<p>
				A higher index score indicates greater vulnerability to cope with climate change impact.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">
			What extreme changes the people of the Pacific Islands might experience?
		</div>
	</div>
</div>

<div class="scroll-wrapper">
	<div class="sticky-container">
		<div class="sticky">
			<div class="viz">
				<div class="text">
					<RiskFilter />
				</div>
			</div>
		</div>

		<div class="viz">
			<div class="text">
				<MeanTempHeader />
			</div>
		</div>

		<div class="viz">
			<div class="text">
				<MeanTempConf />
			</div>
		</div>

		<MeanTemp />

		<div class="viz">
			<div class="text">
				<div class="footer">
					<span class="g-ref">
						The mean surface air temperature is sourced from
						<a href="https://climateknowledgeportal.worldbank.org/download-data" target="_blank">
							the World Bank Climate Change Knowledge Portal (CCKP)
						</a>
					</span>
					<span class="g-ref">
						The Shared Socioeconomic Pathways terminology follows
						<a href="https://doi.org/10.1016/j.gloenvcha.2016.05.009" target="_blank">
							the Shared Socioeconomic Pathways framework by Riahi et al. (2017)
						</a>
					</span>
				</div>
			</div>
		</div>

		<article>
			<div class="completeright">
				<div class="body article-text-center">
					<p>
						Even slight increases in temperature can have profound consequences for Earth's climate
						system.
					</p>
					<p>
						The South-West Pacific, in particular, has
						<a
							href="https://wmo.int/news/media-centre/climate-change-increases-threats-south-west-pacific?utm"
							target="_blank"
						>
							warmed at nearly three times the global average
						</a>, leading to more frequent marine heatwaves, widespread coral bleaching, and
						mounting pressure on food systems and local economies.
					</p>
					<p>
						The consequences would become far more severe if warming reaches 2 degrees Celsius or
						more. It could trigger self-reinforcing and irreversible changes, including accelerated
						glacier and ice sheet melt, which would further accelerate sea level rise.
					</p>
				</div>
			</div>
		</article>
	</div>
</div>

<div class="viz">
	<div class="text">
		<SeaTrendHeader />
	</div>
</div>

<div class="viz">
	<div class="text">
		<SeaTrendConf />
	</div>
</div>

<SeaTrend />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				The sea level rise data is sourced from
				<a href="https://climateknowledgeportal.worldbank.org/download-data" target="_blank">
					the World Bank Climate Change Knowledge Portal (CCKP)
				</a>
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				The Oceania region spans over 30 percent of Earth's sea surface, making the ocean not just a
				geographic feature, but the foundation of life for its people. Cultures, livelihoods, and
				identities across Pacific Island nations are deeply tied to the ocean's rhythms and
				resources.
			</p>
			<p>
				As climate change intensifies, that connection is under threat. Extreme sea level rise may
				flood low-lying islands, salinate vital freshwater supplies, accelerate coastal erosion, and
				severely disrupt fishing and farming—threatening the fundamental wellbeing and survival of
				Pacific communities.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Building a resilient communities to withstand the impacts</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Facing such severe challenges, resilience depends on preparedness deeply rooted at the local
				level. Local adoption of disaster risk reduction (DRR) strategies tied into national plans
				offers communities a way to strengthen their defenses against climate-related threats.
			</p>
			<p>
				DRR reduces vulnerability through early warning systems, infrastructure upgrades, and
				community readiness. It empowers village councils, local governments, and women's groups; it
				also leverages traditional knowledge so communities can anticipate risks more effectively.
			</p>
			<p>
				Building local DRR capacity provides an opportunity to act collectively and strengthen
				community resilience during crises.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Against the Tide of Inaction</div>
		<div class="subtitle">
			As one of the regions most exposed to climate hazards, it is essential to adopt local DRR
			measures. So far, only three countries have all of their local governments adopting and
			implementing these initiatives.
		</div>
		<br />
		<br />
	</div>
</div>

<PrepMap />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				The DRR adoption and implementation rates are drawn from the
				<a
					href="https://stats.pacificdata.org/vis?fs[0]=Development%20indicators%2C0%7CBlue%20Pacific%202050%20Indicators%23BP50%23&pg=0&fc=Development%20indicators&bp=true&snb=8&df[ds]=ds%3ASPC2&df[id]=DF_BP50_5&df[ag]=SPC&df[vs]=1.0&dq=A..._T._T._T._T._T._T._Z._T&lom=LASTNOBSERVATIONS&lo=1&pd=2013%2C2023&to[TIME_PERIOD]=false&ly[cl]=TIME_PERIOD&ly[rs]=INDICATOR&ly[rw]=GEO_PICT"
					target="_blank"
				>
					Pacific Data Hub's Blue Pacific 2050: Climate Change and Disasters (Thematic Area 5)
					dataset
				</a>
				. Additional data on the number of local governments adopting DRR measures and the total number
				of local governments per country come from the
				<a href="https://unstats.un.org/sdgs/dataportal" target="_blank">
					UN SDG Global Database
				</a>
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Palau, Tuvalu, and Vanuatu are among the Pacific nations whose all of the local governments
				have fully integrated and implemented DRR strategies within their national frameworks.
			</p>
			<p>
				In contrast, Fiji, Nauru, Papua New Guinea, and Solomon Islands have yet to begin this
				critical step.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Critically in need, yet still unmet</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Having a resilient community is vital, but robust infrastructure is also essential. To build
				both, it requires steady funding.
			</p>
			<p>
				Unfortunately, the Pacific Islands lack access to those funds.
				<!-- They need roughly USD 1.5 billion per year, yet only receive about USD 600 million. -->
			</p>
			<!-- <p>
				The call of responsibility to help the most vulnerable, least responsible region is louder
				as the hour is running out.
			</p> -->
		</div>
	</div>
</article>

<FundNeed />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				The number is obtained from
				<a
					href="https://www.caritas.org.au/media/casktxsf/14092-weathering-the-storm-web.pdf"
					target="_blank"
				>
					Weathering the Storm: Addressing Debt and Climate Vulnerability in the Pacific
				</a>
				report
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Pacific islands have added almost nothing to the carbon ledger, yet they shoulder its
				heaviest costs.
			</p>
			<p>
				The call of responsibility to help the most vulnerable, least responsible region is louder
				as the hour is running out.
			</p>
		</div>
	</div>
</article>

<footer>
	<hr />
	<p>
		This project was specifically created for <strong>
			<a href="https://pacificdatavizchallenge.org/" target="_blank">
				Pacific Dataviz Challenge 2025: Blue Pacific 2050
			</a>
		</strong>.
	</p>
	<p>
		<strong> Methodology: </strong> This project is built on
		<a href="https://svelte.dev/" target="_blank"> Svelte.js </a>, a JavaScript framework for
		creating reactive web applications. The interactive visualizations are developed using
		<a href="https://d3js.org/" target="_blank"> D3.js</a>, a library for binding data to graphical
		elements and animating changes. Additional supporting visuals were edited in <u>Figma</u> and
		then integrated into the project using
		<a href="https://github.com/the-dataface/figma2html">figma2html</a>, a tool that converts Figma
		designs into HTML snippets. The data sources for each visualization can be found below their
		respective sections, with all datasets being open source.
	</p>
</footer>

<BacktoHome />

<style>
	.sticky {
		position: sticky;
		top: 0;
		padding-top: 0.9rem;
		padding-bottom: 0.9rem;
		background: rgba(255, 255, 255, 1);
		z-index: 10;
	}
</style>
