<script>
    import Narrative from "./coaching-narrative.svelte";
    import CoachingPath from "./coaching-path.svelte";
  
    const narratives = [
      {
        title: "The dark period",
        content: "Effective from March 2015, FIFA imposed sanctions on the PSSI due to government interference in football affairs. This was the result of a prolonged dispute over the dual league system in Indonesia. As a consequence, Indonesia was banned from competing in international tournaments, and the local league was disrupted.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "Alfred Riedl's national team revival",
        content: "When FIFA lifted its sanctions on PSSI in May 2016, the Indonesian national team was at its lowest point on the international stage, ranked 191st. However, under Riedl's leadership, the team rebounded, reaching the AFF Championship final and climbing 20 places in the rankings. Despite this progress, he was dismissed at the end of 2016 as PSSI sought a younger coach with a long-term vision.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The appointment of Luis Milla",
        content: "With a background in coaching Spain's youth national teams, Luis Milla was regarded as the ideal candidate to lead the national footballing scene. Although he improved the team's tactical performance, Luis Milla's tenure as coach was cut short because he failed to meet PSSI's high targets within a limited timeframe. He was dismissed after losing to the UAE in a penalty shootout in the Asian Games round of 16.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "An unforeseen successor",
        content: "The dismissal of Luis Milla was not straightforward, but rather filled with uncertainty. During this period, the national team played two friendly matches under interim local coaches—Danurwindo (vs. Mauritius) and Bima Sakti (vs. Myanmar)—winning both. Bima Sakti was ultimately appointed as head coach and he was given a mission to bring success in AFF 2018. However, the national team endured a disastrous campaign, failing to advance beyond the group stage.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The Simon McMenemy era",
        content: "Bima Sakti's failure in the AFF Championship led to his immediate dismissal as head coach of the national team. He was replaced by Simon McMenemy who had just won Liga 1 and possessed experience in ASEAN football. However, his tenure proved disastrous. Under his leadership, Indonesia struggled in the World Cup qualifiers, suffering four defeats and conceding 14 goals, regressing 14 points.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The Shin-Tae Yong era",
        content: "Delayed due to COVID, Shin-Tae Yong eventually made his debut against Oman in 2021, but lost 3-1. His struggles continued in the Asian World Cup qualifiers, where his squad managed to earn just one point. Eventually, he took a radical step, cutting the old generation of the national team and replacing with young ones. It was proved a success, where the team reached the AFF 2020 final, qualified for the Asian Cup after a 16-year absence, and advanced to the third round of the World Cup qualifiers. Shin-Tae Yong became the longest-serving coach of the national team since the suspension, having been in charge for 1,825 days.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      }
    ];
    
    let activeStep = 0;
    
    function handleActiveChange(event) {
      activeStep = event.detail.index;
    }
  </script>
  
  <div class="scrollytelling-container">
    <!-- Left column: Narrative section -->
    <div class="narrative">
      <Narrative {narratives} on:activeChange={handleActiveChange} />
    </div>
  
    <div class="chart">
      <CoachingPath {activeStep}/>
    </div>
  </div>
  
  <style>
    .scrollytelling-container {
      display: flex;
      align-items: flex-start;
    }
    .narrative {
      width: 40%;
      padding: 20px;
    }
    .chart {
      width: 60%;
      padding: 20px;
      position: sticky;
      top: 20px;
      height: calc(100vh - 20px);
    }
  </style>
  