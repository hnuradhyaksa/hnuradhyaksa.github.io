<script>
	import PostHeader from '$lib/components/post-style/post-header.svelte';
	import '$lib/components/post-style/post-body.scss';
	import BacktoHome from '$lib/components/back2home.svelte';

	// dataviz
	// import SumatranFlood from './data-viz/sumatran-flood-2025.svelte';
	import HistStorm from './data-viz/hist-storm.svelte';
	import StormDays from './data-viz/storm-days.svelte';
	import DisBudget from './data-viz/disaster-budget.svelte';
	import MapLegend from './data-viz/map-legend.svelte';
	import TreeLoss from './data-viz/sumatran-tree-loss.svelte';
</script>

<article>
	<div class="completeright">
		<PostHeader postId={5} />
		<div class="body article-text-center">
			<p>
				In late November 2025, the northern part of Sumatra was struck by heavy rainfall that
				triggered catastrophic flash floods and landslides. Three provinces—Aceh, North Sumatra, and
				West Sumatra—were impacted, with densely populated cities such as Banda Aceh, Lhoksukon, and
				Medan among those hit.
			</p>
			<p>
				As of May 2026, at least 1,208 people have died, while 137 remain missing. Hundred of
				thousands are also still displaced from their home
				<a href="https://gis.bnpb.go.id/bansorsumatera2025/" target="_blank"
					>according to Indonesian National Disaster Management Agency (BNPB)</a
				>.
			</p>
		</div>
	</div>
</article>

<!-- <SumatranFlood />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Population density data were obtained from the
				<a href="https://hub.worldpop.org/geodata/summary?id=58450" target="_blank">
					WorldPop Hub
				</a>
			</span>
			<span class="g-ref">
				Flood extent data were sourced from the
				<a
					href="https://experience.arcgis.com/experience/21c23ad9ae04421ea818a34471143fcd/page/UNOSAT"
					target="_blank"
				>
					UNOSAT: Sumatra Flood 2025 impact assessment
				</a>
			</span>
		</div>
	</div>
</div> -->

<div class="viz">
	<div class="text">
		<div class="title">Rare cyclone formation in an unlikely region"</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				The torrential rainfall was strongly associated with Cyclone Senyar, a storm that occurred
				during the early phase of the northeast monsoon season in an unusually rare region for
				cyclogenesis.
			</p>
			<p>
				Formed in the Strait of Malacca, Senyar's development was driven by a combination of strong
				monsoon winds, unusually warm ocean temperatures, and a separately brewing storm — Typhoon
				Koto — in the nearby South China Sea, which together provided the spinning force the storm
				needed to form so close to the equator.
			</p>
			<p>
				While rare, Senyar was not the first anomaly documented near these waters. In 2001, another
				anomaly — Cyclone Vamei — formed in the South China Sea, just north of Singapore, though for
				entirely different reasons.
			</p>
		</div>
	</div>
</article>

<HistStorm />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Tropical Cyclone track data obtained from
				<a
					href="https://www.ncei.noaa.gov/products/international-best-track-archive"
					target="_blank"
				>
					IBTrACS, NOAA National Centers for Environmental Information (NCEI), ver. 4
				</a>
			</span>
			<span class="g-ref">
				The dataset is filtered to include only storms that intersect the coordinate boundaries of
				95°E to 141°E and 11°S to 6°N.
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Vamei was triggered by a rare atmospheric alignment where a powerful cold surge from the
				north was squeezed between Borneo and Indochina. This interaction intensified a pre-existing
				Borneo Vortex, forcing the system to rotate and rapidly organize into a full-blown cyclone.
			</p>
			<p>
				However, Vamei's scale of fatalities was not as high as that of Senyar. While Senyar was a
				low-intensity storm, it was a slow-moving system that stalled over the Malacca Strait. This
				prolonged presence acted as a massive moisture pump, continuously drenching northern Sumatra
				with extreme rainfall and causing havoc across the region.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Rare cyclone in the buffer zone</div>
		<div class="subtitle">
			Senyar is a rare tropical storm anomaly that formed and stayed in the weak Coriolis zone, the
			first on record to do so in the 24 years since Vamei.
		</div>
	</div>
</div>

<div class="chart-container">
	<StormDays />
</div>

