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
                The first case of Covid-19 in Indonesia was reported five years ago, marking a turning point in the country's economic growth trends. Many sectors experienced declines—some temporary, some sharp—while others have managed to maintain their growth or even thrive.
                <br class="br">
                <br class="br">
                The air transportation and accommodation services sectors were among the hardest
                <span style="color:#e74c3c; font-weight:500"> hit </span> 
                by the pandemic. Meanwhile, the pharmaceutical and medical supplies sectors saw a sharp 
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
                Changes &lpar;&percnt;&rpar; in Gross Regional Domestic Product from 2019 to 2020
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
        Soruce: Badan Pusat Statistik &lpar;BPS&rpar;&semi; PDRB Atas Dasar Harga Konstan Menurut Subsektor Lapangan Usaha Tahunan &lpar;Seri 2010&rpar;
    </p>
</footer>

<BacktoHome />