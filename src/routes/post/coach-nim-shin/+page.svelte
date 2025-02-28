<script>
    import PostHeader from '$lib/components/post-style/post-header.svelte';
    import '$lib/components/post-style/post-body.scss';
    import BacktoHome from '$lib/components/back2home.svelte';

    //dataviz
    // import CoachingScrolly from './data-viz/coaching-scrolly.svelte';
    import DetailTime from './data-viz/timeline.svelte';
    import Miles from './data-viz/milestone.svelte'
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
            <p>
              However, the progress has been anything but steady. 
              Political interference—which led to FIFA sanctions—combined with the lack of a clear development blueprint has turned Indonesia's football journey into a roller coaster, reflected in the team's fluctuating FIFA ranking.
            </p>
        </div>
    </div>
  </article>

  <div class="scrollytelling-wrapper">
    <DetailTime />
  </div>

  <article>
    <div class="completeright">
        <div class="body article-text-center">
              <h2 class = 'h2'>
                Is it really just about the ranking?
              </h2>
              <p>
                Under coach Shin, the national team is on a positive trajectory, as reflected in the FIFA rankings. 
                However, the Indonesian football community values more than just rankings. Their trust has been earned through a series of convincing performances, with each game reinforcing the team's growing stature on the international stage.
              <p> 
                Coach Shin's tenure has been defined by milestones that have reignited belief in Indonesian football.
              </p>
        </div>
    </div>
  </article>

  <div class="milestone-container">
    <Miles />
  </div>

  <article>
    <div class="completeright">
        <div class="body article-text-center">
          <h2 class = 'h2'>
            More than the scoresheet
          </h2>
        <p>
          Shin Tae-Yong didn't just build a team—he built a bond with Indonesia's football community. 
          He emphasizes that national players must always give 100% on the field to appreciate supporters.
          </p>
      </div>
    </div>

    <div class="picture">

      <a id="nXMWRAZfThBU4hDPmsgkMw" class="gie-single" href="http://www.gettyimages.com/detail/2157138491" target="_blank" style="color:#a7a7a7;text-decoration:none;font-weight:normal !important;border:none;display:inline-block;">Embed from Getty Images</a>
      <script>
        window.gie = window.gie || function(c) {
          (gie.q = gie.q || []).push(c)
        };
        gie(function(){
          gie.widgets.load({
            id:'nXMWRAZfThBU4hDPmsgkMw',
            sig:'ZYdXM8T3OZKMxlUsEja_POriB3fvmgtosAmVqEVuqCc=',
            w:'594px',
            h:'396px',
            items:'2157138491',
            caption: true,
            tld:'com',
            is360: false
          })
        });
      </script>
      <script src="//embed-cdn.gettyimages.com/widgets.js" charset="utf-8" async></script>

    </div>

    <div class="completeright">
      <div class="body article-text-center">
      <p>
        To reinforce this, he instilled a culture of gratitude within his squad.
        He encouraged players and staff to acknowledge the fans together. Win or lose.
      </p>
    </div>

  </article>
  
  <footer>
    <hr>
    <p>
        About the data: Indonesia's FIFA ranking is obtained from the official FIFA World Ranking website for men.
        The national team's achievement data is sourced from the AFC website. 
        The coach's tenure data was obtained from the coaching history section on the Transfermarkt website.
    </p>
</footer>

<BacktoHome />

<style>
  .scrollytelling-wrapper {
    margin-left: 15%;
    margin-right: 15%;
  }

  .milestone-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }

  @media (max-width: 600px) {
      .scrollytelling-wrapper {
      margin-left: 0%;
      margin-right: 0%;
    }
  }
</style>
  