<div class="viz">
	<div class="text">
		<div class="title">Indonesia's deadliest cyclone in over half a century</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				In the history of documented meteorology, Senyar is Indonesia's deadliest cyclone since the
				Flores disaster struck the island of Flores more than fifty years ago. While both events
				reached catastrophic scales, the primary drivers of the fatalities were fundamentally
				distinct.
			</p>
			<p>
				The 1973 Flores casualties were largely a result of total lack of early warning systems and
				a geographic isolation. Approximately 1,500 of those killed were fishermen near the remote
				Palue Island who were caught at sea with no means of receiving word of the storm's approach.
			</p>
			<p>Senyar, by contrast, arrived with warning.</p>
			<p>
				While the storm's formation during the onset of the northeast monsoon was a rare
				meteorological anomaly, Indonesian Meteorology, Climatology, and Geophysics Agency (BMKG)
				<a
					href="https://drive.google.com/file/d/1SHDACKSl5tSXRCQXMfGLwjxhnsV-2N0I/view?usp=sharing"
					target="_blank"
				>
					issued official alerts days before landfall
				</a>. The staggering death toll was more a reflection of the gap between early warnings and
				the administrative response, compounded by the loss of natural forest buffers.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Where was the early response?</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				The official response followed landfall rather than the initial warning period. This is
				reflected in the lack of an official emergency status and the flat trend of the Unexpected
				Expenditure (Belanja Tidak Terduga) budget throughout the alert phase.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">
			Disaster Management Funds disbursement trends relative to total budget in affected regions,
			2025
		</div>
	</div>
</div>

<div class="chart-container">
	<DisBudget />
</div>

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Disaster management funding is sourced from the Unexpected Expenditure (Belanja Tidak
				Terduga) allocation, categorized under Other Expenditures (Belanja Lainnya) in each
				province's
				<a href="https://djpk.kemenkeu.go.id/portal/data/apbd" target="_blank">
					Regional Revenue and Expenditure Budget (APBD)
				</a>
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				Structurally, the Unexpected Expenditure post is a reserve for urgent and unforeseen needs,
				as mandated by Government Regulation (PP) No. 12 of 2019. While it is meant to be the fund
				that can provide immediate liquidity, it can only be formally accessed once an emergency
				status is declared.
			</p>
			<p>
				However, based on available budget data, these emergency funds only began to move in December, after the storm had already
				reached the region. This timing indicates that the budget was used as a reactive measure
				rather than a preventive one.
			</p>
		</div>
	</div>
</article>

<div class="viz">
	<div class="text">
		<div class="title">Loss of ecological support</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				What followed the warning was a testament to years of aggressive deforestation across parts
				of Sumatra’s natural forests. Several affected regions, including North Aceh, Aceh Tamiang,
				Central Tapanuli, South Tapanuli, and Agam, bear long histories of forest loss that shaped
				how these areas responded to the recent extreme rainfall events.
			</p>
		</div>
	</div>
</article>

<MapLegend />

<TreeLoss />

<div class="viz">
	<div class="text">
		<div class="footer">
			<span class="g-ref">
				Tree cover loss data were obtained from the
				<a
					href="https://storage.googleapis.com/earthenginepartners-hansen/GFC-2025-v1.13/download.html"
					target="_blank"
				>
					Global Forest Change dataset
				</a>
				developed by the University of Maryland
			</span>
			<span class="g-ref">
				Data on humid tropical primary forests were sourced from the University of Maryland
				<a href="https://glad.umd.edu/dataset/primary-forest-humid-tropics" target="_blank">
					GLAD laboratory
				</a>
			</span>
		</div>
	</div>
</div>

<article>
	<div class="completeright">
		<div class="body article-text-center">
			<p>
				The deforestation within the Samarkilang and Lokop forest blocks in Aceh has severely
				weakened the Leuser Ecosystem’s ability to absorb and regulate rainfall. Without dense
				forest cover, torrential rain falls directly onto exposed ground, increasing surface runoff
				and raising the risk of flash floods in downstream communities.
			</p>
			<p>
				The clearing of primary forests in the Batang Toru landscape and surrounding peat swamps has
				also removed critical natural systems that regulate water cycles. These ecosystems once
				absorbed and slowly released large volumes of water, but their degradation has allowed
				intense rainfall events such as Senyar to accumulate rapidly and trigger widespread flooding
				instead of gradual infiltration into the soil.
			</p>
			<p>
				Forest loss across steep highland areas, including the Mount Talakmau and Air Bangis
				complexes in West Sumatra, has further reduced the stability of vulnerable slopes. Heavy
				rainfall over these deforested landscapes can rapidly trigger landslides and debris flows,
				as weakened root systems are no longer able to anchor the soil or absorb excess water.
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
