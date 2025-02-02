<script>
    import PostHeader from '$lib/components/post-style/post-header.svelte';
    import '$lib/components/post-style/post-body.scss';
    import BacktoHome from '$lib/components/back2home.svelte';

    // dataviz
    import ArrowChange from './data-viz/arrow-chart.svelte';
    import TrendLine from './data-viz/trend-line-recovery.svelte';
</script>

<article>
    <div class="completeright">
        <PostHeader postId={1} />
        <div class="body article-text-center">
            <p>
                The first case of Covid-19 in Indonesia was reported five years ago, marking a turning point in the country's economic growth trends, as observed from the constant gross regional domestic product. 
                Many sectors experienced declines—some temporary, some sharp—while others have managed to maintain their growth or even thrive.
                <br>
                <br>
                The air transportation and accommodation services sectors were among the hardest
                <span style="color:#e74c3c; font-weight:500"> hit </span> 
                by the pandemic. Meanwhile, health industries saw a sharp 
                <span style="color:#bad72e; font-weight:500"> increase </span>.
            </p>
        </div>
    </div>

    <div class="viz">
        <div class="text">
            <div class="title">
                Which Industries Were Most Affected By Covid?
            </div>
            <div class="subtitle">
                Changes &lpar;&percnt;&rpar; in 2020 Gross Regional Domestic Product at constant prices compared to 2019
            </div>
        </div>
        <div class="chart">
            <ArrowChange />
        </div>
    </div>

    <div class="completeright">
        <div class="body article-text-center">
            <h2 class="h2">Sector by sector</h2>
            <p>
                How have industries been performing three years after the first COVID case was reported?
                <br>
                <br>
                Most sectors affected by COVID-19 have rebounded from the downturn. 
                The broader transportation sector which the most affected at that time has largely returned to pre-pandemic levels, except for air travel. 
                While air travel is trending upward, it has yet to reach its pre-pandemic peak.
                <br>
                <br>
                Some sector, however, experienced accelerated downturn due to the event. 
                Industries such as rubber products, plastic products, crude petroleum, natural gas, and geothermal energy have seen negative trends
            </p>
        </div>
    </div>

    <div class="viz">
        <div class="chart">
            <TrendLine />
        </div>
    </div>
</article>

<footer>
    <hr>
    <p>
        In the sector-by-sector analysis, 2020 serves as the reference year. 
        <br>
        <br>
        An industry is considered <span style="color:#67bc63; font-weight:500"> relatively unaffected </span>  if it did not experience a decline during the pandemic or if its upward trend remained uninterrupted.
        <br>
        <br>
        If an industry experienced a decline but later regained pre-pandemic levels, it is categorized as <span style="color:#1a9850; font-weight:500"> recovered and grown </span>. 
        <br>
        <br>
        However, if the industry fails to reach its pre-pandemic peak, it is considered to <span style="color:#f46c42; font-weight:500"> have not recovered </span>.
        <br>
        <br>
        If an industry was already on a downward trend before the pandemic, and the decline worsened during and continued after the pandemic, it is categorized as having experienced an <span style="color:#d63127; font-weight:500"> accelerated decline </span>.
        <br>
        <br>
        Data is sourced from: Badan Pusat Statistik &lpar;BPS&rpar;&semi; PDRB Atas Dasar Harga Konstan Menurut Subsektor Lapangan Usaha Tahunan &lpar;Seri 2010&rpar;
    </p>
</footer>

<BacktoHome />