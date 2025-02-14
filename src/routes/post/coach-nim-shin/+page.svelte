<script>
    import PostHeader from '$lib/components/post-style/post-header.svelte';
    import '$lib/components/post-style/post-body.scss';
    import BacktoHome from '$lib/components/back2home.svelte';

    //dataviz
    import CoachingScrolly from './data-viz/coaching-scrolly.svelte';
    import RankScatter from './data-viz/scatter-fans-rank.svelte';
  </script>
  
  <article>
    <div class="completeright">
        <PostHeader postId={2} />
        <div class="body article-text-center">
            <p>
              In a country with a strong football culture, a competitive national team is a source of great pride.
              Indonesia is a passionate football nation that has long awaited its national team's success on the international stage: a team that competes regularly in Asia and the FIFA World Cup.
              Anyone who can lead progress in that direction will be considered a football hero.
            </p>
        </div>
    </div>

    <div class="viz">
        <div class="text">
            <div class="title">
                A Nation of Fans, A Struggling Team?
            </div>
            <div class="subtitle">
                The national team's FIFA ranking vs the size of its fanbase relative to its population
            </div>
        </div>
        <div class="chart">
          <RankScatter />
        </div>
    </div>
    <div class="completeright">
      <div class="body article-text-center">
          <br>
          <br>
          <p>
            However, political interference in football &mdash; which led to a FIFA sanction &mdash; along with the absence of a clear development blueprint making the development really challenging.
            The national team had not shown clear progress in its football development &mdash; until recently.
          </p>
      </div>
    </div>
  </article>
  
  <div class="scrollytelling-wrapper">
    <CoachingScrolly />
  </div>
  
  <footer>
    <hr>
    <p>
        Data is sourced from: Badan Pusat Statistik &lpar;BPS&rpar;&semi; PDRB Atas Dasar Harga Konstan Menurut Subsektor Lapangan Usaha Tahunan &lpar;Seri 2010&rpar;
    </p>
</footer>

<BacktoHome />

<style>
  .scrollytelling-wrapper {
    margin-left: 15%;
    margin-right: 15%;
  }
</style>
  